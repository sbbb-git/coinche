// Catégorie : Lexique de la coinche (définitions de termes — mots-clés niches).
// FICHIER EXEMPLE qui fixe le schéma et le niveau de qualité attendu.

export const category = { fr: "Lexique de la coinche", en: "Coinche glossary" };

export default [
  {
    id: "lex-capot",
    priority: 0.6,
    fr: {
      slug: "capot-coinche-definition",
      linkLabel: "Capot : définition",
      title: "Capot à la coinche : définition, points et comment l'annoncer",
      h1: "Le capot à la coinche : définition et points",
      description:
        "Capot à la coinche : réaliser les 8 plis d'une donne. Définition, combien ça rapporte (250 points), comment l'annoncer et quand le tenter.",
      lead: "Au capot, une équipe remporte <strong>la totalité des plis</strong> d'une donne. C'est le contrat le plus prestigieux de la coinche — et le plus risqué.",
      sections: [
        {
          h2: "Qu'est-ce qu'un capot ?",
          html: "<p>Faire capot, c'est remporter <strong>les 8 plis</strong> de la donne, sans en laisser un seul à l'adversaire. On parle aussi de « faire tous les plis ». À ne pas confondre avec la <em>générale</em>, où un seul joueur s'engage à tout faire seul.</p>",
        },
        {
          h2: "Combien rapporte un capot ?",
          html: "<p>Un capot annoncé et réussi vaut <strong>250 points</strong> (au lieu des 162 d'une donne normale). C'est ce qui en fait une annonce décisive : un capot tenu peut renverser une partie.</p><p>Attention : si tu annonces capot et que l'adversaire prend ne serait-ce qu'<strong>un seul pli</strong>, le contrat chute et les 250 points partent à la défense.</p>",
        },
        {
          h2: "Capot annoncé ou capot « réalisé » ?",
          html: "<ul><li><strong>Capot annoncé</strong> : tu l'as déclaré aux enchères. Réussi = 250 ; chuté = 250 pour l'adversaire.</li><li><strong>Capot non annoncé</strong> mais réalisé (tu prends tous les plis sans l'avoir dit) : tu marques les 162 points de la donne, parfois majorés selon les tables — c'est une convention à fixer avant de jouer.</li></ul>",
        },
        {
          h2: "Quand tenter un capot ?",
          html: "<p>Le capot se tente avec une main qui contrôle toutes les couleurs : beaucoup d'atouts maîtres (valet, neuf, as), des as dans les côtés, et idéalement la main (l'entame). Ce n'est pas dogmatique : une main moyenne avec un partenaire qui a annoncé fort peut suffire. Mais en cas de doute, un contrat à 160 sécurisé vaut souvent mieux qu'un capot incertain.</p>",
        },
      ],
      faq: [
        { q: "Le capot vaut combien de points ?", a: "Un capot annoncé et réussi vaut 250 points. S'il chute, ces 250 points vont à l'équipe adverse." },
        { q: "Quelle différence entre capot et générale ?", a: "Au capot, l'équipe (les deux partenaires) fait tous les plis. À la générale, un seul joueur s'engage à réaliser les 8 plis seul, sans l'aide de son partenaire." },
        { q: "Que se passe-t-il si l'adversaire prend un pli pendant un capot annoncé ?", a: "Le capot est chuté : le contrat est perdu et les 250 points sont attribués à la défense." },
      ],
      related: ["lex-generale", "lex-dix-de-der", "lex-atout-sec"],
    },
    en: {
      slug: "capot-coinche-meaning",
      linkLabel: "Capot meaning",
      title: "Capot in coinche: meaning, points and how to call it",
      h1: "Capot in coinche: meaning and points",
      description:
        "Capot in coinche means winning all 8 tricks of a deal. Definition, how much it scores (250 points), how to bid it and when to attempt it.",
      lead: "A <strong>capot</strong> is when one team wins <strong>every trick</strong> of a deal. It is coinche's most prestigious contract — and the riskiest.",
      sections: [
        {
          h2: "What is a capot?",
          html: "<p>Making capot means taking <strong>all 8 tricks</strong> of the deal, leaving none to the opponents. Don't confuse it with the <em>générale</em>, where a single player commits to doing it alone.</p>",
        },
        {
          h2: "How much does a capot score?",
          html: "<p>A bid-and-made capot is worth <strong>250 points</strong> (instead of the usual 162 for a deal). That's what makes it decisive — a successful capot can flip a match.</p><p>Careful: if the opponents take even <strong>a single trick</strong>, the contract fails and the 250 points go to the defence.</p>",
        },
        {
          h2: "Bid capot vs. silent capot",
          html: "<ul><li><strong>Bid capot</strong>: announced during the auction. Made = 250; failed = 250 for the opponents.</li><li><strong>Silent capot</strong> (you take all tricks without calling it): you score the deal's 162 points, sometimes increased depending on house rules — agree on this before playing.</li></ul>",
        },
        {
          h2: "When should you go for capot?",
          html: "<p>Attempt a capot with a hand that controls every suit: many master trumps (jack, nine, ace), side aces, and ideally the lead. It isn't a hard rule — a moderate hand backed by a strong partner can be enough. When in doubt, a safe 160 contract often beats a shaky capot.</p>",
        },
      ],
      faq: [
        { q: "How many points is a capot worth?", a: "A bid-and-made capot scores 250 points. If it fails, those 250 points go to the opposing team." },
        { q: "What's the difference between capot and générale?", a: "In a capot, the team (both partners) takes every trick. In a générale, one player commits to winning all 8 tricks alone, without the partner's help." },
        { q: "What happens if the opponents win a trick during a bid capot?", a: "The capot fails: the contract is lost and the 250 points are awarded to the defence." },
      ],
      related: ["lex-generale", "lex-dix-de-der", "lex-atout-sec"],
    },
  },

  {
    id: "lex-generale",
    priority: 0.55,
    fr: {
      slug: "generale-coinche-definition",
      linkLabel: "Générale : définition",
      title: "La générale à la coinche : définition et règles",
      h1: "La générale à la coinche",
      description:
        "La générale à la coinche : un joueur s'engage à réaliser seul les 8 plis. Définition, points, différence avec le capot et conventions de table.",
      lead: "La <strong>générale</strong> est l'annonce ultime : un joueur promet de faire <strong>les 8 plis tout seul</strong>, sans l'aide de son partenaire.",
      sections: [
        {
          h2: "Définition",
          html: "<p>À la générale, le déclarant joue seul contre les trois autres : son partenaire pose ses cartes mais ne « gagne » aucun pli pour l'équipe. C'est une variante de capot encore plus exigeante, que toutes les tables ne pratiquent pas.</p>",
        },
        {
          h2: "Combien ça vaut ?",
          html: "<p>La générale rapporte généralement <strong>500 points</strong> (le double du capot), mais le barème dépend des conventions locales. Comme c'est une annonce rare et risquée, mettez-vous d'accord avant la partie.</p>",
        },
        {
          h2: "Générale ou capot ?",
          html: "<table><tr><th></th><th>Capot</th><th>Générale</th></tr><tr><td>Qui joue</td><td>l'équipe (2 joueurs)</td><td><strong>un seul joueur</strong></td></tr><tr><td>Objectif</td><td>les 8 plis</td><td>les 8 plis</td></tr><tr><td>Points typiques</td><td>250</td><td>500</td></tr></table>",
        },
      ],
      faq: [
        { q: "La générale, c'est tout seul ?", a: "Oui : à la générale, un seul joueur s'engage à réaliser les 8 plis, sans compter sur les cartes de son partenaire." },
        { q: "Combien vaut une générale ?", a: "Le plus souvent 500 points, soit le double d'un capot, mais le barème exact dépend des conventions de la table." },
      ],
      related: ["lex-capot", "lex-dix-de-der"],
    },
    en: {
      slug: "generale-coinche-meaning",
      linkLabel: "Générale meaning",
      title: "The générale in coinche: meaning and rules",
      h1: "The générale in coinche",
      description:
        "The générale in coinche: one player commits to winning all 8 tricks alone. Definition, points, difference from capot and table conventions.",
      lead: "The <strong>générale</strong> is the ultimate call: one player promises to win <strong>all 8 tricks alone</strong>, without help from their partner.",
      sections: [
        {
          h2: "Definition",
          html: "<p>In a générale the declarer plays alone against the other three: the partner lays down cards but wins no trick for the team. It's an even tougher version of the capot that not every table plays.</p>",
        },
        {
          h2: "How much is it worth?",
          html: "<p>A générale usually scores <strong>500 points</strong> (double a capot), but the scale depends on local conventions. As it's a rare, high-risk call, agree on it before the game.</p>",
        },
        {
          h2: "Générale or capot?",
          html: "<table><tr><th></th><th>Capot</th><th>Générale</th></tr><tr><td>Who plays</td><td>the team (2 players)</td><td><strong>one player</strong></td></tr><tr><td>Goal</td><td>all 8 tricks</td><td>all 8 tricks</td></tr><tr><td>Typical points</td><td>250</td><td>500</td></tr></table>",
        },
      ],
      faq: [
        { q: "Is the générale played alone?", a: "Yes: in a générale a single player commits to winning all 8 tricks, without relying on the partner's cards." },
        { q: "How much is a générale worth?", a: "Most often 500 points, double a capot, but the exact scale depends on the table's conventions." },
      ],
      related: ["lex-capot", "lex-dix-de-der"],
    },
  },

  {
    id: "lex-dix-de-der",
    priority: 0.55,
    fr: {
      slug: "dix-de-der-coinche",
      linkLabel: "10 de der",
      title: "Le 10 de der à la coinche : qu'est-ce que c'est ?",
      h1: "Le 10 de der (dix de der)",
      description:
        "Le 10 de der à la coinche : 10 points bonus pour qui remporte le dernier pli. Définition, pourquoi il compte et comment il change le total de 152 à 162.",
      lead: "Le <strong>10 de der</strong>, ce sont les <strong>10 points</strong> accordés à l'équipe qui remporte le <strong>dernier pli</strong> de la donne.",
      sections: [
        {
          h2: "D'où viennent ces 10 points ?",
          html: "<p>Les cartes d'une donne valent 152 points au total. On y ajoute <strong>10 points « de der »</strong> (de <em>dernier</em>) pour celui qui gagne l'ultime pli, ce qui porte le total d'une donne à <strong>162 points</strong>.</p>",
        },
        {
          h2: "Pourquoi c'est important",
          html: "<p>Ces 10 points changent souvent l'issue d'un contrat serré. Garder un atout maître ou une carte gagnante pour le dernier pli est une vraie compétence : on parle de « garder la der ». À l'inverse, oublier la der peut faire chuter un contrat qu'on croyait gagné.</p>",
        },
      ],
      faq: [
        { q: "Le 10 de der, ça veut dire quoi ?", a: "C'est un bonus de 10 points donné à l'équipe qui remporte le dernier pli de la donne. « Der » est l'abréviation de « dernier »." },
        { q: "Pourquoi une donne fait 162 points ?", a: "Les cartes valent 152 points, plus 10 points de der pour le dernier pli, ce qui donne 162 au total." },
      ],
      related: ["lex-capot", "lex-generale"],
    },
    en: {
      slug: "ten-of-der-coinche",
      linkLabel: "10 de der",
      title: "The “10 de der” in coinche: what is it?",
      h1: "The 10 de der (last-trick bonus)",
      description:
        "The 10 de der in coinche: a 10-point bonus for winning the last trick. Definition, why it matters and how it takes the total from 152 to 162.",
      lead: "The <strong>10 de der</strong> is the <strong>10-point</strong> bonus awarded to the team that wins the <strong>last trick</strong> of the deal.",
      sections: [
        {
          h2: "Where do these 10 points come from?",
          html: "<p>The cards in a deal are worth 152 points in total. You add <strong>10 “de der” points</strong> (from <em>dernier</em>, “last”) for winning the final trick, bringing a deal's total to <strong>162 points</strong>.</p>",
        },
        {
          h2: "Why it matters",
          html: "<p>Those 10 points often decide a tight contract. Keeping a master trump or a winning card for the last trick is a real skill — “keeping the der.” Forgetting it can sink a contract you thought was won.</p>",
        },
      ],
      faq: [
        { q: "What does “10 de der” mean?", a: "It's a 10-point bonus given to the team that wins the last trick of the deal. “Der” is short for “dernier” (last)." },
        { q: "Why is a deal worth 162 points?", a: "The cards are worth 152 points, plus the 10-point last-trick bonus, giving 162 in total." },
      ],
      related: ["lex-capot", "lex-generale"],
    },
  },

  {
    id: "lex-atout-sec",
    priority: 0.5,
    fr: {
      slug: "atout-sec-coinche",
      linkLabel: "Atout sec",
      title: "Atout sec à la coinche : définition et comment le jouer",
      h1: "L'atout sec à la coinche",
      description:
        "Atout sec à la coinche : un seul atout en main. Définition, risques, et conseils non dogmatiques pour bien le jouer selon la situation.",
      lead: "On parle d'<strong>atout sec</strong> quand on ne possède qu'<strong>un seul atout</strong> dans sa main. Une situation délicate, mais pas forcément perdante.",
      sections: [
        {
          h2: "Définition",
          html: "<p>Une carte est « sèche » quand elle est seule de sa catégorie. Un <strong>atout sec</strong>, c'est donc un unique atout en main : dès qu'on le joue, on n'en a plus. Un <em>as sec</em> à côté, c'est un as sans autre carte de la couleur.</p>",
        },
        {
          h2: "Comment le jouer ?",
          html: "<p>Il n'y a pas de règle absolue. Si ton atout sec est un maître (valet, neuf), tu peux t'en servir pour couper ou prendre la main au bon moment. S'il est faible, le poser sur un tour d'atout adverse permet souvent de « se défausser » sans douleur. Tout dépend du contrat, de ta position et de ce qu'a annoncé ton partenaire — un bon joueur adapte, il n'applique pas une recette unique.</p>",
        },
      ],
      faq: [
        { q: "Qu'est-ce qu'un atout sec ?", a: "C'est le fait de n'avoir qu'un seul atout en main. Dès qu'on le joue, on se retrouve sans atout." },
        { q: "Faut-il jouer son atout sec tout de suite ?", a: "Pas de règle unique : un atout sec maître peut servir à couper au bon moment, un atout sec faible se défausse souvent sur un tour d'atout. Ça dépend de la situation." },
      ],
      related: ["lex-capot", "lex-dix-de-der"],
    },
    en: {
      slug: "singleton-trump-coinche",
      linkLabel: "Singleton trump",
      title: "Singleton trump (atout sec) in coinche: how to play it",
      h1: "The singleton trump (atout sec)",
      description:
        "Atout sec in coinche means holding a single trump. Definition, risks and non-dogmatic tips to play it well depending on the situation.",
      lead: "An <strong>atout sec</strong> (singleton trump) is when you hold <strong>only one trump</strong>. A tricky spot — but not a losing one.",
      sections: [
        {
          h2: "Definition",
          html: "<p>A card is “sec” (bare) when it's alone in its category. A <strong>singleton trump</strong> is therefore a lone trump in hand: once you play it, you have none left. A <em>bare ace</em> on the side is an ace with no other card of that suit.</p>",
        },
        {
          h2: "How to play it",
          html: "<p>There's no absolute rule. If your singleton trump is a master (jack, nine), use it to ruff or seize the lead at the right moment. If it's weak, dropping it on an opponent's trump lead often discards it painlessly. It all depends on the contract, your seat and your partner's bid — a good player adapts rather than applying one recipe.</p>",
        },
      ],
      faq: [
        { q: "What is a singleton trump?", a: "It's holding only one trump in hand. As soon as you play it, you're left with no trumps." },
        { q: "Should you play your singleton trump right away?", a: "No single rule: a master singleton trump can ruff at the right moment, a weak one is often discarded on a trump lead. It depends on the situation." },
      ],
      related: ["lex-capot", "lex-dix-de-der"],
    },
  },
];
