// Catégorie : La contrée. Famille de mots-clés "contrée" (nom du jeu dans le Sud
// de la France). Pages écrites AUTOUR du mot "contrée", avec des angles distincts
// des pages "coinche" et "belote contrée" : elles renvoient vers les guides
// existants plutôt que de les recopier.

export const category = { fr: "La contrée", en: "Contrée (French belote)" };

export default [
  {
    id: "ctr-pilier",
    priority: 0.8,
    fr: {
      slug: "contree-jeu-de-cartes",
      linkLabel: "La contrée : le jeu",
      title: "La contrée : le jeu de cartes (règles, points et comment jouer)",
      h1: "La contrée : le jeu de cartes",
      description:
        "La contrée est un jeu de cartes à 4 joueurs : 32 cartes, 8 plis, des enchères de 80 au capot et 162 points par donne. Règles, points et où jouer à la contrée.",
      lead: "Dans le Sud de la France, on dit simplement <strong>la contrée</strong>. Ailleurs on dit coinche ou belote contrée, mais c'est le <strong>même jeu de cartes</strong> : quatre joueurs, 32 cartes, des enchères et un atout annoncé.",
      sections: [
        {
          h2: "Contrée, coinche, belote contrée : un seul jeu",
          html: "<p>Première chose à savoir : <strong>contrée = coinche = belote contrée</strong>. Ce sont trois noms régionaux pour les mêmes règles. « Contrée » domine dans le Sud (Marseille, Provence, Languedoc), « coinche » s'entend davantage au Nord et à l'Est, et « belote contrée » est la forme complète, un peu plus administrative. Si tu as appris à la contrée chez toi et que tu tombes sur un guide de coinche, tout s'applique tel quel. Les nuances de vocabulaire sont détaillées dans <a href=\"/coinche-vs-contree.html\">coinche, contrée et belote : les différences</a> et dans notre page <a href=\"/belote-contree.html\">belote contrée</a>.</p>",
        },
        {
          h2: "Ce qu'il faut pour jouer à la contrée",
          html: "<p>Il te faut un jeu de <strong>32 cartes</strong> (du 7 à l'As) et <strong>4 joueurs</strong> répartis en <strong>2 équipes</strong> de deux, partenaires assis face à face. Le donneur distribue toutes les cartes, 8 par joueur, généralement par paquets de 3, 2 puis 3. Une donne se joue en <strong>8 plis</strong>, et la partie enchaîne les donnes jusqu'à un total convenu à l'avance, souvent 1000 ou 1500 points.</p>",
        },
        {
          h2: "Les enchères : de 80 au capot",
          html: "<p>Avant de jouer, chacun parle à son tour. Une enchère annonce <strong>un nombre de points à réaliser</strong> et <strong>une couleur d'atout</strong> (ou sans-atout, ou tout-atout). Les paliers vont de <strong>80 à 160</strong> de dix en dix, puis viennent les contrats spéciaux jusqu'au <strong>capot</strong>. Le joueur qui a fait la plus haute enchère devient le preneur : son camp doit atteindre le contrat, l'autre camp essaie de le faire chuter.</p><p>C'est ici que le jeu prend son nom : si tu penses que le preneur n'y arrivera pas, tu peux <strong>contrer</strong>, ce qu'on appelle aussi coincher. Les points de la donne sont alors <strong>doublés (×2)</strong>. Le preneur peut riposter par une <strong>surcoinche</strong>, qui les <strong>quadruple (×4)</strong>.</p>",
        },
        {
          h2: "Les points de la contrée en un coup d'oeil",
          html: "<p>Une donne pèse <strong>162 points</strong> : 152 contenus dans les cartes plus <strong>10 de der</strong> pour le dernier pli.</p><ul><li><strong>À l'atout</strong> : Valet 20, 9 = 14, As 11, 10 = 10, Roi 4, Dame 3.</li><li><strong>Hors atout</strong> : As 11, 10 = 10, Roi 4, Dame 3, Valet 2.</li><li><strong>Belote</strong> (Roi et Dame d'atout dans la même main) : <strong>20 points</strong>.</li><li><strong>Capot</strong> annoncé et réussi : <strong>250 points</strong>.</li></ul><p>Le tableau complet, avec les ordres de force, est sur <a href=\"/valeur-cartes-coinche.html\">la valeur des cartes</a>, et le détail des règles sur <a href=\"/regles-coinche.html\">les règles complètes</a>.</p>",
        },
        {
          h2: "Où jouer à la contrée",
          html: "<p>Le plus simple pour t'y mettre : lancer une partie contre l'ordinateur, te tromper, recommencer. Sur <a href=\"/\">Coincheur</a>, tu joues à la contrée gratuitement dans ton navigateur, sans inscription, contre des IA de plusieurs niveaux, avec un coach qui explique tes choix. Quand les réflexes viennent, passe à <a href=\"/strategie-coinche.html\">la stratégie</a>.</p>",
        },
      ],
      faq: [
        { q: "La contrée, c'est quel jeu exactement ?", a: "C'est un jeu de cartes à 4 joueurs dérivé de la belote, avec des enchères et un atout annoncé. Selon les régions on l'appelle contrée, coinche ou belote contrée : ce sont les mêmes règles." },
        { q: "Combien de points fait une donne à la contrée ?", a: "162 points : 152 dans les cartes et 10 de der pour le dernier pli. La belote (Roi et Dame d'atout) ajoute 20 points, et un capot annoncé et réussi vaut 250." },
        { q: "Pourquoi ce jeu s'appelle-t-il la contrée ?", a: "Parce qu'on peut contrer le contrat adverse en pariant sur sa chute : les points de la donne sont alors doublés, et quadruplés si l'adversaire surcoinche." },
      ],
      related: ["ctr-regles", "ctr-jouer", "ctr-points", "ctr-vocabulaire", "bc-pilier", "res-noms-regionaux", "cmp-belote-contree", "deb-comment-jouer", "lex-capot", "prat-valeurs-tableau"],
    },
    en: {
      slug: "contree-card-game",
      linkLabel: "Contrée card game",
      title: "Contrée: the card game (rules, points and how to play)",
      h1: "Contrée: the card game",
      description:
        "Contrée is a 4-player card game: 32 cards, 8 tricks, bidding from 80 to capot and 162 points per deal. Rules, scoring and where to play contrée online.",
      lead: "In the South of France people simply say <strong>contrée</strong>. Elsewhere they say coinche or belote contrée, but it is the <strong>same card game</strong>: four players, 32 cards, an auction and a named trump suit.",
      sections: [
        {
          h2: "Contrée, coinche, contract belote: one single game",
          html: "<p>First thing to know: <strong>contrée = coinche = contract belote</strong>. Three regional names, one set of rules. « Contrée » dominates in the South (Marseille, Provence, Languedoc), « coinche » is heard more in the North and East, and « belote contrée » is the full, slightly more formal form. If you learned the game as contrée and land on a coinche guide, everything applies as-is. The vocabulary nuances are covered in <a href=\"/coinche-vs-contree.html\">coinche, contrée and belote: the differences</a> and on our <a href=\"/belote-contree.html\">contract belote</a> page.</p>",
        },
        {
          h2: "What you need to play contrée",
          html: "<p>You need a <strong>32-card deck</strong> (7 up to Ace) and <strong>4 players</strong> in <strong>2 teams</strong> of two, partners sitting opposite each other. The dealer hands out every card, 8 per player, usually in packets of 3, 2 then 3. A deal is played over <strong>8 tricks</strong>, and a match runs through deals until an agreed total, often 1000 or 1500 points.</p>",
        },
        {
          h2: "The auction: from 80 to capot",
          html: "<p>Before play, each player speaks in turn. A bid names <strong>a point target</strong> and <strong>a trump suit</strong> (or no-trump, or all-trump). Steps run from <strong>80 to 160</strong> in tens, then come the special contracts up to <strong>capot</strong>. Whoever made the highest bid becomes the taker: their side must reach the contract, the other side tries to make it fail.</p><p>This is where the game gets its name: if you believe the taker cannot get there, you may <strong>counter</strong>, also called coincher. The deal's points are then <strong>doubled (x2)</strong>. The taker can fire back with a <strong>surcoinche</strong>, which <strong>quadruples them (x4)</strong>.</p>",
        },
        {
          h2: "Contrée scoring at a glance",
          html: "<p>A deal is worth <strong>162 points</strong>: 152 held in the cards plus a <strong>10-point last-trick bonus</strong> (the 10 de der).</p><ul><li><strong>In trumps</strong>: Jack 20, 9 = 14, Ace 11, 10 = 10, King 4, Queen 3.</li><li><strong>Outside trumps</strong>: Ace 11, 10 = 10, King 4, Queen 3, Jack 2.</li><li><strong>Belote</strong> (King and Queen of trumps in the same hand): <strong>20 points</strong>.</li><li><strong>Capot</strong> bid and made: <strong>250 points</strong>.</li></ul><p>The full table, with the ranking orders, sits on <a href=\"/valeur-cartes-coinche.html\">card values</a>, and the rule detail on <a href=\"/regles-coinche.html\">the complete rules</a>.</p>",
        },
        {
          h2: "Where to play contrée",
          html: "<p>The easiest way in: start a game against the computer, get it wrong, try again. On <a href=\"/?lang=en\">Coincheur</a> you play contrée for free in your browser, with no signup, against AIs of several levels, with a coach that explains your choices. Once the reflexes settle in, move on to <a href=\"/strategie-coinche.html\">strategy</a>.</p>",
        },
      ],
      faq: [
        { q: "What game is contrée exactly?", a: "It is a 4-player card game derived from belote, with an auction and a named trump suit. Depending on the region it is called contrée, coinche or contract belote: the rules are the same." },
        { q: "How many points are in a contrée deal?", a: "162 points: 152 in the cards and 10 for winning the last trick. Belote (King and Queen of trumps) adds 20 points, and a capot bid and made is worth 250." },
        { q: "Why is the game called contrée?", a: "Because you can counter the opposing contract, betting that it will fail: the deal's points are then doubled, and quadrupled if the opponents surcoinche." },
      ],
      related: ["ctr-regles", "ctr-jouer", "ctr-points", "ctr-vocabulaire", "bc-pilier", "res-noms-regionaux", "cmp-belote-contree", "deb-comment-jouer", "lex-capot", "prat-valeurs-tableau"],
    },
  },

  {
    id: "ctr-regles",
    priority: 0.75,
    fr: {
      slug: "regles-de-la-contree",
      linkLabel: "Règles de la contrée",
      title: "Règles de la contrée : tout ce qu'il faut savoir",
      h1: "Les règles de la contrée",
      description:
        "Les règles de la contrée expliquées simplement : distribution, enchères de 80 au capot, obligation de fournir et de couper, contrer et surcontrer, comptage sur 162 points.",
      lead: "Voici les <strong>règles de la contrée</strong> dans l'ordre où tu en as besoin à la table : distribuer, enchérir, jouer les plis, compter. Rien de plus que l'essentiel, mais rien d'important en moins.",
      sections: [
        {
          h2: "Distribution et déroulement d'une donne",
          html: "<p>Quatre joueurs, deux équipes, 32 cartes. Le donneur distribue l'intégralité du paquet dans le sens convenu à la table, 8 cartes par joueur, classiquement 3 puis 2 puis 3. Après les enchères, le joueur placé à gauche du donneur entame le premier pli. Chacun pose une carte, le pli revient à la plus forte selon la couleur demandée et l'atout, et son vainqueur entame le pli suivant. Huit plis plus tard, la donne est finie et on compte.</p>",
        },
        {
          h2: "Les enchères et le contrat",
          html: "<p>Chaque joueur annonce à son tour un contrat plus élevé que le précédent, ou passe. Une annonce se compose d'<strong>un nombre de points</strong> (de 80 à 160, puis capot) et d'<strong>un atout</strong> : une couleur, ou sans-atout, ou tout-atout selon les conventions de la table. Quand trois joueurs passent d'affilée, la dernière annonce devient le contrat.</p><p>L'équipe qui prend doit réaliser <strong>au moins</strong> les points annoncés. La défense n'a qu'un objectif : l'en empêcher. Si tu juges le contrat intenable, tu peux <strong>contrer</strong> (coincher) : la donne compte alors <strong>×2</strong>, et <strong>×4</strong> en cas de surcoinche.</p>",
        },
        {
          h2: "Les obligations pendant le jeu",
          html: "<p>Trois règles règlent presque tous les litiges de la contrée :</p><ul><li><strong>Fournir la couleur demandée</strong> si tu en as une carte.</li><li><strong>Couper</strong> si tu n'as pas la couleur et que l'adversaire est maître du pli. Si c'est ton partenaire qui est maître, tu peux généralement te défausser.</li><li><strong>Monter à l'atout</strong> : quand un atout a déjà été posé et que tu coupes, tu dois jouer un atout supérieur si tu en possèdes un.</li></ul><p>Ne pas respecter ces obligations, c'est une renonce, et la donne est perdue par le fautif selon les conventions retenues. Le détail figure dans <a href=\"/regles-coinche.html\">les règles complètes</a>.</p>",
        },
        {
          h2: "Compter et savoir si le contrat passe",
          html: "<p>Une donne vaut <strong>162 points</strong> : 152 dans les cartes et <strong>10 de der</strong> pour le dernier pli. Ajoute <strong>20</strong> si tu as la belote, c'est-à-dire le Roi et la Dame d'atout dans la même main. Un <strong>capot</strong> annoncé et réussi vaut <strong>250</strong>. Compare ensuite le total réalisé au contrat : atteint, il est tenu ; en dessous, il chute et les points partent à la défense. Le barème carte par carte est détaillé sur <a href=\"/valeur-cartes-coinche.html\">la valeur des cartes</a>.</p>",
        },
        {
          h2: "Ce qui change d'une table à l'autre",
          html: "<p>La contrée se joue avec des conventions locales : annonces déclarées (tierce, carré), gestion du capot non annoncé, seuil de fin de partie, tour de parole après un contre. Rien de dramatique, à condition d'en parler <em>avant</em> la première donne. Si un doute survient en cours de partie, tranche pour la donne en cours et note la règle pour la suite.</p>",
        },
      ],
      faq: [
        { q: "Quelles sont les règles de base de la contrée ?", a: "Quatre joueurs en deux équipes, 32 cartes, 8 plis. On enchérit de 80 au capot en annonçant un atout, puis on joue en fournissant la couleur demandée, en coupant si l'adversaire est maître et en montant à l'atout. Une donne vaut 162 points." },
        { q: "Peut-on contrer n'importe quel contrat à la contrée ?", a: "Oui, la défense peut contrer le contrat annoncé, ce qui double les points de la donne. L'équipe qui a pris peut alors surcontrer, ce qui les quadruple." },
        { q: "Que se passe-t-il si le contrat chute ?", a: "L'équipe qui a pris ne marque rien pour la donne et les points reviennent à la défense, selon le barème convenu, multipliés par 2 en cas de contre et par 4 en cas de surcontre." },
      ],
      related: ["ctr-pilier", "ctr-points", "ctr-jouer", "reg-fournir-couleur", "reg-obligation-couper", "reg-monter-atout", "deb-regles-simplifiees", "res-regle-simple", "reg-chute-contrat"],
    },
    en: {
      slug: "contree-rules",
      linkLabel: "Contrée rules",
      title: "Contrée rules: everything you need to know",
      h1: "The rules of contrée",
      description:
        "The rules of contrée made simple: dealing, bidding from 80 to capot, following suit and ruffing, countering and re-countering, and scoring over 162 points.",
      lead: "Here are the <strong>rules of contrée</strong> in the order you actually need them at the table: deal, bid, play the tricks, count. The essentials, with nothing important left out.",
      sections: [
        {
          h2: "Dealing and how a deal unfolds",
          html: "<p>Four players, two teams, 32 cards. The dealer gives out the whole deck in the direction agreed at the table, 8 cards each, classically 3 then 2 then 3. After the auction, the player to the dealer's left leads the first trick. Everyone plays one card, the trick goes to the strongest according to the suit led and the trump, and its winner leads the next one. Eight tricks later the deal is over and you count.</p>",
        },
        {
          h2: "The auction and the contract",
          html: "<p>Each player in turn bids higher than the previous bid, or passes. A bid combines <strong>a point target</strong> (80 to 160, then capot) and <strong>a trump</strong>: a suit, or no-trump, or all-trump depending on table conventions. When three players pass in a row, the last bid becomes the contract.</p><p>The taking team must score <strong>at least</strong> the announced points. The defence has one job: stop them. If you judge the contract unmakeable, you can <strong>counter</strong> (coincher): the deal then counts <strong>x2</strong>, and <strong>x4</strong> after a surcoinche.</p>",
        },
        {
          h2: "Obligations during play",
          html: "<p>Three rules settle almost every dispute in contrée:</p><ul><li><strong>Follow the suit led</strong> if you hold a card in it.</li><li><strong>Ruff</strong> if you are void in the suit and an opponent is winning the trick. If your partner is winning it, you may usually discard instead.</li><li><strong>Overruff</strong>: when a trump has already been played and you ruff, you must play a higher trump if you have one.</li></ul><p>Breaking these obligations is a revoke, and the deal is lost by the offender under whichever convention the table uses. The detail is in <a href=\"/regles-coinche.html\">the complete rules</a>.</p>",
        },
        {
          h2: "Counting and checking the contract",
          html: "<p>A deal is worth <strong>162 points</strong>: 152 in the cards and <strong>10 for the last trick</strong>. Add <strong>20</strong> for belote, the King and Queen of trumps in the same hand. A <strong>capot</strong> bid and made is worth <strong>250</strong>. Then compare the total scored with the contract: reach it and it is made; fall short and it fails, with the points going to the defence. The card-by-card scale is on <a href=\"/valeur-cartes-coinche.html\">card values</a>.</p>",
        },
        {
          h2: "What changes from table to table",
          html: "<p>Contrée is played with local conventions: declared melds (sequences, four of a kind), how a silent capot counts, the target that ends the match, who speaks after a counter. None of it is dramatic, provided you settle it <em>before</em> the first deal. If a doubt arises mid-game, rule for the current deal and write the convention down for later.</p>",
        },
      ],
      faq: [
        { q: "What are the basic rules of contrée?", a: "Four players in two teams, 32 cards, 8 tricks. You bid from 80 to capot while naming a trump, then play by following the suit led, ruffing when an opponent is winning, and overruffing when you can. A deal is worth 162 points." },
        { q: "Can any contract be countered in contrée?", a: "Yes, the defence can counter the announced contract, which doubles the deal's points. The taking team may then re-counter (surcoinche), which quadruples them." },
        { q: "What happens if the contract fails?", a: "The taking team scores nothing for the deal and the points go to the defence, following the agreed scale, doubled after a counter and quadrupled after a re-counter." },
      ],
      related: ["ctr-pilier", "ctr-points", "ctr-jouer", "reg-fournir-couleur", "reg-obligation-couper", "reg-monter-atout", "deb-regles-simplifiees", "res-regle-simple", "reg-chute-contrat"],
    },
  },

  {
    id: "ctr-jouer",
    priority: 0.7,
    fr: {
      slug: "jouer-a-la-contree-en-ligne",
      linkLabel: "Jouer à la contrée en ligne",
      title: "Jouer à la contrée en ligne (gratuitement)",
      h1: "Jouer à la contrée en ligne, gratuitement",
      description:
        "Jouer à la contrée en ligne gratuitement, dans le navigateur et sans inscription : des IA de plusieurs niveaux, un coach qui explique chaque coup et des exercices.",
      lead: "Envie de <strong>jouer à la contrée</strong> tout de suite, sans chercher trois partenaires ? Une table t'attend dans ton navigateur, gratuitement et sans créer de compte.",
      sections: [
        {
          h2: "Une partie de contrée en trois clics",
          html: "<p>Sur <a href=\"/\">Coincheur</a>, tu ouvres la page, tu choisis le niveau des adversaires et tu joues. Pas d'inscription, pas d'application à installer, pas de publicité intrusive au milieu d'une donne. Ça marche sur ordinateur comme sur téléphone, et tu peux ajouter le site à ton écran d'accueil pour le retrouver comme une appli.</p>",
        },
        {
          h2: "Des adversaires à ta mesure",
          html: "<p>Les trois autres joueurs sont des <strong>IA paramétrables</strong>. Au niveau le plus bas, elles pardonnent les erreurs de débutant : idéal pour prendre le pli des enchères et de l'atout. Aux niveaux élevés, un moteur d'évaluation costaud enchaîne les coupes et te punit dès que tu laisses filer un pli. Comme elles jouent vite, tu peux enchaîner beaucoup plus de donnes qu'à une table physique.</p>",
        },
        {
          h2: "Un coach qui explique tes choix",
          html: "<p>C'est la vraie différence avec une simple table en ligne : un <strong>coach</strong> commente tes décisions, avant l'annonce comme au moment de poser une carte. Il te dit pourquoi ton 100 à coeur était optimiste, pourquoi cette entame offrait un pli à l'adversaire, et quand il fallait garder la der. Tu progresses en jouant, sans avoir à décortiquer tes parties tout seul.</p>",
        },
        {
          h2: "Ce que tu peux régler avant de lancer",
          html: "<p>Avant la première donne, tu choisis le <strong>niveau des adversaires</strong>, le total qui met fin à la partie (1000 ou 1500 points, par exemple) et les conventions que tu pratiques chez toi, comme le sans-atout et le tout-atout. Autrement dit, tu retrouves ta contrée, pas une version standardisée qui te dérouterait. Et si tu veux juste enchaîner des donnes rapides pour tester une idée d'enchère, rien ne t'oblige à aller au bout de la partie.</p>",
        },
        {
          h2: "Débuter, réviser, s'entraîner",
          html: "<p>Si tu découvres le jeu, commence par les <a href=\"/regles-de-la-contree.html\">règles de la contrée</a> et le <a href=\"/points-de-la-contree.html\">barème des points</a>, puis lance une partie sans pression. Si tu joues déjà en famille ou au café, sers-toi des <strong>exercices ciblés</strong> (enchères, entames, comptage) pour travailler ce qui te coûte des donnes. Pour les grands principes, <a href=\"/strategie-coinche.html\">la page stratégie</a> reste ta référence.</p><p>Prêt ? <a href=\"/\">Lance une partie de contrée maintenant</a>.</p>",
        },
      ],
      faq: [
        { q: "Peut-on jouer à la contrée gratuitement en ligne ?", a: "Oui. Sur Coincheur, la contrée se joue gratuitement dans le navigateur, sans inscription et sans installation, contre des IA de plusieurs niveaux." },
        { q: "Faut-il créer un compte pour jouer ?", a: "Non, aucun compte n'est nécessaire : tu ouvres la page et tu joues immédiatement." },
        { q: "Est-ce que je peux jouer à la contrée sur téléphone ?", a: "Oui, le site est pensé pour mobile comme pour ordinateur, et tu peux l'ajouter à ton écran d'accueil pour le lancer comme une application." },
      ],
      related: ["ctr-pilier", "ctr-regles", "ctr-points", "bc-jouer-en-ligne", "prat-jouer-en-ligne", "prat-jouer-contre-ia", "prat-jouer-mobile", "prat-entrainement-exercices"],
    },
    en: {
      slug: "play-contree-online",
      linkLabel: "Play contrée online",
      title: "Play contrée online (for free)",
      h1: "Play contrée online, for free",
      description:
        "Play contrée online for free, in your browser and with no signup: AIs of several levels, a coach that explains every move, and targeted drills to improve.",
      lead: "Want to <strong>play contrée</strong> right now without rounding up three partners? A table is waiting in your browser, free and with no account to create.",
      sections: [
        {
          h2: "A game of contrée in three clicks",
          html: "<p>On <a href=\"/?lang=en\">Coincheur</a> you open the page, pick your opponents' level and play. No signup, no app to install, no intrusive ad in the middle of a deal. It works on desktop and on phones, and you can add the site to your home screen to reopen it like an app.</p>",
        },
        {
          h2: "Opponents that match your level",
          html: "<p>The other three players are <strong>tunable AIs</strong>. At the lowest setting they forgive beginner mistakes, which is ideal while you get used to bidding and choosing a trump. At the top settings a serious evaluation engine strings ruffs together and punishes every trick you let slip. Because they play fast, you get through far more deals than at a physical table.</p>",
        },
        {
          h2: "A coach that explains your choices",
          html: "<p>This is the real difference from a plain online table: a <strong>coach</strong> comments on your decisions, both when bidding and when playing a card. It tells you why your 100 in hearts was optimistic, why that opening lead handed a trick to the opponents, and when you should have kept the last trick. You improve while playing, without having to pick your games apart alone.</p>",
        },
        {
          h2: "What you can set before you start",
          html: "<p>Before the first deal you pick the <strong>opponents' level</strong>, the total that ends the match (1000 or 1500 points, say) and the conventions you actually play at home, such as no-trump and all-trump. In other words you get your own contrée back, not a standardised version that would throw you off. And if you only want a few quick deals to test a bidding idea, nothing forces you to play the match to its end.</p>",
        },
        {
          h2: "Start, revise, drill",
          html: "<p>New to the game? Begin with the <a href=\"/en/contree-rules.html\">rules of contrée</a> and the <a href=\"/en/contree-points.html\">scoring scale</a>, then start a relaxed game. Already playing with family or at the café? Use the <strong>targeted drills</strong> (bidding, opening leads, counting) to work on what actually costs you deals. For the broader principles, <a href=\"/strategie-coinche.html\">the strategy page</a> stays your reference.</p><p>Ready? <a href=\"/?lang=en\">Start a game of contrée now</a>.</p>",
        },
      ],
      faq: [
        { q: "Can you play contrée online for free?", a: "Yes. On Coincheur, contrée is played free in the browser, with no signup and no installation, against AIs of several levels." },
        { q: "Do I need an account to play?", a: "No account is required: you open the page and start playing right away." },
        { q: "Can I play contrée on a phone?", a: "Yes, the site is built for mobile as well as desktop, and you can add it to your home screen to launch it like an app." },
      ],
      related: ["ctr-pilier", "ctr-regles", "ctr-points", "bc-jouer-en-ligne", "prat-jouer-en-ligne", "prat-jouer-contre-ia", "prat-jouer-mobile", "prat-entrainement-exercices"],
    },
  },

  {
    id: "ctr-points",
    priority: 0.65,
    fr: {
      slug: "points-de-la-contree",
      linkLabel: "Les points à la contrée",
      title: "Les points à la contrée : barème et comptage",
      h1: "Les points à la contrée",
      description:
        "Le barème des points à la contrée : valeurs des cartes à l'atout et à la couleur, 162 points par donne (152 + 10 de der), belote 20, capot 250, contre ×2 et surcontre ×4.",
      lead: "À la contrée, tout se joue sur <strong>162 points</strong> par donne. Voici les valeurs à connaître et la méthode pour compter vite, sans te tromper de colonne.",
      sections: [
        {
          h2: "La valeur des cartes à l'atout",
          html: "<p>À l'atout, le Valet et le 9 passent devant l'As : c'est la particularité qui déroute les nouveaux joueurs.</p><table><tr><th>Carte</th><th>Points</th></tr><tr><td>Valet</td><td><strong>20</strong></td></tr><tr><td>9</td><td><strong>14</strong></td></tr><tr><td>As</td><td>11</td></tr><tr><td>10</td><td>10</td></tr><tr><td>Roi</td><td>4</td></tr><tr><td>Dame</td><td>3</td></tr><tr><td>8 et 7</td><td>0</td></tr></table>",
        },
        {
          h2: "La valeur des cartes à la couleur",
          html: "<p>Hors atout, l'ordre redevient classique et le Valet ne vaut plus que 2 points.</p><table><tr><th>Carte</th><th>Points</th></tr><tr><td>As</td><td><strong>11</strong></td></tr><tr><td>10</td><td>10</td></tr><tr><td>Roi</td><td>4</td></tr><tr><td>Dame</td><td>3</td></tr><tr><td>Valet</td><td>2</td></tr><tr><td>9, 8 et 7</td><td>0</td></tr></table><p>Le tableau complet, ordres de force compris, est sur <a href=\"/valeur-cartes-coinche.html\">la valeur des cartes</a>.</p>",
        },
        {
          h2: "Pourquoi une donne vaut 162 points",
          html: "<p>Additionne toutes les cartes d'une donne : tu obtiens <strong>152 points</strong>. On ajoute <strong>10 de der</strong>, le bonus attribué à l'équipe qui remporte le <strong>dernier pli</strong>. Total : <strong>162</strong>. Ces 10 points font basculer beaucoup de contrats serrés, alors garde de quoi prendre la der.</p><p>Deux bonus s'ajoutent au-dessus de ce total :</p><ul><li><strong>Belote</strong> : Roi et Dame d'atout dans la même main, <strong>20 points</strong>, à annoncer en posant les deux cartes.</li><li><strong>Capot</strong> : les 8 plis pour la même équipe, <strong>250 points</strong> quand il a été annoncé.</li></ul>",
        },
        {
          h2: "Contre et surcontre : ×2 et ×4",
          html: "<p>Quand la défense contre le contrat, les points de la donne comptent <strong>double (×2)</strong>. Si l'équipe qui a pris surcontre, ils comptent <strong>quadruple (×4)</strong>. Ce multiplicateur s'applique au résultat de la donne, donc une chute contrée coûte très cher : c'est le principal accélérateur de partie à la contrée.</p>",
        },
        {
          h2: "Compter vite en fin de donne",
          html: "<p>La méthode la plus sûre : compte les points de <strong>ton</strong> tas, puis déduis ceux de l'adversaire par 162 moins ton total, plutôt que de compter deux fois. Regroupe les cartes par paquets de 10 (un As et une Dame font presque 14, deux 10 font 20) : tu iras deux fois plus vite. Vérifie enfin le contrat annoncé : atteint, il est tenu ; en dessous, il chute. Pour t'entraîner sans papier, <a href=\"/\">joue une donne sur Coincheur</a>, le comptage est fait sous tes yeux.</p>",
        },
      ],
      faq: [
        { q: "Combien de points y a-t-il dans une donne de contrée ?", a: "162 points : 152 contenus dans les cartes et 10 de der pour le dernier pli. La belote et le capot s'ajoutent selon la donne." },
        { q: "Combien vaut la belote à la contrée ?", a: "20 points, pour le Roi et la Dame d'atout réunis dans la même main. Il faut l'annoncer au moment où on pose les deux cartes." },
        { q: "Que rapporte un capot à la contrée ?", a: "Un capot annoncé et réussi, c'est-à-dire les 8 plis pour la même équipe, vaut 250 points. S'il chute, ces points partent à la défense." },
      ],
      related: ["ctr-pilier", "ctr-regles", "ctr-vocabulaire", "prat-valeurs-tableau", "lex-dix-de-der", "lex-capot", "deb-compter-points", "prat-compter-rapide", "reg-chute-contrat"],
    },
    en: {
      slug: "contree-points",
      linkLabel: "Contrée points",
      title: "Contrée points: the full scoring scale",
      h1: "Contrée points and scoring",
      description:
        "Contrée scoring: card values in trumps and in plain suits, 162 points per deal (152 + 10 for the last trick), belote 20, capot 250, counter x2 and re-counter x4.",
      lead: "In contrée everything is decided over <strong>162 points</strong> per deal. Here are the values to know and a method to count them fast, without mixing up columns.",
      sections: [
        {
          h2: "Card values in the trump suit",
          html: "<p>In trumps, the Jack and the 9 outrank the Ace, the quirk that throws new players off.</p><table><tr><th>Card</th><th>Points</th></tr><tr><td>Jack</td><td><strong>20</strong></td></tr><tr><td>9</td><td><strong>14</strong></td></tr><tr><td>Ace</td><td>11</td></tr><tr><td>10</td><td>10</td></tr><tr><td>King</td><td>4</td></tr><tr><td>Queen</td><td>3</td></tr><tr><td>8 and 7</td><td>0</td></tr></table>",
        },
        {
          h2: "Card values in plain suits",
          html: "<p>Outside trumps the order goes back to normal and the Jack is worth only 2 points.</p><table><tr><th>Card</th><th>Points</th></tr><tr><td>Ace</td><td><strong>11</strong></td></tr><tr><td>10</td><td>10</td></tr><tr><td>King</td><td>4</td></tr><tr><td>Queen</td><td>3</td></tr><tr><td>Jack</td><td>2</td></tr><tr><td>9, 8 and 7</td><td>0</td></tr></table><p>The complete table, ranking orders included, is on <a href=\"/valeur-cartes-coinche.html\">card values</a>.</p>",
        },
        {
          h2: "Why a deal is worth 162 points",
          html: "<p>Add up every card in a deal and you get <strong>152 points</strong>. On top of that comes the <strong>10 de der</strong>, the bonus awarded to the team that wins the <strong>last trick</strong>. Total: <strong>162</strong>. Those 10 points swing plenty of tight contracts, so keep something to take the last trick with.</p><p>Two bonuses sit above that total:</p><ul><li><strong>Belote</strong>: King and Queen of trumps in the same hand, <strong>20 points</strong>, declared as you play the two cards.</li><li><strong>Capot</strong>: all 8 tricks for one team, <strong>250 points</strong> when it was bid.</li></ul>",
        },
        {
          h2: "Counter and re-counter: x2 and x4",
          html: "<p>When the defence counters the contract, the deal's points count <strong>double (x2)</strong>. If the taking team re-counters, they count <strong>quadruple (x4)</strong>. The multiplier applies to the deal's result, so a countered failure is brutally expensive: it is the main accelerator in a game of contrée.</p>",
        },
        {
          h2: "Counting fast at the end of a deal",
          html: "<p>The safest method: count the points in <strong>your</strong> pile, then get the opponents' by subtracting from 162, rather than counting twice. Group cards into tens (an Ace and a Queen make nearly 14, two tens make 20) and you will go twice as fast. Finally compare with the contract bid: reach it and it is made, fall short and it fails. To practise without pen and paper, <a href=\"/?lang=en\">play a deal on Coincheur</a>, where the count happens in front of you.</p>",
        },
      ],
      faq: [
        { q: "How many points are there in a contrée deal?", a: "162 points: 152 held in the cards and 10 for winning the last trick. Belote and capot are added on top depending on the deal." },
        { q: "How much is belote worth in contrée?", a: "20 points, for holding the King and Queen of trumps in the same hand. You must declare it as you play the two cards." },
        { q: "What does a capot score in contrée?", a: "A capot that was bid and made, meaning all 8 tricks for one team, is worth 250 points. If it fails, those points go to the defence." },
      ],
      related: ["ctr-pilier", "ctr-regles", "ctr-vocabulaire", "prat-valeurs-tableau", "lex-dix-de-der", "lex-capot", "deb-compter-points", "prat-compter-rapide", "reg-chute-contrat"],
    },
  },

  {
    id: "ctr-vocabulaire",
    priority: 0.6,
    fr: {
      slug: "contree-ou-coinche-quel-nom",
      linkLabel: "Contrée ou coinche ?",
      title: "Contrée ou coinche : pourquoi deux noms ?",
      h1: "Contrée ou coinche : pourquoi deux noms ?",
      description:
        "Contrée, coinche, belote contrée, belote coinchée : d'où viennent ces noms, où les emploie-t-on en France, et pourquoi ils désignent le même jeu de cartes.",
      lead: "Tu dis « contrée », ton cousin dit « coinche », et vous jouez pourtant exactement au même jeu. Voici <strong>d'où viennent ces noms</strong> et où on les entend.",
      sections: [
        {
          h2: "Deux mots, un seul verbe d'origine",
          html: "<p>Les deux noms décrivent la même action : <strong>défier le contrat adverse</strong>. « Contrer » vient du vocabulaire des jeux de cartes classiques, « coincher » est une forme régionale du même geste. De là viennent « belote contrée » et « belote coinchée », deux façons de dire « belote où l'on peut contrer ». Avec l'usage, chacun a raccourci de son côté : <strong>la contrée</strong> ici, <strong>la coinche</strong> là.</p>",
        },
        {
          h2: "La géographie des appellations",
          html: "<ul><li><strong>Contrée</strong> : très répandue dans le Sud, de Marseille à Toulouse, en Provence et sur le pourtour méditerranéen. Beaucoup de joueurs du Midi n'utilisent jamais le mot « coinche ».</li><li><strong>Coinche</strong> : plus courante dans le Nord, l'Est, la région lyonnaise et en Suisse romande, où le <em>chibre</em> désigne une variante voisine.</li><li><strong>Belote contrée</strong> ou <strong>belote coinchée</strong> : les formes complètes, qu'on retrouve dans les clubs, les tournois et les livres de règles.</li></ul><p>Ces frontières restent floues et bougent avec les déménagements. Notre page <a href=\"/coinche-noms-regionaux.html\">les noms régionaux de la coinche</a> détaille les zones et les variantes locales.</p>",
        },
        {
          h2: "Est-ce que les règles changent avec le nom ?",
          html: "<p>Non. Que tu dises contrée ou coinche, tu joues à 4 avec 32 cartes, tu enchéris de 80 au capot, tu annonces l'atout et tu comptes 162 points par donne. Ce qui change d'une table à l'autre, ce sont les <strong>conventions locales</strong> : annonces déclarées, capot non annoncé, seuil de fin de partie. Elles varient de village en village, pas de nom en nom. La comparaison détaillée est sur <a href=\"/coinche-vs-contree.html\">coinche, contrée et belote : les différences</a>, et la vue d'ensemble sur <a href=\"/belote-contree.html\">la belote contrée</a>.</p>",
        },
        {
          h2: "Quel nom utiliser, et pourquoi ça compte",
          html: "<p>Le plus simple : garde le mot de ta table. Si tu cherches des ressources en ligne, essaie les deux, car beaucoup de guides ne sont écrits que sous un seul nom et tu passerais à côté de la moitié du contenu. Et si tu apprends le jeu à quelqu'un du Sud, dis « la contrée » : c'est le mot qu'il connaît. Pour la pratique, <a href=\"/\">le jeu est le même sur Coincheur</a>, quel que soit le nom que tu lui donnes.</p>",
        },
      ],
      faq: [
        { q: "Contrée et coinche, c'est le même jeu ?", a: "Oui, exactement le même. Ce sont deux noms régionaux pour une belote à enchères où l'on peut contrer le contrat adverse. Seules les conventions de table varient, pas le nom." },
        { q: "Où dit-on « contrée » plutôt que « coinche » ?", a: "Surtout dans le Sud de la France : Provence, région marseillaise, Languedoc et pourtour méditerranéen. « Coinche » s'entend davantage au Nord, à l'Est et en Suisse romande." },
        { q: "D'où vient le mot « contrée » ?", a: "Du verbe contrer : la défense peut contrer le contrat annoncé et doubler les points de la donne. « Coincher » est la forme régionale du même geste, d'où « belote coinchée »." },
      ],
      related: ["ctr-pilier", "ctr-regles", "ctr-points", "res-noms-regionaux", "cmp-belote-contree", "var-belote-coinchee", "var-marseillaise", "res-provencale", "var-chibre"],
    },
    en: {
      slug: "contree-or-coinche-naming",
      linkLabel: "Contrée or coinche?",
      title: "Contrée or coinche: why two names?",
      h1: "Contrée or coinche: why two names?",
      description:
        "Contrée, coinche, belote contrée, belote coinchée: where these names come from, which regions of France use them, and why they all mean the same card game.",
      lead: "You say « contrée », your cousin says « coinche », and yet you play exactly the same game. Here is <strong>where the names come from</strong> and where each is heard.",
      sections: [
        {
          h2: "Two words, one original verb",
          html: "<p>Both names describe the same act: <strong>challenging the opposing contract</strong>. « Contrer » (to counter) comes from mainstream card-game vocabulary, while « coincher » is a regional form of the same move. Hence « belote contrée » and « belote coinchée », two ways of saying « the belote where you may counter ». Over time each region shortened its own version: <strong>la contrée</strong> here, <strong>la coinche</strong> there.</p>",
        },
        {
          h2: "The geography of the names",
          html: "<ul><li><strong>Contrée</strong>: widespread in the South, from Marseille to Toulouse, across Provence and the Mediterranean coast. Plenty of southern players never say « coinche » at all.</li><li><strong>Coinche</strong>: more common in the North, the East, around Lyon and in French-speaking Switzerland, where <em>chibre</em> names a close cousin.</li><li><strong>Belote contrée</strong> or <strong>belote coinchée</strong>: the full forms, found in clubs, tournaments and rule books.</li></ul><p>These borders are blurry and shift as people move. Our page on <a href=\"/coinche-noms-regionaux.html\">regional names of coinche</a> maps the areas and local variants.</p>",
        },
        {
          h2: "Do the rules change with the name?",
          html: "<p>No. Whether you call it contrée or coinche, you play four-handed with 32 cards, bid from 80 to capot, name the trump and count 162 points a deal. What does change from table to table are the <strong>local conventions</strong>: declared melds, how a silent capot counts, the match target. Those vary from village to village, not from name to name. The detailed comparison is on <a href=\"/coinche-vs-contree.html\">coinche, contrée and belote: the differences</a>, and the overview on <a href=\"/belote-contree.html\">contract belote</a>.</p>",
        },
        {
          h2: "Which name to use, and why it matters",
          html: "<p>Simplest rule: keep the word your table uses. When searching online, try both, because many guides exist under only one name and you would miss half the material. And if you are teaching someone from the South, say « la contrée »: that is the word they know. For practice, <a href=\"/?lang=en\">the game is the same on Coincheur</a>, whichever name you give it.</p>",
        },
      ],
      faq: [
        { q: "Are contrée and coinche the same game?", a: "Yes, exactly the same. They are two regional names for a bidding belote in which you may counter the opposing contract. Only table conventions vary, never because of the name." },
        { q: "Where do people say « contrée » rather than « coinche »?", a: "Mostly in the South of France: Provence, the Marseille area, Languedoc and the Mediterranean coast. « Coinche » is heard more in the North, the East and French-speaking Switzerland." },
        { q: "Where does the word « contrée » come from?", a: "From the verb contrer, to counter: the defence can counter the announced contract and double the deal's points. « Coincher » is the regional form of the same move, hence « belote coinchée »." },
      ],
      related: ["ctr-pilier", "ctr-regles", "ctr-points", "res-noms-regionaux", "cmp-belote-contree", "var-belote-coinchee", "var-marseillaise", "res-provencale", "var-chibre"],
    },
  },
];
