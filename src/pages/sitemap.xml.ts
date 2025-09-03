import type { APIRoute } from 'astro';

const routes = [
  '/',
  '/about/',
  '/tools/',
  '/tools/tdee/',
  '/tools/one-rep-max/',
];

export const GET: APIRoute = ({ site }) => {
  const base = site?.toString() ?? 'https://bodybuilding.perm.ru';
  const urls = routes.map((p) => `  <url><loc>${new URL(p, base).toString()}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};


