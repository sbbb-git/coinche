// Rendu lisible d'un conseil du coach : une ligne par \n, et les segments
// encadrés par **…** (pourcentages, cartes, deltas) ressortent en gras coloré.
// Centralise l'affichage utilisé par la barre de jeu, les exercices, la review
// et le défi du jour, pour une grammaire visuelle cohérente.

function renderLine(line: string, key: number) {
  const parts = line.split("**");
  return (
    <span key={key} className="block">
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-bold text-amber-300">
            {p}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </span>
  );
}

export function CoachText({ text, className = "" }: { text: string; className?: string }) {
  const lines = text.split("\n");
  return (
    <span className={className}>
      {lines.map((l, i) => renderLine(l, i))}
    </span>
  );
}
