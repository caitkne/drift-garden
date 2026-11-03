// The magazine shelf for Second Selvedge.
// Design and art magazines don't let a web page search them directly, so this worker does it for the page:
// it asks each magazine's own search (WordPress sites through their public posts feed, others through their
// search page), then reads each article's own preview tags (title, picture, standfirst). It passes back only
// those, with a link to the article. It keeps each answer for 12 hours and stores nothing about anyone.
//
//   GET /?q=heron            four magazines picked by the words, mixed together
//   GET /?q=heron&site=int   one magazine (keys below)
//   GET /sites               the list of magazines

const SITES = [
  { key: 'int', name: 'It’s Nice That', host: 'www.itsnicethat.com', wp: false,
    search: q => `https://www.itsnicethat.com/search?q=${q}`, link: /\/(?:articles|news|features)\/[a-z0-9][a-z0-9-]{8,}/g },
  { key: 'colossal', name: 'Colossal', host: 'www.thisiscolossal.com' },
  { key: 'dezeen', name: 'Dezeen', host: 'www.dezeen.com' },
  { key: 'designboom', name: 'designboom', host: 'www.designboom.com' },
  { key: 'eyeondesign', name: 'Eye on Design', host: 'eyeondesign.aiga.org' },
  { key: 'creativereview', name: 'Creative Review', host: 'www.creativereview.co.uk' },
  { key: 'hyperallergic', name: 'Hyperallergic', host: 'hyperallergic.com' },
  { key: 'marginalian', name: 'The Marginalian', host: 'www.themarginalian.org' },
  { key: 'booooooom', name: 'Booooooom', host: 'www.booooooom.com' },
  { key: 'ignant', name: 'Ignant', host: 'www.ignant.com' },
  { key: 'designassembly', name: 'Design Assembly', host: 'designassembly.org.nz' },
  { key: 'fontsinuse', name: 'Fonts In Use', host: 'fontsinuse.com', wp: false,
    search: q => `https://fontsinuse.com/search?terms=${q}`, link: /\/uses\/\d+\/[a-z0-9-]+/g },
  { key: 'atlasobscura', name: 'Atlas Obscura', host: 'www.atlasobscura.com', wp: false,
    search: q => `https://www.atlasobscura.com/search?q=${q}`, link: /\/(?:places|articles)\/[a-z0-9][a-z0-9-]{4,}/g },
];
const PER_SITE = 6, PICK = 4, TTL = 12 * 3600;
const UA = 'SelvedgeShelf/1.0 (+https://selvedge.garden)';

const hash = s => { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; };
const decode = s => String(s || '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&(amp|lt|gt|quot|apos|nbsp|hellip|rsquo|lsquo|rdquo|ldquo|ndash|mdash);/g, (_, e) => ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', ndash: '–', mdash: '—' }[e]))
  .replace(/\s+/g, ' ').trim();

