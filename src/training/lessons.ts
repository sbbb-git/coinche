// Parcours pédagogique progressif. Chaque leçon = une suite d'étapes (cartes
// de texte). Certaines invitent à enchaîner sur un exercice.

export interface Lesson {
  id: string;
  emoji: string;
  title: string;
  steps: string[];
  practice?: "bid" | "play"; // propose un exercice à la fin
}

export const LESSONS: Lesson[] = [
  {
    id: "bases",
    emoji: "🎓",
    title: "Les bases",
    steps: [
      "La Coinche se joue à 4, en 2 équipes de 2. Les partenaires sont assis face à face : toi (en bas) et Nord. Tes adversaires sont Ouest et Est.",
      "On joue avec 32 cartes (du 7 à l'As). Chaque joueur reçoit 8 cartes, distribuées par paquets de 3 et 2.",
      "Une donne se déroule en deux temps : d'abord les ENCHÈRES (on décide qui « prend » et avec quel atout), puis le JEU DE LA CARTE (on joue les 8 plis).",
      "Le but : marquer des points en remportant des plis riches. La première équipe à atteindre le score cible (souvent 1000) gagne la partie.",
    ],
  },
  {
    id: "points",
    emoji: "🔢",
    title: "Compter les points",
    steps: [
      "Une donne vaut 162 points : 152 dans les cartes + 10 pour le « dix de der » (le dernier pli).",
      "À l'atout, l'ordre et les valeurs changent : Valet = 20, 9 = 14, puis As = 11, 10 = 10, Roi = 4, Dame = 3, 8 et 7 = 0.",
      "Hors atout (couleurs ordinaires) : As = 11, 10 = 10, Roi = 4, Dame = 3, Valet = 2, le reste 0.",
      "La Belote (Roi + Dame d'atout dans la même main) rapporte 20 points, et elle est imprenable : tu la gardes même si ton contrat chute.",
      "Le Valet et le 9 d'atout sont donc les rois du jeu : 34 points à eux deux ! Bien les évaluer est la clé des enchères.",
    ],
  },
  {
    id: "encheres",
    emoji: "🂠",
    title: "Bien enchérir",
    steps: [
      "Enchérir, c'est promettre un nombre de points (80 à 160) dans une couleur d'atout. Tu dois ensuite réaliser au moins ce contrat.",
      "Évalue ta main : compte tes points sûrs à l'atout (Valet ≈ 20, 9 ≈ 14, As ≈ 11) et ajoute ~5 par atout au-delà de 2, plus tes As dans les autres couleurs.",
      "Choisis comme atout ta couleur la plus LONGUE, idéalement avec le Valet et/ou le 9. La longueur prime sur de belles cartes éparpillées.",
      "Convention utile : si ton partenaire ouvre à 80 et que tu as le Valet ET le 9 de sa couleur, relance à 100 — c'est un soutien fort.",
      "Dans le doute, sous-enchéris légèrement : mieux vaut réussir un 80 que chuter un 110.",
    ],
    practice: "bid",
  },
  {
    id: "attaque",
    emoji: "⚔️",
    title: "Jouer en attaque",
    steps: [
      "Tu es preneur : ton plan est de « faire tomber » les atouts adverses pour sécuriser tes points.",
      "Entame par tes atouts maîtres (Valet, 9…) : les adversaires doivent suivre et gaspillent leurs atouts.",
      "Une fois les atouts adverses épuisés, tes As et 10 dans les autres couleurs deviennent des plis sûrs.",
      "Garde un œil sur le « dix de der » : remporter le dernier pli vaut 10 points, parfois décisifs.",
    ],
    practice: "play",
  },
  {
    id: "defense",
    emoji: "🛡️",
    title: "Jouer en défense",
    steps: [
      "En défense, ton objectif est de faire CHUTER le preneur en lui prenant des plis et des points.",
      "À l'entame, sors un As maître (pli sûr) ou joue la couleur que ton partenaire a réclamée.",
      "Les APPELS : quand tu te défausses, tu envoies un message. Appel DIRECT = tu jettes une grosse carte (9) dans une couleur où tu es fort → « rejoue ici ». Appel INDIRECT = tu jettes une petite carte d'une couleur faible → « pas celle-ci ».",
      "Quand ton partenaire est maître d'un pli, « charge-le » : donne-lui tes points (As, 10) plutôt que de les laisser au preneur.",
      "Ne gâche pas tes maîtres : ne mets pas ton As sous une coupe. Défausse petit et garde-le pour un pli que tu gagneras.",
    ],
    practice: "play",
  },
  {
    id: "coinche",
    emoji: "✊",
    title: "Coinche & Capot",
    steps: [
      "Coincher, c'est défier l'adversaire : tu penses qu'il ne fera pas son contrat. Les points sont alors doublés (×2), et quadruplés si l'autre équipe surcoinche (×4).",
      "Coinche surtout les contrats ambitieux (120+) quand tu tiens beaucoup d'atouts ou d'As : le gain est gros, mais le risque aussi.",
      "Le Capot (250 points) : tu t'engages à remporter TOUS les plis. Réserve-le aux mains qui maîtrisent totalement l'atout et tiennent les autres couleurs.",
      "Bien jouées, la coinche et la défense active sont ce qui sépare un bon joueur d'un débutant. Entraîne-toi !",
    ],
  },
];
