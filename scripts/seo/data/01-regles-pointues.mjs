// Catégorie : Règles pointues et cas particuliers de la coinche (mots-clés longue traîne).

export const category = { fr: "Règles et cas particuliers", en: "Rules and edge cases" };

export default [
  {
    id: "reg-coincher-partenaire",
    priority: 0.5,
    fr: {
      slug: "coincher-son-partenaire-coinche",
      linkLabel: "Coincher son partenaire ?",
      title: "Peut-on coincher (contrer) son partenaire à la coinche ?",
      h1: "Peut-on coincher son partenaire ?",
      description:
        "Non, on ne coinche jamais son partenaire à la coinche. La coinche se joue uniquement contre l'équipe qui a pris. Explication claire et raisons.",
      lead: "La réponse est <strong>non</strong> : tu ne peux coincher que l'équipe adverse, jamais ton propre partenaire.",
      sections: [
        {
          h2: "Pourquoi c'est impossible",
          html: "<p>Coincher, c'est parier que l'équipe qui a pris le contrat va <strong>chuter</strong>. Comme tu joues dans la même équipe que ton partenaire, le coincher reviendrait à parier contre toi-même, ce qui n'a aucun sens : si son contrat tombe, c'est ton camp qui perd les points. La règle est donc claire : on ne coinche que l'<strong>adversaire</strong> qui vient de remporter l'enchère.</p>",
        },
        {
          h2: "Qui peut coincher, et quand",
          html: "<ul><li>Seul un joueur de l'<strong>équipe défensive</strong> (celle qui n'a pas pris) peut coincher.</li><li>La coinche se déclare <strong>avant la première carte jouée</strong>, quand le contrat est posé.</li><li>Une fois coinché, c'est l'équipe ayant pris qui peut <strong>surcoincher</strong> si elle se sent solide.</li></ul>",
        },
        {
          h2: "Le cas du contrat de ton partenaire",
          html: "<p>Si c'est ton partenaire qui a pris, tu ne fais rien de spécial : tu te contentes de l'aider à réaliser son contrat en jouant bien. Tu n'as ni à coincher, ni à surenchérir sur lui. Ton rôle est d'<strong>apporter tes plis</strong> à l'équipe, par exemple en chargeant ses plis maîtres avec tes grosses cartes (10, As) pour grossir le total.</p>",
        },
      ],
      faq: [
        { q: "Peut-on coincher son partenaire ?", a: "Non. On ne coinche que l'équipe adverse qui a remporté le contrat, jamais son propre partenaire." },
        { q: "Qui a le droit de coincher ?", a: "Seuls les deux joueurs de l'équipe qui n'a pas pris le contrat peuvent coincher, et uniquement avant que la première carte soit jouée." },
      ],
      related: ["reg-surcoinche", "reg-tous-passent", "reg-changer-annonce"],
    },
    en: {
      slug: "coinche-your-partner",
      linkLabel: "Coinche your partner?",
      title: "Can you coinche (double) your own partner in coinche?",
      h1: "Can you coinche your partner?",
      description:
        "No, you never coinche your own partner. Coinche is only declared against the team that won the contract. Clear explanation and reasons.",
      lead: "The answer is <strong>no</strong>: you can only coinche the opposing team, never your own partner.",
      sections: [
        {
          h2: "Why it's impossible",
          html: "<p>To coinche is to bet that the team holding the contract will <strong>fail</strong>. Since you and your partner are on the same team, coinching them would mean betting against yourself. So the rule is simple: you only coinche the opponents who just won the auction.</p>",
        },
        {
          h2: "Who can coinche, and when",
          html: "<ul><li>Only a player on the <strong>defending team</strong> (the one that did not take the bid) may coinche.</li><li>The coinche is called <strong>before the first card is played</strong>, once the contract is set.</li><li>After a coinche, the team that took the bid may <strong>surcoinche</strong> if they feel confident.</li></ul>",
        },
        {
          h2: "When your partner is declarer",
          html: "<p>If your partner took the contract, you do nothing unusual: you simply help them make it by playing well. You neither coinche nor overbid them. Your job is to <strong>bring your tricks</strong> to the team, for instance by loading their winning tricks with your big cards (10, Ace) to swell the total.</p>",
        },
      ],
      faq: [
        { q: "Can you coinche your partner?", a: "No. You only coinche the opposing team that won the contract, never your own partner." },
        { q: "Who is allowed to coinche?", a: "Only the two players on the team that did not take the contract can coinche, and only before the first card is played." },
      ],
      related: ["reg-surcoinche", "reg-tous-passent", "reg-changer-annonce"],
    },
  },

  {
    id: "reg-tous-passent",
    priority: 0.5,
    fr: {
      slug: "tous-les-joueurs-passent-coinche",
      linkLabel: "Tout le monde passe",
      title: "Que se passe-t-il si tous les joueurs passent à la coinche ?",
      h1: "Tout le monde passe : que fait-on ?",
      description:
        "Si les 4 joueurs passent sans qu'aucun contrat soit pris, la donne est annulée. On redonne : nouvelle distribution par le joueur suivant.",
      lead: "Quand les quatre joueurs passent sans qu'aucun contrat ne soit pris, la donne est <strong>annulée</strong> et l'on <strong>redonne</strong>.",
      sections: [
        {
          h2: "La règle : pas de contrat, pas de jeu",
          html: "<p>Pour jouer une donne, il faut qu'au moins une équipe ait pris un contrat (80 minimum). Si <strong>les quatre joueurs passent à la suite</strong> dès le premier tour, personne ne s'engage : il n'y a rien à jouer. On dit que la donne est « passée » ou « nulle ».</p>",
        },
        {
          h2: "On redonne",
          html: "<p>Les cartes sont ramassées et mélangées, puis <strong>redistribuées</strong>. Le plus courant est que le donneur suivant (le joueur à gauche du donneur précédent) prenne la main, comme si la donne s'était déroulée normalement. Certaines tables préfèrent que le même donneur redonne : à fixer avant la partie.</p>",
        },
        {
          h2: "Aucun point marqué",
          html: "<p>Personne ne marque : le score reste inchangé. C'est une simple remise à zéro de la donne. Il n'y a pas de pénalité, juste un peu de temps perdu, ce qui pousse souvent un joueur avec une main correcte à prendre à 80 plutôt que de risquer une redonne. À toi de juger : prendre à 80 sur une main moyenne reste un pari, et une redonne te redistribue peut-être une bien meilleure main.</p>",
        },
      ],
      faq: [
        { q: "Que se passe-t-il si tout le monde passe ?", a: "La donne est annulée et l'on redonne : les cartes sont ramassées, mélangées et redistribuées. Aucun point n'est marqué." },
        { q: "Qui redonne quand tous les joueurs ont passé ?", a: "Le plus souvent le donneur suivant, c'est-à-dire le joueur à gauche du donneur précédent. Certaines tables font redonner le même joueur." },
      ],
      related: ["reg-qui-distribue", "reg-comment-distribuer", "reg-changer-annonce"],
    },
    en: {
      slug: "all-players-pass-coinche",
      linkLabel: "Everyone passes",
      title: "What happens if all players pass in coinche?",
      h1: "Everyone passes: what now?",
      description:
        "If all 4 players pass and no contract is taken, the deal is void. You redeal: a fresh shuffle and distribution by the next dealer.",
      lead: "When all four players pass and no contract is taken, the deal is <strong>void</strong> and you <strong>redeal</strong>.",
      sections: [
        {
          h2: "The rule: no contract, no play",
          html: "<p>To play a deal, at least one team must take a contract (80 minimum). If <strong>all four players pass in a row</strong> on the first round, nobody commits and there is nothing to play. The deal is said to be \"passed\" or void.</p>",
        },
        {
          h2: "You redeal",
          html: "<p>The cards are gathered and shuffled, then <strong>dealt again</strong>. Most commonly the next dealer (the player to the left of the previous one) takes over, as if the deal had run normally. Some tables prefer the same dealer to redeal: agree on this beforehand.</p>",
        },
        {
          h2: "No points are scored",
          html: "<p>Nobody scores: the running total stays the same. It's simply a reset of the deal, with no penalty, just a little lost time. That's often why a player with a decent hand will take at 80 rather than risk a redeal. Your call, though: taking at 80 on a mediocre hand is still a gamble, and a redeal might hand you a far better hand.</p>",
        },
      ],
      faq: [
        { q: "What happens if everyone passes?", a: "The deal is void and you redeal: the cards are gathered, shuffled and dealt again. No points are scored." },
        { q: "Who redeals when all players pass?", a: "Most often the next dealer, the player to the left of the previous one. Some tables have the same player redeal." },
      ],
      related: ["reg-qui-distribue", "reg-comment-distribuer", "reg-changer-annonce"],
    },
  },

  {
    id: "reg-fournir-couleur",
    priority: 0.55,
    fr: {
      slug: "obligation-fournir-couleur-coinche",
      linkLabel: "Fournir la couleur",
      title: "Est-on obligé de fournir la couleur demandée à la coinche ?",
      h1: "L'obligation de fournir la couleur",
      description:
        "Oui : à la coinche tu dois fournir la couleur demandée si tu en as. Règle de la fourniture obligatoire, exceptions et lien avec la renonce.",
      lead: "Oui : si tu possèdes la couleur entamée, tu es <strong>obligé de la jouer</strong>. C'est la règle de base de tous les jeux de plis.",
      sections: [
        {
          h2: "La règle de la fourniture",
          html: "<p>Quand un joueur entame un pli avec une couleur (pique, cœur, carreau ou trèfle), chaque joueur suivant doit poser une carte <strong>de cette même couleur</strong> s'il en a une. C'est ce qu'on appelle « fournir ». Tu n'as pas le choix de la valeur, mais tu dois fournir la couleur.</p>",
        },
        {
          h2: "Que faire si tu n'as pas la couleur",
          html: "<p>Si, et seulement si, tu n'as <strong>aucune carte</strong> de la couleur demandée, tu peux alors couper (jouer atout) ou te défausser (jouer une autre couleur), selon les règles d'obligation de couper. Tant que tu as la couleur, tu dois la fournir, même si ça te désavantage.</p>",
        },
        {
          h2: "Ne pas fournir = la renonce",
          html: "<p>Jouer une autre carte alors qu'on pouvait fournir s'appelle une <strong>renonce</strong> : c'est une faute de jeu sanctionnée. Mieux vaut donc bien regarder ta main avant de jouer. La couleur d'atout suit la même logique : si on te demande de l'atout et que tu en as, tu dois en fournir.</p>",
        },
      ],
      faq: [
        { q: "Doit-on toujours fournir la couleur demandée ?", a: "Oui, si tu possèdes au moins une carte de la couleur entamée, tu es obligé de la jouer. Tu ne peux couper ou te défausser que si tu n'as pas la couleur." },
        { q: "Que risque-t-on à ne pas fournir alors qu'on le pouvait ?", a: "C'est une renonce, une faute de jeu sanctionnée par une pénalité, par exemple la perte de la donne pour l'équipe fautive." },
      ],
      related: ["reg-obligation-couper", "reg-renonce", "reg-monter-atout"],
    },
    en: {
      slug: "follow-suit-rule-coinche",
      linkLabel: "Following suit",
      title: "Must you follow suit in coinche?",
      h1: "The obligation to follow suit",
      description:
        "Yes: in coinche you must follow the led suit if you hold it. The follow-suit rule, exceptions, and how it connects to the renonce penalty.",
      lead: "Yes: if you hold the led suit, you are <strong>obliged to play it</strong>. It's the core rule of every trick-taking game.",
      sections: [
        {
          h2: "The follow-suit rule",
          html: "<p>When a player leads a trick with a suit (spades, hearts, diamonds or clubs), every player after them must play a card <strong>of that same suit</strong> if they have one. This is called \"following suit.\" You don't choose the rank, but you must follow the suit.</p>",
        },
        {
          h2: "What if you're void in the suit",
          html: "<p>If, and only if, you have <strong>no card</strong> of the led suit, you may then ruff (play trump) or discard (play another suit), depending on the must-ruff rules. As long as you hold the suit, you must follow it, even when it hurts you.</p>",
        },
        {
          h2: "Not following = a renonce",
          html: "<p>Playing another card when you could have followed is called a <strong>renonce</strong>: a penalised playing error. So check your hand carefully before playing. Trumps follow the same logic: if trump is led and you hold trump, you must play it.</p>",
        },
      ],
      faq: [
        { q: "Do you always have to follow the led suit?", a: "Yes, if you hold at least one card of the led suit you must play it. You may only ruff or discard when you are void in that suit." },
        { q: "What's the risk of not following when you could?", a: "It's a renonce, a playing error punished with a penalty, for example losing the deal for the offending team." },
      ],
      related: ["reg-obligation-couper", "reg-renonce", "reg-monter-atout"],
    },
  },

  {
    id: "reg-obligation-couper",
    priority: 0.55,
    fr: {
      slug: "obligation-de-couper-coinche",
      linkLabel: "Obligation de couper",
      title: "Est-on obligé de couper quand on n'a pas la couleur ?",
      h1: "L'obligation de couper à la coinche",
      description:
        "À la coinche, sans la couleur demandée, tu es en général obligé de couper (jouer atout). Règle, exception du partenaire maître, et conventions.",
      lead: "En général oui : si tu n'as pas la couleur demandée, tu dois <strong>couper</strong> (jouer atout), sauf exceptions.",
      sections: [
        {
          h2: "La règle de base",
          html: "<p>Quand on te demande une couleur que tu n'as pas, la règle classique de la coinche t'oblige à <strong>couper</strong>, c'est-à-dire à jouer un atout pour tenter de remporter le pli. Tu ne peux pas te défausser librement d'une autre couleur tant que tu possèdes au moins un atout.</p>",
        },
        {
          h2: "L'exception du partenaire maître",
          html: "<p>La principale exception (très répandue mais qui reste une <strong>convention</strong>) : si ton <strong>partenaire est déjà maître du pli</strong>, tu n'es pas obligé de couper. Tu peux te défausser tranquillement, puisque le pli revient déjà à ton équipe. Vérifie quand même que cette règle est admise à ta table.</p>",
        },
        {
          h2: "Et si quelqu'un a déjà coupé ?",
          html: "<p>Si un adversaire a coupé avant toi et que tu n'as pas la couleur, tu dois en principe <strong>monter</strong> (jouer un atout plus fort) si tu le peux, sinon tu fournis quand même un atout. Là encore, l'obligation de monter dépend des conventions : certaines tables ne l'imposent pas. Sans atout du tout, tu te défausses.</p>",
        },
      ],
      faq: [
        { q: "Est-on obligé de couper si on n'a pas la couleur ?", a: "En général oui : sans la couleur demandée, tu dois jouer un atout. La principale exception, conventionnelle, est quand ton partenaire est déjà maître du pli." },
        { q: "Peut-on se défausser au lieu de couper ?", a: "Seulement si tu n'as plus d'atout, ou, selon la convention de table, si ton partenaire est déjà maître du pli. Sinon, tu dois couper." },
      ],
      related: ["reg-fournir-couleur", "reg-monter-atout", "reg-couper-partenaire-maitre"],
    },
    en: {
      slug: "must-ruff-rule-coinche",
      linkLabel: "Must you ruff?",
      title: "Must you ruff when you can't follow suit in coinche?",
      h1: "The obligation to ruff in coinche",
      description:
        "In coinche, with no card of the led suit you're usually required to ruff (play trump). The rule, the partner-is-master exception, and conventions.",
      lead: "Usually yes: if you can't follow the led suit, you must <strong>ruff</strong> (play trump), with some exceptions.",
      sections: [
        {
          h2: "The basic rule",
          html: "<p>When a suit you don't hold is led, the classic coinche rule forces you to <strong>ruff</strong>, that is, to play a trump and try to win the trick. You can't freely discard another suit as long as you still hold at least one trump.</p>",
        },
        {
          h2: "The partner-is-master exception",
          html: "<p>The main exception (widespread but still a <strong>convention</strong>): if your <strong>partner already wins the trick</strong>, you don't have to ruff. You can discard safely, since the trick is already going to your team. Do check that this rule is accepted at your table.</p>",
        },
        {
          h2: "What if someone has already ruffed?",
          html: "<p>If an opponent ruffed before you and you can't follow, you should in principle <strong>overruff</strong> (play a higher trump) if you can, otherwise you still play a trump. Again, the duty to overruff depends on the conventions: some tables don't enforce it. With no trump at all, you discard.</p>",
        },
      ],
      faq: [
        { q: "Must you ruff when you can't follow suit?", a: "Usually yes: without the led suit you must play a trump. The main exception, by convention, is when your partner already wins the trick." },
        { q: "Can you discard instead of ruffing?", a: "Only if you have no trump left, or, depending on the table convention, if your partner already wins the trick. Otherwise you must ruff." },
      ],
      related: ["reg-fournir-couleur", "reg-monter-atout", "reg-couper-partenaire-maitre"],
    },
  },

  {
    id: "reg-monter-atout",
    priority: 0.5,
    fr: {
      slug: "obligation-de-monter-atout-coinche",
      linkLabel: "Monter à l'atout",
      title: "Est-on obligé de monter (surcouper) à l'atout à la coinche ?",
      h1: "Faut-il monter à l'atout ?",
      description:
        "Surcouper à la coinche : l'obligation de monter à l'atout dépend des conventions. Quand on doit jouer plus fort, et quand on peut sous-couper.",
      lead: "Cela dépend des conventions : dans la version la plus stricte, oui, tu dois <strong>monter</strong> (jouer un atout plus fort) quand tu coupes après un adversaire.",
      sections: [
        {
          h2: "Ce que veut dire « monter »",
          html: "<p>« Monter », ou <strong>surcouper</strong>, c'est jouer un atout <strong>plus fort</strong> que celui déjà posé. Cette question se pose quand tu n'as pas la couleur demandée, qu'un adversaire a déjà coupé, et que tu possèdes des atouts.</p>",
        },
        {
          h2: "La règle stricte",
          html: "<p>Dans la version la plus courante des règles, tu es <strong>obligé de monter</strong> si tu peux, c'est-à-dire de poser un atout supérieur à celui de l'adversaire. Si tu n'as que des atouts plus faibles, tu dois quand même en fournir un (tu « sous-coupes » par obligation), faute de mieux.</p>",
        },
        {
          h2: "Convention : monter seulement sur l'adversaire",
          html: "<p>L'obligation de monter ne vaut que si c'est un <strong>adversaire</strong> qui mène le pli. Si ton <strong>partenaire</strong> a coupé et est maître, tu n'as pas à le surcouper. Certaines tables allègent même la règle et n'imposent pas de monter du tout : mets-toi d'accord avant la partie pour éviter les litiges.</p>",
        },
      ],
      faq: [
        { q: "Est-on obligé de monter à l'atout ?", a: "Dans la version stricte des règles, oui : si un adversaire a coupé et que tu peux jouer un atout plus fort, tu dois le faire. Certaines tables n'imposent pas cette obligation." },
        { q: "Doit-on surcouper le pli de son partenaire ?", a: "Non. L'obligation de monter ne concerne que les plis menés par un adversaire. Si ton partenaire est maître, tu n'as pas à le surcouper." },
      ],
      related: ["reg-obligation-couper", "reg-couper-partenaire-maitre", "reg-fournir-couleur"],
    },
    en: {
      slug: "must-overruff-rule-coinche",
      linkLabel: "Must you overruff?",
      title: "Must you overruff (play higher trump) in coinche?",
      h1: "Do you have to overruff?",
      description:
        "Overruffing in coinche: the duty to play a higher trump depends on conventions. When you must go higher and when you may undertrump.",
      lead: "It depends on the convention: in the strictest version, yes, you must <strong>overruff</strong> (play a higher trump) when you ruff after an opponent.",
      sections: [
        {
          h2: "What \"overruffing\" means",
          html: "<p>To overruff is to play a <strong>higher trump</strong> than the one already on the table. The question arises when you can't follow the led suit, an opponent has already ruffed, and you hold trumps.</p>",
        },
        {
          h2: "The strict rule",
          html: "<p>In the most common version of the rules, you must <strong>overruff</strong> if you can, that is, play a trump higher than the opponent's. If you only hold weaker trumps, you must still play one (you \"undertrump\" by obligation) for lack of a better option.</p>",
        },
        {
          h2: "Convention: overruff only over opponents",
          html: "<p>The duty to overruff applies only when an <strong>opponent</strong> leads the trick. If your <strong>partner</strong> ruffed and is master, you don't have to overruff them. Some tables relax the rule and don't require overruffing at all: agree before the game to avoid disputes.</p>",
        },
      ],
      faq: [
        { q: "Must you overruff in coinche?", a: "In the strict version of the rules, yes: if an opponent has ruffed and you can play a higher trump, you must. Some tables don't enforce this." },
        { q: "Do you have to overruff your partner's trick?", a: "No. The duty to overruff only applies to tricks led by an opponent. If your partner is master, you don't overruff them." },
      ],
      related: ["reg-obligation-couper", "reg-couper-partenaire-maitre", "reg-fournir-couleur"],
    },
  },

  {
    id: "reg-couper-partenaire-maitre",
    priority: 0.5,
    fr: {
      slug: "couper-pli-partenaire-maitre-coinche",
      linkLabel: "Partenaire maître",
      title: "Faut-il couper si son partenaire est déjà maître du pli ?",
      h1: "Couper quand le partenaire est maître ?",
      description:
        "Si ton partenaire est déjà maître du pli, tu n'es en général pas obligé de couper : tu peux te défausser. Convention fréquente expliquée.",
      lead: "En général <strong>non</strong> : si ton partenaire mène déjà le pli, tu n'as pas à le couper. Mais c'est une <strong>convention</strong>, pas une loi universelle.",
      sections: [
        {
          h2: "Le principe",
          html: "<p>Quand le pli revient déjà à ton équipe parce que ton <strong>partenaire est maître</strong> (il a posé la plus forte carte du moment), couper pour gagner un pli déjà gagné n'a aucun intérêt. La convention la plus répandue te dispense donc de couper : tu peux <strong>te défausser</strong> d'une carte inutile.</p>",
        },
        {
          h2: "Pourquoi c'est utile",
          html: "<p>Ne pas gaspiller un atout sur un pli déjà gagné, c'est garder ses atouts pour les plis importants. Tu peux en profiter pour <strong>te défausser</strong> d'une couleur faible, ou au contraire poser une grosse carte (10, As) sur le pli de ton partenaire pour <strong>charger</strong> et marquer plus de points.</p>",
        },
        {
          h2: "Attention : c'est conventionnel",
          html: "<p>Toutes les tables ne jouent pas cette dispense. Dans la version stricte de « l'obligation de couper », tu dois couper dès que tu n'as pas la couleur, même sur le pli de ton partenaire. Avant une partie sérieuse ou un tournoi, vérifie la règle appliquée pour éviter une accusation de renonce.</p>",
        },
      ],
      faq: [
        { q: "Faut-il couper si le partenaire est déjà maître ?", a: "Le plus souvent non : la convention courante te dispense de couper le pli de ton partenaire, tu peux te défausser. Mais certaines tables imposent quand même de couper." },
        { q: "Que jouer si on ne coupe pas le pli du partenaire ?", a: "Tu peux te défausser d'une carte faible, ou charger le pli en posant une grosse carte (10 ou As) pour ajouter des points au total de ton équipe." },
      ],
      related: ["reg-obligation-couper", "reg-monter-atout", "lex-dix-de-der"],
    },
    en: {
      slug: "ruff-when-partner-is-master-coinche",
      linkLabel: "Partner is master",
      title: "Must you ruff when your partner already wins the trick?",
      h1: "Ruffing when your partner is master",
      description:
        "If your partner already wins the trick, you usually don't have to ruff: you may discard. A common convention in coinche, explained.",
      lead: "Usually <strong>no</strong>: if your partner already wins the trick, you don't have to ruff it. But this is a <strong>convention</strong>, not a universal law.",
      sections: [
        {
          h2: "The principle",
          html: "<p>When the trick already belongs to your team because your <strong>partner is master</strong> (they played the current highest card), ruffing to win an already-won trick is pointless. The most common convention therefore lets you skip the ruff and <strong>discard</strong> a useless card instead.</p>",
        },
        {
          h2: "Why it helps",
          html: "<p>Not wasting a trump on an already-won trick means keeping your trumps for the tricks that matter. You can use the chance to <strong>discard</strong> a weak suit, or instead drop a big card (10, Ace) on your partner's trick to <strong>load</strong> it and score more points.</p>",
        },
        {
          h2: "Careful: it's conventional",
          html: "<p>Not every table allows this exemption. In the strict \"must ruff\" version, you must ruff whenever you can't follow suit, even on your partner's trick. Before a serious game or tournament, confirm the rule in force to avoid a renonce claim.</p>",
        },
      ],
      faq: [
        { q: "Must you ruff when your partner already wins?", a: "Usually no: the common convention lets you skip ruffing your partner's trick and discard instead. But some tables still require you to ruff." },
        { q: "What do you play if you don't ruff your partner's trick?", a: "You can discard a weak card, or load the trick by dropping a big card (10 or Ace) to add points to your team's total." },
      ],
      related: ["reg-obligation-couper", "reg-monter-atout", "lex-dix-de-der"],
    },
  },

  {
    id: "reg-chute-contrat",
    priority: 0.6,
    fr: {
      slug: "points-perdus-contrat-chute-coinche",
      linkLabel: "Contrat chuté",
      title: "Combien de points perd-on quand un contrat chute à la coinche ?",
      h1: "Que perd-on quand le contrat chute ?",
      description:
        "Contrat chuté à la coinche : l'équipe attaquante marque 0 et l'adverse encaisse 162 plus le contrat annoncé. Calcul, coinche et capot inclus.",
      lead: "Quand un contrat chute, l'équipe qui a pris marque <strong>0</strong>, et l'adversaire encaisse <strong>162 + la valeur du contrat annoncé</strong>.",
      sections: [
        {
          h2: "Ce qu'est une chute",
          html: "<p>Un contrat <strong>chute</strong> quand l'équipe qui a pris n'atteint pas le nombre de points annoncé (par exemple, elle annonce 110 mais ne réalise que 95). Le contrat est alors perdu, peu importe le nombre de plis remportés.</p>",
        },
        {
          h2: "Le barème de la chute",
          html: "<p>Le calcul le plus répandu : l'équipe attaquante marque <strong>0</strong>, et la défense marque <strong>162 + le montant du contrat</strong>. Exemple : contrat à 100 chuté, la défense marque 162 + 100 = <strong>262 points</strong>. Une belote (20) restant acquise au camp qui la détient s'ajoute selon les conventions.</p>",
        },
        {
          h2: "Avec coinche ou surcoinche",
          html: "<p>Si le contrat chuté était <strong>coinché</strong>, les points (162 + contrat) sont <strong>doublés</strong> pour la défense. <strong>Surcoinché</strong>, ils sont multipliés par 4. C'est ce qui rend une coinche réussie si rentable, et une prise trop ambitieuse si dangereuse.</p>",
        },
        {
          h2: "Cas du capot annoncé",
          html: "<p>Un <strong>capot annoncé</strong> qui chute (l'adversaire prend au moins un pli) fait basculer les <strong>250 points</strong> du capot vers la défense, plus d'éventuels multiplicateurs si la donne était coinchée.</p>",
        },
      ],
      faq: [
        { q: "Combien marque-t-on quand un contrat chute ?", a: "L'équipe qui a pris marque 0. La défense marque 162 plus la valeur du contrat annoncé. Par exemple, un contrat à 100 chuté rapporte 262 points à la défense." },
        { q: "Que se passe-t-il si un contrat coinché chute ?", a: "Les points de la défense (162 plus le contrat) sont doublés. En cas de surcoinche, ils sont multipliés par quatre." },
      ],
      related: ["reg-surcoinche", "reg-contrat-exact", "lex-capot"],
    },
    en: {
      slug: "failed-contract-points-coinche",
      linkLabel: "Failed contract",
      title: "How many points do you lose when a contract fails in coinche?",
      h1: "What you lose when the contract fails",
      description:
        "Failed contract in coinche: the bidding team scores 0 and the defence takes 162 plus the bid value. Calculation, with coinche and capot included.",
      lead: "When a contract fails, the team that took it scores <strong>0</strong>, and the opponents collect <strong>162 + the bid value</strong>.",
      sections: [
        {
          h2: "What \"going down\" means",
          html: "<p>A contract <strong>fails</strong> when the team that took it doesn't reach its bid (for example, it bid 110 but only made 95). The contract is then lost, no matter how many tricks were won.</p>",
        },
        {
          h2: "The failure scale",
          html: "<p>The most common calculation: the bidding team scores <strong>0</strong>, and the defence scores <strong>162 + the bid amount</strong>. Example: a failed 100 contract gives the defence 162 + 100 = <strong>262 points</strong>. A belote (20) stays with the side holding it and is added depending on conventions.</p>",
        },
        {
          h2: "With coinche or surcoinche",
          html: "<p>If the failed contract was <strong>coinched</strong>, the points (162 + bid) are <strong>doubled</strong> for the defence. <strong>Surcoinched</strong>, they're multiplied by 4. That's what makes a successful coinche so rewarding, and an overambitious bid so dangerous.</p>",
        },
        {
          h2: "The bid capot case",
          html: "<p>A <strong>bid capot</strong> that fails (the opponents take at least one trick) sends the <strong>250 points</strong> to the defence, plus any multipliers if the deal was coinched.</p>",
        },
      ],
      faq: [
        { q: "How many points do you score when a contract fails?", a: "The team that took it scores 0. The defence scores 162 plus the bid value. For example, a failed 100 contract gives the defence 262 points." },
        { q: "What happens if a coinched contract fails?", a: "The defence's points (162 plus the bid) are doubled. With a surcoinche, they are multiplied by four." },
      ],
      related: ["reg-surcoinche", "reg-contrat-exact", "lex-capot"],
    },
  },

  {
    id: "reg-belote-oubliee",
    priority: 0.5,
    fr: {
      slug: "belote-annoncee-oubliee-coinche",
      linkLabel: "Belote oubliée",
      title: "Belote annoncée mais oubliée : que se passe-t-il à la coinche ?",
      h1: "Belote oubliée : on la perd",
      description:
        "Belote à la coinche : il faut l'annoncer en jouant Roi puis Dame d'atout. Oubliée, elle est perdue (pas de 20 points). Règle et bons réflexes.",
      lead: "La belote doit être <strong>annoncée à voix haute</strong> au moment où on la joue. Oubliée, elle est <strong>perdue</strong> : pas de 20 points.",
      sections: [
        {
          h2: "Rappel : qu'est-ce que la belote",
          html: "<p>La <strong>belote</strong>, c'est avoir le <strong>Roi et la Dame d'atout</strong> dans la même main. Elle rapporte <strong>20 points</strong>, à condition d'être annoncée. On dit « belote » en posant la première des deux cartes, et « rebelote » en posant la seconde.</p>",
        },
        {
          h2: "Oubli = points perdus",
          html: "<p>Si tu joues ton Roi et ta Dame d'atout sans dire « belote » et « rebelote » au bon moment, tu <strong>perds les 20 points</strong>. La belote n'est pas comptée automatiquement : c'est l'annonce qui la valide. Aucune réclamation après coup n'est en général acceptée.</p>",
        },
        {
          h2: "Le bon réflexe et le timing",
          html: "<p>Annonce « belote » exactement au moment où tu poses la <strong>première</strong> des deux cartes (Roi ou Dame, dans l'ordre où tu les joues), puis « rebelote » sur la seconde. Tu n'es pas obligé de jouer les deux dans le même pli, mais les deux annonces doivent être faites pour valider les 20 points. C'est une erreur fréquente qui peut coûter une donne serrée.</p>",
        },
      ],
      faq: [
        { q: "Que se passe-t-il si on oublie d'annoncer la belote ?", a: "Les 20 points de la belote sont perdus. La belote n'est validée que si elle est annoncée à voix haute au moment où on joue le Roi puis la Dame d'atout." },
        { q: "Quand doit-on dire belote et rebelote ?", a: "On dit belote en posant la première des deux cartes (Roi ou Dame d'atout) et rebelote en posant la seconde. Les deux annonces sont nécessaires pour marquer les 20 points." },
      ],
      related: ["reg-contrat-exact", "reg-chute-contrat", "lex-dix-de-der"],
    },
    en: {
      slug: "forgotten-belote-coinche",
      linkLabel: "Forgotten belote",
      title: "Belote declared but forgotten: what happens in coinche?",
      h1: "Forgotten belote: you lose it",
      description:
        "Belote in coinche must be announced as you play the King then Queen of trump. Forget it and you lose the 20 points. Rule and good habits.",
      lead: "The belote must be <strong>called out loud</strong> as you play it. Forget it and it's <strong>lost</strong>: no 20 points.",
      sections: [
        {
          h2: "Reminder: what the belote is",
          html: "<p>The <strong>belote</strong> is holding the <strong>King and Queen of trump</strong> in the same hand. It scores <strong>20 points</strong>, provided you announce it. You say \"belote\" as you play the first of the two cards and \"rebelote\" as you play the second.</p>",
        },
        {
          h2: "Forgetting = lost points",
          html: "<p>If you play your King and Queen of trump without saying \"belote\" and \"rebelote\" at the right moment, you <strong>lose the 20 points</strong>. The belote isn't counted automatically: the announcement is what validates it. Claiming it afterwards is generally not accepted.</p>",
        },
        {
          h2: "The right habit and timing",
          html: "<p>Say \"belote\" exactly as you lay down the <strong>first</strong> of the two cards (King or Queen, in whatever order you play them), then \"rebelote\" on the second. You needn't play both in the same trick, but both calls must be made to validate the 20 points. It's a common slip that can cost a tight deal.</p>",
        },
      ],
      faq: [
        { q: "What happens if you forget to announce the belote?", a: "The 20 belote points are lost. The belote is only valid if announced out loud as you play the King then the Queen of trump." },
        { q: "When do you say belote and rebelote?", a: "You say belote as you play the first of the two cards (King or Queen of trump) and rebelote as you play the second. Both calls are needed to score the 20 points." },
      ],
      related: ["reg-contrat-exact", "reg-chute-contrat", "lex-dix-de-der"],
    },
  },

  {
    id: "reg-surcoinche",
    priority: 0.55,
    fr: {
      slug: "surcoinche-definition-coinche",
      linkLabel: "Surcoinche",
      title: "Qu'est-ce que la surcoinche et comment ça marche ?",
      h1: "La surcoinche à la coinche",
      description:
        "La surcoinche à la coinche : la réponse de l'équipe qui a pris à une coinche adverse. Elle multiplie les points par 4. Règle, qui peut surcoincher, enjeux.",
      lead: "La <strong>surcoinche</strong> est la riposte de l'équipe qui a pris quand elle est coinchée : elle <strong>multiplie les points par 4</strong>.",
      sections: [
        {
          h2: "Coinche, puis surcoinche",
          html: "<p>Quand la défense <strong>coinche</strong> (elle parie que tu vas chuter), les points en jeu sont déjà doublés. Si tu es sûr de toi, tu peux répliquer par une <strong>surcoinche</strong> : tu confirmes que tu tiendras ton contrat, et les points sont alors <strong>multipliés par 4</strong> au lieu de 2.</p>",
        },
        {
          h2: "Qui peut surcoincher",
          html: "<p>Seule l'<strong>équipe qui a pris le contrat</strong> peut surcoincher, et uniquement <strong>après avoir été coinchée</strong>. C'est une enchère de confiance : on surcoinche quand on est quasi certain de réaliser le contrat. Il n'y a pas d'enchère au-delà : après la surcoinche, on joue.</p>",
        },
        {
          h2: "Les enjeux",
          html: "<p>La surcoinche change la dimension de la donne. Contrat tenu : la prime est quadruplée, énorme. Contrat chuté : c'est la défense qui empoche le quadruple. À fort niveau, surcoincher est rare et envoie un signal clair, donc à manier avec un vrai sang-froid. Une surcoinche hasardeuse peut renverser une partie en une seule donne, dans un sens comme dans l'autre : ne la sors que si ta main et l'enchère de ton partenaire te rendent quasi certain du résultat.</p>",
        },
      ],
      faq: [
        { q: "Qu'est-ce que la surcoinche ?", a: "C'est la réponse de l'équipe qui a pris à une coinche adverse. Elle confirme qu'elle tiendra son contrat et multiplie les points en jeu par quatre au lieu de deux." },
        { q: "Qui peut surcoincher et quand ?", a: "Seule l'équipe qui a pris le contrat peut surcoincher, et seulement après avoir été coinchée par la défense, avant que la première carte soit jouée." },
      ],
      related: ["reg-coincher-partenaire", "reg-chute-contrat", "reg-litige-80-partout"],
    },
    en: {
      slug: "surcoinche-meaning-coinche",
      linkLabel: "Surcoinche",
      title: "What is a surcoinche and how does it work?",
      h1: "The surcoinche in coinche",
      description:
        "The surcoinche in coinche: the bidding team's reply to an opponent's coinche. It multiplies the points by 4. Rule, who can call it, and the stakes.",
      lead: "The <strong>surcoinche</strong> is the bidding team's comeback when it gets coinched: it <strong>multiplies the points by 4</strong>.",
      sections: [
        {
          h2: "Coinche, then surcoinche",
          html: "<p>When the defence <strong>coinches</strong> (betting you'll fail), the points at stake are already doubled. If you're confident, you can fire back with a <strong>surcoinche</strong>: you confirm you'll make your contract, and the points are then <strong>multiplied by 4</strong> instead of 2.</p>",
        },
        {
          h2: "Who can surcoinche",
          html: "<p>Only the <strong>team that took the contract</strong> can surcoinche, and only <strong>after being coinched</strong>. It's a bid of confidence: you surcoinche when you're nearly sure to make the contract. There's nothing beyond it: after the surcoinche, play begins.</p>",
        },
        {
          h2: "The stakes",
          html: "<p>The surcoinche changes the whole scale of the deal. Contract made: the bonus is quadrupled, huge. Contract failed: the defence pockets the quadruple instead. At a high level, surcoinching is rare and sends a clear signal, so handle it with real composure. A reckless surcoinche can flip a match in a single deal, either way: only call it when your hand and your partner's bid make the outcome nearly certain.</p>",
        },
      ],
      faq: [
        { q: "What is a surcoinche?", a: "It's the bidding team's reply to an opponent's coinche. It confirms they will make their contract and multiplies the points at stake by four instead of two." },
        { q: "Who can surcoinche and when?", a: "Only the team that took the contract can surcoinche, and only after being coinched by the defence, before the first card is played." },
      ],
      related: ["reg-coincher-partenaire", "reg-chute-contrat", "reg-litige-80-partout"],
    },
  },

  {
    id: "reg-litige-80-partout",
    priority: 0.45,
    fr: {
      slug: "litige-coinche-80-partout",
      linkLabel: "Litige 80 partout",
      title: "Litige à la coinche : que faire à 81-81 (80 partout) ?",
      h1: "Le litige à 80 partout",
      description:
        "Litige à la coinche quand chaque équipe fait 81 points (80 partout). Qui gagne, le rôle de l'équipe qui a pris, et comment trancher.",
      lead: "Quand chaque équipe réalise <strong>81 points</strong> (le fameux « 80 partout »), il faut savoir départager : c'est l'équipe qui a <strong>pris le contrat</strong> qui doit faire la différence.",
      sections: [
        {
          h2: "Comment naît le litige",
          html: "<p>Les 162 points d'une donne se répartissent entre les deux équipes. Si le partage tombe pile à <strong>81 contre 81</strong>, aucune équipe n'a la majorité nette. Ce cas, surnommé « 80 partout », demande une règle de départage claire, sinon c'est la dispute assurée.</p>",
        },
        {
          h2: "La règle courante : l'équipe qui a pris doit dépasser",
          html: "<p>La logique la plus répandue : pour <strong>réaliser son contrat</strong>, l'équipe qui a pris doit faire <strong>strictement plus</strong> que ce qu'il faut, pas seulement égaler. À 81-81, elle n'a donc pas la majorité requise : son contrat <strong>chute</strong>, sauf si le contrat annoncé est inférieur ou égal à ses points réels selon le barème de la table.</p>",
        },
        {
          h2: "Le rôle du « litige » et des conventions",
          html: "<p>Certaines tables prévoient une règle dite du <strong>litige</strong> : les points de la donne (souvent les 160 « de base ») sont mis de côté et attribués à l'équipe qui <strong>gagne la donne suivante</strong>. D'autres tranchent immédiatement en faveur de la défense. Comme les conventions varient, fixe la règle avant de jouer pour éviter les conflits.</p>",
        },
      ],
      faq: [
        { q: "Qui gagne à 80 partout (81-81) à la coinche ?", a: "Le plus souvent, l'équipe qui a pris doit faire strictement plus que la défense pour réussir. À 81-81 elle n'a pas la majorité, donc son contrat chute, sauf convention contraire." },
        { q: "Qu'est-ce que la règle du litige ?", a: "C'est une convention où les points d'une donne indécise (81-81) sont mis en réserve et reviennent à l'équipe qui gagne la donne suivante. Toutes les tables ne l'appliquent pas." },
      ],
      related: ["reg-contrat-exact", "reg-chute-contrat", "reg-surcoinche"],
    },
    en: {
      slug: "coinche-tie-80-all",
      linkLabel: "80-all tie",
      title: "Coinche tie: what to do at 81-81 (80 all)?",
      h1: "The 80-all tie in coinche",
      description:
        "Coinche tie when each team scores 81 points (80 all). Who wins, the role of the bidding team, and how to settle it.",
      lead: "When each team scores <strong>81 points</strong> (the famous \"80 all\"), you need a tiebreaker: it's the <strong>bidding team</strong> that has to make the difference.",
      sections: [
        {
          h2: "How the tie arises",
          html: "<p>The 162 points of a deal split between the two teams. If the split lands exactly at <strong>81 versus 81</strong>, neither team has a clear majority. This case, nicknamed \"80 all,\" needs a clear tiebreak rule, otherwise an argument is guaranteed.</p>",
        },
        {
          h2: "The common rule: the bidder must exceed",
          html: "<p>The most widespread logic: to <strong>make its contract</strong>, the bidding team must score <strong>strictly more</strong> than required, not just tie. So at 81-81 it doesn't have the needed majority: its contract <strong>fails</strong>, unless the bid is at or below its real points under the table's scale.</p>",
        },
        {
          h2: "The \"litige\" rule and conventions",
          html: "<p>Some tables use a rule called <strong>litige</strong>: the deal's points (often the base 160) are set aside and go to the team that <strong>wins the next deal</strong>. Others settle immediately in the defence's favour. Since conventions vary, set the rule before playing to avoid conflict.</p>",
        },
      ],
      faq: [
        { q: "Who wins at 80 all (81-81) in coinche?", a: "Most often the bidding team must score strictly more than the defence to succeed. At 81-81 it lacks the majority, so its contract fails, unless agreed otherwise." },
        { q: "What is the litige rule?", a: "It's a convention where the points of an undecided deal (81-81) are held in reserve and go to the team that wins the next deal. Not every table uses it." },
      ],
      related: ["reg-contrat-exact", "reg-chute-contrat", "reg-surcoinche"],
    },
  },

  {
    id: "reg-changer-annonce",
    priority: 0.45,
    fr: {
      slug: "changer-son-annonce-coinche",
      linkLabel: "Changer son annonce",
      title: "Peut-on changer son annonce une fois faite à la coinche ?",
      h1: "Peut-on revenir sur son annonce ?",
      description:
        "À la coinche, une annonce posée et entendue est définitive : on ne la modifie pas. Règle, cas du lapsus, et comment surenchérir proprement.",
      lead: "Non : une fois ton annonce <strong>prononcée et entendue</strong>, elle est <strong>ferme et définitive</strong>. Tu ne peux pas la corriger.",
      sections: [
        {
          h2: "Une annonce engage",
          html: "<p>Aux enchères, dès que tu annonces une valeur et une couleur (par exemple « 90 cœur »), ton engagement est pris. La règle classique veut qu'une <strong>annonce claire et entendue de tous</strong> ne puisse plus être modifiée : pas de « finalement je dis 100 ».</p>",
        },
        {
          h2: "Le cas du lapsus",
          html: "<p>Si tu te trompes en parlant (un vrai lapsus immédiatement corrigé, avant que les autres aient réagi), certaines tables tolèrent la rectification. Mais c'est une <strong>tolérance</strong>, pas un droit : en tournoi, l'annonce prononcée fait foi. Le mieux est de réfléchir avant de parler.</p>",
        },
        {
          h2: "Surenchérir, ce n'est pas changer",
          html: "<p>Tu peux toujours <strong>monter</strong> ton enchère à ton tour suivant si l'enchère revient à toi (par exemple passer de 90 à 110), c'est le déroulement normal. Ce qui est interdit, c'est de <strong>revenir en arrière</strong> ou de baisser une annonce déjà faite. Annoncer, c'est s'engager. De même, une fois que tu as <strong>passé</strong>, tu ne peux plus reprendre la parole pour prendre : passer est un choix définitif au tour en cours.</p>",
        },
      ],
      faq: [
        { q: "Peut-on changer son annonce à la coinche ?", a: "Non. Une annonce clairement prononcée et entendue est ferme et définitive. On ne peut ni la baisser ni la corriger après coup." },
        { q: "Et si on se trompe en annonçant ?", a: "Certaines tables tolèrent la correction immédiate d'un vrai lapsus, mais c'est une tolérance et non un droit. En tournoi, l'annonce prononcée fait foi." },
      ],
      related: ["reg-tous-passent", "reg-surcoinche", "reg-contrat-exact"],
    },
    en: {
      slug: "change-your-bid-coinche",
      linkLabel: "Change your bid",
      title: "Can you change your bid once made in coinche?",
      h1: "Can you take back your bid?",
      description:
        "In coinche, a bid that's been spoken and heard is final: you can't change it. The rule, the slip-of-the-tongue case, and how to raise cleanly.",
      lead: "No: once your bid is <strong>spoken and heard</strong>, it is <strong>firm and final</strong>. You can't correct it.",
      sections: [
        {
          h2: "A bid commits you",
          html: "<p>During the auction, the moment you call a value and a suit (say \"90 hearts\"), you're committed. The classic rule is that a <strong>clear bid heard by everyone</strong> can no longer be changed: no \"actually, make it 100.\"</p>",
        },
        {
          h2: "The slip-of-the-tongue case",
          html: "<p>If you misspeak (a genuine slip corrected at once, before others have reacted), some tables tolerate the fix. But it's a <strong>courtesy</strong>, not a right: in a tournament, the bid as spoken stands. Best to think before you speak.</p>",
        },
        {
          h2: "Raising isn't changing",
          html: "<p>You can always <strong>raise</strong> your bid on your next turn if the auction comes back to you (for example going from 90 to 110), that's normal play. What's forbidden is <strong>taking back</strong> or lowering a bid already made. To bid is to commit. Likewise, once you've <strong>passed</strong>, you can't speak up again to take the bid: passing is final for the current round.</p>",
        },
      ],
      faq: [
        { q: "Can you change your bid in coinche?", a: "No. A bid clearly spoken and heard is firm and final. You can neither lower it nor correct it afterwards." },
        { q: "What if you misspeak when bidding?", a: "Some tables tolerate an immediate correction of a genuine slip, but it's a courtesy, not a right. In a tournament, the spoken bid stands." },
      ],
      related: ["reg-tous-passent", "reg-surcoinche", "reg-contrat-exact"],
    },
  },

  {
    id: "reg-comment-distribuer",
    priority: 0.55,
    fr: {
      slug: "comment-distribuer-cartes-coinche",
      linkLabel: "Distribuer les cartes",
      title: "Comment distribuer les cartes à la coinche (3-3-2, 3-2-3) ?",
      h1: "Distribuer les cartes à la coinche",
      description:
        "Distribution à la coinche : 32 cartes, 8 par joueur, en deux ou trois paquets (3-3-2, 3-2-3, 2-3-3). Sens, coupe et bonnes pratiques.",
      lead: "À la coinche, on distribue les <strong>32 cartes</strong> par paquets, le plus souvent en <strong>deux ou trois fois</strong> (3-3-2, 3-2-3, etc.), pour 8 cartes par joueur.",
      sections: [
        {
          h2: "Le principe",
          html: "<p>Chaque joueur reçoit <strong>8 cartes</strong> (4 joueurs, 32 cartes). On ne distribue pas une par une : la tradition veut qu'on donne par <strong>petits paquets</strong>, dans le sens des aiguilles d'une montre, en commençant par le joueur à droite du donneur (ou à gauche selon les régions, à fixer).</p>",
        },
        {
          h2: "Les répartitions courantes",
          html: "<table><tr><th>Schéma</th><th>Tours de distribution</th></tr><tr><td>3-3-2</td><td>3 cartes, puis 3, puis 2</td></tr><tr><td>3-2-3</td><td>3 cartes, puis 2, puis 3</td></tr><tr><td>2-3-3</td><td>2 cartes, puis 3, puis 3</td></tr></table><p>Toutes donnent bien 8 cartes par joueur. Le schéma exact est une <strong>convention de table</strong>, l'essentiel est de garder le même pendant toute la partie.</p>",
        },
        {
          h2: "Couper et mélanger",
          html: "<p>Avant de distribuer, on <strong>mélange</strong> puis on fait <strong>couper</strong> le paquet par l'adversaire (souvent celui à droite du donneur). Couper limite la triche et assure le hasard. Une distribution mal faite (mauvais nombre de cartes, carte retournée par erreur) entraîne en général une <strong>redonne</strong> par le même donneur. Beaucoup de tables ne remélangent d'ailleurs pas entre deux donnes : on coupe simplement le paquet ramassé, ce qui fait partie du charme tactique du jeu.</p>",
        },
      ],
      faq: [
        { q: "Comment distribue-t-on les cartes à la coinche ?", a: "On distribue les 32 cartes par petits paquets, le plus souvent en deux ou trois tours (3-3-2, 3-2-3, etc.), pour donner 8 cartes à chaque joueur." },
        { q: "Faut-il distribuer une par une ?", a: "Non, la tradition de la coinche veut une distribution par paquets de 2 ou 3 cartes, dans un sens constant. Distribuer une par une n'est pas l'usage." },
      ],
      related: ["reg-qui-distribue", "reg-tous-passent", "reg-renonce"],
    },
    en: {
      slug: "how-to-deal-cards-coinche",
      linkLabel: "Dealing the cards",
      title: "How to deal the cards in coinche (3-3-2, 3-2-3)?",
      h1: "Dealing the cards in coinche",
      description:
        "Dealing in coinche: 32 cards, 8 per player, in two or three packets (3-3-2, 3-2-3, 2-3-3). Direction, the cut, and good practice.",
      lead: "In coinche you deal the <strong>32 cards</strong> in packets, usually in <strong>two or three rounds</strong> (3-3-2, 3-2-3, etc.), for 8 cards per player.",
      sections: [
        {
          h2: "The principle",
          html: "<p>Each player gets <strong>8 cards</strong> (4 players, 32 cards). You don't deal one at a time: tradition is to deal in <strong>small packets</strong>, clockwise, starting with the player to the dealer's right (or left depending on the region, to be agreed).</p>",
        },
        {
          h2: "The common patterns",
          html: "<table><tr><th>Pattern</th><th>Dealing rounds</th></tr><tr><td>3-3-2</td><td>3 cards, then 3, then 2</td></tr><tr><td>3-2-3</td><td>3 cards, then 2, then 3</td></tr><tr><td>2-3-3</td><td>2 cards, then 3, then 3</td></tr></table><p>All of them deal 8 cards per player. The exact pattern is a <strong>table convention</strong>; what matters is keeping the same one all game.</p>",
        },
        {
          h2: "Cutting and shuffling",
          html: "<p>Before dealing, you <strong>shuffle</strong> and then have the deck <strong>cut</strong> by an opponent (often the one to the dealer's right). Cutting limits cheating and ensures randomness. A misdeal (wrong number of cards, a card flipped by mistake) usually means a <strong>redeal</strong> by the same dealer. Many tables don't even reshuffle between deals: you simply cut the gathered pile, which is part of the game's tactical charm.</p>",
        },
      ],
      faq: [
        { q: "How do you deal the cards in coinche?", a: "You deal the 32 cards in small packets, usually over two or three rounds (3-3-2, 3-2-3, etc.), giving 8 cards to each player." },
        { q: "Should you deal one card at a time?", a: "No, coinche tradition is to deal in packets of 2 or 3 cards in a constant direction. Dealing one at a time is not the custom." },
      ],
      related: ["reg-qui-distribue", "reg-tous-passent", "reg-renonce"],
    },
  },

  {
    id: "reg-qui-distribue",
    priority: 0.5,
    fr: {
      slug: "qui-distribue-qui-commence-coinche",
      linkLabel: "Qui distribue, qui commence",
      title: "Qui distribue, qui commence et dans quel sens joue-t-on ?",
      h1: "Donneur, premier joueur et sens du jeu",
      description:
        "À la coinche : qui distribue, qui parle et entame en premier, et dans quel sens tourne le jeu. Rotation du donneur expliquée simplement.",
      lead: "À la coinche, le jeu tourne <strong>dans le sens des aiguilles d'une montre</strong>, et le rôle de donneur <strong>change à chaque donne</strong>.",
      sections: [
        {
          h2: "Qui distribue",
          html: "<p>Le <strong>donneur</strong> change à chaque donne : après une donne, c'est le joueur <strong>suivant</strong> (à gauche du donneur précédent, dans le sens du jeu) qui distribue. Sur une partie, chacun donne donc à tour de rôle. Le tout premier donneur est souvent tiré au sort.</p>",
        },
        {
          h2: "Qui parle et commence",
          html: "<p>Aux <strong>enchères</strong>, c'est en général le joueur à droite du donneur (ou à sa gauche selon les régions) qui parle en premier, puis on tourne. Pour le <strong>jeu</strong>, c'est traditionnellement le joueur <strong>placé après le donneur</strong> qui entame le premier pli. Le gagnant de chaque pli entame le pli suivant.</p>",
        },
        {
          h2: "Le sens du jeu",
          html: "<p>Le jeu se déroule <strong>dans le sens horaire</strong> dans la plupart des conventions françaises. Les <strong>partenaires sont assis face à face</strong> : tu joues toujours avec le joueur en face de toi, contre les deux joueurs sur tes côtés. Garde un sens constant toute la partie pour éviter les erreurs.</p>",
        },
      ],
      faq: [
        { q: "Qui distribue à la coinche ?", a: "Le rôle de donneur tourne à chaque donne : c'est le joueur suivant, dans le sens du jeu, qui distribue à la donne d'après. Chacun donne à tour de rôle." },
        { q: "Dans quel sens joue-t-on à la coinche ?", a: "Le plus souvent dans le sens des aiguilles d'une montre. Les partenaires sont assis face à face et jouent contre les deux adversaires placés sur les côtés." },
      ],
      related: ["reg-comment-distribuer", "reg-tous-passent", "reg-renonce"],
    },
    en: {
      slug: "who-deals-who-starts-coinche",
      linkLabel: "Who deals, who starts",
      title: "Who deals, who starts, and which way does play go?",
      h1: "Dealer, first player and direction of play",
      description:
        "In coinche: who deals, who bids and leads first, and which way play turns. The dealer rotation explained simply.",
      lead: "In coinche, play goes <strong>clockwise</strong>, and the dealer role <strong>changes every deal</strong>.",
      sections: [
        {
          h2: "Who deals",
          html: "<p>The <strong>dealer</strong> changes each deal: after one deal, the <strong>next</strong> player (to the previous dealer's left, in the direction of play) deals. Over a game, everyone deals in turn. The very first dealer is usually drawn at random.</p>",
        },
        {
          h2: "Who bids and leads",
          html: "<p>In the <strong>auction</strong>, the player to the dealer's right (or left depending on the region) usually speaks first, then it goes around. For <strong>play</strong>, the player <strong>seated after the dealer</strong> traditionally leads the first trick. The winner of each trick leads the next one.</p>",
        },
        {
          h2: "The direction of play",
          html: "<p>Play runs <strong>clockwise</strong> in most French conventions. <strong>Partners sit opposite each other</strong>: you always play with the person across from you, against the two players on your sides. Keep a constant direction all game to avoid mistakes.</p>",
        },
      ],
      faq: [
        { q: "Who deals in coinche?", a: "The dealer role rotates each deal: the next player, in the direction of play, deals the following hand. Everyone deals in turn." },
        { q: "Which way does play go in coinche?", a: "Usually clockwise. Partners sit opposite each other and play against the two opponents seated on the sides." },
      ],
      related: ["reg-comment-distribuer", "reg-tous-passent", "reg-renonce"],
    },
  },

  {
    id: "reg-renonce",
    priority: 0.55,
    fr: {
      slug: "renonce-faute-de-jeu-coinche",
      linkLabel: "La renonce",
      title: "La renonce à la coinche : définition et pénalité",
      h1: "La renonce (faute de jeu)",
      description:
        "La renonce à la coinche : ne pas fournir ou ne pas couper quand on le devait. Définition, exemples et pénalité (souvent la perte de la donne).",
      lead: "La <strong>renonce</strong> est une <strong>faute de jeu</strong> : tu ne respectes pas une obligation (fournir, couper, monter) alors que tu le pouvais.",
      sections: [
        {
          h2: "Définition",
          html: "<p>Faire une <strong>renonce</strong>, c'est jouer une carte interdite par les règles : ne pas <strong>fournir</strong> la couleur demandée alors qu'on l'a, ne pas <strong>couper</strong> quand on y est obligé, ou ne pas <strong>monter</strong> à l'atout là où la convention l'exige. Bref, ne pas respecter ses obligations de jeu.</p>",
        },
        {
          h2: "Exemples typiques",
          html: "<ul><li>Tu as du cœur (la couleur entamée) mais tu joues du pique : <strong>renonce</strong>.</li><li>Tu n'as pas la couleur, tu as des atouts, mais tu te défausses sans couper : <strong>renonce</strong> (sauf exception du partenaire maître).</li><li>Tu peux surcouper un adversaire mais tu poses un petit atout : possible renonce, selon la convention de montée.</li></ul>",
        },
        {
          h2: "La pénalité",
          html: "<p>La sanction la plus courante : l'équipe fautive <strong>perd la donne</strong>, qui est comptée comme chutée (souvent 162 + le contrat pour l'adversaire). Certaines tables annulent simplement le pli mal joué, d'autres appliquent un barème précis en tournoi. Comme les conventions varient, fixe la règle de la renonce avant de jouer.</p>",
        },
      ],
      faq: [
        { q: "Qu'est-ce qu'une renonce à la coinche ?", a: "C'est une faute de jeu : ne pas fournir la couleur demandée, ne pas couper ou ne pas monter alors que les règles l'imposaient et qu'on le pouvait." },
        { q: "Quelle est la pénalité d'une renonce ?", a: "Le plus souvent, l'équipe fautive perd la donne, comptée comme chutée au profit de l'adversaire. Le barème exact dépend des conventions de la table ou du tournoi." },
      ],
      related: ["reg-fournir-couleur", "reg-obligation-couper", "reg-monter-atout"],
    },
    en: {
      slug: "renonce-revoke-coinche",
      linkLabel: "The renonce (revoke)",
      title: "The renonce (revoke) in coinche: definition and penalty",
      h1: "The renonce (playing error)",
      description:
        "The renonce in coinche: failing to follow suit or to ruff when required. Definition, examples and penalty (often losing the deal).",
      lead: "A <strong>renonce</strong> (revoke) is a <strong>playing error</strong>: you break an obligation (follow, ruff, overruff) that you could have met.",
      sections: [
        {
          h2: "Definition",
          html: "<p>Committing a <strong>renonce</strong> means playing a card the rules forbid: not <strong>following</strong> the led suit when you hold it, not <strong>ruffing</strong> when required, or not <strong>overruffing</strong> a trump where the convention demands it. In short, ignoring your playing obligations.</p>",
        },
        {
          h2: "Typical examples",
          html: "<ul><li>You hold hearts (the led suit) but play a spade: <strong>renonce</strong>.</li><li>You're void in the suit and hold trumps, but you discard without ruffing: <strong>renonce</strong> (except the partner-is-master case).</li><li>You can overruff an opponent but play a low trump: possible renonce, depending on the overruff convention.</li></ul>",
        },
        {
          h2: "The penalty",
          html: "<p>The most common sanction: the offending team <strong>loses the deal</strong>, counted as failed (often 162 + the bid for the opponents). Some tables simply void the misplayed trick, others apply a precise tournament scale. Since conventions vary, agree on the renonce rule before playing.</p>",
        },
      ],
      faq: [
        { q: "What is a renonce in coinche?", a: "It's a playing error: failing to follow the led suit, to ruff, or to overruff when the rules required it and you could have done so." },
        { q: "What is the penalty for a renonce?", a: "Most often the offending team loses the deal, counted as failed for the opponents. The exact scale depends on the table or tournament conventions." },
      ],
      related: ["reg-fournir-couleur", "reg-obligation-couper", "reg-monter-atout"],
    },
  },

  {
    id: "reg-contrat-exact",
    priority: 0.5,
    fr: {
      slug: "contrat-exact-realise-coinche",
      linkLabel: "Contrat pile réalisé",
      title: "Que vaut le contrat si une équipe fait exactement l'annonce ?",
      h1: "Faire exactement son contrat",
      description:
        "Contrat réalisé pile à la coinche : si l'équipe atteint exactement son annonce, le contrat est réussi. Calcul des points et seuil de réussite.",
      lead: "Si une équipe atteint <strong>au moins</strong> le nombre de points annoncé, son contrat est <strong>réussi</strong> : faire exactement l'annonce suffit.",
      sections: [
        {
          h2: "Le seuil de réussite",
          html: "<p>Pour gagner son contrat, l'équipe qui a pris doit réaliser un nombre de points <strong>au moins égal</strong> à son annonce. Annoncer 90 et faire 90 (ou plus) : c'est gagné. Faire 89 : c'est chuté. Le contrat se joue donc au point près.</p>",
        },
        {
          h2: "Combien marque-t-on ?",
          html: "<p>Contrat réussi, le barème le plus courant : l'équipe marque <strong>le montant de son contrat + les points réellement réalisés dans les plis</strong>, ou, selon les variantes, le contrat plus la totalité des 162. Exemple fréquent : contrat à 90 réalisé avec 100 de points : on marque 90 (contrat) + 100 (cartes), et l'adversaire marque ses propres points (62). Mets-toi d'accord sur le barème exact avant la partie.</p>",
        },
        {
          h2: "Le cas limite des 82 points",
          html: "<p>Comme une donne vaut 162, une annonce de 80 réussie implique que l'attaque a fait au moins 82 (puisqu'il faut atteindre 80 sur le total partagé, et que le partage 81-81 est un litige). Faire <strong>exactement</strong> l'annonce reste une réussite, à condition de ne pas être en dessous, même d'un seul point.</p>",
        },
      ],
      faq: [
        { q: "Faut-il dépasser son annonce ou l'égaler suffit ?", a: "Égaler suffit : si l'équipe atteint exactement le nombre de points annoncé, le contrat est réussi. Il faut seulement ne pas faire moins." },
        { q: "Combien marque-t-on en faisant exactement son contrat ?", a: "Selon le barème courant, l'équipe marque le montant de son contrat plus les points réalisés dans les plis. L'adversaire marque les points qu'il a, lui, ramassés." },
      ],
      related: ["reg-chute-contrat", "reg-litige-80-partout", "lex-dix-de-der"],
    },
    en: {
      slug: "exact-contract-made-coinche",
      linkLabel: "Contract made exactly",
      title: "What's the score if a team makes exactly its bid?",
      h1: "Making your contract exactly",
      description:
        "Contract made exactly in coinche: if the team reaches its bid on the nose, the contract succeeds. Scoring and the success threshold explained.",
      lead: "If a team reaches <strong>at least</strong> its bid in points, the contract is <strong>made</strong>: hitting the bid exactly is enough.",
      sections: [
        {
          h2: "The success threshold",
          html: "<p>To make its contract, the bidding team must score points <strong>at least equal</strong> to its bid. Bid 90 and make 90 (or more): success. Make 89: failure. The contract is decided to the point.</p>",
        },
        {
          h2: "How much do you score?",
          html: "<p>Contract made, the most common scale: the team scores <strong>the bid amount + the points actually won in tricks</strong>, or, depending on the variant, the bid plus the full 162. A frequent example: a 90 contract made with 100 in points scores 90 (bid) + 100 (cards), while the opponents score their own points (62). Agree on the exact scale before the game.</p>",
        },
        {
          h2: "The 82-point edge case",
          html: "<p>Since a deal is worth 162, a successful 80 bid implies the attack made at least 82 (it must reach 80 of the shared total, and the 81-81 split is a tie). Making the bid <strong>exactly</strong> still counts as a success, as long as you're not below it, not even by a single point.</p>",
        },
      ],
      faq: [
        { q: "Must you beat your bid or is matching it enough?", a: "Matching is enough: if the team reaches exactly its bid in points, the contract is made. You just must not fall below it." },
        { q: "How much do you score when you make your bid exactly?", a: "Under the common scale, the team scores the bid amount plus the points won in tricks. The opponents score the points they themselves collected." },
      ],
      related: ["reg-chute-contrat", "reg-litige-80-partout", "lex-dix-de-der"],
    },
  },
];
