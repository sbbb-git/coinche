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
import { dirname, join, relative } from "node:path";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");
const EN_DIR = join(PUBLIC, "en");
const SITE = "https://coincheur.fr";
const AHREFS = '<script src="https://analytics.ahrefs.com/analytics.js" data-key="mt0GFY89V8kLys/52fBIIw" async></script>';

// Pub (AdSense) sur les pages statiques : injectée UNIQUEMENT si un éditeur est
// fourni au build (ADSENSE_CLIENT) ET après consentement. Sinon : pages inchangées.
const ADSENSE_CLIENT = /^ca-pub-\d+$/.test(process.env.ADSENSE_CLIENT || "") ? process.env.ADSENSE_CLIENT : "";

const CC_TXT = {
  fr: { text: "On utilise des cookies de mesure d'audience et de publicité pour améliorer le jeu et le garder gratuit.", more: "En savoir plus", yes: "Accepter", no: "Refuser", priv: "/privacy.html" },
  en: { text: "We use analytics and advertising cookies to improve the game and keep it free.", more: "Learn more", yes: "Accept", no: "Decline", priv: "/en/privacy.html" },
};

/** Loader AdSense (head), chargé seulement si consentement déjà donné. */
function adsHead() {
  if (!ADSENSE_CLIENT) return "";
  return `\n    <script>(function(){try{if(localStorage.getItem('cookie-consent')==='granted'){var s=document.createElement('script');s.async=true;s.crossOrigin='anonymous';s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}';document.head.appendChild(s);}}catch(e){}})();</script>`;
}

/** Bandeau de consentement minimal (body), partage la clé `cookie-consent`. */
function adsBanner(lang) {
  if (!ADSENSE_CLIENT) return "";
  const x = CC_TXT[lang] || CC_TXT.fr;
  return `\n    <div id="cc" class="cc" hidden role="dialog" aria-modal="true" tabindex="-1" aria-label="${esc(x.text)}"><p>${esc(x.text)} <a href="${esc(x.priv)}">${esc(x.more)}</a></p><div class="cc-b"><button id="cc-y">${esc(x.yes)}</button><button id="cc-n">${esc(x.no)}</button></div></div>\n    <script>(function(){try{var c=localStorage.getItem('cookie-consent');if(c)return;var el=document.getElementById('cc');el.hidden=false;document.getElementById('cc-y').focus();function load(){var s=document.createElement('script');s.async=true;s.crossOrigin='anonymous';s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}';document.head.appendChild(s);}function deny(){localStorage.setItem('cookie-consent','denied');el.hidden=true;}document.getElementById('cc-y').onclick=function(){localStorage.setItem('cookie-consent','granted');el.hidden=true;load();};document.getElementById('cc-n').onclick=deny;el.addEventListener('keydown',function(e){if(e.key==='Escape'){e.preventDefault();deny();}});}catch(e){}})();</script>`;
}

// Pages écrites à la main (cornerstone) — listées dans les hubs et le sitemap.
const CORNERSTONE = [
  { slug: "regles-coinche.html", fr: "Les règles de la coinche", en: "Coinche rules", prio: 0.8 },
  { slug: "valeur-cartes-coinche.html", fr: "La valeur des cartes", en: "Card values", prio: 0.8 },
  { slug: "compter-points-coinche.html", fr: "Compter les points", en: "Counting points", prio: 0.8 },
  { slug: "annonces-coinche.html", fr: "Les annonces : de 80 au capot", en: "Bidding", prio: 0.8 },
  { slug: "belote-capot-coinche.html", fr: "Belote, capot et générale", en: "Belote, capot", prio: 0.7 },
  { slug: "coinche-vs-contree.html", fr: "Coinche, contrée, belote : différences", en: "Coinche vs belote", prio: 0.7 },
];

// Pages piliers : liées DEPUIS chaque article (maillage cluster -> pilier).
const PILLARS = [
  { id: "pil-strategie", fr: ["strategie-coinche", "Stratégie"], en: ["coinche-strategy", "Strategy"] },
  { id: "pil-progresser", fr: ["devenir-bon-coinche", "Devenir bon"], en: ["get-good-at-coinche", "Get good"] },
  { id: "pil-astuces", fr: ["astuces-conseils-coinche", "Astuces & conseils"], en: ["coinche-tips-and-tricks", "Tips & tricks"] },
  { id: "pil-bien-jouer", fr: ["comment-bien-jouer-coinche", "Bien jouer"], en: ["how-to-play-coinche-well", "Play well"] },
  { id: "pil-gagner", fr: ["comment-gagner-coinche", "Comment gagner"], en: ["how-to-win-coinche", "How to win"] },
  { id: "bc-pilier", fr: ["belote-contree", "Belote contrée"], en: ["contract-belote", "Contract belote"] },
];

