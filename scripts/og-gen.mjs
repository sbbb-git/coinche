import { chromium } from "playwright-core";
const EXE = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
*{margin:0;box-sizing:border-box;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}
body{width:1200px;height:630px;overflow:hidden;
  background:linear-gradient(135deg,#0b6b43,#053a22)}
.wrap{width:100%;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;color:#fff;padding:0 80px;text-align:center}
.brand{font-weight:900;font-size:104px;letter-spacing:-2px}
.brand span{color:#ffd84d}
.tag{margin-top:18px;font-size:38px;color:#eaf3ee;font-weight:600}
.sub{margin-top:10px;font-size:28px;color:#bfe0cf}
.cards{margin-top:46px;display:flex;gap:22px}
.card{width:120px;height:168px;background:#fff;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.35);
  display:flex;align-items:center;justify-content:center;position:relative}
.r{position:absolute;top:10px;left:14px;font-weight:800;font-size:30px}
.sym{font-size:74px}
.red{color:#d11}.blk{color:#111}
</style></head><body><div class="wrap">
<div class="brand">Coin<span>cheur</span></div>
<div class="tag">Coinche &amp; belote contrée &middot; joue, apprends, progresse</div>
<div class="sub">Gratuit &middot; contre des IA &middot; coach &amp; exercices</div>
<div class="cards">
  <div class="card blk"><span class="r">A</span><span class="sym">&spades;</span></div>
  <div class="card red"><span class="r">V</span><span class="sym">&hearts;</span></div>
  <div class="card red"><span class="r">9</span><span class="sym">&diams;</span></div>
  <div class="card blk"><span class="r">10</span><span class="sym">&clubs;</span></div>
</div></div></body></html>`;
const b = await chromium.launch({ executablePath: EXE });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html, { waitUntil: "networkidle" });
await p.screenshot({ path: "/home/user/coinche/public/og-default.png" });
await b.close();
console.log("OG image written");
