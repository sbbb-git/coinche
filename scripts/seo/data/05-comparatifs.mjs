// Catégorie : Comparatifs entre la coinche et d'autres jeux de cartes.
// Reste factuel et honnête : on ne dénigre aucun autre jeu.

export const category = { fr: "Coinche et jeux voisins", en: "Coinche vs other games" };

export default [
  {
    id: "cmp-belote-classique",
    priority: 0.6,
    fr: {
      slug: "coinche-vs-belote-classique",
      linkLabel: "Coinche vs belote classique",
      title: "Coinche vs belote classique : toutes les différences",
      description:
        "Coinche ou belote classique ? Atout annoncé aux enchères, possibilité de contrer, points par donne : voici ce qui distingue vraiment les deux jeux.",
      h1: "Coinche vs belote classique",
      lead: "La coinche, c'est une <strong>belote enrichie d'enchères</strong> et de la possibilité de contrer. Mêmes cartes, même esprit, mais une phase de pari qui change tout.",
      sections: [
        {
          h2: "Le tronc commun",
          html: "<p>Les deux jeux se jouent à <strong>4 joueurs en 2 équipes</strong>, avec un jeu de <strong>32 cartes</strong> et <strong>8 plis</strong> par donne. L'ordre et la valeur des cartes sont identiques : à l'atout, le valet vaut 20 et le neuf 14 ; les autres couleurs suivent le barème As 11, 10, Roi 4, Dame 3, Valet 2. La belote (Roi + Dame d'atout) rapporte 20 points dans les deux cas.</p>",
        },
        {
          h2: "Ce qui change vraiment",
          html: "<p>À la belote classique, l'atout est souvent déterminé par la carte retournée que l'on peut « prendre ». À la coinche, l'atout naît d'une <strong>phase d'enchères</strong> : on annonce un contrat, de 80 jusqu'au capot, en promettant un nombre de points. Surtout, l'adversaire peut <strong>coincher</strong> (multiplier les points par 2) et le preneur <strong>surcoincher</strong> (par 4).</p><table><tr><th></th><th>Belote classique</th><th>Coinche</th></tr><tr><td>Atout</td><td>carte retournée</td><td>annoncé aux enchères</td></tr><tr><td>Enchères</td><td>non (ou simplifiées)</td><td>de 80 au capot</td></tr><tr><td>Contre</td><td>non</td><td>coinche x2, surcoinche x4</td></tr><tr><td>Points/donne</td><td>162</td><td>162</td></tr></table>",
        },
        {
          h2: "Le rôle des enchères dans le jeu",
          html: "<p>À la belote classique, une fois l'atout fixé, tout se joue dans la carte. À la coinche, la donne se gagne souvent dès les enchères : annoncer le bon contrat, ni trop bas pour ne pas brader sa main, ni trop haut pour ne pas chuter, est une compétence à part entière. Le preneur s'engage sur un nombre de points, et son partenaire l'aide à le tenir.</p><p>La coinche introduit aussi un vrai duel psychologique : si tu sens un contrat adverse trop optimiste, tu peux le <strong>coincher</strong> pour doubler la mise. Le preneur, confiant, peut répliquer par une <strong>surcoinche</strong> qui quadruple les points. Cette tension n'existe pas en belote classique et constitue le sel du jeu.</p>",
        },
        {
          h2: "Lequel pour toi ?",
          html: "<p>Si tu débutes, la belote classique est plus rapide à prendre en main : moins de décisions avant de jouer, des parties qui s'enchaînent vite. La coinche ajoute une couche de stratégie : évaluer sa main, parier juste, lire l'adversaire et choisir le bon moment pour contrer. Beaucoup de joueurs passent naturellement de l'une à l'autre, car la base de jeu de cartes reste la même. Notre conseil : commence par la belote pour les automatismes, passe à la coinche pour le plaisir du pari.</p>",
        },
      ],
      faq: [
        { q: "La coinche est-elle plus difficile que la belote ?", a: "Elle ajoute surtout une phase d'enchères et la possibilité de contrer. La mécanique des plis est identique, mais il faut apprendre à évaluer sa main pour annoncer juste." },
        { q: "Peut-on jouer à la coinche si on connaît déjà la belote ?", a: "Oui, c'est même le chemin habituel. Tu connais déjà la valeur des cartes et le jeu des plis ; il reste à assimiler les enchères et la coinche." },
      ],
      related: ["cmp-belote-contree", "cmp-belote-bridgee", "lex-capot"],
    },
    en: {
      slug: "coinche-vs-classic-belote",
      linkLabel: "Coinche vs classic belote",
      title: "Coinche vs classic belote: all the differences",
      description:
        "Coinche or classic belote? Trump chosen through bidding, the option to double, points per deal: here is what truly sets the two games apart.",
      h1: "Coinche vs classic belote",
      lead: "Coinche is <strong>belote with a bidding phase</strong> and the option to double. Same cards, same spirit, but a betting stage that changes everything.",
      sections: [
        {
          h2: "What they share",
          html: "<p>Both are played by <strong>4 players in 2 teams</strong>, with a <strong>32-card</strong> deck and <strong>8 tricks</strong> per deal. Card order and values are identical: in trump, the jack scores 20 and the nine 14; other suits follow Ace 11, Ten 10, King 4, Queen 3, Jack 2. The belote (trump King + Queen) is worth 20 points in both.</p>",
        },
        {
          h2: "What really differs",
          html: "<p>In classic belote, trump is often set by the turned-up card a player may take. In coinche, trump comes from a <strong>bidding phase</strong>: you announce a contract, from 80 up to capot, promising a number of points. Crucially, opponents can <strong>coincher</strong> (double the points) and the bidder can <strong>surcoincher</strong> (quadruple them).</p><table><tr><th></th><th>Classic belote</th><th>Coinche</th></tr><tr><td>Trump</td><td>turned-up card</td><td>set by bidding</td></tr><tr><td>Bidding</td><td>none (or simple)</td><td>80 up to capot</td></tr><tr><td>Doubling</td><td>no</td><td>coinche x2, surcoinche x4</td></tr><tr><td>Points/deal</td><td>162</td><td>162</td></tr></table>",
        },
        {
          h2: "The role of bidding",
          html: "<p>In classic belote, once trump is set, everything plays out in the cards. In coinche, the deal is often won at the bidding stage: announcing the right contract, neither too low so you don't undersell your hand, nor too high so you don't fail, is a skill in itself. The bidder commits to a number of points, and the partner helps make it.</p><p>Coinche also adds a real psychological duel: if you sense an opponent's contract is too optimistic, you can <strong>coincher</strong> it to double the stakes. The confident bidder can reply with a <strong>surcoinche</strong> that quadruples the points. This tension does not exist in classic belote and is the spice of the game.</p>",
        },
        {
          h2: "Which one for you?",
          html: "<p>If you are starting out, classic belote is quicker to pick up: fewer decisions before playing, fast back-to-back deals. Coinche adds a strategic layer: evaluating your hand, bidding accurately, reading opponents and choosing the right moment to double. Many players move naturally between the two, since the underlying card game is the same. Our advice: start with belote for the reflexes, move to coinche for the joy of betting.</p>",
        },
      ],
      faq: [
        { q: "Is coinche harder than belote?", a: "It mainly adds a bidding phase and the option to double. The trick mechanics are identical, but you must learn to evaluate your hand to bid accurately." },
        { q: "Can I play coinche if I already know belote?", a: "Yes, it is the usual path. You already know card values and trick play; you just need to learn the bidding and the coinche." },
      ],
      related: ["cmp-belote-contree", "cmp-belote-bridgee", "lex-capot"],
    },
  },

  {
    id: "cmp-tarot",
    priority: 0.55,
    fr: {
      slug: "coinche-vs-tarot",
      linkLabel: "Coinche vs tarot",
      title: "Coinche vs tarot : deux grands jeux de plis comparés",
      description:
        "Coinche ou tarot ? Nombre de joueurs, taille du jeu, enchères, atouts : un comparatif clair entre deux piliers des jeux de cartes français.",
      h1: "Coinche vs tarot",
      lead: "Ce sont deux <strong>jeux de plis avec enchères</strong> très appréciés en France, mais ils diffèrent par presque tout le reste : nombre de joueurs, jeu de cartes, et nature des atouts.",
      sections: [
        {
          h2: "Format et matériel",
          html: "<p>La coinche se joue à <strong>4 joueurs en 2 équipes fixes</strong> avec <strong>32 cartes</strong>. Le tarot se joue le plus souvent à <strong>4 (ou 5) joueurs</strong> avec un jeu spécial de <strong>78 cartes</strong>, incluant les 21 atouts numérotés et l'excuse. À chaque donne, un preneur joue seul contre les autres.</p><table><tr><th></th><th>Coinche</th><th>Tarot</th></tr><tr><td>Joueurs</td><td>4 (2 contre 2)</td><td>4 ou 5</td></tr><tr><td>Cartes</td><td>32</td><td>78</td></tr><tr><td>Atout</td><td>une couleur annoncée</td><td>21 atouts dédiés + excuse</td></tr><tr><td>Camps</td><td>équipes fixes</td><td>preneur seul (ou avec appelé)</td></tr></table>",
        },
        {
          h2: "Les enchères",
          html: "<p>Les deux jeux ont une phase d'enchères, mais d'esprit différent. À la coinche, tu promets un <strong>nombre de points</strong> (de 80 au capot) et tu choisis l'atout. Au tarot, tu choisis un <strong>niveau de contrat</strong> (petite, garde, garde sans, garde contre) qui fixe le multiplicateur, sans choisir d'atout puisqu'il est dédié.</p>",
        },
        {
          h2: "Esprit de jeu",
          html: "<p>La coinche met l'accent sur la <strong>coopération en équipe</strong> et le bras de fer des enchères, avec la coinche pour punir une annonce trop ambitieuse. Tout au long de la donne, tu joues main dans la main avec ton partenaire, en lisant ses signaux. Le tarot est plus souvent un jeu de <strong>preneur contre la table</strong>, avec une gestion fine du chien et des bouts (le petit, le 21 et l'excuse) qui modulent le score final.</p><p>Les deux récompensent la mémoire et le calcul, mais sous des angles différents : la coinche valorise la défense collective et le pari sur les points, le tarot la planification solitaire d'un contrat et l'art de faire tomber les atouts au bon moment.</p>",
        },
      ],
      faq: [
        { q: "Le tarot et la coinche utilisent-ils le même jeu de cartes ?", a: "Non. La coinche utilise 32 cartes classiques, le tarot un jeu spécial de 78 cartes avec 21 atouts numérotés et l'excuse." },
        { q: "Peut-on jouer au tarot à 4 comme à la coinche ?", a: "Le tarot se joue souvent à 4, mais en preneur seul contre les autres, alors que la coinche oppose deux équipes fixes de 2." },
      ],
      related: ["cmp-tarot-debutant", "cmp-panorama-plis", "lex-capot"],
    },
    en: {
      slug: "coinche-vs-french-tarot",
      linkLabel: "Coinche vs tarot",
      title: "Coinche vs French tarot: two great trick games compared",
      description:
        "Coinche or tarot? Number of players, deck size, bidding, trumps: a clear comparison of two pillars of French card games.",
      h1: "Coinche vs French tarot",
      lead: "Both are popular <strong>trick-taking games with bidding</strong> in France, yet they differ in almost everything else: player count, deck, and the nature of trumps.",
      sections: [
        {
          h2: "Format and materials",
          html: "<p>Coinche is played by <strong>4 players in 2 fixed teams</strong> with <strong>32 cards</strong>. French tarot is usually played by <strong>4 (or 5) players</strong> with a special <strong>78-card</strong> deck, including 21 numbered trumps and the excuse. Each deal, one taker plays against the others.</p><table><tr><th></th><th>Coinche</th><th>Tarot</th></tr><tr><td>Players</td><td>4 (2 vs 2)</td><td>4 or 5</td></tr><tr><td>Cards</td><td>32</td><td>78</td></tr><tr><td>Trump</td><td>one announced suit</td><td>21 dedicated trumps + excuse</td></tr><tr><td>Sides</td><td>fixed teams</td><td>lone taker (or with a called partner)</td></tr></table>",
        },
        {
          h2: "The bidding",
          html: "<p>Both have a bidding phase, but with a different spirit. In coinche you promise a <strong>number of points</strong> (80 up to capot) and choose the trump suit. In tarot you choose a <strong>contract level</strong> (petite, garde, garde sans, garde contre) that sets the multiplier, without picking a trump since it is dedicated.</p>",
        },
        {
          h2: "Feel of the game",
          html: "<p>Coinche stresses <strong>team cooperation</strong> and the bidding tug-of-war, with the coinche to punish an over-ambitious call. Throughout the deal you play hand in hand with your partner, reading their signals. Tarot is more often a game of <strong>taker against the table</strong>, with careful handling of the dog and the oudlers (the petit, the 21 and the excuse) that shift the final score.</p><p>Both reward memory and counting, but from different angles: coinche values collective defence and betting on points, while tarot rewards the solitary planning of a contract and the art of drawing out trumps at the right time.</p>",
        },
      ],
      faq: [
        { q: "Do tarot and coinche use the same deck?", a: "No. Coinche uses 32 standard cards, while tarot uses a special 78-card deck with 21 numbered trumps and the excuse." },
        { q: "Can tarot be played by 4 like coinche?", a: "Tarot is often played by 4, but with a lone taker against the others, whereas coinche pits two fixed teams of 2." },
      ],
      related: ["cmp-tarot-debutant", "cmp-panorama-plis", "lex-capot"],
    },
  },

  {
    id: "cmp-manille",
    priority: 0.5,
    fr: {
      slug: "coinche-vs-manille",
      linkLabel: "Coinche vs manille",
      title: "Coinche vs manille : deux jeux de plis en équipe",
      description:
        "Coinche ou manille ? Ordre des cartes, valeur du 10, enchères : ce qui rapproche et ce qui distingue ces deux jeux de plis à quatre.",
      h1: "Coinche vs manille",
      lead: "La manille et la coinche sont toutes deux des <strong>jeux de plis à 4 en 2 équipes</strong>, mais leur hiérarchie de cartes et leur rapport aux enchères diffèrent nettement.",
      sections: [
        {
          h2: "L'ordre des cartes",
          html: "<p>La grande spécificité de la manille, c'est que le <strong>10 (la « manille »)</strong> est la carte la plus forte, devant l'as (le « manillon »). La coinche garde la hiérarchie de la belote : à l'atout, le valet domine, suivi du neuf, puis de l'as. Cette inversion change toute la lecture du jeu pour qui passe d'un jeu à l'autre.</p>",
        },
        {
          h2: "Enchères et atout",
          html: "<p>La manille classique est souvent jouée sans véritables enchères, l'atout pouvant être fixé par retournement ou convention. La coinche repose au contraire sur une <strong>phase d'enchères</strong> (de 80 au capot) où l'on choisit l'atout, avec la possibilité de <strong>coincher x2</strong> et <strong>surcoincher x4</strong>.</p><table><tr><th></th><th>Coinche</th><th>Manille</th></tr><tr><td>Carte maître (atout)</td><td>le valet</td><td>le 10 (manille)</td></tr><tr><td>Enchères</td><td>de 80 au capot</td><td>souvent aucune</td></tr><tr><td>Contre</td><td>coinche x2</td><td>variable selon variante</td></tr></table>",
        },
        {
          h2: "La communication en équipe",
          html: "<p>Dans les deux jeux, jouer en duo demande de comprendre son partenaire sans se parler. À la manille, certaines variantes (la manille parlée) autorisent des annonces convenues pour indiquer ses cartes fortes, ce qui en fait un jeu de communication très vivant. À la coinche, l'information passe surtout par les enchères puis par les cartes que l'on choisit de jouer : ouvrir dans une couleur, couper, ou se défausser sont autant de signaux pour ton partenaire.</p>",
        },
        {
          h2: "Pour qui ?",
          html: "<p>La manille séduit par sa simplicité d'accès et sa convivialité : on apprend vite et on joue détendu. La coinche ajoute la dimension du pari et du contre, qui plaît à ceux qui aiment l'enchère et le calcul de risque. Les deux valorisent la complicité avec son partenaire et la lecture du jeu. Si tu aimes la manille, la coinche t'offrira une couche stratégique supplémentaire sans tout réapprendre.</p>",
        },
      ],
      faq: [
        { q: "Quelle est la carte la plus forte à la manille ?", a: "Le 10, appelé la manille, devant l'as appelé le manillon. C'est différent de la coinche, où le valet d'atout domine." },
        { q: "La manille a-t-elle des enchères comme la coinche ?", a: "La manille classique se joue souvent sans véritable phase d'enchères, contrairement à la coinche qui repose sur des annonces de 80 au capot." },
      ],
      related: ["cmp-belote-classique", "cmp-panorama-plis", "lex-capot"],
    },
    en: {
      slug: "coinche-vs-manille-card-game",
      linkLabel: "Coinche vs manille",
      title: "Coinche vs manille: two team trick games",
      description:
        "Coinche or manille? Card ranking, the value of the 10, bidding: what brings these two four-player trick games together and apart.",
      h1: "Coinche vs manille",
      lead: "Manille and coinche are both <strong>four-player trick games in 2 teams</strong>, but their card ranking and their relationship to bidding differ clearly.",
      sections: [
        {
          h2: "Card ranking",
          html: "<p>Manille's main quirk is that the <strong>10 (the manille)</strong> is the strongest card, ahead of the ace (the manillon). Coinche keeps belote's ranking: in trump, the jack rules, followed by the nine, then the ace. This reversal changes the whole reading of the game when switching between them.</p>",
        },
        {
          h2: "Bidding and trump",
          html: "<p>Classic manille is often played without true bidding, with trump set by turn-up or convention. Coinche, by contrast, relies on a <strong>bidding phase</strong> (80 up to capot) where you choose trump, with the option to <strong>coincher (x2)</strong> and <strong>surcoincher (x4)</strong>.</p><table><tr><th></th><th>Coinche</th><th>Manille</th></tr><tr><td>Top trump</td><td>the jack</td><td>the 10 (manille)</td></tr><tr><td>Bidding</td><td>80 up to capot</td><td>often none</td></tr><tr><td>Doubling</td><td>coinche x2</td><td>varies by variant</td></tr></table>",
        },
        {
          h2: "Team communication",
          html: "<p>In both games, playing as a duo means understanding your partner without speaking. In manille, some variants (spoken manille) allow agreed announcements to flag your strong cards, making it a lively communication game. In coinche, information flows mainly through the bidding and then through the cards you choose to play: opening a suit, ruffing or discarding are all signals to your partner. Reading these cues well is what separates a good pair from a great one in either game.</p>",
        },
        {
          h2: "Who is it for?",
          html: "<p>Manille appeals through its easy access and conviviality: you learn fast and play relaxed. Coinche adds betting and doubling, which suits players who enjoy bidding and risk assessment. Both reward partnership and reading the game. If you like manille, coinche offers an extra strategic layer without relearning everything from scratch.</p>",
        },
      ],
      faq: [
        { q: "What is the strongest card in manille?", a: "The 10, called the manille, ahead of the ace called the manillon. This differs from coinche, where the trump jack rules." },
        { q: "Does manille have bidding like coinche?", a: "Classic manille is often played without a true bidding phase, unlike coinche which relies on calls from 80 up to capot." },
      ],
      related: ["cmp-belote-classique", "cmp-panorama-plis", "lex-capot"],
    },
  },

  {
    id: "cmp-belote-bridgee",
    priority: 0.5,
    fr: {
      slug: "coinche-vs-belote-bridgee",
      linkLabel: "Coinche vs belote bridgée",
      title: "Coinche vs belote bridgée : sont-elles identiques ?",
      description:
        "Coinche et belote bridgée : deux noms pour des jeux très proches. Origine du nom, similitudes et nuances entre ces variantes enchérées de la belote.",
      h1: "Coinche vs belote bridgée",
      lead: "« Belote bridgée » et « coinche » désignent des jeux <strong>très proches</strong> : une belote dotée d'enchères. Les nuances tiennent surtout au vocabulaire et aux conventions de table.",
      sections: [
        {
          h2: "Deux noms, une même idée",
          html: "<p>La belote bridgée est ainsi nommée parce qu'elle emprunte au bridge sa <strong>phase d'enchères</strong>. La coinche (ou contrée) est elle aussi une belote enchérie. Dans l'usage courant, beaucoup de joueurs considèrent ces termes comme quasi synonymes, ou voient la coinche comme une forme de belote bridgée avec contre.</p>",
        },
        {
          h2: "Le tronc commun coinche",
          html: "<p>Quel que soit le nom, on retrouve : <strong>4 joueurs en 2 équipes</strong>, <strong>32 cartes</strong>, <strong>8 plis</strong>, l'atout choisi par les enchères, et <strong>162 points</strong> par donne (152 + 10 de der). La belote (Roi + Dame d'atout) vaut 20.</p><table><tr><th></th><th>Coinche</th><th>Belote bridgée</th></tr><tr><td>Base</td><td>belote enchérie</td><td>belote enchérie</td></tr><tr><td>Origine du nom</td><td>du verbe coincher</td><td>emprunt au bridge</td></tr><tr><td>Contre</td><td>oui (coinche/surcoinche)</td><td>selon convention</td></tr></table>",
        },
        {
          h2: "L'apport du bridge",
          html: "<p>Ce que la belote bridgée emprunte au bridge, c'est l'idée de <strong>monter les enchères par paliers</strong> et de s'engager publiquement sur un objectif chiffré. Cela transforme la belote : la donne ne se résume plus à jouer ses cartes, elle commence par un dialogue d'annonces où chaque équipe jauge sa main et celle d'en face. La coinche pousse cette logique plus loin avec le contre, qui ajoute un vrai face-à-face de confiance.</p>",
        },
        {
          h2: "Ce qui peut varier",
          html: "<p>Les différences relèvent surtout des <strong>conventions locales</strong> : paliers d'enchères, gestion exacte du contre, présence ou non de la surcoinche, façon de compter les annonces. Avant de jouer avec un nouveau groupe, il est sage de se mettre d'accord sur ces points, comme pour toute variante. Cette souplesse explique pourquoi un même jeu porte plusieurs noms selon les régions.</p>",
        },
      ],
      faq: [
        { q: "La belote bridgée et la coinche, c'est pareil ?", a: "Ce sont des jeux très proches : tous deux sont une belote avec enchères. Selon les régions et les tables, les termes se recouvrent largement." },
        { q: "Pourquoi parle-t-on de belote « bridgée » ?", a: "Parce que cette variante emprunte au bridge sa phase d'enchères, ajoutée à la mécanique classique de la belote." },
      ],
      related: ["cmp-belote-classique", "cmp-bridge", "lex-capot"],
    },
    en: {
      slug: "coinche-vs-bid-belote",
      linkLabel: "Coinche vs bid belote",
      title: "Coinche vs bid belote: are they the same?",
      description:
        "Coinche and bid belote: two names for very close games. Origin of the name, similarities and nuances between these bidding variants of belote.",
      h1: "Coinche vs bid belote",
      lead: "\"Bid belote\" (belote bridgee) and \"coinche\" describe <strong>very close</strong> games: belote with a bidding phase. The nuances are mostly about vocabulary and table conventions.",
      sections: [
        {
          h2: "Two names, one idea",
          html: "<p>Bid belote is named that way because it borrows the <strong>bidding phase</strong> from bridge. Coinche (or contree) is also a bid belote. In common use, many players treat these terms as near-synonyms, or see coinche as a form of bid belote with the option to double.</p>",
        },
        {
          h2: "The shared coinche core",
          html: "<p>Whatever the name, you find: <strong>4 players in 2 teams</strong>, <strong>32 cards</strong>, <strong>8 tricks</strong>, trump chosen by bidding, and <strong>162 points</strong> per deal (152 + 10 for the last trick). The belote (trump King + Queen) is worth 20.</p><table><tr><th></th><th>Coinche</th><th>Bid belote</th></tr><tr><td>Base</td><td>bid belote</td><td>bid belote</td></tr><tr><td>Name origin</td><td>from \"coincher\"</td><td>borrowed from bridge</td></tr><tr><td>Doubling</td><td>yes (coinche/surcoinche)</td><td>by convention</td></tr></table>",
        },
        {
          h2: "What bridge brings",
          html: "<p>What bid belote borrows from bridge is the idea of <strong>raising bids in steps</strong> and publicly committing to a numeric goal. This transforms belote: the deal is no longer just about playing your cards, it starts with a dialogue of calls where each team gauges its own hand and the opposition's. Coinche pushes this logic further with doubling, which adds a genuine standoff of confidence between the two teams.</p>",
        },
        {
          h2: "What can vary",
          html: "<p>Differences mostly come down to <strong>local conventions</strong>: bidding steps, exact handling of doubling, whether surcoinche exists, how calls are scored. Before playing with a new group, it is wise to agree on these points, as with any variant. This flexibility explains why one game carries several names across regions.</p>",
        },
      ],
      faq: [
        { q: "Are bid belote and coinche the same?", a: "They are very close games: both are belote with bidding. Depending on the region and the table, the terms overlap heavily." },
        { q: "Why is it called \"bid\" belote?", a: "Because this variant borrows a bidding phase from bridge, added to the classic belote mechanics." },
      ],
      related: ["cmp-belote-classique", "cmp-bridge", "lex-capot"],
    },
  },

  {
    id: "cmp-bridge",
    priority: 0.55,
    fr: {
      slug: "coinche-vs-bridge",
      linkLabel: "Coinche vs bridge",
      title: "Coinche vs bridge : enchères, cartes et complexité",
      description:
        "Coinche ou bridge ? Taille du jeu, système d'enchères, atout, courbe d'apprentissage : comparatif honnête entre la coinche et le bridge.",
      h1: "Coinche vs bridge",
      lead: "Le bridge a inspiré la phase d'enchères de la coinche, mais les deux jeux diffèrent par la taille du jeu, la richesse des enchères et la courbe d'apprentissage.",
      sections: [
        {
          h2: "Jeu de cartes et atout",
          html: "<p>Le bridge utilise les <strong>52 cartes</strong> et 13 plis par donne ; la coinche se joue avec <strong>32 cartes</strong> et 8 plis. Au bridge, l'atout (ou le sans-atout) ressort d'un système d'enchères élaboré. À la coinche, on annonce un nombre de points (de 80 au capot) en choisissant l'atout, avec sans-atout et tout-atout possibles selon les variantes.</p><table><tr><th></th><th>Coinche</th><th>Bridge</th></tr><tr><td>Cartes</td><td>32</td><td>52</td></tr><tr><td>Plis/donne</td><td>8</td><td>13</td></tr><tr><td>Enchères</td><td>points (80 au capot)</td><td>niveau + couleur</td></tr><tr><td>Contre</td><td>coinche x2, surcoinche x4</td><td>contre / surcontre</td></tr></table>",
        },
        {
          h2: "Le contre, point commun",
          html: "<p>Les deux jeux permettent de <strong>contrer</strong> une annonce adverse et de la <strong>surcontrer</strong>. C'est d'ailleurs de là que vient le nom « coinche ». La logique de pari et de défi est familière à qui connaît l'un ou l'autre.</p>",
        },
        {
          h2: "La place du partenaire",
          html: "<p>Dans les deux jeux, le partenariat est central, mais il s'exprime différemment. Au bridge, l'un des deux partenaires devient le « mort » et étale son jeu, le déclarant jouant alors deux mains visibles. À la coinche, les quatre joueurs gardent leurs cartes cachées du début à la fin : la coordination passe entièrement par les enchères et par la lecture des cartes jouées, sans jamais voir le jeu de son partenaire.</p>",
        },
        {
          h2: "Apprentissage",
          html: "<p>Le bridge est réputé d'une grande profondeur, avec des systèmes d'enchères codifiés qui demandent du temps et de la pratique régulière. La coinche offre une partie de cette tension stratégique avec une base plus rapide à apprendre, héritée de la belote. Les deux sont d'excellents jeux ; le choix dépend du temps que tu veux y consacrer et de l'ambiance recherchée, plus club et compétition pour le bridge, plus conviviale pour la coinche.</p>",
        },
      ],
      faq: [
        { q: "La coinche vient-elle du bridge ?", a: "La coinche est une belote dotée d'enchères et d'un système de contre inspiré du bridge, d'où son nom. Mais c'est un jeu distinct, à 32 cartes." },
        { q: "Le bridge est-il plus complexe que la coinche ?", a: "Le bridge a des systèmes d'enchères très développés qui demandent un long apprentissage. La coinche reste plus accessible tout en gardant une vraie dimension stratégique." },
      ],
      related: ["cmp-belote-bridgee", "cmp-whist", "lex-capot"],
    },
    en: {
      slug: "coinche-vs-bridge-card-game",
      linkLabel: "Coinche vs bridge",
      title: "Coinche vs bridge: bidding, cards and complexity",
      description:
        "Coinche or bridge? Deck size, bidding system, trump, learning curve: an honest comparison between coinche and bridge.",
      h1: "Coinche vs bridge",
      lead: "Bridge inspired coinche's bidding phase, but the two games differ in deck size, depth of bidding and learning curve.",
      sections: [
        {
          h2: "Deck and trump",
          html: "<p>Bridge uses the <strong>52-card</strong> deck and 13 tricks per deal; coinche uses <strong>32 cards</strong> and 8 tricks. In bridge, trump (or no-trump) emerges from an elaborate bidding system. In coinche, you announce a number of points (80 up to capot) while choosing trump, with no-trump and all-trump available in some variants.</p><table><tr><th></th><th>Coinche</th><th>Bridge</th></tr><tr><td>Cards</td><td>32</td><td>52</td></tr><tr><td>Tricks/deal</td><td>8</td><td>13</td></tr><tr><td>Bidding</td><td>points (80 to capot)</td><td>level + suit</td></tr><tr><td>Doubling</td><td>coinche x2, surcoinche x4</td><td>double / redouble</td></tr></table>",
        },
        {
          h2: "Doubling, a shared idea",
          html: "<p>Both games let you <strong>double</strong> an opponent's call and <strong>redouble</strong> it. That is in fact where the name \"coinche\" comes from. The logic of betting and challenging feels familiar to players of either game.</p>",
        },
        {
          h2: "The partner's role",
          html: "<p>In both games the partnership is central, but it shows differently. In bridge, one partner becomes the \"dummy\" and lays their hand face up, the declarer then playing two visible hands. In coinche, all four players keep their cards hidden from start to finish: coordination flows entirely through the bidding and the reading of played cards, without ever seeing your partner's hand.</p>",
        },
        {
          h2: "Learning",
          html: "<p>Bridge is famous for its great depth, with codified bidding systems that take time and regular practice to master. Coinche offers some of that strategic tension on a base that is quicker to learn, inherited from belote. Both are excellent games; the choice depends on the time you want to invest and the mood you seek, more club and competition for bridge, more convivial for coinche.</p>",
        },
      ],
      faq: [
        { q: "Does coinche come from bridge?", a: "Coinche is a belote with bidding and a doubling system inspired by bridge, hence its name. But it is a distinct, 32-card game." },
        { q: "Is bridge more complex than coinche?", a: "Bridge has very developed bidding systems that take a long time to learn. Coinche stays more accessible while keeping a real strategic dimension." },
      ],
      related: ["cmp-belote-bridgee", "cmp-whist", "lex-capot"],
    },
  },

  {
    id: "cmp-whist",
    priority: 0.5,
    fr: {
      slug: "coinche-vs-whist",
      linkLabel: "Coinche vs whist",
      title: "Coinche vs whist : aux origines des jeux de plis",
      description:
        "Coinche ou whist ? Le whist, ancêtre du bridge, comparé à la coinche : cartes, enchères, atout et esprit de ces deux jeux de plis en équipe.",
      h1: "Coinche vs whist",
      lead: "Le whist est un <strong>classique anglais</strong> souvent vu comme l'ancêtre du bridge. Comparé à la coinche, il partage le jeu en équipe mais s'en éloigne par les cartes et les enchères.",
      sections: [
        {
          h2: "Cartes et structure",
          html: "<p>Le whist se joue avec <strong>52 cartes</strong> et 13 plis par donne, à 4 joueurs en 2 équipes, comme le bridge. La coinche utilise <strong>32 cartes</strong> et 8 plis. Dans sa forme la plus simple, le whist n'a pas de phase d'enchères élaborée et l'atout peut être déterminé par retournement.</p><table><tr><th></th><th>Coinche</th><th>Whist (classique)</th></tr><tr><td>Cartes</td><td>32</td><td>52</td></tr><tr><td>Plis/donne</td><td>8</td><td>13</td></tr><tr><td>Atout</td><td>annoncé aux enchères</td><td>souvent par retournement</td></tr><tr><td>Contre</td><td>coinche x2</td><td>selon variante</td></tr></table>",
        },
        {
          h2: "Enchères et variantes",
          html: "<p>Il existe de nombreuses variantes de whist, dont certaines ajoutent des enchères (comme le whist boston). Mais l'idée centrale de la coinche, parier un nombre de points et pouvoir <strong>coincher</strong> l'adversaire, reste sa marque propre et n'a pas d'équivalent direct dans le whist classique.</p>",
        },
        {
          h2: "Une influence historique",
          html: "<p>Le whist a profondément marqué la famille des jeux de plis : c'est de lui que descend le bridge, qui a lui-même inspiré la phase d'enchères et le contre de la coinche. En jouant à la coinche, tu manies donc, sans le savoir, un héritage qui remonte à ce classique anglais. Comprendre le whist aide à saisir d'où viennent les grands principes communs : suivre la couleur demandée, couper à l'atout, et coopérer avec son partenaire.</p>",
        },
        {
          h2: "Esprit",
          html: "<p>Le whist met l'accent sur la pure technique du jeu de la carte et la communication implicite avec son partenaire. La coinche y ajoute le sel des enchères et du contre, qui crée des retournements de situation absents du whist classique. Les deux sont d'excellents terrains pour développer mémoire, anticipation et sens du partenariat, des qualités qui se transfèrent d'un jeu de plis à l'autre.</p>",
        },
      ],
      faq: [
        { q: "Le whist est-il l'ancêtre du bridge ?", a: "Le whist est souvent présenté comme un précurseur du bridge. La coinche, elle, descend de la belote et a emprunté la phase d'enchères au bridge." },
        { q: "Le whist a-t-il un système de contre comme la coinche ?", a: "Le whist classique n'a pas de contre comparable à la coinche. Certaines variantes ajoutent des enchères, mais le contre reste une signature de la coinche." },
      ],
      related: ["cmp-bridge", "cmp-jeux-etrangers", "lex-capot"],
    },
    en: {
      slug: "coinche-vs-whist-card-game",
      linkLabel: "Coinche vs whist",
      title: "Coinche vs whist: the roots of trick games",
      description:
        "Coinche or whist? Whist, ancestor of bridge, compared to coinche: cards, bidding, trump and the spirit of these two team trick games.",
      h1: "Coinche vs whist",
      lead: "Whist is an <strong>English classic</strong> often seen as the ancestor of bridge. Compared to coinche, it shares team play but parts ways on cards and bidding.",
      sections: [
        {
          h2: "Cards and structure",
          html: "<p>Whist is played with <strong>52 cards</strong> and 13 tricks per deal, by 4 players in 2 teams, like bridge. Coinche uses <strong>32 cards</strong> and 8 tricks. In its simplest form, whist has no elaborate bidding phase and trump can be set by a turned-up card.</p><table><tr><th></th><th>Coinche</th><th>Whist (classic)</th></tr><tr><td>Cards</td><td>32</td><td>52</td></tr><tr><td>Tricks/deal</td><td>8</td><td>13</td></tr><tr><td>Trump</td><td>set by bidding</td><td>often by turn-up</td></tr><tr><td>Doubling</td><td>coinche x2</td><td>by variant</td></tr></table>",
        },
        {
          h2: "Bidding and variants",
          html: "<p>There are many whist variants, some adding bidding (such as Boston whist). But coinche's central idea, betting a number of points and being able to <strong>coincher</strong> the opponent, is its own hallmark and has no direct equivalent in classic whist.</p>",
        },
        {
          h2: "A historical influence",
          html: "<p>Whist deeply shaped the family of trick games: bridge descends from it, and bridge in turn inspired coinche's bidding phase and doubling. So when you play coinche, you are handling, without knowing it, a heritage that goes back to this English classic. Understanding whist helps you grasp where the shared core principles come from: following the led suit, ruffing with trump, and cooperating with your partner to win the most valuable tricks.</p>",
        },
        {
          h2: "Spirit",
          html: "<p>Whist emphasises pure card-play technique and implicit communication with your partner. Coinche adds the spice of bidding and doubling, creating swings absent from classic whist. Both are great ground to develop memory, anticipation and a sense of partnership, qualities that transfer from one trick game to another.</p>",
        },
      ],
      faq: [
        { q: "Is whist the ancestor of bridge?", a: "Whist is often presented as a forerunner of bridge. Coinche, for its part, descends from belote and borrowed the bidding phase from bridge." },
        { q: "Does whist have a doubling system like coinche?", a: "Classic whist has no doubling comparable to coinche. Some variants add bidding, but doubling remains a signature of coinche." },
      ],
      related: ["cmp-bridge", "cmp-jeux-etrangers", "lex-capot"],
    },
  },

  {
    id: "cmp-belote-contree",
    priority: 0.6,
    fr: {
      slug: "belote-vs-belote-contree",
      linkLabel: "Belote vs belote contrée",
      title: "Belote vs belote contrée : quelles différences ?",
      description:
        "Belote ou belote contrée ? La contrée (autre nom de la coinche) ajoute enchères et contre à la belote. Comparatif clair des deux pratiques.",
      h1: "Belote vs belote contrée",
      lead: "La <strong>belote contrée</strong> est un autre nom de la coinche : une belote enrichie d'enchères et de la possibilité de contrer. Voici ce qui la sépare de la belote simple.",
      sections: [
        {
          h2: "La belote, base commune",
          html: "<p>Belote simple et belote contrée partagent l'essentiel : <strong>4 joueurs, 2 équipes, 32 cartes, 8 plis</strong>, même hiérarchie des cartes (valet et neuf forts à l'atout), belote Roi + Dame d'atout à 20 points, et <strong>162 points</strong> par donne. Qui sait jouer à la belote a déjà l'essentiel pour la contrée.</p>",
        },
        {
          h2: "Ce qu'ajoute la contrée",
          html: "<p>La contrée ajoute deux choses majeures : une <strong>phase d'enchères</strong> où l'on annonce un contrat (de 80 au capot) en choisissant l'atout, et la possibilité de <strong>contrer</strong> (coincher x2) puis de <strong>surcontrer</strong> (surcoincher x4). Le pari devient central : annoncer trop haut expose à la chute et au contre.</p><table><tr><th></th><th>Belote simple</th><th>Belote contrée</th></tr><tr><td>Atout</td><td>retournement</td><td>enchères</td></tr><tr><td>Annonce de points</td><td>non</td><td>de 80 au capot</td></tr><tr><td>Contre</td><td>non</td><td>coinche x2 / surcoinche x4</td></tr></table>",
        },
        {
          h2: "Pourquoi passer à la contrée ?",
          html: "<p>Si tu maîtrises déjà la belote, la contrée renouvelle complètement l'intérêt sans te demander de tout réapprendre. Les enchères donnent du poids à chaque main : une belle distribution se valorise par un contrat ambitieux, une main moyenne se gère prudemment. Le contre, lui, récompense la lecture du jeu adverse et apporte ces moments décisifs où une donne bien coinchée fait basculer la partie. C'est un excellent pont entre la belote conviviale et les jeux plus stratégiques.</p>",
        },
        {
          h2: "Contrée ou coinche ?",
          html: "<p>« Contrée » et « coinche » désignent le même jeu, avec des préférences régionales de vocabulaire. Le mot « coinche » vient du verbe coincher (contrer). Si on te propose une partie de contrée, attends-toi exactement à une coinche : mêmes enchères de 80 au capot, même contre, même barème de 162 points par donne.</p>",
        },
      ],
      faq: [
        { q: "La belote contrée, c'est la coinche ?", a: "Oui. « Contrée » et « coinche » sont deux noms du même jeu : une belote avec enchères et possibilité de contrer." },
        { q: "Faut-il réapprendre les cartes pour passer de la belote à la contrée ?", a: "Non, la hiérarchie et la valeur des cartes sont identiques. Tu ajoutes seulement les enchères et le mécanisme de contre." },
      ],
      related: ["cmp-belote-classique", "cmp-belote-bridgee", "lex-capot"],
    },
    en: {
      slug: "belote-vs-contree-differences",
      linkLabel: "Belote vs belote contree",
      title: "Belote vs belote contree: what are the differences?",
      description:
        "Belote or belote contree? The contree (another name for coinche) adds bidding and doubling to belote. A clear comparison of both practices.",
      h1: "Belote vs belote contree",
      lead: "<strong>Belote contree</strong> is another name for coinche: a belote enriched with bidding and the option to double. Here is what separates it from plain belote.",
      sections: [
        {
          h2: "Belote, the shared base",
          html: "<p>Plain belote and belote contree share the essentials: <strong>4 players, 2 teams, 32 cards, 8 tricks</strong>, the same card ranking (jack and nine strong in trump), the belote (trump King + Queen) at 20 points, and <strong>162 points</strong> per deal. If you can play belote, you already have the essentials for contree.</p>",
        },
        {
          h2: "What contree adds",
          html: "<p>Contree adds two major things: a <strong>bidding phase</strong> where you announce a contract (80 up to capot) while choosing trump, and the option to <strong>double</strong> (coincher, x2) then <strong>redouble</strong> (surcoincher, x4). Betting becomes central: bidding too high exposes you to failure and to being doubled.</p><table><tr><th></th><th>Plain belote</th><th>Belote contree</th></tr><tr><td>Trump</td><td>turn-up</td><td>bidding</td></tr><tr><td>Point bid</td><td>no</td><td>80 up to capot</td></tr><tr><td>Doubling</td><td>no</td><td>coinche x2 / surcoinche x4</td></tr></table>",
        },
        {
          h2: "Why move up to contree?",
          html: "<p>If you already master belote, contree fully renews the interest without asking you to relearn everything. Bidding gives weight to every hand: a strong distribution is rewarded with an ambitious contract, an average hand is managed cautiously. Doubling, in turn, rewards reading the opponents' game and brings those decisive moments where a well-doubled deal flips the match. It is an excellent bridge between convivial belote and more strategic games.</p>",
        },
        {
          h2: "Contree or coinche?",
          html: "<p>\"Contree\" and \"coinche\" name the same game, with regional vocabulary preferences. The word \"coinche\" comes from the verb coincher (to double). If someone offers a game of contree, expect exactly a coinche: the same bids from 80 to capot, the same doubling, the same 162-point scale per deal.</p>",
        },
      ],
      faq: [
        { q: "Is belote contree the same as coinche?", a: "Yes. \"Contree\" and \"coinche\" are two names for the same game: a belote with bidding and the option to double." },
        { q: "Do I need to relearn the cards to go from belote to contree?", a: "No, the ranking and card values are identical. You only add the bidding and the doubling mechanism." },
      ],
      related: ["cmp-belote-classique", "cmp-belote-bridgee", "lex-capot"],
    },
  },

  {
    id: "cmp-tarot-debutant",
    priority: 0.5,
    fr: {
      slug: "coinche-ou-tarot-pour-debuter",
      linkLabel: "Coinche ou tarot pour débuter ?",
      title: "Coinche ou tarot : lequel choisir pour débuter ?",
      description:
        "Coinche ou tarot pour un débutant ? Matériel, courbe d'apprentissage, nombre de joueurs : nos repères honnêtes pour choisir ton premier jeu de plis.",
      h1: "Coinche ou tarot pour débuter ?",
      lead: "Tu hésites entre la coinche et le tarot pour te lancer ? Les deux sont d'excellents jeux. Le bon choix dépend surtout de ton groupe et du temps que tu veux investir.",
      sections: [
        {
          h2: "Le matériel et le groupe",
          html: "<p>La coinche demande un jeu de <strong>32 cartes</strong> classique et exactement <strong>4 joueurs</strong> répartis en 2 équipes. Le tarot nécessite un jeu spécial de <strong>78 cartes</strong> et s'accommode de <strong>4 ou 5 joueurs</strong>. Si ton groupe varie en nombre, le tarot est plus souple ; si vous êtes pile quatre, la coinche est idéale.</p>",
        },
        {
          h2: "La courbe d'apprentissage",
          html: "<p>La coinche s'appuie sur la belote, très répandue : si quelqu'un autour de la table la connaît, l'apprentissage est rapide, l'essentiel étant d'assimiler les enchères et le contre. Le tarot demande d'apprendre une hiérarchie de cartes nouvelle (les 21 atouts, l'excuse, les bouts) et la gestion du chien.</p><table><tr><th></th><th>Coinche</th><th>Tarot</th></tr><tr><td>Cartes</td><td>32</td><td>78</td></tr><tr><td>Joueurs</td><td>4</td><td>4 ou 5</td></tr><tr><td>Atout</td><td>une couleur annoncée</td><td>21 atouts dédiés</td></tr><tr><td>Atout pour la belote</td><td>oui (connaissance utile)</td><td>non</td></tr></table>",
        },
        {
          h2: "Bien démarrer, quel que soit ton choix",
          html: "<p>Pour la coinche, commence par jouer quelques donnes sans enchères pour assimiler la valeur des cartes et l'ordre des atouts, puis introduis les annonces et enfin le contre. Pour le tarot, familiarise-toi d'abord avec les 21 atouts et l'excuse avant d'aborder le chien et le comptage des bouts. Dans les deux cas, jouer contre une application ou avec un joueur expérimenté accélère beaucoup l'apprentissage, car tu vois les bons réflexes en situation.</p>",
        },
        {
          h2: "Notre repère",
          html: "<p>Si tu connais déjà la belote ou que ton groupe la pratique, commence par la <strong>coinche</strong> : la transition est naturelle et tu gardes tes acquis. Si tu pars de zéro et aimes les jeux riches en matériel et en variété de cartes, le tarot est passionnant. Dans les deux cas, quelques parties suffisent pour accrocher, et rien ne t'empêche d'apprendre les deux au fil du temps.</p>",
        },
      ],
      faq: [
        { q: "Le tarot est-il plus dur à apprendre que la coinche ?", a: "Le tarot introduit une hiérarchie de cartes nouvelle et la gestion du chien, ce qui demande un petit effort de départ. La coinche profite de la popularité de la belote." },
        { q: "Combien faut-il de joueurs pour chaque jeu ?", a: "La coinche se joue à 4 en deux équipes. Le tarot se joue à 4 ou 5 joueurs, ce qui le rend plus souple selon la taille du groupe." },
      ],
      related: ["cmp-tarot", "cmp-panorama-plis", "cmp-belote-classique"],
    },
    en: {
      slug: "coinche-or-tarot-for-beginners",
      linkLabel: "Coinche or tarot for beginners?",
      title: "Coinche or tarot: which to choose as a beginner?",
      description:
        "Coinche or tarot for a beginner? Materials, learning curve, player count: honest pointers to choose your first trick-taking game.",
      h1: "Coinche or tarot to start?",
      lead: "Torn between coinche and tarot to get started? Both are excellent games. The right choice mostly depends on your group and the time you want to invest.",
      sections: [
        {
          h2: "Materials and the group",
          html: "<p>Coinche needs a standard <strong>32-card</strong> deck and exactly <strong>4 players</strong> split into 2 teams. Tarot requires a special <strong>78-card</strong> deck and works with <strong>4 or 5 players</strong>. If your group size varies, tarot is more flexible; if you are exactly four, coinche is ideal.</p>",
        },
        {
          h2: "The learning curve",
          html: "<p>Coinche builds on belote, which is widespread: if someone at the table knows it, learning is fast, the main task being to absorb bidding and doubling. Tarot requires learning a new card ranking (the 21 trumps, the excuse, the oudlers) and handling the dog.</p><table><tr><th></th><th>Coinche</th><th>Tarot</th></tr><tr><td>Cards</td><td>32</td><td>78</td></tr><tr><td>Players</td><td>4</td><td>4 or 5</td></tr><tr><td>Trump</td><td>one announced suit</td><td>21 dedicated trumps</td></tr><tr><td>Belote bonus knowledge</td><td>yes (helpful)</td><td>no</td></tr></table>",
        },
        {
          h2: "Getting off to a good start, whatever you pick",
          html: "<p>For coinche, start by playing a few deals without bidding to absorb card values and the trump order, then add the calls and finally the doubling. For tarot, get familiar with the 21 trumps and the excuse before tackling the dog and counting oudlers. In both cases, playing against an app or with an experienced player speeds up learning a lot, because you see the right reflexes in context.</p>",
        },
        {
          h2: "Our pointer",
          html: "<p>If you already know belote or your group plays it, start with <strong>coinche</strong>: the transition is natural and you keep what you know. If you start from scratch and enjoy material-rich games with a wide variety of cards, tarot is thrilling. Either way, a few games are enough to get hooked, and nothing stops you learning both over time.</p>",
        },
      ],
      faq: [
        { q: "Is tarot harder to learn than coinche?", a: "Tarot introduces a new card ranking and dog management, which takes a little upfront effort. Coinche benefits from belote's popularity." },
        { q: "How many players does each game need?", a: "Coinche is played by 4 in two teams. Tarot is played by 4 or 5 players, making it more flexible for varying group sizes." },
      ],
      related: ["cmp-tarot", "cmp-panorama-plis", "cmp-belote-classique"],
    },
  },

  {
    id: "cmp-panorama-plis",
    priority: 0.55,
    fr: {
      slug: "panorama-jeux-de-plis-francais",
      linkLabel: "Panorama des jeux de plis",
      title: "Panorama des jeux de plis français : belote, coinche, tarot, manille",
      description:
        "Tour d'horizon des grands jeux de plis français : belote, coinche, tarot, manille, et où la coinche se situe parmi eux. Un repère pour s'y retrouver.",
      h1: "Panorama des jeux de plis français",
      lead: "La France a une riche tradition de <strong>jeux de plis</strong>. Voici comment la coinche se situe parmi ses voisins, pour mieux comprendre ce qui la rend particulière.",
      sections: [
        {
          h2: "Qu'est-ce qu'un jeu de plis ?",
          html: "<p>Un jeu de plis se joue par tours : chacun pose une carte, et la plus forte remporte le « pli ». L'objectif est de remporter des plis valant des points. Belote, coinche, tarot et manille partagent ce principe, mais varient par le jeu de cartes, le nombre de joueurs et la présence d'enchères.</p>",
        },
        {
          h2: "Les grands jeux en un coup d'œil",
          html: "<table><tr><th>Jeu</th><th>Joueurs</th><th>Cartes</th><th>Enchères</th></tr><tr><td>Belote</td><td>4 (2v2)</td><td>32</td><td>simples ou aucune</td></tr><tr><td>Coinche</td><td>4 (2v2)</td><td>32</td><td>oui, de 80 au capot</td></tr><tr><td>Tarot</td><td>4 ou 5</td><td>78</td><td>par niveau de contrat</td></tr><tr><td>Manille</td><td>4 (2v2)</td><td>32 ou 40</td><td>souvent aucune</td></tr></table><p>La coinche occupe une place intéressante : la convivialité de la belote, plus la profondeur des enchères et du contre.</p>",
        },
        {
          h2: "Comment choisir parmi eux",
          html: "<p>Le bon jeu dépend de ton groupe et de ton envie. Pour quatre joueurs pile et un goût pour la stratégie, la coinche est idéale. Pour une ambiance détendue et un apprentissage express, la belote ou la manille conviennent très bien. Pour un groupe de quatre ou cinq amateurs de jeux plus touffus, le tarot brille. Aucun n'est supérieur : ils répondent à des moments et des humeurs différents, et beaucoup de joueurs aiment passer de l'un à l'autre.</p>",
        },
        {
          h2: "Où se situe la coinche",
          html: "<p>La coinche est la <strong>belote des enchères</strong> : 4 joueurs, 32 cartes, 8 plis, 162 points par donne, mais avec une phase de pari (de 80 au capot) et la possibilité de <strong>coincher x2</strong> ou <strong>surcoincher x4</strong>. C'est ce mélange d'accessibilité, hérité de la belote, et de profondeur stratégique, hérité de l'esprit des enchères, qui explique son succès durable dans les cafés comme en ligne.</p>",
        },
      ],
      faq: [
        { q: "Quels sont les principaux jeux de plis français ?", a: "Parmi les plus connus : la belote, la coinche (ou contrée), le tarot et la manille. Tous reposent sur le principe de remporter des plis." },
        { q: "Qu'est-ce qui distingue la coinche des autres ?", a: "Sa phase d'enchères de 80 au capot et la possibilité de coincher, le tout sur la base accessible de la belote à 32 cartes." },
      ],
      related: ["cmp-tarot", "cmp-manille", "cmp-belote-classique"],
    },
    en: {
      slug: "guide-to-french-trick-games",
      linkLabel: "Guide to French trick games",
      title: "A guide to French trick games: belote, coinche, tarot, manille",
      description:
        "An overview of the great French trick games: belote, coinche, tarot, manille, and where coinche fits among them. A guide to find your bearings.",
      h1: "A guide to French trick games",
      lead: "France has a rich tradition of <strong>trick-taking games</strong>. Here is where coinche fits among its neighbours, to better understand what makes it special.",
      sections: [
        {
          h2: "What is a trick game?",
          html: "<p>A trick game is played in rounds: each player lays a card, and the strongest wins the \"trick.\" The goal is to win tricks worth points. Belote, coinche, tarot and manille share this principle but vary by deck, player count and the presence of bidding.</p>",
        },
        {
          h2: "The big games at a glance",
          html: "<table><tr><th>Game</th><th>Players</th><th>Cards</th><th>Bidding</th></tr><tr><td>Belote</td><td>4 (2v2)</td><td>32</td><td>simple or none</td></tr><tr><td>Coinche</td><td>4 (2v2)</td><td>32</td><td>yes, 80 to capot</td></tr><tr><td>Tarot</td><td>4 or 5</td><td>78</td><td>by contract level</td></tr><tr><td>Manille</td><td>4 (2v2)</td><td>32 or 40</td><td>often none</td></tr></table><p>Coinche sits in an interesting spot: belote's conviviality, plus the depth of bidding and doubling.</p>",
        },
        {
          h2: "How to choose among them",
          html: "<p>The right game depends on your group and your mood. For exactly four players with a taste for strategy, coinche is ideal. For a relaxed atmosphere and a quick learn, belote or manille work very well. For a group of four or five who enjoy meatier games, tarot shines. None is superior: they suit different moments and moods, and many players enjoy moving between them depending on who is at the table that day.</p>",
        },
        {
          h2: "Where coinche fits",
          html: "<p>Coinche is the <strong>belote of bidding</strong>: 4 players, 32 cards, 8 tricks, 162 points per deal, but with a betting phase (80 up to capot) and the option to <strong>coincher (x2)</strong> or <strong>surcoincher (x4)</strong>. This blend of accessibility, inherited from belote, and strategic depth, inherited from the spirit of bidding, explains its lasting success both in cafes and online.</p>",
        },
      ],
      faq: [
        { q: "What are the main French trick games?", a: "Among the best known: belote, coinche (or contree), tarot and manille. All rely on the principle of winning tricks." },
        { q: "What sets coinche apart from the others?", a: "Its bidding phase from 80 to capot and the option to double, all on the accessible base of 32-card belote." },
      ],
      related: ["cmp-tarot", "cmp-manille", "cmp-belote-classique"],
    },
  },

  {
    id: "cmp-president",
    priority: 0.45,
    fr: {
      slug: "coinche-vs-president",
      linkLabel: "Coinche vs président",
      title: "Coinche vs président : stratégie ou pure convivialité ?",
      description:
        "Coinche ou président ? Le président, jeu de défausse convivial, comparé à la coinche, jeu de plis stratégique en équipe. Deux ambiances différentes.",
      h1: "Coinche vs président",
      lead: "La coinche et le président répondent à deux envies différentes : la coinche est un <strong>jeu de plis stratégique en équipe</strong>, le président un <strong>jeu de défausse convivial</strong> et rapide.",
      sections: [
        {
          h2: "Deux familles de jeux",
          html: "<p>La coinche est un jeu de <strong>plis</strong> : on pose une carte chacun son tour et la plus forte remporte le pli. Le président est un jeu de <strong>défausse</strong> : le but est de se débarrasser de toutes ses cartes le plus vite possible, en posant des cartes égales ou supérieures. Ce sont deux mécaniques très différentes.</p><table><tr><th></th><th>Coinche</th><th>Président</th></tr><tr><td>Type</td><td>jeu de plis</td><td>jeu de défausse</td></tr><tr><td>Joueurs</td><td>4 (2 équipes)</td><td>3 à 7 environ</td></tr><tr><td>Équipes</td><td>oui, fixes</td><td>non, chacun pour soi</td></tr><tr><td>Enchères</td><td>oui, de 80 au capot</td><td>non</td></tr></table>",
        },
        {
          h2: "Ambiance et stratégie",
          html: "<p>Le président brille en grand groupe, par sa rapidité et son côté social, avec ses rangs de président et de trou du cul. La coinche, plus posée, récompense la mémoire, le calcul des enchères et la <strong>complicité avec son partenaire</strong>. L'une détend, l'autre fait réfléchir, sans qu'aucune ne vaille moins que l'autre.</p>",
        },
        {
          h2: "Durée et rythme",
          html: "<p>Le président se joue en manches courtes qui s'enchaînent, idéales pour des parties improvisées où des joueurs entrent et sortent. La coinche se déroule en une suite de donnes jusqu'à un score cible (souvent 1000 ou 1500 points), ce qui crée un arc de partie plus long et un suspense qui monte. Si tu as peu de temps, le président rend service ; si tu veux une vraie partie qui se construit, la coinche est plus satisfaisante.</p>",
        },
        {
          h2: "Quand choisir l'un ou l'autre ?",
          html: "<p>Pour une soirée nombreuse et légère, le président est parfait : on rit, on change de rang, on rejoue vite. Pour une partie à quatre où l'on veut du défi et de la stratégie en duo, la coinche est toute indiquée. Beaucoup de joueurs apprécient d'avoir les deux dans leur répertoire, l'un pour décompresser, l'autre pour se concentrer.</p>",
        },
      ],
      faq: [
        { q: "Le président est-il un jeu de plis comme la coinche ?", a: "Non. Le président est un jeu de défausse où l'on cherche à se débarrasser de ses cartes, alors que la coinche est un jeu de plis en équipe." },
        { q: "Combien de joueurs pour le président ?", a: "Le président se joue généralement de 3 à 7 joueurs, chacun pour soi, contrairement à la coinche qui se joue à 4 en deux équipes." },
      ],
      related: ["cmp-rami", "cmp-panorama-plis", "lex-capot"],
    },
    en: {
      slug: "coinche-vs-president-card-game",
      linkLabel: "Coinche vs president",
      title: "Coinche vs president: strategy or pure fun?",
      description:
        "Coinche or president? President, a fun shedding game, compared to coinche, a strategic team trick game. Two different moods.",
      h1: "Coinche vs president",
      lead: "Coinche and president answer two different urges: coinche is a <strong>strategic team trick game</strong>, president a <strong>fun, fast shedding game</strong>.",
      sections: [
        {
          h2: "Two families of games",
          html: "<p>Coinche is a <strong>trick</strong> game: each player lays a card in turn and the strongest wins the trick. President is a <strong>shedding</strong> game: the goal is to get rid of all your cards as fast as possible by playing equal or higher cards. These are very different mechanics.</p><table><tr><th></th><th>Coinche</th><th>President</th></tr><tr><td>Type</td><td>trick game</td><td>shedding game</td></tr><tr><td>Players</td><td>4 (2 teams)</td><td>about 3 to 7</td></tr><tr><td>Teams</td><td>yes, fixed</td><td>no, every player for themselves</td></tr><tr><td>Bidding</td><td>yes, 80 to capot</td><td>no</td></tr></table>",
        },
        {
          h2: "Mood and strategy",
          html: "<p>President shines in a large group, thanks to its speed and social side, with its president and scumbag ranks. Coinche, more measured, rewards memory, bidding calculation and <strong>partnership with your teammate</strong>. One relaxes, the other makes you think, without either being worth less.</p>",
        },
        {
          h2: "Length and rhythm",
          html: "<p>President is played in short back-to-back rounds, ideal for impromptu sessions where players come and go. Coinche unfolds as a series of deals up to a target score (often 1000 or 1500 points), creating a longer game arc and rising suspense. If you are short on time, president is handy; if you want a real game that builds up, coinche is more satisfying.</p>",
        },
        {
          h2: "When to pick which?",
          html: "<p>For a large, light-hearted evening, president is perfect: you laugh, swap ranks and replay quickly. For a four-player game where you want challenge and duo strategy, coinche is just right. Many players like having both in their repertoire, one to unwind, the other to focus.</p>",
        },
      ],
      faq: [
        { q: "Is president a trick game like coinche?", a: "No. President is a shedding game where you aim to get rid of your cards, while coinche is a team trick game." },
        { q: "How many players for president?", a: "President is usually played by 3 to 7 players, each for themselves, unlike coinche which is played by 4 in two teams." },
      ],
      related: ["cmp-rami", "cmp-panorama-plis", "lex-capot"],
    },
  },

  {
    id: "cmp-rami",
    priority: 0.45,
    fr: {
      slug: "coinche-vs-rami",
      linkLabel: "Coinche vs rami",
      title: "Coinche vs rami : plis contre combinaisons",
      description:
        "Coinche ou rami ? La coinche, jeu de plis en équipe, comparée au rami, jeu de combinaisons. Deux logiques de jeu de cartes opposées.",
      h1: "Coinche vs rami",
      lead: "La coinche et le rami illustrent deux grandes logiques des jeux de cartes : remporter des <strong>plis</strong> d'un côté, former des <strong>combinaisons</strong> de l'autre.",
      sections: [
        {
          h2: "Deux objectifs opposés",
          html: "<p>À la coinche, on cherche à remporter des <strong>plis</strong> valant des points, en équipe, avec un atout annoncé aux enchères. Au rami, on cherche à former des <strong>suites et des brelans</strong> en piochant et défaussant, pour « poser » ses combinaisons et vider sa main. Les deux mécaniques n'ont presque rien en commun.</p><table><tr><th></th><th>Coinche</th><th>Rami</th></tr><tr><td>But</td><td>remporter des plis</td><td>former des combinaisons</td></tr><tr><td>Équipes</td><td>oui (2v2)</td><td>généralement chacun pour soi</td></tr><tr><td>Atout</td><td>oui, aux enchères</td><td>non</td></tr><tr><td>Joueurs</td><td>4</td><td>2 à 4 selon variante</td></tr></table>",
        },
        {
          h2: "Compétences mobilisées",
          html: "<p>La coinche fait appel à l'évaluation de main pour les enchères, à la mémoire des cartes jouées et à la coordination avec son partenaire. Le rami repose davantage sur la gestion de sa propre main, la lecture de la pioche et de la défausse, et le choix du bon moment pour poser.</p>",
        },
        {
          h2: "Hasard et contrôle",
          html: "<p>Le rami laisse une part au hasard de la pioche, ce qui le rend accessible et imprévisible : une bonne pioche peut sauver une main difficile. La coinche, une fois les cartes distribuées, ne dépend plus que des décisions des joueurs : l'enchère, le choix de l'atout et l'ordre dans lequel on joue ses cartes. Cette part de contrôle plus grande attire ceux qui aiment sentir que leurs choix font la différence.</p>",
        },
        {
          h2: "Quelle envie ?",
          html: "<p>Le rami est souple en nombre de joueurs et détendu, parfait pour discuter en jouant. La coinche demande exactement quatre joueurs et offre la tension du pari, du contre et de la coordination en équipe. Ce sont deux excellents jeux pour des moments différents : le rami pour la détente, la coinche pour le défi stratégique à quatre.</p>",
        },
      ],
      faq: [
        { q: "Le rami et la coinche se jouent-ils pareil ?", a: "Non. La coinche est un jeu de plis en équipe avec atout et enchères ; le rami est un jeu de combinaisons où l'on forme des suites et des brelans." },
        { q: "Le rami se joue-t-il aussi en équipe ?", a: "Le rami se joue le plus souvent chacun pour soi, à 2 à 4 joueurs, alors que la coinche oppose deux équipes fixes de deux." },
      ],
      related: ["cmp-president", "cmp-panorama-plis", "lex-capot"],
    },
    en: {
      slug: "coinche-vs-rummy",
      linkLabel: "Coinche vs rummy",
      title: "Coinche vs rummy: tricks against melds",
      description:
        "Coinche or rummy? Coinche, a team trick game, compared to rummy, a melding game. Two opposite card-game logics.",
      h1: "Coinche vs rummy",
      lead: "Coinche and rummy illustrate two great card-game logics: winning <strong>tricks</strong> on one side, forming <strong>melds</strong> on the other.",
      sections: [
        {
          h2: "Two opposite goals",
          html: "<p>In coinche, you aim to win <strong>tricks</strong> worth points, as a team, with trump set by bidding. In rummy, you aim to form <strong>runs and sets</strong> by drawing and discarding, to lay down your melds and empty your hand. The two mechanics share almost nothing.</p><table><tr><th></th><th>Coinche</th><th>Rummy</th></tr><tr><td>Goal</td><td>win tricks</td><td>form melds</td></tr><tr><td>Teams</td><td>yes (2v2)</td><td>usually solo</td></tr><tr><td>Trump</td><td>yes, by bidding</td><td>no</td></tr><tr><td>Players</td><td>4</td><td>2 to 4 by variant</td></tr></table>",
        },
        {
          h2: "Skills involved",
          html: "<p>Coinche calls on hand evaluation for bidding, memory of played cards and coordination with your partner throughout the deal. Rummy leans more on managing your own hand, reading the draw and discard piles, and choosing the best moment to lay down your runs and sets.</p>",
        },
        {
          h2: "Luck and control",
          html: "<p>Rummy leaves room for the luck of the draw, which makes it accessible and unpredictable: a good draw can rescue a tough hand. Coinche, once the cards are dealt, depends only on the players' decisions: the bid, the choice of trump and the order in which you play your cards. This greater degree of control appeals to those who like to feel their choices make the difference rather than the luck of the pile.</p>",
        },
        {
          h2: "Which mood?",
          html: "<p>Rummy is flexible in player count and relaxed, perfect for chatting while you play. Coinche needs exactly four players and offers the tension of betting, doubling and team coordination. Both are excellent games for different moments: rummy to unwind, coinche for a strategic four-player challenge.</p>",
        },
      ],
      faq: [
        { q: "Are rummy and coinche played the same way?", a: "No. Coinche is a team trick game with trump and bidding; rummy is a melding game where you form runs and sets." },
        { q: "Is rummy also played in teams?", a: "Rummy is most often played solo, with 2 to 4 players, while coinche pits two fixed teams of two." },
      ],
      related: ["cmp-president", "cmp-panorama-plis", "lex-capot"],
    },
  },

  {
    id: "cmp-jeux-etrangers",
    priority: 0.5,
    fr: {
      slug: "coinche-vs-spades-euchre",
      linkLabel: "Coinche vs jeux de plis étrangers",
      title: "Coinche vs spades et euchre : les jeux de plis étrangers",
      description:
        "Coinche face aux jeux de plis étrangers comme spades et euchre : cartes, enchères, atout et esprit. Un comparatif honnête pour les curieux.",
      h1: "Coinche vs spades et euchre",
      lead: "Au-delà des frontières, des jeux comme le <strong>spades</strong> et l'<strong>euchre</strong> partagent l'esprit de plis en équipe de la coinche, avec leurs propres règles bien marquées.",
      sections: [
        {
          h2: "Spades : pari sur le nombre de plis",
          html: "<p>Le spades, populaire en Amérique du Nord, se joue à <strong>4 en 2 équipes</strong> avec 52 cartes. L'atout est toujours le pique (« spades »), et chaque équipe <strong>parie le nombre de plis</strong> qu'elle pense remporter. La coinche, elle, choisit l'atout aux enchères et parie un <strong>nombre de points</strong> (de 80 au capot), avec la possibilité de coincher.</p>",
        },
        {
          h2: "Euchre : un jeu vif et court",
          html: "<p>L'euchre se joue souvent à 4 en 2 équipes avec un jeu réduit (24 ou 32 cartes selon la variante) et seulement 5 plis par donne. Comme à la coinche, le valet d'atout y est une carte maîtresse (le « bower »). Mais l'euchre est plus rapide et ses enchères plus simples.</p><table><tr><th></th><th>Coinche</th><th>Spades</th><th>Euchre</th></tr><tr><td>Cartes</td><td>32</td><td>52</td><td>24 à 32</td></tr><tr><td>Atout</td><td>annoncé</td><td>toujours pique</td><td>choisi (court)</td></tr><tr><td>On parie</td><td>des points</td><td>des plis</td><td>de faire le contrat</td></tr></table>",
        },
        {
          h2: "Ce qui voyage d'un jeu à l'autre",
          html: "<p>Si tu connais la coinche, tu retrouveras vite tes marques au spades ou à l'euchre : suivre la couleur demandée, couper avec l'atout, garder une carte maître pour le bon moment et communiquer avec son partenaire sont des principes communs. Ce qui change, ce sont surtout les conventions d'enchères et la valeur exacte des cartes. Apprendre un jeu de plis étranger devient donc plus facile une fois la coinche maîtrisée, et inversement.</p>",
        },
        {
          h2: "Un air de famille",
          html: "<p>Ces jeux confirment que le plaisir du <strong>jeu de plis en équipe</strong> est universel. La coinche se distingue par ses enchères en points de 80 au capot et son mécanisme de coinche/surcoinche, hérités de la tradition belote et bridge. Là où le spades fixe l'atout et l'euchre va à l'essentiel, la coinche mise sur la richesse du dialogue d'enchères et la possibilité de défier l'adversaire.</p>",
        },
      ],
      faq: [
        { q: "Le spades ressemble-t-il à la coinche ?", a: "Les deux sont des jeux de plis à 4 en deux équipes. Mais au spades l'atout est toujours le pique et l'on parie un nombre de plis, tandis qu'à la coinche on choisit l'atout et on parie des points." },
        { q: "Le valet d'atout est-il fort à l'euchre comme à la coinche ?", a: "Oui, le valet d'atout (le bower) est une carte maîtresse à l'euchre, comme le valet d'atout l'est à la coinche." },
      ],
      related: ["cmp-whist", "cmp-bridge", "cmp-panorama-plis"],
    },
    en: {
      slug: "coinche-vs-spades-euchre-games",
      linkLabel: "Coinche vs spades and euchre",
      title: "Coinche vs spades and euchre: foreign trick games",
      description:
        "Coinche against foreign trick games like spades and euchre: cards, bidding, trump and spirit. An honest comparison for the curious.",
      h1: "Coinche vs spades and euchre",
      lead: "Beyond France, games like <strong>spades</strong> and <strong>euchre</strong> share coinche's team trick-taking spirit, each with their own distinctive rules.",
      sections: [
        {
          h2: "Spades: betting on trick count",
          html: "<p>Spades, popular in North America, is played by <strong>4 in 2 teams</strong> with 52 cards. Trump is always spades, and each team <strong>bets the number of tricks</strong> it expects to win. Coinche, by contrast, chooses trump through bidding and bets a <strong>number of points</strong> (80 up to capot), with the option to double.</p>",
        },
        {
          h2: "Euchre: brisk and short",
          html: "<p>Euchre is often played by 4 in 2 teams with a reduced deck (24 or 32 cards depending on the variant) and only 5 tricks per deal. As in coinche, the trump jack is a top card (the \"bower\"). But euchre is faster and its bidding simpler.</p><table><tr><th></th><th>Coinche</th><th>Spades</th><th>Euchre</th></tr><tr><td>Cards</td><td>32</td><td>52</td><td>24 to 32</td></tr><tr><td>Trump</td><td>announced</td><td>always spades</td><td>chosen (short)</td></tr><tr><td>You bet</td><td>points</td><td>tricks</td><td>making the contract</td></tr></table>",
        },
        {
          h2: "What carries from one game to another",
          html: "<p>If you know coinche, you will quickly find your bearings in spades or euchre: following the led suit, ruffing with trump, keeping a master card for the right moment and communicating with your partner are shared principles. What changes is mostly the bidding conventions and the exact card values. Learning a foreign trick game thus becomes easier once you master coinche, and the other way around too.</p>",
        },
        {
          h2: "A family resemblance",
          html: "<p>These games confirm that the joy of the <strong>team trick game</strong> is universal. Coinche stands out with its point bidding from 80 to capot and its coinche/surcoinche mechanism, inherited from the belote and bridge tradition. Where spades fixes the trump and euchre keeps things lean, coinche bets on the richness of the bidding dialogue and the option to challenge the opponent.</p>",
        },
      ],
      faq: [
        { q: "Does spades resemble coinche?", a: "Both are 4-player trick games in two teams. But in spades trump is always spades and you bet a number of tricks, whereas in coinche you choose trump and bet points." },
        { q: "Is the trump jack strong in euchre as in coinche?", a: "Yes, the trump jack (the bower) is a top card in euchre, just as the trump jack is in coinche." },
      ],
      related: ["cmp-whist", "cmp-bridge", "cmp-panorama-plis"],
    },
  },
];
