// Générateur de pages SEO statiques (FR + EN) à partir de données structurées.
//
// Chaque entrée vit dans scripts/seo/data/*.mjs (export default [] d'articles).
// On produit :
//   public/<slug-fr>.html            (page FR)
//   public/en/<slug-en>.html         (page EN, hreflang croisé)
//   public/sitemap.xml               (statiques + générées, 2 langues)
//   public/apprendre-la-coinche.html (hub FR, regénéré)
//   public/en/learn-coinche.html     (hub EN, regénéré)
//
// Lancer : `npm run seo` (intégré au build). Idempotent.

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");
const EN_DIR = join(PUBLIC, "en");
const SITE = "https://coincheur.fr";
const AHREFS = '<script src="https://analytics.ahrefs.com/analytics.js" data-key="mt0GFY89V8kLys/52fBIIw" async></script>';

// Pages écrites à la main (cornerstone) — listées dans les hubs et le sitemap.
const CORNERSTONE = [
  { slug: "regles-coinche.html", fr: "Les règles de la coinche", en: "Coinche rules", prio: 0.8 },
  { slug: "valeur-cartes-coinche.html", fr: "La valeur des cartes", en: "Card values", prio: 0.8 },
  { slug: "compter-points-coinche.html", fr: "Compter les points", en: "Counting points", prio: 0.8 },
  { slug: "annonces-coinche.html", fr: "Les annonces : de 80 au capot", en: "Bidding", prio: 0.8 },
  { slug: "belote-capot-coinche.html", fr: "Belote, capot et générale", en: "Belote, capot", prio: 0.7 },
  { slug: "coinche-vs-contree.html", fr: "Coinche, contrée, belote : différences", en: "Coinche vs belote", prio: 0.7 },
];

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const L = {
  fr: { play: "Jouer", see: "À lire aussi", faq: "Questions fréquentes", guides: "Tous les guides", priv: "Confidentialité", hub: "/apprendre-la-coinche.html" },
  en: { play: "Play", see: "See also", faq: "FAQ", guides: "All guides", priv: "Privacy", hub: "/en/learn-coinche.html" },
};

function pageUrl(lang, slug) {
  return lang === "fr" ? `${SITE}/${slug}.html` : `${SITE}/en/${slug}.html`;
}
function pagePath(lang, slug) {
  return lang === "fr" ? join(PUBLIC, `${slug}.html`) : join(EN_DIR, `${slug}.html`);
}
function relHref(lang, slug) {
  return lang === "fr" ? `/${slug}.html` : `/en/${slug}.html`;
}

function renderArticle(art, lang, idToSlug) {
  const c = art[lang];
  const t = L[lang];
  const fr = art.fr, en = art.en;
  const url = pageUrl(lang, c.slug);
  const sections = c.sections.map((s) => `\n      <h2>${esc(s.h2)}</h2>\n      ${s.html}`).join("\n");
  const faq = (c.faq || []).length
    ? `\n      <h2>${t.faq}</h2>${c.faq.map((f) => `\n      <h3>${esc(f.q)}</h3>\n      <p>${esc(f.a)}</p>`).join("")}`
    : "";
  const related = (c.related || [])
    .map((id) => {
      const target = idToSlug[id]?.[lang];
      const label = idToSlug[id]?.[`${lang}Title`];
      return target ? `\n        <a href="${relHref(lang, target)}">${esc(label)}</a>` : "";
    })
    .filter(Boolean)
    .join("");
  const relatedBlock = related ? `\n      <h2>${t.see}</h2>\n      <nav class="related">${related}\n      </nav>` : "";
  const faqLd = (c.faq || []).length
    ? `\n    <script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      })}</script>`
    : "";
  const articleLd = `\n    <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.h1,
    description: c.description,
    inLanguage: lang,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "Coincheur" },
    publisher: { "@type": "Organization", name: "Coincheur" },
  })}</script>`;
  const enHref = `${SITE}/en/${en.slug}.html`;
  const frHref = `${SITE}/${fr.slug}.html`;
  const playHref = lang === "fr" ? "/" : "/?lang=en";
  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(c.title)} — Coincheur</title>
    <meta name="description" content="${esc(c.description)}" />
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="fr" href="${frHref}" />
    <link rel="alternate" hreflang="en" href="${enHref}" />
    <link rel="alternate" hreflang="x-default" href="${frHref}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${esc(c.title)}" />
    <meta property="og:description" content="${esc(c.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${SITE}/icon-512.png" />
    <link rel="stylesheet" href="/article.css" />
    ${AHREFS}${articleLd}${faqLd}
  </head>
  <body>
    <header class="top">
      <div class="wrap"><a class="brand" href="${lang === "fr" ? "/" : "/?lang=en"}">Coin<span>cheur</span></a><a class="cta" href="${playHref}">${t.play}</a></div>
    </header>
    <main class="wrap">
      <h1>${esc(c.h1)}</h1>
      <p class="muted">${c.lead}</p>
