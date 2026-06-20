import { ScreenShell } from "../app/ScreenShell";
import { TrainTabs } from "./TrainTabs";

interface Guide {
  q: string; // situation
  a: string; // que faire
}
interface Section {
  title: string;
  emoji: string;
  guides: Guide[];
}

const SECTIONS: Section[] = [
  {
    title: "Enchères",
    emoji: "🂠",
    guides: [
      {
        q: "Combien vaut ma main ?",
        a: "Compte tes points sûrs : Valet d'atout ≈ 20, 9 d'atout ≈ 14, chaque As ≈ 11, et +5/atout au-delà de 2. ~80 points = tu peux prendre.",
      },
      {
        q: "Quelle couleur choisir comme atout ?",
        a: "Celle où tu es le plus long et où tu tiens le Valet et/ou le 9. La longueur d'atout prime sur les belles cartes des autres couleurs.",
      },
      {
        q: "Mon partenaire a ouvert à 80, que dire ?",
        a: "Convention du « 100 fort » : si tu as le Valet ET le 9 de sa couleur, relance à 100 — c'est un message de soutien fort. Sinon, soutiens prudemment ou passe.",
      },
      {
        q: "Quand annoncer Capot ?",
        a: "Seulement avec une main qui prend tous les plis : maîtrise totale de l'atout (Valet, 9, As…) et des As/coupes dans les autres couleurs. Rare, mais ça rapporte 250+.",
      },
      {
        q: "Quand coincher l'adversaire ?",
        a: "Quand tu penses le faire chuter : contrat élevé (120+) et tu tiens beaucoup d'atouts/As. Tu doubles les points — mais tu doubles aussi le risque.",
      },
      {
        q: "Petit jeu ou jeu offensif ?",
        a: "Petit jeu = tu sécurises, tu n'annonces que le sûr. Offensif = tu pousses les enchères et coinches plus large. Adapte selon le score et l'adversaire.",
      },
      {
        q: "Faut-il compter sur son partenaire ?",
        a: "Oui : ton partenaire apporte en moyenne ~20 points. C'est pour ça qu'on peut annoncer un peu au-dessus de sa seule main. Mais s'il a passé, reste prudent.",
      },
      {
        q: "Bicolore : quelle couleur choisir ?",
        a: "Avec deux couleurs jouables, privilégie la plus longue (contrôle des plis) plutôt que la plus 'belle'. La longueur d'atout prime presque toujours.",
      },
      {
        q: "Quand passer même avec de beaux honneurs ?",
        a: "Des As et 10 éparpillés sans longueur d'atout chutent souvent : sans 4+ atouts ni Valet/9, mieux vaut passer ou rester bas.",
      },
    ],
  },
  {
    title: "Jeu de la carte",
    emoji: "🃏",
    guides: [
      {
        q: "Je suis preneur, comment entamer ?",
        a: "Tire tes atouts maîtres (Valet, 9…) pour « faire tomber » ceux des adversaires et protéger tes As dans les autres couleurs.",
      },
      {
        q: "Je défends, comment entamer ?",
        a: "Sors un As maître pour un pli sûr, ou joue dans la couleur appelée par ton partenaire. Évite d'ouvrir l'atout du preneur.",
      },
      {
        q: "Je n'ai pas la couleur demandée, je coupe ?",
        a: "Si l'adversaire est maître : oui, tu coupes (et tu montes si un atout est déjà posé). Si ton partenaire est maître : tu peux « pisser » (te défausser) au lieu de couper.",
      },
      {
        q: "Mon partenaire tient le pli, que faire ?",
        a: "« Charge-le » : donne-lui un maximum de points (As, 10) si tu es sûr qu'il l'emporte. Sinon, défausse-toi petit.",
      },
      {
        q: "Appel direct ou indirect ?",
        a: "Appel DIRECT : tu jettes une grosse carte (9) dans la couleur où tu es fort → « rejoue ici ». Appel INDIRECT : tu jettes une petite carte d'une couleur faible → « pas celle-ci, joue l'autre ».",
      },
      {
        q: "On me demande de l'atout, dois-je monter ?",
        a: "Oui : tu es obligé de monter au-dessus du plus fort atout déjà joué si tu le peux. Sinon, tu mets un atout plus petit (sauf option « pisser »).",
      },
      {
        q: "Quand garder mes maîtres ?",
        a: "Ne gâche pas un As ou un 10 sur un pli que l'adversaire va prendre. Défausse petit et garde tes maîtres pour les plis que tu remporteras.",
      },
      {
        q: "Tirer les atouts ou pas ?",
        a: "En attaque, oui : tire-les pour protéger tes As. En défense, généralement non — tu prives ton partenaire de ses coupes. Laisse plutôt le preneur s'en occuper.",
      },
      {
        q: "Sur quoi se défausser ?",
        a: "Garde tes maîtres et tes longueurs. Défausse une couleur courte sans avenir. Et profites-en pour signaler (appel) où tu es fort.",
      },
    ],
  },
  {
    title: "Avancé",
    emoji: "🧠",
    guides: [
      {
        q: "Compter les points en cours de jeu",
        a: "Garde un compte approximatif : 'mon camp a déjà ~X'. Dès que tu sais le contrat atteint (ou la chute assurée), tu peux jouer plus librement (donner la der, sécuriser).",
      },
      {
        q: "Mémoriser les atouts tombés",
        a: "Il n'y a que 8 atouts. Compte-les : quand les adversaires n'en ont plus, tes cartes deviennent maîtresses et tu peux dérouler sans risque de coupe.",
      },
      {
        q: "Qu'est-ce qu'une impasse ?",
        a: "Capturer une carte adverse placée entre deux des tiennes (ex. As + Dame, Roi chez l'adversaire à droite) en le faisant jouer avant toi. À tenter seulement si tu ne peux pas gagner autrement.",
      },
      {
        q: "Mener un capot",
        a: "Tire tes atouts maîtres pour vider les adversaires, puis déroule tes couleurs maîtresses. Vérifie qu'aucune carte adverse ne peut prendre un pli avant de te lancer.",
      },
      {
        q: "Lire une coinche adverse",
        a: "Un adversaire qui coinche pense te faire chuter : il a souvent de l'atout ou des As bien placés. Joue plus prudemment et compte précisément.",
      },
    ],
  },
];

export function GuidesScreen() {
  return (
    <ScreenShell title="S'entraîner">
      <TrainTabs current="guides" />
      <p className="mb-3 text-sm text-white/70">
        Les réflexes essentiels, situation par situation. Enchères d'abord, puis jeu de la carte.
      </p>
      {SECTIONS.map((s) => (
        <div key={s.title} className="mb-5">
          <h2 className="mb-2 text-base font-bold">
            {s.emoji} {s.title}
          </h2>
          <div className="flex flex-col gap-2">
            {s.guides.map((g, i) => (
              <GuideItem key={i} guide={g} />
            ))}
          </div>
        </div>
      ))}
    </ScreenShell>
  );
}

function GuideItem({ guide }: { guide: Guide }) {
  // Tout est visible (plus d'accordéon à dérouler).
  return (
    <div className="rounded-xl bg-white/8 p-3 ring-1 ring-white/10">
      <p className="font-semibold text-yellow-300">{guide.q}</p>
      <p className="mt-1 text-sm leading-relaxed text-white/85">{guide.a}</p>
    </div>
  );
}
