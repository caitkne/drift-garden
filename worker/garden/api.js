// Selvedge Garden accounts: passkey sign-in, saved gardens, invite-only allotments.
// Runs as a Cloudflare Worker. Bindings: DB (a D1 database) and GARDENS (a KV namespace).
// Optional plain-text variables: ORIGINS (default https://caitkne.github.io), RP_ID (default caitkne.github.io).
// Build: npm run build (bundles this file into ../garden-api.js, the one file you paste into Cloudflare).
import { generateRegistrationOptions, verifyRegistrationResponse, generateAuthenticationOptions, verifyAuthenticationResponse } from '@simplewebauthn/server';
import { isoBase64URL } from '@simplewebauthn/server/helpers';

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT NOT NULL, created INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS creds (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, public_key TEXT NOT NULL, counter INTEGER NOT NULL, transports TEXT, created INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS sessions (hash TEXT PRIMARY KEY, user_id TEXT NOT NULL, expires INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS challenges (id TEXT PRIMARY KEY, challenge TEXT NOT NULL, user_id TEXT, name TEXT, expires INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS gardens (id TEXT PRIMARY KEY, owner_id TEXT NOT NULL, name TEXT NOT NULL, updated INTEGER NOT NULL, size INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS allotments (id TEXT PRIMARY KEY, name TEXT NOT NULL, keeper_id TEXT NOT NULL, created INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS members (allotment_id TEXT NOT NULL, user_id TEXT NOT NULL, joined INTEGER NOT NULL, PRIMARY KEY (allotment_id, user_id))`,
  `CREATE TABLE IF NOT EXISTS plots (allotment_id TEXT NOT NULL, garden_id TEXT NOT NULL, added INTEGER NOT NULL, PRIMARY KEY (allotment_id, garden_id))`,
  `CREATE TABLE IF NOT EXISTS invites (code TEXT PRIMARY KEY, allotment_id TEXT NOT NULL, made_by TEXT NOT NULL, expires INTEGER NOT NULL, uses_left INTEGER NOT NULL)`,
];
let ready = null;
const DAY = 86400000, SESSION_DAYS = 60, MAX_GARDEN = 20 * 1024 * 1024;

const rand = (n = 16) => isoBase64URL.fromBuffer(crypto.getRandomValues(new Uint8Array(n)));
const sha = async s => isoBase64URL.fromBuffer(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s))));
const clean = (s, max) => String(s || '').replace(/[\u0000-\u001f\u007f]/g, '').replace(/\s+/g, ' ').trim().slice(0, max);
class Oops extends Error { constructor(status, msg) { super(msg); this.status = status; } }

export default {
  async fetch(req, env) {
    const origins = (env.ORIGINS || 'https://caitkne.github.io').split(',').map(s => s.trim());
    const origin = req.headers.get('Origin') || '';
    const ok = origins.includes(origin);
    const cors = ok ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' } : {};
    const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...cors, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
    if (req.method === 'OPTIONS') return new Response(null, { status: ok ? 204 : 403, headers: { ...cors, 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', 'Access-Control-Allow-Headers': 'Authorization, Content-Type', 'Access-Control-Max-Age': '86400' } });
    if (!ok) return json({ error: 'not allowed' }, 403);
    if (!env.DB || !env.GARDENS) return json({ error: 'The worker needs its DB and GARDENS bindings' }, 500);
    try {
      ready = ready || env.DB.batch(SCHEMA.map(s => env.DB.prepare(s))).catch(e => { ready = null; throw e; });
      await ready;
      return json(await route(req, env, { rpID: env.RP_ID || 'caitkne.github.io', origin, origins }));
    } catch (e) {
      return json({ error: e instanceof Oops ? e.message : 'Something went wrong' }, e.status || 500);
    }
  },
};

async function route(req, env, ctx) {
  const url = new URL(req.url), path = url.pathname.replace(/\/+$/, '') || '/', m = req.method;
  const DB = env.DB, now = Date.now();
  const body = async () => { try { return await req.json(); } catch (e) { throw new Oops(400, 'Bad request'); } };
  const one = (sql, ...a) => DB.prepare(sql).bind(...a).first();
  const all = async (sql, ...a) => (await DB.prepare(sql).bind(...a).all()).results;
  const run = (sql, ...a) => DB.prepare(sql).bind(...a).run();

  // who is asking
  let me = null;
  const auth = (req.headers.get('Authorization') || '').replace(/^Bearer /, '');
  if (auth) {
    const s = await one('SELECT s.user_id, s.expires, u.name FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.hash = ?', await sha(auth));
    if (s && s.expires > now) me = { id: s.user_id, name: s.name };
  }
  const need = () => { if (!me) throw new Oops(401, 'Sign in first'); return me; };
  const startSession = async user => {
    const token = rand(32);
    await run('INSERT INTO sessions (hash, user_id, expires) VALUES (?, ?, ?)', await sha(token), user.id, now + SESSION_DAYS * DAY);
    await run('DELETE FROM sessions WHERE expires < ?', now);
    return { token, user: { id: user.id, name: user.name } };
  };
  const takeChallenge = async id => {
    const c = await one('SELECT * FROM challenges WHERE id = ?', String(id || ''));
    await run('DELETE FROM challenges WHERE id = ? OR expires < ?', String(id || ''), now);
    if (!c || c.expires < now) throw new Oops(400, 'That took too long. Try again');
    return c;
  };
  const isMember = async (aid, uid) => !!(await one('SELECT 1 AS x FROM members WHERE allotment_id = ? AND user_id = ?', aid, uid));
  const allotment = async aid => { const a = await one('SELECT * FROM allotments WHERE id = ?', aid); if (!a || !(await isMember(aid, need().id))) throw new Oops(404, 'No such allotment'); return a; };
  const seg = path.split('/').filter(Boolean);

  // ---------- passkeys ----------
  if (m === 'POST' && path === '/auth/register/start') {
    const { name } = await body(); const n = clean(name, 40);
    if (!n) throw new Oops(400, 'Choose a name your friends will see');
    // a signed-in person adding a passkey on another device keeps their account
    const userId = me ? me.id : rand(16);
    const exclude = me ? await all('SELECT id, transports FROM creds WHERE user_id = ?', me.id) : [];
    const options = await generateRegistrationOptions({ rpName: 'Selvedge Garden', rpID: ctx.rpID, userName: n, userDisplayName: n, userID: isoBase64URL.toBuffer(userId),
      attestationType: 'none', authenticatorSelection: { residentKey: 'required', userVerification: 'preferred' },
      excludeCredentials: exclude.map(c => ({ id: c.id, transports: c.transports ? JSON.parse(c.transports) : undefined })) });
    const id = rand();
    await run('INSERT INTO challenges (id, challenge, user_id, name, expires) VALUES (?, ?, ?, ?, ?)', id, options.challenge, userId, me ? me.name : n, now + 5 * 60000);
    return { id, options };
  }
  if (m === 'POST' && path === '/auth/register/finish') {
    const b = await body(); const c = await takeChallenge(b.id);
    let v; try { v = await verifyRegistrationResponse({ response: b.response, expectedChallenge: c.challenge, expectedOrigin: ctx.origins, expectedRPID: ctx.rpID }); } catch (e) { throw new Oops(400, 'That passkey could not be checked'); }
    if (!v.verified) throw new Oops(400, 'That passkey could not be checked');
    const cred = v.registrationInfo.credential;
    let user = await one('SELECT * FROM users WHERE id = ?', c.user_id);
    if (!user) { user = { id: c.user_id, name: c.name }; await run('INSERT INTO users (id, name, created) VALUES (?, ?, ?)', user.id, user.name, now); }
    await run('INSERT INTO creds (id, user_id, public_key, counter, transports, created) VALUES (?, ?, ?, ?, ?, ?)', cred.id, user.id, isoBase64URL.fromBuffer(cred.publicKey), cred.counter, JSON.stringify(cred.transports || b.response?.response?.transports || []), now);
    return startSession(user);
  }
  if (m === 'POST' && path === '/auth/login/start') {
    const options = await generateAuthenticationOptions({ rpID: ctx.rpID, userVerification: 'preferred', allowCredentials: [] });
    const id = rand();
    await run('INSERT INTO challenges (id, challenge, expires) VALUES (?, ?, ?)', id, options.challenge, now + 5 * 60000);
    return { id, options };
  }
  if (m === 'POST' && path === '/auth/login/finish') {
    const b = await body(); const c = await takeChallenge(b.id);
    const cred = await one('SELECT * FROM creds WHERE id = ?', String(b.response?.id || ''));
    if (!cred) throw new Oops(400, 'That passkey isn’t known here. Make an account first');
    let v; try { v = await verifyAuthenticationResponse({ response: b.response, expectedChallenge: c.challenge, expectedOrigin: ctx.origins, expectedRPID: ctx.rpID,
      credential: { id: cred.id, publicKey: isoBase64URL.toBuffer(cred.public_key), counter: cred.counter, transports: cred.transports ? JSON.parse(cred.transports) : undefined } }); } catch (e) { throw new Oops(400, 'That passkey could not be checked'); }
    if (!v.verified) throw new Oops(400, 'That passkey could not be checked');
    await run('UPDATE creds SET counter = ? WHERE id = ?', v.authenticationInfo.newCounter, cred.id);
    return startSession(await one('SELECT * FROM users WHERE id = ?', cred.user_id));
  }
  if (m === 'POST' && path === '/auth/logout') { if (auth) await run('DELETE FROM sessions WHERE hash = ?', await sha(auth)); return { ok: true }; }

  // ---------- you ----------
  if (m === 'GET' && path === '/me') {
    need();
    const gardens = await all('SELECT id, name, updated, size FROM gardens WHERE owner_id = ? ORDER BY updated DESC', me.id);
    const allotments = await all(`SELECT a.id, a.name, a.keeper_id = ? AS keeper, (SELECT COUNT(*) FROM members x WHERE x.allotment_id = a.id) AS members,
      (SELECT COUNT(*) FROM plots p WHERE p.allotment_id = a.id) AS plots FROM allotments a JOIN members mm ON mm.allotment_id = a.id AND mm.user_id = ? ORDER BY a.created DESC`, me.id, me.id);
    return { user: me, gardens, allotments };
  }
  if (m === 'PUT' && path === '/me') { need(); const n = clean((await body()).name, 40); if (!n) throw new Oops(400, 'A name, please'); await run('UPDATE users SET name = ? WHERE id = ?', n, me.id); return { user: { id: me.id, name: n } }; }

  // ---------- gardens ----------
  if (seg[0] === 'gardens' && seg.length === 2) {
    const gid = clean(seg[1], 40);
    if (!/^[\w-]{8,40}$/.test(gid)) throw new Oops(400, 'Bad garden id');
    const g = await one('SELECT * FROM gardens WHERE id = ?', gid);
    if (m === 'PUT') {
      need();
      if (g && g.owner_id !== me.id) throw new Oops(403, 'That garden belongs to someone else');
      const text = await req.text();
      if (text.length > MAX_GARDEN) throw new Oops(413, 'This garden is too big to save (over 20 MB)');
      let data; try { data = JSON.parse(text); } catch (e) { throw new Oops(400, 'Bad garden'); }
      if (!data || typeof data.keys !== 'object') throw new Oops(400, 'Bad garden');
      const name = clean(data.name, 60) || 'A garden';
      await env.GARDENS.put('garden:' + gid, text);
      if (g) await run('UPDATE gardens SET name = ?, updated = ?, size = ? WHERE id = ?', name, now, text.length, gid);
      else await run('INSERT INTO gardens (id, owner_id, name, updated, size) VALUES (?, ?, ?, ?, ?)', gid, me.id, name, now, text.length);
      return { id: gid, updated: now };
    }
    if (!g) throw new Oops(404, 'No such garden');
    need();
    const mine = g.owner_id === me.id;
    if (m === 'GET') {
      // your own, or one planted in an allotment you belong to
      if (!mine && !(await one('SELECT 1 AS x FROM plots p JOIN members mm ON mm.allotment_id = p.allotment_id WHERE p.garden_id = ? AND mm.user_id = ?', gid, me.id))) throw new Oops(404, 'No such garden');
      const owner = await one('SELECT name FROM users WHERE id = ?', g.owner_id);
      return { id: gid, name: g.name, owner: owner?.name || '', mine, updated: g.updated, data: JSON.parse(await env.GARDENS.get('garden:' + gid) || '{"keys":{}}') };
    }
    if (m === 'DELETE') {
      if (!mine) throw new Oops(403, 'That garden belongs to someone else');
      await DB.batch([DB.prepare('DELETE FROM gardens WHERE id = ?').bind(gid), DB.prepare('DELETE FROM plots WHERE garden_id = ?').bind(gid)]);
      await env.GARDENS.delete('garden:' + gid);
      return { ok: true };
    }
  }

  // ---------- allotments ----------
  if (m === 'POST' && path === '/allotments') {
    need(); const n = clean((await body()).name, 60); if (!n) throw new Oops(400, 'Name the allotment');
    const id = rand(12);
    await DB.batch([DB.prepare('INSERT INTO allotments (id, name, keeper_id, created) VALUES (?, ?, ?, ?)').bind(id, n, me.id, now), DB.prepare('INSERT INTO members (allotment_id, user_id, joined) VALUES (?, ?, ?)').bind(id, me.id, now)]);
    return { id, name: n };
  }
  if (seg[0] === 'allotments' && seg[1]) {
    const a = await allotment(seg[1]), keeper = a.keeper_id === me.id;
    if (m === 'GET' && seg.length === 2) {
      const members = await all('SELECT u.id, u.name FROM members mm JOIN users u ON u.id = mm.user_id WHERE mm.allotment_id = ? ORDER BY mm.joined', a.id);
      const plots = await all('SELECT g.id, g.name, g.updated, g.owner_id, u.name AS owner FROM plots p JOIN gardens g ON g.id = p.garden_id JOIN users u ON u.id = g.owner_id WHERE p.allotment_id = ? ORDER BY p.added', a.id);
      return { id: a.id, name: a.name, keeper, keeperId: a.keeper_id, members, plots };
    }
    // plant one of your gardens here, or take it out
    if (seg[2] === 'plots' && m === 'POST') {
      const gid = clean((await body()).garden, 40);
      const g = await one('SELECT * FROM gardens WHERE id = ? AND owner_id = ?', gid, me.id); if (!g) throw new Oops(404, 'Save that garden first');
      await run('INSERT OR IGNORE INTO plots (allotment_id, garden_id, added) VALUES (?, ?, ?)', a.id, gid, now); return { ok: true };
    }
    if (seg[2] === 'plots' && seg[3] && m === 'DELETE') {
      const g = await one('SELECT owner_id FROM gardens WHERE id = ?', seg[3]);
      if (!g || (g.owner_id !== me.id && !keeper)) throw new Oops(403, 'Only its gardener or the keeper can take it out');
      await run('DELETE FROM plots WHERE allotment_id = ? AND garden_id = ?', a.id, seg[3]); return { ok: true };
    }
    // invite links: members make them; they expire in a week and work ten times
    if (seg[2] === 'invites' && m === 'POST') {
      const code = rand(18);
      await run('INSERT INTO invites (code, allotment_id, made_by, expires, uses_left) VALUES (?, ?, ?, ?, ?)', code, a.id, me.id, now + 7 * DAY, 10);
      await run('DELETE FROM invites WHERE expires < ?', now);
      return { code, expires: now + 7 * DAY };
    }
    // leave, or (the keeper) remove someone; their gardens leave with them
    if (seg[2] === 'members' && seg[3] && m === 'DELETE') {
      const uid = seg[3] === 'me' ? me.id : seg[3];
      if (uid !== me.id && !keeper) throw new Oops(403, 'Only the keeper can remove someone');
      if (uid === a.keeper_id) {
        const next = await one('SELECT user_id FROM members WHERE allotment_id = ? AND user_id != ? ORDER BY joined LIMIT 1', a.id, uid);
        if (next) await run('UPDATE allotments SET keeper_id = ? WHERE id = ?', next.user_id, a.id);
        else { await DB.batch(['allotments WHERE id', 'members WHERE allotment_id', 'plots WHERE allotment_id', 'invites WHERE allotment_id'].map(t => DB.prepare('DELETE FROM ' + t + ' = ?').bind(a.id))); return { ok: true, gone: true }; }
      }
      await DB.batch([DB.prepare('DELETE FROM members WHERE allotment_id = ? AND user_id = ?').bind(a.id, uid),
        DB.prepare('DELETE FROM plots WHERE allotment_id = ? AND garden_id IN (SELECT id FROM gardens WHERE owner_id = ?)').bind(a.id, uid)]);
      if (uid !== me.id) await run('DELETE FROM invites WHERE allotment_id = ? AND made_by = ?', a.id, uid);
      return { ok: true };
    }
  }
  if (seg[0] === 'invites' && seg[1]) {
    const inv = await one('SELECT i.*, a.name FROM invites i JOIN allotments a ON a.id = i.allotment_id WHERE i.code = ?', clean(seg[1], 40));
    if (!inv || inv.expires < now || inv.uses_left < 1) throw new Oops(404, 'That invite has expired. Ask for a new one');
    if (m === 'GET') return { allotment: inv.name };
    if (m === 'POST') {
      need();
      if (!(await isMember(inv.allotment_id, me.id))) {
        await DB.batch([DB.prepare('INSERT INTO members (allotment_id, user_id, joined) VALUES (?, ?, ?)').bind(inv.allotment_id, me.id, now),
          DB.prepare('UPDATE invites SET uses_left = uses_left - 1 WHERE code = ?').bind(inv.code)]);
      }
      return { id: inv.allotment_id, name: inv.name };
    }
  }
  throw new Oops(404, 'Nothing here');
}