/** Nav vers les piliers (on retire le pilier courant pour éviter l'auto-lien). */
function pillarsNav(lang, currentId) {
  const links = PILLARS.filter((p) => p.id !== currentId)
    .map((p) => `\n        <a href="${relHref(lang, p[lang][0])}">${esc(p[lang][1])}</a>`)
    .join("");
  const title = lang === "fr" ? "Guides essentiels" : "Essential guides";
  return `\n      <h2>${title}</h2>\n      <nav class="related">${links}\n      </nav>`;
}

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const BUILD_DATE = new Date().toISOString().slice(0, 10);
const _gitCache = new Map();
/** Date du dernier commit qui a touché un fichier (lastmod réel). Repli : date du build.
 *  Nécessite l'historique git (fetch-depth: 0 en CI) ; sinon repli propre. */
function gitDate(absPath) {
  if (_gitCache.has(absPath)) return _gitCache.get(absPath);
  let d = BUILD_DATE;
  try {
    const rel = relative(ROOT, absPath);
    const out = execSync(`git log -1 --format=%cs -- "${rel}"`, { cwd: ROOT, stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) d = out;
  } catch {
    /* git indisponible : on garde la date du build */
  }
  _gitCache.set(absPath, d);
  return d;
}

// Garde-fou anti-injection : le HTML des sections/lead/cta est inséré tel quel
// dans la page. On interdit donc tout vecteur de script/XSS.
function sanitizeHtml(s, where = "contenu") {
  const str = String(s);
  if (/<script/i.test(str)) throw new Error(`HTML interdit (<script) dans ${where}: ${str.slice(0, 80)}`);
  if (/javascript:/i.test(str)) throw new Error(`HTML interdit (javascript:) dans ${where}: ${str.slice(0, 80)}`);
  if (/on\w+\s*=/i.test(str)) throw new Error(`HTML interdit (attribut on...=) dans ${where}: ${str.slice(0, 80)}`);
  return str;
}

// JSON-LD inséré dans un <script> : on neutralise les </script> éventuels.
const jsonLd = (obj) => JSON.stringify(obj).replace(/<\/script>/gi, "<\\/script>");

// Valide les champs requis d'un article pour une langue donnée.
function validateContent(c, lang, id) {
  if (!c || typeof c !== "object") throw new Error(`Article ${id} (${lang}): contenu manquant`);
  for (const field of ["h1", "title", "description", "lead"]) {
    if (!c[field] || typeof c[field] !== "string") throw new Error(`Article ${id} (${lang}): champ requis manquant ou invalide: ${field}`);
  }
  if (!Array.isArray(c.sections)) throw new Error(`Article ${id} (${lang}): "sections" doit être un tableau`);
}

const L = {
  fr: { play: "Jouer", see: "À lire aussi", faq: "Questions fréquentes", guides: "Tous les guides", priv: "Confidentialité", privHref: "/privacy.html", hub: "/apprendre-la-coinche.html", plan: "Plan du site", planHref: "/plan-du-site.html" },
  en: { play: "Play", see: "See also", faq: "FAQ", guides: "All guides", priv: "Privacy", privHref: "/en/privacy.html", hub: "/en/learn-coinche.html", plan: "Site map", planHref: "/en/sitemap.html" },
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
  // Validation des deux langues avant tout rendu (fr ET en).
  validateContent(art.fr, "fr", art.id);
  validateContent(art.en, "en", art.id);
  const c = art[lang];
  const t = L[lang];
  const fr = art.fr, en = art.en;
  const url = pageUrl(lang, c.slug);
  const sections = c.sections
    .map((s) => `\n      <h2>${esc(s.h2)}</h2>\n      ${sanitizeHtml(s.html, `${art.id}/${lang}/section`)}`)
    .join("\n");
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
    ? `\n    <script type="application/ld+json">${jsonLd({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      })}</script>`
    : "";
  const articleLd = `\n    <script type="application/ld+json">${jsonLd({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.h1,
    description: c.description,
    inLanguage: lang,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "Coincheur" },
    publisher: { "@type": "Organization", name: "Coincheur" },
  })}</script>`;
  const homeHref = lang === "fr" ? "/" : "/?lang=en";
  const crumbHub = lang === "fr" ? `${SITE}/apprendre-la-coinche.html` : `${SITE}/en/learn-coinche.html`;
  const crumbHome = lang === "fr" ? "Accueil" : "Home";
  const breadcrumbLd = `\n    <script type="application/ld+json">${jsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: crumbHome, item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Guides", item: crumbHub },
      { "@type": "ListItem", position: 3, name: c.h1, item: url },
    ],
  })}</script>`;
  const crumbs = `\n      <nav class="crumbs" aria-label="${lang === "fr" ? "Fil d'Ariane" : "Breadcrumb"}"><a href="${homeHref}">${crumbHome}</a> › <a href="${t.hub}">Guides</a> › <span>${esc(c.h1)}</span></nav>`;
  const enHref = `${SITE}/en/${en.slug}.html`;
  const frHref = `${SITE}/${fr.slug}.html`;
  const playHref = lang === "fr" ? "/" : "/?lang=en";
  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
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
    ${AHREFS}${adsHead()}${articleLd}${faqLd}${breadcrumbLd}
  </head>
  <body>
    <header class="top">
      <div class="wrap"><a class="brand" href="${lang === "fr" ? "/" : "/?lang=en"}">Coin<span>cheur</span></a><a class="cta" href="${playHref}">${t.play}</a></div>
    </header>
    <main class="wrap">${crumbs}
      <h1>${esc(c.h1)}</h1>
      <p class="muted">${sanitizeHtml(c.lead, `${art.id}/${lang}/lead`)}</p>
${sections}
      <div class="box">${c.cta ? sanitizeHtml(c.cta, `${art.id}/${lang}/cta`) : (lang === "fr"
        ? `Envie de t'entraîner&nbsp;? Joue gratuitement à la coinche contre des IA paramétrables sur <a href="/">Coincheur</a>.`
        : `Want to practise? Play coinche for free against tunable AIs on <a href="/?lang=en">Coincheur</a>.`)}</div>${relatedBlock}${faq}${pillarsNav(lang, art.id)}
      <footer>
        © Coincheur · <a href="${t.hub}">${t.guides}</a> · <a href="${t.planHref}">${t.plan}</a> · <a href="${playHref}">${t.play}</a> · <a href="${t.privHref}">${t.priv}</a>
      </footer>
    </main>${adsBanner(lang)}
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
  // Les pages cornerstone n'existent qu'en FR : on n'affiche le bloc « essentiels »
  // que sur le hub FR pour éviter des liens morts sur le hub EN.
  const cornerBlock = isFr
    ? `\n      <h2>Les essentiels</h2>\n      <nav class="related">${CORNERSTONE.map(
        (c) => `\n        <a href="/${c.slug}">${esc(c.fr)}</a>`
      ).join("")}\n      </nav>`
    : "";
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
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
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
    ${AHREFS}${adsHead()}
  </head>
  <body>
    <header class="top">
      <div class="wrap"><a class="brand" href="${isFr ? "/" : "/?lang=en"}">Coin<span>cheur</span></a><a class="cta" href="${isFr ? "/" : "/?lang=en"}">${t.play}</a></div>
    </header>
    <main class="wrap">
      <h1>${esc(title)}</h1>
      <p class="muted">${isFr
        ? "Le centre de ressources Coincheur. Choisis un thème et progresse à ton rythme — règles, annonces, comptage, stratégie, variantes, lexique."
        : "The Coincheur resource center. Pick a topic and progress at your pace — rules, bidding, scoring, strategy, variants, glossary."}</p>${cornerBlock}
${blocks}
      <footer>
        © Coincheur · <a href="${t.planHref}">${t.plan}</a> · <a href="${isFr ? "/" : "/?lang=en"}">${t.play}</a> · <a href="${t.privHref}">${t.priv}</a>
      </footer>
    </main>${adsBanner(lang)}
  </body>
</html>
`;
}

function renderSitemap(arts) {
  const rows = [];
  const url = (loc, prio, lastmod, freq = "monthly") =>
    `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}<changefreq>${freq}</changefreq><priority>${prio}</priority></url>`;
  rows.push(url(`${SITE}/`, "1.0", BUILD_DATE, "weekly"));
  rows.push(url(`${SITE}/apprendre-la-coinche.html`, "0.9", BUILD_DATE, "weekly"));
  rows.push(url(`${SITE}/en/learn-coinche.html`, "0.9", BUILD_DATE, "weekly"));
  rows.push(url(`${SITE}/plan-du-site.html`, "0.4", BUILD_DATE, "weekly"));
  rows.push(url(`${SITE}/en/sitemap.html`, "0.4", BUILD_DATE, "weekly"));
  for (const c of CORNERSTONE)
    rows.push(url(`${SITE}/${c.slug}`, c.prio, gitDate(join(PUBLIC, c.slug))));
  for (const a of arts) {
    const p = a.priority || 0.6;
    const lm = a.__src ? gitDate(a.__src) : BUILD_DATE; // date du dernier commit du contenu
    rows.push(url(pageUrl("fr", a.fr.slug), p, lm));
    rows.push(url(pageUrl("en", a.en.slug), p, lm));
  }
  rows.push(url(`${SITE}/privacy.html`, "0.3", gitDate(join(PUBLIC, "privacy.html")), "yearly"));
  rows.push(url(`${SITE}/terms.html`, "0.3", gitDate(join(PUBLIC, "terms.html")), "yearly"));
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.join("\n")}\n</urlset>\n`;
}