${sections}
      <div class="box">${c.cta || (lang === "fr"
        ? `Envie de t'entraîner&nbsp;? Joue gratuitement à la coinche contre des IA paramétrables sur <a href="/">Coincheur</a>.`
        : `Want to practise? Play coinche for free against tunable AIs on <a href="/?lang=en">Coincheur</a>.`)}</div>${relatedBlock}${faq}
      <footer>
        © Coincheur · <a href="${t.hub}">${t.guides}</a> · <a href="${playHref}">${t.play}</a> · <a href="/privacy.html">${t.priv}</a>
      </footer>
    </main>
  </body>
</html>
`;
}

function renderHub(lang, cats, idToSlug) {
  const t = L[lang];
  const isFr = lang === "fr";
  const title = isFr
    ? "Apprendre la coinche : tous les guides et règles"
    : "Learn coinche: all guides and rules";
  const desc = isFr
    ? "Tous nos guides pour apprendre la coinche (contrée) : règles, annonces, comptage des points, stratégie, variantes et lexique. Du débutant au joueur confirmé."
    : "All our guides to learn coinche (French belote variant): rules, bidding, scoring, strategy, variants and glossary. From beginner to advanced.";
  const url = isFr ? `${SITE}/apprendre-la-coinche.html` : `${SITE}/en/learn-coinche.html`;
  const corner = CORNERSTONE.map(
    (c) => `\n        <a href="/${isFr ? c.slug : c.slug}">${esc(isFr ? c.fr : c.en)}</a>`
  ).join("");
  const cornerTitle = isFr ? "Les essentiels" : "The essentials";
  const blocks = cats
    .map((cat) => {
      const links = cat.items
        .map((id) => {
          const s = idToSlug[id];
          return s ? `\n        <a href="${relHref(lang, s[lang])}">${esc(s[`${lang}Title`])}</a>` : "";
        })
        .filter(Boolean)
        .join("");
      if (!links) return "";
      return `\n      <h2>${esc(isFr ? cat.fr : cat.en)}</h2>\n      <nav class="related">${links}\n      </nav>`;
    })
    .filter(Boolean)
    .join("\n");
  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(title)} — Coincheur</title>
    <meta name="description" content="${esc(desc)}" />
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="fr" href="${SITE}/apprendre-la-coinche.html" />
    <link rel="alternate" hreflang="en" href="${SITE}/en/learn-coinche.html" />
    <link rel="alternate" hreflang="x-default" href="${SITE}/apprendre-la-coinche.html" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(desc)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${SITE}/icon-512.png" />
    <link rel="stylesheet" href="/article.css" />
    ${AHREFS}
  </head>
  <body>
    <header class="top">
      <div class="wrap"><a class="brand" href="${isFr ? "/" : "/?lang=en"}">Coin<span>cheur</span></a><a class="cta" href="${isFr ? "/" : "/?lang=en"}">${t.play}</a></div>
    </header>
    <main class="wrap">
      <h1>${esc(title)}</h1>
      <p class="muted">${isFr
        ? "Le centre de ressources Coincheur. Choisis un thème et progresse à ton rythme — règles, annonces, comptage, stratégie, variantes, lexique."
        : "The Coincheur resource center. Pick a topic and progress at your pace — rules, bidding, scoring, strategy, variants, glossary."}</p>
      <h2>${cornerTitle}</h2>
      <nav class="related">${corner}\n      </nav>
${blocks}
      <footer>
        © Coincheur · <a href="${isFr ? "/" : "/?lang=en"}">${t.play}</a> · <a href="/privacy.html">${t.priv}</a>
      </footer>
    </main>
  </body>
</html>
`;
}

