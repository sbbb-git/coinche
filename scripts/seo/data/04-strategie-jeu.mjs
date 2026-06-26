// Catégorie : Stratégie du jeu de la carte (après les annonces).
// Coach non dogmatique : plusieurs lignes de jeu valables selon main/position/contrat.

export const category = { fr: "Stratégie : le jeu de la carte", en: "Strategy: card play" };

export default [
  {
    id: "jeu-atout-premier-tour",
    priority: 0.55,
    fr: {
      slug: "jouer-atout-premier-tour-coinche",
      linkLabel: "Atout au premier tour ?",
      title: "Faut-il jouer atout au premier tour à la coinche ?",
      h1: "Jouer atout dès le premier tour : bonne idée ?",
      description:
        "Faut-il entamer atout au premier tour à la coinche ? Avantages, risques et plusieurs lignes de jeu valables quand tu as pris le contrat ou que tu défends.",
      lead: "Attaquer atout au premier tour est <strong>souvent utile quand tu as pris le contrat</strong>, mais ce n'est pas une obligation. Tout dépend de ta main et de ton plan.",
      sections: [
        {
          h2: "Pourquoi tirer atout tôt",
          html: "<p>Quand tu es le preneur avec un bon paquet d'atouts, jouer atout dès le départ permet de <strong>vider les adversaires de leurs coupes</strong>. Une fois leurs atouts tombés, tes as et tes dix de côté passent sans se faire couper. C'est la ligne classique avec une main longue et maîtresse à l'atout.</p>",
        },
        {
          h2: "Avec quelle carte ouvrir l'atout",
          html: "<p>Pas besoin d'attaquer toujours du plus gros. <strong>Faire un premier tour d'atout avec le valet n'est pas un mauvais choix</strong> : tu prends presque sûrement la main et tu gardes le neuf et l'as pour plus tard. Mais ouvrir d'un petit atout pour « tâter » la distribution se défend aussi, surtout si tu crains une mauvaise répartition.</p>",
        },
        {
          h2: "Quand t'abstenir",
          html: "<ul><li>Atouts courts ou faibles : tirer atout te désarme avant l'adversaire.</li><li>Tu comptes sur des coupes : garde tes petits atouts pour couper les côtés.</li><li>En défense : ouvrir atout peut aider le preneur à faire tomber les tiens. Réfléchis avant.</li></ul>",
        },
      ],
      faq: [
        { q: "Faut-il toujours jouer atout au premier tour ?", a: "Non. C'est souvent bon pour le preneur avec beaucoup d'atouts maîtres, mais avec peu d'atouts ou un plan de coupes, mieux vaut s'abstenir." },
        { q: "Peut-on ouvrir l'atout avec le valet ?", a: "Oui, c'est une ligne tout à fait correcte : tu prends la main presque à coup sûr tout en conservant le neuf et l'as pour la suite." },
      ],
      related: ["jeu-tirer-atouts", "jeu-couper-defausser", "lex-atout-sec"],
    },
    en: {
      slug: "lead-trump-first-trick-coinche",
      linkLabel: "Trump on the first trick?",
      title: "Should you lead trump on the first trick in coinche?",
      h1: "Leading trump on the very first trick: good idea?",
      description:
        "Should you lead trump first in coinche? Upsides, risks and several valid lines whether you took the contract or you're defending.",
      lead: "Leading trump first is <strong>often useful when you took the contract</strong>, but it's not mandatory. It all depends on your hand and your plan.",
      sections: [
        {
          h2: "Why draw trumps early",
          html: "<p>As declarer with a strong trump holding, leading trump early <strong>strips the opponents of their ruffs</strong>. Once their trumps are gone, your side aces and tens run safely. It's the classic line with a long, strong trump suit.</p>",
        },
        {
          h2: "Which card to open trumps with",
          html: "<p>You don't always have to lead the biggest one. <strong>Opening the trump suit with the jack is far from a bad choice</strong>: you almost surely win the trick while keeping the nine and ace for later. But leading a low trump to probe the layout is also fine, especially if you fear a bad split.</p>",
        },
        {
          h2: "When to hold off",
          html: "<ul><li>Short or weak trumps: drawing trumps disarms you before the opponents.</li><li>You're counting on ruffs: keep small trumps to cut side suits.</li><li>On defence: leading trump can help declarer pull yours. Think first.</li></ul>",
        },
      ],
      faq: [
        { q: "Should you always lead trump on the first trick?", a: "No. It's often good for declarer with many master trumps, but with few trumps or a ruffing plan, it's better to hold off." },
        { q: "Can you open trumps with the jack?", a: "Yes, it's a perfectly sound line: you win the trick almost for sure while keeping the nine and ace for later." },
      ],
      related: ["jeu-tirer-atouts", "jeu-couper-defausser", "lex-atout-sec"],
    },
  },

  {
    id: "jeu-tirer-atouts",
    priority: 0.55,
    fr: {
      slug: "tirer-atouts-adverses-coinche",
      linkLabel: "Tirer les atouts ?",
      title: "Faut-il toujours tirer les atouts adverses à la coinche ?",
      h1: "Tirer les atouts de l'adversaire : jusqu'où ?",
      description:
        "Faut-il purger les atouts adverses à la coinche ? Quand insister, quand s'arrêter, et comment compter pour ne pas gaspiller tes maîtres.",
      lead: "Tirer les atouts protège tes cartes maîtresses, mais <strong>les tirer tous, tout le temps, est une erreur fréquente</strong>. Le bon dosage dépend de ton plan.",
      sections: [
        {
          h2: "Le but : sécuriser tes côtés",
          html: "<p>Faire tomber les atouts adverses sert à <strong>empêcher l'adversaire de couper</strong> tes as et tes dix. Si tu as une couleur longue et maîtresse à côté, purger les atouts d'abord garantit qu'elle passera.</p>",
        },
        {
          h2: "Quand s'arrêter",
          html: "<p>Inutile de tirer un atout de plus si <strong>tu es déjà maître partout</strong>. Chaque tour d'atout « pour rien » te coûte une carte et un tempo. Compte : s'il reste un seul atout adverse mais qu'il est plus petit que les tiens, laisse-le, il tombera tout seul.</p>",
        },
        {
          h2: "Quand ne pas tirer du tout",
          html: "<ul><li>Tu as besoin de tes atouts pour <strong>couper</strong> une couleur courte.</li><li>Tu vises la der : garde un atout maître pour le dernier pli.</li><li>En défense : tirer atout aide souvent le preneur, pas toi.</li></ul>",
        },
      ],
      faq: [
        { q: "Faut-il toujours tirer tous les atouts ?", a: "Non. Tu tires les atouts pour protéger tes maîtres, mais tu t'arrêtes dès que tu es maître partout ou si tu as besoin d'atouts pour couper." },
        { q: "Comment savoir s'il reste des atouts ?", a: "En comptant ceux déjà tombés. Avec 8 atouts en jeu, suis les tours : quand le compte est bon, tu sais s'il reste un atout adverse." },
      ],
      related: ["jeu-atout-premier-tour", "jeu-compter-atouts", "jeu-cartes-maitresses"],
    },
    en: {
      slug: "draw-opponents-trumps-coinche",
      linkLabel: "Draw the trumps?",
      title: "Should you always draw the opponents' trumps in coinche?",
      h1: "Drawing the opponents' trumps: how far?",
      description:
        "Should you clear the opponents' trumps in coinche? When to keep pulling, when to stop, and how to count so you don't waste your masters.",
      lead: "Drawing trumps protects your masters, but <strong>pulling them all, every time, is a common mistake</strong>. The right dose depends on your plan.",
      sections: [
        {
          h2: "The goal: secure your side suits",
          html: "<p>Knocking out the opponents' trumps stops them from <strong>ruffing</strong> your aces and tens. With a long, strong side suit, clearing trumps first guarantees it will run.</p>",
        },
        {
          h2: "When to stop",
          html: "<p>No need to pull one more trump if <strong>you're already master everywhere</strong>. Each pointless trump round costs you a card and a tempo. Count: if one opponent trump remains but it's smaller than yours, leave it, it will fall on its own.</p>",
        },
        {
          h2: "When not to draw at all",
          html: "<ul><li>You need your trumps to <strong>ruff</strong> a short suit.</li><li>You're after the last trick: keep a master trump for it.</li><li>On defence: drawing trumps usually helps declarer, not you.</li></ul>",
        },
      ],
      faq: [
        { q: "Should you always draw all the trumps?", a: "No. You draw trumps to protect your masters, but stop once you're master everywhere or when you need trumps to ruff." },
        { q: "How do you know if trumps remain?", a: "By counting the ones already played. With 8 trumps in play, follow the rounds: when the count adds up, you know whether an opponent still holds one." },
      ],
      related: ["jeu-atout-premier-tour", "jeu-compter-atouts", "jeu-cartes-maitresses"],
    },
  },

  {
    id: "jeu-choisir-entame",
    priority: 0.55,
    fr: {
      slug: "choisir-entame-coinche",
      linkLabel: "Choisir son entame",
      title: "Quelle carte choisir pour l'entame à la coinche ?",
      h1: "Bien choisir sa carte d'entame",
      description:
        "Comment choisir son entame à la coinche : attaquer ses maîtres, jouer la couleur du partenaire ou tâter l'adversaire. Plusieurs entames valables expliquées.",
      lead: "L'<strong>entame</strong> est ta première carte du pli : elle oriente toute la donne. Il n'y a pas une seule bonne entame, mais des choix adaptés à ta main.",
      sections: [
        {
          h2: "Entamer ses cartes maîtresses",
          html: "<p>Avec un <strong>as de côté accompagné</strong> (as + autres cartes de la couleur), l'entamer encaisse un pli sûr et te garde la main. C'est une entame solide quand tu veux marquer vite des points avant que l'adversaire ne coupe.</p>",
        },
        {
          h2: "Aider son partenaire",
          html: "<p>Si ton partenaire a annoncé une couleur ou pris le contrat, <strong>entamer dans sa couleur</strong> est souvent la meilleure idée : tu joues vers sa force. En défense, c'est un grand classique pour faire passer ses points à lui.</p>",
        },
        {
          h2: "Entames prudentes",
          html: "<ul><li><strong>Petite carte neutre</strong> : tu observes sans rien donner.</li><li>Éviter d'attaquer sous un roi ou une dame seuls : tu risques de les offrir.</li><li>Atout : utile si tu veux purger, risqué si tes atouts sont faibles.</li></ul>",
        },
      ],
      faq: [
        { q: "Quelle est la meilleure entame à la coinche ?", a: "Il n'y en a pas une seule. Attaquer un as de côté, jouer la couleur du partenaire ou sortir une carte neutre sont toutes des options valables selon ta main et le contrat." },
        { q: "Faut-il entamer atout en défense ?", a: "Parfois, pour gêner le preneur, mais avec des atouts faibles tu l'aides souvent à purger. Réfléchis à ta force d'atout avant." },
      ],
      related: ["jeu-entame-sous-as", "jeu-petit-pour-partenaire", "jeu-cartes-maitresses"],
    },
    en: {
      slug: "choose-opening-lead-coinche",
      linkLabel: "Choose your lead",
      title: "Which card to choose for the opening lead in coinche?",
      h1: "Choosing your opening lead well",
      description:
        "How to choose your opening lead in coinche: cash your masters, lead your partner's suit or probe the opponents. Several valid leads explained.",
      lead: "The <strong>opening lead</strong> is your first card of the trick: it shapes the whole deal. There's no single best lead, only choices suited to your hand.",
      sections: [
        {
          h2: "Lead your master cards",
          html: "<p>With a <strong>supported side ace</strong> (ace plus other cards in the suit), leading it banks a sure trick and keeps the lead. It's a solid lead when you want quick points before the opponents can ruff.</p>",
        },
        {
          h2: "Help your partner",
          html: "<p>If your partner bid a suit or took the contract, <strong>leading their suit</strong> is often best: you play toward their strength. On defence it's a classic way to let their points come in.</p>",
        },
        {
          h2: "Cautious leads",
          html: "<ul><li><strong>Small neutral card</strong>: you watch without giving anything away.</li><li>Avoid leading away from a lone king or queen: you risk handing them over.</li><li>Trump: useful to clear, risky if your trumps are weak.</li></ul>",
        },
      ],
      faq: [
        { q: "What's the best opening lead in coinche?", a: "There isn't a single one. Cashing a side ace, leading your partner's suit or playing a neutral card are all valid options depending on your hand and the contract." },
        { q: "Should you lead trump on defence?", a: "Sometimes, to annoy declarer, but with weak trumps you often help them clear. Weigh your trump strength first." },
      ],
      related: ["jeu-entame-sous-as", "jeu-petit-pour-partenaire", "jeu-cartes-maitresses"],
    },
  },

  {
    id: "jeu-entame-sous-as",
    priority: 0.5,
    fr: {
      slug: "entame-sous-as-coinche",
      linkLabel: "Entame sous l'as",
      title: "L'entame sous l'as à la coinche : bonne ou mauvaise idée ?",
      h1: "Entamer sous l'as : à éviter ou à oser ?",
      description:
        "Entame sous l'as à la coinche : pourquoi c'est souvent risqué, et les cas où elle se justifie. Analyse non dogmatique avec exemples.",
      lead: "« Entamer sous l'as » veut dire jouer une petite carte d'une couleur dont tu détiens l'as, sans poser l'as. <strong>Souvent risqué, parfois malin.</strong>",
      sections: [
        {
          h2: "Pourquoi c'est risqué",
          html: "<p>Si tu sors une petite carte sous ton as, l'adversaire peut <strong>prendre le pli avec une carte plus faible</strong> (roi, dame) que tu aurais battue. Pire, ton as risque ensuite de se faire couper si la couleur revient. D'où le proverbe « jamais sous un as ».</p>",
        },
        {
          h2: "Quand ça se défend quand même",
          html: "<p>Le proverbe n'est pas absolu. Sous-entamer peut être bon si :</p><ul><li>Ton partenaire a annoncé la couleur : tu joues vers sa force.</li><li>Tu veux <strong>conserver ton as comme reprise</strong> plus tard, en sécurité.</li><li>Tu cherches à faire couper l'adversaire pour te renseigner sur la distribution.</li></ul>",
        },
        {
          h2: "L'alternative : l'as franc",
          html: "<p>Dans le doute, <strong>poser l'as</strong> encaisse le pli tout de suite et t'évite de le voir disparaître. C'est l'entame sûre quand l'as est sec ou peu accompagné. Le sous-entame est plutôt un coup réfléchi, pas un réflexe.</p>",
        },
      ],
      faq: [
        { q: "Pourquoi dit-on « jamais sous un as » ?", a: "Parce qu'en jouant petit sous ton as, tu laisses l'adversaire prendre avec une carte plus faible et tu risques de te faire couper l'as ensuite." },
        { q: "L'entame sous l'as est-elle toujours mauvaise ?", a: "Non. Elle peut être utile pour jouer la couleur du partenaire ou garder son as comme reprise sûre. C'est un choix réfléchi, pas une règle." },
      ],
      related: ["jeu-choisir-entame", "jeu-cartes-maitresses", "lex-atout-sec"],
    },
    en: {
      slug: "lead-under-ace-coinche",
      linkLabel: "Leading under the ace",
      title: "Leading under the ace in coinche: good or bad idea?",
      h1: "Leading under the ace: avoid it or dare it?",
      description:
        "Leading under the ace in coinche: why it's often risky, and the cases where it's justified. A non-dogmatic look with examples.",
      lead: "Leading under the ace means playing a small card in a suit where you hold the ace, without playing the ace. <strong>Often risky, sometimes clever.</strong>",
      sections: [
        {
          h2: "Why it's risky",
          html: "<p>Leading a small card under your ace lets an opponent <strong>win with a weaker card</strong> (king, queen) you would have beaten. Worse, your ace may then get ruffed if the suit comes back. Hence the saying \"never under an ace.\"</p>",
        },
        {
          h2: "When it's still defensible",
          html: "<p>The saying isn't absolute. Under-leading can be good when:</p><ul><li>Your partner bid the suit: you play toward their strength.</li><li>You want to <strong>keep your ace as a safe entry</strong> for later.</li><li>You want to force an opponent ruff to read the distribution.</li></ul>",
        },
        {
          h2: "The alternative: cash the ace",
          html: "<p>When in doubt, <strong>playing the ace</strong> banks the trick right away and avoids losing it. It's the safe lead when the ace is bare or barely supported. Under-leading is a thought-out play, not a reflex.</p>",
        },
      ],
      faq: [
        { q: "Why do players say \"never under an ace\"?", a: "Because leading small under your ace lets an opponent win with a weaker card, and your ace may then get ruffed afterwards." },
        { q: "Is leading under the ace always bad?", a: "No. It can help to play your partner's suit or to keep your ace as a safe entry. It's a thought-out choice, not a rule." },
      ],
      related: ["jeu-choisir-entame", "jeu-cartes-maitresses", "lex-atout-sec"],
    },
  },

  {
    id: "jeu-signaler-partenaire",
    priority: 0.55,
    fr: {
      slug: "signaler-partenaire-coinche",
      linkLabel: "Signaler au partenaire",
      title: "Signaler à son partenaire à la coinche : appel et défausse",
      h1: "Communiquer avec son partenaire : les signaux",
      description:
        "Les bases du signal à la coinche : l'appel pour une couleur, la défausse parlante, et comment lire les cartes de ton partenaire sans tricher.",
      lead: "À la coinche, <strong>la parole est interdite</strong> en cours de jeu : tu communiques avec ton partenaire uniquement par les cartes que tu poses. Voici les bases.",
      sections: [
        {
          h2: "L'appel : demander une couleur",
          html: "<p>Quand tu ne peux pas prendre le pli, <strong>la carte que tu défausses parle</strong>. Jouer une grosse carte (au-dessus du sept) dans une couleur signale souvent que tu y es fort et que tu « appelles » ton partenaire à la rejouer. Une petite carte dit l'inverse : n'y va pas.</p>",
        },
        {
          h2: "La défausse parlante",
          html: "<p>Quand tu n'as plus la couleur demandée et que tu ne coupes pas, <strong>choisis ta défausse avec intention</strong>. Te défausser d'une couleur indique généralement que tu n'as rien à y garder, donc que ta force est ailleurs. Ton partenaire en déduit où sont tes points.</p>",
        },
        {
          h2: "Rester prudent",
          html: "<ul><li>Les signaux sont des <strong>conventions de table</strong> : mets-toi d'accord avec ton partenaire avant.</li><li>L'adversaire lit aussi tes cartes : un signal renseigne tout le monde.</li><li>Le contrat passe avant le signal : ne sacrifie pas un pli juste pour « parler ».</li></ul>",
        },
      ],
      faq: [
        { q: "Comment appeler une couleur à son partenaire ?", a: "En jouant une carte forte (au-dessus du sept) dans la couleur, tu signales que tu y es bien et que tu invites ton partenaire à la rejouer. Une petite carte signale l'inverse." },
        { q: "Le signal renseigne-t-il aussi l'adversaire ?", a: "Oui. Tout le monde voit les cartes, donc un signal informe les quatre joueurs. À utiliser quand l'avantage pour ton camp dépasse le risque." },
      ],
      related: ["jeu-petit-pour-partenaire", "jeu-defendre-pris", "jeu-choisir-entame"],
    },
    en: {
      slug: "signaling-partner-coinche",
      linkLabel: "Signaling your partner",
      title: "Signaling your partner in coinche: call and discard",
      h1: "Talking to your partner: the signals",
      description:
        "Signaling basics in coinche: calling for a suit, the meaningful discard, and how to read your partner's cards without cheating.",
      lead: "In coinche, <strong>talking is forbidden</strong> during play: you communicate with your partner only through the cards you play. Here are the basics.",
      sections: [
        {
          h2: "The call: asking for a suit",
          html: "<p>When you can't win the trick, <strong>the card you discard speaks</strong>. Playing a high card (above the seven) in a suit usually signals strength there and \"calls\" your partner to lead it back. A small card says the opposite: stay away.</p>",
        },
        {
          h2: "The meaningful discard",
          html: "<p>When you're out of the led suit and not ruffing, <strong>choose your discard on purpose</strong>. Discarding a suit generally shows you have nothing to keep there, so your strength lies elsewhere. Your partner reads where your points are.</p>",
        },
        {
          h2: "Stay careful",
          html: "<ul><li>Signals are <strong>table conventions</strong>: agree on them beforehand.</li><li>Opponents read your cards too: a signal informs everyone.</li><li>The contract comes before the signal: don't waste a trick just to \"talk.\"</li></ul>",
        },
      ],
      faq: [
        { q: "How do you call a suit to your partner?", a: "By playing a high card (above the seven) in the suit, you signal strength there and invite your partner to lead it back. A small card signals the opposite." },
        { q: "Does the signal also inform the opponents?", a: "Yes. Everyone sees the cards, so a signal informs all four players. Use it when the gain for your side outweighs the risk." },
      ],
      related: ["jeu-petit-pour-partenaire", "jeu-defendre-pris", "jeu-choisir-entame"],
    },
  },

  {
    id: "jeu-compter-atouts",
    priority: 0.55,
    fr: {
      slug: "compter-atouts-tombes-coinche",
      linkLabel: "Compter les atouts",
      title: "Comment compter les atouts déjà tombés à la coinche ?",
      h1: "Compter les atouts : la compétence clé",
      description:
        "Apprends à compter les atouts tombés à la coinche : 8 atouts en jeu, méthode simple pour savoir combien il en reste et chez qui.",
      lead: "Savoir <strong>combien d'atouts restent en jeu</strong> est sans doute la compétence la plus rentable de la coinche. Et c'est plus simple qu'il n'y paraît.",
      sections: [
        {
          h2: "Le point de départ : 8 atouts",
          html: "<p>Dans une couleur d'atout, il y a <strong>8 cartes</strong> en tout (V, 9, A, 10, R, D, 8, 7). Tu en vois certaines dans ta main. À chaque tour d'atout, additionne celles posées sur la table : quand le total atteint 8, il n'en reste plus.</p>",
        },
        {
          h2: "Une méthode simple",
          html: "<p>Beaucoup de joueurs comptent <strong>par tours plutôt que carte par carte</strong> : un tour d'atout où tout le monde fournit, c'est 4 atouts partis. Deux tours pleins, c'est 8, donc plus rien. Si quelqu'un coupe ou se défausse, ajuste ton compte.</p>",
        },
        {
          h2: "À quoi ça sert",
          html: "<ul><li>Savoir si tu peux <strong>encaisser ton as de côté</strong> sans te faire couper.</li><li>Savoir s'il faut tirer un dernier tour d'atout ou t'arrêter.</li><li>Repérer l'atout maître qui reste pour la der.</li></ul>",
        },
      ],
      faq: [
        { q: "Combien y a-t-il d'atouts dans une donne ?", a: "Huit : le valet, le neuf, l'as, le dix, le roi, la dame, le huit et le sept de la couleur d'atout." },
        { q: "Comment savoir s'il reste des atouts ?", a: "Compte ceux déjà tombés. Quand la somme des atouts joués atteint huit, il n'en reste aucun. Compter par tours pleins (4 atouts par tour) aide beaucoup." },
      ],
      related: ["jeu-tirer-atouts", "jeu-cartes-maitresses", "jeu-milieu-donne"],
    },
    en: {
      slug: "count-trumps-played-coinche",
      linkLabel: "Counting trumps",
      title: "How to count the trumps already played in coinche?",
      h1: "Counting trumps: the key skill",
      description:
        "Learn to count the trumps played in coinche: 8 trumps in play, a simple method to know how many remain and who holds them.",
      lead: "Knowing <strong>how many trumps are left</strong> is probably the most profitable skill in coinche. And it's simpler than it sounds.",
      sections: [
        {
          h2: "The starting point: 8 trumps",
          html: "<p>A trump suit holds <strong>8 cards</strong> in all (J, 9, A, 10, K, Q, 8, 7). You see some in your hand. On each trump round, add up those on the table: when the total hits 8, none remain.</p>",
        },
        {
          h2: "A simple method",
          html: "<p>Many players count <strong>by rounds rather than card by card</strong>: a trump round where everyone follows is 4 trumps gone. Two full rounds make 8, so nothing left. If someone ruffs or discards, adjust your count.</p>",
        },
        {
          h2: "What it's for",
          html: "<ul><li>Knowing whether you can <strong>cash your side ace</strong> without getting ruffed.</li><li>Knowing whether to pull a last trump round or stop.</li><li>Spotting the master trump left for the last trick.</li></ul>",
        },
      ],
      faq: [
        { q: "How many trumps are there in a deal?", a: "Eight: the jack, nine, ace, ten, king, queen, eight and seven of the trump suit." },
        { q: "How do you know if trumps remain?", a: "Count those already played. When the trumps played add up to eight, none are left. Counting by full rounds (4 trumps per round) helps a lot." },
      ],
      related: ["jeu-tirer-atouts", "jeu-cartes-maitresses", "jeu-milieu-donne"],
    },
  },

  {
    id: "jeu-defendre-pris",
    priority: 0.55,
    fr: {
      slug: "defendre-adversaire-pris-coinche",
      linkLabel: "Bien défendre",
      title: "Bien défendre quand l'adversaire a pris à la coinche",
      h1: "Défendre face au preneur : faire chuter",
      description:
        "Comment défendre à la coinche quand l'adversaire a pris le contrat : marquer des points, viser la chute et coordonner ta défense avec ton partenaire.",
      lead: "Quand l'adversaire prend le contrat, ton objectif change : tu ne cherches plus à réussir, mais à <strong>l'empêcher d'atteindre son contrat</strong>, voire à le faire chuter.",
      sections: [
        {
          h2: "Compter pour la chute",
          html: "<p>Le preneur doit réaliser son contrat sur 162 points. Ta défense gagne si elle <strong>l'empêche d'atteindre son score annoncé</strong>. Garde en tête combien de points il lui manque : chaque pli défensif, chaque dix arraché compte.</p>",
        },
        {
          h2: "Encaisser tes maîtres vite",
          html: "<p>Contre un preneur qui va purger les atouts, <strong>prends tes as et tes dix tant que tu le peux</strong>. Attendre, c'est risquer de les voir coupés. Une entame sur ton as de côté est souvent le bon premier coup en défense.</p>",
        },
        {
          h2: "Jouer en équipe",
          html: "<ul><li><strong>Monter sur la carte du preneur</strong>, pas sur celle de ton partenaire.</li><li>Mets tes points (dix, as) sous le pli quand ton partenaire est maître.</li><li>Signale ta couleur forte pour qu'il rejoue vers toi.</li></ul>",
        },
      ],
      faq: [
        { q: "Comment faire chuter le preneur à la coinche ?", a: "En l'empêchant d'atteindre son contrat : encaisse tes cartes maîtres avant qu'il purge les atouts, arrache-lui des points et coordonne-toi avec ton partenaire." },
        { q: "Faut-il mettre ses points sur les plis du partenaire ?", a: "Oui, quand ton partenaire est déjà maître du pli, glisser un dix ou un as dessous fait monter ton total défensif sans risque." },
      ],
      related: ["jeu-signaler-partenaire", "jeu-cartes-maitresses", "jeu-petit-pour-partenaire"],
    },
    en: {
      slug: "defending-against-declarer-coinche",
      linkLabel: "Defending well",
      title: "Defending well when the opponent took the bid in coinche",
      h1: "Defending against declarer: forcing it down",
      description:
        "How to defend in coinche when the opponent took the contract: score points, aim for the set and coordinate your defence with your partner.",
      lead: "When an opponent takes the contract, your goal shifts: you no longer try to make it, you try to <strong>stop them reaching their contract</strong>, ideally to set it.",
      sections: [
        {
          h2: "Count for the set",
          html: "<p>Declarer must make their contract out of 162 points. Your defence wins if it <strong>keeps them below their bid</strong>. Track how many points they still need: every defensive trick, every ten you grab counts.</p>",
        },
        {
          h2: "Cash your masters fast",
          html: "<p>Against a declarer who'll draw trumps, <strong>take your aces and tens while you can</strong>. Waiting risks seeing them ruffed. Leading your side ace is often the right first defensive move.</p>",
        },
        {
          h2: "Play as a team",
          html: "<ul><li><strong>Overtake declarer's card</strong>, not your partner's.</li><li>Drop your points (ten, ace) under the trick when your partner is master.</li><li>Signal your strong suit so they lead toward you.</li></ul>",
        },
      ],
      faq: [
        { q: "How do you set declarer in coinche?", a: "By keeping them below their contract: cash your masters before trumps are drawn, grab points from them and coordinate with your partner." },
        { q: "Should you put points on your partner's tricks?", a: "Yes, when your partner already wins the trick, slipping a ten or ace under it raises your defensive total at no risk." },
      ],
      related: ["jeu-signaler-partenaire", "jeu-cartes-maitresses", "jeu-petit-pour-partenaire"],
    },
  },

  {
    id: "jeu-cartes-maitresses",
    priority: 0.55,
    fr: {
      slug: "tirer-cartes-maitresses-coinche",
      linkLabel: "Tirer ses maîtres",
      title: "Quand tirer ses cartes maîtresses à la coinche ?",
      h1: "Encaisser ses maîtres : le bon moment",
      description:
        "Quand encaisser tes cartes maîtres à la coinche : tirer tôt pour sécuriser, ou attendre pour mieux marquer. Plusieurs timings selon la situation.",
      lead: "Une carte « maîtresse » est celle qui gagne à coup sûr le pli si tu la joues. <strong>Le timing pour l'encaisser fait toute la différence.</strong>",
      sections: [
        {
          h2: "Tirer tôt pour sécuriser",
          html: "<p>Si tu crains que ta couleur soit <strong>coupée par l'adversaire</strong>, encaisse tes maîtres tôt. Un as de côté qui traîne trop longtemps finit souvent coupé. En défense surtout, prends tes points avant que le preneur purge les atouts.</p>",
        },
        {
          h2: "Attendre pour mieux placer ses points",
          html: "<p>À l'inverse, garder une maîtresse peut payer : tu la gardes comme <strong>reprise de main</strong> ou pour ramasser un gros pli plus tard, quand l'adversaire aura mis ses points dessous. Une maîtresse à atout conservée pour la der vaut 10 points bonus.</p>",
        },
        {
          h2: "Compter avant de tirer",
          html: "<ul><li>Vérifie qu'il <strong>ne reste plus d'atout</strong> chez l'adversaire avant d'encaisser un as de côté.</li><li>Si la couleur est déjà coupée chez un adversaire, ne lui offre pas un point gratuit.</li><li>Garde une reprise pour finir ta couleur longue.</li></ul>",
        },
      ],
      faq: [
        { q: "Faut-il tirer ses cartes maîtres tout de suite ?", a: "Pas toujours. Tire-les tôt si elles risquent d'être coupées, mais garde-en parfois une comme reprise ou pour la der. Le bon moment dépend du compte d'atouts." },
        { q: "Une carte maîtresse peut-elle se faire couper ?", a: "Oui, si un adversaire n'a plus la couleur, il peut couper ta maîtresse avec un atout. D'où l'intérêt de purger les atouts d'abord ou d'encaisser tôt." },
      ],
      related: ["jeu-tirer-atouts", "jeu-compter-atouts", "jeu-eviter-coupe-maitres"],
    },
    en: {
      slug: "cash-master-cards-coinche",
      linkLabel: "Cash your masters",
      title: "When to cash your master cards in coinche?",
      h1: "Cashing your masters: the right moment",
      description:
        "When to cash your master cards in coinche: pull them early to secure, or wait to score better. Several timings depending on the situation.",
      lead: "A \"master\" card is one that's sure to win the trick when you play it. <strong>The timing of cashing it makes all the difference.</strong>",
      sections: [
        {
          h2: "Cash early to secure",
          html: "<p>If you fear your suit will be <strong>ruffed by an opponent</strong>, cash your masters early. A side ace that lingers too long often gets ruffed. On defence especially, take your points before declarer draws trumps.</p>",
        },
        {
          h2: "Wait to place your points better",
          html: "<p>Conversely, holding a master can pay off: keep it as an <strong>entry</strong> or to scoop a big trick later, once opponents have dropped points under it. A trump master kept for the last trick is worth a 10-point bonus.</p>",
        },
        {
          h2: "Count before cashing",
          html: "<ul><li>Check that <strong>no trumps remain</strong> with the opponents before cashing a side ace.</li><li>If the suit is already void at an opponent's, don't hand them a free ruff.</li><li>Keep an entry to run your long suit.</li></ul>",
        },
      ],
      faq: [
        { q: "Should you cash your master cards right away?", a: "Not always. Cash them early if they risk being ruffed, but sometimes keep one as an entry or for the last trick. The right time depends on the trump count." },
        { q: "Can a master card be ruffed?", a: "Yes, if an opponent is void in the suit, they can ruff your master with a trump. Hence drawing trumps first or cashing early." },
      ],
      related: ["jeu-tirer-atouts", "jeu-compter-atouts", "jeu-eviter-coupe-maitres"],
    },
  },

  {
    id: "jeu-couper-defausser",
    priority: 0.55,
    fr: {
      slug: "couper-ou-defausser-coinche",
      linkLabel: "Couper ou défausser ?",
      title: "Couper ou se défausser à la coinche : comment choisir ?",
      h1: "Couper ou se défausser : le bon réflexe",
      description:
        "Couper ou se défausser à la coinche quand tu n'as plus la couleur ? Règles d'obligation, calcul de valeur et choix selon la position et le pli.",
      lead: "Quand tu n'as plus la couleur demandée, deux options : <strong>couper à l'atout</strong> ou <strong>te défausser</strong> d'une autre couleur. Le choix dépend des points en jeu et des règles.",
      sections: [
        {
          h2: "Ce que les règles imposent",
          html: "<p>À la coinche, si tu n'as pas la couleur, tu dois <strong>couper à l'atout</strong> (souvent avec obligation de monter si un adversaire a déjà coupé). Exception fréquente : <strong>si ton partenaire est déjà maître du pli</strong>, la convention t'autorise à te défausser au lieu de couper. Vérifie les règles de ta table.</p>",
        },
        {
          h2: "Quand couper est rentable",
          html: "<ul><li>Le pli contient <strong>beaucoup de points</strong> (as, dix, der) et un adversaire est maître.</li><li>Tu as des petits atouts dont c'est le meilleur usage.</li><li>Couper te fait reprendre la main pour dérouler ta couleur.</li></ul>",
        },
        {
          h2: "Quand mieux vaut se défausser",
          html: "<p>Si ton partenaire est maître et que tu en as le droit, <strong>garde tes atouts</strong> pour plus tard et défausse une carte inutile. Couper pour rien gaspille un atout précieux. Et n'oublie pas que ta défausse peut <em>signaler</em> ta couleur forte à ton partenaire.</p>",
        },
      ],
      faq: [
        { q: "Est-on obligé de couper à la coinche ?", a: "Oui, si tu n'as pas la couleur demandée tu dois couper à l'atout, souvent en montant. Mais si ton partenaire est déjà maître du pli, la convention te permet de te défausser." },
        { q: "Vaut-il mieux couper ou se défausser ?", a: "Coupe si le pli vaut beaucoup de points et qu'un adversaire est maître. Défausse-toi pour garder tes atouts quand ton partenaire tient déjà le pli." },
      ],
      related: ["jeu-singleton", "jeu-signaler-partenaire", "lex-atout-sec"],
    },
    en: {
      slug: "ruff-or-discard-coinche",
      linkLabel: "Ruff or discard?",
      title: "Ruff or discard in coinche: how to choose?",
      h1: "Ruff or discard: the right reflex",
      description:
        "Ruff or discard in coinche when you're out of the suit? Obligation rules, value calculation and the choice based on position and the trick.",
      lead: "When you're out of the led suit, two options: <strong>ruff with a trump</strong> or <strong>discard</strong> another suit. The choice depends on the points at stake and the rules.",
      sections: [
        {
          h2: "What the rules require",
          html: "<p>In coinche, if you lack the suit you must <strong>ruff</strong> (often with the duty to overruff if an opponent has already trumped). A common exception: <strong>if your partner already wins the trick</strong>, the convention lets you discard instead of ruffing. Check your table's rules.</p>",
        },
        {
          h2: "When ruffing pays",
          html: "<ul><li>The trick holds <strong>many points</strong> (ace, ten, last trick) and an opponent is winning it.</li><li>You have small trumps best used this way.</li><li>Ruffing puts you back on lead to run your suit.</li></ul>",
        },
        {
          h2: "When discarding is better",
          html: "<p>If your partner is winning and you're allowed, <strong>keep your trumps</strong> for later and discard a useless card. Ruffing for nothing wastes a precious trump. And remember your discard can <em>signal</em> your strong suit to your partner.</p>",
        },
      ],
      faq: [
        { q: "Are you forced to ruff in coinche?", a: "Yes, if you lack the led suit you must ruff, often overruffing. But if your partner already wins the trick, the convention lets you discard." },
        { q: "Is it better to ruff or discard?", a: "Ruff if the trick is worth many points and an opponent is winning it. Discard to keep your trumps when your partner already holds the trick." },
      ],
      related: ["jeu-singleton", "jeu-signaler-partenaire", "lex-atout-sec"],
    },
  },

  {
    id: "jeu-garder-der",
    priority: 0.55,
    fr: {
      slug: "garder-la-der-coinche",
      linkLabel: "Garder la der",
      title: "Garder la der à la coinche : le dernier pli qui rapporte 10",
      h1: "Garder la der : les 10 points du dernier pli",
      description:
        "Garder la der à la coinche : pourquoi le dernier pli vaut 10 points et comment conserver une carte gagnante pour le remporter sans chuter.",
      lead: "Le dernier pli, « la der », rapporte <strong>10 points bonus</strong>. Les garder peut faire passer ou chuter un contrat serré : c'est une compétence à part entière.",
      sections: [
        {
          h2: "Pourquoi la der compte",
          html: "<p>Une donne vaut 162 points : 152 dans les cartes plus <strong>10 de der</strong> pour le dernier pli. Sur un contrat serré, ces 10 points décident souvent du résultat. Les oublier, c'est risquer de chuter un contrat qu'on croyait gagné.</p>",
        },
        {
          h2: "Comment la conserver",
          html: "<p>Garder la der, c'est <strong>conserver une carte sûre pour le dernier pli</strong> : un atout maître quand les autres sont tombés, ou un as dans une couleur que personne ne peut plus couper. Compte les atouts pour savoir si ta carte sera encore maîtresse au 8e pli.</p>",
        },
        {
          h2: "Ne pas sacrifier le contrat pour la der",
          html: "<ul><li>La der ne vaut que 10 points : ne perds pas 3 plis pour la garder.</li><li>Si tu es large dans ton contrat, ne complique pas le jeu pour elle.</li><li>Sur un score serré ou un capot, en revanche, la der peut tout changer.</li></ul>",
        },
      ],
      faq: [
        { q: "Pourquoi garder la der à la coinche ?", a: "Parce que le dernier pli rapporte 10 points bonus, qui font souvent passer ou chuter un contrat serré. Conserver une carte gagnante pour le 8e pli sécurise ces points." },
        { q: "Quelle carte garder pour la der ?", a: "Une carte sûre au 8e pli : un atout maître quand les autres atouts sont tombés, ou un as dans une couleur que plus personne ne peut couper." },
      ],
      related: ["jeu-cartes-maitresses", "jeu-compter-atouts", "lex-dix-de-der"],
    },
    en: {
      slug: "keeping-last-trick-coinche",
      linkLabel: "Keeping the last trick",
      title: "Keeping the last trick in coinche: the 10-point der",
      h1: "Keeping the der: the last trick's 10 points",
      description:
        "Keeping the der in coinche: why the last trick scores 10 points and how to hold a winning card to take it without going down.",
      lead: "The last trick, \"the der,\" scores a <strong>10-point bonus</strong>. Keeping it can make or break a tight contract: it's a skill in its own right.",
      sections: [
        {
          h2: "Why the last trick matters",
          html: "<p>A deal is worth 162 points: 152 in the cards plus <strong>10 de der</strong> for the last trick. On a tight contract, those 10 points often decide the result. Forgetting them risks sinking a contract you thought was won.</p>",
        },
        {
          h2: "How to keep it",
          html: "<p>Keeping the der means <strong>holding a sure card for the last trick</strong>: a master trump once the others have fallen, or an ace in a suit no one can ruff anymore. Count trumps to know whether your card is still a master on the 8th trick.</p>",
        },
        {
          h2: "Don't sacrifice the contract for the der",
          html: "<ul><li>The der is only 10 points: don't lose 3 tricks to keep it.</li><li>If you're well clear of your contract, don't overcomplicate for it.</li><li>On a tight score or a capot, though, the der can change everything.</li></ul>",
        },
      ],
      faq: [
        { q: "Why keep the last trick in coinche?", a: "Because the last trick scores a 10-point bonus that often makes or breaks a tight contract. Holding a winning card for the 8th trick secures those points." },
        { q: "Which card should you keep for the der?", a: "One that's sure on the 8th trick: a master trump once the others have fallen, or an ace in a suit no one can ruff anymore." },
      ],
      related: ["jeu-cartes-maitresses", "jeu-compter-atouts", "lex-dix-de-der"],
    },
  },

  {
    id: "jeu-petit-pour-partenaire",
    priority: 0.5,
    fr: {
      slug: "jouer-petit-laisser-main-partenaire-coinche",
      linkLabel: "Laisser la main au partenaire",
      title: "Jouer petit pour laisser la main au partenaire à la coinche",
      h1: "Laisser la main à son partenaire",
      description:
        "Quand jouer petit pour laisser la main à ton partenaire à la coinche : sous-jouer intelligemment, lui donner la reprise et placer tes points.",
      lead: "Tu n'es pas obligé de prendre tous les plis que tu pourrais : parfois, <strong>jouer petit pour laisser la main à ton partenaire</strong> rapporte plus à l'équipe.",
      sections: [
        {
          h2: "Pourquoi sous-jouer volontairement",
          html: "<p>Si ton partenaire est mieux placé que toi pour <strong>dérouler une couleur longue</strong> ou couper, lui laisser la main est gagnant. Tu poses une petite carte sous son pli plutôt que de monter inutilement : il garde la reprise et l'initiative.</p>",
        },
        {
          h2: "Placer ses points sous son pli",
          html: "<p>Quand ton partenaire est déjà maître, <strong>glisse tes points dessous</strong> : un dix (10 pts) ou un as (11 pts) posé sur son pli gagnant rejoint le total de l'équipe sans risque. C'est l'un des réflexes les plus rentables de la défense comme de l'attaque.</p>",
        },
        {
          h2: "Sans en abuser",
          html: "<ul><li>Ne laisse pas la main si <strong>l'adversaire derrière toi</strong> peut prendre le pli.</li><li>Assure-toi que ton partenaire a vraiment la reprise.</li><li>Sur un pli à gros points contesté, prends-le plutôt que de parier.</li></ul>",
        },
      ],
      faq: [
        { q: "Pourquoi jouer petit à la coinche ?", a: "Pour laisser la main à ton partenaire quand il est mieux placé pour dérouler sa couleur ou couper, ou pour glisser tes points sous son pli gagnant sans risque." },
        { q: "Quand mettre ses points sous le pli du partenaire ?", a: "Quand il est déjà maître du pli et qu'aucun adversaire derrière toi ne peut le reprendre. Un dix ou un as rejoint alors le total de l'équipe." },
      ],
      related: ["jeu-signaler-partenaire", "jeu-defendre-pris", "jeu-position"],
    },
    en: {
      slug: "play-low-let-partner-win-coinche",
      linkLabel: "Let your partner win",
      title: "Playing low to let your partner win in coinche",
      h1: "Letting your partner take the lead",
      description:
        "When to play low to let your partner win in coinche: ducking smartly, giving them the entry and placing your points under their trick.",
      lead: "You don't have to win every trick you could: sometimes <strong>playing low to let your partner take the lead</strong> earns the team more.",
      sections: [
        {
          h2: "Why duck on purpose",
          html: "<p>If your partner is better placed to <strong>run a long suit</strong> or ruff, handing them the lead wins. You play a small card under their trick instead of overtaking pointlessly: they keep the entry and the initiative.</p>",
        },
        {
          h2: "Place your points under their trick",
          html: "<p>When your partner already wins, <strong>slip your points underneath</strong>: a ten (10 pts) or an ace (11 pts) on their winning trick joins the team's total at no risk. It's one of the most profitable reflexes in both defence and attack.</p>",
        },
        {
          h2: "Without overdoing it",
          html: "<ul><li>Don't duck if <strong>the opponent behind you</strong> can win the trick.</li><li>Make sure your partner truly has the entry.</li><li>On a contested high-point trick, take it rather than gamble.</li></ul>",
        },
      ],
      faq: [
        { q: "Why play low in coinche?", a: "To let your partner take the lead when they're better placed to run a suit or ruff, or to slip your points under their winning trick at no risk." },
        { q: "When should you put points under your partner's trick?", a: "When they already win the trick and no opponent behind you can take it. A ten or ace then joins the team's total." },
      ],
      related: ["jeu-signaler-partenaire", "jeu-defendre-pris", "jeu-position"],
    },
  },

  {
    id: "jeu-milieu-donne",
    priority: 0.5,
    fr: {
      slug: "milieu-donne-reconstruire-jeu-adverse-coinche",
      linkLabel: "Le milieu de donne",
      title: "Le milieu de donne à la coinche : lire le jeu adverse",
      h1: "Milieu de donne : reconstruire les mains",
      description:
        "Le milieu de donne à la coinche : déduire les cartes adverses à partir des annonces, des coupes et des défausses pour mieux finir la donne.",
      lead: "Au milieu de la donne, les premiers plis t'ont déjà <strong>renseigné sur les mains adverses</strong>. Savoir reconstruire leur jeu transforme la fin de donne.",
      sections: [
        {
          h2: "Partir des indices déjà donnés",
          html: "<p>Les annonces des enchères, les <strong>coupes</strong> et les <strong>défausses</strong> trahissent les distributions. Un adversaire qui coupe une couleur n'en a plus ; un joueur qui s'en défausse y est faible. Le contrat annoncé indique aussi où se concentrent les forces.</p>",
        },
        {
          h2: "Compter les couleurs",
          html: "<p>Comme pour les atouts, <strong>compte combien de cartes de chaque couleur sont tombées</strong>. Chaque couleur a 8 cartes. Si tu en as vu 6 et que tu en tiens 2, la couleur est épuisée : tes cartes restantes deviennent maîtresses ou coupables à coup sûr.</p>",
        },
        {
          h2: "Adapter sa fin de donne",
          html: "<ul><li>Tu sais qui va couper : <strong>évite de lui offrir un gros pli</strong>.</li><li>Tu sais qui détient le maître restant : ne le défie pas pour rien.</li><li>Place tes points là où ton camp est sûr de prendre.</li></ul>",
        },
      ],
      faq: [
        { q: "Comment deviner les cartes adverses à la coinche ?", a: "En recoupant les annonces, les coupes et les défausses, et en comptant les cartes tombées dans chaque couleur. Une couleur coupée ou défaussée révèle une faiblesse." },
        { q: "Faut-il compter toutes les couleurs ?", a: "Idéalement, oui : chaque couleur a 8 cartes. Suivre au moins l'atout et la couleur clé du contrat suffit déjà à bien lire la fin de donne." },
      ],
      related: ["jeu-compter-atouts", "jeu-cartes-maitresses", "jeu-position"],
    },
    en: {
      slug: "midgame-reading-opponents-hands-coinche",
      linkLabel: "The midgame",
      title: "The midgame in coinche: reading the opponents' hands",
      h1: "Midgame: reconstructing the hands",
      description:
        "The midgame in coinche: deduce the opponents' cards from bids, ruffs and discards to finish the deal better.",
      lead: "By the midgame, the first tricks have already <strong>told you about the opponents' hands</strong>. Reconstructing their cards transforms the end of the deal.",
      sections: [
        {
          h2: "Start from the clues already given",
          html: "<p>The auction bids, the <strong>ruffs</strong> and the <strong>discards</strong> betray distributions. An opponent who ruffs a suit is void in it; a player who discards it is weak there. The contract bid also shows where strength is concentrated.</p>",
        },
        {
          h2: "Count the suits",
          html: "<p>Like trumps, <strong>count how many cards of each suit have fallen</strong>. Each suit has 8 cards. If you've seen 6 and hold 2, the suit is exhausted: your remaining cards become sure masters or sure ruffers.</p>",
        },
        {
          h2: "Adapt your endgame",
          html: "<ul><li>You know who will ruff: <strong>don't hand them a big trick</strong>.</li><li>You know who holds the remaining master: don't challenge it for nothing.</li><li>Place your points where your side is sure to win.</li></ul>",
        },
      ],
      faq: [
        { q: "How do you guess the opponents' cards in coinche?", a: "By cross-checking bids, ruffs and discards, and counting the cards played in each suit. A suit that's ruffed or discarded reveals a weakness." },
        { q: "Do you have to count every suit?", a: "Ideally yes: each suit has 8 cards. Following at least the trump suit and the contract's key suit already lets you read the endgame well." },
      ],
      related: ["jeu-compter-atouts", "jeu-cartes-maitresses", "jeu-position"],
    },
  },

  {
    id: "jeu-eviter-coupe-maitres",
    priority: 0.5,
    fr: {
      slug: "eviter-faire-couper-maitres-coinche",
      linkLabel: "Éviter de se faire couper",
      title: "Éviter de se faire couper ses cartes maîtresses à la coinche",
      h1: "Protéger ses maîtres de la coupe",
      description:
        "Comment éviter de te faire couper tes as et tes dix à la coinche : purger les atouts, repérer les couleurs courtes adverses et choisir l'ordre des plis.",
      lead: "Un as ou un dix qui se fait couper, c'est un gros paquet de points offert à l'adversaire. <strong>Protéger tes maîtres</strong> est donc une priorité du jeu de la carte.",
      sections: [
        {
          h2: "Purger les atouts d'abord",
          html: "<p>La meilleure protection est souvent de <strong>faire tomber les atouts adverses avant d'encaisser tes côtés</strong>. Sans atout, l'adversaire est obligé de fournir : ton as passe. C'est tout l'intérêt de tirer atout quand tu as une couleur longue et maîtresse à dérouler.</p>",
        },
        {
          h2: "Repérer les couleurs courtes",
          html: "<p>Méfie-toi des couleurs où un adversaire est probablement <strong>court ou chicane</strong> (annonce, défausse, coupe précédente). Rejouer cette couleur, c'est risquer la coupe. Mieux vaut attaquer une couleur où tout le monde a encore des cartes.</p>",
        },
        {
          h2: "Soigner l'ordre des plis",
          html: "<ul><li>Avant d'encaisser un as de côté, <strong>assure-toi que l'adversaire n'a plus d'atout</strong> pour couper.</li><li>Si tu ne peux pas purger, encaisse vite avant que la couleur ne devienne coupable.</li><li>Garde une reprise pour ne pas rester bloqué.</li></ul>",
        },
      ],
      faq: [
        { q: "Comment éviter de se faire couper son as ?", a: "Le plus souvent en purgeant d'abord les atouts adverses : sans atout, l'adversaire doit fournir et ton as passe. Sinon, encaisse-le tôt avant que la couleur ne devienne coupable." },
        { q: "Comment savoir si une couleur risque d'être coupée ?", a: "En recoupant les indices : un adversaire qui a annoncé court, qui s'est défaussé ou qui a déjà coupé cette couleur n'en a probablement plus." },
      ],
      related: ["jeu-tirer-atouts", "jeu-cartes-maitresses", "jeu-milieu-donne"],
    },
    en: {
      slug: "avoid-getting-masters-ruffed-coinche",
      linkLabel: "Avoid getting ruffed",
      title: "Avoid getting your master cards ruffed in coinche",
      h1: "Protecting your masters from the ruff",
      description:
        "How to avoid having your aces and tens ruffed in coinche: draw trumps, spot the opponents' short suits and choose the order of tricks.",
      lead: "An ace or ten that gets ruffed hands a big pile of points to the opponents. So <strong>protecting your masters</strong> is a card-play priority.",
      sections: [
        {
          h2: "Draw trumps first",
          html: "<p>The best protection is often to <strong>knock out the opponents' trumps before cashing your side suits</strong>. With no trumps, opponents must follow: your ace runs. That's the whole point of drawing trumps when you have a long, strong suit to cash.</p>",
        },
        {
          h2: "Spot the short suits",
          html: "<p>Beware suits where an opponent is likely <strong>short or void</strong> (from bids, discards, an earlier ruff). Leading that suit risks the ruff. Better to attack a suit where everyone still holds cards.</p>",
        },
        {
          h2: "Mind the order of tricks",
          html: "<ul><li>Make sure the opponents <strong>can no longer ruff</strong> before cashing a side master.</li><li>If you can't draw trumps, cash quickly before the suit becomes ruffable.</li><li>Keep an entry so you don't get stranded.</li></ul>",
        },
      ],
      faq: [
        { q: "How do you avoid getting your ace ruffed?", a: "Usually by drawing the opponents' trumps first: with none, they must follow and your ace runs. Otherwise cash it early before the suit becomes ruffable." },
        { q: "How do you know if a suit risks being ruffed?", a: "By cross-checking clues: an opponent who bid short, discarded, or already ruffed that suit is probably out of it." },
      ],
      related: ["jeu-tirer-atouts", "jeu-cartes-maitresses", "jeu-milieu-donne"],
    },
  },

  {
    id: "jeu-position",
    priority: 0.5,
    fr: {
      slug: "importance-position-jouer-dernier-coinche",
      linkLabel: "La position au pli",
      title: "L'importance de la position à la coinche : jouer en dernier",
      h1: "La position : l'avantage de jouer en dernier",
      description:
        "Pourquoi la position compte à la coinche : jouer en dernier sur un pli te donne l'information complète. Comment profiter de ta place autour de la table.",
      lead: "À la coinche, <strong>l'ordre dans lequel tu joues change tout</strong>. Jouer en dernier sur un pli est un avantage : tu décides en connaissant déjà les cartes des autres.",
      sections: [
        {
          h2: "Le dernier joueur voit tout",
          html: "<p>Quand tu poses la <strong>4e carte du pli</strong>, tu sais exactement qui est maître et combien de points sont en jeu. Tu peux alors mettre le minimum pour prendre, ou laisser filer un pli sans valeur. C'est la meilleure position pour décider.</p>",
        },
        {
          h2: "Le premier joueur subit",
          html: "<p>À l'inverse, <strong>entamer le pli</strong>, c'est jouer à l'aveugle : tu donnes de l'information sans en recevoir. D'où l'importance de choisir son entame avec soin et de ne pas dévoiler ses points pour rien.</p>",
        },
        {
          h2: "Jouer avec sa place",
          html: "<ul><li>En <strong>2e position</strong> (juste après l'entameur), joue souvent petit : tu as encore deux joueurs derrière toi.</li><li>En <strong>3e position</strong>, monte pour soutenir ton partenaire si l'adversaire mène.</li><li>En <strong>4e</strong>, prends au plus juste ou défausse selon les points.</li></ul>",
        },
      ],
      faq: [
        { q: "Pourquoi est-ce un avantage de jouer en dernier à la coinche ?", a: "Parce que tu vois les trois cartes déjà jouées : tu sais qui est maître et combien de points sont en jeu, donc tu décides avec une information complète." },
        { q: "Que faire en deuxième position ?", a: "Souvent jouer petit, car deux joueurs passent encore après toi. Tu évites de gaspiller une grosse carte avant de savoir ce que feront ton partenaire et l'adversaire." },
      ],
      related: ["jeu-petit-pour-partenaire", "jeu-choisir-entame", "jeu-milieu-donne"],
    },
    en: {
      slug: "importance-of-position-playing-last-coinche",
      linkLabel: "Position at the trick",
      title: "The importance of position in coinche: playing last",
      h1: "Position: the edge of playing last",
      description:
        "Why position matters in coinche: playing last to a trick gives you full information. How to use your seat around the table.",
      lead: "In coinche, <strong>the order you play in changes everything</strong>. Playing last to a trick is an edge: you decide already knowing the others' cards.",
      sections: [
        {
          h2: "The last player sees all",
          html: "<p>When you play the <strong>4th card of the trick</strong>, you know exactly who's winning and how many points are at stake. You can then play the minimum to take it, or let a worthless trick go. It's the best seat for deciding.</p>",
        },
        {
          h2: "The first player is in the dark",
          html: "<p>Conversely, <strong>leading the trick</strong> means playing blind: you give information without receiving any. Hence the importance of choosing your lead carefully and not revealing your points for nothing.</p>",
        },
        {
          h2: "Play to your seat",
          html: "<ul><li>In <strong>2nd seat</strong> (right after the leader), often play low: two players still come after you.</li><li>In <strong>3rd seat</strong>, play high to back your partner if an opponent leads.</li><li>In <strong>4th</strong>, take as cheaply as you can or discard depending on points.</li></ul>",
        },
      ],
      faq: [
        { q: "Why is playing last an advantage in coinche?", a: "Because you see the three cards already played: you know who's winning and how many points are at stake, so you decide with full information." },
        { q: "What should you do in second seat?", a: "Often play low, since two players still come after you. You avoid wasting a high card before knowing what your partner and the opponent will do." },
      ],
      related: ["jeu-petit-pour-partenaire", "jeu-choisir-entame", "jeu-milieu-donne"],
    },
  },

  {
    id: "jeu-singleton",
    priority: 0.5,
    fr: {
      slug: "jouer-singleton-couleur-une-carte-coinche",
      linkLabel: "Jouer un singleton",
      title: "Jouer un singleton à la coinche : une seule carte d'une couleur",
      h1: "Le singleton : n'avoir qu'une carte d'une couleur",
      description:
        "Jouer un singleton à la coinche : une couleur dont tu n'as qu'une carte. Quand l'utiliser pour créer une coupe et quand t'en méfier.",
      lead: "Un <strong>singleton</strong>, c'est une couleur dont tu ne détiens qu'<strong>une seule carte</strong>. Bien joué, il te permet de couper vite ; mal géré, il livre des points.",
      sections: [
        {
          h2: "Le singleton, une future coupe",
          html: "<p>Le gros intérêt d'un singleton : dès que la couleur est jouée une fois, tu n'en as plus et tu peux <strong>couper à l'atout</strong> aux tours suivants. Avec des atouts en réserve, un singleton dans une couleur adverse forte est une vraie arme.</p>",
        },
        {
          h2: "Quand le jouer toi-même",
          html: "<p>Si ton singleton est un <strong>as</strong>, encaisse-le tôt pour le point sûr, avant qu'il ne soit coupé. Si c'est une petite carte, l'entamer crée vite ta chicane pour pouvoir couper ensuite, à condition d'avoir la reprise pour y revenir. Ce n'est pas automatique : tout dépend de tes atouts et du contrat.</p>",
        },
        {
          h2: "Les pièges",
          html: "<ul><li>Un singleton roi ou dame se fait facilement <strong>capturer</strong> : prudence.</li><li>Sans atout pour couper derrière, le singleton perd son intérêt.</li><li>Entamer un petit singleton renseigne aussi l'adversaire : pèse le pour et le contre.</li></ul>",
        },
      ],
      faq: [
        { q: "Qu'est-ce qu'un singleton à la coinche ?", a: "C'est une couleur dont tu n'as qu'une seule carte en main. Une fois cette carte jouée, tu es chicane dans la couleur et tu peux couper à l'atout." },
        { q: "Faut-il jouer son singleton tout de suite ?", a: "Pas toujours. Un as singleton s'encaisse tôt pour le point sûr ; un petit singleton peut s'entamer pour créer une coupe, mais seulement si tu as des atouts et une reprise." },
      ],
      related: ["jeu-couper-defausser", "lex-atout-sec", "jeu-cartes-maitresses"],
    },
    en: {
      slug: "playing-singleton-one-card-suit-coinche",
      linkLabel: "Playing a singleton",
      title: "Playing a singleton in coinche: only one card of a suit",
      h1: "The singleton: holding just one card of a suit",
      description:
        "Playing a singleton in coinche: a suit you hold only one card of. When to use it to set up a ruff and when to be wary of it.",
      lead: "A <strong>singleton</strong> is a suit you hold only <strong>one card</strong> of. Played well it lets you ruff quickly; mishandled it gives away points.",
      sections: [
        {
          h2: "A singleton is a future ruff",
          html: "<p>The big appeal of a singleton: once the suit is played once, you're out of it and can <strong>ruff</strong> on later rounds. With trumps in reserve, a singleton in a strong opponent suit is a real weapon.</p>",
        },
        {
          h2: "When to play it yourself",
          html: "<p>If your singleton is an <strong>ace</strong>, cash it early for the sure trick, before it gets ruffed. If it's a small card, leading it quickly creates your void so you can ruff later, provided you have an entry to come back. It's not automatic: it depends on your trumps and the contract.</p>",
        },
        {
          h2: "The traps",
          html: "<ul><li>A singleton king or queen is easily <strong>captured</strong>: be careful.</li><li>With no trump to ruff behind, the singleton loses its point.</li><li>Leading a small singleton also informs the opponents: weigh the trade-off.</li></ul>",
        },
      ],
      faq: [
        { q: "What is a singleton in coinche?", a: "It's a suit you hold only one card of. Once that card is played, you're void in the suit and can ruff with a trump." },
        { q: "Should you play your singleton right away?", a: "Not always. A singleton ace is cashed early for the sure trick; a small singleton can be led to set up a ruff, but only if you have trumps and an entry." },
      ],
      related: ["jeu-couper-defausser", "lex-atout-sec", "jeu-cartes-maitresses"],
    },
  },
];