async function get(url, as = 'text') {
  const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 7000);
  try {
    const r = await fetch(url, { signal: ctl.signal, headers: { 'User-Agent': UA, Accept: as === 'json' ? 'application/json' : 'text/html' }, cf: { cacheTtl: TTL, cacheEverything: true } });
    if (!r.ok) throw new Error(url + ' ' + r.status);
    return as === 'json' ? await r.json() : await r.text();
  } finally { clearTimeout(t); }
}
// the preview tags every article page carries for link previews
function meta(html, name) {
  const re = new RegExp(`<meta[^>]+(?:property|name)=["']${name}["'][^>]*>`, 'i'), tag = (html.match(re) || [])[0];
  return tag ? decode((tag.match(/content=["']([^"']*)["']/i) || [])[1]) : '';
}
async function preview(url, site) {
  const html = await get(url);
  const title = meta(html, 'og:title') || decode((html.match(/<title>([^<]*)<\/title>/i) || [])[1]);
  if (!title) return null;
  return { title: title.replace(/\s*[|–—-]\s*[^|–—-]*$/, '') || title, img: meta(html, 'og:image') || null, blurb: meta(html, 'og:description').slice(0, 400),
    date: (meta(html, 'article:published_time') || '').slice(0, 10), href: url, site: site.name, key: site.key };
}
async function fromWordPress(site, q) {
  const d = await get(`https://${site.host}/wp-json/wp/v2/posts?search=${q}&per_page=${PER_SITE}&_embed=wp:featuredmedia`, 'json');
  if (!Array.isArray(d)) throw new Error('not wordpress');
  return d.map(p => {
    const m = p._embedded && p._embedded['wp:featuredmedia'] && p._embedded['wp:featuredmedia'][0], sz = m && m.media_details && m.media_details.sizes;
    return { title: decode(p.title && p.title.rendered), img: (sz && (sz.medium_large || sz.large || sz.full) || {}).source_url || (m && m.source_url) || null,
      blurb: decode(p.excerpt && p.excerpt.rendered).slice(0, 400), date: (p.date || '').slice(0, 10), href: p.link, site: site.name, key: site.key };
  }).filter(x => x.title && x.href);
}
async function fromSearchPage(site, q) {
  const url = site.search ? site.search(q) : `https://${site.host}/?s=${q}`;
  const html = await get(url);
  const re = site.link || new RegExp(`(?:https?://${site.host.replace(/\./g, '\\.')})?/(?!(?:tag|tags|category|author|page|search|wp-content|wp-json|feed)/)[a-z0-9][a-z0-9/-]*-[a-z0-9-]*-[a-z0-9-]+/?`, 'gi');
  const seen = new Set(), links = [];
  for (const m of html.matchAll(re)) {
    const path = m[0].replace(/^https?:\/\/[^/]+/, '').replace(/\/$/, '');
    if (seen.has(path)) continue; seen.add(path); links.push(`https://${site.host}${path}`);
    if (links.length >= PER_SITE) break;
  }
  const got = await Promise.allSettled(links.slice(0, 5).map(u => preview(u, site)));
  return got.filter(g => g.status === 'fulfilled' && g.value).map(g => g.value);
}
async function search(site, q) {
  if (site.wp !== false) { try { const r = await fromWordPress(site, q); if (r.length) return r; } catch (e) {} }
  try { return await fromSearchPage(site, q); } catch (e) { return []; }
}

function cors(req, env) {
  const origin = req.headers.get('Origin') || '', ok = (env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).includes(origin);
  return ok ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' } : null;
}
const json = (body, headers, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=3600', ...headers } });

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url), h = cors(req, env);
    if (req.method === 'OPTIONS') return new Response(null, { status: h ? 204 : 403, headers: { ...(h || {}), 'Access-Control-Allow-Methods': 'GET' } });
    if (!h) return new Response('not allowed', { status: 403 });
    if (url.pathname === '/sites') return json({ sites: SITES.map(s => ({ key: s.key, name: s.name, host: s.host })) }, h);
    const words = (url.searchParams.get('q') || '').trim().slice(0, 80);
    if (!words) return json({ items: [] }, h);
    const one = url.searchParams.get('site');
    const cacheKey = new Request(`https://shelf.selvedge.garden/c?q=${encodeURIComponent(words.toLowerCase())}&site=${one || ''}`);
    const cached = await caches.default.match(cacheKey);
    if (cached) { const r = new Response(cached.body, cached); Object.entries(h).forEach(([k, v]) => r.headers.set(k, v)); return r; }
    let sites;
    if (one) sites = SITES.filter(s => s.key === one);
    else { const start = hash(words.toLowerCase()) % SITES.length; sites = Array.from({ length: PICK }, (_, i) => SITES[(start + i * 3) % SITES.length]); }
    const q = encodeURIComponent(words);
    const lists = await Promise.all(sites.map(s => search(s, q)));
    // deal the magazines' answers out in turn, like shuffling piles of cuttings together
    const items = [];
    for (let i = 0; i < PER_SITE; i++) lists.forEach(l => l[i] && items.push(l[i]));
    const res = json({ items, asked: sites.map(s => s.name) }, {});
    ctx.waitUntil(caches.default.put(cacheKey, new Response(res.clone().body, { headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': `public, max-age=${TTL}` } })));
    Object.entries(h).forEach(([k, v]) => res.headers.set(k, v));
    return res;
  },
};