/** Plan du site HTML (humain) : cornerstone + piliers + toutes les catégories. */
function renderPlan(lang, cats, idToSlug) {
  const t = L[lang];
  const isFr = lang === "fr";
  const title = isFr ? "Plan du site : toutes les pages" : "Site map: all pages";
  const desc = isFr
    ? "Toutes les pages de Coincheur : règles, guides, stratégie, lexique et variantes de la coinche."
    : "Every Coincheur page: rules, guides, strategy, glossary and coinche variants.";
  const url = isFr ? `${SITE}/plan-du-site.html` : `${SITE}/en/sitemap.html`;
  const section = (heading, links) =>
    links ? `\n      <h2>${esc(heading)}</h2>\n      <nav class="related">${links}\n      </nav>` : "";
  const corner = isFr
    ? section(
        "Les essentiels",
        CORNERSTONE.map((c) => `\n        <a href="/${c.slug}">${esc(c.fr)}</a>`).join(""),
      )
    : "";
  const blocks = cats
    .map((cat) =>
      section(
        isFr ? cat.fr : cat.en,
        cat.items
          .map((id) => {
            const s = idToSlug[id];
            return s ? `\n        <a href="${relHref(lang, s[lang])}">${esc(s[`${lang}Title`])}</a>` : "";
          })
          .filter(Boolean)
          .join(""),
      ),
    )
    .filter(Boolean)
    .join("\n");
  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>${esc(title)} — Coincheur</title>
    <meta name="description" content="${esc(desc)}" />
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="fr" href="${SITE}/plan-du-site.html" />
    <link rel="alternate" hreflang="en" href="${SITE}/en/sitemap.html" />
    <link rel="stylesheet" href="/article.css" />
    ${AHREFS}${adsHead()}
  </head>
  <body>
    <header class="top">
      <div class="wrap"><a class="brand" href="${isFr ? "/" : "/?lang=en"}">Coin<span>cheur</span></a><a class="cta" href="${isFr ? "/" : "/?lang=en"}">${t.play}</a></div>
    </header>
    <main class="wrap">
      <h1>${esc(title)}</h1>
      <p class="muted">${esc(desc)}</p>${corner}
${blocks}
      <footer>
        © Coincheur · <a href="${t.hub}">${t.guides}</a> · <a href="${isFr ? "/" : "/?lang=en"}">${t.play}</a> · <a href="${t.privHref}">${t.priv}</a>
      </footer>
    </main>${adsBanner(lang)}
  </body>
</html>
`;
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
    list.forEach((a) => (a.__src = join(dataDir, f))); // pour le lastmod réel (git)
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
  await writeFile(join(PUBLIC, "plan-du-site.html"), renderPlan("fr", cats, idToSlug));
  await writeFile(join(EN_DIR, "sitemap.html"), renderPlan("en", cats, idToSlug));
  await writeFile(join(PUBLIC, "sitemap.xml"), renderSitemap(arts));

  console.log(`SEO: ${arts.length} articles → ${n} pages (FR+EN) + 2 hubs + plan + sitemap (${arts.length * 2 + CORNERSTONE.length + 7} URLs).`);
  void readFile; // (réservé)
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
