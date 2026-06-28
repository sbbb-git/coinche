// Catégorie : Belote & valeurs des cartes (mots-clés "belote", gros volume).
// Angle honnête : les valeurs et l'ordre des cartes sont IDENTIQUES entre belote
// et coinche (la coinche est une belote contrée). On sert ces requêtes
// légitimement en expliquant le lien et en renvoyant vers les pages coinche.

export const category = { fr: "Belote & valeurs des cartes", en: "Belote & card values" };

export default [
  {
    id: "bel-valeur-cartes",
    priority: 0.7,
    fr: {
      slug: "valeur-des-cartes-belote",
      linkLabel: "Valeur des cartes (belote)",
      title: "Valeur des cartes à la belote (et à la coinche)",
      h1: "La valeur des cartes à la belote",
      description:
        "Valeur des cartes à la belote : tableau complet à l'atout (Valet 20, 9 vaut 14, As 11) et hors atout. Des valeurs strictement identiques à la coinche.",
      lead: "À la belote, chaque carte a une <strong>valeur en points</strong> qui change selon qu'elle est <strong>atout</strong> ou non. Bonne nouvelle : ces valeurs sont <strong>identiques à la coinche</strong>.",
      sections: [
        {
          h2: "Pourquoi deux barèmes ?",
          html: "<p>Une carte ne vaut pas la même chose si sa couleur est <strong>l'atout</strong> ou non. À l'atout, le Valet et le 9 deviennent les cartes reines ; hors atout, c'est l'As qui domine. Il faut donc connaître les <strong>deux tableaux</strong>. C'est la première chose à mémoriser quand on apprend la belote, car tout le comptage et toute la stratégie en découlent.</p><p>Le jeu compte 32 cartes (du 7 à l'As, dans quatre couleurs). Sur ces 32 cartes, seules huit deviennent atout à chaque donne : ce sont elles qui changent de valeur. Les 24 autres gardent le barème « couleur ». Garde bien cette logique en tête : une carte n'est forte que par rapport au contexte de la donne.</p>",
        },
        {
          h2: "Valeurs à l'atout",
          html: "<table><tr><th>Carte</th><th>Points</th></tr><tr><td><strong>Valet</strong></td><td>20</td></tr><tr><td><strong>9</strong></td><td>14</td></tr><tr><td>As</td><td>11</td></tr><tr><td>10</td><td>10</td></tr><tr><td>Roi</td><td>4</td></tr><tr><td>Dame</td><td>3</td></tr><tr><td>8</td><td>0</td></tr><tr><td>7</td><td>0</td></tr></table><p>À l'atout, le Valet (20) et le 9 (14) prennent l'ascendant : ce sont eux qu'il faut surveiller.</p>",
        },
        {
          h2: "Valeurs hors atout (couleur)",
          html: "<table><tr><th>Carte</th><th>Points</th></tr><tr><td><strong>As</strong></td><td>11</td></tr><tr><td>10</td><td>10</td></tr><tr><td>Roi</td><td>4</td></tr><tr><td>Dame</td><td>3</td></tr><tr><td>Valet</td><td>2</td></tr><tr><td>9</td><td>0</td></tr><tr><td>8</td><td>0</td></tr><tr><td>7</td><td>0</td></tr></table><p>Hors atout, le Valet retombe à 2 points et le 9 ne vaut plus rien : leur force est liée à l'atout.</p>",
        },
        {
          h2: "Belote et coinche : mêmes valeurs",
          html: "<p>La coinche (ou belote contrée) utilise <strong>exactement le même barème</strong>. Si tu connais les valeurs de la belote, tu connais celles de la coinche. Pour aller plus loin avec des exemples chiffrés, vois notre page <a href=\"/valeur-cartes-coinche.html\">valeur des cartes à la coinche</a>.</p>",
        },
      ],
      faq: [
        { q: "Combien vaut le Valet d'atout à la belote ?", a: "Le Valet d'atout vaut 20 points, c'est la carte la plus chère du jeu. Hors atout, le Valet ne vaut plus que 2 points." },
        { q: "Le 9 vaut combien à la belote ?", a: "Le 9 d'atout vaut 14 points (c'est la deuxième carte la plus forte). Hors atout, le 9 vaut 0 point." },
        { q: "Les valeurs sont-elles les mêmes à la coinche ?", a: "Oui, strictement les mêmes. La coinche est une belote contrée : le barème des cartes ne change pas." },
      ],
      related: ["bel-compter-points", "bel-ordre-cartes", "lex-dix-de-der", "prat-valeurs-tableau", "deb-compter-points", "bc-pilier", "cmp-belote-classique"],
    },
    en: {
      slug: "belote-card-values",
      linkLabel: "Belote card values",
      title: "Belote card values (and coinche)",
      h1: "Card values in belote",
      description:
        "Belote card values: full table for trump (Jack 20, 9 worth 14, Ace 11) and non-trump. The exact same values as coinche.",
      lead: "In belote, every card has a <strong>point value</strong> that changes depending on whether it is <strong>trump</strong> or not. Good news: these values are <strong>identical to coinche</strong>.",
      sections: [
        {
          h2: "Why two scales?",
          html: "<p>A card is not worth the same if its suit is <strong>trump</strong> or not. In trump, the Jack and the 9 become the top cards; outside trump, the Ace rules. So you need both <strong>tables</strong>. This is the first thing to learn in belote, because all the scoring and all the strategy flow from it.</p><p>The deck has 32 cards (7 to Ace, in four suits). Of those 32, only eight become trump each deal: those are the ones that change value. The other 24 keep the plain-suit scale. Keep this logic in mind: a card is only strong relative to the context of the deal.</p>",
        },
        {
          h2: "Trump values",
          html: "<table><tr><th>Card</th><th>Points</th></tr><tr><td><strong>Jack</strong></td><td>20</td></tr><tr><td><strong>9</strong></td><td>14</td></tr><tr><td>Ace</td><td>11</td></tr><tr><td>10</td><td>10</td></tr><tr><td>King</td><td>4</td></tr><tr><td>Queen</td><td>3</td></tr><tr><td>8</td><td>0</td></tr><tr><td>7</td><td>0</td></tr></table><p>In trump, the Jack (20) and the 9 (14) take over: these are the cards to watch.</p>",
        },
        {
          h2: "Non-trump (plain suit) values",
          html: "<table><tr><th>Card</th><th>Points</th></tr><tr><td><strong>Ace</strong></td><td>11</td></tr><tr><td>10</td><td>10</td></tr><tr><td>King</td><td>4</td></tr><tr><td>Queen</td><td>3</td></tr><tr><td>Jack</td><td>2</td></tr><tr><td>9</td><td>0</td></tr><tr><td>8</td><td>0</td></tr><tr><td>7</td><td>0</td></tr></table><p>Outside trump, the Jack drops to 2 points and the 9 is worthless: their strength is tied to trump.</p>",
        },
        {
          h2: "Belote and coinche: same values",
          html: "<p>Coinche (or contract belote) uses <strong>exactly the same scale</strong>. If you know belote values, you know coinche values. For worked examples, see our <a href=\"/en/coinche-card-values-table.html\">coinche card values</a> page.</p>",
        },
      ],
      faq: [
        { q: "How much is the trump Jack worth in belote?", a: "The trump Jack is worth 20 points, the highest card in the game. Outside trump, the Jack is only worth 2 points." },
        { q: "How much is the 9 worth in belote?", a: "The trump 9 is worth 14 points (the second strongest card). Outside trump, the 9 is worth 0." },
        { q: "Are the values the same in coinche?", a: "Yes, exactly the same. Coinche is contract belote: the card scale does not change." },
      ],
      related: ["bel-compter-points", "bel-ordre-cartes", "lex-dix-de-der", "prat-valeurs-tableau", "deb-compter-points", "bc-pilier", "cmp-belote-classique"],
    },
  },

  {
    id: "bel-compter-points",
    priority: 0.65,
    fr: {
      slug: "compter-les-points-belote",
      linkLabel: "Compter les points (belote)",
      title: "Compter les points à la belote : 152 + 10 de der = 162",
      h1: "Compter les points à la belote",
      description:
        "Compter les points à la belote : 152 points dans les cartes plus 10 de der, soit 162 par donne. Plus la belote (Roi + Dame d'atout) qui vaut 20.",
      lead: "Une donne de belote totalise <strong>162 points</strong> : <strong>152 dans les cartes</strong> et <strong>10 de der</strong> pour le dernier pli. Le même compte qu'à la coinche.",
      sections: [
        {
          h2: "Le total d'une donne",
          html: "<p>Si tu additionnes la valeur de toutes les cartes (atout + couleurs), tu obtiens <strong>152 points</strong>. On ajoute ensuite <strong>10 points « de der »</strong> (pour <em>dernier</em>) à l'équipe qui remporte le dernier pli. Total : <strong>162 points</strong> à se partager chaque donne.</p>",
        },
        {
          h2: "La belote : 20 points en plus",
          html: "<p>Si tu détiens le <strong>Roi et la Dame d'atout</strong>, tu annonces « belote » en jouant la première des deux, puis « rebelote » en jouant la seconde : cela rapporte <strong>20 points bonus</strong>. Ces 20 points s'ajoutent au décompte de la donne et restent acquis même si ton équipe perd la donne. C'est l'origine du nom du jeu.</p><p>Attention : il faut bien <strong>annoncer</strong> belote et rebelote au moment de poser les cartes. Si tu oublies de le dire, la plupart des tables refusent les 20 points. C'est une source de litiges fréquente entre joueurs.</p>",
        },
        {
          h2: "Compter vite en jouant",
          html: "<ul><li>Repère les grosses cartes : Valet d'atout (20), 9 d'atout (14), les As (11) et les 10 (10).</li><li>Le reste (Rois 4, Dames 3) complète le total.</li><li>N'oublie pas les 10 de der à la fin, ils renversent souvent une donne serrée.</li></ul><p>Pour t'entraîner au comptage avec un contrat à tenir, vois <a href=\"/compter-points-coinche.html\">compter les points à la coinche</a>.</p>",
        },
      ],
      faq: [
        { q: "Combien de points dans une donne de belote ?", a: "152 points dans les cartes plus 10 de der pour le dernier pli, soit 162 points au total par donne." },
        { q: "Combien vaut la belote (Roi + Dame d'atout) ?", a: "La belote-rebelote vaut 20 points bonus, attribués à l'équipe qui possède le Roi et la Dame d'atout et les annonce en les jouant." },
        { q: "Le comptage est-il le même à la coinche ?", a: "Oui : 152 + 10 de der = 162, et la belote vaut 20. La coinche ajoute seulement la couche des enchères et du contrat." },
      ],
      related: ["bel-valeur-cartes", "lex-dix-de-der", "deb-compter-points", "prat-compter-rapide", "reg-belote-oubliee", "bc-pilier"],
    },
    en: {
      slug: "scoring-points-belote",
      linkLabel: "Scoring belote points",
      title: "Scoring points in belote: 152 + 10 last trick = 162",
      h1: "Scoring points in belote",
      description:
        "Scoring belote points: 152 points in the cards plus 10 for the last trick, so 162 per deal. Plus belote (trump King + Queen) worth 20.",
      lead: "A belote deal totals <strong>162 points</strong>: <strong>152 in the cards</strong> and <strong>10 for the last trick</strong>. The same count as coinche.",
      sections: [
        {
          h2: "The deal total",
          html: "<p>Add up the value of every card (trump and plain suits) and you get <strong>152 points</strong>. You then add <strong>10 points for the last trick</strong> (the “der”, from <em>dernier</em>) to the team that wins it. Total: <strong>162 points</strong> to split each deal.</p>",
        },
        {
          h2: "Belote: 20 extra points",
          html: "<p>If you hold the <strong>trump King and Queen</strong>, you call “belote” as you play the first of the two, then “rebelote” on the second: that is <strong>20 bonus points</strong>. They add to the deal total and you keep them even if your team loses the deal. This is where the game gets its name.</p><p>Careful: you must actually <strong>call</strong> belote and rebelote as you lay the cards. Forget to say it and most tables refuse the 20 points. It is a frequent source of disputes between players.</p>",
        },
        {
          h2: "Counting fast while playing",
          html: "<ul><li>Spot the big cards: trump Jack (20), trump 9 (14), Aces (11) and 10s (10).</li><li>The rest (Kings 4, Queens 3) fills the total.</li><li>Never forget the 10 last-trick points, they often flip a close deal.</li></ul><p>To practise counting with a contract to make, see <a href=\"/en/count-deal-points-fast.html\">counting deal points fast</a>.</p>",
        },
      ],
      faq: [
        { q: "How many points are in a belote deal?", a: "152 points in the cards plus 10 for the last trick, so 162 points total per deal." },
        { q: "How much is belote (trump King + Queen) worth?", a: "Belote-rebelote is worth 20 bonus points, awarded to the team holding the trump King and Queen and calling them as they are played." },
        { q: "Is scoring the same in coinche?", a: "Yes: 152 + 10 last trick = 162, and belote is worth 20. Coinche only adds the bidding and contract layer." },
      ],
      related: ["bel-valeur-cartes", "lex-dix-de-der", "deb-compter-points", "prat-compter-rapide", "reg-belote-oubliee", "bc-pilier"],
    },
  },

  {
    id: "bel-regles",
    priority: 0.6,
    fr: {
      slug: "regles-belote",
      linkLabel: "Règles de la belote",
      title: "Règles de la belote : l'essentiel (et la différence avec la coinche)",
      h1: "Les règles de la belote : l'essentiel",
      description:
        "Règles de la belote classique : distribution, atout retourné, prendre ou passer, comment jouer les plis. Plus la différence clé avec la coinche.",
      lead: "La belote se joue à <strong>4 joueurs en deux équipes</strong>, avec 32 cartes. Voici l'essentiel des règles, puis ce qui la distingue de la <strong>coinche</strong>.",
      sections: [
        {
          h2: "Le déroulé d'une donne",
          html: "<p>On distribue les 32 cartes, on retourne une carte qui propose l'<strong>atout</strong>. Chacun son tour, on choisit de <strong>prendre</strong> (accepter cet atout) ou de <strong>passer</strong>. Si tout le monde passe au premier tour, un second tour permet de prendre dans une autre couleur. Le preneur joue ensuite pour faire <strong>plus de la moitié des points</strong> de la donne.</p>",
        },
        {
          h2: "Comment se jouent les plis",
          html: "<ul><li>On doit <strong>fournir la couleur</strong> demandée si on en a.</li><li>Sans cette couleur, on doit en général <strong>couper</strong> à l'atout (et monter sur un atout déjà posé).</li><li>Le pli revient à la plus forte carte de la couleur d'entame, ou au plus fort atout s'il y a eu coupe.</li></ul>",
        },
        {
          h2: "La différence avec la coinche",
          html: "<p>La belote « classique » s'arrête au choix prendre/passer sur l'atout retourné. La <strong>coinche (belote contrée)</strong> remplace ça par de vraies <strong>enchères chiffrées</strong> (80, 90, 100... jusqu'au capot) et ajoute la possibilité de <strong>contrer (coincher)</strong> l'adversaire. Les cartes, leur ordre et leurs valeurs, eux, ne changent pas.</p><p>Pour comparer en détail, vois <a href=\"/coinche-vs-contree.html\">coinche, contrée et belote</a> et <a href=\"/regles-coinche.html\">les règles de la coinche</a>.</p>",
        },
      ],
      faq: [
        { q: "Comment se choisit l'atout à la belote classique ?", a: "On retourne une carte ; chacun son tour peut prendre cette couleur comme atout ou passer. Si tous passent, un second tour permet de choisir une autre couleur." },
        { q: "Quelle est la différence entre belote et coinche ?", a: "La coinche remplace le simple prendre/passer par des enchères chiffrées (80 au capot) et permet de contrer l'adversaire. Le jeu de cartes, lui, est identique." },
        { q: "La belote se joue à combien ?", a: "La belote classique se joue à 4 joueurs en deux équipes de deux, partenaires assis face à face." },
      ],
      related: ["bel-belote-a-4", "bel-ordre-cartes", "bel-points-gagner", "cmp-belote-classique", "deb-regles-simplifiees", "bc-vs-belote", "reg-tous-passent"],
    },
    en: {
      slug: "belote-rules",
      linkLabel: "Belote rules",
      title: "Belote rules: the essentials (and how coinche differs)",
      h1: "Belote rules: the essentials",
      description:
        "Classic belote rules: dealing, the turned-up trump, take or pass, how tricks are played. Plus the key difference with coinche.",
      lead: "Belote is played by <strong>4 players in two teams</strong>, with 32 cards. Here are the essential rules, then what sets it apart from <strong>coinche</strong>.",
      sections: [
        {
          h2: "How a deal unfolds",
          html: "<p>The 32 cards are dealt and one card is turned up to propose the <strong>trump</strong>. In turn, each player chooses to <strong>take</strong> (accept that trump) or <strong>pass</strong>. If everyone passes on the first round, a second round lets a player take in another suit. The taker then plays to win <strong>more than half the points</strong> of the deal.</p>",
        },
        {
          h2: "How tricks are played",
          html: "<ul><li>You must <strong>follow suit</strong> if you can.</li><li>Without that suit, you generally must <strong>ruff</strong> with trump (and overtrump an already-played trump).</li><li>The trick goes to the highest card of the led suit, or the highest trump if it was ruffed.</li></ul>",
        },
        {
          h2: "The difference with coinche",
          html: "<p>Classic belote stops at the take/pass choice on the turned-up trump. <strong>Coinche (contract belote)</strong> replaces this with real <strong>numbered bidding</strong> (80, 90, 100... up to capot) and adds the option to <strong>double (coincher)</strong> the opponent. The cards, their order and their values do not change.</p><p>To compare in detail, see <a href=\"/en/coinche-vs-classic-belote.html\">coinche vs classic belote</a> and <a href=\"/en/simplified-coinche-rules.html\">the coinche rules</a>.</p>",
        },
      ],
      faq: [
        { q: "How is trump chosen in classic belote?", a: "A card is turned up; in turn each player can take that suit as trump or pass. If all pass, a second round lets a player choose another suit." },
        { q: "What is the difference between belote and coinche?", a: "Coinche replaces the simple take/pass with numbered bidding (80 up to capot) and lets you double the opponent. The card game itself is identical." },
        { q: "How many players for belote?", a: "Classic belote is played by 4 players in two teams of two, partners sitting opposite each other." },
      ],
      related: ["bel-belote-a-4", "bel-ordre-cartes", "bel-points-gagner", "cmp-belote-classique", "deb-regles-simplifiees", "bc-vs-belote", "reg-tous-passent"],
    },
  },

  {
    id: "bel-ordre-cartes",
    priority: 0.6,
    fr: {
      slug: "ordre-des-cartes-belote",
      linkLabel: "Ordre des cartes (belote)",
      title: "Ordre des cartes à la belote : de la plus forte à la plus faible",
      h1: "L'ordre des cartes à la belote",
      description:
        "Ordre des cartes à la belote : à l'atout Valet > 9 > As > 10 > Roi > Dame > 8 > 7, hors atout As > 10 > Roi > Dame > Valet > 9 > 8 > 7. Identique à la coinche.",
      lead: "À la belote, l'ordre de force des cartes <strong>change selon l'atout</strong>. Deux classements à connaître, exactement les mêmes qu'à la coinche.",
      sections: [
        {
          h2: "Ordre à l'atout",
          html: "<p>À l'atout, du plus fort au plus faible :</p><table><tr><th>Rang</th><th>Carte</th><th>Points</th></tr><tr><td>1</td><td><strong>Valet</strong></td><td>20</td></tr><tr><td>2</td><td><strong>9</strong></td><td>14</td></tr><tr><td>3</td><td>As</td><td>11</td></tr><tr><td>4</td><td>10</td><td>10</td></tr><tr><td>5</td><td>Roi</td><td>4</td></tr><tr><td>6</td><td>Dame</td><td>3</td></tr><tr><td>7</td><td>8</td><td>0</td></tr><tr><td>8</td><td>7</td><td>0</td></tr></table><p>Soit : <strong>Valet &gt; 9 &gt; As &gt; 10 &gt; Roi &gt; Dame &gt; 8 &gt; 7</strong>.</p>",
        },
        {
          h2: "Ordre hors atout",
          html: "<p>Dans une couleur ordinaire, du plus fort au plus faible :</p><table><tr><th>Rang</th><th>Carte</th><th>Points</th></tr><tr><td>1</td><td><strong>As</strong></td><td>11</td></tr><tr><td>2</td><td>10</td><td>10</td></tr><tr><td>3</td><td>Roi</td><td>4</td></tr><tr><td>4</td><td>Dame</td><td>3</td></tr><tr><td>5</td><td>Valet</td><td>2</td></tr><tr><td>6</td><td>9</td><td>0</td></tr><tr><td>7</td><td>8</td><td>0</td></tr><tr><td>8</td><td>7</td><td>0</td></tr></table><p>Soit : <strong>As &gt; 10 &gt; Roi &gt; Dame &gt; Valet &gt; 9 &gt; 8 &gt; 7</strong>.</p>",
        },
        {
          h2: "Le piège à retenir",
          html: "<p>Le Valet et le 9 « montent » à l'atout et « redescendent » hors atout. C'est la seule vraie subtilité de l'ordre, et c'est l'erreur classique du débutant : croire qu'un As bat toujours tout. Hors atout c'est vrai, mais à l'atout le petit Valet écrase l'As.</p><p>Astuce mémo : à l'atout, pense « Valet-Neuf d'abord » ; hors atout, pense « As-Dix d'abord ». Le reste (Roi, Dame) suit dans le même ordre dans les deux cas. Cet ordre est <strong>identique à la coinche</strong> : retrouve-le avec les valeurs détaillées sur <a href=\"/valeur-cartes-coinche.html\">la valeur des cartes à la coinche</a>.</p>",
        },
      ],
      faq: [
        { q: "Quelle est la carte la plus forte à la belote ?", a: "À l'atout, c'est le Valet, suivi du 9. Hors atout, c'est l'As, suivi du 10." },
        { q: "Quel est l'ordre des cartes à l'atout ?", a: "Valet, 9, As, 10, Roi, Dame, 8, 7 (du plus fort au plus faible)." },
        { q: "L'ordre est-il le même à la coinche ?", a: "Oui, exactement le même. La coinche est une belote contrée : ni l'ordre ni les valeurs ne changent." },
      ],
      related: ["bel-valeur-cartes", "bel-compter-points", "bel-regles", "prat-valeurs-tableau", "deb-memo-antiseche", "bc-pilier"],
    },
    en: {
      slug: "belote-card-order",
      linkLabel: "Belote card order",
      title: "Belote card order: strongest to weakest",
      h1: "Card order in belote",
      description:
        "Belote card order: in trump Jack > 9 > Ace > 10 > King > Queen > 8 > 7, outside trump Ace > 10 > King > Queen > Jack > 9 > 8 > 7. Same as coinche.",
      lead: "In belote, the card strength order <strong>changes with trump</strong>. Two rankings to know, exactly the same as coinche.",
      sections: [
        {
          h2: "Trump order",
          html: "<p>In trump, strongest to weakest:</p><table><tr><th>Rank</th><th>Card</th><th>Points</th></tr><tr><td>1</td><td><strong>Jack</strong></td><td>20</td></tr><tr><td>2</td><td><strong>9</strong></td><td>14</td></tr><tr><td>3</td><td>Ace</td><td>11</td></tr><tr><td>4</td><td>10</td><td>10</td></tr><tr><td>5</td><td>King</td><td>4</td></tr><tr><td>6</td><td>Queen</td><td>3</td></tr><tr><td>7</td><td>8</td><td>0</td></tr><tr><td>8</td><td>7</td><td>0</td></tr></table><p>That is: <strong>Jack &gt; 9 &gt; Ace &gt; 10 &gt; King &gt; Queen &gt; 8 &gt; 7</strong>.</p>",
        },
        {
          h2: "Non-trump order",
          html: "<p>In a plain suit, strongest to weakest:</p><table><tr><th>Rank</th><th>Card</th><th>Points</th></tr><tr><td>1</td><td><strong>Ace</strong></td><td>11</td></tr><tr><td>2</td><td>10</td><td>10</td></tr><tr><td>3</td><td>King</td><td>4</td></tr><tr><td>4</td><td>Queen</td><td>3</td></tr><tr><td>5</td><td>Jack</td><td>2</td></tr><tr><td>6</td><td>9</td><td>0</td></tr><tr><td>7</td><td>8</td><td>0</td></tr><tr><td>8</td><td>7</td><td>0</td></tr></table><p>That is: <strong>Ace &gt; 10 &gt; King &gt; Queen &gt; Jack &gt; 9 &gt; 8 &gt; 7</strong>.</p>",
        },
        {
          h2: "The trap to remember",
          html: "<p>The Jack and the 9 “rise” in trump and “fall back” outside trump. That is the only real subtlety of the order, and the classic beginner mistake: assuming the Ace always wins. Outside trump it does, but in trump the humble Jack crushes the Ace.</p><p>Memory trick: in trump think “Jack-Nine first”; outside trump think “Ace-Ten first”. The rest (King, Queen) follows the same order in both cases. This order is <strong>identical to coinche</strong>: find it with detailed values on <a href=\"/en/belote-card-values.html\">belote card values</a> or the <a href=\"/en/coinche-card-values-table.html\">coinche card values</a> page.</p>",
        },
      ],
      faq: [
        { q: "What is the strongest card in belote?", a: "In trump it is the Jack, followed by the 9. Outside trump it is the Ace, followed by the 10." },
        { q: "What is the trump card order?", a: "Jack, 9, Ace, 10, King, Queen, 8, 7 (strongest to weakest)." },
        { q: "Is the order the same in coinche?", a: "Yes, exactly the same. Coinche is contract belote: neither the order nor the values change." },
      ],
      related: ["bel-valeur-cartes", "bel-compter-points", "bel-regles", "prat-valeurs-tableau", "deb-memo-antiseche", "bc-pilier"],
    },
  },

  {
    id: "bel-points-gagner",
    priority: 0.55,
    fr: {
      slug: "combien-de-points-pour-gagner-belote",
      linkLabel: "Points pour gagner (belote)",
      title: "Combien de points pour gagner à la belote ?",
      h1: "Combien de points pour gagner une partie de belote ?",
      description:
        "Combien de points pour gagner à la belote : 501, 1000 ou 1500 selon les variantes. À la coinche, on joue souvent en 1000 ou 1500 points.",
      lead: "On ne gagne pas une donne mais une <strong>partie</strong> : il faut atteindre un <strong>total convenu</strong>. Les seuils varient selon les régions et les variantes.",
      sections: [
        {
          h2: "Les seuils courants",
          html: "<ul><li><strong>501 points</strong> : partie rapide, fréquente en belote classique.</li><li><strong>1000 points</strong> : un grand classique, bon équilibre entre durée et tension.</li><li><strong>1500 points</strong> : partie plus longue, qui laisse le temps de revenir au score.</li></ul><p>Le seuil n'est pas universel : on le fixe avant de commencer. Comme chaque donne vaut 162 points (plus bonus), une partie en 1000 dure environ une dizaine de donnes.</p>",
        },
        {
          h2: "Et à la coinche ?",
          html: "<p>À la coinche, on joue le plus souvent en <strong>1000 ou 1500 points</strong>. La différence n'est pas le seuil mais la façon de marquer : on inscrit les points du <strong>contrat annoncé</strong> (et les pénalités de chute), pas seulement les plis ramassés. Voir <a href=\"/coinche-partie-courte-1000-1500.html\">la partie courte en 1000/1500</a> et <a href=\"/regles-coinche.html\">les règles de la coinche</a>.</p>",
        },
        {
          h2: "Choisir le bon format",
          html: "<p>Pour une partie d'apprentissage, vise 501 : tu boucles vite et tu enchaînes les donnes pour t'exercer. Pour une vraie soirée entre amis, 1000 ou 1500 récompensent la régularité plutôt qu'un coup de chance ponctuel, et laissent à l'équipe menée le temps de refaire son retard. Quel que soit le seuil, mets-toi d'accord <strong>avant la première donne</strong> : changer de format en cours de partie est la meilleure façon de se disputer.</p>",
        },
      ],
      faq: [
        { q: "Combien de points faut-il pour gagner à la belote ?", a: "Selon les variantes, 501, 1000 ou 1500 points. Le seuil se convient avant la partie." },
        { q: "Et pour gagner à la coinche ?", a: "Le plus souvent 1000 ou 1500 points. La coinche compte les points du contrat annoncé, pas seulement les plis." },
        { q: "Combien de donnes pour une partie en 1000 ?", a: "Environ une dizaine de donnes, puisque chaque donne vaut 162 points (plus les éventuels bonus de belote et de der)." },
      ],
      related: ["bel-compter-points", "bel-regles", "var-partie-courte", "prat-feuille-score", "bel-belote-a-4", "deb-compter-points"],
    },
    en: {
      slug: "points-to-win-belote",
      linkLabel: "Points to win (belote)",
      title: "How many points to win at belote?",
      h1: "How many points to win a belote game?",
      description:
        "How many points to win at belote: 501, 1000 or 1500 depending on the variant. In coinche, games often run to 1000 or 1500 points.",
      lead: "You do not win a deal but a <strong>game</strong>: you must reach an <strong>agreed total</strong>. Thresholds vary by region and variant.",
      sections: [
        {
          h2: "Common thresholds",
          html: "<ul><li><strong>501 points</strong>: a fast game, common in classic belote.</li><li><strong>1000 points</strong>: a great classic, a good balance of length and tension.</li><li><strong>1500 points</strong>: a longer game that leaves time to come back.</li></ul><p>The threshold is not universal: set it before you start. Since each deal is worth 162 points (plus bonuses), a 1000-point game lasts about ten deals.</p>",
        },
        {
          h2: "What about coinche?",
          html: "<p>In coinche you usually play to <strong>1000 or 1500 points</strong>. The difference is not the threshold but how you score: you record the points of the <strong>announced contract</strong> (and failure penalties), not just the tricks collected. See <a href=\"/en/coinche-short-game-1000-1500.html\">the short 1000/1500 game</a> and the <a href=\"/en/simplified-coinche-rules.html\">coinche rules</a>.</p>",
        },
        {
          h2: "Choosing the right format",
          html: "<p>For a learning game, aim for 501: you finish fast and play deal after deal to practise. For a real evening with friends, 1000 or 1500 reward consistency over a one-off lucky streak, and give the trailing team time to claw back. Whatever the threshold, agree <strong>before the first deal</strong>: changing format mid-game is the surest way to start an argument.</p>",
        },
      ],
      faq: [
        { q: "How many points to win at belote?", a: "Depending on the variant, 501, 1000 or 1500 points. The threshold is agreed before the game." },
        { q: "And to win at coinche?", a: "Most often 1000 or 1500 points. Coinche scores the announced contract, not just the tricks." },
        { q: "How many deals for a 1000-point game?", a: "About ten deals, since each deal is worth 162 points (plus any belote and last-trick bonuses)." },
      ],
      related: ["bel-compter-points", "bel-regles", "var-partie-courte", "prat-feuille-score", "bel-belote-a-4", "deb-compter-points"],
    },
  },

  {
    id: "bel-belote-a-4",
    priority: 0.55,
    fr: {
      slug: "belote-a-4-joueurs",
      linkLabel: "Belote à 4 joueurs",
      title: "La belote à 4 joueurs : belote classique vs coinche",
      h1: "La belote à 4 joueurs : classique ou coinche ?",
      description:
        "La belote à 4 joueurs : deux équipes de deux. Différence entre belote classique (atout retourné) et coinche (enchères et contre). Mêmes cartes, mêmes valeurs.",
      lead: "La belote à 4 se joue en <strong>deux équipes de deux</strong>, partenaires face à face. Reste à choisir la version : <strong>belote classique</strong> ou <strong>coinche</strong> ?",
      sections: [
        {
          h2: "La table et les équipes",
          html: "<p>Quatre joueurs, deux camps. Tu es associé au joueur <strong>assis en face de toi</strong> ; tes deux adversaires sont à ta gauche et à ta droite. On joue dans le sens des aiguilles d'une montre, et chaque équipe additionne ses points en commun.</p>",
        },
        {
          h2: "Belote classique vs coinche",
          html: "<table><tr><th></th><th>Belote classique</th><th>Coinche</th></tr><tr><td>Choix de l'atout</td><td>carte retournée, prendre/passer</td><td><strong>enchères chiffrées</strong> (80 au capot)</td></tr><tr><td>Contrat</td><td>faire plus de la moitié</td><td>tenir le contrat <strong>annoncé</strong></td></tr><tr><td>Contre</td><td>non</td><td><strong>coincher / surcoincher</strong></td></tr><tr><td>Cartes &amp; valeurs</td><td colspan=\"2\">identiques (Valet 20, 9 = 14, As 11...)</td></tr></table>",
        },
        {
          h2: "Laquelle choisir ?",
          html: "<p>La belote classique s'apprend en cinq minutes : idéale pour démarrer. La coinche ajoute la couche tactique des enchères et du contre, plus riche et plus stratégique, c'est la version « experte » de la belote à 4. Comme le jeu de cartes est le même, passer de l'une à l'autre est facile. Pour la version contrée, vois <a href=\"/belote-contree.html\">la belote contrée</a> et <a href=\"/coinche-vs-contree.html\">coinche vs contrée</a>.</p>",
        },
      ],
      faq: [
        { q: "Comment sont placés les joueurs à la belote à 4 ?", a: "En deux équipes de deux : ton partenaire est assis en face de toi, tes adversaires à ta gauche et à ta droite." },
        { q: "Belote à 4 classique ou coinche : quelle différence ?", a: "La classique choisit l'atout par carte retournée (prendre/passer). La coinche utilise des enchères chiffrées et permet de contrer. Les cartes restent identiques." },
        { q: "Peut-on jouer à la belote à un autre nombre de joueurs ?", a: "Oui, il existe des variantes à 2, 3 ou plus, mais la belote à 4 en deux équipes reste la forme de référence." },
      ],
      related: ["bel-regles", "bel-points-gagner", "bel-ordre-cartes", "bc-pilier", "bc-vs-belote", "cmp-belote-classique", "adj-cartes-4"],
    },
    en: {
      slug: "belote-4-players",
      linkLabel: "Belote 4 players",
      title: "Belote with 4 players: classic belote vs coinche",
      h1: "Belote with 4 players: classic or coinche?",
      description:
        "Belote with 4 players: two teams of two. Difference between classic belote (turned-up trump) and coinche (bidding and doubling). Same cards, same values.",
      lead: "Four-player belote is played in <strong>two teams of two</strong>, partners facing each other. The choice is the version: <strong>classic belote</strong> or <strong>coinche</strong>?",
      sections: [
        {
          h2: "The table and the teams",
          html: "<p>Four players, two sides. You partner the player <strong>sitting opposite you</strong>; your two opponents are on your left and right. Play goes clockwise, and each team pools its points.</p>",
        },
        {
          h2: "Classic belote vs coinche",
          html: "<table><tr><th></th><th>Classic belote</th><th>Coinche</th></tr><tr><td>Trump choice</td><td>turned-up card, take/pass</td><td><strong>numbered bidding</strong> (80 up to capot)</td></tr><tr><td>Contract</td><td>make more than half</td><td>make the <strong>announced</strong> contract</td></tr><tr><td>Doubling</td><td>no</td><td><strong>coincher / surcoincher</strong></td></tr><tr><td>Cards &amp; values</td><td colspan=\"2\">identical (Jack 20, 9 = 14, Ace 11...)</td></tr></table>",
        },
        {
          h2: "Which to choose?",
          html: "<p>Classic belote takes five minutes to learn: ideal to start. Coinche adds the tactical layer of bidding and doubling, richer and more strategic, the “expert” version of 4-player belote. Since the card game is the same, switching is easy. For the contract version, see <a href=\"/en/contract-belote.html\">contract belote</a> and <a href=\"/en/coinche-vs-contree.html\">coinche vs contrée</a>.</p>",
        },
      ],
      faq: [
        { q: "How are players seated in 4-player belote?", a: "In two teams of two: your partner sits opposite you, your opponents on your left and right." },
        { q: "Classic 4-player belote or coinche: what is the difference?", a: "Classic chooses trump by a turned-up card (take/pass). Coinche uses numbered bidding and lets you double. The cards stay identical." },
        { q: "Can belote be played with other numbers of players?", a: "Yes, there are 2, 3 or more player variants, but 4-player belote in two teams remains the reference form." },
      ],
      related: ["bel-regles", "bel-points-gagner", "bel-ordre-cartes", "bc-pilier", "bc-vs-belote", "cmp-belote-classique", "adj-cartes-4"],
    },
  },
];
