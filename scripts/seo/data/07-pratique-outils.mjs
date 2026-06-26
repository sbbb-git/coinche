// Catégorie : Pratique et outils (compter, jouer en ligne, s'entraîner).
// Schéma et qualité alignés sur 00-lexique.mjs.

export const category = { fr: "Pratique et outils", en: "Practice and tools" };

export default [
  {
    id: "prat-compter-rapide",
    priority: 0.5,
    fr: {
      slug: "compter-points-donne-rapidement",
      linkLabel: "Compter vite une donne",
      title: "Compter les points d'une donne de coinche rapidement",
      h1: "Compter les points d'une donne en quelques secondes",
      description:
        "Méthode simple pour compter les points d'une donne de coinche sans te tromper : repère les grosses cartes, regroupe par 10, ajoute le 10 de der.",
      lead: "Compter une donne, c'est <strong>162 points à répartir</strong>. Avec une bonne méthode, tu vérifies un contrat en quelques secondes au lieu d'additionner carte par carte.",
      sections: [
        {
          h2: "La méthode en 3 réflexes",
          html: "<p>Au lieu de compter chaque carte une à une, applique ces réflexes :</p><ul><li><strong>Repère d'abord les grosses</strong> : valet et neuf d'atout (20 et 14), as et dix de chaque couleur (11 et 10). Ce sont elles qui font le score.</li><li><strong>Regroupe par 10</strong> : un as + un valet de couleur = 13, deux dix = 20, etc. Les paquets ronds vont plus vite à additionner.</li><li><strong>Ajoute le 10 de der</strong> à l'équipe qui a pris le dernier pli. On l'oublie souvent, et il change l'issue d'un contrat serré.</li></ul>",
        },
        {
          h2: "Le total à retenir",
          html: "<p>Les cartes valent <strong>152 points</strong>, plus <strong>10 de der</strong> = <strong>162</strong>. Si tu comptes les plis d'une équipe et qu'il te manque des points, c'est souvent un dix ou un as oublié. Astuce : compte le camp qui a le moins de plis, puis fais 162 moins ce total pour l'autre camp. C'est plus rapide.</p>",
        },
        {
          h2: "Vérifier sans erreur",
          html: "<p>En fin de donne, les deux totaux doivent faire exactement 162 (ou 250 sur un capot annoncé). Si la somme ne tombe pas juste, recompte : tu as soit doublé une carte, soit oublié le 10 de der. Sur Coincheur, ce calcul est automatique : tu vois le décompte de chaque pli en temps réel, ce qui aide à apprendre la valeur des cartes par l'exemple.</p><p><a href=\"/\">Joue une donne sur Coincheur</a> et regarde le compteur tourner pli après pli.</p>",
        },
        {
          h2: "S'entraîner à compter de tête",
          html: "<p>Compter vite, ça s'apprend. Quelques habitudes qui font la différence :</p><ul><li><strong>Mémorise les 4 grosses</strong> d'abord : valet (20) et neuf (14) d'atout font déjà 34 à eux deux. Le reste s'ajoute autour.</li><li><strong>Compte au fil des plis</strong>, pas tout à la fin : annonce-toi mentalement le total de chaque pli ramassé.</li><li><strong>Surveille les seuils</strong> : pour un contrat à 110, tu sais que tu dois avoir dépassé 100 quand il reste deux plis, sinon il faut une grosse prise.</li></ul><p>Avec un peu d'entraînement, tu sais en cours de donne si ton contrat passe, sans attendre le décompte final.</p>",
        },
      ],
      faq: [
        { q: "Comment compter une donne sans se tromper ?", a: "Repère d'abord les grosses cartes (valet et neuf d'atout, as et dix), regroupe-les par paquets de 10, puis ajoute le 10 de der à l'équipe qui a pris le dernier pli." },
        { q: "Les deux camps doivent faire combien au total ?", a: "Exactement 162 points sur une donne normale (152 de cartes plus 10 de der). Si la somme ne tombe pas juste, une carte a été oubliée ou comptée deux fois." },
      ],
      related: ["prat-valeurs-tableau", "prat-calcul-contrat", "lex-dix-de-der"],
    },
    en: {
      slug: "count-deal-points-fast",
      linkLabel: "Count a deal fast",
      title: "Count the points of a coinche deal quickly",
      h1: "Count a deal's points in seconds",
      description:
        "A simple method to count a coinche deal without mistakes: spot the big cards, group by tens, then add the last-trick bonus.",
      lead: "Counting a deal means <strong>splitting 162 points</strong>. With the right method you check a contract in seconds instead of adding card by card.",
      sections: [
        {
          h2: "The method in 3 reflexes",
          html: "<p>Instead of counting each card one by one, use these reflexes:</p><ul><li><strong>Spot the big cards first</strong>: jack and nine of trump (20 and 14), ace and ten of every suit (11 and 10). They make the score.</li><li><strong>Group by tens</strong>: a side ace plus a jack = 13, two tens = 20, and so on. Round packets are faster to add.</li><li><strong>Add the 10 de der</strong> to the team that won the last trick. It's easy to forget and it decides tight contracts.</li></ul>",
        },
        {
          h2: "The total to remember",
          html: "<p>The cards are worth <strong>152 points</strong>, plus <strong>10 for the last trick</strong> = <strong>162</strong>. If you count one team's tricks and points are missing, it's usually a forgotten ten or ace. Tip: count the side with fewer tricks, then do 162 minus that total for the other side. It's faster.</p>",
        },
        {
          h2: "Check without errors",
          html: "<p>At the end of the deal both totals must add up to exactly 162 (or 250 on a bid capot). If the sum is off, recount: you either double-counted a card or forgot the last-trick bonus. On Coincheur the maths is automatic: you see each trick's count in real time, which teaches card values by example.</p><p><a href=\"/\">Play a deal on Coincheur</a> and watch the counter run trick after trick.</p>",
        },
      ],
      faq: [
        { q: "How do you count a deal without mistakes?", a: "Spot the big cards first (jack and nine of trump, aces and tens), group them into packets of ten, then add the last-trick bonus to the team that won the final trick." },
        { q: "What should both sides total?", a: "Exactly 162 points on a normal deal (152 in cards plus 10 for the last trick). If the sum is off, a card was forgotten or counted twice." },
      ],
      related: ["prat-valeurs-tableau", "prat-calcul-contrat", "lex-dix-de-der"],
    },
  },

  {
    id: "prat-valeurs-tableau",
    priority: 0.5,
    fr: {
      slug: "tableau-valeurs-cartes-coinche",
      linkLabel: "Tableau des valeurs",
      title: "Tableau des valeurs des cartes de coinche (à imprimer)",
      h1: "Tableau des valeurs des cartes de coinche",
      description:
        "Le tableau complet des valeurs des cartes de coinche : atout, couleur, sans-atout et tout-atout. À garder sous les yeux pendant tes parties.",
      lead: "Un seul tableau pour <strong>toutes les valeurs</strong> : atout, couleur, et les variantes sans-atout et tout-atout. Garde-le ouvert le temps de les mémoriser.",
      sections: [
        {
          h2: "Atout et couleur (jeu classique)",
          html: "<table><tr><th>Carte</th><th>Atout</th><th>Couleur</th></tr><tr><td>Valet</td><td><strong>20</strong></td><td>2</td></tr><tr><td>Neuf</td><td><strong>14</strong></td><td>0</td></tr><tr><td>As</td><td>11</td><td>11</td></tr><tr><td>Dix</td><td>10</td><td>10</td></tr><tr><td>Roi</td><td>4</td><td>4</td></tr><tr><td>Dame</td><td>3</td><td>3</td></tr><tr><td>8 et 7</td><td>0</td><td>0</td></tr></table><p>Le valet et le neuf d'atout valent beaucoup plus qu'ailleurs : c'est ce qui rend l'atout si puissant.</p>",
        },
        {
          h2: "Sans-atout et tout-atout",
          html: "<table><tr><th>Carte</th><th>Sans-atout</th><th>Tout-atout</th></tr><tr><td>As</td><td><strong>19</strong></td><td>6</td></tr><tr><td>Dix</td><td>10</td><td>5</td></tr><tr><td>Roi</td><td>4</td><td>3</td></tr><tr><td>Dame</td><td>3</td><td>1</td></tr><tr><td>Valet</td><td>2</td><td><strong>14</strong></td></tr><tr><td>Neuf</td><td>0</td><td>9</td></tr><tr><td>8 et 7</td><td>0</td><td>0</td></tr></table><p>En sans-atout, l'as monte à 19. En tout-atout, chaque couleur joue comme de l'atout : le valet vaut 14 et le neuf 9.</p>",
        },
        {
          h2: "Pourquoi les totaux diffèrent",
          html: "<p>Les barèmes sans-atout et tout-atout sont calibrés pour qu'une donne fasse toujours un total cohérent une fois ramené à 162 (les valeurs brutes sont ensuite multipliées selon la convention de table). Tu n'as pas à recalculer : retiens surtout les ordres de force. Sur <a href=\"/\">Coincheur</a>, le décompte s'adapte automatiquement au contrat choisi.</p><p>Pour mémoriser plus vite, concentre-toi sur les renversements : à l'atout, le valet passe devant l'as et le neuf devant le dix, alors qu'à la couleur l'ordre redevient classique (as, dix, roi, dame). En tout-atout, ce même renversement s'applique à toutes les couleurs. Une fois ces deux bascules comprises, tu n'as plus besoin du tableau.</p>",
        },
      ],
      faq: [
        { q: "Quelle carte vaut le plus à la coinche ?", a: "Le valet d'atout, avec 20 points, suivi du neuf d'atout à 14. En sans-atout, c'est l'as qui domine avec 19 points." },
        { q: "Le neuf vaut combien ?", a: "14 points à l'atout, 0 à la couleur, 9 en tout-atout et 0 en sans-atout. Sa valeur dépend entièrement du contrat." },
      ],
      related: ["prat-compter-rapide", "prat-calcul-contrat", "lex-dix-de-der"],
    },
    en: {
      slug: "coinche-card-values-table",
      linkLabel: "Card values table",
      title: "Coinche card values table (printable)",
      h1: "Coinche card values table",
      description:
        "The full table of coinche card values: trump, plain suit, no-trump and all-trump. Keep it in front of you during your games.",
      lead: "One table for <strong>every value</strong>: trump, plain suit, plus the no-trump and all-trump variants. Keep it open until you've memorised them.",
      sections: [
        {
          h2: "Trump and plain suit (classic game)",
          html: "<table><tr><th>Card</th><th>Trump</th><th>Plain</th></tr><tr><td>Jack</td><td><strong>20</strong></td><td>2</td></tr><tr><td>Nine</td><td><strong>14</strong></td><td>0</td></tr><tr><td>Ace</td><td>11</td><td>11</td></tr><tr><td>Ten</td><td>10</td><td>10</td></tr><tr><td>King</td><td>4</td><td>4</td></tr><tr><td>Queen</td><td>3</td><td>3</td></tr><tr><td>8 and 7</td><td>0</td><td>0</td></tr></table><p>The trump jack and nine are worth far more than elsewhere: that's what makes trump so powerful.</p>",
        },
        {
          h2: "No-trump and all-trump",
          html: "<table><tr><th>Card</th><th>No-trump</th><th>All-trump</th></tr><tr><td>Ace</td><td><strong>19</strong></td><td>6</td></tr><tr><td>Ten</td><td>10</td><td>5</td></tr><tr><td>King</td><td>4</td><td>3</td></tr><tr><td>Queen</td><td>3</td><td>1</td></tr><tr><td>Jack</td><td>2</td><td><strong>14</strong></td></tr><tr><td>Nine</td><td>0</td><td>9</td></tr><tr><td>8 and 7</td><td>0</td><td>0</td></tr></table><p>In no-trump the ace rises to 19. In all-trump every suit plays like trump: the jack is 14 and the nine 9.</p>",
        },
        {
          h2: "Why the totals differ",
          html: "<p>The no-trump and all-trump scales are calibrated so a deal always reaches a consistent total once normalised to 162 (raw values are then scaled by the table's convention). You don't have to recalculate: just remember the rank order. On <a href=\"/\">Coincheur</a> the count adapts to the chosen contract automatically.</p><p>To memorise faster, focus on the reversals: at trump the jack outranks the ace and the nine outranks the ten, whereas in a plain suit the order goes back to classic (ace, ten, king, queen). In all-trump that same reversal applies to every suit. Once you grasp those two switches, you no longer need the table.</p>",
        },
      ],
      faq: [
        { q: "Which card is worth the most in coinche?", a: "The trump jack, at 20 points, then the trump nine at 14. In no-trump the ace dominates with 19 points." },
        { q: "How much is the nine worth?", a: "14 at trump, 0 in a plain suit, 9 in all-trump and 0 in no-trump. Its value depends entirely on the contract." },
      ],
      related: ["prat-compter-rapide", "prat-calcul-contrat", "lex-dix-de-der"],
    },
  },

  {
    id: "prat-feuille-score",
    priority: 0.5,
    fr: {
      slug: "feuille-score-coinche-modele",
      linkLabel: "Feuille de score",
      title: "Feuille de score de coinche : comment la tenir (modèle)",
      h1: "Tenir une feuille de score de coinche",
      description:
        "Comment tenir une feuille de score de coinche : modèle de tableau, ce qu'on note à chaque donne, et comment éviter les disputes de comptage.",
      lead: "Une feuille de score claire évite les disputes en fin de partie. Voici un <strong>modèle simple</strong> et ce qu'il faut y inscrire à chaque donne.",
      sections: [
        {
          h2: "Le modèle de base",
          html: "<p>Deux colonnes, une par équipe, et une ligne par donne :</p><table><tr><th>Donne</th><th>Nous</th><th>Eux</th></tr><tr><td>1</td><td>110</td><td>52</td></tr><tr><td>2</td><td>0</td><td>250</td></tr><tr><td>Total</td><td><strong>110</strong></td><td><strong>302</strong></td></tr></table><p>On additionne au fur et à mesure : la dernière ligne donne le total courant, ce qui permet de voir qui mène d'un coup d'œil.</p>",
        },
        {
          h2: "Ce qu'on note à chaque donne",
          html: "<ul><li><strong>Le contrat annoncé</strong> et par quelle équipe (utile en cas de litige).</li><li><strong>Les points réalisés</strong> par chaque camp, belote comprise.</li><li><strong>Réussi ou chuté</strong> : si le preneur chute, c'est la défense qui marque (contrat + 162, ou le barème de ta table).</li><li>Le facteur <strong>coinche (x2) ou surcoinche (x4)</strong> s'il y en a eu un.</li></ul>",
        },
        {
          h2: "Jusqu'à combien joue-t-on ?",
          html: "<p>La plupart des parties se jouent en <strong>1000 ou 1500 points</strong>. Fixe l'objectif avant de commencer. Pour éviter les erreurs d'addition à la main, Coincheur tient la feuille pour toi : score par donne, total, et historique consultable. <a href=\"/\">Lance une partie</a> et laisse le compteur faire le travail.</p><p>Un dernier conseil : désignez un seul marqueur par partie et faites valider chaque ligne à voix haute par la table. La plupart des litiges de fin de partie ne viennent pas du jeu mais d'une donne mal reportée ou d'un total recopié de travers. Une feuille tenue proprement, c'est une partie sans dispute.</p>",
        },
      ],
      faq: [
        { q: "Que faut-il noter sur une feuille de score de coinche ?", a: "Le contrat annoncé, l'équipe preneuse, les points réalisés par chaque camp (belote comprise), si le contrat est réussi ou chuté, et un éventuel coinche ou surcoinche." },
        { q: "En combien de points se joue une partie ?", a: "Le plus souvent en 1000 ou 1500 points. C'est une convention à fixer avant de commencer." },
      ],
      related: ["prat-calcul-contrat", "prat-app-compteur", "prat-compter-rapide"],
    },
    en: {
      slug: "coinche-score-sheet-template",
      linkLabel: "Score sheet",
      title: "Coinche score sheet: how to keep it (template)",
      h1: "Keeping a coinche score sheet",
      description:
        "How to keep a coinche score sheet: table template, what to write down each deal, and how to avoid scoring disputes at the end.",
      lead: "A clear score sheet prevents end-of-game disputes. Here's a <strong>simple template</strong> and what to record each deal.",
      sections: [
        {
          h2: "The basic template",
          html: "<p>Two columns, one per team, and one row per deal:</p><table><tr><th>Deal</th><th>Us</th><th>Them</th></tr><tr><td>1</td><td>110</td><td>52</td></tr><tr><td>2</td><td>0</td><td>250</td></tr><tr><td>Total</td><td><strong>110</strong></td><td><strong>302</strong></td></tr></table><p>Add up as you go: the bottom row shows the running total, so you can see who leads at a glance.</p>",
        },
        {
          h2: "What to record each deal",
          html: "<ul><li><strong>The contract bid</strong> and by which team (handy in a dispute).</li><li><strong>The points scored</strong> by each side, belote included.</li><li><strong>Made or failed</strong>: if the taker fails, the defence scores (contract + 162, or your table's scale).</li><li>Any <strong>coinche (x2) or surcoinche (x4)</strong> multiplier.</li></ul>",
        },
        {
          h2: "How high do you play?",
          html: "<p>Most games are played to <strong>1000 or 1500 points</strong>. Set the target before you start. To avoid hand-adding mistakes, Coincheur keeps the sheet for you: per-deal score, total, and a browsable history. <a href=\"/\">Start a game</a> and let the counter do the work.</p><p>One last tip: appoint a single scorer per game and have the table confirm each line out loud. Most end-of-game disputes come not from the play but from a deal entered wrong or a total copied carelessly. A sheet kept cleanly means a game without arguments.</p>",
        },
      ],
      faq: [
        { q: "What should you record on a coinche score sheet?", a: "The contract bid, which team took it, the points scored by each side (belote included), whether the contract was made or failed, and any coinche or surcoinche." },
        { q: "How many points does a game go to?", a: "Most often 1000 or 1500 points. It's a convention to agree on before you start." },
      ],
      related: ["prat-calcul-contrat", "prat-app-compteur", "prat-compter-rapide"],
    },
  },

  {
    id: "prat-app-compteur",
    priority: 0.5,
    fr: {
      slug: "compter-points-coinche-application",
      linkLabel: "Compteur sur appli",
      title: "Compter les points de coinche avec une application",
      h1: "Compter les points de coinche avec une appli",
      description:
        "Utiliser une application pour compter les points de coinche : fini les erreurs d'addition. Comment ça marche et ce que fait Coincheur dans le navigateur.",
      lead: "Plus besoin de stylo : une application compte les points à ta place, gère la belote, le 10 de der et les coinches, et tient le total de la partie.",
      sections: [
        {
          h2: "Pourquoi un compteur numérique",
          html: "<p>Compter à la main marche, mais c'est là que naissent les erreurs et les disputes. Un compteur :</p><ul><li>additionne les plis automatiquement et garantit le total de 162 ;</li><li>applique la <strong>belote (20)</strong> et le <strong>10 de der</strong> sans oubli ;</li><li>gère les multiplicateurs <strong>coinche (x2)</strong> et <strong>surcoinche (x4)</strong> ;</li><li>conserve l'historique des donnes.</li></ul>",
        },
        {
          h2: "Compteur seul ou jeu complet ?",
          html: "<p>Certains outils ne font que le décompte d'une partie réelle (tu joues avec de vraies cartes et tu saisis les scores). D'autres, comme Coincheur, sont un <strong>jeu complet</strong> : tu joues les cartes à l'écran et le décompte est fait pour toi, pli par pli. Tu peux donc soit t'entraîner contre l'IA, soit simplement profiter du calcul automatique.</p>",
        },
        {
          h2: "Coincheur, dans ton navigateur",
          html: "<p>Coincheur fonctionne directement dans le navigateur, sans rien installer, et reste utilisable une fois <strong>installé sur l'écran d'accueil</strong> (PWA). Le score est calculé en temps réel et l'historique reste accessible. <a href=\"/\">Essaie-le</a> : tu verras le compteur tourner à chaque pli.</p><p>L'avantage d'un jeu complet sur un simple compteur, c'est que tu n'as rien à saisir : pas de risque de te tromper en reportant les points, pas de carte oubliée dans le décompte. Tu joues, le total se met à jour tout seul, et tu peux remonter l'historique d'une donne pour comprendre où la partie a basculé.</p>",
        },
      ],
      faq: [
        { q: "Existe-t-il une appli pour compter les points de coinche ?", a: "Oui. Coincheur calcule automatiquement les points de chaque donne (belote, 10 de der, coinche et surcoinche compris) directement dans le navigateur, sans installation." },
        { q: "Faut-il installer quelque chose ?", a: "Non. Coincheur s'ouvre dans le navigateur. Tu peux aussi l'ajouter à ton écran d'accueil pour l'utiliser comme une appli, y compris hors connexion." },
      ],
      related: ["prat-feuille-score", "prat-calcul-contrat", "prat-choisir-appli"],
    },
    en: {
      slug: "count-coinche-points-app",
      linkLabel: "Counting app",
      title: "Count coinche points with an app",
      h1: "Count coinche points with an app",
      description:
        "Use an app to count coinche points: no more adding mistakes. How it works and what Coincheur does right in your browser.",
      lead: "No more pen and paper: an app counts the points for you, handles belote, the last-trick bonus and coinches, and keeps the game total.",
      sections: [
        {
          h2: "Why a digital counter",
          html: "<p>Counting by hand works, but that's where mistakes and arguments come from. A counter:</p><ul><li>adds the tricks automatically and guarantees the 162 total;</li><li>applies <strong>belote (20)</strong> and the <strong>last-trick bonus</strong> without forgetting;</li><li>handles the <strong>coinche (x2)</strong> and <strong>surcoinche (x4)</strong> multipliers;</li><li>keeps a history of deals.</li></ul>",
        },
        {
          h2: "Counter only or full game?",
          html: "<p>Some tools only score a real game (you play with physical cards and enter the scores). Others, like Coincheur, are a <strong>full game</strong>: you play the cards on screen and the scoring is done for you, trick by trick. So you can either train against the AI or simply enjoy the automatic count.</p>",
        },
        {
          h2: "Coincheur, in your browser",
          html: "<p>Coincheur runs straight in the browser with nothing to install, and stays usable once <strong>added to your home screen</strong> (PWA). The score is computed in real time and the history stays available. <a href=\"/\">Try it</a> and watch the counter run on every trick.</p><p>The edge of a full game over a plain counter is that you enter nothing: no risk of mistyping points, no card forgotten in the count. You play, the total updates on its own, and you can scroll back through a deal's history to see where the game tipped.</p>",
        },
      ],
      faq: [
        { q: "Is there an app to count coinche points?", a: "Yes. Coincheur automatically computes each deal's points (belote, last-trick bonus, coinche and surcoinche included) right in the browser, with no install." },
        { q: "Do you have to install anything?", a: "No. Coincheur opens in the browser. You can also add it to your home screen to use it like an app, including offline." },
      ],
      related: ["prat-feuille-score", "prat-calcul-contrat", "prat-choisir-appli"],
    },
  },

  {
    id: "prat-jouer-en-ligne",
    priority: 0.5,
    fr: {
      slug: "jouer-coinche-en-ligne-gratuit",
      linkLabel: "Jouer en ligne gratuit",
      title: "Jouer à la coinche en ligne gratuitement",
      h1: "Jouer à la coinche en ligne, gratuitement",
      description:
        "Jouer à la coinche en ligne gratuitement, sans inscription : ouvre Coincheur dans ton navigateur et lance une partie contre des IA en quelques secondes.",
      lead: "Envie d'une partie tout de suite ? Tu peux jouer à la coinche <strong>en ligne et gratuitement</strong>, sans inscription, directement dans le navigateur.",
      sections: [
        {
          h2: "Une partie en quelques secondes",
          html: "<p>Pas besoin de réunir quatre joueurs ni de t'inscrire. Tu ouvres Coincheur, tu choisis ton camp, et tu joues contre trois IA. La distribution, les enchères et le décompte sont gérés automatiquement : tu te concentres sur le jeu.</p>",
        },
        {
          h2: "Gratuit, et sans pub envahissante",
          html: "<p>Coincheur est <strong>gratuit</strong>. L'objectif n'est pas de te bombarder de pubs mais de te faire progresser : IA paramétrables, coach qui explique les coups, exercices ciblés. C'est une plateforme d'entraînement, pas seulement un passe-temps.</p>",
        },
        {
          h2: "Pourquoi en ligne plutôt qu'à quatre ?",
          html: "<p>Jouer en ligne ne remplace pas une vraie tablée, mais c'est parfait pour <strong>s'entraîner</strong> : tu rejoues une situation autant de fois que tu veux, à ton rythme, sans attendre les autres. Et quand le wifi te lâche, ça continue de marcher (voir le jeu hors ligne).</p><p>C'est aussi idéal pour les horaires impossibles : une partie à minuit, dix minutes entre deux rendez-vous, ou simplement le temps d'un trajet. Tu n'as pas besoin de réunir trois autres joueurs ni de t'engager sur une heure entière. Tu lances, tu joues une donne ou dix, tu reprendras le reste plus tard.</p><p><a href=\"/\">Joue une partie maintenant</a>, c'est immédiat.</p>",
        },
      ],
      faq: [
        { q: "Peut-on jouer à la coinche en ligne gratuitement ?", a: "Oui. Coincheur se joue gratuitement en ligne, sans inscription, directement dans le navigateur, contre des IA." },
        { q: "Faut-il créer un compte pour jouer ?", a: "Non, tu peux lancer une partie immédiatement. Un compte sert surtout à retrouver ta progression d'un appareil à l'autre." },
      ],
      related: ["prat-jouer-hors-ligne", "prat-jouer-contre-ia", "prat-jouer-mobile"],
    },
    en: {
      slug: "play-coinche-online-free",
      linkLabel: "Play online free",
      title: "Play coinche online for free",
      h1: "Play coinche online, for free",
      description:
        "Play coinche online for free with no sign-up: open Coincheur in your browser and start a game against AI opponents in seconds.",
      lead: "Want a game right now? You can play coinche <strong>online and free</strong>, no sign-up, straight in your browser.",
      sections: [
        {
          h2: "A game in seconds",
          html: "<p>No need to gather four players or register. You open Coincheur, pick your side and play against three AIs. Dealing, bidding and scoring are handled automatically, so you focus on the game. There's nothing to download and nothing to set up: the table is ready the moment the page loads.</p>",
        },
        {
          h2: "Free, with no intrusive ads",
          html: "<p>Coincheur is <strong>free</strong>. The goal isn't to bombard you with ads but to help you improve: tunable AIs, a coach that explains moves, targeted drills. It's a training platform, not just a pastime.</p>",
        },
        {
          h2: "Why online rather than at a table?",
          html: "<p>Playing online doesn't replace a real table, but it's ideal to <strong>train</strong>: replay a situation as often as you like, at your own pace, with no waiting on others. And when the wifi drops, it keeps working (see offline play).</p><p>It's also perfect for impossible hours: a game at midnight, ten minutes between meetings, or just the length of a commute. You don't need to gather three other players or commit to a full hour. You start, play one deal or ten, and pick up the rest later.</p><p><a href=\"/\">Play a game now</a>, it's instant.</p>",
        },
      ],
      faq: [
        { q: "Can you play coinche online for free?", a: "Yes. Coincheur is free to play online, with no sign-up, directly in your browser, against AI opponents." },
        { q: "Do you need an account to play?", a: "No, you can start a game right away. An account mainly lets you carry your progress from one device to another." },
      ],
      related: ["prat-jouer-hors-ligne", "prat-jouer-contre-ia", "prat-jouer-mobile"],
    },
  },

  {
    id: "prat-jouer-hors-ligne",
    priority: 0.5,
    fr: {
      slug: "jouer-coinche-hors-ligne",
      linkLabel: "Jouer hors ligne",
      title: "Jouer à la coinche hors ligne (sans connexion)",
      h1: "Jouer à la coinche sans connexion",
      description:
        "Jouer à la coinche hors ligne : dans le train, en avion ou sans wifi, Coincheur reste jouable une fois installé en PWA. Comment ça marche.",
      lead: "Pas de réseau ? Pas grave. Une fois Coincheur installé sur ton appareil, tu peux jouer à la coinche <strong>complètement hors ligne</strong>.",
      sections: [
        {
          h2: "Pourquoi le hors ligne est possible",
          html: "<p>Coincheur est une <strong>PWA</strong> (application web progressive). Concrètement, le jeu et les IA tournent sur ton appareil, pas sur un serveur distant. Une fois la page chargée et installée, tout le nécessaire est en cache : tu n'as plus besoin de connexion pour jouer une partie complète.</p>",
        },
        {
          h2: "Comment l'installer pour le hors ligne",
          html: "<ul><li><strong>Sur iPhone</strong> : ouvre Coincheur dans Safari, touche le bouton Partager, puis « Sur l'écran d'accueil ».</li><li><strong>Sur Android</strong> : ouvre le menu du navigateur et choisis « Installer l'application » ou « Ajouter à l'écran d'accueil ».</li><li><strong>Sur ordinateur</strong> : une icône d'installation apparaît dans la barre d'adresse de Chrome ou Edge.</li></ul><p>Aucun store n'est nécessaire : tout passe par le navigateur.</p>",
        },
        {
          h2: "Ce qui marche sans connexion",
          html: "<p>Une partie complète contre l'IA, le décompte des points, les exercices déjà chargés : tout fonctionne. Seules les fonctions qui nécessitent un serveur (synchronisation entre appareils, par exemple) attendront le retour du réseau. <a href=\"/\">Installe Coincheur</a> avant ton prochain trajet sans wifi.</p><p>C'est tout l'intérêt d'un jeu qui calcule en local plutôt que de dépendre d'un serveur : pas de latence, pas de coupure en plein milieu d'une donne, et ta progression reste sur ton appareil. Le métro, l'avion en mode avion, une zone blanche à la campagne : autant de moments où une appli en ligne classique s'arrête, et où Coincheur continue.</p>",
        },
      ],
      faq: [
        { q: "Peut-on jouer à la coinche sans connexion internet ?", a: "Oui. Coincheur est une PWA : une fois installé sur ton écran d'accueil, le jeu et les IA tournent sur ton appareil et fonctionnent hors ligne." },
        { q: "Comment installer Coincheur pour jouer hors ligne ?", a: "Ouvre le site dans ton navigateur, puis utilise « Ajouter à l'écran d'accueil » (iPhone via Safari) ou « Installer l'application » (Android, ordinateur). Aucun store nécessaire." },
      ],
      related: ["prat-jouer-en-ligne", "prat-jouer-mobile", "prat-jouer-contre-ia"],
    },
    en: {
      slug: "play-coinche-offline",
      linkLabel: "Play offline",
      title: "Play coinche offline (no connection)",
      h1: "Play coinche with no connection",
      description:
        "Play coinche offline: on a train, a plane or with no wifi, Coincheur stays playable once installed as a PWA. Here's how it works.",
      lead: "No network? No problem. Once Coincheur is installed on your device, you can play coinche <strong>fully offline</strong>.",
      sections: [
        {
          h2: "Why offline works",
          html: "<p>Coincheur is a <strong>PWA</strong> (progressive web app). In practice, the game and the AIs run on your device, not on a remote server. Once the page is loaded and installed, everything needed is cached: you no longer need a connection to play a full game.</p>",
        },
        {
          h2: "How to install it for offline use",
          html: "<ul><li><strong>On iPhone</strong>: open Coincheur in Safari, tap the Share button, then “Add to Home Screen.”</li><li><strong>On Android</strong>: open the browser menu and choose “Install app” or “Add to Home screen.”</li><li><strong>On desktop</strong>: an install icon appears in the Chrome or Edge address bar.</li></ul><p>No store is needed: it all goes through the browser.</p>",
        },
        {
          h2: "What works without a connection",
          html: "<p>A full game against the AI, point scoring, drills already loaded: it all works. Only features that need a server (cross-device sync, for example) will wait for the network to return. <a href=\"/\">Install Coincheur</a> before your next trip without wifi.</p><p>That's the whole point of a game that computes locally rather than relying on a server: no latency, no cut-off in the middle of a deal, and your progress stays on your device. The subway, a plane in airplane mode, a dead spot in the countryside: all moments where a classic online app stops, and where Coincheur keeps going.</p>",
        },
      ],
      faq: [
        { q: "Can you play coinche without an internet connection?", a: "Yes. Coincheur is a PWA: once installed on your home screen, the game and the AIs run on your device and work offline." },
        { q: "How do you install Coincheur for offline play?", a: "Open the site in your browser, then use “Add to Home Screen” (iPhone via Safari) or “Install app” (Android, desktop). No store required." },
      ],
      related: ["prat-jouer-en-ligne", "prat-jouer-mobile", "prat-jouer-contre-ia"],
    },
  },

  {
    id: "prat-jouer-contre-ia",
    priority: 0.5,
    fr: {
      slug: "jouer-coinche-contre-ordinateur-ia",
      linkLabel: "Jouer contre l'IA",
      title: "Jouer à la coinche contre l'ordinateur (IA)",
      h1: "Jouer à la coinche contre l'ordinateur",
      description:
        "Jouer à la coinche contre l'ordinateur : des IA paramétrables qui enchérissent et jouent comme de vrais partenaires. Idéal pour s'entraîner seul.",
      lead: "Pas de partenaires sous la main ? Joue contre l'<strong>ordinateur</strong> : des IA qui enchérissent, défendent et jouent leurs cartes comme de vrais joueurs.",
      sections: [
        {
          h2: "Des IA qui jouent vraiment",
          html: "<p>Une bonne IA de coinche ne pose pas ses cartes au hasard : elle évalue sa main, enchérit de façon cohérente, signale à son partenaire et essaie de faire chuter le contrat adverse. Sur Coincheur, les trois adversaires et ton partenaire sont gérés par cette même logique de jeu.</p>",
        },
        {
          h2: "Des IA paramétrables",
          html: "<p>Tu peux régler le niveau et le style. Une IA <strong>prudente</strong> sécurise ses contrats ; une IA <strong>agressive</strong> tente des annonces plus hautes. Faire varier les profils t'apprend à t'adapter à différents adversaires, comme à une vraie table. Tu progresses contre des IA douces, puis tu montes la difficulté.</p>",
        },
        {
          h2: "S'entraîner sans pression",
          html: "<p>Jouer contre l'ordinateur, c'est l'occasion de tester une enchère osée, de rejouer une donne, ou d'observer comment l'IA défend, sans gêner personne. Avec le coach activé, tu vois même pourquoi un coup était meilleur qu'un autre. <a href=\"/\">Lance une partie contre l'IA</a> et ajuste le niveau à ta guise.</p><p>Autre avantage : l'IA ne s'agace jamais. Tu peux annuler, recommencer, prendre dix minutes pour réfléchir à une carte sans personne pour te presser. Pour un débutant, c'est le meilleur terrain d'apprentissage ; pour un joueur confirmé, c'est un sparring-partner toujours disponible quand les copains ne le sont pas.</p>",
        },
      ],
      faq: [
        { q: "Peut-on jouer à la coinche seul contre l'ordinateur ?", a: "Oui. Sur Coincheur, tu joues contre trois IA (deux adversaires et un partenaire) qui enchérissent et jouent comme de vrais joueurs." },
        { q: "Peut-on régler la difficulté de l'IA ?", a: "Oui, les IA sont paramétrables : tu choisis un style plus prudent ou plus agressif et tu montes la difficulté à mesure que tu progresses." },
      ],
      related: ["prat-jouer-en-ligne", "prat-entrainement-exercices", "prat-jouer-hors-ligne"],
    },
    en: {
      slug: "play-coinche-vs-computer-ai",
      linkLabel: "Play vs AI",
      title: "Play coinche against the computer (AI)",
      h1: "Play coinche against the computer",
      description:
        "Play coinche against the computer: tunable AIs that bid and play like real partners. Perfect for training on your own.",
      lead: "No partners around? Play against the <strong>computer</strong>: AIs that bid, defend and play their cards like real players.",
      sections: [
        {
          h2: "AIs that actually play",
          html: "<p>A good coinche AI doesn't drop cards at random: it evaluates its hand, bids coherently, signals to its partner and tries to sink the opponents' contract. On Coincheur, the three opponents and your partner all run on this same game logic.</p>",
        },
        {
          h2: "Tunable AIs",
          html: "<p>You can set the level and the style. A <strong>cautious</strong> AI secures its contracts; an <strong>aggressive</strong> one attempts higher bids. Varying the profiles teaches you to adapt to different opponents, just like at a real table. Improve against gentle AIs, then crank up the difficulty.</p>",
        },
        {
          h2: "Train with no pressure",
          html: "<p>Playing the computer is your chance to try a bold bid, replay a deal, or watch how the AI defends, without bothering anyone. With the coach on, you even see why one move beat another. <a href=\"/\">Start a game against the AI</a> and tune the level as you like.</p><p>Another upside: the AI never gets annoyed. You can undo, restart, take ten minutes to think about a card with nobody rushing you. For a beginner it's the best learning ground; for a seasoned player it's a sparring partner always available when friends aren't.</p>",
        },
      ],
      faq: [
        { q: "Can you play coinche solo against the computer?", a: "Yes. On Coincheur you play against three AIs (two opponents and a partner) that bid and play like real players." },
        { q: "Can you adjust the AI difficulty?", a: "Yes, the AIs are tunable: choose a more cautious or more aggressive style and raise the difficulty as you improve." },
      ],
      related: ["prat-jouer-en-ligne", "prat-entrainement-exercices", "prat-jouer-hors-ligne"],
    },
  },

  {
    id: "prat-choisir-appli",
    priority: 0.5,
    fr: {
      slug: "choisir-bonne-application-coinche",
      linkLabel: "Choisir une appli",
      title: "Comment choisir une bonne application de coinche",
      h1: "Comment choisir une bonne application de coinche",
      description:
        "Les critères pour choisir une bonne application de coinche : qualité de l'IA, règles correctes, jeu hors ligne, mobile, et outils pour progresser.",
      lead: "Toutes les applis de coinche ne se valent pas. Voici les <strong>critères qui comptent</strong> pour ne pas perdre ton temps avec une IA qui joue mal.",
      sections: [
        {
          h2: "Les critères qui font la différence",
          html: "<ul><li><strong>Qualité de l'IA</strong> : enchérit-elle logiquement, défend-elle bien ? C'est le critère numéro un.</li><li><strong>Règles correctes</strong> : barème exact (162, belote 20, capot 250), gestion de la coinche et de la surcoinche.</li><li><strong>Hors ligne</strong> : peux-tu jouer sans réseau ?</li><li><strong>Mobile et desktop</strong> : interface lisible sur petit écran comme sur grand.</li><li><strong>Outils de progression</strong> : coach, exercices, statistiques.</li></ul>",
        },
        {
          h2: "Site web ou installation ?",
          html: "<p>Une appli qui passe par le navigateur a un avantage : tu l'essaies en un clic, sans rien installer. Si elle est conçue comme une <strong>PWA</strong>, tu peux ensuite l'ajouter à ton écran d'accueil et jouer hors ligne, sans dépendre d'un store. C'est le meilleur des deux mondes : zéro friction pour démarrer, vraie appli ensuite.</p>",
        },
        {
          h2: "Où se situe Coincheur",
          html: "<p>Coincheur coche ces cases : IA paramétrables, règles fidèles, jeu hors ligne en PWA, interface pensée mobile et desktop, plus un coach et des exercices pour progresser, le tout gratuit. <a href=\"/\">Teste-le</a> et compare par toi-même.</p>",
        },
      ],
      faq: [
        { q: "Quel est le critère le plus important pour choisir une appli de coinche ?", a: "La qualité de l'IA. Une IA qui enchérit et défend logiquement rend les parties intéressantes et utiles pour progresser ; une IA faible gâche l'expérience." },
        { q: "Vaut-il mieux une appli à installer ou un site ?", a: "Un site conçu comme une PWA offre le meilleur des deux : tu l'essaies sans installation, puis tu l'ajoutes à l'écran d'accueil pour jouer hors ligne, sans passer par un store." },
      ],
      related: ["prat-app-compteur", "prat-jouer-mobile", "prat-jouer-contre-ia"],
    },
    en: {
      slug: "choose-good-coinche-app",
      linkLabel: "Choose an app",
      title: "How to choose a good coinche app",
      h1: "How to choose a good coinche app",
      description:
        "The criteria for choosing a good coinche app: AI quality, correct rules, offline play, mobile support, and tools to improve.",
      lead: "Not all coinche apps are equal. Here are the <strong>criteria that matter</strong> so you don't waste time on an AI that plays badly.",
      sections: [
        {
          h2: "The criteria that make the difference",
          html: "<ul><li><strong>AI quality</strong>: does it bid logically and defend well? This is criterion number one.</li><li><strong>Correct rules</strong>: accurate scale (162, belote 20, capot 250), proper handling of coinche and surcoinche.</li><li><strong>Offline</strong>: can you play with no network?</li><li><strong>Mobile and desktop</strong>: an interface readable on small and large screens alike.</li><li><strong>Progress tools</strong>: coach, drills, statistics.</li></ul>",
        },
        {
          h2: "Website or install?",
          html: "<p>An app that runs in the browser has an edge: you try it in one click with nothing to install. If it's built as a <strong>PWA</strong>, you can then add it to your home screen and play offline, without depending on a store. Best of both worlds: zero friction to start, a real app afterwards.</p>",
        },
        {
          h2: "Where Coincheur fits",
          html: "<p>Coincheur ticks these boxes: tunable AIs, faithful rules, offline play as a PWA, an interface designed for mobile and desktop, plus a coach and drills to improve, all free. <a href=\"/\">Try it</a> and compare for yourself.</p><p>The real test is simple: play three or four deals and watch the AI. Does it bid hands that make sense, does it lead the right card in defence, does it keep the last trick when it matters? If the answer is yes, you've found a tool that will genuinely help you progress rather than just pass the time.</p>",
        },
      ],
      faq: [
        { q: "What's the most important criterion when choosing a coinche app?", a: "AI quality. An AI that bids and defends logically makes games interesting and useful for improving; a weak AI ruins the experience." },
        { q: "Is an installable app or a website better?", a: "A site built as a PWA gives you the best of both: try it with no install, then add it to your home screen to play offline, with no store involved." },
      ],
      related: ["prat-app-compteur", "prat-jouer-mobile", "prat-jouer-contre-ia"],
    },
  },

  {
    id: "prat-calcul-contrat",
    priority: 0.5,
    fr: {
      slug: "calculer-score-contrat-coinche",
      linkLabel: "Calculer un contrat",
      title: "Calculer le score d'un contrat (réussi ou chuté)",
      h1: "Calculer le score d'un contrat de coinche",
      description:
        "Comment calculer le score d'un contrat de coinche : contrat réussi, contrat chuté (dedans), effet de la coinche et de la surcoinche. Exemples chiffrés.",
      lead: "Le contrat est réussi ou chuté ? Le calcul change du tout au tout. Voici la règle, avec des <strong>exemples chiffrés</strong> clairs.",
      sections: [
        {
          h2: "Contrat réussi",
          html: "<p>Le preneur réussit s'il atteint <strong>son annonce</strong> avec les points réalisés (cartes + 10 de der, belote comprise). Dans ce cas, son équipe marque la valeur du contrat (souvent l'annonce, parfois plus selon les points réalisés), et la défense marque ses propres points. Exemple : contrat à 110, preneur fait 118 -> contrat réussi, l'équipe preneuse marque selon le barème de la table.</p>",
        },
        {
          h2: "Contrat chuté (dedans)",
          html: "<p>Si le preneur n'atteint pas son annonce, le contrat <strong>chute</strong> (on dit « dedans »). La défense remporte alors la mise : le plus souvent <strong>160 + le montant du contrat</strong>, et le preneur marque 0. Exemple : contrat à 120, preneur ne fait que 100 -> chute, la défense marque 160 + 120 = 280, le preneur 0.</p>",
        },
        {
          h2: "Coinche et surcoinche",
          html: "<table><tr><th>Situation</th><th>Multiplicateur</th></tr><tr><td>Contrat normal</td><td>x1</td></tr><tr><td>Coinché</td><td><strong>x2</strong></td></tr><tr><td>Surcoinché</td><td><strong>x4</strong></td></tr></table><p>La coinche double les points en jeu, la surcoinche les quadruple. Réussir un contrat coinché rapporte gros ; le chuter coûte cher. Sur <a href=\"/\">Coincheur</a>, ce calcul est appliqué automatiquement à chaque donne.</p>",
        },
      ],
      faq: [
        { q: "Comment savoir si un contrat est réussi ?", a: "Le preneur réussit s'il atteint au moins son annonce avec les points réalisés (cartes, 10 de der et belote compris). Sinon le contrat chute." },
        { q: "Que marque la défense si le contrat chute ?", a: "Le plus souvent 160 plus le montant du contrat annoncé, tandis que le preneur marque 0. Le barème exact peut varier selon la table." },
        { q: "Qu'est-ce que change une coinche ?", a: "Une coinche double (x2) les points en jeu, une surcoinche les quadruple (x4). Réussir rapporte alors beaucoup plus, mais chuter coûte d'autant plus cher." },
      ],
      related: ["prat-compter-rapide", "prat-feuille-score", "lex-capot"],
    },
    en: {
      slug: "calculate-coinche-contract-score",
      linkLabel: "Score a contract",
      title: "Calculate a contract's score (made or failed)",
      h1: "Calculate a coinche contract's score",
      description:
        "How to calculate a coinche contract's score: made contract, failed contract (inside), the effect of coinche and surcoinche. Worked examples.",
      lead: "Made or failed? The maths changes completely. Here's the rule, with clear <strong>worked examples</strong>.",
      sections: [
        {
          h2: "Contract made",
          html: "<p>The taker succeeds if they reach <strong>their bid</strong> with the points scored (cards + last-trick bonus, belote included). The taking team then scores the contract value (often the bid, sometimes more depending on points made) and the defence scores its own points. Example: a 110 contract, taker makes 118 -> made, the taking team scores per the table's scale.</p>",
        },
        {
          h2: "Contract failed (inside)",
          html: "<p>If the taker falls short of the bid, the contract <strong>fails</strong> (it's “inside,” dedans). The defence wins the stake: most often <strong>160 + the contract amount</strong>, and the taker scores 0. Example: a 120 contract, taker makes only 100 -> failed, the defence scores 160 + 120 = 280, the taker 0.</p>",
        },
        {
          h2: "Coinche and surcoinche",
          html: "<table><tr><th>Situation</th><th>Multiplier</th></tr><tr><td>Normal contract</td><td>x1</td></tr><tr><td>Coinched</td><td><strong>x2</strong></td></tr><tr><td>Surcoinched</td><td><strong>x4</strong></td></tr></table><p>A coinche doubles the points at stake, a surcoinche quadruples them. Making a coinched contract pays big; failing it costs dearly. On <a href=\"/\">Coincheur</a> this is applied automatically each deal.</p>",
        },
      ],
      faq: [
        { q: "How do you know if a contract is made?", a: "The taker succeeds by reaching at least their bid with the points scored (cards, last-trick bonus and belote included). Otherwise the contract fails." },
        { q: "What does the defence score if the contract fails?", a: "Most often 160 plus the announced contract amount, while the taker scores 0. The exact scale can vary by table." },
        { q: "What does a coinche change?", a: "A coinche doubles (x2) the points at stake, a surcoinche quadruples them (x4). Making it then pays far more, but failing costs all the more." },
      ],
      related: ["prat-compter-rapide", "prat-feuille-score", "lex-capot"],
    },
  },

  {
    id: "prat-memoriser-regles",
    priority: 0.5,
    fr: {
      slug: "memoriser-regles-coinche-fiche",
      linkLabel: "Mémoriser les règles",
      title: "Mémoriser les règles de la coinche (fiche récap)",
      h1: "Mémoriser les règles de la coinche",
      description:
        "Une fiche récap pour mémoriser les règles de la coinche : déroulé d'une donne, valeurs clés, enchères et scoring. L'essentiel sur une page.",
      lead: "Tu connais à peu près les règles mais tu butes sur les détails ? Voici une <strong>fiche récap</strong> pour ancrer l'essentiel et jouer sans hésiter.",
      sections: [
        {
          h2: "Le déroulé d'une donne",
          html: "<ol><li><strong>Distribution</strong> : 8 cartes par joueur (souvent 3 + 2 + 3).</li><li><strong>Enchères</strong> : chacun annonce un contrat (points + couleur d'atout) ou passe.</li><li><strong>Jeu</strong> : on fournit la couleur demandée, on coupe ou on monte à l'atout selon les règles.</li><li><strong>Décompte</strong> : on additionne les plis, on vérifie si le contrat est réussi.</li></ol>",
        },
        {
          h2: "Les chiffres à retenir",
          html: "<table><tr><th>Élément</th><th>Valeur</th></tr><tr><td>Donne complète</td><td>162 (152 + 10 de der)</td></tr><tr><td>Belote (roi + dame d'atout)</td><td>20</td></tr><tr><td>Capot annoncé</td><td>250</td></tr><tr><td>Coinche / surcoinche</td><td>x2 / x4</td></tr></table><p>Pour les valeurs des cartes selon le contrat, garde le tableau des valeurs à côté.</p>",
        },
        {
          h2: "La meilleure façon de mémoriser",
          html: "<p>Lire les règles aide, mais c'est en jouant qu'elles s'ancrent. Joue quelques donnes contre l'IA : tu vois le déroulé en action, le décompte automatique te montre les valeurs, et les règles deviennent des réflexes. <a href=\"/\">Joue une donne sur Coincheur</a> en gardant cette fiche à l'esprit.</p><p>Une astuce de mémorisation : associe chaque chiffre à une image forte. Le 162, c'est « la donne complète ». Le 20 de la belote, c'est « le couple roi-dame ». Le 250 du capot, c'est « tout ou rien ». Ces ancrages se rappellent bien plus facilement qu'une liste sèche, et reviennent tout seuls au moment de marquer.</p>",
        },
      ],
      faq: [
        { q: "Quels chiffres faut-il absolument retenir à la coinche ?", a: "Une donne fait 162 points (152 + 10 de der), la belote vaut 20, le capot annoncé 250, et la coinche double les points (surcoinche x4)." },
        { q: "Quelle est la meilleure façon d'apprendre les règles ?", a: "Jouer quelques donnes contre l'IA : tu vois le déroulé en action et le décompte automatique te fait assimiler les valeurs des cartes par l'exemple." },
      ],
      related: ["prat-valeurs-tableau", "prat-entrainement-exercices", "prat-calcul-contrat"],
    },
    en: {
      slug: "memorise-coinche-rules-cheat-sheet",
      linkLabel: "Memorise the rules",
      title: "Memorise the rules of coinche (cheat sheet)",
      h1: "Memorise the rules of coinche",
      description:
        "A cheat sheet to memorise the rules of coinche: how a deal unfolds, key values, bidding and scoring. The essentials on one page.",
      lead: "You roughly know the rules but trip on the details? Here's a <strong>cheat sheet</strong> to lock in the essentials and play without hesitating.",
      sections: [
        {
          h2: "How a deal unfolds",
          html: "<ol><li><strong>Dealing</strong>: 8 cards per player (often 3 + 2 + 3).</li><li><strong>Bidding</strong>: each player announces a contract (points + trump suit) or passes.</li><li><strong>Play</strong>: follow the led suit, ruff or overtrump as the rules require.</li><li><strong>Scoring</strong>: add up the tricks and check whether the contract is made.</li></ol>",
        },
        {
          h2: "The numbers to remember",
          html: "<table><tr><th>Item</th><th>Value</th></tr><tr><td>Full deal</td><td>162 (152 + 10 last trick)</td></tr><tr><td>Belote (king + queen of trump)</td><td>20</td></tr><tr><td>Bid capot</td><td>250</td></tr><tr><td>Coinche / surcoinche</td><td>x2 / x4</td></tr></table><p>For card values by contract, keep the values table beside you.</p>",
        },
        {
          h2: "The best way to memorise",
          html: "<p>Reading the rules helps, but they stick by playing. Play a few deals against the AI: you see the flow in action, the automatic scoring shows you the values, and the rules become reflexes. <a href=\"/\">Play a deal on Coincheur</a> with this sheet in mind.</p><p>A memory trick: tie each number to a strong image. 162 is “the full deal.” The 20 of belote is “the king-queen couple.” The 250 of a capot is “all or nothing.” These anchors stick far better than a dry list, and come back on their own when it's time to score.</p>",
        },
      ],
      faq: [
        { q: "Which numbers must you remember in coinche?", a: "A deal is worth 162 points (152 + 10 for the last trick), belote scores 20, a bid capot 250, and a coinche doubles the points (surcoinche x4)." },
        { q: "What's the best way to learn the rules?", a: "Play a few deals against the AI: you see the flow in action and the automatic scoring helps you absorb card values by example." },
      ],
      related: ["prat-valeurs-tableau", "prat-entrainement-exercices", "prat-calcul-contrat"],
    },
  },

  {
    id: "prat-arbitrer-litige",
    priority: 0.5,
    fr: {
      slug: "arbitrer-litige-partie-coinche",
      linkLabel: "Arbitrer un litige",
      title: "Arbitrer un désaccord pendant une partie de coinche",
      h1: "Arbitrer un désaccord à la coinche",
      description:
        "Comment trancher un désaccord pendant une partie de coinche : renonce, erreur de comptage, contrat contesté. Des principes simples pour décider sereinement.",
      lead: "Un litige éclate à la table ? Mieux vaut un <strong>principe clair</strong> qu'une dispute. Voici comment trancher les cas les plus fréquents.",
      sections: [
        {
          h2: "Fixer les règles avant de jouer",
          html: "<p>La meilleure arbitrage, c'est la prévention. Avant la première donne, mettez-vous d'accord sur les <strong>conventions de table</strong> : barème exact, capot non annoncé, valeur de la générale, gestion des renonces. Un désaccord vient presque toujours d'une règle non fixée à l'avance.</p>",
        },
        {
          h2: "Les litiges les plus fréquents",
          html: "<ul><li><strong>Renonce</strong> (un joueur n'a pas fourni alors qu'il pouvait) : la convention courante pénalise l'équipe fautive, souvent en attribuant la donne (162) à l'adversaire. À fixer d'avance.</li><li><strong>Erreur de comptage</strong> : recomptez ensemble, les deux totaux doivent faire 162. Le compteur tranche, pas la mémoire.</li><li><strong>Contrat contesté</strong> : seule l'annonce effectivement prononcée compte. D'où l'intérêt de la noter sur la feuille de score.</li></ul>",
        },
        {
          h2: "Quand l'outil tranche pour vous",
          html: "<p>Beaucoup de litiges disparaissent quand le jeu gère lui-même les règles. Sur <a href=\"/\">Coincheur</a>, impossible de mal compter ou de renoncer par erreur : les cartes jouables sont mises en avant et le décompte est automatique. Pratique pour rejouer une situation litigieuse et voir la règle appliquée.</p><p>Si un doute persiste sur un point précis (le sens d'une enchère, la valeur d'une carte dans un contrat), le plus simple est de le rejouer sur l'appli et de constater le résultat plutôt que de discuter à l'infini. Un exemple concret coupe court à un débat bien mieux qu'une règle citée de mémoire par chacun à sa façon.</p>",
        },
      ],
      faq: [
        { q: "Comment trancher un désaccord pendant une partie de coinche ?", a: "Reposez-vous sur les conventions fixées avant la partie. Pour un comptage, recomptez ensemble jusqu'à retomber sur 162. Pour un contrat contesté, seule l'annonce réellement prononcée compte." },
        { q: "Que faire en cas de renonce ?", a: "La convention la plus courante pénalise l'équipe fautive, souvent en attribuant les 162 points de la donne à l'adversaire. L'idéal est de fixer cette règle avant de commencer." },
      ],
      related: ["prat-feuille-score", "prat-calcul-contrat", "prat-memoriser-regles"],
    },
    en: {
      slug: "settle-dispute-coinche-game",
      linkLabel: "Settle a dispute",
      title: "Settle a disagreement during a coinche game",
      h1: "Settle a disagreement in coinche",
      description:
        "How to settle a disagreement during a coinche game: revoke, miscount, contested contract. Simple principles to decide calmly.",
      lead: "A dispute breaks out at the table? A <strong>clear principle</strong> beats an argument. Here's how to settle the most common cases.",
      sections: [
        {
          h2: "Set the rules before you play",
          html: "<p>The best refereeing is prevention. Before the first deal, agree on the <strong>table conventions</strong>: exact scale, silent capot, value of the générale, handling of revokes. A dispute almost always comes from a rule that wasn't set in advance.</p>",
        },
        {
          h2: "The most common disputes",
          html: "<ul><li><strong>Revoke</strong> (a player failed to follow suit when able): the common convention penalises the offending team, often by awarding the deal (162) to the opponents. Agree on this beforehand.</li><li><strong>Miscount</strong>: recount together, both totals must reach 162. The count decides, not memory.</li><li><strong>Contested contract</strong>: only the bid actually spoken counts. Which is why you write it on the score sheet.</li></ul>",
        },
        {
          h2: "When the tool decides for you",
          html: "<p>Many disputes vanish when the game enforces the rules itself. On <a href=\"/\">Coincheur</a> you can't miscount or revoke by mistake: playable cards are highlighted and scoring is automatic. Handy for replaying a contested situation and seeing the rule applied.</p><p>If a doubt lingers on a specific point (the meaning of a bid, a card's value in a contract), the simplest fix is to replay it in the app and see the result, rather than arguing endlessly. A concrete example settles a debate far better than a rule each player quotes from memory their own way.</p>",
        },
      ],
      faq: [
        { q: "How do you settle a disagreement during a coinche game?", a: "Rely on the conventions set before the game. For a count, recount together until you reach 162. For a contested contract, only the bid actually spoken counts." },
        { q: "What do you do about a revoke?", a: "The most common convention penalises the offending team, often by awarding the deal's 162 points to the opponents. Ideally, set this rule before you start." },
      ],
      related: ["prat-feuille-score", "prat-calcul-contrat", "prat-memoriser-regles"],
    },
  },

  {
    id: "prat-jouer-mobile",
    priority: 0.5,
    fr: {
      slug: "jouer-coinche-mobile-iphone-android",
      linkLabel: "Jouer sur mobile",
      title: "Jouer à la coinche sur mobile (iPhone, Android, navigateur)",
      h1: "Jouer à la coinche sur mobile",
      description:
        "Jouer à la coinche sur mobile : iPhone, Android ou simple navigateur. Coincheur s'ouvre sans installation et s'ajoute à l'écran d'accueil en PWA.",
      lead: "Une partie dans les transports ou sur le canapé ? Coincheur se joue sur <strong>mobile</strong>, iPhone comme Android, directement dans le navigateur.",
      sections: [
        {
          h2: "Sur n'importe quel téléphone",
          html: "<p>Pas besoin de chercher dans un store : tu ouvres Coincheur dans le navigateur de ton téléphone et tu joues. L'interface est <strong>pensée pour le tactile</strong> : cartes assez grandes pour le pouce, enchères en quelques tapes, lisible même sur petit écran.</p>",
        },
        {
          h2: "L'ajouter comme une appli",
          html: "<ul><li><strong>iPhone</strong> : dans Safari, bouton Partager puis « Sur l'écran d'accueil ». Une icône apparaît, comme une vraie appli.</li><li><strong>Android</strong> : menu du navigateur, « Installer l'application » ou « Ajouter à l'écran d'accueil ».</li></ul><p>Une fois ajouté, Coincheur s'ouvre en plein écran, sans barre de navigateur, et fonctionne même hors ligne.</p>",
        },
        {
          h2: "Mobile, tablette ou ordinateur",
          html: "<p>Le même site s'adapte à tous les écrans : tu commences une partie sur ton téléphone et tu la retrouves sur ordinateur si tu as un compte. Pas de version au rabais sur mobile : c'est le jeu complet, IA et coach inclus. <a href=\"/\">Ouvre Coincheur sur ton téléphone</a> et ajoute-le à l'écran d'accueil.</p><p>Côté confort, le format mobile a même ses avantages : tu tiens tout dans une main, tu joues d'un pouce, et l'écran vertical met tes cartes bien en évidence. Que tu sois sur un grand iPhone, un Android d'entrée de gamme ou une tablette, l'affichage s'ajuste pour rester lisible et fluide.</p>",
        },
      ],
      faq: [
        { q: "Peut-on jouer à la coinche sur iPhone et Android ?", a: "Oui. Coincheur s'ouvre dans le navigateur de n'importe quel mobile, iPhone comme Android, et peut s'ajouter à l'écran d'accueil pour s'utiliser comme une appli." },
        { q: "Faut-il télécharger une application depuis un store ?", a: "Non. Coincheur est un site web jouable directement dans le navigateur. Tu peux l'ajouter à ton écran d'accueil via « Ajouter à l'écran d'accueil », sans passer par un store." },
      ],
      related: ["prat-jouer-en-ligne", "prat-jouer-hors-ligne", "prat-choisir-appli"],
    },
    en: {
      slug: "play-coinche-mobile-iphone-android",
      linkLabel: "Play on mobile",
      title: "Play coinche on mobile (iPhone, Android, browser)",
      h1: "Play coinche on mobile",
      description:
        "Play coinche on mobile: iPhone, Android or just a browser. Coincheur opens with no install and adds to your home screen as a PWA.",
      lead: "A game on the commute or on the sofa? Coincheur plays on <strong>mobile</strong>, iPhone and Android alike, straight in the browser.",
      sections: [
        {
          h2: "On any phone",
          html: "<p>No need to dig through a store: open Coincheur in your phone's browser and play. The interface is <strong>built for touch</strong>: cards big enough for your thumb, bidding in a few taps, readable even on a small screen.</p>",
        },
        {
          h2: "Add it like an app",
          html: "<ul><li><strong>iPhone</strong>: in Safari, Share button then “Add to Home Screen.” An icon appears, just like a real app.</li><li><strong>Android</strong>: browser menu, “Install app” or “Add to Home screen.”</li></ul><p>Once added, Coincheur opens full screen, with no browser bar, and works even offline.</p>",
        },
        {
          h2: "Mobile, tablet or desktop",
          html: "<p>The same site adapts to every screen: start a game on your phone and pick it up on desktop if you have an account. No watered-down mobile version: it's the full game, AI and coach included. <a href=\"/\">Open Coincheur on your phone</a> and add it to your home screen.</p><p>For comfort, the mobile format even has its perks: you hold everything in one hand, play with a thumb, and the portrait screen puts your cards front and centre. Whether you're on a large iPhone, an entry-level Android or a tablet, the display adjusts to stay readable and smooth.</p>",
        },
      ],
      faq: [
        { q: "Can you play coinche on iPhone and Android?", a: "Yes. Coincheur opens in the browser of any phone, iPhone and Android alike, and can be added to the home screen to be used like an app." },
        { q: "Do you have to download an app from a store?", a: "No. Coincheur is a website playable directly in the browser. You can add it to your home screen via “Add to Home Screen,” with no store involved." },
      ],
      related: ["prat-jouer-en-ligne", "prat-jouer-hors-ligne", "prat-choisir-appli"],
    },
  },

  {
    id: "prat-entrainement-exercices",
    priority: 0.5,
    fr: {
      slug: "entrainer-coinche-exercices",
      linkLabel: "S'entraîner aux exercices",
      title: "S'entraîner à la coinche avec des exercices",
      h1: "S'entraîner à la coinche avec des exercices",
      description:
        "S'entraîner à la coinche avec des exercices ciblés : enchères, défense, jeu de la carte. Comment progresser méthodiquement, comme aux échecs.",
      lead: "Pour progresser vraiment, jouer ne suffit pas : il faut <strong>s'entraîner</strong>. Des exercices ciblés font progresser plus vite que cent parties au hasard.",
      sections: [
        {
          h2: "Pourquoi des exercices, pas seulement des parties",
          html: "<p>En partie, une situation clé revient rarement. Un <strong>exercice</strong> isole une compétence et te la fait répéter : évaluer une main, choisir une enchère, trouver la bonne carte en défense. C'est l'approche des plateformes d'échecs, transposée à la coinche.</p>",
        },
        {
          h2: "Ce qu'on travaille en priorité",
          html: "<ul><li><strong>Les enchères</strong> : quelle main mérite quel contrat ? L'erreur la plus coûteuse des débutants.</li><li><strong>La défense</strong> : faire chuter un contrat adverse, signaler à son partenaire.</li><li><strong>Le jeu de la carte</strong> : garder la der, gérer ses atouts, compter les cartes tombées.</li></ul>",
        },
        {
          h2: "S'entraîner avec Coincheur",
          html: "<p>Coincheur propose des <strong>exercices</strong> et un <strong>coach</strong> qui explique pourquoi un coup est meilleur qu'un autre. Tu rejoues une situation autant de fois qu'il faut, tu vois ton erreur, tu corriges. C'est une plateforme d'entraînement, pas seulement un jeu. <a href=\"/\">Commence à t'entraîner</a> et regarde tes contrats tenir plus souvent.</p><p>Le secret de la progression, c'est la régularité : mieux vaut dix minutes d'exercices par jour qu'une grosse session une fois par mois. En ciblant à chaque fois le point qui te coûte le plus de donnes, tu transformes tes faiblesses en automatismes. Quelques semaines suffisent pour sentir la différence à la table comme contre l'IA.</p>",
        },
      ],
      faq: [
        { q: "Comment progresser à la coinche autrement qu'en jouant ?", a: "Avec des exercices ciblés qui isolent une compétence (enchères, défense, jeu de la carte) et te la font répéter, comme les puzzles aux échecs. Tu progresses plus vite qu'en enchaînant des parties au hasard." },
        { q: "Coincheur propose-t-il des exercices ?", a: "Oui. Coincheur inclut des exercices et un coach qui explique les coups, pour t'entraîner méthodiquement et corriger tes erreurs récurrentes." },
      ],
      related: ["prat-jouer-contre-ia", "prat-memoriser-regles", "prat-jouer-en-ligne"],
    },
    en: {
      slug: "practise-coinche-with-drills",
      linkLabel: "Practise with drills",
      title: "Practise coinche with drills",
      h1: "Practise coinche with drills",
      description:
        "Practise coinche with targeted drills: bidding, defence, card play. How to improve methodically, like on a chess platform.",
      lead: "To truly improve, playing isn't enough: you need to <strong>practise</strong>. Targeted drills improve you faster than a hundred random games.",
      sections: [
        {
          h2: "Why drills, not just games",
          html: "<p>In a game, a key situation rarely comes back. A <strong>drill</strong> isolates one skill and makes you repeat it: evaluating a hand, choosing a bid, finding the right defensive card. It's the chess-platform approach, applied to coinche, where deliberate, focused repetition beats simply logging more table time.</p>",
        },
        {
          h2: "What to work on first",
          html: "<ul><li><strong>Bidding</strong>: which hand deserves which contract? Beginners' costliest mistake.</li><li><strong>Defence</strong>: sinking the opponents' contract, signalling to your partner.</li><li><strong>Card play</strong>: keeping the der, managing trumps, counting the cards played.</li></ul>",
        },
        {
          h2: "Practise with Coincheur",
          html: "<p>Coincheur offers <strong>drills</strong> and a <strong>coach</strong> that explains why one move beats another. Replay a situation as often as needed, see your mistake, fix it. It's a training platform, not just a game. <a href=\"/\">Start practising</a> and watch your contracts hold more often.</p><p>The secret to progress is regularity: ten minutes of drills a day beats one big session a month. By targeting the point that costs you the most deals each time, you turn weaknesses into reflexes. A few weeks are enough to feel the difference, at the table and against the AI alike.</p>",
        },
      ],
      faq: [
        { q: "How can you improve at coinche other than by playing?", a: "With targeted drills that isolate a skill (bidding, defence, card play) and make you repeat it, like chess puzzles. You improve faster than by stringing together random games." },
        { q: "Does Coincheur offer drills?", a: "Yes. Coincheur includes drills and a coach that explains moves, so you can practise methodically and fix your recurring mistakes." },
      ],
      related: ["prat-jouer-contre-ia", "prat-memoriser-regles", "prat-jouer-en-ligne"],
    },
  },
];
