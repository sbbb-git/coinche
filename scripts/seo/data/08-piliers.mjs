// Catégorie : Pages piliers (mots-clés tête, maillage pilier -> cluster).
// Chaque pilier survole un grand thème et renvoie vers les articles longue-traîne
// (enc-*, jeu-*, deb-*, prat-*, reg-*, var-*, lex-*, cmp-*) du cluster.

export const category = {
  fr: "Guides complets (stratégie & progression)",
  en: "Complete guides (strategy & progress)",
};

export default [
  // ────────────────────────────────────────────────────────────────────────
  // 1) PILIER STRATÉGIE
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "pil-strategie",
    priority: 0.8,
    fr: {
      slug: "strategie-coinche",
      linkLabel: "Stratégie à la coinche",
      title: "Stratégie à la coinche : le guide complet",
      h1: "Stratégie à la coinche : le guide complet",
      description:
        "Le guide complet de la stratégie coinche : enchères, choix de l'atout, entame, gestion des atouts, défense et der. Tout pour penser ta donne du début à la fin.",
      lead: "La <strong>stratégie à la coinche</strong> se joue sur deux fronts : les enchères, où tu fixes l'objectif, et le jeu de la carte, où tu le réalises. Ce guide relie les deux et te renvoie vers les articles détaillés de chaque sujet.",
      sections: [
        {
          h2: "Les deux moitiés de la stratégie coinche",
          html: "<p>Une donne se gagne d'abord aux <strong>enchères</strong>, puis à la carte. Beaucoup de joueurs soignent l'une et négligent l'autre&nbsp;: un contrat surévalué chute même bien joué, et un contrat juste se perd si on entame de travers. La bonne stratégie coinche, c'est de penser la donne <em>en entier</em> dès l'annonce : « Si je prends à 100 à pique, comment vais-je faire mes plis&nbsp;? »</p><p>Rappelle-toi le décor : une donne vaut <strong>162 points</strong> (152 + 10 de der), la belote (Roi + Dame d'atout) ajoute 20, et un capot annoncé vaut 250. Coincher double l'enjeu (×2), surcoincher le quadruple (×4). Tout ton plan tourne autour de ces chiffres.</p>",
        },
        {
          h2: "Bien enchérir : la base de tout",
          html: "<p>Avant d'annoncer, <strong>évalue ta main</strong> honnêtement : atouts maîtres, as de côté, longueurs. Le palier d'ouverture classique tourne autour de 80, mais rien n'est dogmatique : avec un partenaire qui a déjà parlé, tu montes plus vite ; seul face au silence, tu restes prudent.</p><ul><li><strong>Quand ouvrir</strong> et à quelle hauteur démarrer.</li><li><strong>Choisir la couleur d'atout</strong> selon ta distribution, pas seulement selon le nombre de cartes.</li><li><strong>Soutenir ou monter</strong> au-dessus de ton partenaire sans le couvrir inutilement.</li><li><strong>Coincher</strong> quand l'adversaire a clairement surévalué, <strong>passer</strong> quand le doute domine.</li></ul><p>Chacun de ces choix a son article dédié, mais commence par l'évaluation de main, c'est la compétence qui rapporte le plus vite.</p>",
        },
        {
          h2: "Bien jouer la carte : transformer l'annonce en plis",
          html: "<p>Une fois le contrat fixé, la stratégie change de nature. Le preneur cherche souvent à <strong>tirer les atouts</strong> pour sécuriser ses maîtres, mais pas toujours : garder un atout pour couper peut rapporter davantage. La défense, elle, cherche à faire chuter, à monter aux points et à garder la der.</p><table><tr><th>Si tu es preneur</th><th>Si tu défends</th></tr><tr><td>Compter tes plis sûrs avant de jouer</td><td>Compter les points adverses qu'il reste à empêcher</td></tr><tr><td>Tirer ou garder les atouts selon le plan</td><td>Couper, monter aux points, ne pas gâcher tes maîtres</td></tr><tr><td>Garder une carte pour le 10 de der</td><td>Voler la der quand le contrat est serré</td></tr></table>",
        },
        {
          h2: "Entame, signalisation et lecture du jeu",
          html: "<p>L'<strong>entame</strong> donne le ton : entamer atout, sous un as, ou dans la couleur du partenaire change tout le déroulé. La <strong>signalisation</strong> (jouer petit ou fort pour informer ton partenaire) transforme deux mains isolées en une vraie équipe. Et compter les atouts tombés te dit quand tes maîtres deviennent imprenables.</p><p>Ces réflexes ne sont pas des recettes rigides : un bon joueur lit la table, repère qui a coupé quoi, et adapte. C'est exactement ce qu'on travaille en jouant et en analysant ses donnes.</p>",
        },
        {
          h2: "Mettre la stratégie en pratique",
          html: "<p>On ne progresse pas en lisant seulement : il faut <strong>jouer beaucoup de donnes</strong> et regarder ce qui a marché. Sur <a href=\"/\">Coincheur</a>, tu joues gratuitement contre des IA paramétrables, avec un coach et des exercices pour tester tes enchères et ton jeu de la carte. Vois ce guide comme une carte : chaque lien ci-dessous ouvre un sujet précis à approfondir.</p>",
        },
      ],
      faq: [
        { q: "Par quoi commencer pour progresser en stratégie à la coinche ?", a: "Par l'évaluation de la main aux enchères. Savoir estimer correctement ce que ta main peut faire évite les contrats surévalués qui chutent, et c'est la compétence qui fait gagner le plus de points rapidement." },
        { q: "Faut-il toujours tirer les atouts quand on est preneur ?", a: "Non. Tirer les atouts sécurise tes cartes maîtresses, mais garder un atout pour couper une couleur adverse rapporte parfois plus. Tout dépend de ta main et du contrat : c'est un choix, pas une règle automatique." },
        { q: "La stratégie compte-t-elle plus aux enchères ou au jeu de la carte ?", a: "Les deux sont indissociables. Une bonne enchère mal jouée chute, et un jeu parfait sur un contrat surévalué perd quand même. La vraie stratégie consiste à penser la donne entière dès l'annonce." },
      ],
      related: [
        "enc-evaluer-main",
        "enc-ouvrir-80",
        "enc-choisir-atout",
        "enc-coincher",
        "enc-soutenir-partenaire",
        "jeu-choisir-entame",
        "jeu-tirer-atouts",
        "jeu-defendre-pris",
        "jeu-signaler-partenaire",
        "jeu-garder-der",
        "jeu-compter-atouts",
        "pil-bien-jouer",
        "pil-gagner",
      ],
    },
    en: {
      slug: "coinche-strategy",
      linkLabel: "Coinche strategy",
      title: "Coinche strategy: the complete guide",
      h1: "Coinche strategy: the complete guide",
      description:
        "The complete coinche strategy guide: bidding, choosing trump, the lead, managing trumps, defence and the last trick. Everything to plan a deal from start to finish.",
      lead: "<strong>Coinche strategy</strong> plays out on two fronts: the auction, where you set the goal, and the card play, where you deliver it. This guide links the two and points you to the detailed article for each topic.",
      sections: [
        {
          h2: "The two halves of coinche strategy",
          html: "<p>A deal is won first in the <strong>auction</strong>, then at the table. Many players polish one and neglect the other: an overbid contract fails even when well played, and a sound contract is lost with a careless lead. Good coinche strategy means thinking through the <em>whole</em> deal from the moment you bid: \"If I take this at 100 in spades, how will I make my tricks?\"</p><p>Keep the scoreboard in mind: a deal is worth <strong>162 points</strong> (152 + 10 for the last trick), belote (King + Queen of trumps) adds 20, and a bid capot is worth 250. A coinche doubles the stakes (×2), a surcoinche quadruples them (×4). Your whole plan revolves around these numbers.</p>",
        },
        {
          h2: "Bidding well: the foundation",
          html: "<p>Before you bid, <strong>evaluate your hand</strong> honestly: master trumps, side aces, long suits. The usual opening sits around 80, but nothing is dogmatic: with a partner who has already spoken you climb faster; alone against silence you stay cautious.</p><ul><li><strong>When to open</strong> and at what level to start.</li><li><strong>Choosing the trump suit</strong> based on shape, not just card count.</li><li><strong>Supporting or raising</strong> over your partner without overbidding them.</li><li><strong>Coinching</strong> when an opponent clearly overbid, <strong>passing</strong> when doubt prevails.</li></ul><p>Each of these has its own article, but start with hand evaluation, the skill that pays off fastest.</p>",
        },
        {
          h2: "Playing the cards: turning a bid into tricks",
          html: "<p>Once the contract is set, strategy shifts. The declarer often draws <strong>trumps</strong> to secure winners, but not always: keeping a trump to ruff can score more. The defence aims to set the contract, grab points and keep the last trick.</p><table><tr><th>If you are declarer</th><th>If you defend</th></tr><tr><td>Count your sure tricks before playing</td><td>Count the opponent points left to deny</td></tr><tr><td>Draw or keep trumps to fit the plan</td><td>Ruff, cash points, don't waste your winners</td></tr><tr><td>Keep a card for the last-trick bonus</td><td>Steal the last trick when the contract is tight</td></tr></table>",
        },
        {
          h2: "Lead, signalling and reading the table",
          html: "<p>The <strong>opening lead</strong> sets the tone: leading a trump, under an ace, or into your partner's suit changes the whole hand. <strong>Signalling</strong> (playing low or high to inform your partner) turns two separate hands into a real team. And counting the trumps that have fallen tells you when your winners become untouchable.</p><p>These are not rigid recipes: a good player reads the table, notes who ruffed what, and adapts. That is exactly what you build by playing and reviewing your deals.</p>",
        },
        {
          h2: "Putting strategy into practice",
          html: "<p>Reading alone won't do it: you need to <strong>play many deals</strong> and look at what worked. On <a href=\"/?lang=en\">Coincheur</a> you play coinche for free against tunable AIs, with a coach and exercises to test your bidding and card play. Treat this guide as a map: each link below opens a specific topic to dig into.</p>",
        },
      ],
      faq: [
        { q: "Where should I start to improve my coinche strategy?", a: "With hand evaluation in the auction. Estimating correctly what your hand can do avoids overbid contracts that fail, and it is the skill that gains the most points fastest." },
        { q: "Should the declarer always draw trumps?", a: "No. Drawing trumps secures your winners, but keeping a trump to ruff an opponent's suit sometimes scores more. It depends on your hand and the contract: it is a choice, not an automatic rule." },
        { q: "Does strategy matter more in the bidding or the card play?", a: "The two are inseparable. A good bid played badly fails, and perfect play on an overbid contract still loses. Real strategy is thinking through the entire deal from the bid." },
      ],
      related: [
        "enc-evaluer-main",
        "enc-ouvrir-80",
        "enc-choisir-atout",
        "enc-coincher",
        "enc-soutenir-partenaire",
        "jeu-choisir-entame",
        "jeu-tirer-atouts",
        "jeu-defendre-pris",
        "jeu-signaler-partenaire",
        "jeu-garder-der",
        "jeu-compter-atouts",
        "pil-bien-jouer",
        "pil-gagner",
      ],
    },
  },

  // ────────────────────────────────────────────────────────────────────────
  // 2) PILIER PROGRESSER
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "pil-progresser",
    priority: 0.8,
    fr: {
      slug: "devenir-bon-coinche",
      linkLabel: "Devenir bon à la coinche",
      title: "Comment devenir bon (et progresser) à la coinche",
      h1: "Comment devenir bon et progresser à la coinche",
      description:
        "Une méthode pour devenir bon à la coinche : s'entraîner régulièrement, analyser ses parties, compter les cartes et corriger ses erreurs. Du débutant au joueur confirmé.",
      lead: "<strong>Devenir bon à la coinche</strong> n'a rien d'un don : c'est une méthode. Jouer souvent, analyser ses donnes, compter les cartes et corriger ses erreurs récurrentes : voici comment progresser pas à pas.",
      sections: [
        {
          h2: "Pose les fondations d'abord",
          html: "<p>On ne progresse pas sur des bases bancales. Avant de viser le jeu fin, assure-toi de maîtriser l'essentiel : <strong>les règles</strong>, la valeur des cartes (à l'atout, le Valet vaut 20 et le 9 en vaut 14&nbsp;; hors atout l'As vaut 11) et le comptage des points jusqu'aux 162 d'une donne. Tant que compter une donne te demande un effort, ton cerveau n'est pas disponible pour la stratégie.</p><p>Si tu débutes vraiment, commence par savoir <em>comment jouer</em> et par éliminer les <em>erreurs fréquentes</em> : ce sont les liens « débutant » ci-dessous.</p>",
        },
        {
          h2: "Joue beaucoup, mais joue exprès",
          html: "<p>Le volume compte, mais le volume <strong>réfléchi</strong> compte dix fois plus. Plutôt que d'enchaîner machinalement, fixe-toi un objectif par session : « cette fois, je compte les atouts tombés » ou « je teste l'entame atout ». Tu transformes chaque partie en petit laboratoire.</p><ul><li><strong>S'entraîner régulièrement</strong>, par sessions courtes et ciblées.</li><li><strong>Faire des exercices</strong> sur un point précis (enchères, défense, comptage).</li><li><strong>Jouer contre l'ordinateur</strong> pour répéter sans pression et tester des idées.</li></ul>",
        },
        {
          h2: "Analyse tes parties",
          html: "<p>Le vrai accélérateur, c'est l'<strong>analyse</strong>. Après une donne perdue, demande-toi : l'enchère était-elle juste&nbsp;? L'entame&nbsp;? Ai-je tiré les atouts trop tôt&nbsp;? Tu apprends plus d'une donne disséquée que de dix donnes oubliées.</p><p>Repère tes <strong>erreurs récurrentes</strong> : beaucoup de joueurs perdent toujours sur le même schéma (surévaluer leur main, oublier la der, gâcher un maître). Corriger un seul de ces réflexes te fait gagner durablement.</p>",
        },
        {
          h2: "Apprends à compter les cartes",
          html: "<p>Compter, ce n'est pas mémoriser les 32 cartes d'un coup, c'est suivre l'essentiel : <strong>combien d'atouts sont tombés</strong>, quels as sont passés, qui s'est défaussé de quoi. Dès que tu sais qu'il ne reste plus d'atout chez l'adversaire, tes maîtres deviennent imprenables et ton jeu change radicalement.</p><p>Commence petit : compte seulement les atouts pendant quelques parties, puis ajoute les as. C'est une compétence qui s'entraîne, comme le reste.</p>",
        },
        {
          h2: "Une routine de progression simple",
          html: "<table><tr><th>Niveau</th><th>Sur quoi travailler</th></tr><tr><td>Débutant</td><td>Règles, valeur des cartes, comptage, premières parties</td></tr><tr><td>Intermédiaire</td><td>Évaluation de main, entame, tirer/garder les atouts</td></tr><tr><td>Confirmé</td><td>Signalisation, comptage des cartes, coinche au bon moment</td></tr></table><p>Tu peux suivre tout ce parcours gratuitement sur <a href=\"/\">Coincheur</a> : parties contre IA paramétrables, coach et exercices pour t'entraîner sur le point exact que tu travailles.</p>",
        },
      ],
      faq: [
        { q: "Combien de temps faut-il pour devenir bon à la coinche ?", a: "Cela dépend de ta méthode plus que des heures jouées. En jouant régulièrement, en analysant tes donnes et en corrigeant tes erreurs récurrentes, on progresse nettement en quelques semaines. Jouer sans jamais réfléchir à ses choix, en revanche, plafonne vite." },
        { q: "Faut-il vraiment compter les cartes pour bien jouer ?", a: "Pas tout, tout de suite. Commence par compter les atouts tombés, puis les as. Savoir quand l'adversaire n'a plus d'atout suffit déjà à transformer ton jeu. C'est une compétence qui s'entraîne progressivement." },
        { q: "Jouer contre l'ordinateur aide-t-il à progresser ?", a: "Oui, beaucoup. Tu joues sans pression, tu peux tester des idées et répéter une situation précise autant de fois que nécessaire. Avec un coach et des exercices, c'est l'un des moyens les plus efficaces de s'entraîner." },
      ],
      related: [
        "deb-comment-jouer",
        "deb-erreurs-frequentes",
        "deb-apprendre-rapidement",
        "deb-progresser",
        "deb-jouer-contre-ordinateur",
        "jeu-compter-atouts",
        "jeu-cartes-maitresses",
        "enc-evaluer-main",
        "prat-entrainement-exercices",
        "prat-jouer-contre-ia",
        "prat-compter-rapide",
        "pil-strategie",
        "pil-astuces",
      ],
    },
    en: {
      slug: "get-good-at-coinche",
      linkLabel: "Get good at coinche",
      title: "How to get good at (and improve at) coinche",
      h1: "How to get good at and improve at coinche",
      description:
        "A method to get good at coinche: practise regularly, review your games, count the cards and fix your recurring mistakes. From beginner to advanced player.",
      lead: "<strong>Getting good at coinche</strong> is no gift: it's a method. Play often, review your deals, count the cards and fix your recurring mistakes: here is how to improve step by step.",
      sections: [
        {
          h2: "Lay the foundations first",
          html: "<p>You can't build on shaky ground. Before aiming for subtle play, make sure you own the basics: <strong>the rules</strong>, card values (in trumps the Jack is worth 20 and the 9 is worth 14; off-trump the Ace is worth 11) and counting up to a deal's 162 points. As long as counting a deal takes effort, your brain has no room left for strategy.</p><p>If you are truly starting out, begin with <em>how to play</em> and with cutting out <em>common mistakes</em>: those are the beginner links below.</p>",
        },
        {
          h2: "Play a lot, but play on purpose",
          html: "<p>Volume matters, but <strong>deliberate</strong> volume matters ten times more. Instead of playing on autopilot, set one goal per session: \"this time I track the trumps that fall\" or \"I'll test the trump lead.\" Every game becomes a small lab.</p><ul><li><strong>Practise regularly</strong>, in short focused sessions.</li><li><strong>Do drills</strong> on one specific point (bidding, defence, counting).</li><li><strong>Play against the computer</strong> to rehearse without pressure and test ideas.</li></ul>",
        },
        {
          h2: "Review your games",
          html: "<p>The real accelerator is <strong>review</strong>. After a lost deal, ask: was the bid right? The lead? Did I draw trumps too early? You learn more from one dissected deal than from ten forgotten ones.</p><p>Spot your <strong>recurring mistakes</strong>: many players keep losing on the same pattern (overvaluing the hand, forgetting the last trick, wasting a winner). Fixing just one of these reflexes pays off for good.</p>",
        },
        {
          h2: "Learn to count the cards",
          html: "<p>Counting isn't memorising all 32 cards at once, it's tracking the essentials: <strong>how many trumps have fallen</strong>, which aces have gone, who discarded what. The moment you know the opponents are out of trumps, your winners become untouchable and your play changes completely.</p><p>Start small: count only trumps for a few games, then add the aces. It's a trainable skill, like the rest.</p>",
        },
        {
          h2: "A simple improvement routine",
          html: "<table><tr><th>Level</th><th>What to work on</th></tr><tr><td>Beginner</td><td>Rules, card values, counting, first games</td></tr><tr><td>Intermediate</td><td>Hand evaluation, the lead, drawing/keeping trumps</td></tr><tr><td>Advanced</td><td>Signalling, card counting, coinching at the right moment</td></tr></table><p>You can follow this whole path for free on <a href=\"/?lang=en\">Coincheur</a>: games against tunable AIs, a coach and exercises to drill the exact point you're working on.</p>",
        },
      ],
      faq: [
        { q: "How long does it take to get good at coinche?", a: "It depends on your method more than your hours. By playing regularly, reviewing your deals and fixing recurring mistakes, you improve noticeably within a few weeks. Playing without ever questioning your choices plateaus fast." },
        { q: "Do you really need to count cards to play well?", a: "Not everything at once. Start by counting the trumps that fall, then the aces. Just knowing when the opponents are out of trumps already transforms your play. It's a skill you build up gradually." },
        { q: "Does playing against the computer help you improve?", a: "Yes, a lot. You play without pressure, can test ideas and repeat a specific situation as often as needed. With a coach and exercises, it's one of the most effective ways to practise." },
      ],
      related: [
        "deb-comment-jouer",
        "deb-erreurs-frequentes",
        "deb-apprendre-rapidement",
        "deb-progresser",
        "deb-jouer-contre-ordinateur",
        "jeu-compter-atouts",
        "jeu-cartes-maitresses",
        "enc-evaluer-main",
        "prat-entrainement-exercices",
        "prat-jouer-contre-ia",
        "prat-compter-rapide",
        "pil-strategie",
        "pil-astuces",
      ],
    },
  },

  // ────────────────────────────────────────────────────────────────────────
  // 3) PILIER ASTUCES
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "pil-astuces",
    priority: 0.8,
    fr: {
      slug: "astuces-conseils-coinche",
      linkLabel: "Astuces et conseils",
      title: "Astuces et conseils à la coinche",
      h1: "Astuces et conseils à la coinche",
      description:
        "Nos meilleures astuces coinche : enchères, entame, atouts, défense, der, coinche. Une dizaine de conseils concrets et non dogmatiques, chacun expliqué en détail.",
      lead: "Voici une sélection d'<strong>astuces à la coinche</strong> qui font vraiment la différence. Ce ne sont pas des règles rigides : à toi de juger selon la donne. Chaque conseil renvoie vers l'article qui le détaille.",
      sections: [
        {
          h2: "Astuces pour les enchères",
          html: "<ul><li><strong>Évalue ta main avant d'annoncer.</strong> Compte tes maîtres et tes longueurs, pas seulement tes points théoriques. C'est l'astuce coinche numéro un.</li><li><strong>Ne surévalue pas ta main.</strong> Un contrat à 90 tenu vaut mieux qu'un 110 qui chute. En cas de doute, vise plus bas.</li><li><strong>Choisis l'atout selon ta distribution.</strong> Cinq petits atouts valent souvent mieux que trois gros : la longueur fait les coupes.</li><li><strong>Coinche quand l'adversaire a manifestement trop monté</strong>, mais pas par réflexe : un coinche raté double les points pour lui (×2).</li></ul>",
        },
        {
          h2: "Astuces pour l'entame et le début de donne",
          html: "<ul><li><strong>Réfléchis à ton entame.</strong> Entamer atout, sous un as ou dans la couleur du partenaire n'a pas le même effet : choisis selon le contrat.</li><li><strong>N'entame pas sous un as à la légère.</strong> Tu risques de l'offrir à une coupe. Parfois c'est juste, souvent c'est dangereux.</li><li><strong>Signale à ton partenaire.</strong> Jouer une grosse ou une petite carte n'est pas neutre : c'est ton seul moyen de « parler » pendant le jeu.</li></ul>",
        },
        {
          h2: "Astuces pour la gestion des atouts",
          html: "<ul><li><strong>Quand tu prends, demande-toi s'il faut tirer les atouts.</strong> Souvent oui pour protéger tes maîtres, mais garde-en un pour couper si ta main le réclame.</li><li><strong>Compte les atouts tombés.</strong> Dès qu'il n'en reste plus chez l'adversaire, tes cartes deviennent imprenables.</li><li><strong>Ne gâche pas tes cartes maîtresses.</strong> Joue-les quand elles rapportent, pas pour t'en débarrasser.</li></ul>",
        },
        {
          h2: "Astuces pour la défense et la fin de donne",
          html: "<ul><li><strong>En défense, joue pour faire chuter.</strong> Compte les points qu'il reste à prendre à l'adversaire et concentre-toi dessus.</li><li><strong>Garde la der.</strong> Ces 10 points décident souvent un contrat serré : conserve une carte gagnante pour le dernier pli.</li><li><strong>N'oublie jamais ta belote.</strong> Roi + Dame d'atout = 20 points, mais seulement si tu l'annonces en jouant la seconde carte.</li></ul>",
        },
        {
          h2: "La meilleure astuce : t'entraîner",
          html: "<p>Aucune liste de conseils ne remplace la pratique. Le moyen le plus rapide d'ancrer ces astuces, c'est de les <strong>tester en situation</strong> et de voir le résultat. Sur <a href=\"/\">Coincheur</a>, joue gratuitement contre des IA paramétrables, avec un coach qui pointe tes erreurs et des exercices ciblés.</p>",
        },
      ],
      faq: [
        { q: "Quelle est la première astuce à retenir à la coinche ?", a: "Bien évaluer sa main avant d'annoncer. La plupart des donnes perdues le sont à cause d'un contrat surévalué : si tu estimes correctement ce que ta main peut faire, tu évites déjà la majorité des chutes." },
        { q: "Faut-il toujours coincher quand on pense que l'adversaire va chuter ?", a: "Non. Coincher double les points en jeu : si tu te trompes, tu offres 2 fois plus à l'adversaire. Coinche quand il a manifestement trop monté, pas par simple réflexe ou agacement." },
        { q: "Ces astuces sont-elles des règles absolues ?", a: "Non, et c'est volontaire. La coinche se joue au jugement : selon la donne, l'astuce inverse peut être la bonne. Vois ces conseils comme des réflexes par défaut, à adapter à la situation." },
      ],
      related: [
        "enc-evaluer-main",
        "enc-choisir-atout",
        "enc-coincher",
        "jeu-choisir-entame",
        "jeu-entame-sous-as",
        "jeu-signaler-partenaire",
        "jeu-tirer-atouts",
        "jeu-compter-atouts",
        "jeu-cartes-maitresses",
        "jeu-defendre-pris",
        "jeu-garder-der",
        "reg-belote-oubliee",
        "pil-bien-jouer",
        "pil-progresser",
      ],
    },
    en: {
      slug: "coinche-tips-and-tricks",
      linkLabel: "Tips and tricks",
      title: "Coinche tips and tricks",
      h1: "Coinche tips and tricks",
      description:
        "Our best coinche tips: bidding, the lead, trumps, defence, the last trick, coinching. About a dozen concrete, non-dogmatic tips, each explained in detail.",
      lead: "Here is a set of <strong>coinche tips and tricks</strong> that genuinely make a difference. They are not rigid rules: judge by the deal. Each tip links to the article that explains it in depth.",
      sections: [
        {
          h2: "Bidding tips",
          html: "<ul><li><strong>Evaluate your hand before bidding.</strong> Count your winners and long suits, not just nominal points. This is coinche tip number one.</li><li><strong>Don't overvalue your hand.</strong> A made 90 beats a failed 110. When in doubt, aim lower.</li><li><strong>Choose trump by your shape.</strong> Five small trumps often beat three big ones: length makes the ruffs.</li><li><strong>Coinche when an opponent has clearly overbid</strong>, but not on reflex: a failed coinche doubles their points (×2).</li></ul>",
        },
        {
          h2: "Lead and early-deal tips",
          html: "<ul><li><strong>Think about your lead.</strong> Leading a trump, under an ace or into your partner's suit have very different effects: pick by the contract.</li><li><strong>Don't lead under an ace lightly.</strong> You risk handing it to a ruff. Sometimes right, often dangerous.</li><li><strong>Signal to your partner.</strong> Playing a high or low card isn't neutral: it's your only way to \"talk\" during the play.</li></ul>",
        },
        {
          h2: "Trump-management tips",
          html: "<ul><li><strong>When you take, ask whether to draw trumps.</strong> Often yes, to protect your winners, but keep one to ruff if your hand calls for it.</li><li><strong>Count the trumps that fall.</strong> Once the opponents have none, your cards become untouchable.</li><li><strong>Don't waste your master cards.</strong> Play them when they score, not just to get rid of them.</li></ul>",
        },
        {
          h2: "Defence and end-of-deal tips",
          html: "<ul><li><strong>On defence, play to set the contract.</strong> Count the points the opponents still need and focus on denying them.</li><li><strong>Keep the last trick.</strong> Those 10 points often decide a tight contract: hold a winner for the final trick.</li><li><strong>Never forget your belote.</strong> King + Queen of trumps = 20 points, but only if you announce it as you play the second card.</li></ul>",
        },
        {
          h2: "The best tip: practise",
          html: "<p>No list of tips replaces practice. The fastest way to lock these in is to <strong>test them in real situations</strong> and see the result. On <a href=\"/?lang=en\">Coincheur</a>, play for free against tunable AIs, with a coach that flags your mistakes and targeted exercises.</p>",
        },
      ],
      faq: [
        { q: "What's the first coinche tip to remember?", a: "Evaluate your hand well before bidding. Most lost deals come from an overbid contract: if you estimate correctly what your hand can do, you already avoid the majority of failures." },
        { q: "Should you always coinche when you think the opponent will fail?", a: "No. Coinching doubles the points at stake: if you're wrong, you hand the opponent twice as much. Coinche when they've clearly overbid, not on reflex or out of annoyance." },
        { q: "Are these tips absolute rules?", a: "No, deliberately so. Coinche is a game of judgement: depending on the deal, the opposite tip may be right. Treat these as default reflexes to adapt to the situation." },
      ],
      related: [
        "enc-evaluer-main",
        "enc-choisir-atout",
        "enc-coincher",
        "jeu-choisir-entame",
        "jeu-entame-sous-as",
        "jeu-signaler-partenaire",
        "jeu-tirer-atouts",
        "jeu-compter-atouts",
        "jeu-cartes-maitresses",
        "jeu-defendre-pris",
        "jeu-garder-der",
        "reg-belote-oubliee",
        "pil-bien-jouer",
        "pil-progresser",
      ],
    },
  },

  // ────────────────────────────────────────────────────────────────────────
  // 4) PILIER BIEN JOUER
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "pil-bien-jouer",
    priority: 0.8,
    fr: {
      slug: "comment-bien-jouer-coinche",
      linkLabel: "Bien jouer à la coinche",
      title: "Comment bien jouer à la coinche",
      h1: "Comment bien jouer à la coinche",
      description:
        "Les principes du bon joueur de coinche : entame réfléchie, gestion des atouts, défense active, signalisation et der. Un guide complet vers tout le cluster jeu.",
      lead: "<strong>Bien jouer à la coinche</strong>, ce n'est pas connaître un coup secret : c'est appliquer quelques principes solides avec constance. Entame, atouts, défense, signalisation, der : voici ce qui distingue un bon joueur.",
      sections: [
        {
          h2: "Le bon joueur a un plan dès l'entame",
          html: "<p>Avant de poser sa première carte, le bon joueur compte : combien de plis sûrs, combien à construire, qui a annoncé quoi. L'<strong>entame</strong> n'est jamais au hasard. Entamer atout pressure le preneur ; entamer dans la couleur du partenaire l'aide ; entamer sous un as peut le perdre. Le bon choix dépend du contrat et de ta position à la table.</p><p>Garde en tête les chiffres&nbsp;: 162 points par donne, et le Valet d'atout (20) puis le 9 (14) dominent les atouts. Savoir où sont les gros atouts oriente toute ta donne.</p>",
        },
        {
          h2: "Gérer les atouts comme un bon joueur",
          html: "<p>L'atout est l'arme maîtresse. Le réflexe du preneur est souvent de <strong>tirer les atouts</strong> pour que ses as et ses maîtres passent sans se faire couper. Mais ce n'est pas systématique : avec une main courte dans une couleur, garder un atout pour <strong>couper</strong> rapporte plus. Le bon joueur tranche selon sa main, pas selon une habitude.</p><ul><li><strong>Tirer les atouts</strong> quand tu as les maîtres et veux sécuriser.</li><li><strong>Garder un atout pour couper</strong> quand une couleur te manque.</li><li><strong>Compter les atouts tombés</strong> pour savoir quand tu es maître.</li></ul>",
        },
        {
          h2: "Défendre activement",
          html: "<p>Bien jouer, c'est aussi bien défendre, et la défense est souvent ce qui sépare les niveaux. Quand l'adversaire a pris, ton objectif n'est pas de « voir venir » mais de le <strong>faire chuter</strong> : monter aux points, couper ses couleurs, lui refuser la der. Un défenseur passif laisse passer des contrats qu'une défense active aurait cassés.</p><p>Pense aussi à <strong>ne pas couper la carte maîtresse de ton partenaire</strong> : si c'est lui qui tient le pli, garde tes atouts pour autre chose.</p>",
        },
        {
          h2: "Faire équipe : signalisation et der",
          html: "<p>À la coinche, tu joues à deux. La <strong>signalisation</strong> (jouer fort pour dire « j'aime cette couleur », petit pour dire l'inverse) est ton seul langage pendant le jeu. Un bon joueur émet <em>et</em> lit ces signaux.</p><p>Enfin, <strong>garde la der</strong>. Les 10 points du dernier pli renversent une partie serrée. Conserver une petite carte gagnante ou un dernier atout pour le huitième pli est une marque de bon joueur, et n'oublie jamais d'annoncer ta belote (20 points) si tu as Roi et Dame d'atout.</p>",
        },
        {
          h2: "Du principe à la table",
          html: "<p>Ces principes deviennent des réflexes à force de les jouer. Le plus efficace est de t'entraîner sur des situations réelles et de te faire corriger. Sur <a href=\"/\">Coincheur</a>, joue gratuitement contre des IA paramétrables, avec un coach et des exercices pour travailler entame, atouts, défense et der un par un.</p>",
        },
      ],
      faq: [
        { q: "Qu'est-ce qui distingue un bon joueur de coinche ?", a: "La constance dans les principes : une entame réfléchie, une bonne gestion des atouts, une défense active et le réflexe de garder la der. Le bon joueur a un plan dès la première carte et adapte ce plan à ce qu'il observe." },
        { q: "Faut-il toujours tirer les atouts pour bien jouer ?", a: "Non. Tirer les atouts protège tes maîtres, mais garder un atout pour couper une couleur qui te manque rapporte parfois davantage. Bien jouer, c'est choisir selon sa main, pas appliquer un automatisme." },
        { q: "La défense est-elle aussi importante que l'attaque ?", a: "Souvent plus. C'est en défense que les écarts de niveau se voient le plus : une défense active fait chuter des contrats qu'une défense passive laisse passer. Joue toujours pour faire tomber le contrat adverse." },
      ],
      related: [
        "jeu-choisir-entame",
        "jeu-atout-premier-tour",
        "jeu-tirer-atouts",
        "jeu-couper-defausser",
        "jeu-eviter-coupe-maitres",
        "jeu-defendre-pris",
        "jeu-signaler-partenaire",
        "jeu-garder-der",
        "jeu-compter-atouts",
        "jeu-cartes-maitresses",
        "reg-belote-oubliee",
        "pil-strategie",
        "pil-gagner",
      ],
    },
    en: {
      slug: "how-to-play-coinche-well",
      linkLabel: "Play coinche well",
      title: "How to play coinche well",
      h1: "How to play coinche well",
      description:
        "The principles of a good coinche player: a thoughtful lead, trump management, active defence, signalling and the last trick. A complete guide into the play cluster.",
      lead: "<strong>Playing coinche well</strong> isn't about a secret move: it's applying a few solid principles consistently. Lead, trumps, defence, signalling, the last trick: here is what sets a good player apart.",
      sections: [
        {
          h2: "A good player has a plan from the lead",
          html: "<p>Before laying the first card, a good player counts: how many sure tricks, how many to build, who bid what. The <strong>lead</strong> is never random. Leading a trump pressures the declarer; leading into your partner's suit helps them; leading under an ace can cost it. The right choice depends on the contract and your seat.</p><p>Keep the numbers in mind: 162 points per deal, with the Jack of trumps (20) then the 9 (14) ruling the trump suit. Knowing where the big trumps sit guides the whole deal.</p>",
        },
        {
          h2: "Managing trumps like a good player",
          html: "<p>Trumps are the master weapon. The declarer's reflex is often to <strong>draw trumps</strong> so aces and winners run without being ruffed. But it isn't automatic: with a short suit, keeping a trump to <strong>ruff</strong> scores more. A good player decides by their hand, not by habit.</p><ul><li><strong>Draw trumps</strong> when you hold the winners and want to lock them in.</li><li><strong>Keep a trump to ruff</strong> when you're short in a suit.</li><li><strong>Count the trumps that fall</strong> to know when you're in control.</li></ul>",
        },
        {
          h2: "Defending actively",
          html: "<p>Playing well also means defending well, and defence often separates the levels. When an opponent has taken the contract, your goal isn't to \"wait and see\" but to <strong>set it</strong>: cash points, ruff their suits, deny them the last trick. A passive defender lets through contracts that active defence would have broken.</p><p>Also remember: <strong>don't ruff your partner's winner</strong>. If they hold the trick, save your trumps for something else.</p>",
        },
        {
          h2: "Playing as a team: signalling and the last trick",
          html: "<p>Coinche is a partnership. <strong>Signalling</strong> (playing high to say \"I like this suit,\" low to say the opposite) is your only language during the play. A good player both sends <em>and</em> reads these signals.</p><p>Finally, <strong>keep the last trick</strong>. The 10 points of the final trick flip a tight game. Holding a small winner or a last trump for the eighth trick marks a good player, and never forget to announce your belote (20 points) if you hold the King and Queen of trumps.</p>",
        },
        {
          h2: "From principle to the table",
          html: "<p>These principles become reflexes by playing them. The most effective path is to practise on real situations and get corrected. On <a href=\"/?lang=en\">Coincheur</a>, play for free against tunable AIs, with a coach and exercises to work on the lead, trumps, defence and the last trick one at a time.</p>",
        },
      ],
      faq: [
        { q: "What sets a good coinche player apart?", a: "Consistency in the principles: a thoughtful lead, sound trump management, active defence and the reflex to keep the last trick. A good player has a plan from the first card and adapts it to what they observe." },
        { q: "Do you always have to draw trumps to play well?", a: "No. Drawing trumps protects your winners, but keeping a trump to ruff a short suit sometimes scores more. Playing well means choosing by your hand, not applying an automatic rule." },
        { q: "Is defence as important as attack?", a: "Often more so. Defence is where skill gaps show most: active defence sets contracts that passive defence lets through. Always play to break the opponent's contract." },
      ],
      related: [
        "jeu-choisir-entame",
        "jeu-atout-premier-tour",
        "jeu-tirer-atouts",
        "jeu-couper-defausser",
        "jeu-eviter-coupe-maitres",
        "jeu-defendre-pris",
        "jeu-signaler-partenaire",
        "jeu-garder-der",
        "jeu-compter-atouts",
        "jeu-cartes-maitresses",
        "reg-belote-oubliee",
        "pil-strategie",
        "pil-gagner",
      ],
    },
  },

  // ────────────────────────────────────────────────────────────────────────
  // 5) PILIER GAGNER
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "pil-gagner",
    priority: 0.8,
    fr: {
      slug: "comment-gagner-coinche",
      linkLabel: "Gagner à la coinche",
      title: "Comment gagner à la coinche",
      h1: "Comment gagner à la coinche",
      description:
        "Gagner à la coinche : maximiser ses points avec des enchères justes, une coinche au bon moment, le 10 de der et une défense active. Guide complet vers le cluster.",
      lead: "<strong>Gagner à la coinche</strong>, c'est marquer plus de points que l'adversaire sur la durée. Cela passe par des enchères justes, une coinche au bon moment, la chasse à la der et une défense qui fait chuter.",
      sections: [
        {
          h2: "Gagner, c'est maximiser les points",
          html: "<p>On ne gagne pas une partie sur un coup d'éclat mais sur l'<strong>accumulation</strong>. Une donne vaut 162 points (152 + 10 de der), une belote en ajoute 20, un capot annoncé vaut 250. La partie se joue généralement en plusieurs donnes jusqu'à un total convenu. Pour gagner, il faut donc grappiller à chaque donne&nbsp;: tenir ses contrats, ne pas offrir de points bêtement, et profiter de chaque bonus.</p>",
        },
        {
          h2: "Des enchères justes plutôt qu'ambitieuses",
          html: "<p>La première source de points perdus, c'est le <strong>contrat surévalué</strong> qui chute. Pour gagner sur la durée, vise juste&nbsp;: <strong>évalue ta main</strong>, ouvre à une hauteur que tu peux tenir, et n'aie pas peur de <strong>passer</strong> quand ta main ne suit pas. Mieux vaut empocher un petit contrat régulièrement que tenter de gros coups qui s'écroulent.</p><p>Soutiens ton partenaire quand il a parlé : deux mains conjuguées tiennent un contrat qu'une seule ne tiendrait pas.</p>",
        },
        {
          h2: "Coincher au bon moment",
          html: "<p>La <strong>coinche</strong> est un multiplicateur de points décisif : elle double l'enjeu (×2), et la surcoinche le quadruple (×4). Coinchée au bon moment, sur un adversaire qui a manifestement trop monté, c'est l'une des meilleures façons de gagner gros. Mais c'est à double tranchant : si le contrat passe, c'est l'adversaire qui encaisse le double. Coinche sur lecture, jamais par énervement.</p><table><tr><th>Action</th><th>Multiplicateur</th></tr><tr><td>Contrat normal</td><td>×1</td></tr><tr><td>Coinche</td><td>×2</td></tr><tr><td>Surcoinche</td><td>×4</td></tr></table>",
        },
        {
          h2: "Gagner les points en jeu : der et défense active",
          html: "<p>Beaucoup de parties se jouent sur des détails. <strong>Garder la der</strong> (10 points) renverse un contrat serré : conserve une carte gagnante pour le dernier pli. En défense, joue toujours pour <strong>faire chuter</strong> : monte aux points, coupe, refuse la der à l'adversaire. Et n'oublie pas ta <strong>belote</strong> (Roi + Dame d'atout = 20) : ces points gratuits décident des parties.</p><p>Côté preneur, <strong>compte tes plis</strong> et tes points en cours de donne pour savoir si ton contrat est acquis ou s'il faut encore te battre.</p>",
        },
        {
          h2: "S'entraîner pour gagner plus souvent",
          html: "<p>Gagner régulièrement vient de la répétition et de l'analyse. Plus tu joues de donnes en cherchant à maximiser tes points, plus tes choix deviennent naturels. Sur <a href=\"/\">Coincheur</a>, affronte gratuitement des IA paramétrables, avec un coach qui repère où tu laisses filer des points et des exercices pour t'améliorer.</p>",
        },
      ],
      faq: [
        { q: "Quelle est la clé pour gagner à la coinche ?", a: "Maximiser ses points sur la durée plutôt que tenter des coups spectaculaires. Des enchères justes que tu peux tenir, une coinche au bon moment, la der gardée et une défense active suffisent à prendre l'avantage donne après donne." },
        { q: "Coincher fait-il vraiment gagner des points ?", a: "Oui, quand c'est bien fait : la coinche double l'enjeu (×2) et la surcoinche le quadruple (×4). Mais c'est risqué : si le contrat passe, l'adversaire encaisse le double. Coinche seulement quand il a clairement trop monté." },
        { q: "Pourquoi la der est-elle si importante pour gagner ?", a: "Le 10 de der suffit souvent à faire passer ou chuter un contrat serré, et donc à basculer une partie. Garder une carte gagnante pour le dernier pli est l'un des réflexes les plus rentables du jeu." },
      ],
      related: [
        "enc-evaluer-main",
        "enc-ouvrir-80",
        "enc-passer",
        "enc-coincher",
        "enc-surcoincher",
        "enc-soutenir-partenaire",
        "jeu-garder-der",
        "jeu-defendre-pris",
        "jeu-compter-atouts",
        "reg-belote-oubliee",
        "lex-capot",
        "pil-strategie",
        "pil-bien-jouer",
      ],
    },
    en: {
      slug: "how-to-win-coinche",
      linkLabel: "Win at coinche",
      title: "How to win at coinche",
      h1: "How to win at coinche",
      description:
        "Winning at coinche: maximise your points with sound bids, a well-timed coinche, the last-trick bonus and active defence. A complete guide into the cluster.",
      lead: "<strong>Winning at coinche</strong> means scoring more points than the opponents over time. That comes from sound bids, a well-timed coinche, chasing the last trick and a defence that sets contracts.",
      sections: [
        {
          h2: "Winning means maximising points",
          html: "<p>You don't win a match on one brilliant move but on <strong>accumulation</strong>. A deal is worth 162 points (152 + 10 for the last trick), a belote adds 20, a bid capot is worth 250. A match usually runs over several deals to an agreed total. So to win you must gather points every deal: make your contracts, never hand over points cheaply, and cash every bonus.</p>",
        },
        {
          h2: "Sound bids over ambitious ones",
          html: "<p>The biggest source of lost points is the <strong>overbid contract</strong> that fails. To win over time, bid soundly: <strong>evaluate your hand</strong>, open at a level you can hold, and don't be afraid to <strong>pass</strong> when your hand doesn't follow. Pocketing a small contract regularly beats chasing big swings that collapse.</p><p>Support your partner when they've spoken: two hands combined hold a contract one alone could not.</p>",
        },
        {
          h2: "Coinching at the right moment",
          html: "<p>The <strong>coinche</strong> is a decisive points multiplier: it doubles the stakes (×2), and the surcoinche quadruples them (×4). Played at the right moment, against an opponent who has clearly overbid, it's one of the best ways to win big. But it cuts both ways: if the contract makes, the opponent banks double. Coinche on reading the hand, never out of frustration.</p><table><tr><th>Action</th><th>Multiplier</th></tr><tr><td>Normal contract</td><td>×1</td></tr><tr><td>Coinche</td><td>×2</td></tr><tr><td>Surcoinche</td><td>×4</td></tr></table>",
        },
        {
          h2: "Winning points in play: last trick and active defence",
          html: "<p>Many matches turn on details. <strong>Keeping the last trick</strong> (10 points) flips a tight contract: hold a winner for the final trick. On defence, always play to <strong>set the contract</strong>: cash points, ruff, deny the opponent the last trick. And don't forget your <strong>belote</strong> (King + Queen of trumps = 20): those free points decide matches.</p><p>As declarer, <strong>count your tricks</strong> and points during the deal to know whether your contract is secured or still up for grabs.</p>",
        },
        {
          h2: "Practise to win more often",
          html: "<p>Winning regularly comes from repetition and review. The more deals you play while trying to maximise your points, the more natural your choices become. On <a href=\"/?lang=en\">Coincheur</a>, take on tunable AIs for free, with a coach that spots where you leak points and exercises to improve.</p>",
        },
      ],
      faq: [
        { q: "What's the key to winning at coinche?", a: "Maximising your points over time rather than chasing spectacular plays. Sound bids you can hold, a well-timed coinche, keeping the last trick and active defence are enough to build an edge deal after deal." },
        { q: "Does coinching really help you win points?", a: "Yes, when done well: a coinche doubles the stakes (×2) and a surcoinche quadruples them (×4). But it's risky: if the contract makes, the opponent banks double. Coinche only when they've clearly overbid." },
        { q: "Why is the last trick so important for winning?", a: "The 10-point last-trick bonus is often enough to make or break a tight contract, and so to swing a match. Holding a winner for the final trick is one of the most rewarding reflexes in the game." },
      ],
      related: [
        "enc-evaluer-main",
        "enc-ouvrir-80",
        "enc-passer",
        "enc-coincher",
        "enc-surcoincher",
        "enc-soutenir-partenaire",
        "jeu-garder-der",
        "jeu-defendre-pris",
        "jeu-compter-atouts",
        "reg-belote-oubliee",
        "lex-capot",
        "pil-strategie",
        "pil-bien-jouer",
      ],
    },
  },
];