function renderSitemap(arts) {
  const today = "2026-06-26";
  const rows = [];
  rows.push(`  <url><loc>${SITE}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`);
  rows.push(`  <url><loc>${SITE}/apprendre-la-coinche.html</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`);
  rows.push(`  <url><loc>${SITE}/en/learn-coinche.html</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`);
  for (const c of CORNERSTONE)
    rows.push(`  <url><loc>${SITE}/${c.slug}</loc><changefreq>monthly</changefreq><priority>${c.prio}</priority></url>`);
  for (const a of arts) {
    const p = a.priority || 0.6;
    rows.push(`  <url><loc>${pageUrl("fr", a.fr.slug)}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${p}</priority></url>`);
    rows.push(`  <url><loc>${pageUrl("en", a.en.slug)}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${p}</priority></url>`);
  }
  rows.push(`  <url><loc>${SITE}/privacy.html</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`);
  rows.push(`  <url><loc>${SITE}/terms.html</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.join("\n")}\n</urlset>\n`;
}

async function main() {
  const dataDir = join(__dirname, "seo", "data");
  let files = [];
  try {
    files = (await readdir(dataDir)).filter((f) => f.endsWith(".mjs")).sort();
  } catch {
    console.error("No scripts/seo/data directory — nothing to generate.");
    return;
  }
  const arts = [];
  const cats = [];
  for (const f of files) {
    const mod = await import(join(dataDir, f) + `?t=0`);
    const list = mod.default || mod.articles || [];
    if (mod.category) cats.push({ ...mod.category, items: list.map((a) => a.id) });
    arts.push(...list);
  }

  // Index id -> slugs/titres pour résoudre les liens "related" et les hubs.
  const idToSlug = {};
  const seen = new Set();
  for (const a of arts) {
    if (!a.id || !a.fr?.slug || !a.en?.slug) throw new Error(`Article invalide: ${JSON.stringify(a.id)}`);
    if (seen.has(a.id)) throw new Error(`id dupliqué: ${a.id}`);
    seen.add(a.id);
    idToSlug[a.id] = { fr: a.fr.slug, en: a.en.slug, frTitle: a.fr.linkLabel || a.fr.h1, enTitle: a.en.linkLabel || a.en.h1 };
  }
  // Slugs uniques par langue.
  for (const lang of ["fr", "en"]) {
    const s = new Set();
    for (const a of arts) {
      if (s.has(a[lang].slug)) throw new Error(`slug ${lang} dupliqué: ${a[lang].slug}`);
      s.add(a[lang].slug);
    }
  }

  await mkdir(EN_DIR, { recursive: true });
  let n = 0;
  for (const a of arts) {
    await writeFile(pagePath("fr", a.fr.slug), renderArticle(a, "fr", idToSlug));
    await writeFile(pagePath("en", a.en.slug), renderArticle(a, "en", idToSlug));
    n += 2;
  }
  await writeFile(join(PUBLIC, "apprendre-la-coinche.html"), renderHub("fr", cats, idToSlug));
  await writeFile(join(EN_DIR, "learn-coinche.html"), renderHub("en", cats, idToSlug));
  await writeFile(join(PUBLIC, "sitemap.xml"), renderSitemap(arts));

  console.log(`SEO: ${arts.length} articles → ${n} pages (FR+EN) + 2 hubs + sitemap (${arts.length * 2 + CORNERSTONE.length + 4} URLs).`);
  void readFile; // (réservé)
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
