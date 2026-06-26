// Catégorie : Variantes de la coinche (formats alternatifs, nombres de joueurs, règles dérivées).
// Schéma identique à 00-lexique.mjs.

export const category = { fr: "Variantes de la coinche", en: "Coinche variants" };

export default [
  {
    id: "var-2-joueurs",
    priority: 0.5,
    fr: {
      slug: "coinche-a-2-joueurs",
      linkLabel: "Coinche à 2 joueurs",
      title: "Coinche à 2 joueurs : règles adaptées et conventions",
      h1: "La coinche à 2 joueurs",
      description:
        "Coinche à 2 joueurs : la coinche se joue à 4 par essence, mais on peut l'adapter à deux. Règles usuelles, jeu visible ou caché, et limites de la formule.",
      lead: "La coinche est <strong>un jeu à 4</strong> (deux équipes de deux). À deux, il n'existe pas de règle officielle : on bricole des adaptations qui changent profondément la partie.",
      sections: [
        {
          h2: "Pourquoi ce n'est pas « de la vraie coinche »",
          html: "<p>L'intérêt de la coinche tient au <strong>partenariat</strong> : enchères, signaux, complicité avec son partenaire. À deux, tout cela disparaît. Ce qu'on appelle « coinche à 2 » est en réalité un jeu de plis dérivé, à considérer comme une <em>convention de dépannage</em>, pas comme une variante reconnue.</p>",
        },
        {
          h2: "Adaptations les plus courantes",
          html: "<ul><li><strong>Pioche</strong> : chacun reçoit quelques cartes, le reste forme un talon dans lequel on pioche après chaque pli (façon belote à deux).</li><li><strong>Jeu réduit</strong> : on retire des cartes basses (par exemple les 7 et 8) pour garder un paquet maniable.</li><li><strong>Enchères simplifiées</strong> : un seul tour d'annonce, sans véritable montée puisqu'il n'y a pas de partenaire à informer.</li></ul><p>Toutes ces options se fixent <strong>avant</strong> de jouer : aucune n'est universelle.</p>",
        },
        {
          h2: "Le barème reste-t-il le même ?",
          html: "<p>Si tu joues avec les 32 cartes habituelles, tu peux garder le barème standard (162 points par donne, belote à 20, capot à 250). Si tu retires des cartes, le total de points par donne change mécaniquement : recompte la valeur des cartes restantes pour fixer un objectif cohérent.</p>",
        },
        {
          h2: "Notre conseil",
          html: "<p>À deux, mieux vaut souvent jouer à la <strong>belote classique à deux</strong>, dont les règles à deux joueurs sont bien établies, plutôt que de forcer la coinche. Garde la coinche pour les soirées à quatre, où elle prend tout son sens.</p>",
        },
      ],
      faq: [
        { q: "Peut-on vraiment jouer à la coinche à 2 ?", a: "On peut l'adapter, mais ce n'est pas un format officiel. La coinche repose sur le partenariat, qui disparaît à deux. Les règles à deux sont des conventions à fixer avant de jouer." },
        { q: "Faut-il retirer des cartes à 2 joueurs ?", a: "C'est une option fréquente pour garder un paquet maniable, par exemple retirer les 7 et 8. Si tu le fais, recompte la valeur des cartes restantes car le total de points par donne change." },
      ],
      related: ["var-3-joueurs", "var-marseillaise", "lex-capot"],
    },
    en: {
      slug: "coinche-with-2-players",
      linkLabel: "Coinche with 2 players",
      title: "Coinche with 2 players: adapted rules and conventions",
      h1: "Coinche with two players",
      description:
        "Coinche with 2 players: coinche is a four-player game at heart, but you can adapt it for two. Common rules, draw pile, and the limits of the format.",
      lead: "Coinche is <strong>a four-player game</strong> (two pairs). With two players there is no official rule set: any adaptation changes the game deeply.",
      sections: [
        {
          h2: "Why it isn't \"real coinche\"",
          html: "<p>The appeal of coinche is the <strong>partnership</strong>: bidding, signals, reading your partner. With two players all of that vanishes. So-called \"2-player coinche\" is really a derived trick-taking game, best seen as a <em>stopgap convention</em> rather than a recognised variant.</p>",
        },
        {
          h2: "Most common adaptations",
          html: "<ul><li><strong>Draw pile</strong>: each player gets a few cards, the rest forms a stock you draw from after each trick (like two-player belote).</li><li><strong>Reduced deck</strong>: remove low cards (for example the 7s and 8s) to keep a manageable pack.</li><li><strong>Simplified bidding</strong>: a single bidding round, with no real escalation since there's no partner to inform.</li></ul><p>Agree on all of this <strong>before</strong> you play: none of it is universal.</p>",
        },
        {
          h2: "Does the scoring stay the same?",
          html: "<p>If you keep the usual 32 cards, you can keep the standard scoring (162 points per deal, belote 20, capot 250). If you remove cards, the per-deal total shifts automatically: recount the value of the remaining cards to set a sensible target.</p>",
        },
        {
          h2: "Our advice",
          html: "<p>With two players you're often better off playing <strong>classic two-handed belote</strong>, which has well-established two-player rules, rather than forcing coinche. Save coinche for four-player evenings, where it truly shines.</p>",
        },
      ],
      faq: [
        { q: "Can you really play coinche with 2 players?", a: "You can adapt it, but it isn't an official format. Coinche relies on partnership, which disappears with two players. Two-player rules are conventions to agree on before playing." },
        { q: "Do you remove cards with 2 players?", a: "It's a common option to keep a manageable pack, for example removing the 7s and 8s. If you do, recount the value of the remaining cards because the per-deal total changes." },
      ],
      related: ["var-3-joueurs", "var-marseillaise", "lex-capot"],
    },
  },

  {
    id: "var-3-joueurs",
    priority: 0.5,
    fr: {
      slug: "coinche-a-3-joueurs",
      linkLabel: "Coinche à 3 joueurs",
      title: "Coinche à 3 joueurs : chacun pour soi et adaptations",
      h1: "La coinche à 3 joueurs",
      description:
        "Coinche à 3 joueurs : sans partenaire fixe, on joue souvent chacun pour soi ou avec un mort. Conventions usuelles, distribution et limites du format.",
      lead: "À trois, impossible de former deux équipes de deux. On bascule alors vers du <strong>chacun pour soi</strong> ou vers un système de « mort », deux conventions sans barème officiel.",
      sections: [
        {
          h2: "Le problème des équipes",
          html: "<p>La coinche est pensée pour <strong>quatre joueurs en deux paires</strong>. À trois, soit chacun joue pour soi, soit le preneur affronte les deux autres alliés contre lui le temps d'une donne. Ce sont des arrangements de table, pas des règles reconnues.</p>",
        },
        {
          h2: "Formule « chacun pour soi »",
          html: "<p>On distribue les 32 cartes en trois mains de dix, plus deux cartes mises de côté (un mini-talon) ou une main de « mort » non jouée. Celui qui prend joue seul contre les deux autres. Le barème standard peut servir de base, mais comme la donne n'est pas symétrique, beaucoup de tables ajustent les points du preneur.</p>",
        },
        {
          h2: "Formule avec « mort »",
          html: "<p>Une quatrième main fictive (le « mort ») est posée face visible ou cachée et appartient au preneur, qui la combine à sa propre main. Cela rapproche le jeu d'un vrai 2 contre 2, mais l'avantage du mort doit être compensé par un objectif de points plus élevé, à fixer ensemble.</p>",
        },
      ],
      faq: [
        { q: "Comment faire des équipes à 3 joueurs ?", a: "On ne peut pas former deux paires équilibrées à trois. On joue donc chacun pour soi, ou le preneur joue seul contre les deux autres, parfois aidé d'une main de mort. Ce sont des conventions à fixer avant la partie." },
        { q: "Le barème change-t-il à 3 joueurs ?", a: "Le barème standard sert de base, mais la donne n'étant pas symétrique, beaucoup de tables ajustent l'objectif de points du preneur. Mettez-vous d'accord avant de jouer." },
      ],
      related: ["var-2-joueurs", "var-5-joueurs", "lex-generale"],
    },
    en: {
      slug: "coinche-with-3-players",
      linkLabel: "Coinche with 3 players",
      title: "Coinche with 3 players: cutthroat and adaptations",
      h1: "Coinche with three players",
      description:
        "Coinche with 3 players: without a fixed partner, you usually play cutthroat or with a dummy hand. Common conventions, dealing, and the limits of the format.",
      lead: "With three players you can't form two pairs of two. You switch to <strong>cutthroat</strong> play or a \"dummy hand\" system, two conventions with no official scoring.",
      sections: [
        {
          h2: "The team problem",
          html: "<p>Coinche is built for <strong>four players in two pairs</strong>. With three, either everyone plays for themselves, or the taker faces the other two allied against them for one deal. These are table arrangements, not recognised rules.</p>",
        },
        {
          h2: "Cutthroat format",
          html: "<p>Deal the 32 cards into three hands of ten, plus two cards set aside (a mini-stock) or an unplayed \"dummy\" hand. Whoever takes plays alone against the other two. The standard scoring can serve as a base, but since the deal isn't symmetric, many tables adjust the taker's points.</p>",
        },
        {
          h2: "Dummy-hand format",
          html: "<p>A fourth dummy hand is laid down face up or down and belongs to the taker, who combines it with their own hand. This brings the game closer to a real 2-against-2, but the dummy's advantage should be offset by a higher points target, to be agreed together.</p>",
        },
      ],
      faq: [
        { q: "How do you make teams with 3 players?", a: "You can't form two balanced pairs with three. So you play cutthroat, or the taker plays alone against the other two, sometimes helped by a dummy hand. These are conventions to set before the game." },
        { q: "Does scoring change with 3 players?", a: "Standard scoring serves as a base, but since the deal isn't symmetric, many tables adjust the taker's target. Agree on it before playing." },
      ],
      related: ["var-2-joueurs", "var-5-joueurs", "lex-generale"],
    },
  },

  {
    id: "var-5-joueurs",
    priority: 0.5,
    fr: {
      slug: "coinche-a-5-joueurs",
      linkLabel: "Coinche à 5 joueurs",
      title: "Coinche à 5 joueurs : le tournant et les équipes mobiles",
      h1: "La coinche à 5 joueurs",
      description:
        "Coinche à 5 joueurs : un joueur tourne à chaque donne, ou le preneur s'allie un partenaire choisi. Conventions usuelles, distribution et équilibrage.",
      lead: "À cinq, la coinche garde sa table à quatre : un joueur se repose à chaque donne (« le tournant »), ou bien le preneur choisit un allié, façon coinche à appel.",
      sections: [
        {
          h2: "La solution du tournant",
          html: "<p>La plus simple : on reste à <strong>quatre joueurs actifs</strong> et le cinquième saute son tour à tour de rôle. Chacun se repose une donne sur cinq. Le barème ne change pas, seul le rythme évolue. C'est idéal pour intégrer un joueur de plus sans dénaturer le jeu.</p>",
        },
        {
          h2: "La coinche « à appel »",
          html: "<p>Les cinq jouent en même temps. Le preneur, après avoir remporté l'enchère, appelle un partenaire (par exemple « j'appelle le valet d'atout ») : celui qui détient cette carte devient son allié secret pour la donne. Deux contre trois, avec un partenaire révélé en cours de jeu. C'est une convention inspirée d'autres jeux d'appel, à cadrer avant la partie.</p>",
        },
        {
          h2: "Distribution et équilibrage",
          html: "<p>À cinq joueurs actifs, 32 cartes ne se divisent pas en parts égales : on retire généralement deux cartes basses pour distribuer six cartes à chacun, ou on met des cartes au talon. Comme le nombre de plis et la valeur totale changent, ajuste l'objectif de points en conséquence et note la convention choisie.</p>",
        },
      ],
      faq: [
        { q: "Comment jouer à la coinche à 5 ?", a: "Le plus simple est le tournant : on reste à quatre joueurs actifs et le cinquième se repose une donne sur cinq, à tour de rôle. Une autre option est la coinche à appel, où le preneur choisit un allié secret." },
        { q: "Faut-il retirer des cartes à 5 joueurs ?", a: "Si les cinq jouent ensemble, oui : 32 cartes ne se divisent pas en parts égales, on retire des cartes basses ou on met un talon. Le total de points change, donc ajuste l'objectif." },
      ],
      related: ["var-3-joueurs", "var-6-joueurs", "lex-capot"],
    },
    en: {
      slug: "coinche-with-5-players",
      linkLabel: "Coinche with 5 players",
      title: "Coinche with 5 players: rotation and called partners",
      h1: "Coinche with five players",
      description:
        "Coinche with 5 players: one player sits out each deal, or the taker calls a chosen ally. Common conventions, dealing and balancing the format.",
      lead: "With five players, coinche keeps its four-player table: one player rests each deal (\"rotation\"), or the taker calls an ally, like a calling game.",
      sections: [
        {
          h2: "The rotation solution",
          html: "<p>The simplest: keep <strong>four active players</strong> and have the fifth skip in turn. Everyone rests one deal in five. Scoring is unchanged, only the rhythm shifts. It's ideal for adding an extra player without distorting the game.</p>",
        },
        {
          h2: "Coinche with a called partner",
          html: "<p>All five play at once. After winning the auction, the taker calls a partner (for example \"I call the jack of trumps\"): whoever holds that card becomes their secret ally for the deal. Two against three, with a partner revealed during play. It's a convention borrowed from other calling games, to be agreed before the game.</p>",
        },
        {
          h2: "Dealing and balancing",
          html: "<p>With five active players, 32 cards don't split evenly: you usually remove two low cards to deal six each, or set cards aside as a stock. Since the number of tricks and the total value change, adjust the points target accordingly and note the chosen convention.</p>",
        },
      ],
      faq: [
        { q: "How do you play coinche with 5?", a: "The simplest is rotation: keep four active players and have the fifth rest one deal in five, in turn. Another option is calling coinche, where the taker picks a secret ally." },
        { q: "Do you remove cards with 5 players?", a: "If all five play together, yes: 32 cards don't split evenly, so you remove low cards or set aside a stock. The points total changes, so adjust the target." },
      ],
      related: ["var-3-joueurs", "var-6-joueurs", "lex-capot"],
    },
  },

  {
    id: "var-6-joueurs",
    priority: 0.5,
    fr: {
      slug: "coinche-a-6-joueurs",
      linkLabel: "Coinche à 6 joueurs",
      title: "Coinche à 6 joueurs : deux trios ou jeu de relais",
      h1: "La coinche à 6 joueurs",
      description:
        "Coinche à 6 joueurs : on joue souvent en deux équipes de trois, avec un jeu élargi à 48 cartes, ou en table de quatre avec relais. Conventions et barème.",
      lead: "À six, on peut former <strong>deux équipes de trois</strong> assises en alternance, à condition d'élargir le paquet, ou garder une table à quatre avec des joueurs en relais.",
      sections: [
        {
          h2: "Deux équipes de trois",
          html: "<p>Six joueurs forment deux camps de trois, alternés autour de la table (un adversaire entre chaque coéquipier). Pour distribuer équitablement, on passe souvent à un jeu de <strong>48 cartes</strong> (en ajoutant les 3, 4, 5 et 6 de chaque couleur) afin de donner huit cartes à chacun. Le barème de base ne s'applique plus tel quel : avec des cartes en plus, la valeur totale de la donne change et doit être recomptée.</p>",
        },
        {
          h2: "Table de quatre avec relais",
          html: "<p>Plus fidèle à la coinche : on garde une vraie table à quatre, et les deux joueurs supplémentaires entrent en relais à chaque manche ou à chaque tour de donneur. Avantage : le jeu reste exactement la coinche officielle, barème compris. Inconvénient : deux joueurs patientent en permanence.</p>",
        },
        {
          h2: "Quel format choisir ?",
          html: "<p>Pour la convivialité et garder tout le monde actif, les deux trios sont sympas, mais le jeu devient une variante maison. Pour rester dans les règles officielles, le relais à quatre est plus sûr. Dans les deux cas, fixe la convention et l'objectif de points <strong>avant</strong> de commencer.</p>",
        },
      ],
      faq: [
        { q: "Comment jouer à la coinche à 6 ?", a: "Deux options usuelles : deux équipes de trois avec un paquet élargi à 48 cartes, ou une table à quatre classique où les deux joueurs en trop entrent en relais. La première est une variante maison, la seconde reste de la coinche officielle." },
        { q: "Combien de cartes à 6 joueurs ?", a: "Si les six jouent ensemble en deux trios, on passe souvent à 48 cartes pour donner huit cartes à chacun. La valeur totale de la donne change alors et doit être recomptée." },
      ],
      related: ["var-5-joueurs", "var-3-joueurs", "lex-capot"],
    },
    en: {
      slug: "coinche-with-6-players",
      linkLabel: "Coinche with 6 players",
      title: "Coinche with 6 players: two trios or relay play",
      h1: "Coinche with six players",
      description:
        "Coinche with 6 players: often two teams of three with an expanded 48-card deck, or a four-player table with relays. Conventions and scoring.",
      lead: "With six, you can form <strong>two teams of three</strong> seated alternately, provided you expand the deck, or keep a four-player table with players relaying in.",
      sections: [
        {
          h2: "Two teams of three",
          html: "<p>Six players form two sides of three, alternated around the table (an opponent between each teammate). To deal evenly, you often move to a <strong>48-card deck</strong> (adding the 3s, 4s, 5s and 6s) to give eight cards each. The base scoring no longer applies as-is: with extra cards, the deal's total value changes and must be recounted.</p>",
        },
        {
          h2: "Four-player table with relays",
          html: "<p>More faithful to coinche: keep a real four-player table, and the two extra players rotate in each game or each dealer change. Upside: the game stays exactly official coinche, scoring included. Downside: two players wait at all times.</p>",
        },
        {
          h2: "Which format to choose?",
          html: "<p>For sociability and keeping everyone active, two trios are fun, but the game becomes a house variant. To stay within official rules, four-player relays are safer. Either way, set the convention and points target <strong>before</strong> you start.</p>",
        },
      ],
      faq: [
        { q: "How do you play coinche with 6?", a: "Two common options: two teams of three with an expanded 48-card deck, or a classic four-player table where the two extra players relay in. The first is a house variant, the second stays official coinche." },
        { q: "How many cards with 6 players?", a: "If all six play together in two trios, you often move to 48 cards to deal eight each. The deal's total value then changes and must be recounted." },
      ],
      related: ["var-5-joueurs", "var-3-joueurs", "lex-capot"],
    },
  },

  {
    id: "var-marseillaise",
    priority: 0.55,
    fr: {
      slug: "coinche-marseillaise",
      linkLabel: "Coinche marseillaise",
      title: "La coinche marseillaise : règles et particularités",
      h1: "La coinche marseillaise",
      description:
        "La coinche marseillaise : la variante du Sud très répandue. Enchères chiffrées, contrée et surcontrée, place du Sans Atout et du Tout Atout. Ce qui la distingue.",
      lead: "La <strong>coinche marseillaise</strong> est la forme la plus courante de la coinche dans le sud de la France. C'est en réalité ce que beaucoup appellent simplement « la coinche ».",
      sections: [
        {
          h2: "De quoi parle-t-on ?",
          html: "<p>Selon les régions, « coinche » et « contrée » désignent des choses légèrement différentes. La <strong>coinche marseillaise</strong> se caractérise par des <strong>enchères chiffrées</strong> (de 80 au capot, par paliers de 10) avec choix de la couleur d'atout, et la possibilité de <em>coincher</em> (contrer) puis <em>surcoincher</em> l'adversaire.</p>",
        },
        {
          h2: "Enchères et multiplicateurs",
          html: "<p>Chaque joueur annonce à son tour un contrat chiffré et une couleur (ou Sans Atout / Tout Atout). Si l'adversaire juge le contrat intenable, il <strong>coinche</strong> : les points sont alors doublés (×2). Le camp coinché peut riposter en <strong>surcoinchant</strong> (×4). C'est le sel de la variante : le bluff et le défi font partie du jeu.</p>",
        },
        {
          h2: "Sans Atout et Tout Atout",
          html: "<p>La marseillaise intègre volontiers deux contrats spéciaux : le <strong>Sans Atout</strong> (aucune couleur n'est atout, l'As vaut 19) et le <strong>Tout Atout</strong> (les quatre couleurs sont atout, avec un barème dédié). Ils enrichissent les enchères et récompensent les mains régulières ou très fournies en valets.</p>",
        },
        {
          h2: "Barème",
          html: "<p>Le barème reste le standard de la coinche : 162 points par donne (152 + 10 de der), belote R+D d'atout à 20, capot annoncé à 250. La partie se joue couramment en 1000, 1500 ou 2000 points selon les habitudes locales.</p>",
        },
      ],
      faq: [
        { q: "Quelle différence entre coinche et coinche marseillaise ?", a: "La coinche marseillaise est la forme la plus répandue de la coinche dans le Sud, avec enchères chiffrées, contre (coinche ×2) et surcontre (surcoinche ×4). Beaucoup l'appellent simplement la coinche." },
        { q: "Le Sans Atout est-il obligatoire à la marseillaise ?", a: "Non, mais il est très souvent intégré, tout comme le Tout Atout. Ce sont des contrats spéciaux qui enrichissent les enchères. Vérifie avec ta table s'ils sont autorisés." },
      ],
      related: ["var-sans-atout", "var-tout-atout", "var-enchere-montante"],
    },
    en: {
      slug: "marseille-coinche",
      linkLabel: "Marseille coinche",
      title: "Marseille coinche: rules and what makes it special",
      h1: "Marseille coinche",
      description:
        "Marseille coinche: the widespread southern variant. Numbered bidding, doubling and redoubling, the place of No-Trump and All-Trump. What sets it apart.",
      lead: "<strong>Marseille coinche</strong> is the most common form of coinche in southern France. It's really what many people simply call \"coinche\".",
      sections: [
        {
          h2: "What are we talking about?",
          html: "<p>Depending on the region, \"coinche\" and \"contrée\" mean slightly different things. <strong>Marseille coinche</strong> is defined by <strong>numbered bidding</strong> (from 80 up to capot, in steps of 10) with a choice of trump suit, and the option to <em>coinche</em> (double) and then <em>surcoinche</em> (redouble) the opponents.</p>",
        },
        {
          h2: "Bidding and multipliers",
          html: "<p>Each player in turn bids a numbered contract and a suit (or No-Trump / All-Trump). If an opponent thinks the contract can't be made, they <strong>coinche</strong>: points are then doubled (×2). The doubled side can fight back by <strong>surcoinching</strong> (×4). That's the spice of the variant: bluff and defiance are part of the game.</p>",
        },
        {
          h2: "No-Trump and All-Trump",
          html: "<p>The Marseille version readily includes two special contracts: <strong>No-Trump</strong> (no suit is trump, the Ace is worth 19) and <strong>All-Trump</strong> (all four suits are trump, with a dedicated scale). They enrich the bidding and reward balanced hands or hands loaded with jacks.</p>",
        },
        {
          h2: "Scoring",
          html: "<p>The scoring is standard coinche: 162 points per deal (152 + 10 for the last trick), belote (K+Q of trumps) at 20, bid capot at 250. Games are commonly played to 1000, 1500 or 2000 points depending on local habits.</p>",
        },
      ],
      faq: [
        { q: "What's the difference between coinche and Marseille coinche?", a: "Marseille coinche is the most widespread form of coinche in the south, with numbered bidding, doubling (coinche ×2) and redoubling (surcoinche ×4). Many people just call it coinche." },
        { q: "Is No-Trump mandatory in Marseille coinche?", a: "No, but it's very often included, as is All-Trump. They are special contracts that enrich the bidding. Check with your table whether they're allowed." },
      ],
      related: ["var-sans-atout", "var-tout-atout", "var-enchere-montante"],
    },
  },

  {
    id: "var-sans-atout",
    priority: 0.6,
    fr: {
      slug: "sans-atout-coinche-regles",
      linkLabel: "Sans Atout : règles",
      title: "Le Sans Atout à la coinche : règles, valeurs et quand le jouer",
      h1: "Le Sans Atout à la coinche",
      description:
        "Le Sans Atout à la coinche : aucune couleur n'est atout, l'As vaut 19 points. Valeurs des cartes, calcul des points et conseils pour savoir quand l'annoncer.",
      lead: "Au <strong>Sans Atout</strong> (SA), <strong>aucune couleur n'est atout</strong>. On joue uniquement à la force des cartes hautes, avec un barème spécifique où l'As devient roi.",
      sections: [
        {
          h2: "Le principe",
          html: "<p>En Sans Atout, il n'y a pas de coupe : qui ne fournit pas la couleur demandée se défausse sans jamais prendre le pli (sauf à fournir une carte plus haute de la même couleur). Le plus haut de la couleur d'entame remporte le pli. C'est un jeu de <strong>maîtres</strong> : les As et les longues couleurs valent de l'or.</p>",
        },
        {
          h2: "Valeur des cartes en Sans Atout",
          html: "<table><tr><th>Carte</th><th>Points</th></tr><tr><td><strong>As</strong></td><td>19</td></tr><tr><td>10</td><td>10</td></tr><tr><td>Roi</td><td>4</td></tr><tr><td>Dame</td><td>3</td></tr><tr><td>Valet</td><td>2</td></tr><tr><td>9, 8, 7</td><td>0</td></tr></table><p>L'As est nettement revalorisé (19 au lieu de 11) pour compenser l'absence d'atout. Selon les tables, le total des cartes est recompté : vérifie le barème exact convenu pour ne pas te tromper dans les contrats.</p>",
        },
        {
          h2: "Quand annoncer un Sans Atout ?",
          html: "<p>Le SA brille avec une main <strong>régulière et pleine d'As</strong>, sans couleur faible exploitable par l'adversaire. Plusieurs As, des 10 protégés, des longueurs maîtresses : voilà le profil idéal. À l'inverse, une main concentrée sur une seule couleur ou pauvre en cartes hautes préfèrera un contrat à atout. Rien d'absolu : adapte selon ce que ton partenaire a annoncé.</p>",
        },
      ],
      faq: [
        { q: "Combien vaut l'As au Sans Atout ?", a: "L'As vaut 19 points en Sans Atout, contre 11 dans un contrat à couleur. Cette revalorisation compense l'absence d'atout et fait de l'As la carte reine." },
        { q: "Y a-t-il de la coupe au Sans Atout ?", a: "Non, aucune couleur n'est atout, donc il n'y a pas de coupe. Le plus haut de la couleur demandée remporte le pli, et qui ne peut fournir se contente de se défausser." },
        { q: "Quand jouer un Sans Atout ?", a: "Avec une main régulière, riche en As et sans couleur faible exploitable. C'est un jeu de cartes maîtresses. Une main concentrée sur une seule couleur préfère souvent un contrat à atout." },
      ],
      related: ["var-tout-atout", "var-marseillaise", "lex-capot"],
    },
    en: {
      slug: "no-trump-coinche-rules",
      linkLabel: "No-Trump rules",
      title: "No-Trump in coinche: rules, card values and when to bid it",
      h1: "No-Trump in coinche",
      description:
        "No-Trump in coinche: no suit is trump, the Ace is worth 19 points. Card values, scoring and tips on when to call a No-Trump contract.",
      lead: "In <strong>No-Trump</strong> (SA), <strong>no suit is trump</strong>. You play purely on the strength of high cards, with a special scale where the Ace becomes king.",
      sections: [
        {
          h2: "The principle",
          html: "<p>In No-Trump there is no ruffing: a player who can't follow suit simply discards and never wins the trick (unless they play a higher card of the same suit). The highest card of the led suit wins. It's a game of <strong>masters</strong>: Aces and long suits are gold.</p>",
        },
        {
          h2: "Card values in No-Trump",
          html: "<table><tr><th>Card</th><th>Points</th></tr><tr><td><strong>Ace</strong></td><td>19</td></tr><tr><td>10</td><td>10</td></tr><tr><td>King</td><td>4</td></tr><tr><td>Queen</td><td>3</td></tr><tr><td>Jack</td><td>2</td></tr><tr><td>9, 8, 7</td><td>0</td></tr></table><p>The Ace is sharply boosted (19 instead of 11) to offset the lack of trumps. Depending on the table, the card total is recounted: check the exact agreed scale so you don't misjudge contracts.</p>",
        },
        {
          h2: "When to bid No-Trump?",
          html: "<p>No-Trump shines with a <strong>balanced, Ace-rich hand</strong>, with no weak suit for the opponents to exploit. Several Aces, protected 10s, master-length suits: that's the ideal profile. Conversely, a hand concentrated in one suit or short on high cards prefers a trump contract. Nothing is absolute: adapt to what your partner has bid.</p>",
        },
      ],
      faq: [
        { q: "How much is the Ace worth in No-Trump?", a: "The Ace is worth 19 points in No-Trump, versus 11 in a suit contract. This boost offsets the lack of trumps and makes the Ace the top card." },
        { q: "Is there ruffing in No-Trump?", a: "No, no suit is trump, so there's no ruffing. The highest card of the led suit wins, and a player who can't follow simply discards." },
        { q: "When should you bid No-Trump?", a: "With a balanced hand, rich in Aces and with no weak suit to exploit. It's a game of master cards. A hand concentrated in one suit often prefers a trump contract." },
      ],
      related: ["var-tout-atout", "var-marseillaise", "lex-capot"],
    },
  },

  {
    id: "var-tout-atout",
    priority: 0.6,
    fr: {
      slug: "tout-atout-coinche-regles",
      linkLabel: "Tout Atout : règles",
      title: "Le Tout Atout à la coinche : règles et valeurs des cartes",
      h1: "Le Tout Atout à la coinche",
      description:
        "Le Tout Atout à la coinche : les quatre couleurs sont atout. Valeurs des cartes (Valet 14, 9 vaut 9), calcul des points et conseils pour bien l'annoncer.",
      lead: "Au <strong>Tout Atout</strong> (TA), <strong>les quatre couleurs sont atout</strong> en même temps. Chaque couleur se classe comme un atout, valets en tête, et tout le monde doit monter à l'atout.",
      sections: [
        {
          h2: "Le principe",
          html: "<p>En Tout Atout, n'importe quelle couleur est maîtresse dans son propre tour : il faut toujours fournir la couleur demandée et, si possible, monter (jouer plus fort). Comme les quatre valets deviennent des cartes reines, le jeu devient un duel de valets et de neuf.</p>",
        },
        {
          h2: "Valeur des cartes en Tout Atout",
          html: "<table><tr><th>Carte</th><th>Points</th></tr><tr><td><strong>Valet</strong></td><td>14</td></tr><tr><td><strong>9</strong></td><td>9</td></tr><tr><td>As</td><td>6</td></tr><tr><td>10</td><td>5</td></tr><tr><td>Roi</td><td>3</td></tr><tr><td>Dame</td><td>1</td></tr><tr><td>8, 7</td><td>0</td></tr></table><p>Comme toutes les couleurs sont atout, ce barème s'applique aux quatre. Le total des cartes diffère du barème classique : recompte-le ou fie-toi au barème de ta table pour fixer les contrats.</p>",
        },
        {
          h2: "Quand annoncer un Tout Atout ?",
          html: "<p>Le TA récompense les mains <strong>riches en valets et en neuf</strong> : ce sont les cartes maîtresses dans chaque couleur. Une main avec deux ou trois valets, des neuf accompagnés, est un bon candidat. À l'inverse, une main pleine d'As et de dix (forte en classique) perd de sa valeur en TA. Comme toujours, ajuste selon les annonces de ton partenaire.</p>",
        },
      ],
      faq: [
        { q: "Combien vaut le Valet au Tout Atout ?", a: "Le Valet vaut 14 points au Tout Atout, c'est la carte la plus forte. Le 9 vaut 9, l'As 6, le 10 vaut 5, le Roi 3 et la Dame 1." },
        { q: "Faut-il monter à l'atout en Tout Atout ?", a: "Oui, puisque les quatre couleurs sont atout : tu dois fournir la couleur demandée et, si tu peux, jouer une carte plus forte. C'est un duel permanent de valets et de neuf." },
        { q: "Quand jouer un Tout Atout ?", a: "Avec une main riche en valets et en neuf, qui sont les maîtres dans chaque couleur. Une main pleine d'As et de dix, forte en jeu classique, perd de sa valeur en Tout Atout." },
      ],
      related: ["var-sans-atout", "var-marseillaise", "lex-capot"],
    },
    en: {
      slug: "all-trump-coinche-rules",
      linkLabel: "All-Trump rules",
      title: "All-Trump in coinche: rules and card values",
      h1: "All-Trump in coinche",
      description:
        "All-Trump in coinche: all four suits are trump. Card values (Jack 14, 9 worth 9), scoring and tips on bidding it well.",
      lead: "In <strong>All-Trump</strong> (TA), <strong>all four suits are trump</strong> at once. Each suit ranks as a trump, jacks first, and everyone must trump up.",
      sections: [
        {
          h2: "The principle",
          html: "<p>In All-Trump, any suit is the master suit in its own trick: you must always follow the led suit and, where possible, overtrump (play higher). Since all four jacks become top cards, the game turns into a duel of jacks and nines.</p>",
        },
        {
          h2: "Card values in All-Trump",
          html: "<table><tr><th>Card</th><th>Points</th></tr><tr><td><strong>Jack</strong></td><td>14</td></tr><tr><td><strong>9</strong></td><td>9</td></tr><tr><td>Ace</td><td>6</td></tr><tr><td>10</td><td>5</td></tr><tr><td>King</td><td>3</td></tr><tr><td>Queen</td><td>1</td></tr><tr><td>8, 7</td><td>0</td></tr></table><p>Since every suit is trump, this scale applies to all four. The card total differs from the classic scale: recount it or trust your table's scale to set contracts.</p>",
        },
        {
          h2: "When to bid All-Trump?",
          html: "<p>All-Trump rewards hands <strong>rich in jacks and nines</strong>: those are the master cards in every suit. A hand with two or three jacks and supported nines is a good candidate. By contrast, a hand full of Aces and 10s (strong in the classic game) loses value in All-Trump. As always, adjust to your partner's bids.</p>",
        },
      ],
      faq: [
        { q: "How much is the Jack worth in All-Trump?", a: "The Jack is worth 14 points in All-Trump, the strongest card. The 9 is worth 9, the Ace 6, the 10 worth 5, the King 3 and the Queen 1." },
        { q: "Must you overtrump in All-Trump?", a: "Yes, since all four suits are trump: you must follow the led suit and, if you can, play a higher card. It's a constant duel of jacks and nines." },
        { q: "When should you bid All-Trump?", a: "With a hand rich in jacks and nines, which are the masters in every suit. A hand full of Aces and 10s, strong in the classic game, loses value in All-Trump." },
      ],
      related: ["var-sans-atout", "var-marseillaise", "lex-capot"],
    },
  },

  {
    id: "var-belote-coinchee",
    priority: 0.55,
    fr: {
      slug: "belote-coinchee-vs-coinche",
      linkLabel: "Belote coinchée = coinche ?",
      title: "Belote coinchée : est-ce la même chose que la coinche ?",
      h1: "Belote coinchée et coinche : la même chose ?",
      description:
        "Belote coinchée ou coinche : oui, ce sont deux noms du même jeu. D'où vient le terme, ce qui la distingue de la belote classique et de la contrée.",
      lead: "Bonne nouvelle : <strong>belote coinchée et coinche, c'est le même jeu</strong>. « Belote coinchée » est simplement le nom complet de ce qu'on abrège en « coinche ».",
      sections: [
        {
          h2: "Pourquoi deux noms ?",
          html: "<p>La coinche est née comme une évolution de la belote. Le mot <strong>coinche</strong> vient de l'action de <em>coincher</em> (contrer un contrat adverse jugé trop ambitieux). Comme cette possibilité de contre est la grande nouveauté du jeu, on a parlé de « belote coinchée », vite raccourcie en « coinche ».</p>",
        },
        {
          h2: "En quoi diffère-t-elle de la belote classique ?",
          html: "<ul><li><strong>Belote classique</strong> : l'atout est choisi en retournant une carte ; les enchères sont très simples (prendre ou passer).</li><li><strong>Belote coinchée / coinche</strong> : de vraies enchères chiffrées (de 80 au capot), le preneur choisit librement l'atout, et l'adversaire peut coincher (×2) ou surcoincher (×4).</li></ul>",
        },
        {
          h2: "Et la contrée dans tout ça ?",
          html: "<p>« Contrée » est un autre nom régional du même type de jeu à enchères contrables. Les nuances entre coinche et contrée varient selon les régions et les tables, mais le cœur du jeu (enchères chiffrées + contre) est identique. Mieux vaut s'accorder sur les conventions exactes avant de jouer.</p>",
        },
      ],
      faq: [
        { q: "La belote coinchée et la coinche, c'est pareil ?", a: "Oui, c'est exactement le même jeu. Coinche est l'abréviation de belote coinchée. Le nom vient de l'action de coincher, c'est-à-dire contrer un contrat adverse." },
        { q: "Quelle différence avec la belote classique ?", a: "La belote classique a des enchères très simples et un atout désigné par une carte retournée. La coinche ajoute de vraies enchères chiffrées, le libre choix de l'atout et la possibilité de coincher (×2) ou surcoincher (×4)." },
      ],
      related: ["var-marseillaise", "var-contree-bridgee", "lex-capot"],
    },
    en: {
      slug: "belote-coinchee-vs-coinche",
      linkLabel: "Is belote coinchée coinche?",
      title: "Belote coinchée: is it the same thing as coinche?",
      h1: "Belote coinchée and coinche: the same game?",
      description:
        "Belote coinchée or coinche: yes, they're two names for the same game. Where the term comes from and how it differs from classic belote and contrée.",
      lead: "Good news: <strong>belote coinchée and coinche are the same game</strong>. \"Belote coinchée\" is simply the full name of what we shorten to \"coinche\".",
      sections: [
        {
          h2: "Why two names?",
          html: "<p>Coinche grew out of belote. The word <strong>coinche</strong> comes from the act of <em>coincher</em> (doubling an opponent's contract judged too ambitious). Since this doubling is the game's big novelty, people spoke of \"belote coinchée\", soon shortened to \"coinche\".</p>",
        },
        {
          h2: "How does it differ from classic belote?",
          html: "<ul><li><strong>Classic belote</strong>: trump is chosen by turning up a card; bidding is very simple (take or pass).</li><li><strong>Belote coinchée / coinche</strong>: real numbered bidding (from 80 to capot), the taker freely chooses trump, and opponents can double (×2) or redouble (×4).</li></ul>",
        },
        {
          h2: "And where does contrée fit in?",
          html: "<p>\"Contrée\" is another regional name for the same kind of game with doublable bidding. The nuances between coinche and contrée vary by region and table, but the core (numbered bidding + doubling) is identical. It's best to agree on exact conventions before playing.</p>",
        },
      ],
      faq: [
        { q: "Are belote coinchée and coinche the same?", a: "Yes, it's exactly the same game. Coinche is short for belote coinchée. The name comes from the act of coinching, that is doubling an opponent's contract." },
        { q: "What's the difference from classic belote?", a: "Classic belote has very simple bidding and trump set by a turned-up card. Coinche adds real numbered bidding, free choice of trump, and the ability to double (×2) or redouble (×4)." },
      ],
      related: ["var-marseillaise", "var-contree-bridgee", "lex-capot"],
    },
  },

  {
    id: "var-contree-bridgee",
    priority: 0.5,
    fr: {
      slug: "contree-bridgee-coinche",
      linkLabel: "Contrée bridgée",
      title: "La contrée bridgée : enchères façon bridge à la coinche",
      h1: "La contrée bridgée",
      description:
        "La contrée bridgée : une variante de coinche où les enchères s'inspirent du bridge (paliers, contrats descriptifs). Principe, intérêt et limites de cette convention.",
      lead: "La <strong>contrée bridgée</strong> est une variante où les enchères empruntent au <strong>bridge</strong> : plus descriptives, plus codifiées, pour mieux décrire sa main à son partenaire.",
      sections: [
        {
          h2: "L'idée de départ",
          html: "<p>Dans la coinche classique, l'enchère dit surtout combien de points on s'engage à faire et dans quel atout. La <strong>contrée bridgée</strong> pousse plus loin la dimension <em>communication</em> : les annonces servent à décrire la force et la répartition de sa main, comme au bridge, pour aider le partenaire à enchérir juste.</p>",
        },
        {
          h2: "Ce qui change",
          html: "<ul><li><strong>Enchères plus riches</strong> : certaines annonces ont un sens conventionnel (montrer une couleur longue, une force globale, etc.).</li><li><strong>Montée codifiée</strong> : la progression des contrats suit une logique proche des paliers du bridge.</li><li><strong>Le contre garde son rôle</strong> : on peut toujours coincher un contrat adverse jugé trop optimiste.</li></ul>",
        },
        {
          h2: "Pour qui ?",
          html: "<p>C'est une variante <strong>de joueurs avertis</strong>, souvent pratiquée par des gens qui connaissent déjà le bridge. Elle demande des conventions claires et partagées par les deux partenaires. Attention : il n'existe pas de système unique, chaque cercle a ses codes. À fixer précisément avant de jouer, sous peine de malentendus coûteux.</p>",
        },
      ],
      faq: [
        { q: "Qu'est-ce que la contrée bridgée ?", a: "C'est une variante de coinche dont les enchères s'inspirent du bridge : plus descriptives et codifiées, elles servent à décrire sa main au partenaire plutôt qu'à seulement annoncer un nombre de points." },
        { q: "Faut-il connaître le bridge pour y jouer ?", a: "Ce n'est pas obligatoire, mais ça aide beaucoup. La variante demande des conventions d'enchères claires et partagées. Comme il n'existe pas de système unique, accordez-vous sur les codes avant de jouer." },
      ],
      related: ["var-marseillaise", "var-belote-coinchee", "var-annonces-declarees"],
    },
    en: {
      slug: "bridged-contree-coinche",
      linkLabel: "Bridged contrée",
      title: "Bridged contrée: bridge-style bidding in coinche",
      h1: "Bridged contrée",
      description:
        "Bridged contrée: a coinche variant where bidding borrows from bridge (steps, descriptive contracts). Principle, appeal and limits of this convention.",
      lead: "<strong>Bridged contrée</strong> is a variant where bidding borrows from <strong>bridge</strong>: more descriptive, more codified, to better describe your hand to your partner.",
      sections: [
        {
          h2: "The starting idea",
          html: "<p>In classic coinche, the bid mainly states how many points you commit to and in which trump. <strong>Bridged contrée</strong> pushes the <em>communication</em> dimension further: bids describe the strength and shape of your hand, as in bridge, to help your partner bid accurately.</p>",
        },
        {
          h2: "What changes",
          html: "<ul><li><strong>Richer bidding</strong>: some bids carry a conventional meaning (showing a long suit, overall strength, etc.).</li><li><strong>Codified escalation</strong>: contract progression follows a logic close to bridge steps.</li><li><strong>Doubling keeps its role</strong>: you can still coinche an opponent's contract judged too optimistic.</li></ul>",
        },
        {
          h2: "Who is it for?",
          html: "<p>It's a variant for <strong>experienced players</strong>, often played by people who already know bridge. It needs clear conventions shared by both partners. Beware: there's no single system, every circle has its own codes. Settle them precisely before playing, or risk costly misunderstandings.</p>",
        },
      ],
      faq: [
        { q: "What is bridged contrée?", a: "It's a coinche variant whose bidding borrows from bridge: more descriptive and codified, it serves to describe your hand to your partner rather than just announcing a number of points." },
        { q: "Do you need to know bridge to play it?", a: "It's not mandatory, but it helps a lot. The variant needs clear, shared bidding conventions. Since there's no single system, agree on the codes before playing." },
      ],
      related: ["var-marseillaise", "var-belote-coinchee", "var-annonces-declarees"],
    },
  },

  {
    id: "var-annonces-declarees",
    priority: 0.5,
    fr: {
      slug: "coinche-annonces-tierce-carre-cent",
      linkLabel: "Annonces déclarées",
      title: "Coinche avec annonces déclarées : tierce, carré, cent",
      h1: "La coinche avec annonces déclarées",
      description:
        "Coinche avec annonces de belote (tierce, cinquante, cent, carré) : une variante qui ajoute des combinaisons de cartes façon belote. Principe, valeurs usuelles et limites.",
      lead: "Certaines tables ajoutent à la coinche les <strong>annonces de combinaisons</strong> héritées de la belote : suites (tierce, cinquante, cent) et carrés. Une variante riche, mais non standard.",
      sections: [
        {
          h2: "De quoi s'agit-il ?",
          html: "<p>En belote classique, on peut annoncer des combinaisons en main : <strong>suites</strong> de cartes consécutives d'une même couleur, ou <strong>carrés</strong> (quatre cartes de même rang). Cette variante importe ces annonces dans la coinche, en plus des enchères habituelles.</p>",
        },
        {
          h2: "Les annonces usuelles",
          html: "<table><tr><th>Annonce</th><th>Composition</th><th>Valeur courante</th></tr><tr><td>Tierce</td><td>3 cartes qui se suivent</td><td>20</td></tr><tr><td>Cinquante (quarte)</td><td>4 cartes qui se suivent</td><td>50</td></tr><tr><td>Cent (quinte)</td><td>5 cartes qui se suivent</td><td>100</td></tr><tr><td>Carré</td><td>4 cartes de même rang</td><td>variable selon le rang</td></tr></table><p>Ces valeurs sont celles de la belote classique. Elles ne sont <strong>pas officielles en coinche</strong> : c'est une convention de table à valider avant de jouer.</p>",
        },
        {
          h2: "Pourquoi c'est délicat",
          html: "<p>Mêler enchères chiffrées et annonces de combinaisons complique le calcul des points et peut déséquilibrer la partie (une grosse annonce peut faire basculer une donne indépendamment du contrat). Beaucoup de joueurs préfèrent garder la coinche « pure », sans combinaisons, et réserver tierces et carrés à la belote. Si tu l'adoptes, fixe clairement comment ces points s'ajoutent au score.</p>",
        },
      ],
      faq: [
        { q: "Peut-on annoncer une tierce ou un carré à la coinche ?", a: "Pas dans la coinche standard. Certaines tables ajoutent les annonces de combinaisons héritées de la belote, mais c'est une convention non officielle à fixer avant de jouer." },
        { q: "Combien valent ces annonces ?", a: "Avec les valeurs de belote classique, une tierce vaut 20, une cinquante 50, une cent 100, et un carré une valeur variable selon le rang. Ces barèmes ne sont pas officiels en coinche, accordez-vous dessus." },
      ],
      related: ["var-belote-coinchee", "var-contree-bridgee", "lex-capot"],
    },
    en: {
      slug: "coinche-with-declared-melds",
      linkLabel: "Declared melds",
      title: "Coinche with declared melds: tierce, carré, hundred",
      h1: "Coinche with declared melds",
      description:
        "Coinche with belote-style melds (tierce, fifty, hundred, four-of-a-kind): a variant adding card combinations. Principle, common values and limits.",
      lead: "Some tables add to coinche the <strong>meld declarations</strong> inherited from belote: runs (tierce, fifty, hundred) and four-of-a-kinds. A rich variant, but a non-standard one.",
      sections: [
        {
          h2: "What is it about?",
          html: "<p>In classic belote you can declare combinations held in hand: <strong>runs</strong> of consecutive cards in one suit, or <strong>four-of-a-kinds</strong> (four cards of the same rank). This variant imports these declarations into coinche, on top of the usual bidding.</p>",
        },
        {
          h2: "The common melds",
          html: "<table><tr><th>Meld</th><th>Make-up</th><th>Common value</th></tr><tr><td>Tierce</td><td>3 cards in sequence</td><td>20</td></tr><tr><td>Fifty (quarte)</td><td>4 cards in sequence</td><td>50</td></tr><tr><td>Hundred (quinte)</td><td>5 cards in sequence</td><td>100</td></tr><tr><td>Four-of-a-kind</td><td>4 cards of the same rank</td><td>varies by rank</td></tr></table><p>These are classic belote values. They are <strong>not official in coinche</strong>: it's a table convention to confirm before playing.</p>",
        },
        {
          h2: "Why it's tricky",
          html: "<p>Mixing numbered bidding with meld declarations complicates scoring and can unbalance the game (a big meld can swing a deal regardless of the contract). Many players prefer to keep coinche \"pure\", without melds, and reserve runs and four-of-a-kinds for belote. If you adopt it, spell out clearly how these points add to the score.</p>",
        },
      ],
      faq: [
        { q: "Can you declare a run or four-of-a-kind in coinche?", a: "Not in standard coinche. Some tables add the meld declarations inherited from belote, but it's a non-official convention to set before playing." },
        { q: "How much are these melds worth?", a: "With classic belote values, a tierce is 20, a fifty 50, a hundred 100, and four-of-a-kind a value varying by rank. These scales aren't official in coinche, so agree on them." },
      ],
      related: ["var-belote-coinchee", "var-contree-bridgee", "lex-capot"],
    },
  },

  {
    id: "var-en-ligne-physique",
    priority: 0.55,
    fr: {
      slug: "coinche-en-ligne-ou-physique",
      linkLabel: "En ligne ou physique",
      title: "Coinche en ligne ou physique : ce qui change vraiment",
      h1: "Coinche en ligne ou physique : ce qui change",
      description:
        "Coinche en ligne ou en vrai : mêmes règles, mais des différences d'ambiance, de rythme, de triche impossible et d'aide à l'apprentissage. Comparatif honnête.",
      lead: "Les <strong>règles ne changent pas</strong> entre une partie en ligne et une partie autour d'une table. Ce qui change, c'est l'expérience : rythme, ambiance, fiabilité et apprentissage.",
      sections: [
        {
          h2: "Mêmes règles, expérience différente",
          html: "<p>Le barème (162 points, belote à 20, capot à 250), les enchères et le contre sont identiques. La différence est ailleurs : en ligne, l'ordinateur gère la distribution, le décompte et le respect des règles ; en physique, c'est aux joueurs de tenir le score et de surveiller les fournis.</p>",
        },
        {
          h2: "Avantages de chaque format",
          html: "<table><tr><th></th><th>En ligne</th><th>Physique</th></tr><tr><td>Décompte</td><td>automatique, sans erreur</td><td>manuel, à vérifier</td></tr><tr><td>Adversaires</td><td>dispo 24/7, IA ou humains</td><td>il faut être quatre</td></tr><tr><td>Ambiance</td><td>pratique, plus froide</td><td>conviviale, vivante</td></tr><tr><td>Apprentissage</td><td>analyses, coach, rejouer</td><td>retours des partenaires</td></tr></table>",
        },
        {
          h2: "Et la triche ?",
          html: "<p>En ligne, contre une IA, la triche n'a pas de sens : les cartes sont distribuées équitablement et le moteur applique les règles à la lettre. Entre humains en ligne, des protections existent côté plateforme. En physique, tout repose sur la confiance et l'attention de la table, comme il se doit.</p>",
        },
        {
          h2: "Lequel choisir ?",
          html: "<p>Pour progresser vite, t'entraîner seul ou jouer à n'importe quelle heure, le en ligne est imbattable. Pour le plaisir partagé d'une partie entre amis, rien ne remplace les cartes en main. Les deux sont complémentaires, pas opposés.</p>",
        },
      ],
      faq: [
        { q: "Les règles de la coinche sont-elles différentes en ligne ?", a: "Non, les règles et le barème sont identiques. Ce qui change est l'expérience : décompte automatique, adversaires disponibles à toute heure et outils d'apprentissage en ligne, contre l'ambiance conviviale du jeu physique." },
        { q: "Peut-on tricher à la coinche en ligne ?", a: "Contre une IA, non : les cartes sont distribuées équitablement et le moteur applique les règles strictement. Entre humains, les plateformes mettent en place des protections. En physique, tout repose sur la confiance de la table." },
      ],
      related: ["var-marseillaise", "var-partie-courte", "lex-capot"],
    },
    en: {
      slug: "coinche-online-vs-in-person",
      linkLabel: "Online vs in person",
      title: "Coinche online vs in person: what really changes",
      h1: "Coinche online vs in person: what changes",
      description:
        "Coinche online or in real life: same rules, but differences in atmosphere, pace, impossible cheating and learning support. An honest comparison.",
      lead: "The <strong>rules don't change</strong> between an online game and a game around a table. What changes is the experience: pace, atmosphere, reliability and learning.",
      sections: [
        {
          h2: "Same rules, different experience",
          html: "<p>The scoring (162 points, belote 20, capot 250), the bidding and doubling are identical. The difference lies elsewhere: online, the computer handles dealing, scoring and rule enforcement; in person, players keep score and watch who follows suit.</p>",
        },
        {
          h2: "Strengths of each format",
          html: "<table><tr><th></th><th>Online</th><th>In person</th></tr><tr><td>Scoring</td><td>automatic, error-free</td><td>manual, needs checking</td></tr><tr><td>Opponents</td><td>available 24/7, AI or humans</td><td>you need four people</td></tr><tr><td>Atmosphere</td><td>convenient, cooler</td><td>sociable, lively</td></tr><tr><td>Learning</td><td>analysis, coach, replays</td><td>partners' feedback</td></tr></table>",
        },
        {
          h2: "What about cheating?",
          html: "<p>Online, against an AI, cheating is pointless: cards are dealt fairly and the engine applies the rules to the letter. Between humans online, platforms put protections in place. In person, everything rests on the table's trust and attention, as it should.</p>",
        },
        {
          h2: "Which to choose?",
          html: "<p>To improve fast, practise solo or play at any hour, online is unbeatable. For the shared pleasure of a game with friends, nothing replaces cards in hand. The two are complementary, not opposed.</p>",
        },
      ],
      faq: [
        { q: "Are coinche rules different online?", a: "No, the rules and scoring are identical. What changes is the experience: automatic scoring, opponents available at any hour and online learning tools, versus the sociable atmosphere of the physical game." },
        { q: "Can you cheat at coinche online?", a: "Against an AI, no: cards are dealt fairly and the engine applies the rules strictly. Between humans, platforms put protections in place. In person, everything rests on the table's trust." },
      ],
      related: ["var-marseillaise", "var-partie-courte", "lex-capot"],
    },
  },

  {
    id: "var-chibre",
    priority: 0.5,
    fr: {
      slug: "chibre-coinche-suisse",
      linkLabel: "Le chibre (Suisse)",
      title: "Le chibre : la coinche suisse expliquée",
      h1: "Le chibre (coinche suisse)",
      description:
        "Le chibre, coinche pratiquée en Suisse romande : enchères chiffrées, atout choisi et contre. Ce qui le rapproche de la coinche et ce qui le distingue.",
      lead: "Le <strong>chibre</strong> est le nom donné en Suisse romande à un jeu très proche de la coinche : enchères chiffrées, choix de l'atout et possibilité de contrer.",
      sections: [
        {
          h2: "Un cousin suisse de la coinche",
          html: "<p>Le chibre appartient à la grande famille des belotes à enchères. Comme la coinche, il se joue à <strong>quatre, en deux équipes, avec 32 cartes</strong>, et le preneur s'engage sur un nombre de points dans un atout choisi. L'esprit (enchérir puis défendre ou contrer) est le même.</p>",
        },
        {
          h2: "Ce qui peut différer",
          html: "<ul><li><strong>Vocabulaire</strong> : les termes locaux changent (l'action de contrer, les noms des contrats).</li><li><strong>Contrats spéciaux</strong> : selon les régions, on retrouve des équivalents du Sans Atout et du Tout Atout, parfois sous d'autres noms.</li><li><strong>Conventions de table</strong> : seuils d'annonce, objectif de partie et détails de barème varient d'un groupe à l'autre.</li></ul>",
        },
        {
          h2: "Bien s'entendre avant de jouer",
          html: "<p>Comme pour toutes les variantes régionales, les règles précises du chibre ne sont pas figées partout de la même façon. Si tu joues avec des habitués, demande-leur leurs conventions (valeurs spéciales, objectif de points, gestion du contre). Le fond reste de la coinche : tu seras vite à l'aise.</p>",
        },
      ],
      faq: [
        { q: "Le chibre, c'est de la coinche ?", a: "C'est un proche cousin : un jeu de belote à enchères joué en Suisse romande, à quatre en deux équipes avec 32 cartes, avec enchères chiffrées, choix de l'atout et contre. L'esprit est celui de la coinche." },
        { q: "Quelles différences avec la coinche française ?", a: "Surtout du vocabulaire local et des conventions de table : seuils d'annonce, noms des contrats, détails de barème. Le cœur du jeu reste identique, donc un coincheur s'y retrouve vite." },
      ],
      related: ["var-marseillaise", "var-sans-atout", "var-belote-coinchee"],
    },
    en: {
      slug: "chibre-swiss-coinche",
      linkLabel: "Chibre (Swiss)",
      title: "Chibre: Swiss coinche explained",
      h1: "Chibre (Swiss coinche)",
      description:
        "Chibre, the coinche played in French-speaking Switzerland: numbered bidding, chosen trump and doubling. How it resembles coinche and how it differs.",
      lead: "<strong>Chibre</strong> is the name given in French-speaking Switzerland to a game very close to coinche: numbered bidding, choice of trump and the option to double.",
      sections: [
        {
          h2: "A Swiss cousin of coinche",
          html: "<p>Chibre belongs to the big family of belote games with bidding. Like coinche, it's played by <strong>four players, in two teams, with 32 cards</strong>, and the taker commits to a number of points in a chosen trump. The spirit (bid, then defend or double) is the same.</p>",
        },
        {
          h2: "What can differ",
          html: "<ul><li><strong>Vocabulary</strong>: local terms differ (the act of doubling, the names of contracts).</li><li><strong>Special contracts</strong>: depending on the region, you find equivalents of No-Trump and All-Trump, sometimes under other names.</li><li><strong>Table conventions</strong>: bidding thresholds, game target and scoring details vary from group to group.</li></ul>",
        },
        {
          h2: "Agree before playing",
          html: "<p>As with all regional variants, the exact rules of chibre aren't fixed the same way everywhere. If you play with regulars, ask for their conventions (special values, points target, doubling rules). The core stays coinche: you'll feel at home quickly.</p>",
        },
      ],
      faq: [
        { q: "Is chibre coinche?", a: "It's a close cousin: a bidding belote game played in French-speaking Switzerland, four players in two teams with 32 cards, with numbered bidding, choice of trump and doubling. The spirit is that of coinche." },
        { q: "How does it differ from French coinche?", a: "Mostly local vocabulary and table conventions: bidding thresholds, contract names, scoring details. The core of the game is identical, so a coinche player gets up to speed fast." },
      ],
      related: ["var-marseillaise", "var-sans-atout", "var-belote-coinchee"],
    },
  },

  {
    id: "var-enchere-montante",
    priority: 0.5,
    fr: {
      slug: "coinche-encheres-montantes",
      linkLabel: "Enchères montantes",
      title: "Coinche à enchères montantes : principe et stratégie",
      h1: "La coinche à enchères montantes",
      description:
        "Coinche à enchères montantes : la forme la plus répandue, où chaque annonce doit dépasser la précédente, de 80 au capot par paliers de 10. Principe et stratégie.",
      lead: "Dans la <strong>coinche à enchères montantes</strong>, chaque nouvelle annonce doit être <strong>supérieure</strong> à la précédente. C'est en fait la façon classique d'enchérir à la coinche.",
      sections: [
        {
          h2: "Le principe de la montée",
          html: "<p>Les enchères commencent à <strong>80</strong> et montent par <strong>paliers de 10</strong> (80, 90, 100, ... jusqu'au capot). Chaque joueur, à son tour, peut passer ou annoncer un contrat strictement plus élevé que le dernier annoncé, en choisissant son atout (ou Sans Atout / Tout Atout). Le dernier à avoir enchéri, une fois que les trois autres ont passé, remporte le contrat.</p>",
        },
        {
          h2: "Pourquoi « montante » ?",
          html: "<p>Le terme insiste sur le fait qu'on ne peut <strong>jamais redescendre</strong> : une enchère engage et la suivante doit faire mieux. Cela crée une tension croissante, surtout quand deux camps se disputent le contrat. Au sommet de la montée, on trouve le capot (250) et, sur certaines tables, la générale.</p>",
        },
        {
          h2: "Un peu de stratégie",
          html: "<p>Annoncer juste, c'est estimer ce que ta main et celle de ton partenaire peuvent réaliser, sans surenchérir au point de chuter. Monter pour « pousser » l'adversaire est risqué : s'il te laisse le contrat trop haut, tu peux le payer cher. À l'inverse, sous-enchérir laisse des points sur la table. L'équilibre dépend du score, de la position et des signaux de ton partenaire. Rien de dogmatique.</p>",
        },
      ],
      faq: [
        { q: "Comment fonctionnent les enchères montantes à la coinche ?", a: "Elles commencent à 80 et montent par paliers de 10 jusqu'au capot. À son tour, chaque joueur passe ou annonce un contrat strictement supérieur au dernier. Le dernier enchérisseur, une fois les autres passés, prend le contrat." },
        { q: "Peut-on baisser son enchère ?", a: "Non, c'est le principe même des enchères montantes : chaque annonce doit dépasser la précédente. On ne redescend jamais, ce qui crée la tension de la montée." },
      ],
      related: ["var-marseillaise", "var-sans-atout", "var-partie-courte"],
    },
    en: {
      slug: "coinche-ascending-bidding",
      linkLabel: "Ascending bidding",
      title: "Coinche with ascending bidding: principle and strategy",
      h1: "Coinche with ascending bidding",
      description:
        "Coinche with ascending bidding: the most common form, where each bid must beat the last, from 80 to capot in steps of 10. Principle and strategy.",
      lead: "In <strong>ascending-bid coinche</strong>, each new bid must be <strong>higher</strong> than the last. This is in fact the classic way to bid in coinche.",
      sections: [
        {
          h2: "The principle of climbing",
          html: "<p>Bidding starts at <strong>80</strong> and rises in <strong>steps of 10</strong> (80, 90, 100, ... up to capot). Each player in turn can pass or bid a contract strictly higher than the last, choosing their trump (or No-Trump / All-Trump). The last to bid, once the other three have passed, wins the contract.</p>",
        },
        {
          h2: "Why \"ascending\"?",
          html: "<p>The term stresses that you can <strong>never come back down</strong>: a bid commits you and the next must do better. This builds rising tension, especially when two sides fight over the contract. At the top of the climb sit the capot (250) and, at some tables, the générale.</p>",
        },
        {
          h2: "A bit of strategy",
          html: "<p>Bidding well means judging what your hand and your partner's can achieve, without overbidding into failure. Climbing to \"push\" the opponents is risky: if they leave you the contract too high, you may pay dearly. Conversely, underbidding leaves points on the table. The balance depends on the score, your seat and your partner's signals. Nothing dogmatic.</p>",
        },
      ],
      faq: [
        { q: "How does ascending bidding work in coinche?", a: "It starts at 80 and rises in steps of 10 up to capot. In turn, each player passes or bids a contract strictly higher than the last. The final bidder, once the others pass, takes the contract." },
        { q: "Can you lower your bid?", a: "No, that's the very principle of ascending bidding: each bid must beat the last. You never come back down, which creates the tension of the climb." },
      ],
      related: ["var-marseillaise", "var-sans-atout", "var-partie-courte"],
    },
  },

  {
    id: "var-partie-courte",
    priority: 0.5,
    fr: {
      slug: "coinche-partie-courte-1000-1500",
      linkLabel: "Partie courte (1000/1500)",
      title: "Coinche rapide : partie courte en 1000 ou 1500 points",
      h1: "La coinche en partie courte",
      description:
        "Coinche rapide : jouer en 1000 ou 1500 points au lieu de 2000 pour des parties plus courtes. Ce que ça change, l'impact sur la stratégie et comment choisir l'objectif.",
      lead: "Tu manques de temps ? Joue une <strong>partie courte</strong> en 1000 ou 1500 points au lieu de 2000. Mêmes règles, mais des donnes qui comptent double.",
      sections: [
        {
          h2: "Comment ça marche",
          html: "<p>Rien ne change dans le déroulement : enchères, plis, barème (162 points par donne, belote à 20, capot à 250) restent identiques. Seul l'<strong>objectif de partie</strong> baisse. La première équipe à atteindre le total fixé (1000, 1500, parfois 2000) remporte la partie.</p>",
        },
        {
          h2: "Quel objectif choisir ?",
          html: "<table><tr><th>Objectif</th><th>Durée approx.</th><th>Pour qui</th></tr><tr><td>1000</td><td>très courte</td><td>pause, initiation, démo</td></tr><tr><td>1500</td><td>moyenne</td><td>soirée équilibrée</td></tr><tr><td>2000</td><td>longue</td><td>partie « complète »</td></tr></table><p>Ces durées sont indicatives : tout dépend du rythme de la table et de la fréquence des gros contrats.</p>",
        },
        {
          h2: "Ce que ça change en stratégie",
          html: "<p>En partie courte, chaque donne pèse plus lourd dans le résultat final. Un capot ou un contrat coinché peut décider la partie à lui seul. Résultat : on a moins de marge pour se refaire après une mauvaise donne, ce qui pousse certains à jouer plus prudemment. À l'inverse, prendre un risque payant rapproche vite de la victoire. À toi de doser selon le score.</p>",
        },
      ],
      faq: [
        { q: "En combien de points se joue une partie de coinche ?", a: "Le plus souvent en 1000, 1500 ou 2000 points. Choisir 1000 ou 1500 raccourcit la partie. La première équipe à atteindre l'objectif fixé gagne." },
        { q: "Une partie courte change-t-elle les règles ?", a: "Non, seules les règles de fin de partie changent : l'objectif de points est plus bas. Le barème, les enchères et le contre restent identiques. Chaque donne pèse simplement plus lourd dans le résultat." },
      ],
      related: ["var-marseillaise", "var-enchere-montante", "var-en-ligne-physique"],
    },
    en: {
      slug: "coinche-short-game-1000-1500",
      linkLabel: "Short game (1000/1500)",
      title: "Quick coinche: short game to 1000 or 1500 points",
      h1: "Coinche short game",
      description:
        "Quick coinche: play to 1000 or 1500 points instead of 2000 for shorter games. What changes, the impact on strategy and how to pick your target.",
      lead: "Short on time? Play a <strong>short game</strong> to 1000 or 1500 points instead of 2000. Same rules, but deals that count double.",
      sections: [
        {
          h2: "How it works",
          html: "<p>Nothing changes in the flow: bidding, tricks, scoring (162 points per deal, belote 20, capot 250) stay identical. Only the <strong>game target</strong> drops. The first team to reach the set total (1000, 1500, sometimes 2000) wins the game.</p>",
        },
        {
          h2: "Which target to choose?",
          html: "<table><tr><th>Target</th><th>Approx. length</th><th>Best for</th></tr><tr><td>1000</td><td>very short</td><td>a break, teaching, a demo</td></tr><tr><td>1500</td><td>medium</td><td>a balanced evening</td></tr><tr><td>2000</td><td>long</td><td>a \"full\" game</td></tr></table><p>These lengths are indicative: it all depends on the table's pace and how often big contracts come up.</p>",
        },
        {
          h2: "What it changes in strategy",
          html: "<p>In a short game, each deal weighs more on the final result. A capot or a doubled contract can decide the game on its own. As a result, there's less room to recover from a bad deal, which pushes some players to be more cautious. Conversely, a successful risk brings you to victory quickly. Dose it according to the score.</p>",
        },
      ],
      faq: [
        { q: "How many points is a coinche game played to?", a: "Most often to 1000, 1500 or 2000 points. Choosing 1000 or 1500 shortens the game. The first team to reach the set target wins." },
        { q: "Does a short game change the rules?", a: "No, only the end-of-game rules change: the points target is lower. The scoring, bidding and doubling stay identical. Each deal simply weighs more on the result." },
      ],
      related: ["var-marseillaise", "var-enchere-montante", "var-en-ligne-physique"],
    },
  },
];
