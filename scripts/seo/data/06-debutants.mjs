// Catégorie : Débuter à la coinche (questions de débutants — mots-clés grand public).
// Même schéma que 00-lexique.mjs.

export const category = { fr: "Débuter à la coinche", en: "Coinche for beginners" };

export default [
  {
    id: "deb-comment-jouer",
    priority: 0.55,
    fr: {
      slug: "comment-jouer-coinche-debutant",
      linkLabel: "Jouer quand on débute",
      title: "Comment jouer à la coinche quand on débute : le guide complet",
      h1: "Comment jouer à la coinche quand on débute",
      description:
        "Tu débutes à la coinche ? Vue d'ensemble simple : 4 joueurs, 2 équipes, 32 cartes, les enchères, les plis et le décompte. Tout pour ta première partie.",
      lead: "La coinche se joue à <strong>4 joueurs en 2 équipes</strong> assises face à face, avec un jeu de <strong>32 cartes</strong>. Pas de panique : une donne tient en trois temps faciles à retenir.",
      sections: [
        {
          h2: "Le principe en une minute",
          html: "<p>Une partie de coinche enchaîne des <strong>donnes</strong>. À chaque donne, on distribue 8 cartes à chacun, on choisit un <strong>atout</strong> (la couleur la plus forte) lors des enchères, puis on joue <strong>8 plis</strong>. L'équipe qui a pris le contrat doit atteindre le nombre de points annoncé.</p>",
        },
        {
          h2: "Les trois temps d'une donne",
          html: "<ul><li><strong>La distribution</strong> : chacun reçoit 8 cartes.</li><li><strong>Les enchères</strong> : on annonce un contrat (de 80 jusqu'au capot) et une couleur d'atout. La plus haute annonce gagne.</li><li><strong>Le jeu de la carte</strong> : on pose une carte à tour de rôle, le plus fort remporte le pli. On compte les points à la fin.</li></ul>",
        },
        {
          h2: "Gagner un pli",
          html: "<p>Tu dois <strong>fournir la couleur demandée</strong> (celle de la première carte du pli). Si tu n'en as pas, tu peux couper avec un atout ou te défausser. L'atout bat toujours les autres couleurs ; sinon c'est la plus haute carte de la couleur demandée qui l'emporte. Petit réflexe à retenir : à l'atout, ce sont le <strong>Valet (20 points) et le 9 (14 points)</strong> qui dominent, devant l'As et le 10. Cette inversion surprend tous les débutants, mais elle devient vite naturelle.</p><p>N'oublie jamais que tu joues à deux. Ton <strong>partenaire</strong>, assis en face, est ton allié : ses plis comptent pour toi. Inutile de « surmonter » une carte qu'il a déjà gagnée. Bien jouer à la coinche, c'est autant écouter son partenaire que regarder ses propres cartes.</p>",
        },
        {
          h2: "Et ensuite ?",
          html: "<p>Le plus simple, c'est de jouer. Tu peux t'entraîner tranquillement <strong>contre l'IA sur <a href=\"/\">Coincheur</a></strong> : tu vois les cartes valides, tu prends ton temps, et tu apprends sans pression. Plusieurs choix sont souvent corrects : on progresse surtout en jouant.</p>",
        },
      ],
      faq: [
        { q: "Combien de joueurs pour une partie de coinche ?", a: "Quatre joueurs, répartis en deux équipes de deux. Les partenaires sont assis face à face." },
        { q: "C'est long d'apprendre à jouer ?", a: "Les bases (distribution, enchères, plis) se comprennent en une partie. La stratégie, elle, s'affine au fil des donnes. On peut jouer dès la première soirée." },
      ],
      related: ["deb-regles-simplifiees", "deb-apprendre-rapidement", "deb-conseils-premiere-partie"],
    },
    en: {
      slug: "how-to-play-coinche-beginner",
      linkLabel: "Playing as a beginner",
      title: "How to play coinche as a beginner: the complete guide",
      h1: "How to play coinche when you're a beginner",
      description:
        "New to coinche? A simple overview: 4 players, 2 teams, 32 cards, the bidding, the tricks and scoring. Everything you need for your first game.",
      lead: "Coinche is played by <strong>4 players in 2 teams</strong> sitting opposite each other, with a <strong>32-card</strong> deck. Don't worry: a deal breaks down into three easy steps.",
      sections: [
        {
          h2: "The idea in one minute",
          html: "<p>A game of coinche is a series of <strong>deals</strong>. Each deal, you get 8 cards, pick a <strong>trump</strong> (the strongest suit) during the bidding, then play <strong>8 tricks</strong>. The team that took the contract must reach the points it bid.</p>",
        },
        {
          h2: "The three steps of a deal",
          html: "<ul><li><strong>The deal</strong>: everyone gets 8 cards.</li><li><strong>The bidding</strong>: you announce a contract (from 80 up to capot) and a trump suit. The highest bid wins.</li><li><strong>The play</strong>: each player lays a card in turn, the strongest wins the trick. Points are counted at the end.</li></ul>",
        },
        {
          h2: "Winning a trick",
          html: "<p>You must <strong>follow the led suit</strong> (the first card of the trick). If you can't, you may ruff with a trump or discard. Trump always beats other suits; otherwise the highest card of the led suit wins. One reflex to remember: in trump, the <strong>Jack (20 points) and the 9 (14 points)</strong> rule, ahead of the Ace and 10. This flip surprises every beginner, but it quickly becomes second nature.</p><p>Never forget you play as a pair. Your <strong>partner</strong>, sitting opposite, is your ally: their tricks count for you. No need to override a card they've already won. Playing coinche well is as much about listening to your partner as watching your own cards.</p>",
        },
        {
          h2: "What next?",
          html: "<p>The easiest way is to play. You can practise calmly <strong>against the AI on <a href=\"/\">Coincheur</a></strong>: valid cards are highlighted, you take your time, and you learn with no pressure. Several choices are often fine: you improve mostly by playing.</p>",
        },
      ],
      faq: [
        { q: "How many players for a game of coinche?", a: "Four players, in two teams of two. Partners sit opposite each other." },
        { q: "Does it take long to learn?", a: "The basics (dealing, bidding, tricks) make sense within one game. Strategy sharpens over time. You can play from your very first evening." },
      ],
      related: ["deb-regles-simplifiees", "deb-apprendre-rapidement", "deb-conseils-premiere-partie"],
    },
  },

  {
    id: "deb-regles-simplifiees",
    priority: 0.55,
    fr: {
      slug: "regles-coinche-simplifiees",
      linkLabel: "Règles simplifiées",
      title: "Les règles de la coinche simplifiées pour débuter",
      h1: "Les règles de la coinche, version simplifiée",
      description:
        "Les règles de la coinche expliquées simplement : équipes, atout, enchères de 80 au capot, plis et points. L'essentiel pour comprendre vite et jouer.",
      lead: "Voici la coinche <strong>sans le jargon</strong> : juste ce qu'il faut pour comprendre et lancer ta première donne dès maintenant.",
      sections: [
        {
          h2: "Le matériel et les équipes",
          html: "<p>Un jeu de <strong>32 cartes</strong> (du 7 à l'As) et 4 joueurs en <strong>2 équipes</strong> face à face. Chacun reçoit 8 cartes, donc 8 plis à jouer par donne.</p>",
        },
        {
          h2: "L'atout et les enchères",
          html: "<p>L'<strong>atout</strong> est la couleur reine de la donne : ses cartes battent toutes les autres. Pendant les enchères, chaque équipe peut annoncer un <strong>contrat</strong> chiffré (de <strong>80</strong> jusqu'au <strong>capot</strong>) en choisissant l'atout. Les annonces montent de dizaine en dizaine. Le plus haut contrat l'emporte et devient l'objectif à atteindre. À l'atout, attention : ce sont le <strong>Valet et le 9</strong> les plus forts, pas l'As. Si tu ne te sens pas en confiance, tu peux toujours « passer » et laisser parler les autres.</p>",
        },
        {
          h2: "Compter et gagner",
          html: "<p>Une donne vaut <strong>162 points</strong> (152 dans les cartes + 10 « de der » pour le dernier pli). Si l'équipe qui a pris atteint son contrat, elle marque ; sinon elle « chute » et tout part à l'adversaire. La <strong>coinche</strong> permet de doubler les points (×2) quand on pense que l'adversaire ne tiendra pas son contrat ; il peut alors « surcoincher » pour quadrupler la mise. C'est ce petit duel d'annonces qui donne son nom et son sel au jeu. Pense aussi à la <strong>belote</strong> (Roi et Dame d'atout dans la même main) : elle rapporte 20 points bonus, à ne pas négliger dans un contrat serré.</p>",
        },
        {
          h2: "Le plus simple : essayer",
          html: "<p>Rien ne remplace une vraie donne. Tu peux jouer <strong>contre l'IA sur <a href=\"/\">Coincheur</a></strong> pour voir les règles en action, sans risque de te tromper sur le décompte. Et rassure-toi : beaucoup de choix sont acceptables, l'important est de comprendre la logique.</p>",
        },
      ],
      faq: [
        { q: "Quelle est l'annonce la plus basse ?", a: "80. Les enchères montent ensuite de dizaine en dizaine jusqu'à 160, puis viennent le capot et certaines annonces spéciales selon les tables." },
        { q: "Que veut dire coincher ?", a: "Coincher, c'est contrer l'adversaire : tu paries qu'il ne réussira pas son contrat. Si tu as raison, les points sont doublés en ta faveur." },
      ],
      related: ["deb-comment-jouer", "deb-memo-antiseche", "deb-vocabulaire"],
    },
    en: {
      slug: "simplified-coinche-rules",
      linkLabel: "Simplified rules",
      title: "Coinche rules simplified for beginners",
      h1: "Coinche rules, the simple version",
      description:
        "Coinche rules explained simply: teams, trump, bidding from 80 to capot, tricks and points. The essentials to understand fast and start playing.",
      lead: "Here's coinche <strong>without the jargon</strong>: just enough to understand it and start your first deal right now.",
      sections: [
        {
          h2: "The kit and the teams",
          html: "<p>A <strong>32-card</strong> deck (7 to Ace) and 4 players in <strong>2 teams</strong> facing each other. Everyone gets 8 cards, so 8 tricks to play per deal.</p>",
        },
        {
          h2: "Trump and bidding",
          html: "<p>The <strong>trump</strong> is the deal's ruling suit: its cards beat all others. During the bidding, each team can announce a numbered <strong>contract</strong> (from <strong>80</strong> up to <strong>capot</strong>) and pick the trump. Bids climb in tens. The highest contract wins and becomes the target. Careful in trump: the <strong>Jack and the 9</strong> are strongest, not the Ace. If you don't feel confident, you can always \"pass\" and let the others speak.</p>",
        },
        {
          h2: "Counting and winning",
          html: "<p>A deal is worth <strong>162 points</strong> (152 in the cards + 10 for the last trick). If the team that took the contract reaches it, they score; otherwise they \"fail\" and everything goes to the opponents. The <strong>coinche</strong> (double) doubles the points (x2) when you think the opponents won't make their contract; they can then \"surcoincher\" (redouble) to quadruple the stake. This little bidding duel is what gives the game its name and its bite. Don't forget the <strong>belote</strong> either (trump King and Queen in the same hand): it scores 20 bonus points, not to be overlooked in a tight contract.</p>",
        },
        {
          h2: "Simplest of all: try it",
          html: "<p>Nothing beats a real deal. You can play <strong>against the AI on <a href=\"/\">Coincheur</a></strong> to see the rules in action, with no risk of miscounting. And relax: many choices are fine, what matters is grasping the logic.</p>",
        },
      ],
      faq: [
        { q: "What is the lowest bid?", a: "80. Bidding then climbs in tens up to 160, followed by capot and some special calls depending on the table." },
        { q: "What does \"coincher\" mean?", a: "To coinche is to double the opponents: you bet they won't make their contract. If you're right, the points are doubled in your favour." },
      ],
      related: ["deb-comment-jouer", "deb-memo-antiseche", "deb-vocabulaire"],
    },
  },

  {
    id: "deb-apprendre-rapidement",
    priority: 0.55,
    fr: {
      slug: "apprendre-coinche-rapidement",
      linkLabel: "Apprendre vite",
      title: "Apprendre la coinche rapidement : un plan en 5 étapes",
      h1: "Apprendre la coinche rapidement",
      description:
        "Un plan simple pour apprendre la coinche vite : comprendre le but, l'ordre des cartes, les enchères, jouer des plis et compter. Étape par étape.",
      lead: "Tu veux jouer vite ? Suis ce <strong>plan en 5 étapes</strong> : chacune se maîtrise en quelques minutes, et tu peux jouer dès la fin de l'étape 4.",
      sections: [
        {
          h2: "Étapes 1 à 3 : les bases",
          html: "<ul><li><strong>1. Le but</strong> : prendre des plis pour atteindre le contrat annoncé.</li><li><strong>2. L'ordre des cartes</strong> : à l'atout, le Valet et le 9 dominent ; sinon c'est l'As puis le 10.</li><li><strong>3. Les enchères</strong> : annoncer un chiffre (dès 80) et une couleur d'atout.</li></ul>",
        },
        {
          h2: "Étape 4 : jouer des plis",
          html: "<p>Fournis la couleur demandée, coupe à l'atout si tu ne l'as pas, et essaie de remporter les plis qui contiennent des points (As, 10, Valet d'atout...). C'est en jouant que tout devient clair.</p>",
        },
        {
          h2: "Étape 5 : compter",
          html: "<p>Additionne les points de tes plis, ajoute 10 si tu remportes le dernier (le « 10 de der »), et compare au contrat. 162 points en jeu par donne : pas besoin de calcul savant au début.</p>",
        },
        {
          h2: "Le raccourci : répéter",
          html: "<p>La meilleure méthode reste la répétition. Enchaîne des donnes <strong>contre l'IA sur <a href=\"/\">Coincheur</a></strong> : en quelques parties, les réflexes viennent seuls. Ne cherche pas la perfection, plusieurs choix sont souvent valables. Concentre-toi d'abord sur une chose à la fois : une partie pour bien fournir la couleur, une autre pour soigner tes enchères, une autre pour ne plus oublier la der. En isolant les compétences, tu progresses beaucoup plus vite que si tu essaies de tout maîtriser d'un coup. Et garde l'antisèche des valeurs à portée de main : tant que l'ordre des cartes n'est pas automatique, autant le vérifier d'un coup d'œil plutôt que de te tromper.</p>",
        },
      ],
      faq: [
        { q: "En combien de temps peut-on jouer correctement ?", a: "Souvent en une à deux soirées pour les bases. La finesse stratégique demande plus de parties, mais on s'amuse très vite." },
        { q: "Faut-il tout retenir par cœur ?", a: "Non. Garde sous les yeux l'ordre des cartes et le décompte ; le reste vient en jouant. Un mémo aide beaucoup au début." },
      ],
      related: ["deb-comment-jouer", "deb-memo-antiseche", "deb-jouer-contre-ordinateur"],
    },
    en: {
      slug: "learn-coinche-fast",
      linkLabel: "Learn it fast",
      title: "Learn coinche fast: a 5-step plan",
      h1: "Learn coinche quickly",
      description:
        "A simple plan to learn coinche fast: grasp the goal, the card order, the bidding, playing tricks and counting. Step by step.",
      lead: "Want to play quickly? Follow this <strong>5-step plan</strong>: each part takes minutes, and you can play by the end of step 4. No need to learn everything at once, just move through the steps one by one and start having fun along the way. By the end, you'll know enough to sit down at any table with confidence.",
      sections: [
        {
          h2: "Steps 1 to 3: the basics",
          html: "<ul><li><strong>1. The goal</strong>: win tricks to reach the contract you bid.</li><li><strong>2. Card order</strong>: in trump, the Jack and 9 rule; otherwise it's the Ace then the 10.</li><li><strong>3. The bidding</strong>: announce a number (from 80) and a trump suit.</li></ul>",
        },
        {
          h2: "Step 4: playing tricks",
          html: "<p>Follow the led suit, ruff with trump if you can't, and try to win tricks holding points (Aces, 10s, the trump Jack...). Playing is what makes it all click.</p>",
        },
        {
          h2: "Step 5: counting",
          html: "<p>Add up the points in your tricks, add 10 if you win the last one (the last-trick bonus), and compare with the contract. 162 points are in play per deal: no fancy maths needed early on.</p>",
        },
        {
          h2: "The shortcut: repeat",
          html: "<p>The best method is repetition. Run deal after deal <strong>against the AI on <a href=\"/\">Coincheur</a></strong>: within a few games the reflexes come by themselves. Don't chase perfection, several choices are often valid. Focus on one thing at a time: one game to follow suit cleanly, another to polish your bidding, another to stop forgetting the last trick. By isolating skills, you improve far faster than trying to master everything at once. And keep the values cheat sheet within reach: until the card order is automatic, it's better to check at a glance than to slip up.</p>",
        },
      ],
      faq: [
        { q: "How long until you can play properly?", a: "Often one or two evenings for the basics. Strategic finesse takes more games, but the fun comes fast." },
        { q: "Do you have to memorise everything?", a: "No. Keep the card order and scoring in view; the rest comes with play. A cheat sheet helps a lot at first." },
      ],
      related: ["deb-comment-jouer", "deb-memo-antiseche", "deb-jouer-contre-ordinateur"],
    },
  },

  {
    id: "deb-erreurs-frequentes",
    priority: 0.55,
    fr: {
      slug: "erreurs-debutant-coinche",
      linkLabel: "Erreurs de débutant",
      title: "Les erreurs les plus fréquentes des débutants à la coinche",
      h1: "Les erreurs fréquentes des débutants à la coinche",
      description:
        "Les pièges classiques du débutant à la coinche : enchères trop hautes, atouts mal gérés, der oubliée, partenaire ignoré. Comment les éviter simplement.",
      lead: "Tout le monde fait ces erreurs au début, et il n'y a aucune honte à ça. Les connaître, c'est déjà <strong>la moitié du chemin</strong> pour les éviter et progresser plus vite.",
      sections: [
        {
          h2: "Annoncer trop haut",
          html: "<p>L'erreur reine : prendre un contrat à 110 ou 120 avec une main moyenne. <strong>Mieux vaut un petit contrat tenu qu'un gros qui chute</strong>, car en chutant tu offres tous les points à l'adversaire. Compte tes atouts et tes As avant d'annoncer.</p>",
        },
        {
          h2: "Mal gérer ses atouts",
          html: "<ul><li><strong>Gaspiller un gros atout</strong> (Valet, 9) sur un pli sans enjeu.</li><li><strong>Oublier de couper</strong> quand on n'a plus la couleur demandée et qu'il y a des points à prendre.</li><li><strong>Garder ses atouts trop longtemps</strong> et se les faire « manger ».</li></ul>",
        },
        {
          h2: "Oublier la der et le partenaire",
          html: "<p>Le <strong>dernier pli</strong> rapporte 10 points : garde une carte maîtresse pour le prendre. Et surtout, <strong>joue avec ton partenaire</strong> : s'il a annoncé l'atout, ne lui coupe pas l'herbe sous le pied. La coinche est un jeu d'équipe.</p>",
        },
        {
          h2: "Comment corriger tout ça",
          html: "<p>Bonne nouvelle : ces erreurs disparaissent vite avec un peu de pratique. La clé, au début, est de jouer <strong>en réfléchissant à voix haute</strong> : pourquoi j'annonce ça, pourquoi je joue cette carte. Tu verras tes réflexes se mettre en place donne après donne. Et n'oublie pas : à la coinche, plusieurs choix sont souvent corrects. Ne cherche pas le coup parfait, vise simplement à éviter les fautes évidentes. Pour t'entraîner sans conséquence, enchaîne quelques donnes <strong>contre l'IA sur <a href=\"/\">Coincheur</a></strong> : tu repères vite tes mauvaises habitudes et tu les corriges à ton rythme, sans personne pour te presser.</p>",
        },
      ],
      faq: [
        { q: "Quelle est l'erreur n°1 du débutant ?", a: "Annoncer un contrat trop élevé. Un contrat raté offre tous les points à l'adversaire : la prudence paie au début." },
        { q: "Faut-il jouer ses atouts tout de suite ?", a: "Pas forcément. Les atouts servent à couper et à prendre les plis importants. Garde tes plus gros pour les moments qui comptent, mais ça dépend de la donne." },
      ],
      related: ["deb-choisir-atout", "deb-conseils-premiere-partie"],
    },
    en: {
      slug: "beginner-mistakes-coinche",
      linkLabel: "Beginner mistakes",
      title: "The most common beginner mistakes in coinche",
      h1: "Common beginner mistakes in coinche",
      description:
        "Classic beginner pitfalls in coinche: overbidding, mishandling trumps, forgetting the last trick, ignoring your partner. How to avoid them simply.",
      lead: "Everyone makes these mistakes early on, and there's no shame in it. Knowing them is already <strong>half the battle</strong> in avoiding them and improving faster. Below are the ones that trip up almost every newcomer, and the simple fix for each.",
      sections: [
        {
          h2: "Bidding too high",
          html: "<p>The number-one mistake: taking a 110 or 120 contract with a mediocre hand. <strong>A small contract made beats a big one that fails</strong>, because failing hands all the points to the opponents. Count your trumps and Aces before you bid.</p>",
        },
        {
          h2: "Mishandling your trumps",
          html: "<ul><li><strong>Wasting a big trump</strong> (Jack, 9) on a trick that doesn't matter.</li><li><strong>Forgetting to ruff</strong> when you're out of the led suit and there are points to grab.</li><li><strong>Hoarding trumps too long</strong> and letting them get \"eaten.\"</li></ul>",
        },
        {
          h2: "Forgetting the last trick and your partner",
          html: "<p>The <strong>last trick</strong> is worth 10 points: keep a master card to take it. Above all, <strong>play with your partner</strong>: if they called the trump, don't cut across their plan. Coinche is a team game.</p>",
        },
        {
          h2: "How to fix all this",
          html: "<p>Good news: these mistakes fade fast with a little practice. The key, early on, is to play while <strong>thinking out loud</strong>: why am I bidding this, why am I playing this card. You'll see your instincts settle in deal after deal. And remember: in coinche, several choices are often fine. Don't chase the perfect play, just aim to avoid the obvious blunders. To practise with no consequences, run a few deals <strong>against the AI on <a href=\"/\">Coincheur</a></strong>: you'll quickly spot your bad habits and fix them at your own pace, with no one rushing you.</p>",
        },
      ],
      faq: [
        { q: "What's the number-one beginner mistake?", a: "Bidding a contract that's too high. A failed contract hands all the points to the opponents, so caution pays off early on." },
        { q: "Should you play your trumps right away?", a: "Not necessarily. Trumps are for ruffing and taking key tricks. Keep your biggest ones for the moments that matter, but it depends on the deal." },
      ],
      related: ["deb-choisir-atout", "deb-conseils-premiere-partie"],
    },
  },

  {
    id: "deb-choisir-atout",
    priority: 0.55,
    fr: {
      slug: "choisir-atout-coinche-debutant",
      linkLabel: "Choisir l'atout",
      title: "Comment choisir l'atout à la coinche quand on débute",
      h1: "Comment choisir l'atout quand on débute",
      description:
        "Choisir son atout à la coinche : repères simples pour débutant. Compter ses atouts maîtres, le Valet et le 9, évaluer sa main et annoncer sans se tromper.",
      lead: "Choisir l'atout, c'est décider quelle couleur sera la plus forte. Voici des <strong>repères clairs</strong> pour ne pas te tromper au début.",
      sections: [
        {
          h2: "Regarde tes atouts potentiels",
          html: "<p>Pour chaque couleur, imagine-la en atout. Les cartes maîtresses à l'atout sont le <strong>Valet (20 pts)</strong> et le <strong>9 (14 pts)</strong>, loin devant l'As (11) et le 10 (10). Une couleur avec le Valet et/ou le 9, plus quelques cartes, fait un bon atout.</p>",
        },
        {
          h2: "Une règle de pouce simple",
          html: "<ul><li><strong>4 atouts ou plus</strong> dont le Valet : tu peux annoncer avec confiance.</li><li><strong>3 atouts</strong> avec Valet ou 9 + des As dans les autres couleurs : c'est jouable.</li><li><strong>Moins que ça</strong> : prudence, ou laisse parler ton partenaire.</li></ul><p>Ce ne sont que des repères : plusieurs choix sont souvent corrects.</p>",
        },
        {
          h2: "Pense à ton partenaire",
          html: "<p>Si ton partenaire a déjà annoncé une couleur, le soutenir est souvent payant. La coinche est un jeu d'équipe : deux mains moyennes mais complémentaires valent mieux qu'une seule grosse main.</p>",
        },
        {
          h2: "S'entraîner à évaluer",
          html: "<p>Le meilleur moyen de muscler ton coup d'œil, c'est de jouer beaucoup de donnes <strong>contre l'IA sur <a href=\"/\">Coincheur</a></strong> et d'observer ce qui marche. Tu verras vite quelles mains tiennent leur contrat et lesquelles chutent. Avec le temps, le choix de l'atout devient presque automatique : tu sentiras d'un coup d'œil si une main est jouable. En attendant, retiens qu'<strong>il vaut mieux passer que se lancer dans un contrat douteux</strong>. Et rappelle-toi qu'il n'y a pas une seule bonne réponse : selon ton style et celui de ton partenaire, plusieurs choix d'atout peuvent se défendre. C'est aussi ça, le plaisir de la coinche.</p>",
        },
      ],
      faq: [
        { q: "Quelles sont les meilleures cartes à l'atout ?", a: "Le Valet d'atout (20 points) et le 9 d'atout (14 points). Ce sont les deux cartes les plus fortes, devant l'As et le 10." },
        { q: "Combien d'atouts faut-il pour annoncer ?", a: "Trois à quatre atouts avec une carte maîtresse (Valet ou 9) est un bon repère, mais ça dépend de tes As dans les autres couleurs et de ton partenaire." },
      ],
      related: ["deb-erreurs-frequentes", "deb-memo-antiseche", "deb-comment-jouer"],
    },
    en: {
      slug: "choosing-trump-coinche-beginner",
      linkLabel: "Choosing trump",
      title: "How to choose the trump in coinche as a beginner",
      h1: "How to choose the trump when you're starting out",
      description:
        "Choosing your trump in coinche: simple cues for beginners. Count your master trumps, the Jack and 9, judge your hand and bid without blundering.",
      lead: "Choosing the trump means deciding which suit will be strongest, and it's one of the first big calls you'll make. Here are <strong>clear cues</strong> so you don't go wrong early on, even with little experience. Think of them as training wheels you'll soon outgrow.",
      sections: [
        {
          h2: "Look at your potential trumps",
          html: "<p>For each suit, picture it as trump. The master trump cards are the <strong>Jack (20 pts)</strong> and the <strong>9 (14 pts)</strong>, well ahead of the Ace (11) and 10 (10). A suit with the Jack and/or 9, plus a few cards, makes a good trump.</p>",
        },
        {
          h2: "A simple rule of thumb",
          html: "<ul><li><strong>4 trumps or more</strong> including the Jack: you can bid with confidence.</li><li><strong>3 trumps</strong> with Jack or 9 + Aces in other suits: it's playable.</li><li><strong>Fewer than that</strong>: be cautious, or let your partner speak.</li></ul><p>These are just cues: several choices are often fine.</p>",
        },
        {
          h2: "Think of your partner",
          html: "<p>If your partner has already called a suit, supporting it often pays. Coinche is a team game: two average but complementary hands beat a single big one.</p>",
        },
        {
          h2: "Practise your judgement",
          html: "<p>The best way to sharpen your eye is to play many deals <strong>against the AI on <a href=\"/\">Coincheur</a></strong> and watch what works. You'll quickly learn which hands make their contract and which fall short. Over time, choosing the trump becomes almost automatic: you'll sense at a glance whether a hand is playable. Until then, remember it's <strong>often better to pass than to dive into a doubtful contract</strong>. And keep in mind there's no single right answer: depending on your style and your partner's, several trump choices can be defended. That's part of the fun of coinche.</p>",
        },
      ],
      faq: [
        { q: "What are the best trump cards?", a: "The trump Jack (20 points) and the trump 9 (14 points). They are the two strongest cards, ahead of the Ace and 10." },
        { q: "How many trumps do you need to bid?", a: "Three to four trumps with a master card (Jack or 9) is a good cue, but it depends on your Aces in other suits and on your partner." },
      ],
      related: ["deb-erreurs-frequentes", "deb-memo-antiseche", "deb-comment-jouer"],
    },
  },

  {
    id: "deb-memo-antiseche",
    priority: 0.55,
    fr: {
      slug: "memo-antiseche-coinche-debutant",
      linkLabel: "Mémo / antisèche",
      title: "Mémo coinche : l'antisèche du débutant (cartes et points)",
      h1: "Le mémo / antisèche de la coinche pour débutant",
      description:
        "L'antisèche coinche à garder sous la main : valeur des cartes à l'atout et à la couleur, points par donne, belote, capot. Tout sur une page.",
      lead: "Garde cette <strong>antisèche</strong> sous les yeux pour tes premières parties : l'ordre des cartes et le décompte d'un coup d'œil, sans rien avoir à mémoriser dans l'urgence.",
      sections: [
        {
          h2: "Valeur des cartes",
          html: "<table><tr><th>Carte</th><th>Atout</th><th>Couleur (hors atout)</th></tr><tr><td>Valet</td><td><strong>20</strong></td><td>2</td></tr><tr><td>9</td><td><strong>14</strong></td><td>0</td></tr><tr><td>As</td><td>11</td><td>11</td></tr><tr><td>10</td><td>10</td><td>10</td></tr><tr><td>Roi</td><td>4</td><td>4</td></tr><tr><td>Dame</td><td>3</td><td>3</td></tr><tr><td>8 et 7</td><td>0</td><td>0</td></tr></table>",
        },
        {
          h2: "Les chiffres à retenir",
          html: "<ul><li><strong>162 points</strong> par donne (152 dans les cartes + 10 de der).</li><li><strong>Belote</strong> (Roi + Dame d'atout) = 20 points bonus.</li><li><strong>Capot</strong> (tous les plis) annoncé = 250 points.</li><li><strong>Annonces</strong> : de 80 jusqu'au capot. La coinche double les points (×2).</li></ul>",
        },
        {
          h2: "Le réflexe atout",
          html: "<p>À l'atout, c'est le <strong>Valet puis le 9</strong> qui commandent, pas l'As. Hors atout, on retrouve l'ordre classique : <strong>As, 10, Roi, Dame, Valet</strong>. Mémorise cette inversion : c'est la base de la coinche, et la source de bien des surprises pour les débutants qui croient leur As imbattable.</p>",
        },
        {
          h2: "Comment t'en servir",
          html: "<p>Imprime cette antisèche ou garde-la sur ton téléphone pour tes premières soirées. Au fil des donnes, tu n'auras plus besoin de la regarder : les valeurs rentrent vite. En attendant, elle t'évite les erreurs de décompte et te permet de te concentrer sur le jeu. Et si tu veux t'entraîner avec un décompte automatique, lance une partie <strong>contre l'IA sur <a href=\"/\">Coincheur</a></strong> : tu vois les points tomber pli après pli, ce qui ancre encore mieux les valeurs en mémoire. Rien n'est figé : les conventions de belote ou de capot non annoncé varient selon les tables, alors fixe-les avec tes partenaires avant de commencer.</p>",
        },
      ],
      faq: [
        { q: "Quelle est la carte la plus forte à l'atout ?", a: "Le Valet d'atout : il vaut 20 points et bat toutes les autres cartes, y compris l'As d'atout." },
        { q: "La belote, ça rapporte combien ?", a: "20 points bonus, accordés au joueur qui possède le Roi et la Dame d'atout et les annonce en les jouant." },
      ],
      related: ["deb-compter-points", "deb-choisir-atout", "deb-vocabulaire"],
    },
    en: {
      slug: "coinche-cheat-sheet-beginner",
      linkLabel: "Cheat sheet",
      title: "Coinche cheat sheet for beginners (cards and points)",
      h1: "The coinche cheat sheet for beginners",
      description:
        "The coinche cheat sheet to keep handy: card values in trump and in side suits, points per deal, belote, capot. Everything on one page.",
      lead: "Keep this <strong>cheat sheet</strong> in view for your first games: card order and scoring at a glance, with nothing to memorise under pressure. Come back to it whenever a doubt creeps in mid-deal.",
      sections: [
        {
          h2: "Card values",
          html: "<table><tr><th>Card</th><th>Trump</th><th>Side suit</th></tr><tr><td>Jack</td><td><strong>20</strong></td><td>2</td></tr><tr><td>9</td><td><strong>14</strong></td><td>0</td></tr><tr><td>Ace</td><td>11</td><td>11</td></tr><tr><td>10</td><td>10</td><td>10</td></tr><tr><td>King</td><td>4</td><td>4</td></tr><tr><td>Queen</td><td>3</td><td>3</td></tr><tr><td>8 and 7</td><td>0</td><td>0</td></tr></table>",
        },
        {
          h2: "Numbers to remember",
          html: "<ul><li><strong>162 points</strong> per deal (152 in the cards + 10 for the last trick).</li><li><strong>Belote</strong> (trump King + Queen) = 20 bonus points.</li><li><strong>Capot</strong> (all tricks) bid = 250 points.</li><li><strong>Bids</strong>: from 80 up to capot. The coinche doubles the points (x2).</li></ul>",
        },
        {
          h2: "The trump reflex",
          html: "<p>In trump, the <strong>Jack then the 9</strong> rule, not the Ace. In side suits, the classic order returns: <strong>Ace, 10, King, Queen, Jack</strong>. Memorise this flip: it's the foundation of coinche, and the source of many surprises for beginners who think their Ace is unbeatable.</p>",
        },
        {
          h2: "How to use it",
          html: "<p>Print this cheat sheet or keep it on your phone for your first evenings. As the deals go by, you won't need to look at it: the values sink in fast. Until then, it spares you counting errors and lets you focus on the play. And if you want to practise with automatic scoring, start a game <strong>against the AI on <a href=\"/\">Coincheur</a></strong>: you watch the points land trick after trick, which anchors the values even better. Nothing here is set in stone: rules for belote or for a silent capot vary by table, so agree on them with your partners before you start.</p>",
        },
      ],
      faq: [
        { q: "What is the strongest trump card?", a: "The trump Jack: it's worth 20 points and beats every other card, including the trump Ace." },
        { q: "How much is the belote worth?", a: "20 bonus points, given to the player holding the trump King and Queen who announces them as they play." },
      ],
      related: ["deb-compter-points", "deb-choisir-atout", "deb-vocabulaire"],
    },
  },

  {
    id: "deb-distribution-cartes",
    priority: 0.55,
    fr: {
      slug: "combien-cartes-distribution-coinche",
      linkLabel: "Cartes et distribution",
      title: "Combien de cartes par joueur à la coinche et comment distribuer",
      h1: "Combien de cartes par joueur et comment ça se distribue",
      description:
        "À la coinche, chaque joueur reçoit 8 cartes sur un jeu de 32. Comment couper, distribuer (souvent 3-2-3) et dans quel sens. Le geste de la donne expliqué.",
      lead: "À la coinche, chaque joueur reçoit <strong>8 cartes</strong>, prises dans un jeu de <strong>32 cartes</strong>. La distribution suit un petit rituel facile à retenir, et une fois compris il devient totalement automatique.",
      sections: [
        {
          h2: "8 cartes, 32 au total",
          html: "<p>Le jeu va du <strong>7 à l'As</strong> dans chaque couleur, soit 8 cartes par couleur et 32 en tout. Réparties entre 4 joueurs, cela fait bien <strong>8 cartes chacun</strong>, et donc 8 plis à jouer dans la donne.</p>",
        },
        {
          h2: "Couper puis distribuer",
          html: "<p>Le joueur à droite du donneur <strong>coupe</strong> le paquet, puis le donneur distribue dans le <strong>sens des aiguilles d'une montre</strong>. On distribue par paquets, le plus souvent <strong>3 cartes, puis 2, puis 3</strong> (ou 3-3-2). L'essentiel : que chacun finisse avec 8 cartes.</p>",
        },
        {
          h2: "Qui distribue ?",
          html: "<p>Le rôle de donneur <strong>tourne à chaque donne</strong>, dans le sens du jeu. Le joueur à gauche du donneur ouvre les enchères. C'est une convention simple, mais fixe-la bien en début de partie pour éviter les confusions.</p>",
        },
        {
          h2: "Petits détails qui comptent",
          html: "<p>Quelques conventions de table valent la peine d'être posées dès le départ. Le <strong>sens de distribution</strong> (souvent 3-2-3) doit rester le même toute la partie. On ne regarde ses cartes qu'une fois la distribution terminée. Et si une erreur de donne est constatée avant le début des enchères, on redistribue généralement. Rien de compliqué : ces petits rituels rendent la partie fluide et évitent les litiges. Si tu veux t'affranchir de toute cette logistique pour te concentrer sur le jeu, joue <strong>contre l'IA sur <a href=\"/\">Coincheur</a></strong> : distribution, ordre du tour et décompte sont gérés automatiquement.</p>",
        },
      ],
      faq: [
        { q: "Combien de cartes par joueur à la coinche ?", a: "Huit cartes chacun, soit 32 cartes réparties entre les 4 joueurs. Cela donne 8 plis par donne." },
        { q: "Dans quel sens distribue-t-on ?", a: "Dans le sens des aiguilles d'une montre, en général par paquets de 3-2-3 ou 3-3-2. Le donneur change à chaque donne." },
      ],
      related: ["deb-placement-table", "deb-comment-jouer", "deb-regles-simplifiees"],
    },
    en: {
      slug: "how-many-cards-dealing-coinche",
      linkLabel: "Cards and dealing",
      title: "How many cards per player in coinche and how to deal",
      h1: "How many cards per player and how the deal works",
      description:
        "In coinche each player gets 8 cards from a 32-card deck. How to cut, deal (often 3-2-3) and in which direction. The deal explained.",
      lead: "In coinche, each player gets <strong>8 cards</strong>, drawn from a <strong>32-card</strong> deck. The deal follows a small ritual that's easy to remember, and once you've got it, it becomes completely automatic.",
      sections: [
        {
          h2: "8 cards, 32 in total",
          html: "<p>The deck runs from <strong>7 to Ace</strong> in each suit, so 8 cards per suit and 32 in all. Shared among 4 players, that's exactly <strong>8 cards each</strong>, and therefore 8 tricks to play in the deal. There are no leftover cards and no widow to pick up: everything is dealt out, which keeps coinche clean and simple compared with some other card games.</p>",
        },
        {
          h2: "Cut, then deal",
          html: "<p>The player to the dealer's right <strong>cuts</strong> the deck, then the dealer deals <strong>clockwise</strong>. Cards go out in packets, most often <strong>3, then 2, then 3</strong> (or 3-3-2). What matters: everyone ends up with 8 cards.</p>",
        },
        {
          h2: "Who deals?",
          html: "<p>The dealer role <strong>rotates each deal</strong>, in the direction of play. The player to the dealer's left opens the bidding. It's a simple convention, but set it clearly at the start to avoid confusion.</p>",
        },
        {
          h2: "Small details that matter",
          html: "<p>A few table conventions are worth setting from the start. The <strong>dealing pattern</strong> (often 3-2-3) should stay the same all game. You only look at your cards once dealing is finished. And if a misdeal is spotted before bidding begins, you usually redeal. Nothing complicated: these little rituals keep the game smooth and head off disputes. If you'd rather skip all the logistics and focus on play, play <strong>against the AI on <a href=\"/\">Coincheur</a></strong>: dealing, turn order and scoring are all handled automatically.</p>",
        },
      ],
      faq: [
        { q: "How many cards per player in coinche?", a: "Eight cards each, that is 32 cards shared among the 4 players. This gives 8 tricks per deal." },
        { q: "Which direction do you deal in?", a: "Clockwise, usually in packets of 3-2-3 or 3-3-2. The dealer changes every deal." },
      ],
      related: ["deb-placement-table", "deb-comment-jouer", "deb-regles-simplifiees"],
    },
  },

  {
    id: "deb-placement-table",
    priority: 0.55,
    fr: {
      slug: "placement-table-coinche-partenaire",
      linkLabel: "Se placer à table",
      title: "Comment se placer à table à la coinche (partenaire en face)",
      h1: "Comment se placer à table : partenaire en face",
      description:
        "À la coinche, les partenaires sont assis face à face et les adversaires de chaque côté. Comment former les équipes et pourquoi ce placement compte.",
      lead: "À la coinche, le placement n'est pas anodin : ton <strong>partenaire est assis en face de toi</strong>, et les deux adversaires t'encadrent à gauche et à droite.",
      sections: [
        {
          h2: "Le placement de base",
          html: "<p>Quatre joueurs autour de la table, deux équipes. <strong>Les coéquipiers se font face</strong> : si tu es au Nord, ton partenaire est au Sud, et tes adversaires à l'Est et à l'Ouest. On alterne donc ami / adversaire / ami / adversaire en faisant le tour.</p>",
        },
        {
          h2: "Pourquoi ce placement ?",
          html: "<p>Comme on joue dans le <strong>sens des aiguilles d'une montre</strong>, ce placement fait que tu joues toujours <strong>après un adversaire et avant l'autre</strong>. Ton partenaire ferme souvent le pli après toi : pratique pour assurer un pli ensemble. C'est tout l'esprit d'équipe de la coinche.</p>",
        },
        {
          h2: "Former les équipes",
          html: "<p>Pour tirer les équipes au sort, chacun pioche une carte : les deux plus fortes contre les deux plus faibles, par exemple. Puis on s'assoit en respectant le « partenaire en face ». Une fois lancé, tu peux jouer <strong>contre l'IA sur <a href=\"/\">Coincheur</a></strong>, où le placement est géré pour toi.</p>",
        },
        {
          h2: "Bien utiliser sa position",
          html: "<p>Ta place autour de la table influence ta façon de jouer. Quand tu joues <strong>en dernier sur un pli</strong>, tu as toutes les infos : tu sais exactement quelle carte poser pour remporter le pli au meilleur coût. Quand tu joues en premier, tu donnes le ton et tu peux orienter le jeu. Avec un peu d'habitude, tu apprendras à tirer parti de ta position et de celle de ton partenaire. Rien de figé là encore : selon la donne, être bien placé ne suffit pas, il faut aussi de bonnes cartes. Mais comprendre l'ordre du tour est un vrai plus pour progresser.</p>",
        },
      ],
      faq: [
        { q: "Où est assis mon partenaire à la coinche ?", a: "En face de toi. Les deux adversaires sont à ta gauche et à ta droite : on alterne partenaire et adversaire autour de la table." },
        { q: "Pourquoi les partenaires sont-ils face à face ?", a: "Parce qu'on joue chacun son tour autour de la table. Ainsi, ton partenaire joue après toi et peut souvent finir le pli, ce qui favorise le jeu d'équipe." },
      ],
      related: ["deb-distribution-cartes", "deb-vocabulaire", "deb-comment-jouer"],
    },
    en: {
      slug: "table-seating-coinche-partner",
      linkLabel: "Table seating",
      title: "How to sit at the table in coinche (partner opposite)",
      h1: "How to sit at the table: partner opposite",
      description:
        "In coinche, partners sit opposite each other and opponents on either side. How to form teams and why the seating matters.",
      lead: "In coinche, seating is no accident: your <strong>partner sits opposite you</strong>, with the two opponents flanking you left and right. This simple layout shapes the whole feel of the game, and getting it right from the start avoids a lot of confusion.",
      sections: [
        {
          h2: "The basic layout",
          html: "<p>Four players around the table, two teams. <strong>Teammates face each other</strong>: if you're North, your partner is South, and your opponents are East and West. So you alternate friend / opponent / friend / opponent around the table.</p>",
        },
        {
          h2: "Why this layout?",
          html: "<p>Since play goes <strong>clockwise</strong>, this seating means you always play <strong>after one opponent and before the other</strong>. Your partner often closes the trick after you: handy for securing a trick together. That's the whole team spirit of coinche.</p>",
        },
        {
          h2: "Forming the teams",
          html: "<p>To draw teams at random, each player picks a card: the two highest against the two lowest, for example. Then sit so that \"partner is opposite.\" Once set up, you can play <strong>against the AI on <a href=\"/\">Coincheur</a></strong>, where seating is handled for you.</p>",
        },
        {
          h2: "Using your position well",
          html: "<p>Your seat around the table shapes how you play. When you play <strong>last to a trick</strong>, you have all the information: you know exactly which card to drop to win the trick at the lowest cost. When you play first, you set the tone and can steer the play. With a little experience, you'll learn to exploit your position and your partner's. Nothing is fixed here either: depending on the deal, being well placed isn't enough, you also need good cards. But understanding turn order is a real boost to your progress.</p>",
        },
      ],
      faq: [
        { q: "Where does my partner sit in coinche?", a: "Opposite you. The two opponents are on your left and right: you alternate partner and opponent around the table." },
        { q: "Why do partners sit opposite each other?", a: "Because play goes around the table in turn. That way your partner plays after you and can often close the trick, which favours team play." },
      ],
      related: ["deb-distribution-cartes", "deb-vocabulaire", "deb-comment-jouer"],
    },
  },

  {
    id: "deb-vocabulaire",
    priority: 0.55,
    fr: {
      slug: "vocabulaire-base-coinche",
      linkLabel: "Vocabulaire de base",
      title: "Le vocabulaire de base de la coinche pour débuter",
      h1: "Le vocabulaire de base de la coinche",
      description:
        "Les mots à connaître pour jouer à la coinche : pli, atout, couper, der, contrat, capot, belote, coincher. Le lexique du débutant expliqué simplement.",
      lead: "La coinche a son petit jargon, comme tous les jeux de cartes. Voici les <strong>mots essentiels</strong> pour suivre une partie sans être perdu dès la première donne, et parler comme les habitués. Pas besoin de tout retenir : le reste viendra naturellement en jouant.",
      sections: [
        {
          h2: "Les mots du jeu",
          html: "<ul><li><strong>Pli</strong> : un tour de 4 cartes, une par joueur. Il y en a 8 par donne.</li><li><strong>Atout</strong> : la couleur la plus forte, choisie aux enchères.</li><li><strong>Couper</strong> : jouer un atout quand on n'a pas la couleur demandée.</li><li><strong>Se défausser</strong> : poser une carte inutile quand on ne peut ni fournir ni couper.</li></ul>",
        },
        {
          h2: "Les mots des annonces",
          html: "<ul><li><strong>Contrat</strong> : le nombre de points qu'on s'engage à faire (de 80 au capot).</li><li><strong>Capot</strong> : remporter les 8 plis.</li><li><strong>Coincher</strong> : contrer l'adversaire, ce qui double les points.</li><li><strong>Surcoincher</strong> : re-contrer, ce qui quadruple la mise.</li></ul>",
        },
        {
          h2: "Les mots des points",
          html: "<ul><li><strong>Der (10 de der)</strong> : 10 points pour le dernier pli.</li><li><strong>Belote</strong> : Roi + Dame d'atout = 20 points bonus.</li><li><strong>Chuter</strong> : ne pas atteindre son contrat, et donc tout perdre.</li></ul>",
        },
        {
          h2: "Quelques expressions de table",
          html: "<p>Au-delà du vocabulaire officiel, la coinche a ses petites expressions imagées : « <strong>tenir le contrat</strong> » (le réussir), « <strong>se faire capoter</strong> » (perdre tous les plis), « <strong>passer</strong> » (ne pas enchérir), ou encore « <strong>maître</strong> » pour une carte qui ne peut plus être battue. Pas besoin de tout connaître au départ : ces mots rentrent naturellement en jouant. Le meilleur dictionnaire reste la pratique. Lance quelques donnes <strong>contre l'IA sur <a href=\"/\">Coincheur</a></strong> et tu verras vite chaque terme prendre vie dans une vraie situation de jeu.</p>",
        },
      ],
      faq: [
        { q: "Que veut dire \"couper\" à la coinche ?", a: "Couper, c'est jouer un atout lorsqu'on n'a pas la couleur demandée. L'atout remporte alors le pli face aux autres couleurs." },
        { q: "C'est quoi un pli ?", a: "Un pli est un tour de jeu où chaque joueur pose une carte. La plus forte remporte le pli. Il y a 8 plis dans une donne." },
      ],
      related: ["deb-memo-antiseche", "deb-regles-simplifiees", "deb-comment-jouer"],
    },
    en: {
      slug: "basic-coinche-vocabulary",
      linkLabel: "Basic vocabulary",
      title: "The basic vocabulary of coinche for beginners",
      h1: "The basic vocabulary of coinche",
      description:
        "Words to know to play coinche: trick, trump, ruff, last trick, contract, capot, belote, coinche. The beginner's glossary explained simply.",
      lead: "Coinche has its own little jargon, like every card game. Here are the <strong>essential words</strong> to follow a game without getting lost on the first deal, and to talk like a regular. No need to memorise it all: the rest comes naturally as you play.",
      sections: [
        {
          h2: "The words of play",
          html: "<ul><li><strong>Trick</strong>: one round of 4 cards, one per player. There are 8 per deal.</li><li><strong>Trump</strong>: the strongest suit, chosen during the bidding.</li><li><strong>Ruff</strong>: to play a trump when you can't follow the led suit.</li><li><strong>Discard</strong>: to play a useless card when you can neither follow nor ruff.</li></ul>",
        },
        {
          h2: "The words of bidding",
          html: "<ul><li><strong>Contract</strong>: the number of points you commit to making (from 80 to capot).</li><li><strong>Capot</strong>: winning all 8 tricks.</li><li><strong>Coinche (double)</strong>: to challenge the opponents, doubling the points.</li><li><strong>Surcoinche (redouble)</strong>: to re-challenge, quadrupling the stake.</li></ul>",
        },
        {
          h2: "The words of scoring",
          html: "<ul><li><strong>Der (last-trick bonus)</strong>: 10 points for the final trick.</li><li><strong>Belote</strong>: trump King + Queen = 20 bonus points.</li><li><strong>Fail (chuter)</strong>: to miss your contract, and so lose everything.</li></ul>",
        },
        {
          h2: "A few table phrases",
          html: "<p>Beyond the official vocabulary, coinche has its own colourful phrases: \"<strong>making the contract</strong>\" (succeeding), \"<strong>getting capoted</strong>\" (losing every trick), \"<strong>passing</strong>\" (not bidding), or calling a card \"<strong>master</strong>\" when it can no longer be beaten. You don't need to know them all up front: these words sink in naturally as you play. The best dictionary is practice. Run a few deals <strong>against the AI on <a href=\"/\">Coincheur</a></strong> and you'll soon see each term come alive in a real game situation.</p>",
        },
      ],
      faq: [
        { q: "What does \"to ruff\" mean in coinche?", a: "To ruff is to play a trump when you can't follow the led suit. The trump then wins the trick against the other suits." },
        { q: "What is a trick?", a: "A trick is one round of play where each player lays a card. The strongest card wins it. There are 8 tricks in a deal." },
      ],
      related: ["deb-memo-antiseche", "deb-regles-simplifiees", "deb-comment-jouer"],
    },
  },

  {
    id: "deb-compter-points",
    priority: 0.55,
    fr: {
      slug: "compter-points-facilement-coinche",
      linkLabel: "Compter facilement",
      title: "Compter ses points facilement à la coinche quand on débute",
      h1: "Compter ses points facilement quand on débute",
      description:
        "Compter ses points à la coinche sans se prendre la tête : valeurs clés à mémoriser, le 10 de der, et une méthode simple pour vérifier le contrat.",
      lead: "Compter à la coinche fait peur au début, mais c'est plus simple qu'il n'y paraît. Une donne fait <strong>162 points</strong>, point final.",
      sections: [
        {
          h2: "Mémorise les grosses cartes",
          html: "<p>L'astuce, c'est de ne retenir que les cartes qui valent gros. À l'atout : <strong>Valet 20, 9 14, As 11, 10 10</strong>. Hors atout : <strong>As 11, 10 10</strong>. Le reste (Rois, Dames, petites cartes) pèse peu. Si tu suis les Valets, 9, As et 10, tu as déjà 80 % du compte.</p>",
        },
        {
          h2: "N'oublie pas la der",
          html: "<p>Au moment de totaliser, ajoute <strong>10 points</strong> à l'équipe qui a pris le <strong>dernier pli</strong>. C'est le « 10 de der ». C'est ce qui fait passer le total de 152 (les cartes) à <strong>162</strong> (le total d'une donne).</p>",
        },
        {
          h2: "Vérifier le contrat",
          html: "<p>Compare les points de l'équipe preneuse à son contrat. <strong>Atteint = réussi</strong>, sinon c'est chuté et tout part à l'adversaire. Avec la <strong>belote</strong> (Roi + Dame d'atout), ajoute 20 points à qui les détient.</p>",
        },
        {
          h2: "Laisser la machine compter",
          html: "<p>Au début, laisse-toi aider : <strong>contre l'IA sur <a href=\"/\">Coincheur</a></strong>, le décompte est automatique. Tu te concentres sur le jeu et tu apprends les valeurs sans stress. Petit à petit, amuse-toi à estimer le total de tête avant de vérifier : tu verras que tes estimations deviennent vite très proches du compte réel. Un dernier repère utile : pense par paquets. Un As plus un 10 dans la même couleur, c'est déjà 21 points. Le Valet et le 9 d'atout ensemble, c'est 34 points. En raisonnant par groupes plutôt que carte par carte, le calcul devient nettement plus rapide.</p>",
        },
      ],
      faq: [
        { q: "Combien de points dans une donne de coinche ?", a: "162 points : 152 dans les cartes plus 10 de der pour le dernier pli." },
        { q: "Quelles cartes faut-il surveiller pour compter vite ?", a: "Surtout les Valets et 9 d'atout, et les As et 10 partout. Ce sont elles qui font le gros du score." },
      ],
      related: ["deb-memo-antiseche", "deb-conseils-premiere-partie", "lex-dix-de-der"],
    },
    en: {
      slug: "counting-points-easily-coinche",
      linkLabel: "Counting easily",
      title: "Counting your points easily in coinche as a beginner",
      h1: "Counting your points easily when starting out",
      description:
        "Counting points in coinche without the headache: key values to memorise, the last-trick bonus, and a simple method to check the contract.",
      lead: "Counting in coinche feels scary at first, but it's simpler than it looks once you know the trick. A deal is worth <strong>162 points</strong>, full stop, and only a handful of cards really matter. Get those into your head and the rest falls into place.",
      sections: [
        {
          h2: "Memorise the big cards",
          html: "<p>The trick is to remember only the high-value cards. In trump: <strong>Jack 20, 9 14, Ace 11, 10 10</strong>. In side suits: <strong>Ace 11, 10 10</strong>. The rest (Kings, Queens, low cards) weighs little. Track the Jacks, 9s, Aces and 10s and you already have 80% of the count.</p>",
        },
        {
          h2: "Don't forget the last trick",
          html: "<p>When totalling, add <strong>10 points</strong> to the team that took the <strong>last trick</strong>. That's the last-trick bonus. It's what takes the total from 152 (the cards) to <strong>162</strong> (a full deal).</p>",
        },
        {
          h2: "Checking the contract",
          html: "<p>Compare the bidding team's points with its contract. <strong>Reached = made</strong>, otherwise it fails and everything goes to the opponents. With the <strong>belote</strong> (trump King + Queen), add 20 points to whoever holds them.</p>",
        },
        {
          h2: "Let the machine count",
          html: "<p>Early on, let yourself be helped: <strong>against the AI on <a href=\"/\">Coincheur</a></strong>, scoring is automatic. You focus on the play and learn the values stress-free. Bit by bit, try estimating the total in your head before checking: you'll find your estimates quickly land very close to the real count. One last handy cue: think in bundles. An Ace plus a 10 in the same suit is already 21 points. The trump Jack and 9 together make 34 points. Reasoning by groups rather than card by card makes the maths far faster.</p>",
        },
      ],
      faq: [
        { q: "How many points in a deal of coinche?", a: "162 points: 152 in the cards plus 10 for winning the last trick." },
        { q: "Which cards should you watch to count fast?", a: "Above all the trump Jacks and 9s, and the Aces and 10s everywhere. Those make up most of the score." },
      ],
      related: ["deb-memo-antiseche", "deb-conseils-premiere-partie", "lex-dix-de-der"],
    },
  },

  {
    id: "deb-conseils-premiere-partie",
    priority: 0.55,
    fr: {
      slug: "conseils-reussir-premiere-partie-coinche",
      linkLabel: "Réussir sa 1re partie",
      title: "Conseils pour réussir sa première partie de coinche",
      h1: "Conseils pour réussir sa première partie",
      description:
        "Tes premiers conseils pour bien démarrer à la coinche : rester prudent aux enchères, observer, jouer en équipe, garder la der. De quoi t'amuser dès le départ.",
      lead: "Pour ta toute première partie, vise le <strong>plaisir avant la performance</strong> : personne n'attend de toi que tu joues comme un champion. Quelques conseils simples suffisent à t'éviter les gros écueils et à passer un bon moment. Le reste s'apprendra tout seul, partie après partie.",
      sections: [
        {
          h2: "Reste prudent aux enchères",
          html: "<p>Au début, n'annonce que ce que tu peux tenir. Un contrat à 80 ou 90 réussi vaut mieux qu'un 120 ambitieux qui chute. Tu te feras la main, et tu monteras plus haut au fil des donnes.</p>",
        },
        {
          h2: "Observe et joue en équipe",
          html: "<ul><li><strong>Regarde ce que jouent les autres</strong> : les cartes déjà passées te renseignent.</li><li><strong>Soutiens ton partenaire</strong> : s'il prend un pli, ne le « surmonte » pas inutilement.</li><li><strong>Garde une carte forte</strong> pour la der (le dernier pli, 10 points).</li></ul>",
        },
        {
          h2: "Dédramatise",
          html: "<p>Tu vas faire des erreurs, et c'est normal : tout le monde est passé par là. Plusieurs choix sont souvent corrects, alors ne te bloque pas. Pour t'entraîner sans pression avant la soirée, joue quelques donnes <strong>contre l'IA sur <a href=\"/\">Coincheur</a></strong>.</p>",
        },
        {
          h2: "Garde le rythme et le plaisir",
          html: "<p>Une partie de coinche peut durer un moment : reste concentré sur tes propres donnes plutôt que de ressasser un pli raté. L'ambiance compte autant que le score, surtout pour une première fois. Demande conseil à tes partenaires si tu hésites, la plupart des joueurs adorent expliquer. Et accepte de perdre quelques manches : c'est en jouant de vraies parties qu'on attrape le déclic. Avant ou après ta soirée, quelques donnes <strong>contre l'IA sur <a href=\"/\">Coincheur</a></strong> t'aideront à consolider ce que tu as appris, tranquillement, à ton rythme.</p>",
        },
      ],
      faq: [
        { q: "Quel est le meilleur conseil pour une première partie ?", a: "Reste prudent aux enchères : annonce ce que tu peux tenir. Un petit contrat réussi rapporte, un gros contrat raté coûte cher." },
        { q: "Faut-il connaître toute la stratégie avant de jouer ?", a: "Non. Les bases suffisent pour t'amuser. La stratégie vient en jouant, partie après partie." },
      ],
      related: ["deb-erreurs-frequentes", "deb-jouer-contre-ordinateur", "deb-compter-points"],
    },
    en: {
      slug: "tips-first-coinche-game",
      linkLabel: "Nailing your 1st game",
      title: "Tips to nail your first game of coinche",
      h1: "Tips to nail your first game",
      description:
        "Your first tips to start coinche well: stay cautious in the bidding, observe, play as a team, keep the last trick. Enjoy it from the very start.",
      lead: "For your very first game, aim for <strong>fun over performance</strong>: no one expects you to play like a champion. A few simple tips are enough to dodge the big pitfalls and have a good time. The rest will come on its own, game after game.",
      sections: [
        {
          h2: "Stay cautious in the bidding",
          html: "<p>Early on, only bid what you can hold. An 80 or 90 contract made beats an ambitious 120 that fails, because a failed contract hands every point to the opponents. Count your trumps and your Aces before committing to a number. You'll find your feet and climb higher as the deals go by, and there's no rush to bid big.</p>",
        },
        {
          h2: "Observe and play as a team",
          html: "<ul><li><strong>Watch what others play</strong>: cards already gone tell you a lot.</li><li><strong>Support your partner</strong>: if they win a trick, don't override it needlessly.</li><li><strong>Keep a strong card</strong> for the last trick (10 points).</li></ul>",
        },
        {
          h2: "Take the pressure off",
          html: "<p>You'll make mistakes, and that's normal: everyone has. Several choices are often fine, so don't freeze. To practise stress-free before the evening, play a few deals <strong>against the AI on <a href=\"/\">Coincheur</a></strong>.</p>",
        },
        {
          h2: "Keep the rhythm and the fun",
          html: "<p>A game of coinche can run for a while: stay focused on your own deals rather than dwelling on a lost trick. The mood matters as much as the score, especially the first time. Ask your partners for advice if you hesitate, most players love to explain. And accept losing a few rounds: it's by playing real games that things click. Before or after your evening, a few deals <strong>against the AI on <a href=\"/\">Coincheur</a></strong> will help you cement what you've learned, calmly, at your own pace.</p>",
        },
      ],
      faq: [
        { q: "What's the best tip for a first game?", a: "Stay cautious in the bidding: bid what you can hold. A small contract made scores; a big one missed costs dearly." },
        { q: "Do you need to know all the strategy before playing?", a: "No. The basics are enough to have fun. Strategy comes with play, game after game." },
      ],
      related: ["deb-erreurs-frequentes", "deb-jouer-contre-ordinateur", "deb-compter-points"],
    },
  },

  {
    id: "deb-progresser",
    priority: 0.55,
    fr: {
      slug: "progresser-coinche-niveau-superieur",
      linkLabel: "Progresser",
      title: "Comment progresser à la coinche et passer au niveau supérieur",
      h1: "Comment progresser et passer au niveau supérieur",
      description:
        "Tu maîtrises les bases de la coinche ? Voici comment progresser : enchères plus fines, lecture du jeu, signalisation, et entraînement régulier contre l'IA.",
      lead: "Une fois les bases acquises, progresser à la coinche, c'est <strong>affiner ton jugement</strong> : mieux annoncer, mieux lire le jeu, mieux jouer en équipe. Rien de magique, juste de bonnes habitudes prises donne après donne.",
      sections: [
        {
          h2: "Affine tes enchères",
          html: "<p>Le saut de niveau se joue souvent aux enchères. Apprends à <strong>évaluer ta main</strong> plus finement : compter tes points sûrs, repérer une couleur longue, jauger ce que peut apporter ton partenaire. Tu oseras des contrats plus ambitieux quand ils sont justifiés.</p>",
        },
        {
          h2: "Lis le jeu",
          html: "<ul><li><strong>Mémorise les cartes tombées</strong> : qui n'a plus telle couleur, qui détient sans doute les atouts maîtres.</li><li><strong>Comprends la signalisation</strong> : la façon dont ton partenaire joue te transmet des infos.</li><li><strong>Anticipe les coupes</strong> adverses pour protéger tes points.</li></ul>",
        },
        {
          h2: "Entraîne-toi régulièrement",
          html: "<p>La régularité bat l'intensité. Quelques donnes par jour <strong>contre l'IA sur <a href=\"/\">Coincheur</a></strong>, en augmentant peu à peu le niveau de l'adversaire, font des merveilles. Analyse tes donnes ratées : c'est là qu'on apprend le plus.</p>",
        },
        {
          h2: "Ne tombe pas dans le dogmatisme",
          html: "<p>Attention au piège du joueur qui progresse : croire qu'il existe une seule bonne façon de jouer. En réalité, la coinche laisse une grande place au style et au feeling. Deux excellents joueurs annonceront parfois différemment la même main, et auront tous les deux raison à leur manière. Apprends les principes, mais garde l'esprit ouvert : adapte-toi à tes partenaires, à tes adversaires et à la situation. C'est cette souplesse, plus que la mémorisation de règles rigides, qui distingue les bons joueurs. Continue simplement à jouer, à observer et à te poser des questions : le niveau monte tout seul.</p>",
        },
      ],
      faq: [
        { q: "Quel est le meilleur moyen de progresser à la coinche ?", a: "Jouer régulièrement et analyser ses erreurs. Affiner ses enchères et apprendre à lire les cartes tombées fait la plus grosse différence." },
        { q: "Comment passer d'un niveau intermédiaire à avancé ?", a: "En travaillant la lecture du jeu et la signalisation avec le partenaire, et en se confrontant à des adversaires plus forts, par exemple une IA de niveau élevé." },
      ],
      related: ["deb-jouer-contre-ordinateur", "deb-conseils-premiere-partie", "deb-est-ce-difficile"],
    },
    en: {
      slug: "improve-coinche-next-level",
      linkLabel: "Improving",
      title: "How to improve at coinche and reach the next level",
      h1: "How to improve and reach the next level",
      description:
        "Got the basics of coinche down? Here's how to improve: sharper bidding, reading the game, signalling, and regular practice against the AI.",
      lead: "Once the basics are in place, improving at coinche means <strong>sharpening your judgement</strong>: bid better, read the game better, play as a team better. Nothing magic, just good habits built deal after deal, and a bit of honest self-review.",
      sections: [
        {
          h2: "Sharpen your bidding",
          html: "<p>The jump in level is often won in the bidding. Learn to <strong>judge your hand</strong> more finely: count your sure points, spot a long suit, gauge what your partner can add. You'll dare more ambitious contracts when they're justified, and pass calmly when they're not. Knowing when not to bid is just as valuable as knowing when to push.</p>",
        },
        {
          h2: "Read the game",
          html: "<ul><li><strong>Track the cards played</strong>: who is out of a suit, who likely holds the master trumps.</li><li><strong>Understand signalling</strong>: the way your partner plays passes you information.</li><li><strong>Anticipate opponents' ruffs</strong> to protect your points.</li></ul>",
        },
        {
          h2: "Practise regularly",
          html: "<p>Consistency beats intensity. A few deals a day <strong>against the AI on <a href=\"/\">Coincheur</a></strong>, gradually raising the opponent's level, works wonders. Review your lost deals: that's where you learn the most.</p>",
        },
        {
          h2: "Don't fall into dogmatism",
          html: "<p>Beware the improving player's trap: believing there's only one right way to play. In reality, coinche leaves plenty of room for style and feel. Two excellent players will sometimes bid the same hand differently, and both be right in their own way. Learn the principles, but keep an open mind: adapt to your partners, your opponents and the situation. That flexibility, more than memorising rigid rules, is what sets good players apart. Just keep playing, observing and asking yourself questions: your level rises on its own.</p>",
        },
      ],
      faq: [
        { q: "What's the best way to improve at coinche?", a: "Play regularly and review your mistakes. Sharpening your bidding and learning to read the cards played makes the biggest difference." },
        { q: "How do you go from intermediate to advanced?", a: "By working on reading the game and partner signalling, and by facing stronger opponents, such as a high-level AI." },
      ],
      related: ["deb-jouer-contre-ordinateur", "deb-conseils-premiere-partie", "deb-est-ce-difficile"],
    },
  },

  {
    id: "deb-jouer-contre-ordinateur",
    priority: 0.55,
    fr: {
      slug: "jouer-coinche-contre-ordinateur-apprendre",
      linkLabel: "Jouer contre l'IA",
      title: "Jouer à la coinche seul contre l'ordinateur pour apprendre",
      h1: "Jouer seul contre l'ordinateur pour apprendre",
      description:
        "Apprendre la coinche en solo contre l'ordinateur : aucune pression, à ton rythme, cartes valides indiquées et décompte automatique. La méthode idéale pour débuter.",
      lead: "Jouer <strong>seul contre l'ordinateur</strong> est l'une des meilleures façons d'apprendre la coinche : pas de regard des autres, et tu avances à ton rythme. C'est aussi pratique quand il manque des joueurs pour faire une vraie table, et idéal pour réviser avant une soirée.",
      sections: [
        {
          h2: "Pourquoi c'est idéal pour débuter",
          html: "<ul><li><strong>Aucune pression</strong> : personne ne te juge, tu peux réfléchir autant que tu veux.</li><li><strong>Cartes valides indiquées</strong> : impossible de te tromper sur les règles de base.</li><li><strong>Décompte automatique</strong> : tu te concentres sur le jeu, pas sur les additions.</li><li><strong>Répétition facile</strong> : tu enchaînes les donnes quand tu veux.</li></ul>",
        },
        {
          h2: "Comment en tirer le maximum",
          html: "<p>Joue activement : avant chaque carte, demande-toi pourquoi tu la poses. Quand tu rates un contrat, regarde ce qui a coincé. Monte le niveau de l'IA progressivement pour rester challengé sans te décourager.</p>",
        },
        {
          h2: "Commence maintenant",
          html: "<p>Tu peux lancer une partie tout de suite <strong>contre l'IA sur <a href=\"/\">Coincheur</a></strong>, directement dans ton navigateur, sur ordinateur comme sur mobile. C'est gratuit, et c'est le terrain d'entraînement parfait avant de jouer entre amis.</p>",
        },
        {
          h2: "Du solo au jeu entre amis",
          html: "<p>Jouer contre l'ordinateur n'est pas une fin en soi : c'est un tremplin. Une fois à l'aise, tu te lanceras avec de vrais partenaires sans appréhension, parce que les règles et les réflexes seront déjà en place. L'IA est aussi un excellent partenaire d'entraînement quand il manque des joueurs, ou simplement pour tester une idée sur une main donnée. Garde en tête que rien ne remplace totalement l'ambiance d'une vraie table, mais le solo reste le chemin le plus rapide et le plus serein pour y arriver prêt. À toi de jouer.</p>",
        },
      ],
      faq: [
        { q: "Peut-on apprendre la coinche tout seul ?", a: "Oui, très bien : jouer contre l'ordinateur permet d'apprendre les règles et la stratégie à son rythme, sans avoir besoin de trois autres joueurs." },
        { q: "L'IA est-elle un bon adversaire pour débuter ?", a: "Oui, surtout si on peut régler son niveau. On commence facile pour comprendre, puis on augmente la difficulté pour progresser." },
      ],
      related: ["deb-apprendre-rapidement", "deb-progresser", "deb-comment-jouer"],
    },
    en: {
      slug: "play-coinche-vs-computer-learn",
      linkLabel: "Playing vs the AI",
      title: "Playing coinche solo against the computer to learn",
      h1: "Playing solo against the computer to learn",
      description:
        "Learn coinche solo against the computer: no pressure, at your own pace, valid cards highlighted and automatic scoring. The ideal way to start.",
      lead: "Playing <strong>solo against the computer</strong> is one of the best ways to learn coinche: no one watching, and you move at your own pace. It's also handy when you're short of players for a real table.",
      sections: [
        {
          h2: "Why it's ideal for beginners",
          html: "<ul><li><strong>No pressure</strong>: no one is judging you, you can think as long as you like.</li><li><strong>Valid cards highlighted</strong>: you can't get the basic rules wrong.</li><li><strong>Automatic scoring</strong>: you focus on the play, not the arithmetic.</li><li><strong>Easy repetition</strong>: run deal after deal whenever you want.</li></ul>",
        },
        {
          h2: "How to get the most from it",
          html: "<p>Play actively: before each card, ask yourself why you're playing it. When you miss a contract, look at what went wrong, then try the same kind of hand again. Raise the AI's level gradually to stay challenged without getting discouraged. The goal isn't to win every game, but to understand a little more after each one.</p>",
        },
        {
          h2: "Start now",
          html: "<p>You can launch a game right away <strong>against the AI on <a href=\"/\">Coincheur</a></strong>, straight in your browser, on desktop or mobile. It's free, and it's the perfect training ground before playing with friends.</p>",
        },
        {
          h2: "From solo to playing with friends",
          html: "<p>Playing against the computer isn't an end in itself: it's a springboard. Once comfortable, you'll sit down with real partners without nerves, because the rules and reflexes are already in place. The AI is also a great practice partner when you're short of players, or simply to test an idea on a given hand. Keep in mind that nothing fully replaces the buzz of a real table, but solo play is the fastest, calmest way to get there ready. Your move.</p>",
        },
      ],
      faq: [
        { q: "Can you learn coinche on your own?", a: "Yes, very well: playing against the computer lets you learn the rules and strategy at your own pace, without needing three other players." },
        { q: "Is the AI a good opponent for beginners?", a: "Yes, especially if you can set its level. Start easy to understand, then raise the difficulty to improve." },
      ],
      related: ["deb-apprendre-rapidement", "deb-progresser", "deb-comment-jouer"],
    },
  },

  {
    id: "deb-est-ce-difficile",
    priority: 0.55,
    fr: {
      slug: "coinche-difficile-a-apprendre",
      linkLabel: "Est-ce difficile ?",
      title: "La coinche, est-ce difficile à apprendre ?",
      h1: "La coinche, est-ce difficile à apprendre ?",
      description:
        "La coinche est-elle difficile ? Les bases s'apprennent vite, la profondeur vient avec le temps. Ce qui est facile, ce qui demande de la pratique, et comment démarrer.",
      lead: "La réponse courte : <strong>non, la coinche n'est pas difficile à apprendre</strong>. Les bases se comprennent en une partie ; c'est la richesse stratégique qui se savoure sur la durée, et c'est tant mieux.",
      sections: [
        {
          h2: "Ce qui est facile",
          html: "<p>Le déroulé d'une donne (distribuer, annoncer, jouer 8 plis, compter) se saisit très vite. L'objectif est intuitif : prendre des plis pour atteindre son contrat. Dès la première soirée, on joue et on s'amuse.</p>",
        },
        {
          h2: "Ce qui demande de la pratique",
          html: "<ul><li><strong>L'ordre des cartes à l'atout</strong> : le Valet et le 9 devant l'As, ça surprend au début.</li><li><strong>Les enchères</strong> : bien évaluer sa main vient avec l'expérience.</li><li><strong>Le jeu d'équipe</strong> : lire son partenaire est un art qui s'affine.</li></ul><p>Rien d'insurmontable : tout vient en jouant.</p>",
        },
        {
          h2: "La bonne façon de démarrer",
          html: "<p>Le secret, c'est de jouer sans crainte de l'erreur. Plusieurs choix sont souvent valables, et on apprend de chaque donne. Pour débuter en douceur, lance quelques parties <strong>contre l'IA sur <a href=\"/\">Coincheur</a></strong> : à ton rythme, avec le décompte fait pour toi.</p>",
        },
        {
          h2: "Facile à apprendre, longue à maîtriser",
          html: "<p>C'est sans doute ce qui fait tout le charme de la coinche : on l'apprend en une soirée, mais on ne s'en lasse jamais. Chaque donne est différente, chaque enchère pose une question nouvelle, et même les joueurs chevronnés continuent de progresser. Tu n'as donc rien à redouter : la difficulté n'est pas une barrière à l'entrée, c'est une promesse de plaisir sur la durée. Commence simple, joue régulièrement, et laisse le jeu te révéler peu à peu sa profondeur. C'est exactement ce qui rend la coinche si populaire et si addictive depuis des générations.</p>",
        },
      ],
      faq: [
        { q: "La coinche est-elle plus dure que la belote ?", a: "Un peu, à cause des enchères et de la coinche (le contre). Mais si tu connais la belote, l'ordre des cartes te sera familier et tu apprendras très vite." },
        { q: "Combien de temps pour bien jouer à la coinche ?", a: "Quelques parties suffisent pour les bases. Pour un bon niveau, comptez plusieurs semaines de pratique régulière, mais le plaisir est immédiat." },
      ],
      related: ["deb-apprendre-rapidement", "deb-progresser", "deb-jouer-contre-ordinateur"],
    },
    en: {
      slug: "is-coinche-hard-to-learn",
      linkLabel: "Is it hard?",
      title: "Is coinche hard to learn?",
      h1: "Is coinche hard to learn?",
      description:
        "Is coinche hard? The basics are quick to learn, the depth comes over time. What's easy, what takes practice, and how to get started.",
      lead: "The short answer: <strong>no, coinche isn't hard to learn</strong>. The basics make sense within one game; it's the strategic depth that you savour over time, and that's a good thing. Easy to start, rich enough to keep you hooked for years.",
      sections: [
        {
          h2: "What's easy",
          html: "<p>The flow of a deal (deal, bid, play 8 tricks, count) clicks very fast. The goal is intuitive: win tricks to reach your contract. From the very first evening, you play and you have fun, even if you're still unsure of the finer points.</p>",
        },
        {
          h2: "What takes practice",
          html: "<ul><li><strong>The trump card order</strong>: the Jack and 9 ahead of the Ace surprises people at first.</li><li><strong>The bidding</strong>: judging your hand well comes with experience.</li><li><strong>Team play</strong>: reading your partner is an art that sharpens over time.</li></ul><p>Nothing insurmountable: it all comes with play.</p>",
        },
        {
          h2: "The right way to start",
          html: "<p>The secret is to play without fearing mistakes. Several choices are often valid, and you learn from every deal. To ease in, run a few games <strong>against the AI on <a href=\"/\">Coincheur</a></strong>: at your own pace, with the scoring done for you.</p>",
        },
        {
          h2: "Easy to learn, long to master",
          html: "<p>This is surely what gives coinche its charm: you learn it in one evening, but you never tire of it. Every deal is different, every bid poses a fresh question, and even seasoned players keep improving. So there's nothing to dread: the difficulty isn't a barrier to entry, it's a promise of lasting enjoyment. Start simple, play regularly, and let the game gradually reveal its depth. That's exactly what has made coinche so popular and so addictive for generations.</p>",
        },
      ],
      faq: [
        { q: "Is coinche harder than belote?", a: "A little, because of the bidding and the coinche (the double). But if you know belote, the card order will feel familiar and you'll learn very fast." },
        { q: "How long to play coinche well?", a: "A few games are enough for the basics. For a good level, expect several weeks of regular practice, but the fun is immediate." },
      ],
      related: ["deb-apprendre-rapidement", "deb-progresser", "deb-jouer-contre-ordinateur"],
    },
  },
];
