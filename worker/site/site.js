// Serves selvedge.garden. The site itself is published by GitHub Pages (caitkne.github.io/drift-garden);
// this worker passes each request through, so every push to main shows up here too. www goes to the bare name.
const ORIGIN = 'https://caitkne.github.io/drift-garden';
export default {
  async fetch(req) {
    const url = new URL(req.url);
    if (url.hostname.startsWith('www.')) return Response.redirect('https://selvedge.garden' + url.pathname + url.search, 301);
    if (req.method !== 'GET' && req.method !== 'HEAD') return new Response('GET only', { status: 405 });
    const res = await fetch(ORIGIN + url.pathname + url.search, { method: req.method, redirect: 'manual', cf: { cacheTtl: 60, cacheEverything: true } });
    const headers = new Headers(res.headers);
    // GitHub's own redirects (like /garden to /garden/) point back here
    const loc = headers.get('Location');
    if (loc) headers.set('Location', loc.replace(/^https?:\/\/caitkne\.github\.io\/drift-garden/, 'https://selvedge.garden'));
    headers.set('Cache-Control', 'public, max-age=60');
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    ['x-github-request-id', 'x-fastly-request-id', 'x-served-by', 'x-cache', 'x-cache-hits', 'x-timer', 'via', 'x-proxy-cache'].forEach(h => headers.delete(h));
    return new Response(res.body, { status: res.status, headers });
  },
};
