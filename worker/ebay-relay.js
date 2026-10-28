// Drift Garden eBay relay: a tiny Cloudflare Worker.
// eBay only allows searches with a private key, which can't live in a public web page. This worker keeps the key
// (as Cloudflare secrets), asks eBay's Browse API for listings, and hands back only titles, prices, pictures and links.
// It answers only the garden's own address, caches each search for 6 hours, and stores nothing about anyone.
//
// Secrets (Settings > Variables and Secrets): EBAY_CLIENT_ID (App ID), EBAY_CLIENT_SECRET (Cert ID), both Production.
// Optional plain-text variables: MARKETPLACE (default EBAY_AU), ALLOWED_ORIGINS (default https://caitkne.github.io).

let token = null, tokenUntil = 0;

async function appToken(env) {
  if (token && Date.now() < tokenUntil - 60000) return token;
  const r = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: 'Basic ' + btoa(env.EBAY_CLIENT_ID + ':' + env.EBAY_CLIENT_SECRET) },
    body: 'grant_type=client_credentials&scope=' + encodeURIComponent('https://api.ebay.com/oauth/api_scope'),
  });
  if (!r.ok) throw new Error('eBay sign-in failed: ' + r.status);
  const d = await r.json();
  token = d.access_token; tokenUntil = Date.now() + (d.expires_in || 7200) * 1000;
  return token;
}

export default {
  async fetch(req, env, ctx) {
    const origins = (env.ALLOWED_ORIGINS || 'https://caitkne.github.io').split(',').map(s => s.trim());
    const origin = req.headers.get('Origin') || '';
    const cors = origins.includes(origin) ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' } : {};
    const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
    if (req.method === 'OPTIONS') return new Response(null, { headers: { ...cors, 'Access-Control-Allow-Methods': 'GET' } });
    if (req.method !== 'GET') return json({ error: 'GET only' }, 405);
    if (!cors['Access-Control-Allow-Origin']) return json({ error: 'not allowed' }, 403);
    if (!env.EBAY_CLIENT_ID || !env.EBAY_CLIENT_SECRET) return json({ items: [], error: 'keys not set' }, 500);

    const q = (new URL(req.url).searchParams.get('q') || '').trim().slice(0, 100);
    if (!q) return json({ items: [] });
    const market = env.MARKETPLACE || 'EBAY_AU';
    const cache = caches.default;
    const key = new Request('https://drift-garden.cache/ebay?m=' + market + '&q=' + encodeURIComponent(q.toLowerCase()));
    const hit = await cache.match(key);
    if (hit) return new Response(hit.body, { headers: { ...cors, 'Content-Type': 'application/json' } });

    try {
      const r = await fetch('https://api.ebay.com/buy/browse/v1/item_summary/search?limit=20&q=' + encodeURIComponent(q), {
        headers: { Authorization: 'Bearer ' + await appToken(env), 'X-EBAY-C-MARKETPLACE-ID': market },
      });
      if (r.status === 401) token = null;
      if (!r.ok) return json({ items: [], error: 'eBay said ' + r.status }, 502);
      const d = await r.json();
      const items = (d.itemSummaries || []).filter(x => x.image && x.image.imageUrl && x.itemWebUrl).map(x => ({
        title: x.title, price: x.price ? x.price.value + ' ' + x.price.currency : '', condition: x.condition || '',
        img: x.image.imageUrl, href: x.itemWebUrl,
      }));
      const body = JSON.stringify({ items });
      ctx.waitUntil(cache.put(key, new Response(body, { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'max-age=21600' } })));
      return new Response(body, { headers: { ...cors, 'Content-Type': 'application/json' } });
    } catch (e) {
      return json({ items: [], error: String(e.message || e) }, 502);
    }
  },
};
