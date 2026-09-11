/* Bandeau de consentement + mesure d'audience pour les pages statiques (guides SEO).
 *
 * Privacy-first : AUCUN script Google n'est chargé tant que l'utilisateur n'a pas
 * cliqué « Accepter ». Le choix est stocké dans localStorage sous la clé
 * « cookie-consent », la MÊME que celle de l'application React : accepter sur un
 * guide vaut pour le jeu, et inversement.
 *
 * Les identifiants sont passés en attributs de la balise :
 *   <script defer src="/consent.js" data-ga="G-XXXX" data-ads="ca-pub-XXXX"></script>
 * Un attribut vide = service non chargé.
 */
(function () {
  "use strict";

  var tag = document.currentScript || document.querySelector("script[data-ga]");
  var GA = (tag && tag.getAttribute("data-ga")) || "";
  var ADS = (tag && tag.getAttribute("data-ads")) || "";
  var KEY = "cookie-consent";
  var EN = (document.documentElement.lang || "fr").slice(0, 2) === "en";

  var T = EN
    ? {
        text: "We use analytics cookies to understand what people read and keep this site free.",
        more: "Learn more",
        yes: "Accept",
        no: "Decline",
        priv: "/en/privacy.html",
        label: "Cookie consent",
      }
    : {
        text: "On utilise des cookies de mesure d'audience pour savoir ce qui est lu et garder le site gratuit.",
        more: "En savoir plus",
        yes: "Accepter",
        no: "Refuser",
        priv: "/privacy.html",
        label: "Consentement aux cookies",
      };

  function read() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }
  function write(v) {
    try {
      localStorage.setItem(KEY, v);
    } catch (e) {
      /* stockage indisponible : le choix vaut pour la page courante */
    }
  }

  function script(src, crossOrigin) {
    var s = document.createElement("script");
    s.async = true;
    if (crossOrigin) s.crossOrigin = "anonymous";
    s.src = src;
    document.head.appendChild(s);
  }

  var started = false;
  function start() {
    if (started) return;
    started = true;
    if (GA) {
      var w = window;
      w.dataLayer = w.dataLayer || [];
      w.gtag =
        w.gtag ||
        function () {
          w.dataLayer.push(arguments);
        };
      w.gtag("js", new Date());
      w.gtag("consent", "default", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
      });
      script("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA), false);
      w.gtag("config", GA);
    }
    if (ADS) {
      script("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(ADS), true);
    }
  }

  var choice = read();
  if (choice === "granted") {
    start();
    return;
  }
  if (choice === "denied" || (!GA && !ADS)) return;

  /* --- Bandeau ------------------------------------------------------------ */
  function banner() {
    var css = document.createElement("style");
    css.textContent =
      "#cc{position:fixed;left:12px;right:12px;bottom:12px;z-index:60;margin:0 auto;max-width:640px;" +
      "background:#0b3d28;color:#fff;border:1px solid rgba(255,255,255,.18);border-radius:14px;" +
      "padding:14px;font:14px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;" +
      "box-shadow:0 10px 30px rgba(0,0,0,.35)}" +
      "#cc[hidden]{display:none!important}" +
      "#cc p{margin:0 0 10px}#cc a{color:#ffd84d}" +
      "#cc .cc-b{display:flex;gap:8px}" +
      "#cc .cc-b button{min-height:44px;flex:1;border:0;border-radius:10px;font:inherit;font-weight:700;cursor:pointer}" +
      "#cc-y{background:#ffd84d;color:#063}#cc-n{background:rgba(255,255,255,.15);color:#fff}" +
      "@media print{#cc{display:none!important}}";
    document.head.appendChild(css);

    var el = document.createElement("div");
    el.id = "cc";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", T.label);
    var p = document.createElement("p");
    p.appendChild(document.createTextNode(T.text + " "));
    var a = document.createElement("a");
    a.href = T.priv;
    a.textContent = T.more;
    p.appendChild(a);
    var row = document.createElement("div");
    row.className = "cc-b";
    var yes = document.createElement("button");
    yes.id = "cc-y";
    yes.type = "button";
    yes.textContent = T.yes;
    var no = document.createElement("button");
    no.id = "cc-n";
    no.type = "button";
    no.textContent = T.no;
    row.appendChild(yes);
    row.appendChild(no);
    el.appendChild(p);
    el.appendChild(row);
    document.body.appendChild(el);

    function close() {
      el.remove();
    }
    yes.onclick = function () {
      write("granted");
      close();
      start();
    };
    no.onclick = function () {
      write("denied");
      close();
    };
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.contains(el)) {
        write("denied");
        close();
      }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", banner);
  else banner();
})();
