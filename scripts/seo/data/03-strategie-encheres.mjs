// Catégorie : Stratégie des annonces (enchères) — repères non dogmatiques.

export const category = { fr: "Stratégie : les annonces", en: "Strategy: bidding" };

export default [
  {
    id: "enc-ouvrir-80",
    priority: 0.55,
    fr: {
      slug: "quand-ouvrir-80-coinche",
      linkLabel: "Ouvrir à 80",
      title: "Quand ouvrir à 80 à la coinche ? Repères pour la première annonce",
      h1: "Quand ouvrir à 80 à la coinche ?",
      description:
        "Ouvrir à 80 à la coinche : ce que ça promet, quand c'est justifié et quand mieux vaut passer. Des repères concrets, sans dogme.",
      lead: "Ouvrir à <strong>80</strong>, c'est annoncer que ton équipe pense faire au moins 80 points dans la couleur choisie. C'est l'annonce de départ la plus fréquente, mais elle n'est pas anodine.",
      sections: [
        {
          h2: "Ce que promet un 80",
          html: "<p>Un 80 dit à ton partenaire : « j'ai un jeu correct dans cette couleur, on peut viser la moitié des points de la donne ». Ce n'est pas un contrat de rêve, mais c'est un <strong>point d'entrée</strong> qui laisse de la marge pour monter ensuite. Beaucoup de mains moyennes méritent un 80 plutôt qu'un passe.</p>",
        },
        {
          h2: "Quand l'ouverture se justifie",
          html: "<ul><li>Tu as <strong>le valet d'atout</strong> accompagné d'un ou deux autres atouts.</li><li>Tu disposes d'un <strong>as maître</strong> dans une couleur de côté.</li><li>Ta couleur d'atout compte au moins 4 ou 5 cartes.</li></ul><p>Aucun de ces critères n'est obligatoire à lui seul. C'est la combinaison qui compte, et l'idée que ton partenaire complétera peut-être ce qu'il te manque.</p>",
        },
        {
          h2: "Quand mieux vaut temporiser",
          html: "<p>Si ta main est faible partout, ou si tu n'as ni atout maître ni as, ouvrir à 80 t'engage parfois pour rien. Passer pour voir ce que disent les autres est une option tout à fait valable. <em>Plusieurs choix peuvent être justes</em> : ouvrir à 80 prudemment ou laisser parler le partenaire dépend autant de ta position que de ton jeu.</p>",
        },
      ],
      faq: [
        { q: "Faut-il toujours ouvrir à 80 si on a le valet d'atout ?", a: "Pas forcément. Le valet d'atout est un atout fort, mais s'il est seul et que le reste de la main est pauvre, attendre ou passer peut être plus prudent. Ça dépend du contexte." },
        { q: "Peut-on ouvrir plus haut que 80 d'entrée ?", a: "Oui, si ta main est vraiment solide. Ouvrir à 90 ou 100 décrit un jeu plus fort et met la pression sur les adversaires. Mais 80 reste une ouverture souple qui garde de la marge." },
      ],
      related: ["enc-evaluer-main", "enc-passer", "enc-soutenir-partenaire"],
    },
    en: {
      slug: "when-to-open-80-coinche",
      linkLabel: "Opening at 80",
      title: "When to open at 80 in coinche? A guide to the first bid",
      h1: "When to open at 80 in coinche?",
      description:
        "Opening at 80 in coinche: what it promises, when it's justified and when passing is better. Practical, non-dogmatic guidance.",
      lead: "Opening at <strong>80</strong> tells your team you expect to make at least 80 points in the chosen suit. It's the most common starting bid, but it's not throwaway.",
      sections: [
        {
          h2: "What an 80 promises",
          html: "<p>An 80 tells your partner: \"I have a decent hand in this suit, we can aim for half the deal's points.\" It isn't a dream contract, but it's an <strong>entry point</strong> that leaves room to climb later. Many average hands deserve an 80 rather than a pass.</p>",
        },
        {
          h2: "When opening makes sense",
          html: "<ul><li>You hold <strong>the trump jack</strong> with one or two other trumps.</li><li>You have a <strong>master ace</strong> in a side suit.</li><li>Your trump suit holds at least 4 or 5 cards.</li></ul><p>None of these alone is mandatory. It's the combination that counts, plus the idea that your partner may fill in what you're missing.</p>",
        },
        {
          h2: "When to hold back",
          html: "<p>If your hand is weak everywhere, with no master trump or ace, opening at 80 sometimes commits you for nothing. Passing to hear what others say is perfectly valid. <em>Several choices can be right</em>: opening at a cautious 80 or letting your partner speak depends as much on your seat as on your cards.</p>",
        },
      ],
      faq: [
        { q: "Should you always open at 80 with the trump jack?", a: "Not necessarily. The trump jack is strong, but if it's bare and the rest of the hand is poor, waiting or passing can be wiser. It depends on context." },
        { q: "Can you open higher than 80 right away?", a: "Yes, if your hand is truly solid. Opening at 90 or 100 describes a stronger hand and pressures the opponents. But 80 stays a flexible opening that keeps room to climb." },
      ],
      related: ["enc-evaluer-main", "enc-passer", "enc-soutenir-partenaire"],
    },
  },

  {
    id: "enc-evaluer-main",
    priority: 0.55,
    fr: {
      slug: "evaluer-sa-main-avant-annonce-coinche",
      linkLabel: "Évaluer sa main",
      title: "Comment évaluer sa main avant d'annoncer à la coinche",
      h1: "Évaluer sa main avant d'annoncer",
      description:
        "Avant d'annoncer à la coinche, apprends à lire ta main : atouts, as, longueurs, distribution. Une méthode souple, pas une formule rigide.",
      lead: "Avant la moindre annonce, prends le temps de <strong>lire ta main</strong>. Une bonne évaluation vaut mieux qu'une grille de points appliquée aveuglément.",
      sections: [
        {
          h2: "Les trois questions de base",
          html: "<ul><li><strong>Mes atouts</strong> : combien, et lesquels sont maîtres (valet, neuf, as) ?</li><li><strong>Mes côtés</strong> : ai-je des as ou des cartes gagnantes hors atout ?</li><li><strong>Ma distribution</strong> : suis-je long quelque part, court ailleurs (donc capable de couper) ?</li></ul>",
        },
        {
          h2: "Atouts maîtres et longueur",
          html: "<p>Le <strong>valet d'atout vaut 20</strong> et le <strong>neuf 14</strong> : ce sont les deux cartes décisives. Une longue couleur d'atout (5 cartes ou plus) te donne le contrôle même sans tous les honneurs. À l'inverse, trois petits atouts sans valet ni neuf, c'est fragile.</p>",
        },
        {
          h2: "Penser en plis, pas seulement en points",
          html: "<p>Compter les points de sa main est utile, mais le vrai sujet, ce sont les <strong>plis que tu peux gagner</strong>. Un as maître à côté rapporte un pli sûr ; une couleur longue peut en donner plusieurs en fin de donne. Évalue ce que tu contrôles, puis fixe ton annonce en gardant en tête que ton partenaire apportera sa part.</p>",
        },
      ],
      faq: [
        { q: "Faut-il compter les points ou les plis ?", a: "Les deux se complètent. Les points donnent une première idée, mais raisonner en plis gagnables est souvent plus fiable pour décider d'une annonce." },
        { q: "Une main sans valet d'atout peut-elle annoncer ?", a: "Oui, si elle est longue à l'atout ou riche en as de côté. L'absence de valet rend le contrat plus risqué, sans l'interdire. Tout dépend du reste de la main." },
      ],
      related: ["enc-ouvrir-80", "enc-compter-points", "enc-choisir-atout"],
    },
    en: {
      slug: "evaluate-your-hand-before-bidding-coinche",
      linkLabel: "Evaluating your hand",
      title: "How to evaluate your hand before bidding in coinche",
      h1: "Evaluating your hand before bidding",
      description:
        "Before bidding in coinche, learn to read your hand: trumps, aces, length, shape. A flexible method, not a rigid formula.",
      lead: "Before any bid, take time to <strong>read your hand</strong>. Good judgment beats a point chart applied blindly.",
      sections: [
        {
          h2: "The three basic questions",
          html: "<ul><li><strong>My trumps</strong>: how many, and which are masters (jack, nine, ace)?</li><li><strong>My sides</strong>: do I have aces or winners outside trumps?</li><li><strong>My shape</strong>: am I long somewhere, short elsewhere (so I can ruff)?</li></ul>",
        },
        {
          h2: "Master trumps and length",
          html: "<p>The <strong>trump jack is worth 20</strong> and the <strong>nine 14</strong>: these two cards are decisive. A long trump suit (5 cards or more) gives you control even without every honour. Conversely, three small trumps with no jack or nine is fragile.</p>",
        },
        {
          h2: "Think in tricks, not just points",
          html: "<p>Counting your hand's points helps, but the real question is the <strong>tricks you can win</strong>. A master ace on the side is a sure trick; a long suit may yield several late in the deal. Assess what you control, then set your bid remembering your partner will add their share.</p>",
        },
      ],
      faq: [
        { q: "Should you count points or tricks?", a: "Both complement each other. Points give a first impression, but reasoning in winnable tricks is often more reliable when deciding a bid." },
        { q: "Can a hand without the trump jack still bid?", a: "Yes, if it's long in trumps or rich in side aces. The missing jack makes the contract riskier without forbidding it. It depends on the rest of the hand." },
      ],
      related: ["enc-ouvrir-80", "enc-compter-points", "enc-choisir-atout"],
    },
  },

  {
    id: "enc-sans-atout",
    priority: 0.55,
    fr: {
      slug: "quand-annoncer-sans-atout-coinche",
      linkLabel: "Annoncer Sans Atout",
      title: "Quand annoncer Sans Atout à la coinche ?",
      h1: "Quand annoncer Sans Atout ?",
      description:
        "Sans Atout à la coinche : les as valent 19. Quand cette annonce est rentable, ses pièges, et comment juger ta main pour la tenter.",
      lead: "À <strong>Sans Atout</strong>, il n'y a pas de coupe : la force vient des <strong>as et des cartes hautes</strong>. L'as monte d'ailleurs à <strong>19 points</strong> dans ce contrat.",
      sections: [
        {
          h2: "Le barème change tout",
          html: "<p>Sans Atout, l'<strong>as vaut 19</strong>, le 10 vaut 10, le roi 4, la dame 3, le valet 2. Les as deviennent rois du jeu : avoir trois ou quatre as bien répartis, c'est souvent l'idéal pour ce contrat. Sans coupe possible, celui qui a les cartes les plus hautes ramasse les plis.</p>",
        },
        {
          h2: "Quel type de main ?",
          html: "<ul><li>Plusieurs <strong>as</strong>, idéalement répartis sur plusieurs couleurs.</li><li>Des couleurs équilibrées plutôt que de gros déséquilibres.</li><li>Des cartes hautes secondaires (rois, dix) qui prennent le relais après les as.</li></ul>",
        },
        {
          h2: "Les pièges à connaître",
          html: "<p>Une main longue dans une seule couleur sans en avoir l'as risque de se faire « tenir » : l'adversaire garde la maîtrise et te prive de plis. Sans Atout récompense l'équilibre et les as, pas la longueur brute. Ce n'est pas une annonce à éviter, mais à réserver aux mains qui collent vraiment à son barème.</p>",
        },
      ],
      faq: [
        { q: "Combien vaut l'as à Sans Atout ?", a: "L'as vaut 19 points à Sans Atout, contre 11 dans un contrat à couleur. C'est ce qui rend les as si importants dans ce contrat." },
        { q: "Faut-il beaucoup d'as pour annoncer Sans Atout ?", a: "C'est l'idéal, mais pas une obligation absolue. Une main équilibrée avec deux as solides et de bonnes cartes secondaires peut suffire selon la situation." },
      ],
      related: ["enc-tout-atout", "enc-evaluer-main", "enc-compter-points"],
    },
    en: {
      slug: "when-to-bid-no-trump-coinche",
      linkLabel: "Bidding No Trump",
      title: "When to bid No Trump in coinche?",
      h1: "When to bid No Trump?",
      description:
        "No Trump in coinche: aces are worth 19. When this bid pays off, its traps, and how to judge your hand to attempt it.",
      lead: "In <strong>No Trump</strong> there is no ruffing: strength comes from <strong>aces and high cards</strong>. The ace even rises to <strong>19 points</strong> in this contract.",
      sections: [
        {
          h2: "The scale changes everything",
          html: "<p>In No Trump, the <strong>ace is worth 19</strong>, the 10 worth 10, the king 4, the queen 3, the jack 2. Aces become the rulers: holding three or four well-spread aces is often ideal here. With no ruffing possible, whoever has the highest cards sweeps the tricks.</p>",
        },
        {
          h2: "What kind of hand?",
          html: "<ul><li>Several <strong>aces</strong>, ideally spread across suits.</li><li>Balanced suits rather than big imbalances.</li><li>Secondary high cards (kings, tens) that take over after the aces.</li></ul>",
        },
        {
          h2: "Traps to know",
          html: "<p>A hand long in one suit without its ace risks being \"held off\": the opponents keep control and deny you tricks. No Trump rewards balance and aces, not raw length. It's not a bid to avoid, but one to save for hands that truly fit its scale.</p>",
        },
      ],
      faq: [
        { q: "How much is the ace worth in No Trump?", a: "The ace is worth 19 points in No Trump, versus 11 in a suit contract. That's what makes aces so important here." },
        { q: "Do you need many aces to bid No Trump?", a: "It's ideal but not strictly required. A balanced hand with two solid aces and good secondary cards can be enough depending on the situation." },
      ],
      related: ["enc-tout-atout", "enc-evaluer-main", "enc-compter-points"],
    },
  },

  {
    id: "enc-tout-atout",
    priority: 0.55,
    fr: {
      slug: "quand-annoncer-tout-atout-coinche",
      linkLabel: "Annoncer Tout Atout",
      title: "Quand annoncer Tout Atout à la coinche ?",
      h1: "Quand annoncer Tout Atout ?",
      description:
        "Tout Atout à la coinche : les quatre valets valent 14. Quand cette annonce est rentable et comment juger sa main pour la tenter.",
      lead: "À <strong>Tout Atout</strong>, les quatre couleurs sont atout en même temps. Les <strong>valets deviennent rois</strong> : chacun vaut 14 points.",
      sections: [
        {
          h2: "Un barème dominé par les valets",
          html: "<p>À Tout Atout, le <strong>valet vaut 14</strong>, le neuf 9, l'as 6, le 10 vaut 5, le roi 3, la dame 1. Avoir plusieurs valets, c'est tenir le contrat par le haut. Quatre valets en main, c'est une main de rêve pour ce contrat.</p>",
        },
        {
          h2: "Quel type de main ?",
          html: "<ul><li>Plusieurs <strong>valets</strong>, le nerf de la guerre à Tout Atout.</li><li>Des neuf pour soutenir les valets.</li><li>Une distribution qui te laisse maître dans plusieurs couleurs.</li></ul>",
        },
        {
          h2: "Atouts et limites",
          html: "<p>Comme toutes les couleurs sont atout, chacun peut couper partout : les plis se gagnent à la hauteur, pas à la coupe. Une main sans valet ni neuf y est faible, même si elle paraît jolie en contrat normal. Tout Atout n'est pas forcément la meilleure annonce dès qu'on a deux valets : compare toujours avec un contrat à couleur ou à Sans Atout avant de te décider.</p>",
        },
      ],
      faq: [
        { q: "Combien vaut le valet à Tout Atout ?", a: "Le valet vaut 14 points à Tout Atout, dans chacune des quatre couleurs. C'est la carte maîtresse de ce contrat." },
        { q: "Deux valets suffisent-ils pour annoncer Tout Atout ?", a: "Ça peut suffire si les valets sont accompagnés de neuf et d'une bonne distribution, mais ce n'est pas automatique. Compare avec les autres contrats possibles." },
      ],
      related: ["enc-sans-atout", "enc-evaluer-main", "enc-compter-points"],
    },
    en: {
      slug: "when-to-bid-all-trump-coinche",
      linkLabel: "Bidding All Trump",
      title: "When to bid All Trump in coinche?",
      h1: "When to bid All Trump?",
      description:
        "All Trump in coinche: the four jacks are worth 14 each. When this bid pays off and how to judge your hand to attempt it.",
      lead: "In <strong>All Trump</strong>, all four suits are trump at once. The <strong>jacks become kings</strong>: each is worth 14 points.",
      sections: [
        {
          h2: "A scale ruled by jacks",
          html: "<p>In All Trump, the <strong>jack is worth 14</strong>, the nine 9, the ace 6, the 10 worth 5, the king 3, the queen 1. Holding several jacks means controlling the contract from the top. Four jacks in hand is a dream for this contract.</p>",
        },
        {
          h2: "What kind of hand?",
          html: "<ul><li>Several <strong>jacks</strong>, the heart of All Trump.</li><li>Nines to back up the jacks.</li><li>A shape that leaves you master in several suits.</li></ul>",
        },
        {
          h2: "Strengths and limits",
          html: "<p>Since every suit is trump, anyone can ruff anywhere: tricks are won by rank, not by ruffing. A hand without jacks or nines is weak here, even if it looks pretty in a normal contract. All Trump isn't automatically the best call just because you hold two jacks: always compare it with a suit contract or No Trump before deciding.</p>",
        },
      ],
      faq: [
        { q: "How much is the jack worth in All Trump?", a: "The jack is worth 14 points in All Trump, in each of the four suits. It's the master card of this contract." },
        { q: "Are two jacks enough to bid All Trump?", a: "They can be if backed by nines and a good shape, but it's not automatic. Compare with the other possible contracts first." },
      ],
      related: ["enc-sans-atout", "enc-evaluer-main", "enc-compter-points"],
    },
  },

  {
    id: "enc-coincher",
    priority: 0.55,
    fr: {
      slug: "quand-coincher-adversaire-coinche",
      linkLabel: "Quand coincher",
      title: "Quand coincher l'adversaire à la coinche ?",
      h1: "Quand coincher l'adversaire ?",
      description:
        "Coincher double les points du contrat adverse. Quand le risque vaut le coup, comment évaluer une chute probable, et quand s'abstenir.",
      lead: "<strong>Coincher</strong>, c'est parier que l'adversaire ne tiendra pas son contrat. Les points sont alors <strong>doublés</strong> : pour celui qui les gagne au final.",
      sections: [
        {
          h2: "Ce que ça change",
          html: "<p>Quand tu coinches, le contrat adverse passe en <strong>×2</strong>. S'il chute, ton équipe encaisse le double ; s'il passe, l'adversaire encaisse le double. C'est une arme à double tranchant : un coup gagnant peut renverser une partie, un coup raté peut l'enterrer.</p>",
        },
        {
          h2: "Les signaux d'une chute probable",
          html: "<ul><li>Tu détiens des <strong>atouts maîtres</strong> que l'adversaire devra te concéder.</li><li>Tu as des <strong>as de côté</strong> sûrs qui feront des plis.</li><li>L'annonce adverse te paraît haute par rapport à ce que ton équipe a montré.</li></ul>",
        },
        {
          h2: "Quand s'abstenir",
          html: "<p>Coincher sur une simple impression est dangereux. Si tu n'as ni atout fort ni carte maître, ton coup repose surtout sur l'espoir que ton partenaire en a. Tiens aussi compte du <strong>score</strong> : en tête, un coinche prudent protège ton avance ; mené de loin, un coinche audacieux peut être la bonne prise de risque. Plusieurs lectures sont défendables.</p>",
        },
      ],
      faq: [
        { q: "Coincher, ça multiplie les points par combien ?", a: "Coincher double les points du contrat (×2). Si l'adversaire surcoinche ensuite, on passe à ×4." },
        { q: "Faut-il coincher dès qu'on a le valet d'atout ?", a: "Non. Le valet d'atout aide, mais un coinche se décide sur l'ensemble de ta main, sur l'annonce adverse et sur le score. Un seul atout maître ne suffit pas toujours." },
      ],
      related: ["enc-surcoincher", "enc-lire-annonces-adverses", "enc-passer"],
    },
    en: {
      slug: "when-to-double-coinche",
      linkLabel: "When to double",
      title: "When to coinche (double) the opponents in coinche?",
      h1: "When to double the opponents?",
      description:
        "Coinching doubles the opponents' contract points. When the risk is worth it, how to judge a likely failure, and when to refrain.",
      lead: "To <strong>coinche</strong> is to bet the opponents won't make their contract. The points are then <strong>doubled</strong> for whoever ends up winning them.",
      sections: [
        {
          h2: "What it changes",
          html: "<p>When you coinche, the opponents' contract goes to <strong>×2</strong>. If it fails, your team banks double; if it makes, they bank double. It's a double-edged weapon: a winning shot can flip a match, a failed one can bury it.</p>",
        },
        {
          h2: "Signs of a likely failure",
          html: "<ul><li>You hold <strong>master trumps</strong> the opponents will have to concede.</li><li>You have sure <strong>side aces</strong> that will win tricks.</li><li>Their bid looks high compared with what their team has shown.</li></ul>",
        },
        {
          h2: "When to refrain",
          html: "<p>Coinching on a hunch is dangerous. With no strong trump or master card, your shot rests mostly on hoping your partner has them. Mind the <strong>score</strong> too: when ahead, a cautious coinche protects your lead; when far behind, a bold one can be the right gamble. Several readings are defensible.</p>",
        },
      ],
      faq: [
        { q: "How much does coinching multiply the points?", a: "Coinching doubles the contract points (×2). If the opponents then surcoinche, it rises to ×4." },
        { q: "Should you coinche as soon as you hold the trump jack?", a: "No. The trump jack helps, but a coinche is decided on your whole hand, the opponents' bid and the score. A single master trump isn't always enough." },
      ],
      related: ["enc-surcoincher", "enc-lire-annonces-adverses", "enc-passer"],
    },
  },

  {
    id: "enc-surcoincher",
    priority: 0.55,
    fr: {
      slug: "quand-surcoincher-coinche",
      linkLabel: "Quand surcoincher",
      title: "Quand surcoincher à la coinche ?",
      h1: "Quand surcoincher ?",
      description:
        "Surcoincher passe les points en ×4. Quand riposter au coinche adverse, quels signaux le justifient et pourquoi rester prudent.",
      lead: "<strong>Surcoincher</strong>, c'est répondre à un coinche adverse en passant le contrat en <strong>×4</strong>. La mise quadruple : la sanction aussi.",
      sections: [
        {
          h2: "Le mécanisme",
          html: "<p>Quand l'adversaire te coinche (×2), tu peux surcoincher pour porter l'enjeu à <strong>×4</strong>. Tu affirmes ainsi que ton contrat va passer malgré son défi. Si tu tiens, le gain est énorme ; si tu chutes, la chute l'est tout autant.</p>",
        },
        {
          h2: "Quand c'est justifié",
          html: "<ul><li>Tu es <strong>très confiant</strong> dans ton contrat : atouts maîtres, as bien placés, contrôle des couleurs.</li><li>Le coinche adverse te paraît présomptueux au vu de ce que tu détiens.</li><li>Ton partenaire a montré du soutien et tu sais où sont les plis.</li></ul>",
        },
        {
          h2: "La prudence reste de mise",
          html: "<p>Le surcoinche n'est pas une question d'orgueil. Un adversaire coinche souvent parce qu'il a une vraie raison : ignorer ce signal pour répliquer par fierté est une erreur classique. Surcoincher peut être brillant comme catastrophique. Évalue froidement, tiens compte du score, et accepte qu'un simple « je tiens » sans surcoinche soit parfois le meilleur choix.</p>",
        },
      ],
      faq: [
        { q: "Surcoincher multiplie les points par combien ?", a: "Le surcoinche porte les points du contrat à ×4 (le quadruple), en réponse au coinche adverse qui était à ×2." },
        { q: "Le surcoinche est-il fréquent ?", a: "Non, il reste rare. Il demande une grande confiance dans son contrat, car l'enjeu quadruplé rend la moindre erreur très coûteuse." },
      ],
      related: ["enc-coincher", "enc-bluff", "enc-lire-annonces-adverses"],
    },
    en: {
      slug: "when-to-redouble-coinche",
      linkLabel: "When to redouble",
      title: "When to surcoinche (redouble) in coinche?",
      h1: "When to redouble?",
      description:
        "Surcoinching takes the points to ×4. When to hit back at an opponent's coinche, what signals justify it and why to stay careful.",
      lead: "To <strong>surcoinche</strong> is to answer an opponent's coinche by taking the contract to <strong>×4</strong>. The stake quadruples, and so does the penalty.",
      sections: [
        {
          h2: "The mechanic",
          html: "<p>When the opponents coinche you (×2), you may surcoinche to push the stake to <strong>×4</strong>. You're claiming your contract will make despite their challenge. If you hold, the gain is huge; if you fail, the loss is just as big.</p>",
        },
        {
          h2: "When it's justified",
          html: "<ul><li>You're <strong>very confident</strong> in your contract: master trumps, well-placed aces, suit control.</li><li>The opponents' coinche looks presumptuous given what you hold.</li><li>Your partner has shown support and you know where the tricks are.</li></ul>",
        },
        {
          h2: "Caution still applies",
          html: "<p>Surcoinching isn't about pride. An opponent often coinches for a real reason: ignoring that signal to hit back out of ego is a classic mistake. A surcoinche can be brilliant or disastrous. Judge coldly, weigh the score, and accept that a plain \"we'll make it\" without redoubling is sometimes the best choice.</p>",
        },
      ],
      faq: [
        { q: "How much does surcoinching multiply the points?", a: "Surcoinching takes the contract points to ×4 (quadruple), in answer to the opponents' coinche which was at ×2." },
        { q: "Is surcoinching common?", a: "No, it stays rare. It demands strong confidence in your contract, because the quadrupled stake makes the smallest mistake very costly." },
      ],
      related: ["enc-coincher", "enc-bluff", "enc-lire-annonces-adverses"],
    },
  },

  {
    id: "enc-soutenir-partenaire",
    priority: 0.55,
    fr: {
      slug: "soutenir-annonce-partenaire-coinche",
      linkLabel: "Soutenir le partenaire",
      title: "Comment soutenir l'annonce de son partenaire à la coinche",
      h1: "Soutenir l'annonce de son partenaire",
      description:
        "Soutenir l'annonce de son partenaire à la coinche : quand monter dans sa couleur, de combien, et comment ne pas le surcharger.",
      lead: "Quand ton partenaire annonce, ton jeu n'est plus seul : il complète le sien. <strong>Soutenir</strong>, c'est ajouter ta force à la sienne dans la couleur qu'il a choisie.",
      sections: [
        {
          h2: "Qu'est-ce que soutenir ?",
          html: "<p>Soutenir, c'est <strong>monter l'annonce</strong> dans la couleur de ton partenaire parce que tu y as toi aussi des cartes utiles. Tu lui dis : « j'ai de quoi t'aider, on peut viser plus haut ». C'est l'un des fondements du jeu en équipe.</p>",
        },
        {
          h2: "Avec quoi soutenir ?",
          html: "<ul><li>Un ou deux <strong>atouts</strong> dans sa couleur, surtout s'ils sont hauts.</li><li>Un <strong>as de côté</strong> qui apportera un pli sûr.</li><li>Une <strong>coupe</strong> possible (couleur courte) qui ajoutera des plis.</li></ul>",
        },
        {
          h2: "De combien monter ?",
          html: "<p>Pas de barème figé. Une aide modeste justifie un petit pas (de 80 à 90, par exemple) ; une vraie complémentarité peut justifier un saut plus net. Le but n'est pas de gonfler le contrat à tout prix : un soutien excessif peut mener à un contrat intenable. Mieux vaut décrire honnêtement ta force et laisser ton partenaire ajuster. Plusieurs niveaux de soutien sont souvent défendables.</p>",
        },
      ],
      faq: [
        { q: "Faut-il soutenir dès qu'on a un atout dans sa couleur ?", a: "Un seul petit atout est un soutien léger. Le soutien dépend de la qualité de ton aide : atouts hauts, as de côté ou coupe pèsent bien plus qu'un atout isolé." },
        { q: "Peut-on trop soutenir ?", a: "Oui. Surévaluer son aide pousse parfois le contrat trop haut, vers une chute. Décris ta force réelle plutôt que d'enchérir par enthousiasme." },
      ],
      related: ["enc-monter-au-dessus-partenaire", "enc-ouvrir-80", "enc-evaluer-main"],
    },
    en: {
      slug: "supporting-your-partners-bid-coinche",
      linkLabel: "Supporting your partner",
      title: "How to support your partner's bid in coinche",
      h1: "Supporting your partner's bid",
      description:
        "Supporting your partner's bid in coinche: when to raise in their suit, by how much, and how not to overload them.",
      lead: "When your partner bids, your hand is no longer alone: it completes theirs. To <strong>support</strong> is to add your strength to theirs in the suit they chose.",
      sections: [
        {
          h2: "What does supporting mean?",
          html: "<p>Supporting means <strong>raising the bid</strong> in your partner's suit because you also hold useful cards there. You tell them: \"I have something to help, we can aim higher.\" It's one of the foundations of team play.</p>",
        },
        {
          h2: "What to support with",
          html: "<ul><li>One or two <strong>trumps</strong> in their suit, especially high ones.</li><li>A <strong>side ace</strong> that brings a sure trick.</li><li>A possible <strong>ruff</strong> (a short suit) that adds tricks.</li></ul>",
        },
        {
          h2: "By how much to raise?",
          html: "<p>No fixed scale. Modest help justifies a small step (from 80 to 90, say); real fit can justify a sharper jump. The goal isn't to inflate the contract at any cost: over-support can lead to an unmakeable contract. Better to describe your strength honestly and let your partner adjust. Several support levels are often defensible.</p>",
        },
      ],
      faq: [
        { q: "Should you support as soon as you have a trump in their suit?", a: "A single small trump is light support. Support depends on quality: high trumps, side aces or a ruff weigh far more than one isolated trump." },
        { q: "Can you over-support?", a: "Yes. Overrating your help sometimes pushes the contract too high, toward failure. Describe your real strength rather than bidding out of enthusiasm." },
      ],
      related: ["enc-monter-au-dessus-partenaire", "enc-ouvrir-80", "enc-evaluer-main"],
    },
  },

  {
    id: "enc-passer",
    priority: 0.55,
    fr: {
      slug: "quand-passer-aux-encheres-coinche",
      linkLabel: "Quand passer",
      title: "Quand vaut-il mieux passer aux enchères à la coinche ?",
      h1: "Quand vaut-il mieux passer ?",
      description:
        "Passer à la coinche n'est pas une faiblesse. Quand renoncer à annoncer est le bon choix, et ce que ça apprend à ton partenaire.",
      lead: "Passer n'est pas renoncer : c'est <strong>une information</strong>. Savoir s'abstenir au bon moment est une compétence d'enchère à part entière.",
      sections: [
        {
          h2: "Passer, c'est aussi parler",
          html: "<p>Quand tu passes, tu dis à ton partenaire que ta main n'est pas assez forte pour t'engager dans la couleur disponible. C'est une <strong>information utile</strong> : il saura qu'il ne peut pas trop compter sur toi pour ce contrat. Un passe lucide vaut mieux qu'une annonce forcée.</p>",
        },
        {
          h2: "Quand le passe s'impose",
          html: "<ul><li>Ta main est <strong>faible partout</strong> : ni atout maître, ni as de côté.</li><li>Tu n'as <strong>aucune couleur</strong> assez longue ou solide pour proposer un atout.</li><li>Monter sur l'annonce existante t'engagerait au-delà de tes moyens.</li></ul>",
        },
        {
          h2: "Passer sans renoncer à défendre",
          html: "<p>Passer aux enchères ne t'empêche pas de bien jouer la donne ensuite, ni de coincher l'adversaire plus tard si l'occasion se présente. Et tout dépend du contexte : en tête au score, passer prudemment protège ton avance ; mené, tu peux parfois te permettre une annonce plus audacieuse plutôt qu'un passe. Ce n'est jamais un automatisme.</p>",
        },
      ],
      faq: [
        { q: "Passer aux enchères, est-ce un aveu de faiblesse ?", a: "Non. C'est une décision stratégique qui informe ton partenaire et t'évite un contrat intenable. Bien passer fait partie d'un bon jeu d'enchères." },
        { q: "Peut-on encore coincher après avoir passé ?", a: "Oui. Passer lors de ton tour d'enchère ne t'empêche pas de coincher un contrat adverse ensuite, si ta main le justifie." },
      ],
      related: ["enc-ouvrir-80", "enc-coincher", "enc-bluff"],
    },
    en: {
      slug: "when-to-pass-in-the-bidding-coinche",
      linkLabel: "When to pass",
      title: "When is passing the better choice in coinche bidding?",
      h1: "When is passing the better choice?",
      description:
        "Passing in coinche isn't weakness. When declining to bid is the right call, and what it tells your partner.",
      lead: "Passing isn't giving up: it's <strong>information</strong>. Knowing when to refrain is a bidding skill in its own right.",
      sections: [
        {
          h2: "Passing also speaks",
          html: "<p>When you pass, you tell your partner your hand isn't strong enough to commit in the available suit. That's <strong>useful information</strong>: they'll know not to count too much on you for this contract. A clear-eyed pass beats a forced bid.</p>",
        },
        {
          h2: "When passing is right",
          html: "<ul><li>Your hand is <strong>weak everywhere</strong>: no master trump, no side ace.</li><li>You have <strong>no suit</strong> long or solid enough to propose as trump.</li><li>Raising the current bid would commit you beyond your means.</li></ul>",
        },
        {
          h2: "Passing without giving up the defence",
          html: "<p>Passing in the auction doesn't stop you from playing the deal well, nor from coinching the opponents later if the chance comes. And it all depends on context: ahead on the scoreboard, a cautious pass protects your lead; behind, you can sometimes afford a bolder bid instead of a pass. It's never automatic.</p>",
        },
      ],
      faq: [
        { q: "Is passing in the auction an admission of weakness?", a: "No. It's a strategic decision that informs your partner and spares you an unmakeable contract. Passing well is part of good bidding." },
        { q: "Can you still coinche after passing?", a: "Yes. Passing on your turn to bid doesn't prevent you from coinching an opponents' contract later, if your hand justifies it." },
      ],
      related: ["enc-ouvrir-80", "enc-coincher", "enc-bluff"],
    },
  },

  {
    id: "enc-valet-sec",
    priority: 0.55,
    fr: {
      slug: "annoncer-avec-valet-atout-sec-coinche",
      linkLabel: "Valet d'atout sec",
      title: "Annoncer avec un valet d'atout sec : bonne idée ?",
      h1: "Annoncer avec un valet d'atout sec ?",
      description:
        "Valet d'atout sec à la coinche : le valet vaut 20 mais il est seul. Quand annoncer dessus, les risques et comment juger le reste de la main.",
      lead: "Le <strong>valet d'atout vaut 20 points</strong> et c'est la plus forte carte. Mais s'il est <strong>sec</strong> (seul de sa couleur), l'annoncer comme atout est un pari délicat.",
      sections: [
        {
          h2: "La force et le piège",
          html: "<p>Le valet d'atout est la carte maîtresse : il fait un pli quasi assuré et vaut 20. Le problème, c'est qu'un valet <strong>sec</strong> ne te donne qu'un seul atout. Dès que tu le joues, tu n'as plus de coupe ni de contrôle dans cette couleur. La promesse de 20 points cache une vraie fragilité.</p>",
        },
        {
          h2: "Ce qui rend l'annonce viable",
          html: "<ul><li>Des <strong>as de côté</strong> solides qui feront des plis hors atout.</li><li>Un <strong>partenaire</strong> qui peut détenir d'autres atouts dans cette couleur.</li><li>Un contrat <strong>modeste</strong> (80), qui laisse de la marge plutôt qu'un engagement élevé.</li></ul>",
        },
        {
          h2: "Annoncer ou changer d'optique",
          html: "<p>Il n'y a pas de vérité unique. Avec un valet sec et de bons côtés, une ouverture prudente peut se défendre, surtout si tu espères du soutien. Mais une main pauvre à côté du valet sec invite plutôt à passer, ou à envisager un autre contrat (Sans Atout, par exemple, où le valet n'a pas ce rôle de pivot). Juge l'ensemble, pas seulement le valet.</p>",
        },
      ],
      faq: [
        { q: "Le valet d'atout sec fait-il toujours un pli ?", a: "Le plus souvent oui, car c'est la carte la plus forte à l'atout. Mais une fois joué, tu n'as plus d'atout, ce qui peut fragiliser le reste de la donne." },
        { q: "Doit-on annoncer dès qu'on a le valet d'atout, même sec ?", a: "Non, ce n'est pas automatique. Le valet sec gagne en valeur s'il est entouré d'as de côté ou soutenu par le partenaire. Seul dans une main pauvre, passer est souvent plus sage." },
      ],
      related: ["enc-evaluer-main", "enc-ouvrir-80", "enc-sans-atout"],
    },
    en: {
      slug: "bidding-with-a-bare-trump-jack-coinche",
      linkLabel: "Bare trump jack",
      title: "Bidding with a bare trump jack: good idea?",
      h1: "Bidding with a bare trump jack?",
      description:
        "Bare trump jack in coinche: the jack is worth 20 but it's alone. When to bid on it, the risks and how to judge the rest of the hand.",
      lead: "The <strong>trump jack is worth 20 points</strong> and it's the strongest card. But if it's <strong>bare</strong> (alone in its suit), bidding it as trump is a delicate gamble.",
      sections: [
        {
          h2: "The strength and the trap",
          html: "<p>The trump jack is the master card: it wins an almost certain trick and scores 20. The trouble is that a <strong>bare</strong> jack gives you just one trump. Once you play it, you have no ruff or control left in that suit. The promise of 20 points hides real fragility.</p>",
        },
        {
          h2: "What makes the bid viable",
          html: "<ul><li>Solid <strong>side aces</strong> that will win tricks outside trumps.</li><li>A <strong>partner</strong> who may hold other trumps in that suit.</li><li>A <strong>modest</strong> contract (80) that leaves room rather than a high commitment.</li></ul>",
        },
        {
          h2: "Bid or change your angle",
          html: "<p>There's no single truth. With a bare jack and good sides, a cautious opening can be defended, especially if you hope for support. But a poor hand beside the bare jack rather invites a pass, or another contract (No Trump, say, where the jack isn't this pivot card). Judge the whole hand, not just the jack.</p>",
        },
      ],
      faq: [
        { q: "Does a bare trump jack always win a trick?", a: "Usually yes, as it's the strongest trump card. But once played, you have no trumps left, which can weaken the rest of the deal." },
        { q: "Should you bid as soon as you hold the trump jack, even bare?", a: "No, it's not automatic. The bare jack gains value when surrounded by side aces or backed by the partner. Alone in a poor hand, passing is often wiser." },
      ],
      related: ["enc-evaluer-main", "enc-ouvrir-80", "enc-sans-atout"],
    },
  },

  {
    id: "enc-compter-points",
    priority: 0.55,
    fr: {
      slug: "compter-points-main-pour-annoncer-coinche",
      linkLabel: "Compter sa main",
      title: "Compter les points de sa main pour annoncer (forces et honneurs)",
      h1: "Compter les points de sa main pour annoncer",
      description:
        "Compter les points de sa main avant d'annoncer à la coinche : valeur des honneurs à l'atout et à couleur, et limites de la méthode.",
      lead: "Estimer les <strong>points et les honneurs</strong> de sa main aide à fixer une annonce. Mais c'est un repère, pas une loi : la distribution compte autant que le total.",
      sections: [
        {
          h2: "Les valeurs à connaître",
          html: "<p>À l'atout : <strong>valet 20, neuf 14, as 11, dix 10, roi 4, dame 3</strong>. À couleur (hors atout) : <strong>as 11, dix 10, roi 4, dame 3, valet 2</strong>. Compter tes honneurs te donne une première idée du potentiel de ta main, surtout dans la couleur que tu envisages comme atout.</p>",
        },
        {
          h2: "Tableau récapitulatif",
          html: "<table><tr><th>Carte</th><th>Atout</th><th>Couleur</th></tr><tr><td>Valet</td><td>20</td><td>2</td></tr><tr><td>Neuf</td><td>14</td><td>0</td></tr><tr><td>As</td><td>11</td><td>11</td></tr><tr><td>Dix</td><td>10</td><td>10</td></tr><tr><td>Roi</td><td>4</td><td>4</td></tr><tr><td>Dame</td><td>3</td><td>3</td></tr></table>",
        },
        {
          h2: "Pourquoi le total ne suffit pas",
          html: "<p>Deux mains à 40 points ne se valent pas si l'une est concentrée et l'autre éparpillée. Une <strong>longue couleur d'atout</strong> rapporte des plis que le simple comptage d'honneurs ne montre pas. À l'inverse, des honneurs isolés (une dame seule) tombent souvent. Sers-toi du comptage comme d'un point de départ, puis ajuste selon ta distribution, ton partenaire et le score. Aucune annonce n'est dictée par un seul chiffre.</p>",
        },
      ],
      faq: [
        { q: "Combien vaut le valet selon le contrat ?", a: "À l'atout, le valet vaut 20 points ; à couleur, il ne vaut que 2. C'est l'écart le plus spectaculaire du barème, ce qui explique son importance dans le choix de l'atout." },
        { q: "Un total de points élevé garantit-il un bon contrat ?", a: "Non. La répartition des cartes et la longueur d'atout pèsent autant que le total. Un comptage élevé mais éparpillé peut décevoir, et l'inverse aussi." },
      ],
      related: ["enc-evaluer-main", "enc-choisir-atout", "enc-ouvrir-80"],
    },
    en: {
      slug: "counting-your-hand-points-to-bid-coinche",
      linkLabel: "Counting your hand",
      title: "Counting your hand's points to bid (strength and honours)",
      h1: "Counting your hand's points to bid",
      description:
        "Counting your hand's points before bidding in coinche: honour values in trumps and in suit, and the method's limits.",
      lead: "Estimating your hand's <strong>points and honours</strong> helps set a bid. But it's a guide, not a law: shape matters as much as the total.",
      sections: [
        {
          h2: "The values to know",
          html: "<p>In trumps: <strong>jack 20, nine 14, ace 11, ten 10, king 4, queen 3</strong>. In a side suit: <strong>ace 11, ten 10, king 4, queen 3, jack 2</strong>. Counting your honours gives a first idea of your hand's potential, especially in the suit you're eyeing as trump.</p>",
        },
        {
          h2: "Quick-reference table",
          html: "<table><tr><th>Card</th><th>Trump</th><th>Suit</th></tr><tr><td>Jack</td><td>20</td><td>2</td></tr><tr><td>Nine</td><td>14</td><td>0</td></tr><tr><td>Ace</td><td>11</td><td>11</td></tr><tr><td>Ten</td><td>10</td><td>10</td></tr><tr><td>King</td><td>4</td><td>4</td></tr><tr><td>Queen</td><td>3</td><td>3</td></tr></table>",
        },
        {
          h2: "Why the total isn't enough",
          html: "<p>Two 40-point hands aren't equal if one is concentrated and the other scattered. A <strong>long trump suit</strong> yields tricks that simple honour-counting doesn't show. Conversely, isolated honours (a lone queen) often fall. Use counting as a starting point, then adjust for shape, partner and score. No bid is dictated by a single number.</p>",
        },
      ],
      faq: [
        { q: "How much is the jack worth depending on the contract?", a: "In trumps the jack is worth 20 points; in a side suit only 2. It's the most dramatic gap in the scale, which explains its weight in choosing trump." },
        { q: "Does a high point total guarantee a good contract?", a: "No. Card distribution and trump length matter as much as the total. A high but scattered count can disappoint, and the reverse too." },
      ],
      related: ["enc-evaluer-main", "enc-choisir-atout", "enc-ouvrir-80"],
    },
  },

  {
    id: "enc-bluff",
    priority: 0.55,
    fr: {
      slug: "bluff-aux-encheres-coinche",
      linkLabel: "Le bluff aux annonces",
      title: "Le bluff aux annonces à la coinche : utile ou risqué ?",
      h1: "Le bluff aux annonces : utile ou risqué ?",
      description:
        "Bluffer aux enchères à la coinche : annoncer plus que sa main pour gêner l'adversaire. Quand ça peut payer, et pourquoi ça trompe aussi son partenaire.",
      lead: "Bluffer, c'est annoncer <strong>plus fort que sa main</strong> pour gêner l'adversaire ou le pousser à la faute. Une arme séduisante, mais à manier avec prudence.",
      sections: [
        {
          h2: "Pourquoi bluffer",
          html: "<p>Un bluff peut <strong>priver l'adversaire d'un contrat</strong> qu'il aurait pris, ou le pousser à monter trop haut. Surenchérir légèrement pour « voler » une donne adverse fait partie du jeu de certains joueurs aguerris. Bien placé, un bluff change le rythme d'une partie.</p>",
        },
        {
          h2: "Le double tranchant",
          html: "<p>Le problème, c'est que ton <strong>partenaire te croit</strong>. Si tu annonces fort sans avoir le jeu, il va te soutenir, monter avec toi, et vous risquez de vous retrouver dans un contrat intenable, voire coinchés. Aux enchères, l'information donnée à ton partenaire est aussi précieuse que celle cachée à l'adversaire.</p>",
        },
        {
          h2: "Bluffer avec discernement",
          html: "<p>Il n'y a pas de réponse unique : le bluff peut être utile ou désastreux selon la situation. Réserve-le aux moments où le <strong>score</strong> le justifie (par exemple mené de loin, quand le risque est moins coûteux), où tu connais bien ton partenaire, et où l'adversaire semble hésitant. En début de partie ou avec un partenaire que tu ne lis pas encore, la sobriété est souvent plus rentable.</p>",
        },
      ],
      faq: [
        { q: "Le bluff est-il interdit à la coinche ?", a: "Non, annoncer plus que sa main est autorisé : c'est une tactique. Mais c'est risqué, car ton partenaire prend tes annonces au sérieux et adaptera son jeu en conséquence." },
        { q: "Quand le bluff a-t-il le plus de chances de payer ?", a: "Plutôt quand le score te laisse de la marge, quand tu connais les réactions de ton partenaire et quand l'adversaire hésite. Ce n'est jamais garanti." },
      ],
      related: ["enc-coincher", "enc-passer", "enc-lire-annonces-adverses"],
    },
    en: {
      slug: "bluffing-in-the-bidding-coinche",
      linkLabel: "Bluffing in bidding",
      title: "Bluffing in coinche bidding: useful or risky?",
      h1: "Bluffing in bidding: useful or risky?",
      description:
        "Bluffing in coinche bidding: bidding above your hand to disrupt opponents. When it can pay, and why it also misleads your partner.",
      lead: "Bluffing means bidding <strong>stronger than your hand</strong> to disrupt the opponents or push them into error. A tempting weapon, but one to handle carefully.",
      sections: [
        {
          h2: "Why bluff",
          html: "<p>A bluff can <strong>deny the opponents a contract</strong> they'd have made, or push them too high. Slightly overbidding to \"steal\" an opposing deal is part of some seasoned players' game. Well placed, a bluff changes a match's rhythm.</p>",
        },
        {
          h2: "The double edge",
          html: "<p>The catch is that your <strong>partner believes you</strong>. If you bid strong without the cards, they'll support you, climb with you, and you may land in an unmakeable contract, even coinched. In bidding, the information you give your partner is as precious as what you hide from the opponents.</p>",
        },
        {
          h2: "Bluff with judgment",
          html: "<p>There's no single answer: a bluff can be useful or disastrous depending on the situation. Save it for moments when the <strong>score</strong> justifies it (far behind, say, where the risk costs less), when you know your partner well, and when the opponents seem unsure. Early in a match, or with a partner you can't yet read, restraint usually pays more.</p>",
        },
      ],
      faq: [
        { q: "Is bluffing forbidden in coinche?", a: "No, bidding above your hand is allowed: it's a tactic. But it's risky, because your partner takes your bids seriously and will adjust their play accordingly." },
        { q: "When is a bluff most likely to pay off?", a: "Rather when the score leaves you room, when you know your partner's reactions and when the opponents hesitate. It's never guaranteed." },
      ],
      related: ["enc-coincher", "enc-passer", "enc-lire-annonces-adverses"],
    },
  },

  {
    id: "enc-tenter-capot",
    priority: 0.55,
    fr: {
      slug: "quand-tenter-capot-aux-encheres-coinche",
      linkLabel: "Tenter le capot",
      title: "Quand tenter d'annoncer capot à la coinche ?",
      h1: "Quand tenter d'annoncer capot ?",
      description:
        "Annoncer capot à la coinche : viser les 8 plis pour 250 points. Quelle main le justifie, le rôle du partenaire et quand un contrat sûr vaut mieux.",
      lead: "Annoncer <strong>capot</strong>, c'est promettre les <strong>8 plis</strong> pour <strong>250 points</strong>. L'annonce la plus prestigieuse, et la plus risquée du jeu.",
      sections: [
        {
          h2: "Ce que le capot exige",
          html: "<p>Pour viser le capot, il faut <strong>contrôler toutes les couleurs</strong> : ne laisser aucune ouverture à l'adversaire. Cela suppose beaucoup d'atouts maîtres (valet, neuf, as), des as de côté, et idéalement la main pour mener la donne à ton rythme. Un seul pli concédé fait chuter le contrat et offre les 250 points à l'adversaire.</p>",
        },
        {
          h2: "Le rôle du partenaire",
          html: "<p>Le capot se réalise à deux. Si ton partenaire a montré du jeu pendant les enchères, ta main n'a pas besoin d'être parfaite : ses cartes peuvent boucher les trous. Un capot annoncé sur un duo bien complémentaire est plus sûr qu'un capot tenté en solo sur une main brillante mais isolée.</p>",
        },
        {
          h2: "Risque et alternatives",
          html: "<p>Le capot peut renverser une partie, mais une seule faille le fait chuter lourdement. En cas de doute, un contrat élevé mais réaliste (140, 150, 160) sécurise souvent davantage de points qu'un capot incertain. Tiens compte du <strong>score</strong> : mené de loin, le pari du capot peut valoir le risque ; en tête, la prudence protège ton avance. Plusieurs choix sont défendables.</p>",
        },
      ],
      faq: [
        { q: "Combien rapporte un capot annoncé et réussi ?", a: "Un capot annoncé et réussi vaut 250 points. S'il chute, ne serait-ce que d'un pli, ces 250 points vont à l'équipe adverse." },
        { q: "Faut-il une main parfaite pour annoncer capot ?", a: "Pas forcément. Si ton partenaire a montré de la force aux enchères, une main solide mais imparfaite peut suffire, car ses cartes compléteront les tiennes. Tout dépend du duo et de la donne." },
      ],
      related: ["lex-capot", "enc-evaluer-main", "enc-soutenir-partenaire"],
    },
    en: {
      slug: "when-to-bid-capot-coinche",
      linkLabel: "Going for capot",
      title: "When to bid capot in coinche?",
      h1: "When to bid capot?",
      description:
        "Bidding capot in coinche: aiming for all 8 tricks for 250 points. What hand justifies it, the partner's role and when a safe contract is better.",
      lead: "Bidding <strong>capot</strong> means promising all <strong>8 tricks</strong> for <strong>250 points</strong>. The most prestigious call, and the riskiest in the game.",
      sections: [
        {
          h2: "What capot demands",
          html: "<p>To aim for capot you must <strong>control every suit</strong>: leave the opponents no opening. That means many master trumps (jack, nine, ace), side aces, and ideally the lead to run the deal at your pace. A single conceded trick fails the contract and hands the 250 points to the opponents.</p>",
        },
        {
          h2: "The partner's role",
          html: "<p>Capot is made by two. If your partner has shown a hand during the auction, yours needn't be perfect: their cards can plug the gaps. A capot bid on a well-matched pair is safer than one attempted solo on a brilliant but isolated hand.</p>",
        },
        {
          h2: "Risk and alternatives",
          html: "<p>Capot can flip a match, but a single flaw makes it fail heavily. When in doubt, a high but realistic contract (140, 150, 160) often secures more points than a shaky capot. Mind the <strong>score</strong>: far behind, the capot gamble may be worth it; ahead, caution protects your lead. Several choices are defensible.</p>",
        },
      ],
      faq: [
        { q: "How much does a bid-and-made capot score?", a: "A bid-and-made capot is worth 250 points. If it fails, even by one trick, those 250 points go to the opposing team." },
        { q: "Do you need a perfect hand to bid capot?", a: "Not necessarily. If your partner has shown strength in the auction, a solid but imperfect hand can be enough, since their cards complete yours. It depends on the pair and the deal." },
      ],
      related: ["lex-capot", "enc-evaluer-main", "enc-soutenir-partenaire"],
    },
  },

  {
    id: "enc-choisir-atout",
    priority: 0.55,
    fr: {
      slug: "choisir-couleur-atout-coinche",
      linkLabel: "Choisir l'atout",
      title: "Choisir la couleur d'atout à la coinche : la plus longue ?",
      h1: "Choisir la couleur d'atout : la plus longue ?",
      description:
        "Choisir sa couleur d'atout à la coinche : longueur, honneurs, valet et neuf. Pourquoi la plus longue n'est pas toujours la meilleure.",
      lead: "« Prends ta couleur la plus longue » est un bon réflexe de départ. Mais à la coinche, la <strong>qualité des atouts</strong> compte autant que leur <strong>nombre</strong>.",
      sections: [
        {
          h2: "Pourquoi la longueur compte",
          html: "<p>Plus tu as d'atouts dans une couleur, plus tu gardes le contrôle : tu peux couper les autres couleurs et épuiser ceux de l'adversaire. Une couleur de 5 atouts est un socle solide. C'est pourquoi la plus longue est souvent un bon point de départ pour choisir l'atout.</p>",
        },
        {
          h2: "Quand la qualité prime",
          html: "<p>La longueur ne fait pas tout. Le <strong>valet (20) et le neuf (14)</strong> sont les cartes décisives à l'atout. Quatre atouts avec valet et neuf valent souvent mieux que cinq petits atouts sans honneur. Une couleur courte mais blindée d'honneurs peut être un meilleur atout qu'une couleur longue et molle.</p>",
        },
        {
          h2: "Arbitrer entre les deux",
          html: "<ul><li><strong>Longue et solide</strong> (valet/neuf + longueur) : le choix le plus confortable.</li><li><strong>Longue mais faible</strong> : utile pour couper, mais fragile sur les gros plis.</li><li><strong>Courte mais maîtresse</strong> : tentante, à condition d'avoir du soutien ailleurs.</li></ul><p>Aucune règle n'impose un choix unique : pèse longueur et honneurs ensemble, et tiens compte de ce que ton partenaire a pu annoncer.</p>",
        },
      ],
      faq: [
        { q: "Faut-il toujours prendre sa couleur la plus longue comme atout ?", a: "C'est un bon réflexe, mais pas une obligation. Une couleur un peu plus courte mais riche en valet et neuf peut être un meilleur atout. La qualité compte autant que la longueur." },
        { q: "Le valet et le neuf changent-ils vraiment la donne ?", a: "Oui. À l'atout, le valet vaut 20 et le neuf 14 : ce sont les deux cartes maîtresses. Les détenir oriente fortement le choix de la couleur d'atout." },
      ],
      related: ["enc-evaluer-main", "enc-compter-points", "enc-ouvrir-80"],
    },
    en: {
      slug: "choosing-the-trump-suit-coinche",
      linkLabel: "Choosing trump",
      title: "Choosing the trump suit in coinche: the longest one?",
      h1: "Choosing the trump suit: the longest one?",
      description:
        "Choosing your trump suit in coinche: length, honours, jack and nine. Why the longest isn't always the best.",
      lead: "\"Take your longest suit\" is a good starting reflex. But in coinche, the <strong>quality of your trumps</strong> matters as much as their <strong>number</strong>.",
      sections: [
        {
          h2: "Why length matters",
          html: "<p>The more trumps you hold in a suit, the more control you keep: you can ruff other suits and exhaust the opponents'. A 5-card trump suit is a solid base. That's why the longest suit is often a good starting point for choosing trump.</p>",
        },
        {
          h2: "When quality wins",
          html: "<p>Length isn't everything. The <strong>jack (20) and nine (14)</strong> are the decisive trump cards. Four trumps with jack and nine are often better than five small trumps with no honour. A short but honour-packed suit can be a better trump than a long, soft one.</p>",
        },
        {
          h2: "Weighing the two",
          html: "<ul><li><strong>Long and solid</strong> (jack/nine + length): the most comfortable choice.</li><li><strong>Long but weak</strong>: useful for ruffing, but fragile on big tricks.</li><li><strong>Short but master</strong>: tempting, provided you have support elsewhere.</li></ul><p>No rule forces one choice: weigh length and honours together, and account for what your partner may have bid.</p>",
        },
      ],
      faq: [
        { q: "Should you always take your longest suit as trump?", a: "It's a good reflex, but not a rule. A slightly shorter suit rich in jack and nine can be a better trump. Quality matters as much as length." },
        { q: "Do the jack and nine really change things?", a: "Yes. In trumps the jack is worth 20 and the nine 14: they're the two master cards. Holding them strongly steers the choice of trump suit." },
      ],
      related: ["enc-evaluer-main", "enc-compter-points", "enc-ouvrir-80"],
    },
  },

  {
    id: "enc-monter-au-dessus-partenaire",
    priority: 0.55,
    fr: {
      slug: "monter-au-dessus-annonce-partenaire-coinche",
      linkLabel: "Monter sur le partenaire",
      title: "Quand monter au-dessus de l'annonce de son partenaire ?",
      h1: "Quand monter au-dessus de l'annonce du partenaire ?",
      description:
        "Monter au-dessus de l'annonce de son partenaire à la coinche : quand renforcer, quand changer de couleur, et comment ne pas surévaluer sa main.",
      lead: "Quand ton partenaire a déjà annoncé, monter au-dessus de lui revient à dire : « j'ai mieux, ou un complément qui justifie de viser plus haut ». À doser avec soin.",
      sections: [
        {
          h2: "Renforcer dans sa couleur",
          html: "<p>Le cas le plus simple : tu montes dans <strong>la couleur de ton partenaire</strong> parce que tu as un vrai apport (atouts hauts, as de côté, coupe). Tu confirmes son atout et tu pousses le contrat un cran plus haut. C'est un soutien actif, qui rassure ton partenaire sur la solidité du duo.</p>",
        },
        {
          h2: "Proposer une autre couleur",
          html: "<p>Parfois, ta main est forte dans une <strong>autre couleur</strong> que celle annoncée. Monter en changeant d'atout est plus engageant : tu dis que ton jeu vaut mieux dans ta couleur. Cela peut être juste, mais réfléchis à deux fois : écraser l'annonce d'un partenaire qui a peut-être un meilleur jeu que toi est un pari.</p>",
        },
        {
          h2: "Le risque de surévaluer",
          html: "<p>L'erreur fréquente est de monter par enthousiasme. Si tu surévalues ton apport, vous grimpez vers un contrat que personne ne peut tenir, et l'adversaire n'a plus qu'à coincher. Tiens compte du <strong>score</strong> et de ce que ton partenaire a réellement promis. Souvent, laisser le contrat à un niveau confortable est plus sage que de le pousser trop haut. Plusieurs décisions peuvent être correctes.</p>",
        },
      ],
      faq: [
        { q: "Doit-on toujours monter quand on a un beau jeu ?", a: "Non. Un beau jeu peut justifier de monter, mais aussi de laisser ton partenaire mener si son annonce est déjà au bon niveau. Pousser trop haut expose au coinche et à la chute." },
        { q: "Peut-on changer la couleur d'atout annoncée par son partenaire ?", a: "Oui, en montant dans une autre couleur, si ta main y est nettement plus forte. C'est un choix engageant : assure-toi que ton apport le justifie vraiment." },
      ],
      related: ["enc-soutenir-partenaire", "enc-evaluer-main", "enc-choisir-atout"],
    },
    en: {
      slug: "raising-above-your-partners-bid-coinche",
      linkLabel: "Raising over partner",
      title: "When to raise above your partner's bid in coinche?",
      h1: "When to raise above your partner's bid?",
      description:
        "Raising above your partner's bid in coinche: when to reinforce, when to switch suits, and how not to overrate your hand.",
      lead: "When your partner has already bid, raising above them says: \"I have more, or something that justifies aiming higher.\" Dose it carefully.",
      sections: [
        {
          h2: "Reinforcing in their suit",
          html: "<p>The simplest case: you raise in <strong>your partner's suit</strong> because you bring something real (high trumps, side aces, a ruff). You confirm their trump and push the contract a notch higher. It's active support that reassures your partner about the pair's solidity.</p>",
        },
        {
          h2: "Proposing another suit",
          html: "<p>Sometimes your hand is strong in a <strong>different suit</strong> from the one bid. Raising by switching trump is more committal: you say your hand is better in your suit. It can be right, but think twice: overriding a partner who may hold a better hand than you is a gamble.</p>",
        },
        {
          h2: "The risk of overrating",
          html: "<p>The common mistake is raising out of enthusiasm. If you overrate your contribution, you climb toward a contract no one can make, and the opponents simply coinche. Account for the <strong>score</strong> and what your partner actually promised. Often, leaving the contract at a comfortable level is wiser than pushing it too high. Several decisions can be right.</p>",
        },
      ],
      faq: [
        { q: "Should you always raise with a nice hand?", a: "No. A nice hand can justify raising, but also letting your partner lead if their bid is already at the right level. Pushing too high exposes you to a coinche and failure." },
        { q: "Can you change the trump suit your partner bid?", a: "Yes, by raising in another suit, if your hand is clearly stronger there. It's a committal choice: make sure your contribution truly justifies it." },
      ],
      related: ["enc-soutenir-partenaire", "enc-evaluer-main", "enc-choisir-atout"],
    },
  },

  {
    id: "enc-lire-annonces-adverses",
    priority: 0.55,
    fr: {
      slug: "lire-deduire-annonces-adverses-coinche",
      linkLabel: "Lire les annonces adverses",
      title: "Lire et déduire l'information des annonces adverses à la coinche",
      h1: "Lire et déduire l'information des annonces adverses",
      description:
        "Lire les annonces adverses à la coinche : ce que révèle une ouverture, un soutien ou un passe. Déduire les forces sans tomber dans la sur-interprétation.",
      lead: "Chaque annonce adverse est une <strong>fuite d'information</strong>. Apprendre à la lire t'aide à mieux décider de coincher, de monter ou de défendre.",
      sections: [
        {
          h2: "Ce que dit une ouverture",
          html: "<p>Quand un adversaire ouvre dans une couleur, il signale qu'il y a de la <strong>force</strong> : souvent des atouts et au moins un honneur dans cette couleur. Plus son annonce est haute, plus son jeu est censé être solide. Cela t'indique où il pense gagner ses plis, donc où ton équipe sera en difficulté.</p>",
        },
        {
          h2: "Soutien, montée et passe",
          html: "<ul><li>Un <strong>soutien</strong> de son partenaire confirme que le duo adverse a du jeu dans cette couleur.</li><li>Une <strong>montée franche</strong> trahit une main forte et de l'ambition.</li><li>Un <strong>passe</strong> suggère une main faible, ou sans couleur exploitable.</li></ul>",
        },
        {
          h2: "Déduire sans sur-interpréter",
          html: "<p>Ces signaux sont des indices, pas des certitudes. Un adversaire peut bluffer, ou avoir une main atypique. Croise plusieurs annonces (qui a parlé, qui a soutenu, qui a passé) plutôt que de te fier à une seule. Et garde en tête que tes propres annonces les renseignent aussi : la lecture marche dans les deux sens. Bien lire la table, c'est rester nuancé.</p>",
        },
      ],
      faq: [
        { q: "Que m'apprend l'ouverture d'un adversaire ?", a: "Qu'il a de la force dans la couleur annoncée, souvent des atouts et un honneur. Plus l'annonce est haute, plus son jeu est censé être solide. Cela t'indique où il compte faire ses plis." },
        { q: "Peut-on se fier totalement aux annonces adverses ?", a: "Non. Ce sont des indices précieux, mais un adversaire peut bluffer ou avoir une main atypique. Croise plusieurs annonces et reste prudent dans tes déductions." },
      ],
      related: ["enc-coincher", "enc-bluff", "enc-passer"],
    },
    en: {
      slug: "reading-opponents-bids-coinche",
      linkLabel: "Reading opponents' bids",
      title: "Reading and deducing information from opponents' bids in coinche",
      h1: "Reading and deducing from opponents' bids",
      description:
        "Reading opponents' bids in coinche: what an opening, a raise or a pass reveals. Deduce their strengths without over-reading.",
      lead: "Every opposing bid is an <strong>information leak</strong>. Learning to read it helps you decide better whether to coinche, raise or defend.",
      sections: [
        {
          h2: "What an opening tells you",
          html: "<p>When an opponent opens in a suit, they signal <strong>strength</strong>: often trumps and at least one honour there. The higher their bid, the more solid their hand should be. This tells you where they expect to win tricks, so where your team will struggle.</p>",
        },
        {
          h2: "Support, raises and passes",
          html: "<ul><li>A <strong>raise</strong> by their partner confirms the opposing pair has cards in that suit.</li><li>A <strong>sharp jump</strong> betrays a strong hand and ambition.</li><li>A <strong>pass</strong> suggests a weak hand, or no usable suit.</li></ul>",
        },
        {
          h2: "Deduce without over-reading",
          html: "<p>These signals are clues, not certainties. An opponent may bluff or hold an unusual hand. Cross several bids (who spoke, who supported, who passed) rather than trusting one alone. And remember your own bids inform them too: reading works both ways. Reading the table well means staying nuanced.</p>",
        },
      ],
      faq: [
        { q: "What does an opponent's opening tell me?", a: "That they have strength in the bid suit, often trumps and an honour. The higher the bid, the more solid their hand should be. It tells you where they plan to win tricks." },
        { q: "Can you fully trust opponents' bids?", a: "No. They're valuable clues, but an opponent may bluff or hold an unusual hand. Cross several bids and stay cautious in your deductions." },
      ],
      related: ["enc-coincher", "enc-bluff", "enc-passer"],
    },
  },
];
