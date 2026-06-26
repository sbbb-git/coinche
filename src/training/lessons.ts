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

// Texte localisé : source bilingue interne (FR par défaut, EN selon la langue).
type Loc = { fr: string; en: string };

interface LessonVisualSrc {
  caption: Loc;
  cards: Card[];
}

interface LessonSrc {
  id: string;
  emoji: string;
  title: Loc;
  steps: Loc[];
  visual?: LessonVisualSrc;
  practice?: "bid" | "play";
}

const c = (suit: Suit, rank: Rank) => makeCard(suit, rank);

const LESSONS_SRC: LessonSrc[] = [
  {
    id: "bases",
    emoji: "🎓",
    title: { fr: "Les bases", en: "The basics" },
    steps: [
      {
        fr: "La Coinche se joue à 4, en 2 équipes de 2. Les partenaires sont assis face à face : toi (en bas) et Nord. Tes adversaires sont Ouest et Est.",
        en: "Coinche is played by 4 people, in 2 teams of 2. Partners sit facing each other: you (at the bottom) and North. Your opponents are West and East.",
      },
      {
        fr: "On joue avec 32 cartes (du 7 à l'As). Chaque joueur reçoit 8 cartes, distribuées par paquets de 3 et 2.",
        en: "The game uses 32 cards (from the 7 to the Ace). Each player gets 8 cards, dealt in packets of 3 and 2.",
      },
      {
        fr: "Une donne se déroule en deux temps : d'abord les ENCHÈRES (on décide qui « prend » et avec quel atout), puis le JEU DE LA CARTE (on joue les 8 plis).",
        en: "A deal unfolds in two phases: first the BIDDING (deciding who “takes” and with which trump), then the CARD PLAY (playing out the 8 tricks).",
      },
      {
        fr: "Le but : marquer des points en remportant des plis riches. La première équipe à atteindre le score cible (souvent 1000) gagne la partie.",
        en: "The goal: score points by winning rich tricks. The first team to reach the target score (often 1000) wins the game.",
      },
    ],
  },
  {
    id: "points",
    emoji: "🔢",
    title: { fr: "Compter les points", en: "Counting the points" },
    steps: [
      {
        fr: "Une donne vaut 162 points : 152 dans les cartes + 10 pour le « dix de der » (le dernier pli).",
        en: "A deal is worth 162 points: 152 in the cards + 10 for the “ten of der” (the last-trick bonus, won on the final trick).",
      },
      {
        fr: "À l'atout, l'ordre et les valeurs changent : Valet = 20, 9 = 14, puis As = 11, 10 = 10, Roi = 4, Dame = 3, 8 et 7 = 0.",
        en: "In trump, the ranking and values change: Jack = 20, 9 = 14, then Ace = 11, 10 = 10, King = 4, Queen = 3, 8 and 7 = 0.",
      },
      {
        fr: "Hors atout (couleurs ordinaires) : As = 11, 10 = 10, Roi = 4, Dame = 3, Valet = 2, le reste 0.",
        en: "Outside trump (plain suits): Ace = 11, 10 = 10, King = 4, Queen = 3, Jack = 2, the rest 0.",
      },
      {
        fr: "La Belote (Roi + Dame d'atout dans la même main) rapporte 20 points, et elle est imprenable : tu la gardes même si ton contrat chute.",
        en: "The Belote (King + Queen of trump in the same hand) is worth 20 points, and it cannot be taken away: you keep it even if your contract fails.",
      },
      {
        fr: "Le Valet et le 9 d'atout sont donc les rois du jeu : 34 points à eux deux ! Bien les évaluer est la clé des enchères.",
        en: "The Jack and the 9 of trump are therefore the kings of the game: 34 points between them! Valuing them well is the key to bidding.",
      },
    ],
    visual: {
      caption: {
        fr: "L'ordre à l'atout, du plus fort au plus faible (V = 20, 9 = 14, As = 11…)",
        en: "The trump ranking, from strongest to weakest (J = 20, 9 = 14, Ace = 11…)",
      },
      cards: [c("S", "J"), c("S", "9"), c("S", "A"), c("S", "10"), c("S", "K"), c("S", "Q"), c("S", "8"), c("S", "7")],
    },
  },
  {
    id: "encheres",
    emoji: "🂠",
    title: { fr: "Bien enchérir", en: "Bidding well" },
    steps: [
      {
        fr: "Enchérir, c'est promettre un nombre de points (80 à 160) dans une couleur d'atout. Tu dois ensuite réaliser au moins ce contrat.",
        en: "Bidding means promising a number of points (80 to 160) in a trump suit. You must then make at least that contract.",
      },
      {
        fr: "Évalue ta main : compte tes points sûrs à l'atout (Valet ≈ 20, 9 ≈ 14, As ≈ 11) et ajoute ~5 par atout au-delà de 2, plus tes As dans les autres couleurs.",
        en: "Assess your hand: count your sure trump points (Jack ≈ 20, 9 ≈ 14, Ace ≈ 11) and add ~5 per trump beyond 2, plus your Aces in the other suits.",
      },
      {
        fr: "Choisis comme atout ta couleur la plus LONGUE, idéalement avec le Valet et/ou le 9. La longueur prime sur de belles cartes éparpillées.",
        en: "Choose your LONGEST suit as trump, ideally with the Jack and/or the 9. Length matters more than fine cards scattered around.",
      },
      {
        fr: "Convention utile : si ton partenaire ouvre à 80 et que tu as le Valet ET le 9 de sa couleur, relance à 100, c'est un soutien fort.",
        en: "Handy convention: if your partner opens at 80 and you hold the Jack AND the 9 of their suit, raise to 100, that is strong support.",
      },
      {
        fr: "Dans le doute, sous-enchéris légèrement : mieux vaut réussir un 80 que chuter un 110.",
        en: "When in doubt, bid slightly low: better to make an 80 than to go down on a 110.",
      },
    ],
    visual: {
      caption: {
        fr: "Une couleur d'atout idéale : longue, avec Valet + 9 (34 pts) et l'As",
        en: "An ideal trump suit: long, with Jack + 9 (34 pts) and the Ace",
      },
      cards: [c("H", "J"), c("H", "9"), c("H", "A"), c("H", "10"), c("H", "7")],
    },
    practice: "bid",
  },
  {
    id: "attaque",
    emoji: "⚔️",
    title: { fr: "Jouer en attaque", en: "Playing on attack" },
    steps: [
      {
        fr: "Tu es preneur : ton plan est de « faire tomber » les atouts adverses pour sécuriser tes points.",
        en: "You are the taker: your plan is to “draw out” the opponents' trumps to secure your points.",
      },
      {
        fr: "Entame par tes atouts maîtres (Valet, 9…) : les adversaires doivent suivre et gaspillent leurs atouts.",
        en: "Lead with your master trumps (Jack, 9…): the opponents must follow and waste their trumps.",
      },
      {
        fr: "Une fois les atouts adverses épuisés, tes As et 10 dans les autres couleurs deviennent des plis sûrs.",
        en: "Once the opponents' trumps are gone, your Aces and 10s in the other suits become sure tricks.",
      },
      {
        fr: "Garde un œil sur le « dix de der » : remporter le dernier pli vaut 10 points, parfois décisifs.",
        en: "Keep an eye on the “ten of der”: winning the last trick is worth 10 points, sometimes decisive.",
      },
    ],
    visual: {
      caption: {
        fr: "Tes atouts maîtres : commence par le Valet et le 9 pour vider les adversaires",
        en: "Your master trumps: start with the Jack and the 9 to drain the opponents",
      },
      cards: [c("S", "J"), c("S", "9")],
    },
    practice: "play",
  },
  {
    id: "defense",
    emoji: "🛡️",
    title: { fr: "Jouer en défense", en: "Playing on defense" },
    steps: [
      {
        fr: "En défense, ton objectif est de faire CHUTER le preneur en lui prenant des plis et des points.",
        en: "On defense, your goal is to make the taker GO DOWN by stealing tricks and points from them.",
      },
      {
        fr: "À l'entame, sors un As maître (pli sûr) ou joue la couleur que ton partenaire a réclamée.",
        en: "On the lead, play out a master Ace (a sure trick) or play the suit your partner asked for.",
      },
      {
        fr: "Les APPELS : quand tu te défausses, tu envoies un message. Appel DIRECT = tu jettes une grosse carte (9) dans une couleur où tu es fort → « rejoue ici ». Appel INDIRECT = tu jettes une petite carte d'une couleur faible → « pas celle-ci ».",
        en: "SIGNALS: when you discard, you send a message. DIRECT signal = you throw a high card (9) in a suit where you are strong → “play back here”. INDIRECT signal = you throw a low card from a weak suit → “not this one”.",
      },
      {
        fr: "Quand ton partenaire est maître d'un pli, « charge-le » : donne-lui tes points (As, 10) plutôt que de les laisser au preneur.",
        en: "When your partner is master of a trick, “load” it: give them your points (Ace, 10) rather than leaving them to the taker.",
      },
      {
        fr: "Ne gâche pas tes maîtres : ne mets pas ton As sous une coupe. Défausse petit et garde-le pour un pli que tu gagneras.",
        en: "Do not waste your masters: do not play your Ace into a ruff. Discard low and keep it for a trick you will win.",
      },
    ],
    visual: {
      caption: {
        fr: "Appel DIRECT : tu te défausses d'une grosse carte (le 9) dans ta couleur forte → « rejoue ici »",
        en: "DIRECT signal: you discard a high card (the 9) in your strong suit → “play back here”",
      },
      cards: [c("D", "9")],
    },
    practice: "play",
  },
  {
    id: "comptage",
    emoji: "🧠",
    title: { fr: "Compter les cartes", en: "Counting the cards" },
    steps: [
      {
        fr: "Le bon joueur SAIT quelles cartes sont tombées. Concentre-toi d'abord sur l'atout : il n'y en a que 8.",
        en: "The good player KNOWS which cards have been played. Focus first on the trump: there are only 8 of them.",
      },
      {
        fr: "Compte les atouts joués à chaque pli. Quand tous les atouts adverses sont tombés, les tiens (et tes As) deviennent maîtres : tu peux dérouler.",
        en: "Count the trumps played on each trick. When all the opponents' trumps are gone, yours (and your Aces) become master: you can run them off.",
      },
      {
        fr: "Repère les couleurs « coupées » : si un adversaire s'est défaussé sur une couleur, il n'en a plus, il coupera la prochaine fois.",
        en: "Spot the “void” suits: if an opponent discarded on a suit, they have none left, they will ruff it next time.",
      },
      {
        fr: "Compte aussi les gros points : les Valets, 9, As et 10 valent 55 des 62 points de l'atout et l'essentiel des couleurs. Sais-tu en permanence combien de points sont déjà dans ton camp ?",
        en: "Count the big points too: the Jacks, 9s, Aces and 10s are worth 55 of the 62 trump points and most of the plain-suit points. Do you always know how many points are already on your side?",
      },
      {
        fr: "Au niveau Expert, l'IA fait exactement ça (et simule la fin de la donne). Entraîne ta mémoire des atouts : c'est le saut de niveau le plus rentable.",
        en: "At Expert level, the AI does exactly this (and simulates the end of the deal). Train your trump memory: it is the most rewarding step up in level.",
      },
    ],
    practice: "play",
  },
  {
    id: "satata",
    emoji: "🎴",
    title: { fr: "Sans Atout & Tout Atout", en: "No Trump & All Trump" },
    steps: [
      {
        fr: "À Sans Atout, il n'y a pas d'atout : on ne coupe jamais. Les As valent 19 (au lieu de 11), ce sont les rois du contrat.",
        en: "In No Trump, there is no trump: you never ruff. Aces are worth 19 (instead of 11), they are the kings of the contract.",
      },
      {
        fr: "À SA, joue tes couleurs longues et tes As maîtres ; une fois l'As tombé, le 10 puis le Roi prennent la main. La longueur fait la différence.",
        en: "In No Trump, play your long suits and your master Aces; once the Ace is gone, the 10 then the King take the lead. Length makes the difference.",
      },
      {
        fr: "À Tout Atout, TOUTES les couleurs sont atout : le Valet (14) et le 9 (9) de chaque couleur deviennent énormes. Tu as donc 4 Valets-maîtres potentiels.",
        en: "In All Trump, EVERY suit is trump: the Jack (14) and the 9 (9) of each suit become huge. So you have 4 potential master Jacks.",
      },
      {
        fr: "À TA, les écarts de valeur sont faibles : les plis se gagnent serré et le 10 de der est souvent décisif. Ne lâche pas tes Valets trop tôt.",
        en: "In All Trump, the value gaps are small: tricks are won by a hair and the ten of der is often decisive. Do not let go of your Jacks too soon.",
      },
      {
        fr: "Ces deux modes sont désactivés par défaut, mais tu peux les activer dans les réglages pour t'entraîner.",
        en: "Both modes are off by default, but you can enable them in the settings to practice.",
      },
    ],
    visual: {
      caption: {
        fr: "À Sans Atout, l'ordre suit les valeurs : As (19 pts) puis 10, Roi, Dame, Valet…",
        en: "In No Trump, the ranking follows the values: Ace (19 pts) then 10, King, Queen, Jack…",
      },
      cards: [c("C", "A"), c("C", "10"), c("C", "K"), c("C", "Q"), c("C", "J"), c("C", "9"), c("C", "8"), c("C", "7")],
    },
  },
  {
    id: "lecture",
    emoji: "👂",
    title: { fr: "Lire les enchères", en: "Reading the bidding" },
    steps: [
      {
        fr: "Les enchères parlent : chaque annonce révèle de l'information sur le jeu de chacun.",
        en: "The bidding speaks: each call reveals information about everyone's hand.",
      },
      {
        fr: "Quand ton partenaire prend à une couleur, il y est fort (Valet et/ou 9). Soutiens-le et rejoue son atout si besoin.",
        en: "When your partner takes in a suit, they are strong there (Jack and/or 9). Support them and lead their trump back if needed.",
      },
      {
        fr: "Quand un adversaire prend haut (120+), méfie-toi : il a un très gros jeu dans sa couleur. Garde tes maîtres pour les bons moments.",
        en: "When an opponent bids high (120+), beware: they have a very big hand in their suit. Keep your masters for the right moments.",
      },
      {
        fr: "S'il y a eu une coinche, l'information est cruciale : le coincheur pense faire chuter, il a probablement de l'atout ou des As. Adapte ton plan.",
        en: "If there has been a coinche, the information is crucial: the coincher thinks they can make the contract fail, they probably hold trump or Aces. Adapt your plan.",
      },
      {
        fr: "À l'inverse, un partenaire qui n'a pas pris et passe a un jeu modeste : ne compte pas trop sur lui pour les gros points.",
        en: "Conversely, a partner who did not take and passes has a modest hand: do not rely on them too much for the big points.",
      },
    ],
  },
  {
    id: "impasse",
    emoji: "🎯",
    title: { fr: "L'impasse", en: "The finesse" },
    steps: [
      {
        fr: "L'impasse est une technique pour capturer une carte adverse placée « entre » deux des tiennes.",
        en: "The finesse is a technique to capture an opponent's card placed “between” two of yours.",
      },
      {
        fr: "Exemple classique : tu as l'As et la Dame d'une couleur, le Roi est chez l'adversaire à ta droite. En le faisant jouer avant toi, tu passes ta Dame si le Roi n'est pas sorti, puis ton As capture tout.",
        en: "Classic example: you hold the Ace and the Queen of a suit, the King is with the opponent on your right. By making them play before you, you slip in your Queen if the King has not appeared, then your Ace captures everything.",
      },
      {
        fr: "L'impasse se tente quand tu places (par les enchères ou les cartes tombées) la carte manquante chez l'adversaire favorable.",
        en: "Attempt the finesse when you can place (from the bidding or the cards played) the missing card with the favorable opponent.",
      },
      {
        fr: "À l'atout, l'impasse au Valet ou au 9 peut rapporter gros, mais c'est un pari : si la carte est mal placée, elle échoue.",
        en: "In trump, finessing for the Jack or the 9 can pay off big, but it is a gamble: if the card is badly placed, it fails.",
      },
      {
        fr: "Règle d'or : ne tente l'impasse que si tu ne peux pas gagner autrement. Si tu as déjà les maîtres, déroule simplement.",
        en: "Golden rule: only try the finesse if you cannot win otherwise. If you already hold the masters, just run them off.",
      },
    ],
  },
  {
    id: "coinche",
    emoji: "✊",
    title: { fr: "Coinche & Capot", en: "Coinche & Capot" },
    steps: [
      {
        fr: "Coincher, c'est défier l'adversaire : tu penses qu'il ne fera pas son contrat. Les points sont alors doublés (×2), et quadruplés si l'autre équipe surcoinche (×4).",
        en: "To coinche is to challenge the opponent: you think they will not make their contract. The points are then doubled (×2), and quadrupled if the other team overcoinches (×4).",
      },
      {
        fr: "Coinche surtout les contrats ambitieux (120+) quand tu tiens beaucoup d'atouts ou d'As : le gain est gros, mais le risque aussi.",
        en: "Coinche mostly the ambitious contracts (120+) when you hold many trumps or Aces: the reward is big, but so is the risk.",
      },
      {
        fr: "Le Capot (250 points) : tu t'engages à remporter TOUS les plis. Réserve-le aux mains qui maîtrisent totalement l'atout et tiennent les autres couleurs.",
        en: "The Capot (250 points): you commit to winning ALL the tricks. Save it for hands that fully control the trump and hold the other suits.",
      },
      {
        fr: "Bien jouées, la coinche et la défense active sont ce qui sépare un bon joueur d'un débutant. Entraîne-toi !",
        en: "Played well, the coinche and active defense are what set a good player apart from a beginner. Practice!",
      },
    ],
    visual: {
      caption: {
        fr: "La Belote : Roi + Dame d'atout dans la même main = 20 pts imprenables",
        en: "The Belote: King + Queen of trump in the same hand = 20 untouchable pts",
      },
      cards: [c("S", "K"), c("S", "Q")],
    },
  },
];

export function localizedLessons(lang: "fr" | "en"): Lesson[] {
  return LESSONS_SRC.map((l) => ({
    id: l.id,
    emoji: l.emoji,
    title: l.title[lang],
    steps: l.steps.map((s) => s[lang]),
    ...(l.visual
      ? { visual: { caption: l.visual.caption[lang], cards: l.visual.cards } }
      : {}),
    ...(l.practice ? { practice: l.practice } : {}),
  }));
}

export const LESSONS: Lesson[] = localizedLessons("fr");
