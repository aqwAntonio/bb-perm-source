import type { APIRoute } from 'astro';

const routes = [
  '/',
  '/about/',
  '/privacy/',
  '/add-to-home/',
  '/tools/',
  '/tools/tdee/',
  '/tools/one-rep-max/',
  '/tools/volume/',
  '/tools/converters/',
  '/tools/timer/',
  '/tools/checklist/',
  '/tools/recipe-generator/',
  '/tools/recipe-favorites/',
  '/tools/program-generator/',
];

export const GET: APIRoute = ({ site }) => {
  const base = site?.toString() ?? 'https://bodybuilding.perm.ru';
  const urls = routes.map((p) => `  <url><loc>${new URL(p, base).toString()}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};


