// Catégorie : Ressources pratiques (imprimer / pdf / mémo / règle simple)
// + noms régionaux de la coinche. Nouvelle famille de mots-clés.

export const category = { fr: "Ressources & régions", en: "Resources & regions" };

export default [
  {
    id: "res-regles-imprimer",
    priority: 0.6,
    fr: {
      slug: "regles-coinche-a-imprimer",
      linkLabel: "Règles à imprimer",
      title: "Règles de la coinche à imprimer (résumé PDF)",
      h1: "Les règles de la coinche à imprimer",
      description:
        "Résumé complet des règles de la coinche à imprimer ou enregistrer en PDF : mise en place, enchères, jeu et comptage. Ctrl/Cmd+P pour imprimer.",
      lead: "Voici un résumé <strong>complet et compact</strong> des règles de la coinche, pensé pour être imprimé. Pour le garder sous la main : utilise <strong>Ctrl/Cmd+P</strong> pour imprimer ou enregistrer en PDF.",
      sections: [
        {
          h2: "Mise en place",
          html: "<p>La coinche se joue à <strong>4 joueurs</strong> en 2 équipes (partenaires face à face), avec un jeu de <strong>32 cartes</strong>. On distribue 8 cartes par joueur, en général en paquets de 3, puis 2, puis 3. Le donneur change à chaque donne, dans le sens des aiguilles d'une montre.</p>",
        },
        {
          h2: "Les enchères",
          html: "<p>Chaque joueur, à son tour, annonce un <strong>contrat</strong> (un nombre de points à réaliser et un atout) ou passe. Les annonces vont de <strong>80</strong> au <strong>capot</strong>, par paliers de 10. Si un adversaire pense que le contrat ne passera pas, il <strong>coinche</strong> (×2) ; le camp qui prend peut <strong>surcoincher</strong> (×4). Le détail figure sur la page <a href=\"/regles-coinche.html\">règles de la coinche</a>.</p>",
        },
        {
          h2: "Le déroulement du jeu",
          html: "<p>Le joueur à gauche du donneur entame. Chacun doit <strong>fournir</strong> la couleur demandée s'il le peut. À l'atout, on est tenu de <strong>monter</strong> si on coupe après un partenaire déjà coupé par l'adversaire. Le pli revient à la plus forte carte (atout s'il y en a). La main suit le gagnant du pli.</p>",
        },
        {
          h2: "Le comptage",
          html: "<p>Une donne vaut <strong>162 points</strong> (152 dans les cartes + <strong>10 de der</strong> pour le dernier pli). La <strong>belote</strong> (Roi + Dame d'atout dans la même main) ajoute <strong>20 points</strong>. Le contrat est réussi si le camp preneur atteint son annonce ; sinon il <strong>chute</strong> et les points vont à la défense. Voir <a href=\"/compter-points-coinche.html\">compter les points</a>.</p><table><tr><th>Élément</th><th>Points</th></tr><tr><td>Total d'une donne</td><td>162</td></tr><tr><td>Belote (R+D atout)</td><td>+20</td></tr><tr><td>Capot</td><td>250</td></tr><tr><td>Coinche / surcoinche</td><td>×2 / ×4</td></tr></table>",
        },
        {
          h2: "Garde ce mémo",
          html: "<p>Pour conserver cette fiche : ouvre la fenêtre d'impression avec <strong>Ctrl+P</strong> (Windows/Linux) ou <strong>Cmd+P</strong> (Mac), puis choisis ton imprimante ou « Enregistrer au format PDF ». Tu peux aussi <a href=\"/\">jouer une partie</a> pour mettre les règles en pratique tout de suite.</p>",
        },
      ],
      faq: [
        { q: "Comment imprimer ou enregistrer ces règles en PDF ?", a: "Ouvre la fenêtre d'impression avec Ctrl+P (Windows/Linux) ou Cmd+P (Mac), puis choisis ton imprimante ou l'option « Enregistrer au format PDF »." },
        { q: "Combien de points fait une donne ?", a: "Une donne vaut 162 points : 152 dans les cartes plus 10 de der pour le dernier pli. La belote ajoute 20 points." },
        { q: "Que veut dire coincher ?", a: "Coincher, c'est annoncer qu'on pense que le contrat adverse ne passera pas. Les points sont alors doublés (×2), et le camp preneur peut surcoincher (×4)." },
      ],
      related: ["pil-strategie", "deb-regles-simplifiees", "prat-valeurs-tableau", "reg-fournir-couleur", "lex-dix-de-der", "res-aide-memoire", "res-regle-simple"],
    },
    en: {
      slug: "printable-coinche-rules",
      linkLabel: "Printable rules",
      title: "Printable coinche rules (PDF summary)",
      h1: "Printable coinche rules",
      description:
        "A complete summary of coinche rules to print or save as PDF: setup, bidding, play and scoring. Use Ctrl/Cmd+P to print or save.",
      lead: "Here is a <strong>complete, compact</strong> summary of the rules of coinche, made to be printed. To keep it handy, use <strong>Ctrl/Cmd+P</strong> to print or save it as a PDF.",
      sections: [
        {
          h2: "Setup",
          html: "<p>Coinche is played by <strong>4 players</strong> in 2 teams (partners sit opposite), with a <strong>32-card</strong> deck. Each player gets 8 cards, usually dealt in packets of 3, then 2, then 3. The deal rotates clockwise every hand.</p>",
        },
        {
          h2: "The bidding",
          html: "<p>In turn, each player either announces a <strong>contract</strong> (a points target and a trump suit) or passes. Bids run from <strong>80</strong> up to <strong>capot</strong>, in steps of 10. If an opponent thinks the contract will fail, they <strong>coinche</strong> (double, ×2); the declaring side may <strong>surcoinche</strong> (redouble, ×4). See the full <a href=\"/regles-coinche.html\">coinche rules</a>.</p>",
        },
        {
          h2: "Playing the hand",
          html: "<p>The player to the dealer's left leads. Everyone must <strong>follow suit</strong> if able. At trumps, you must <strong>overruff</strong> when ruffing after a partner already beaten by an opponent. The trick goes to the highest card (a trump if any was played). The trick winner leads next.</p>",
        },
        {
          h2: "Scoring",
          html: "<p>A deal is worth <strong>162 points</strong> (152 in the cards + the <strong>10 de der</strong> for the last trick). A <strong>belote</strong> (King + Queen of trumps in one hand) adds <strong>20 points</strong>. The contract is made if the declaring side reaches its bid; otherwise it <strong>fails</strong> and the points go to the defence. See <a href=\"/compter-points-coinche.html\">counting points</a>.</p><table><tr><th>Item</th><th>Points</th></tr><tr><td>Total of one deal</td><td>162</td></tr><tr><td>Belote (K+Q of trumps)</td><td>+20</td></tr><tr><td>Capot</td><td>250</td></tr><tr><td>Coinche / surcoinche</td><td>×2 / ×4</td></tr></table>",
        },
        {
          h2: "Keep this cheat sheet",
          html: "<p>To save this sheet, open the print dialog with <strong>Ctrl+P</strong> (Windows/Linux) or <strong>Cmd+P</strong> (Mac), then pick your printer or choose \"Save as PDF.\" You can also <a href=\"/\">play a hand</a> to put the rules into practice right away.</p>",
        },
      ],
      faq: [
        { q: "How do I print or save these rules as a PDF?", a: "Open the print dialog with Ctrl+P (Windows/Linux) or Cmd+P (Mac), then choose your printer or the \"Save as PDF\" option." },
        { q: "How many points is a deal worth?", a: "A deal is worth 162 points: 152 in the cards plus 10 de der for the last trick. A belote adds 20 points." },
        { q: "What does coinche mean?", a: "To coinche is to declare that you think the opponents' contract will fail. The points are then doubled (×2), and the declaring side can redouble (surcoinche, ×4)." },
      ],
      related: ["pil-strategie", "deb-regles-simplifiees", "prat-valeurs-tableau", "reg-fournir-couleur", "lex-dix-de-der", "res-aide-memoire", "res-regle-simple"],
    },
  },

  {
    id: "res-aide-memoire",
    priority: 0.6,
    fr: {
      slug: "aide-memoire-coinche-imprimer",
      linkLabel: "Aide-mémoire",
      title: "Aide-mémoire coinche à imprimer (valeurs + barème)",
      h1: "Aide-mémoire de la coinche",
      description:
        "Aide-mémoire coinche à imprimer : valeurs des cartes à l'atout et à la couleur, ordre des cartes et barème (162, belote 20, capot 250).",
      lead: "Un <strong>aide-mémoire</strong> au format mémo : valeurs des cartes, ordre des forces et barème de points. Imprime-le avec <strong>Ctrl/Cmd+P</strong> pour le garder près de la table.",
      sections: [
        {
          h2: "Valeurs des cartes",
          html: "<p>À l'atout, le <strong>Valet</strong> et le <strong>9</strong> deviennent les cartes maîtresses. Détail sur <a href=\"/valeur-cartes-coinche.html\">la valeur des cartes</a>.</p><table><tr><th>Carte</th><th>À l'atout</th><th>À la couleur</th></tr><tr><td>Valet</td><td><strong>20</strong></td><td>2</td></tr><tr><td>9</td><td><strong>14</strong></td><td>0</td></tr><tr><td>As</td><td>11</td><td>11</td></tr><tr><td>10</td><td>10</td><td>10</td></tr><tr><td>Roi</td><td>4</td><td>4</td></tr><tr><td>Dame</td><td>3</td><td>3</td></tr><tr><td>8 et 7</td><td>0</td><td>0</td></tr></table>",
        },
        {
          h2: "Ordre des cartes (de la plus forte à la plus faible)",
          html: "<ul><li><strong>À l'atout</strong> : Valet &gt; 9 &gt; As &gt; 10 &gt; Roi &gt; Dame &gt; 8 &gt; 7.</li><li><strong>À la couleur</strong> : As &gt; 10 &gt; Roi &gt; Dame &gt; Valet &gt; 9 &gt; 8 &gt; 7.</li></ul>",
        },
        {
          h2: "Barème des points",
          html: "<table><tr><th>Élément</th><th>Points</th></tr><tr><td>Total d'une donne</td><td><strong>162</strong> (152 + 10 de der)</td></tr><tr><td>Belote (Roi + Dame d'atout)</td><td><strong>20</strong></td></tr><tr><td>Capot annoncé et réussi</td><td><strong>250</strong></td></tr><tr><td>Coinche</td><td>×2</td></tr><tr><td>Surcoinche</td><td>×4</td></tr></table><p>Pour t'entraîner à additionner, vois <a href=\"/compter-points-coinche.html\">compter les points</a>.</p>",
        },
        {
          h2: "Imprimer ce mémo",
          html: "<p>Fais <strong>Ctrl+P</strong> (Windows/Linux) ou <strong>Cmd+P</strong> (Mac), puis « Enregistrer au format PDF » ou imprime. Tu peux aussi <a href=\"/\">jouer tout de suite</a> pour retenir ces valeurs naturellement.</p>",
        },
      ],
      faq: [
        { q: "Quelles sont les valeurs des cartes à l'atout ?", a: "Valet 20, 9 14, As 11, 10 10, Roi 4, Dame 3, et 8 comme 7 valent 0." },
        { q: "Combien vaut la belote ?", a: "La belote (Roi et Dame d'atout dans la même main) vaut 20 points, en plus des 162 de la donne." },
        { q: "Combien vaut un capot ?", a: "Un capot annoncé et réussi vaut 250 points. La coinche double les points (×2) et la surcoinche les quadruple (×4)." },
      ],
      related: ["prat-valeurs-tableau", "bel-valeur-cartes", "deb-memo-antiseche", "lex-capot", "prat-compter-rapide", "res-regles-imprimer", "res-regle-simple"],
    },
    en: {
      slug: "coinche-cheat-sheet-printable",
      linkLabel: "Cheat sheet",
      title: "Printable coinche cheat sheet (values + scoring)",
      h1: "Coinche cheat sheet",
      description:
        "Printable coinche cheat sheet: card values at trumps and at plain suits, card order and scoring (162, belote 20, capot 250).",
      lead: "A <strong>cheat sheet</strong> in memo format: card values, the order of strength and the scoring scale. Print it with <strong>Ctrl/Cmd+P</strong> to keep it by the table.",
      sections: [
        {
          h2: "Card values",
          html: "<p>At trumps, the <strong>Jack</strong> and the <strong>9</strong> become the master cards. Details on <a href=\"/valeur-cartes-coinche.html\">card values</a>.</p><table><tr><th>Card</th><th>Trump</th><th>Plain suit</th></tr><tr><td>Jack</td><td><strong>20</strong></td><td>2</td></tr><tr><td>9</td><td><strong>14</strong></td><td>0</td></tr><tr><td>Ace</td><td>11</td><td>11</td></tr><tr><td>10</td><td>10</td><td>10</td></tr><tr><td>King</td><td>4</td><td>4</td></tr><tr><td>Queen</td><td>3</td><td>3</td></tr><tr><td>8 and 7</td><td>0</td><td>0</td></tr></table>",
        },
        {
          h2: "Card order (strongest to weakest)",
          html: "<ul><li><strong>At trumps</strong>: Jack &gt; 9 &gt; Ace &gt; 10 &gt; King &gt; Queen &gt; 8 &gt; 7.</li><li><strong>At plain suits</strong>: Ace &gt; 10 &gt; King &gt; Queen &gt; Jack &gt; 9 &gt; 8 &gt; 7.</li></ul>",
        },
        {
          h2: "Scoring scale",
          html: "<table><tr><th>Item</th><th>Points</th></tr><tr><td>Total of one deal</td><td><strong>162</strong> (152 + 10 de der)</td></tr><tr><td>Belote (King + Queen of trumps)</td><td><strong>20</strong></td></tr><tr><td>Bid-and-made capot</td><td><strong>250</strong></td></tr><tr><td>Coinche (double)</td><td>×2</td></tr><tr><td>Surcoinche (redouble)</td><td>×4</td></tr></table><p>To practise adding it all up, see <a href=\"/compter-points-coinche.html\">counting points</a>.</p>",
        },
        {
          h2: "Print this memo",
          html: "<p>Press <strong>Ctrl+P</strong> (Windows/Linux) or <strong>Cmd+P</strong> (Mac), then \"Save as PDF\" or print. You can also <a href=\"/\">play right away</a> to learn these values naturally.</p>",
        },
      ],
      faq: [
        { q: "What are the trump card values?", a: "Jack 20, 9 14, Ace 11, 10 10, King 4, Queen 3, and both the 8 and 7 are worth 0." },
        { q: "How much is a belote worth?", a: "A belote (King and Queen of trumps in the same hand) is worth 20 points, on top of the deal's 162." },
        { q: "How much is a capot worth?", a: "A bid-and-made capot is worth 250 points. Coinche doubles the points (×2) and surcoinche quadruples them (×4)." },
      ],
      related: ["prat-valeurs-tableau", "bel-valeur-cartes", "deb-memo-antiseche", "lex-capot", "prat-compter-rapide", "res-regles-imprimer", "res-regle-simple"],
    },
  },

  {
    id: "res-regle-simple",
    priority: 0.6,
    fr: {
      slug: "regle-coinche-simple",
      linkLabel: "Règle simple",
      title: "La règle de la coinche en simple (comprendre en 5 min)",
      h1: "La règle de la coinche, version simple",
      description:
        "La règle de la coinche expliquée simplement : comprendre l'essentiel en 5 minutes, sans jargon. Pour démarrer une première partie sans stress.",
      lead: "Tu veux comprendre la coinche <strong>en 5 minutes</strong>, sans jargon ? Voici l'essentiel, juste de quoi t'asseoir à la table et jouer ta première donne.",
      sections: [
        {
          h2: "Le but du jeu",
          html: "<p>Vous êtes <strong>4 joueurs</strong>, en 2 équipes de 2 (les partenaires sont en face). Le but : remporter des <strong>plis</strong> (les cartes posées à chaque tour) pour marquer des points. La première équipe à atteindre le score fixé (souvent 1000 ou 1500) gagne la partie.</p>",
        },
        {
          h2: "On annonce avant de jouer",
          html: "<p>Avant de jouer, chaque équipe parie sur le nombre de points qu'elle pense faire et choisit l'<strong>atout</strong> (la couleur la plus forte de la donne). On annonce au minimum <strong>80</strong>, et l'équipe qui annonce le plus prend le contrat. Si tu n'as rien à dire, tu <strong>passes</strong>. Plus de détails sur <a href=\"/regles-coinche.html\">les règles complètes</a>.</p>",
        },
        {
          h2: "Comment on joue une carte",
          html: "<p>À ton tour, tu poses une carte. La règle de base : tu dois <strong>jouer la même couleur</strong> que la première carte du pli si tu en as. La carte la plus forte remporte le pli (un atout bat toujours les autres couleurs). Celui qui gagne le pli rejoue.</p>",
        },
        {
          h2: "Qui gagne la donne ?",
          html: "<p>À la fin, on compte les points des plis. Si l'équipe qui a pris le contrat atteint son annonce, c'est gagné ; sinon, elle <strong>chute</strong> et l'autre équipe marque. Une donne vaut <strong>162 points</strong> en tout. C'est tout ce qu'il faut pour commencer. Le mieux, c'est d'<a href=\"/\">essayer une partie</a> : on apprend bien plus vite en jouant.</p>",
        },
      ],
      faq: [
        { q: "La coinche est-elle difficile à apprendre ?", a: "Les bases s'attrapent en quelques minutes : 4 joueurs, on annonce un contrat, on joue des plis en suivant la couleur, puis on compte les points. La finesse vient ensuite, en jouant." },
        { q: "C'est quoi un atout, simplement ?", a: "L'atout est la couleur la plus forte de la donne : ses cartes battent toutes les autres couleurs. On la choisit pendant les annonces." },
        { q: "Combien de joueurs pour la coinche ?", a: "La coinche se joue à 4, en 2 équipes de 2, les partenaires assis face à face." },
      ],
      related: ["deb-comment-jouer", "deb-regles-simplifiees", "deb-vocabulaire", "deb-est-ce-difficile", "pil-strategie", "res-regles-imprimer", "res-aide-memoire"],
    },
    en: {
      slug: "simple-coinche-rules",
      linkLabel: "Simple rules",
      title: "Simple coinche rules (understand it in 5 minutes)",
      h1: "Coinche rules, the simple version",
      description:
        "Coinche rules explained simply: grasp the essentials in 5 minutes, no jargon. Just enough to sit down and play your first hand.",
      lead: "Want to understand coinche <strong>in 5 minutes</strong>, without jargon? Here are the essentials, just enough to sit at the table and play your first deal.",
      sections: [
        {
          h2: "The goal",
          html: "<p>There are <strong>4 players</strong> in 2 teams of 2 (partners sit opposite). The goal: win <strong>tricks</strong> (the cards played each round) to score points. The first team to reach the target score (often 1000 or 1500) wins the game.</p>",
        },
        {
          h2: "You bid before you play",
          html: "<p>Before play, each team bets on how many points it thinks it can make and picks the <strong>trump</strong> (the strongest suit of the deal). The minimum bid is <strong>80</strong>, and the highest bidder takes the contract. If you have nothing to say, you <strong>pass</strong>. More on the <a href=\"/regles-coinche.html\">full rules</a>.</p>",
        },
        {
          h2: "How you play a card",
          html: "<p>On your turn, you play one card. The basic rule: you must <strong>follow the suit</strong> of the first card of the trick if you can. The strongest card wins the trick (a trump always beats the other suits). The trick winner leads next.</p>",
        },
        {
          h2: "Who wins the deal?",
          html: "<p>At the end, you count the points in the tricks. If the team that took the contract reaches its bid, it wins; otherwise it <strong>fails</strong> and the other team scores. A deal is worth <strong>162 points</strong> in total. That's all you need to start. Best of all, <a href=\"/\">try a hand</a>: you learn far faster by playing.</p>",
        },
      ],
      faq: [
        { q: "Is coinche hard to learn?", a: "The basics take a few minutes: 4 players, you bid a contract, you play tricks by following suit, then you count points. The finer points come later, through play." },
        { q: "What is a trump, simply put?", a: "The trump is the strongest suit of the deal: its cards beat all other suits. It is chosen during the bidding." },
        { q: "How many players for coinche?", a: "Coinche is played by 4 people, in 2 teams of 2, with partners sitting opposite each other." },
      ],
      related: ["deb-comment-jouer", "deb-regles-simplifiees", "deb-vocabulaire", "deb-est-ce-difficile", "pil-strategie", "res-regles-imprimer", "res-aide-memoire"],
    },
  },

  {
    id: "res-noms-regionaux",
    priority: 0.55,
    fr: {
      slug: "coinche-noms-regionaux",
      linkLabel: "Noms régionaux",
      title: "Coinche, contrée, belote contrée : les noms selon les régions",
      h1: "Coinche, contrée, belote contrée : un seul jeu, plusieurs noms",
      description:
        "Coinche, contrée, belote contrée, coinche provençale : un tour des appellations régionales du même jeu et de leurs nuances réelles.",
      lead: "Coinche, contrée, belote contrée... Ces mots désignent en réalité <strong>le même jeu</strong> ou de très proches cousins. Faisons le tri entre les appellations.",
      sections: [
        {
          h2: "Coinche et contrée : deux mots, un jeu",
          html: "<p><strong>Coinche</strong> et <strong>contrée</strong> désignent essentiellement la même chose : une belote où l'on annonce un contrat et où l'on peut « coincher » (contrer) l'adversaire. Le mot <em>coinche</em> est très courant dans le Sud-Est, <em>contrée</em> ailleurs. Les différences sont surtout de vocabulaire et de petites conventions. On compare tout cela sur <a href=\"/coinche-vs-contree.html\">coinche vs contrée</a>.</p>",
        },
        {
          h2: "Belote contrée : l'appellation longue",
          html: "<p><strong>Belote contrée</strong> (ou « belote coinchée ») est le nom complet qui rappelle l'origine : c'est une belote à laquelle on a ajouté un système d'enchères et la possibilité de contrer. C'est donc un synonyme de coinche/contrée. Voir la page <a href=\"/belote-contree.html\">belote contrée</a>.</p>",
        },
        {
          h2: "Les appellations du Sud",
          html: "<p>Dans le Sud, on entend <strong>coinche marseillaise</strong> ou <strong>coinche provençale</strong>. Là encore, le jeu de fond est le même ; ces noms désignent surtout des <em>habitudes de table</em> locales (façon d'annoncer, conventions entre partenaires) plutôt qu'un règlement vraiment distinct.</p>",
        },
        {
          h2: "Récapitulatif",
          html: "<table><tr><th>Nom</th><th>Ce que ça désigne</th></tr><tr><td>Coinche</td><td>Le jeu, terme courant dans le Sud-Est</td></tr><tr><td>Contrée</td><td>Le même jeu, terme courant ailleurs</td></tr><tr><td>Belote contrée</td><td>Nom complet (belote + enchères + contre)</td></tr><tr><td>Coinche marseillaise / provençale</td><td>Mêmes règles, conventions de table du Sud</td></tr></table><p>Quel que soit le nom, tu peux <a href=\"/\">jouer une partie</a> avec les mêmes règles.</p>",
        },
      ],
      faq: [
        { q: "Coinche et contrée, c'est pareil ?", a: "Oui, pour l'essentiel : ce sont deux noms du même jeu. Coinche est surtout employé dans le Sud-Est, contrée ailleurs ; les écarts se limitent au vocabulaire et à de petites conventions." },
        { q: "La belote contrée est-elle un autre jeu ?", a: "Non, c'est le nom complet de la coinche : une belote enrichie d'enchères et de la possibilité de contrer (coincher) l'adversaire." },
        { q: "Pourquoi autant de noms ?", a: "Le jeu s'est répandu région par région avec des appellations locales. Les noms changent, le cœur des règles reste le même." },
      ],
      related: ["cmp-belote-contree", "bc-pilier", "bc-vs-belote", "var-marseillaise", "deb-vocabulaire", "res-provencale", "cmp-belote-classique"],
    },
    en: {
      slug: "coinche-regional-names",
      linkLabel: "Regional names",
      title: "Coinche, contrée, contract belote: the names by region",
      h1: "Coinche, contrée, contract belote: one game, many names",
      description:
        "Coinche, contrée, contract belote, Provençal coinche: a tour of the regional names for the same game and the real nuances between them.",
      lead: "Coinche, contrée, contract belote... These words actually refer to <strong>the same game</strong>, or very close cousins. Let's sort out the names.",
      sections: [
        {
          h2: "Coinche and contrée: two words, one game",
          html: "<p><strong>Coinche</strong> and <strong>contrée</strong> mean essentially the same thing: a belote where you bid a contract and can \"coinche\" (double) the opponents. <em>Coinche</em> is very common in south-east France, <em>contrée</em> elsewhere. The differences are mostly vocabulary and small conventions. We compare them on <a href=\"/coinche-vs-contree.html\">coinche vs contrée</a>.</p>",
        },
        {
          h2: "Contract belote: the long name",
          html: "<p><strong>Contract belote</strong> (\"belote contrée\") is the full name that recalls its origin: a belote to which a bidding system and the option to double were added. It is therefore a synonym for coinche/contrée. See the <a href=\"/belote-contree.html\">contract belote</a> page.</p>",
        },
        {
          h2: "The southern names",
          html: "<p>In the south, you'll hear <strong>Marseille coinche</strong> or <strong>Provençal coinche</strong>. Again, the underlying game is the same; these names mostly point to local <em>table habits</em> (bidding style, partnership conventions) rather than a genuinely different rule set.</p>",
        },
        {
          h2: "Quick recap",
          html: "<table><tr><th>Name</th><th>What it means</th></tr><tr><td>Coinche</td><td>The game; common term in the south-east</td></tr><tr><td>Contrée</td><td>The same game; common term elsewhere</td></tr><tr><td>Contract belote</td><td>Full name (belote + bidding + double)</td></tr><tr><td>Marseille / Provençal coinche</td><td>Same rules, southern table conventions</td></tr></table><p>Whatever the name, you can <a href=\"/\">play a hand</a> with the same rules.</p>",
        },
      ],
      faq: [
        { q: "Are coinche and contrée the same?", a: "Yes, essentially: they are two names for the same game. Coinche is mainly used in south-east France, contrée elsewhere; the gaps are limited to vocabulary and small conventions." },
        { q: "Is contract belote a different game?", a: "No, it's the full name of coinche: a belote enriched with bidding and the option to double (coinche) the opponents." },
        { q: "Why so many names?", a: "The game spread region by region with local names. The names change, but the core rules stay the same." },
      ],
      related: ["cmp-belote-contree", "bc-pilier", "bc-vs-belote", "var-marseillaise", "deb-vocabulaire", "res-provencale", "cmp-belote-classique"],
    },
  },

  {
    id: "res-provencale",
    priority: 0.55,
    fr: {
      slug: "coinche-provencale",
      linkLabel: "Coinche provençale",
      title: "La coinche provençale : particularités et usages",
      h1: "La coinche provençale",
      description:
        "La coinche provençale : ce que recouvre vraiment cette appellation du Sud. Particularités, conventions de table et lien avec les variantes courantes.",
      lead: "On parle souvent de <strong>coinche provençale</strong> dans le Sud de la France. Soyons honnêtes : il s'agit surtout de la coinche habituelle, avec quelques <strong>conventions de table</strong> propres aux régions.",
      sections: [
        {
          h2: "De quoi parle-t-on ?",
          html: "<p>La « coinche provençale » n'est pas un règlement officiel à part. C'est la <strong>coinche</strong> jouée dans le Sud, avec la même mécanique : enchères de 80 au capot, atout, plis, et le fameux « coinche » pour contrer l'adversaire. Pour les noms voisins (marseillaise, contrée), vois <a href=\"/coinche-noms-regionaux.html\">les noms régionaux</a>.</p>",
        },
        {
          h2: "Des usages, pas des règles différentes",
          html: "<p>Ce qui change d'une table à l'autre relève surtout des <em>habitudes</em> : ordre d'annonce, façon de soutenir son partenaire, gestion d'un litige à 80 partout, ou encore conventions de signalisation. Ce ne sont pas des règles « provençales » figées, mais des <strong>accords entre joueurs</strong>. Le mieux reste de les fixer avant la partie.</p>",
        },
        {
          h2: "Et les variantes ?",
          html: "<p>Si tu cherches de vraies variantes de jeu (sans-atout, tout-atout, parties à un autre nombre de joueurs), ce sont des règles à part entière, indépendantes de la région. La <strong>coinche marseillaise</strong>, elle, désigne une variante d'annonces que tu peux explorer dans les pages dédiées.</p>",
        },
        {
          h2: "Le barème ne change pas",
          html: "<p>Quelle que soit la table, le décompte reste celui de la coinche : <strong>162 points</strong> par donne (152 + 10 de der), <strong>belote 20</strong>, <strong>capot 250</strong>, coinche ×2 et surcoinche ×4. Tu peux <a href=\"/\">jouer une partie</a> avec exactement ces règles.</p>",
        },
      ],
      faq: [
        { q: "La coinche provençale a-t-elle des règles spéciales ?", a: "Pas vraiment : c'est la coinche habituelle. Ce qui varie dans le Sud relève surtout de conventions de table (annonces, signalisation), à convenir entre joueurs avant de jouer." },
        { q: "Provençale et marseillaise, c'est pareil ?", a: "« Provençale » désigne surtout l'usage régional de la coinche. « Marseillaise » renvoie le plus souvent à une variante d'annonces précise ; les deux mots se chevauchent selon les tables." },
        { q: "Le comptage change-t-il dans le Sud ?", a: "Non : 162 points par donne, belote 20, capot 250, coinche ×2 et surcoinche ×4. Le barème de la coinche est le même partout." },
      ],
      related: ["var-marseillaise", "var-sans-atout", "var-tout-atout", "res-noms-regionaux", "cmp-belote-contree", "deb-vocabulaire", "pil-strategie"],
    },
    en: {
      slug: "provencal-coinche",
      linkLabel: "Provençal coinche",
      title: "Provençal coinche: features and usage",
      h1: "Provençal coinche",
      description:
        "Provençal coinche: what this southern label really covers. Features, table conventions and how it relates to the common variants.",
      lead: "People in southern France often talk about <strong>Provençal coinche</strong>. To be honest, it is mostly ordinary coinche, with a few <strong>table conventions</strong> typical of the region.",
      sections: [
        {
          h2: "What are we talking about?",
          html: "<p>\"Provençal coinche\" is not a separate official rule set. It is <strong>coinche</strong> as played in the south, with the same mechanics: bids from 80 to capot, a trump suit, tricks, and the famous \"coinche\" to double the opponents. For neighbouring names (Marseille, contrée), see the <a href=\"/coinche-noms-regionaux.html\">regional names</a> page.</p>",
        },
        {
          h2: "Habits, not different rules",
          html: "<p>What changes from table to table is mostly <em>habits</em>: bidding order, how you support your partner, how an 80-all tie is handled, or signalling conventions. These are not fixed \"Provençal\" rules but <strong>agreements between players</strong>. Best to settle them before the game.</p>",
        },
        {
          h2: "What about the variants?",
          html: "<p>If you're after genuine game variants (no-trump, all-trump, games with a different number of players), those are full rule sets, independent of region. <strong>Marseille coinche</strong>, meanwhile, refers to a bidding variant you can explore in the dedicated pages.</p>",
        },
        {
          h2: "The scoring does not change",
          html: "<p>Whatever the table, the scoring stays that of coinche: <strong>162 points</strong> per deal (152 + 10 de der), <strong>belote 20</strong>, <strong>capot 250</strong>, coinche ×2 and surcoinche ×4. You can <a href=\"/\">play a hand</a> with exactly these rules.</p>",
        },
      ],
      faq: [
        { q: "Does Provençal coinche have special rules?", a: "Not really: it's ordinary coinche. What varies in the south is mostly table conventions (bidding, signalling), to be agreed between players before play." },
        { q: "Are Provençal and Marseille coinche the same?", a: "\"Provençal\" mostly means the regional way of playing coinche. \"Marseille\" usually points to a specific bidding variant; the two terms overlap depending on the table." },
        { q: "Does the scoring change in the south?", a: "No: 162 points per deal, belote 20, capot 250, coinche ×2 and surcoinche ×4. The coinche scoring is the same everywhere." },
      ],
      related: ["var-marseillaise", "var-sans-atout", "var-tout-atout", "res-noms-regionaux", "cmp-belote-contree", "deb-vocabulaire", "pil-strategie"],
    },
  },
];
