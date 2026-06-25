// Parcours pédagogique progressif. Chaque leçon = une suite d'étapes (cartes
// de texte). Certaines invitent à enchaîner sur un exercice.

import { Card, Rank, Suit, makeCard } from "../engine/cards";

export interface LessonVisual {
  caption: string;
  cards: Card[];
}

export interface Lesson {
  id: string;
  emoji: string;
  title: string;
  steps: string[];
  visual?: LessonVisual; // illustration en cartes réelles
  practice?: "bid" | "play"; // propose un exercice à la fin
}

const c = (suit: Suit, rank: Rank) => makeCard(suit, rank);

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
    visual: {
      caption: "L'ordre à l'atout, du plus fort au plus faible (V = 20, 9 = 14, As = 11…)",
      cards: [c("S", "J"), c("S", "9"), c("S", "A"), c("S", "10"), c("S", "K"), c("S", "Q"), c("S", "8"), c("S", "7")],
    },
  },
  {
    id: "encheres",
    emoji: "🂠",
    title: "Bien enchérir",
    steps: [
      "Enchérir, c'est promettre un nombre de points (80 à 160) dans une couleur d'atout. Tu dois ensuite réaliser au moins ce contrat.",
      "Évalue ta main : compte tes points sûrs à l'atout (Valet ≈ 20, 9 ≈ 14, As ≈ 11) et ajoute ~5 par atout au-delà de 2, plus tes As dans les autres couleurs.",
      "Choisis comme atout ta couleur la plus LONGUE, idéalement avec le Valet et/ou le 9. La longueur prime sur de belles cartes éparpillées.",
      "Convention utile : si ton partenaire ouvre à 80 et que tu as le Valet ET le 9 de sa couleur, relance à 100, c'est un soutien fort.",
      "Dans le doute, sous-enchéris légèrement : mieux vaut réussir un 80 que chuter un 110.",
    ],
    visual: {
      caption: "Une couleur d'atout idéale : longue, avec Valet + 9 (34 pts) et l'As",
      cards: [c("H", "J"), c("H", "9"), c("H", "A"), c("H", "10"), c("H", "7")],
    },
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
    visual: {
      caption: "Tes atouts maîtres : commence par le Valet et le 9 pour vider les adversaires",
      cards: [c("S", "J"), c("S", "9")],
    },
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
    visual: {
      caption: "Appel DIRECT : tu te défausses d'une grosse carte (le 9) dans ta couleur forte → « rejoue ici »",
      cards: [c("D", "9")],
    },
    practice: "play",
  },
  {
    id: "comptage",
    emoji: "🧠",
    title: "Compter les cartes",
    steps: [
      "Le bon joueur SAIT quelles cartes sont tombées. Concentre-toi d'abord sur l'atout : il n'y en a que 8.",
      "Compte les atouts joués à chaque pli. Quand tous les atouts adverses sont tombés, les tiens (et tes As) deviennent maîtres : tu peux dérouler.",
      "Repère les couleurs « coupées » : si un adversaire s'est défaussé sur une couleur, il n'en a plus, il coupera la prochaine fois.",
      "Compte aussi les gros points : les Valets, 9, As et 10 valent 55 des 62 points de l'atout et l'essentiel des couleurs. Sais-tu en permanence combien de points sont déjà dans ton camp ?",
      "Au niveau Expert, l'IA fait exactement ça (et simule la fin de la donne). Entraîne ta mémoire des atouts : c'est le saut de niveau le plus rentable.",
    ],
    practice: "play",
  },
  {
    id: "satata",
    emoji: "🎴",
    title: "Sans Atout & Tout Atout",
    steps: [
      "À Sans Atout, il n'y a pas d'atout : on ne coupe jamais. Les As valent 19 (au lieu de 11), ce sont les rois du contrat.",
      "À SA, joue tes couleurs longues et tes As maîtres ; une fois l'As tombé, le 10 puis le Roi prennent la main. La longueur fait la différence.",
      "À Tout Atout, TOUTES les couleurs sont atout : le Valet (14) et le 9 (9) de chaque couleur deviennent énormes. Tu as donc 4 Valets-maîtres potentiels.",
      "À TA, les écarts de valeur sont faibles : les plis se gagnent serré et le 10 de der est souvent décisif. Ne lâche pas tes Valets trop tôt.",
      "Ces deux modes sont désactivés par défaut, mais tu peux les activer dans les réglages pour t'entraîner.",
    ],
    visual: {
      caption: "À Sans Atout, l'ordre suit les valeurs : As (19 pts) puis 10, Roi, Dame, Valet…",
      cards: [c("C", "A"), c("C", "10"), c("C", "K"), c("C", "Q"), c("C", "J"), c("C", "9"), c("C", "8"), c("C", "7")],
    },
  },
  {
    id: "lecture",
    emoji: "👂",
    title: "Lire les enchères",
    steps: [
      "Les enchères parlent : chaque annonce révèle de l'information sur le jeu de chacun.",
      "Quand ton partenaire prend à une couleur, il y est fort (Valet et/ou 9). Soutiens-le et rejoue son atout si besoin.",
      "Quand un adversaire prend haut (120+), méfie-toi : il a un très gros jeu dans sa couleur. Garde tes maîtres pour les bons moments.",
      "S'il y a eu une coinche, l'information est cruciale : le coincheur pense faire chuter, il a probablement de l'atout ou des As. Adapte ton plan.",
      "À l'inverse, un partenaire qui n'a pas pris et passe a un jeu modeste : ne compte pas trop sur lui pour les gros points.",
    ],
  },
  {
    id: "impasse",
    emoji: "🎯",
    title: "L'impasse",
    steps: [
      "L'impasse est une technique pour capturer une carte adverse placée « entre » deux des tiennes.",
      "Exemple classique : tu as l'As et la Dame d'une couleur, le Roi est chez l'adversaire à ta droite. En le faisant jouer avant toi, tu passes ta Dame si le Roi n'est pas sorti, puis ton As capture tout.",
      "L'impasse se tente quand tu places (par les enchères ou les cartes tombées) la carte manquante chez l'adversaire favorable.",
      "À l'atout, l'impasse au Valet ou au 9 peut rapporter gros, mais c'est un pari : si la carte est mal placée, elle échoue.",
      "Règle d'or : ne tente l'impasse que si tu ne peux pas gagner autrement. Si tu as déjà les maîtres, déroule simplement.",
    ],
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
    visual: {
      caption: "La Belote : Roi + Dame d'atout dans la même main = 20 pts imprenables",
      cards: [c("S", "K"), c("S", "Q")],
    },
  },
];
