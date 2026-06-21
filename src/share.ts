import { SITE_URL } from "./config";

// Génère une image (PNG) du résultat de partie et la partage (ou la télécharge).
// Pur canvas, aucun asset.

export async function shareResultImage(opts: { won: boolean; scoreYou: number; scoreThem: number }): Promise<void> {
  const { won, scoreYou, scoreThem } = opts;
  const S = 1080;
  const canvas = document.createElement("canvas");
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Fond feutre
  const g = ctx.createLinearGradient(0, 0, S, S);
  g.addColorStop(0, "#0b6b43");
  g.addColorStop(1, "#053a22");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);

  ctx.textAlign = "center";
  ctx.fillStyle = "#f5c518";
  ctx.font = "bold 88px system-ui, sans-serif";
  ctx.fillText("Coincheur", S / 2, 180);

  ctx.font = "120px system-ui, sans-serif";
  ctx.fillText(won ? "🏆" : "🃏", S / 2, 360);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 96px system-ui, sans-serif";
  ctx.fillText(won ? "Victoire !" : "Bien joué", S / 2, 500);

  // Score
  ctx.font = "bold 200px system-ui, sans-serif";
  ctx.fillText(`${scoreYou} – ${scoreThem}`, S / 2, 720);
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = "44px system-ui, sans-serif";
  ctx.fillText("Toi vs IA · Coinche / Belote contrée", S / 2, 800);

  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "40px system-ui, sans-serif";
  ctx.fillText(SITE_URL.replace(/^https?:\/\//, ""), S / 2, 1000);

  const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, "image/png"));
  if (!blob) return;
  const file = new File([blob], "coincheur.png", { type: "image/png" });

  try {
    const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
    if (nav.share && nav.canShare?.({ files: [file] })) {
      await nav.share({ files: [file], text: `${won ? "Victoire" : "Partie"} à la Coinche ! ${SITE_URL}` });
      return;
    }
  } catch {
    /* annulé ou non supporté → on télécharge */
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "coincheur.png";
  a.click();
  URL.revokeObjectURL(url);
}
