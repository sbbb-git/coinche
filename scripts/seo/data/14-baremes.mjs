// Catégorie : Barèmes & tableaux de points (Tout Atout, Sans Atout, récap, ordre des cartes).
// Cible des requêtes réelles Search Console : « point tout atout », « points sans atout coinche »,
// « tableau point coinche », « ordre des cartes coinche ».
// Anti-duplicate : ces pages restent centrées sur les TABLEAUX et les contrats TA/SA,
// et renvoient vers /valeur-cartes-coinche.html et /compter-points-coinche.html (cornerstone).

export const category = { fr: "Barèmes & tableaux de points", en: "Scoring tables" };

export default [
  {
    id: "bar-tout-atout",
    priority: 0.75,
    fr: {
      slug: "points-tout-atout-coinche",
      linkLabel: "Points Tout Atout",
      title: "Tout Atout à la coinche : points et valeur des cartes",
      h1: "Tout Atout à la coinche : points et valeur des cartes",
      description:
        "Le barème Tout Atout à la coinche : Valet 14, 9 = 9, As 6, 10 = 5, Roi 3, Dame 1. Tableau complet, comment compter la donne et la stratégie des quatre valets.",
      lead:
        "À <strong>Tout Atout</strong>, les quatre couleurs se jouent comme de l'atout : le <strong>Valet vaut 14</strong> et le <strong>9 vaut 9</strong> dans chacune d'elles. Voici le barème exact et comment compter.",
      sections: [
        {
          h2: "Le barème Tout Atout, carte par carte",
          html: "<table><tr><th>Carte</th><th>Points (dans chaque couleur)</th></tr><tr><td><strong>Valet</strong></td><td><strong>14</strong></td></tr><tr><td>9</td><td>9</td></tr><tr><td>As</td><td>6</td></tr><tr><td>10</td><td>5</td></tr><tr><td>Roi</td><td>3</td></tr><tr><td>Dame</td><td>1</td></tr><tr><td>8 et 7</td><td>0</td></tr></table><p>Ces valeurs s'appliquent aux <strong>quatre couleurs</strong> : pique, cœur, carreau et trèfle. Aucune couleur n'est privilégiée, il n'y a pas d'atout désigné puisque tout est atout.</p>",
        },
        {
          h2: "Combien fait une donne à Tout Atout ?",
          html: "<table><tr><th>Source des points</th><th>Total</th></tr><tr><td>Pique (14 + 9 + 6 + 5 + 3 + 1)</td><td>38</td></tr><tr><td>Cœur</td><td>38</td></tr><tr><td>Carreau</td><td>38</td></tr><tr><td>Trèfle</td><td>38</td></tr><tr><td>Total dans les cartes</td><td><strong>152</strong></td></tr><tr><td>10 de der (dernier pli)</td><td>10</td></tr><tr><td><strong>Total de la donne</strong></td><td><strong>162</strong></td></tr></table><p>C'est la grande différence avec une donne classique : la <strong>répartition</strong> des points change complètement, puisque chaque couleur pèse exactement 38 points au lieu d'avoir un atout à 62 points et trois couleurs à 30. Le total, lui, reste le même : 152 dans les cartes plus les 10 de der, soit 162.</p>",
        },
        {
          h2: "Tout Atout comparé au jeu normal",
          html: "<table><tr><th>Carte</th><th>Atout (jeu normal)</th><th>Couleur</th><th>Tout Atout</th></tr><tr><td>Valet</td><td>20</td><td>2</td><td><strong>14</strong></td></tr><tr><td>9</td><td>14</td><td>0</td><td>9</td></tr><tr><td>As</td><td>11</td><td>11</td><td>6</td></tr><tr><td>10</td><td>10</td><td>10</td><td>5</td></tr><tr><td>Roi</td><td>4</td><td>4</td><td>3</td></tr><tr><td>Dame</td><td>3</td><td>3</td><td>1</td></tr><tr><td>8 et 7</td><td>0</td><td>0</td><td>0</td></tr></table><p>Retiens surtout la chute de l'As, qui passe de 11 à 6, et celle du 10, qui tombe de 10 à 5. Le barème du jeu classique est détaillé dans <a href=\"/valeur-cartes-coinche.html\">la valeur des cartes</a>, et la méthode de décompte pli par pli dans <a href=\"/compter-points-coinche.html\">compter les points</a>.</p>",
        },
        {
          h2: "Stratégie : les quatre valets deviennent maîtres",
          html: "<p>Avec ce barème, les <strong>quatre valets</strong> sont les quatre cartes les plus fortes du jeu : chacun est maître dans sa couleur et rapporte 14 points à lui seul. Deux valets accompagnés d'un ou deux 9 valent déjà une annonce sérieuse, alors que la même main à l'atout classique ne vaudrait presque rien.</p><p>Deuxième réflexe à prendre : <strong>personne ne coupe</strong>. Chaque couleur est atout pour elle-même, donc tu dois fournir et monter quand tu peux, mais dès que tu es à court d'une couleur tu te contentes de défausser. Un As isolé n'est plus une carte de contrôle : il ne vaut que 6 points et il tombe derrière le valet et le 9 de sa couleur.</p><p>Conséquence pratique : compte tes valets et tes 9 avant d'annoncer, pas tes As. Et pense à défausser tes petites cartes chères, comme les 10 à 5 points, sur les plis que ton partenaire remporte. Si tu veux garder les deux barèmes sous les yeux, l'<a href=\"/aide-memoire-coinche-imprimer.html\">aide-mémoire à imprimer</a> les regroupe sur une page.</p>",
        },
      ],
      faq: [
        { q: "Combien vaut le valet à Tout Atout ?", a: "14 points, et ce dans chacune des quatre couleurs. C'est la carte la plus forte de sa couleur, devant le 9 qui vaut 9 points." },
        { q: "Une donne à Tout Atout fait combien de points ?", a: "162 points : 152 dans les cartes (38 par couleur) plus les 10 de der du dernier pli, exactement comme une donne classique." },
        { q: "Est-ce qu'on coupe à Tout Atout ?", a: "Non. Chaque couleur est atout pour elle-même : tu dois fournir et monter si tu peux, mais quand tu n'as plus la couleur demandée tu défausses sans pouvoir couper." },
      ],
      related: ["var-tout-atout", "enc-tout-atout", "bar-tableau", "bar-sans-atout", "bar-ordre-cartes", "prat-valeurs-tableau", "prat-compter-rapide", "lex-dix-de-der"],
      cta: "Envie de tester le contrat&nbsp;? Active Tout Atout et lance une partie gratuite sur <a href=\"/\">Coincheur</a>.",
    },
    en: {
      slug: "all-trump-points-coinche",
      linkLabel: "All Trump points",
      title: "All Trump in coinche: points and card values",
      h1: "All Trump in coinche: points and card values",
      description:
        "The All Trump scoring scale in coinche: Jack 14, 9 = 9, Ace 6, 10 = 5, King 3, Queen 1. Full table, how to count the deal and the four-jacks strategy.",
      lead:
        "In <strong>All Trump</strong> (Tout Atout) all four suits play as trump: the <strong>Jack is worth 14</strong> and the <strong>9 is worth 9</strong> in every one of them. Here is the exact scale and how to count it.",
      sections: [
        {
          h2: "The All Trump scale, card by card",
          html: "<table><tr><th>Card</th><th>Points (in every suit)</th></tr><tr><td><strong>Jack</strong></td><td><strong>14</strong></td></tr><tr><td>9</td><td>9</td></tr><tr><td>Ace</td><td>6</td></tr><tr><td>10</td><td>5</td></tr><tr><td>King</td><td>3</td></tr><tr><td>Queen</td><td>1</td></tr><tr><td>8 and 7</td><td>0</td></tr></table><p>These values apply to all <strong>four suits</strong>: spades, hearts, diamonds and clubs. No suit is privileged, and no trump suit is named, because everything is trump.</p>",
        },
        {
          h2: "How many points are in an All Trump deal?",
          html: "<table><tr><th>Where the points come from</th><th>Total</th></tr><tr><td>Spades (14 + 9 + 6 + 5 + 3 + 1)</td><td>38</td></tr><tr><td>Hearts</td><td>38</td></tr><tr><td>Diamonds</td><td>38</td></tr><tr><td>Clubs</td><td>38</td></tr><tr><td>Total in the cards</td><td><strong>152</strong></td></tr><tr><td>Last-trick bonus (10 de der)</td><td>10</td></tr><tr><td><strong>Deal total</strong></td><td><strong>162</strong></td></tr></table><p>That is the real change compared with a normal deal: the <strong>spread</strong> of points is completely different, since each suit weighs exactly 38 points instead of one trump suit at 62 and three plain suits at 30. The total is unchanged: 152 in the cards plus the 10-point last trick, so 162.</p>",
        },
        {
          h2: "All Trump compared with the normal game",
          html: "<table><tr><th>Card</th><th>Trump (normal game)</th><th>Plain suit</th><th>All Trump</th></tr><tr><td>Jack</td><td>20</td><td>2</td><td><strong>14</strong></td></tr><tr><td>9</td><td>14</td><td>0</td><td>9</td></tr><tr><td>Ace</td><td>11</td><td>11</td><td>6</td></tr><tr><td>10</td><td>10</td><td>10</td><td>5</td></tr><tr><td>King</td><td>4</td><td>4</td><td>3</td></tr><tr><td>Queen</td><td>3</td><td>3</td><td>1</td></tr><tr><td>8 and 7</td><td>0</td><td>0</td><td>0</td></tr></table><p>The two figures to remember are the Ace dropping from 11 to 6 and the 10 falling from 10 to 5. The classic scale is detailed in <a href=\"/valeur-cartes-coinche.html\">card values</a>, and the trick-by-trick method in <a href=\"/compter-points-coinche.html\">counting points</a>.</p>",
        },
        {
          h2: "Strategy: the four jacks become masters",
          html: "<p>With this scale the <strong>four jacks</strong> are the four strongest cards in the pack: each one is master in its own suit and brings 14 points on its own. Two jacks backed by one or two nines already justify a real bid, while the same hand would be worth almost nothing at a classic trump contract.</p><p>The second habit to build: <strong>nobody ruffs</strong>. Each suit is trump for itself, so you must follow suit and play higher when you can, but as soon as you are void you simply discard. A lone Ace is no longer a control card: it is worth only 6 points and it loses to the jack and the nine of its suit.</p><p>In practice, count your jacks and nines before bidding, not your aces. And remember to throw your expensive small cards, such as the 5-point tens, on tricks your partner has already won. If you want both scales in front of you, the <a href=\"/aide-memoire-coinche-imprimer.html\">printable cheat sheet</a> puts them on one page.</p>",
        },
      ],
      faq: [
        { q: "How much is the jack worth in All Trump?", a: "14 points, in each of the four suits. It is the strongest card of its suit, ahead of the nine, which is worth 9." },
        { q: "How many points does an All Trump deal contain?", a: "162 points: 152 in the cards (38 per suit) plus the 10-point last-trick bonus, exactly like a classic deal." },
        { q: "Can you ruff in All Trump?", a: "No. Every suit is trump for itself: you must follow suit and play higher if you can, but once you are void in the suit led you discard, with no ruffing possible." },
      ],
      related: ["var-tout-atout", "enc-tout-atout", "bar-tableau", "bar-sans-atout", "bar-ordre-cartes", "prat-valeurs-tableau", "prat-compter-rapide", "lex-dix-de-der"],
      cta: "Want to try the contract? Turn All Trump on and start a free game on <a href=\"/?lang=en\">Coincheur</a>.",
    },
  },

  {
    id: "bar-sans-atout",
    priority: 0.75,
    fr: {
      slug: "points-sans-atout-coinche",
      linkLabel: "Points Sans Atout",
      title: "Sans Atout à la coinche : points et valeur des cartes",
      h1: "Sans Atout à la coinche : points et valeur des cartes",
      description:
        "Le barème Sans Atout à la coinche : As 19, 10 = 10, Roi 4, Dame 3, Valet 2, 9 = 0. Tableau complet, total d'une donne et stratégie des couleurs longues.",
      lead:
        "À <strong>Sans Atout</strong>, aucune couleur n'est atout et personne ne coupe. Seule valeur qui change par rapport à une couleur ordinaire : l'<strong>As monte à 19 points</strong>.",
      sections: [
        {
          h2: "Le barème Sans Atout, carte par carte",
          html: "<table><tr><th>Carte</th><th>Points (dans chaque couleur)</th></tr><tr><td><strong>As</strong></td><td><strong>19</strong></td></tr><tr><td>10</td><td>10</td></tr><tr><td>Roi</td><td>4</td></tr><tr><td>Dame</td><td>3</td></tr><tr><td>Valet</td><td>2</td></tr><tr><td>9, 8 et 7</td><td>0</td></tr></table><p>Le Valet redescend à 2 points et le 9 ne vaut plus rien : les deux stars de l'atout perdent tout leur intérêt. L'As, lui, devient la carte reine du contrat.</p>",
        },
        {
          h2: "Combien fait une donne à Sans Atout ?",
          html: "<table><tr><th>Source des points</th><th>Total</th></tr><tr><td>Pique (19 + 10 + 4 + 3 + 2)</td><td>38</td></tr><tr><td>Cœur</td><td>38</td></tr><tr><td>Carreau</td><td>38</td></tr><tr><td>Trèfle</td><td>38</td></tr><tr><td>Total dans les cartes</td><td><strong>152</strong></td></tr><tr><td>10 de der (dernier pli)</td><td>10</td></tr><tr><td><strong>Total de la donne</strong></td><td><strong>162</strong></td></tr></table><p>Comme à Tout Atout, chaque couleur pèse 38 points et le total de la donne reste de 162. Ce qui change, c'est la <strong>concentration</strong> : la moitié des points d'une couleur tient dans son seul As.</p>",
        },
        {
          h2: "Sans Atout comparé au jeu normal",
          html: "<table><tr><th>Carte</th><th>Couleur (jeu normal)</th><th>Sans Atout</th></tr><tr><td>As</td><td>11</td><td><strong>19</strong></td></tr><tr><td>10</td><td>10</td><td>10</td></tr><tr><td>Roi</td><td>4</td><td>4</td></tr><tr><td>Dame</td><td>3</td><td>3</td></tr><tr><td>Valet</td><td>2</td><td>2</td></tr><tr><td>9, 8 et 7</td><td>0</td><td>0</td></tr></table><p>Tout est identique à une couleur ordinaire, sauf l'As. C'est le barème le plus facile à mémoriser des quatre : si tu connais déjà <a href=\"/valeur-cartes-coinche.html\">la valeur des cartes</a> hors atout, tu sais déjà compter à Sans Atout, à condition de compter l'As 19 et non 11.</p>",
        },
        {
          h2: "Stratégie : les As et les couleurs longues",
          html: "<p>Comme <strong>personne ne coupe</strong>, une carte maîtresse le reste jusqu'au bout : ton As de pique prendra le pli au premier comme au sixième tour. Chaque As en main vaut donc à peu près un pli et 19 points, ce qui rend l'évaluation de la main très directe : compte tes As, puis regarde tes Rois protégés.</p><p>L'autre atout du contrat, ce sont les <strong>couleurs longues</strong>. Avec cinq cartes de la même couleur dont l'As, tu joues l'As, puis tu continues la couleur : une fois les adversaires à court, tes petites cartes deviennent maîtresses et ramassent les plis. C'est le meilleur moyen d'aller chercher les 10 de der en fin de donne.</p><p>À l'inverse, une main avec beaucoup de Valets et de 9 ne vaut presque rien ici. Et attention aux 10 non protégés : ils pèsent 10 points et tombent facilement sous l'As adverse. Pour la méthode de décompte à la fin de la donne, tout est dans <a href=\"/compter-points-coinche.html\">compter les points</a>, et le déroulé complet dans <a href=\"/regles-coinche.html\">les règles de la coinche</a>.</p>",
        },
      ],
      faq: [
        { q: "Combien vaut l'As à Sans Atout ?", a: "19 points, au lieu de 11 dans une couleur ordinaire. C'est la seule valeur qui change par rapport au barème hors atout." },
        { q: "Une donne à Sans Atout fait combien de points ?", a: "162 points : 152 dans les cartes (38 par couleur) plus les 10 de der attribués au vainqueur du dernier pli." },
        { q: "Le valet et le 9 valent quoi à Sans Atout ?", a: "Le Valet vaut 2 points et le 9 en vaut 0. Sans atout, ces deux cartes perdent la valeur énorme qu'elles ont dans la couleur d'atout." },
      ],
      related: ["var-sans-atout", "enc-sans-atout", "bar-tableau", "bar-tout-atout", "bar-ordre-cartes", "prat-valeurs-tableau", "jeu-cartes-maitresses", "lex-dix-de-der"],
      cta: "Pour t'entraîner sur ce contrat, active Sans Atout et joue une partie gratuite sur <a href=\"/\">Coincheur</a>.",
    },
    en: {
      slug: "no-trump-points-coinche",
      linkLabel: "No Trump points",
      title: "No Trump in coinche: points and card values",
      h1: "No Trump in coinche: points and card values",
      description:
        "The No Trump scoring scale in coinche: Ace 19, 10 = 10, King 4, Queen 3, Jack 2, 9 = 0. Full table, deal total and the long-suit strategy.",
      lead:
        "In <strong>No Trump</strong> (Sans Atout) no suit is trump and nobody ruffs. The only value that changes from an ordinary plain suit: the <strong>Ace rises to 19 points</strong>.",
      sections: [
        {
          h2: "The No Trump scale, card by card",
          html: "<table><tr><th>Card</th><th>Points (in every suit)</th></tr><tr><td><strong>Ace</strong></td><td><strong>19</strong></td></tr><tr><td>10</td><td>10</td></tr><tr><td>King</td><td>4</td></tr><tr><td>Queen</td><td>3</td></tr><tr><td>Jack</td><td>2</td></tr><tr><td>9, 8 and 7</td><td>0</td></tr></table><p>The Jack drops back to 2 points and the 9 is worth nothing: the two stars of a trump suit lose all their appeal. The Ace becomes the card that rules the contract.</p>",
        },
        {
          h2: "How many points are in a No Trump deal?",
          html: "<table><tr><th>Where the points come from</th><th>Total</th></tr><tr><td>Spades (19 + 10 + 4 + 3 + 2)</td><td>38</td></tr><tr><td>Hearts</td><td>38</td></tr><tr><td>Diamonds</td><td>38</td></tr><tr><td>Clubs</td><td>38</td></tr><tr><td>Total in the cards</td><td><strong>152</strong></td></tr><tr><td>Last-trick bonus (10 de der)</td><td>10</td></tr><tr><td><strong>Deal total</strong></td><td><strong>162</strong></td></tr></table><p>As in All Trump, every suit weighs 38 points and the deal still totals 162. What changes is the <strong>concentration</strong>: half of a suit's points sit in its Ace alone.</p>",
        },
        {
          h2: "No Trump compared with the normal game",
          html: "<table><tr><th>Card</th><th>Plain suit (normal game)</th><th>No Trump</th></tr><tr><td>Ace</td><td>11</td><td><strong>19</strong></td></tr><tr><td>10</td><td>10</td><td>10</td></tr><tr><td>King</td><td>4</td><td>4</td></tr><tr><td>Queen</td><td>3</td><td>3</td></tr><tr><td>Jack</td><td>2</td><td>2</td></tr><tr><td>9, 8 and 7</td><td>0</td><td>0</td></tr></table><p>Everything matches an ordinary plain suit except the Ace. It is the easiest of the four scales to memorise: if you already know <a href=\"/valeur-cartes-coinche.html\">card values</a> outside trump, you can already count a No Trump deal, as long as you score the Ace 19 rather than 11.</p>",
        },
        {
          h2: "Strategy: aces and long suits",
          html: "<p>Since <strong>nobody ruffs</strong>, a master card stays master to the end: your Ace of spades takes the trick on the first round just as surely as on the sixth. Each ace in hand is therefore worth roughly one trick and 19 points, which makes hand evaluation very direct: count your aces, then look at your guarded kings.</p><p>The other strength of the contract is the <strong>long suit</strong>. Holding five cards of one suit including the ace, you cash the ace and keep leading the suit: once the opponents are void, your small cards become winners and sweep up the tricks. That is the surest way to collect the last-trick bonus.</p><p>Conversely, a hand full of jacks and nines is worth almost nothing here. And beware of unguarded tens: they carry 10 points and fall easily under an opposing ace. For the end-of-deal method, see <a href=\"/compter-points-coinche.html\">counting points</a>, and for the full flow of a game, <a href=\"/regles-coinche.html\">the coinche rules</a>.</p>",
        },
      ],
      faq: [
        { q: "How much is the ace worth in No Trump?", a: "19 points, instead of 11 in an ordinary plain suit. It is the only value that differs from the standard non-trump scale." },
        { q: "How many points does a No Trump deal contain?", a: "162 points: 152 in the cards (38 per suit) plus the 10-point bonus awarded to whoever wins the last trick." },
        { q: "What are the jack and the nine worth in No Trump?", a: "The Jack is worth 2 points and the 9 is worth 0. Without a trump suit, those two cards lose the huge value they carry as trumps." },
      ],
      related: ["var-sans-atout", "enc-sans-atout", "bar-tableau", "bar-tout-atout", "bar-ordre-cartes", "prat-valeurs-tableau", "jeu-cartes-maitresses", "lex-dix-de-der"],
      cta: "To practise this contract, turn No Trump on and play a free game on <a href=\"/?lang=en\">Coincheur</a>.",
    },
  },

  {
    id: "bar-tableau",
    priority: 0.75,
    fr: {
      slug: "tableau-des-points-coinche",
      linkLabel: "Tableau des points",
      title: "Tableau des points de la coinche : le récap complet",
      h1: "Tableau des points de la coinche",
      description:
        "Tous les barèmes de la coinche en tableaux : atout, couleur, Sans Atout, Tout Atout, 162 points par donne, belote 20, capot 250, coinche et surcoinche.",
      lead:
        "Tous les barèmes de la coinche réunis sur une seule page : valeur des cartes selon le contrat, total d'une donne, belote, capot, coinche et surcoinche. Fait pour être consulté en trois secondes.",
      sections: [
        {
          h2: "Valeur des cartes selon le contrat",
          html: "<table><tr><th>Carte</th><th>Atout</th><th>Couleur</th><th>Sans Atout</th><th>Tout Atout</th></tr><tr><td>Valet</td><td><strong>20</strong></td><td>2</td><td>2</td><td><strong>14</strong></td></tr><tr><td>9</td><td>14</td><td>0</td><td>0</td><td>9</td></tr><tr><td>As</td><td>11</td><td>11</td><td><strong>19</strong></td><td>6</td></tr><tr><td>10</td><td>10</td><td>10</td><td>10</td><td>5</td></tr><tr><td>Roi</td><td>4</td><td>4</td><td>4</td><td>3</td></tr><tr><td>Dame</td><td>3</td><td>3</td><td>3</td><td>1</td></tr><tr><td>8 et 7</td><td>0</td><td>0</td><td>0</td><td>0</td></tr></table><p>Une seule colonne s'applique à la fois, selon le contrat annoncé. Les détails contrat par contrat sont sur les pages <a href=\"/points-tout-atout-coinche.html\">points Tout Atout</a> et <a href=\"/points-sans-atout-coinche.html\">points Sans Atout</a>.</p>",
        },
        {
          h2: "Le total d'une donne",
          html: "<table><tr><th>Élément</th><th>Points</th></tr><tr><td>Total dans les cartes</td><td>152</td></tr><tr><td>10 de der (dernier pli)</td><td>10</td></tr><tr><td><strong>Total d'une donne</strong></td><td><strong>162</strong></td></tr><tr><td>Capot (tous les plis)</td><td>250</td></tr></table><p>Ce total de 162 vaut pour les quatre contrats : à Sans Atout comme à Tout Atout, chaque couleur pèse 38 points, soit 152 au total. Seule la répartition change.</p>",
        },
        {
          h2: "Belote, coinche et surcoinche",
          html: "<table><tr><th>Bonus ou multiplicateur</th><th>Effet</th></tr><tr><td>Belote (Roi + Dame d'atout)</td><td>+20 points</td></tr><tr><td>Capot annoncé et réussi</td><td>250 points</td></tr><tr><td>Coinche</td><td>contrat ×2</td></tr><tr><td>Surcoinche</td><td>contrat ×4</td></tr></table><p>La belote ne se déclare qu'avec le Roi et la Dame de la couleur d'atout, donc jamais à Sans Atout. À Tout Atout, son sort dépend de la convention de table : mets-toi d'accord avant de commencer.</p>",
        },
        {
          h2: "Vérifier son décompte en fin de donne",
          html: "<p>Le contrôle est toujours le même : additionne les points des deux camps, tu dois tomber sur <strong>162 pile</strong> (ou 250 sur un capot annoncé). Si le compte est faux, c'est presque toujours qu'une carte a été comptée deux fois ou que les 10 de der ont été oubliés.</p><p>Pour compter vite, repère d'abord les grosses cartes du contrat en cours (le Valet et le 9 à l'atout, les As à Sans Atout, les quatre Valets à Tout Atout), fais des paquets de dix, puis ajoute la der. La méthode complète est détaillée dans <a href=\"/compter-points-coinche.html\">compter les points</a>, et les valeurs sont expliquées une à une dans <a href=\"/valeur-cartes-coinche.html\">la valeur des cartes</a>.</p>",
        },
        {
          h2: "Garder ce tableau sous la main",
          html: "<p>Le temps de tout mémoriser, garde ce récap ouvert sur ton téléphone pendant les parties, ou imprime l'<a href=\"/aide-memoire-coinche-imprimer.html\">aide-mémoire de la coinche</a>. Si un point de règle te manque plutôt qu'un barème, tout est repris dans <a href=\"/regles-coinche.html\">les règles de la coinche</a>.</p>",
        },
      ],
      faq: [
        { q: "Combien de points y a-t-il dans une donne de coinche ?", a: "162 points : 152 contenus dans les cartes et 10 de der pour l'équipe qui remporte le dernier pli. Un capot annoncé et réussi vaut 250." },
        { q: "Quelle est la carte la plus forte de la coinche ?", a: "Le Valet d'atout, avec 20 points, devant le 9 d'atout à 14. À Sans Atout c'est l'As, à 19 points, et à Tout Atout le Valet, à 14 points dans chaque couleur." },
        { q: "Que fait une coinche sur le score ?", a: "Elle double la valeur du contrat. Une surcoinche la quadruple. Le camp gagnant encaisse alors le contrat multiplié, avec la belote qui reste comptée à part." },
      ],
      related: ["bar-tout-atout", "bar-sans-atout", "bar-ordre-cartes", "prat-valeurs-tableau", "prat-compter-rapide", "prat-calcul-contrat", "deb-compter-points", "lex-dix-de-der", "lex-capot", "res-aide-memoire"],
      cta: "Le décompte s'applique tout seul quand tu joues&nbsp;: lance une partie gratuite sur <a href=\"/\">Coincheur</a>.",
    },
    en: {
      slug: "coinche-scoring-table",
      linkLabel: "Scoring table",
      title: "Coinche scoring table: the complete recap",
      h1: "Coinche scoring table",
      description:
        "Every coinche scale in one place: trump, plain suit, No Trump, All Trump, 162 points a deal, belote 20, capot 250, coinche and surcoinche multipliers.",
      lead:
        "Every coinche scale on a single page: card values by contract, deal total, belote, capot, coinche and surcoinche. Built to be checked in three seconds.",
      sections: [
        {
          h2: "Card values by contract",
          html: "<table><tr><th>Card</th><th>Trump</th><th>Plain suit</th><th>No Trump</th><th>All Trump</th></tr><tr><td>Jack</td><td><strong>20</strong></td><td>2</td><td>2</td><td><strong>14</strong></td></tr><tr><td>9</td><td>14</td><td>0</td><td>0</td><td>9</td></tr><tr><td>Ace</td><td>11</td><td>11</td><td><strong>19</strong></td><td>6</td></tr><tr><td>10</td><td>10</td><td>10</td><td>10</td><td>5</td></tr><tr><td>King</td><td>4</td><td>4</td><td>4</td><td>3</td></tr><tr><td>Queen</td><td>3</td><td>3</td><td>3</td><td>1</td></tr><tr><td>8 and 7</td><td>0</td><td>0</td><td>0</td><td>0</td></tr></table><p>Only one column applies at a time, depending on the contract that was bid. Contract-by-contract detail lives on the <a href=\"/en/all-trump-points-coinche.html\">All Trump points</a> and <a href=\"/en/no-trump-points-coinche.html\">No Trump points</a> pages.</p>",
        },
        {
          h2: "The total of a deal",
          html: "<table><tr><th>Item</th><th>Points</th></tr><tr><td>Total held in the cards</td><td>152</td></tr><tr><td>Last-trick bonus (10 de der)</td><td>10</td></tr><tr><td><strong>Deal total</strong></td><td><strong>162</strong></td></tr><tr><td>Capot (every trick)</td><td>250</td></tr></table><p>That 162 holds for all four contracts: in No Trump and All Trump alike, each suit weighs 38 points, so 152 overall. Only the spread changes.</p>",
        },
        {
          h2: "Belote, coinche and surcoinche",
          html: "<table><tr><th>Bonus or multiplier</th><th>Effect</th></tr><tr><td>Belote (King + Queen of trump)</td><td>+20 points</td></tr><tr><td>Bid and made capot</td><td>250 points</td></tr><tr><td>Coinche (double)</td><td>contract ×2</td></tr><tr><td>Surcoinche (redouble)</td><td>contract ×4</td></tr></table><p>Belote is declared only with the King and Queen of the trump suit, so it never applies in No Trump. In All Trump its fate depends on house rules: agree before you start.</p>",
        },
        {
          h2: "Checking your count at the end of a deal",
          html: "<p>The check never changes: add both sides' points and you must land on <strong>exactly 162</strong> (or 250 on a bid capot). When the sum is off, it is nearly always because a card was counted twice or the last-trick bonus was forgotten.</p><p>To count fast, spot the big cards of the current contract first (the jack and nine of trump, the aces in No Trump, the four jacks in All Trump), group them into packets of ten, then add the last trick. The full method is in <a href=\"/compter-points-coinche.html\">counting points</a>, and every value is explained one by one in <a href=\"/valeur-cartes-coinche.html\">card values</a>.</p>",
        },
        {
          h2: "Keeping this table handy",
          html: "<p>Until you know it by heart, keep this recap open on your phone during games, or print the <a href=\"/aide-memoire-coinche-imprimer.html\">coinche cheat sheet</a>. If what you need is a rule rather than a scale, it is all covered in <a href=\"/regles-coinche.html\">the coinche rules</a>.</p>",
        },
      ],
      faq: [
        { q: "How many points are there in a coinche deal?", a: "162 points: 152 held in the cards and 10 for the last trick. A capot that is bid and made is worth 250." },
        { q: "What is the strongest card in coinche?", a: "The jack of trump at 20 points, ahead of the nine of trump at 14. In No Trump it is the ace at 19 points, and in All Trump the jack at 14 points in every suit." },
        { q: "What does a coinche do to the score?", a: "It doubles the value of the contract, and a surcoinche quadruples it. The winning side then banks the multiplied contract, with belote still scored separately." },
      ],
      related: ["bar-tout-atout", "bar-sans-atout", "bar-ordre-cartes", "prat-valeurs-tableau", "prat-compter-rapide", "prat-calcul-contrat", "deb-compter-points", "lex-dix-de-der", "lex-capot", "res-aide-memoire"],
      cta: "The scoring runs itself while you play: start a free game on <a href=\"/?lang=en\">Coincheur</a>.",
    },
  },

  {
    id: "bar-ordre-cartes",
    priority: 0.7,
    fr: {
      slug: "ordre-des-cartes-coinche",
      linkLabel: "Ordre des cartes",
      title: "Ordre des cartes à la coinche : de la plus forte à la plus faible",
      h1: "Ordre des cartes à la coinche",
      description:
        "L'ordre des cartes à la coinche : à l'atout V > 9 > A > 10 > R > D > 8 > 7, hors atout A > 10 > R > D > V > 9 > 8 > 7, plus l'ordre à Sans Atout et Tout Atout.",
      lead:
        "Deux ordres seulement à retenir : celui de l'<strong>atout</strong>, où le Valet domine, et celui des <strong>couleurs ordinaires</strong>, où l'As reprend la tête.",
      sections: [
        {
          h2: "À l'atout : le Valet devant tout le monde",
          html: "<table><tr><th>Rang</th><th>Carte</th><th>Points</th></tr><tr><td>1</td><td><strong>Valet</strong></td><td>20</td></tr><tr><td>2</td><td>9</td><td>14</td></tr><tr><td>3</td><td>As</td><td>11</td></tr><tr><td>4</td><td>10</td><td>10</td></tr><tr><td>5</td><td>Roi</td><td>4</td></tr><tr><td>6</td><td>Dame</td><td>3</td></tr><tr><td>7</td><td>8</td><td>0</td></tr><tr><td>8</td><td>7</td><td>0</td></tr></table><p>Soit <strong>V &gt; 9 &gt; A &gt; 10 &gt; R &gt; D &gt; 8 &gt; 7</strong>. Ce sont bien les deux cartes les plus fortes qui rapportent aussi le plus de points, ce qui explique pourquoi une main sans Valet ni 9 d'atout est si fragile.</p>",
        },
        {
          h2: "Hors atout : l'As reprend la tête",
          html: "<table><tr><th>Rang</th><th>Carte</th><th>Points</th></tr><tr><td>1</td><td><strong>As</strong></td><td>11</td></tr><tr><td>2</td><td>10</td><td>10</td></tr><tr><td>3</td><td>Roi</td><td>4</td></tr><tr><td>4</td><td>Dame</td><td>3</td></tr><tr><td>5</td><td>Valet</td><td>2</td></tr><tr><td>6</td><td>9</td><td>0</td></tr><tr><td>7</td><td>8</td><td>0</td></tr><tr><td>8</td><td>7</td><td>0</td></tr></table><p>Soit <strong>A &gt; 10 &gt; R &gt; D &gt; V &gt; 9 &gt; 8 &gt; 7</strong>. Le piège classique du débutant : le 10 passe devant le Roi et la Dame, alors qu'il paraît plus petit.</p>",
        },
        {
          h2: "L'ordre à Sans Atout et à Tout Atout",
          html: "<table><tr><th>Contrat</th><th>Ordre de la plus forte à la plus faible</th></tr><tr><td>Sans Atout</td><td>A &gt; 10 &gt; R &gt; D &gt; V &gt; 9 &gt; 8 &gt; 7 (dans les 4 couleurs)</td></tr><tr><td>Tout Atout</td><td>V &gt; 9 &gt; A &gt; 10 &gt; R &gt; D &gt; 8 &gt; 7 (dans les 4 couleurs)</td></tr></table><p>Aucun ordre nouveau à apprendre : à Sans Atout, les quatre couleurs suivent l'ordre hors atout ; à Tout Atout, elles suivent toutes l'ordre de l'atout. Les barèmes correspondants sont détaillés sur <a href=\"/points-sans-atout-coinche.html\">points Sans Atout</a> et <a href=\"/points-tout-atout-coinche.html\">points Tout Atout</a>.</p>",
        },
        {
          h2: "Retenir l'ordre sans se tromper",
          html: "<p>Le moyen le plus simple est de mémoriser la bascule plutôt que deux listes : quand la couleur devient atout, le <strong>Valet et le 9 sautent devant l'As et le 10</strong>. Le reste ne bouge pas. Une fois ce mouvement en tête, tu reconstruis les deux ordres en une seconde.</p><p>Attention à ne pas confondre force et points : le Roi bat la Dame et vaut plus qu'elle, mais le 9 d'atout, plus fort que l'As, en vaut moins (14 contre 11 dans les points). L'ordre sert à savoir <em>qui remporte le pli</em>, le barème à savoir <em>ce que ça rapporte</em>. Les deux tableaux réunis sont sur le <a href=\"/tableau-des-points-coinche.html\">tableau des points</a>, les valeurs sont expliquées dans <a href=\"/valeur-cartes-coinche.html\">la valeur des cartes</a>, et l'obligation de monter à l'atout figure dans <a href=\"/regles-coinche.html\">les règles</a>.</p>",
        },
      ],
      faq: [
        { q: "Quel est l'ordre des cartes à l'atout ?", a: "Valet, 9, As, 10, Roi, Dame, 8, 7. Le Valet d'atout est la carte la plus forte du jeu, et le 9 vient juste derrière." },
        { q: "Quel est l'ordre des cartes hors atout ?", a: "As, 10, Roi, Dame, Valet, 9, 8, 7. Le 10 est plus fort que le Roi et que la Dame, ce qui surprend souvent les débutants." },
        { q: "L'ordre change-t-il à Sans Atout et à Tout Atout ?", a: "Pas de nouvel ordre à apprendre : à Sans Atout les quatre couleurs suivent l'ordre hors atout, à Tout Atout elles suivent toutes l'ordre de l'atout." },
      ],
      related: ["bar-tableau", "bar-tout-atout", "bar-sans-atout", "prat-valeurs-tableau", "bel-ordre-cartes", "reg-monter-atout", "reg-fournir-couleur", "deb-vocabulaire"],
      cta: "L'ordre rentre plus vite en jouant&nbsp;: fais une partie gratuite sur <a href=\"/\">Coincheur</a>.",
    },
    en: {
      slug: "coinche-card-order",
      linkLabel: "Card order",
      title: "Coinche card order: from strongest to weakest",
      h1: "Coinche card order",
      description:
        "Card ranking in coinche: in trump J > 9 > A > 10 > K > Q > 8 > 7, outside trump A > 10 > K > Q > J > 9 > 8 > 7, plus the No Trump and All Trump orders.",
      lead:
        "There are only two rankings to learn: the <strong>trump</strong> order, where the Jack rules, and the <strong>plain suit</strong> order, where the Ace takes the lead back.",
      sections: [
        {
          h2: "In trump: the jack ahead of everyone",
          html: "<table><tr><th>Rank</th><th>Card</th><th>Points</th></tr><tr><td>1</td><td><strong>Jack</strong></td><td>20</td></tr><tr><td>2</td><td>9</td><td>14</td></tr><tr><td>3</td><td>Ace</td><td>11</td></tr><tr><td>4</td><td>10</td><td>10</td></tr><tr><td>5</td><td>King</td><td>4</td></tr><tr><td>6</td><td>Queen</td><td>3</td></tr><tr><td>7</td><td>8</td><td>0</td></tr><tr><td>8</td><td>7</td><td>0</td></tr></table><p>That is <strong>J &gt; 9 &gt; A &gt; 10 &gt; K &gt; Q &gt; 8 &gt; 7</strong>. The two strongest cards are also the two that carry the most points, which is why a hand without the trump jack or nine is so fragile.</p>",
        },
        {
          h2: "Outside trump: the ace takes over",
          html: "<table><tr><th>Rank</th><th>Card</th><th>Points</th></tr><tr><td>1</td><td><strong>Ace</strong></td><td>11</td></tr><tr><td>2</td><td>10</td><td>10</td></tr><tr><td>3</td><td>King</td><td>4</td></tr><tr><td>4</td><td>Queen</td><td>3</td></tr><tr><td>5</td><td>Jack</td><td>2</td></tr><tr><td>6</td><td>9</td><td>0</td></tr><tr><td>7</td><td>8</td><td>0</td></tr><tr><td>8</td><td>7</td><td>0</td></tr></table><p>That is <strong>A &gt; 10 &gt; K &gt; Q &gt; J &gt; 9 &gt; 8 &gt; 7</strong>. The classic beginner trap: the 10 beats both the King and the Queen, even though it looks like a smaller card.</p>",
        },
        {
          h2: "The order in No Trump and All Trump",
          html: "<table><tr><th>Contract</th><th>Order, strongest to weakest</th></tr><tr><td>No Trump</td><td>A &gt; 10 &gt; K &gt; Q &gt; J &gt; 9 &gt; 8 &gt; 7 (in all 4 suits)</td></tr><tr><td>All Trump</td><td>J &gt; 9 &gt; A &gt; 10 &gt; K &gt; Q &gt; 8 &gt; 7 (in all 4 suits)</td></tr></table><p>No third ranking to learn: in No Trump the four suits follow the plain-suit order, and in All Trump they all follow the trump order. The matching scales are detailed on <a href=\"/en/no-trump-points-coinche.html\">No Trump points</a> and <a href=\"/en/all-trump-points-coinche.html\">All Trump points</a>.</p>",
        },
        {
          h2: "Remembering the ranking",
          html: "<p>The easiest route is to memorise the switch rather than two lists: when a suit becomes trump, the <strong>jack and the nine jump ahead of the ace and the ten</strong>. Nothing else moves. Once that move is in your head, you can rebuild either ranking in a second.</p><p>Do not confuse strength with points: the King beats the Queen and is worth more, yet the nine of trump, which beats the ace, is worth more in points too (14 against 11), while the ten beats the king but the ace beats them both. The ranking tells you <em>who wins the trick</em>, the scale tells you <em>what it pays</em>. Both tables sit side by side on the <a href=\"/en/coinche-scoring-table.html\">scoring table</a>, values are explained in <a href=\"/valeur-cartes-coinche.html\">card values</a>, and the duty to overtrump is covered in <a href=\"/regles-coinche.html\">the rules</a>.</p>",
        },
      ],
      faq: [
        { q: "What is the card order in trump?", a: "Jack, 9, Ace, 10, King, Queen, 8, 7. The jack of trump is the strongest card in the game and the nine comes right behind it." },
        { q: "What is the card order outside trump?", a: "Ace, 10, King, Queen, Jack, 9, 8, 7. The ten beats both the king and the queen, which often surprises beginners." },
        { q: "Does the order change in No Trump and All Trump?", a: "There is no new ranking to learn: in No Trump all four suits follow the plain-suit order, and in All Trump they all follow the trump order." },
      ],
      related: ["bar-tableau", "bar-tout-atout", "bar-sans-atout", "prat-valeurs-tableau", "bel-ordre-cartes", "reg-monter-atout", "reg-fournir-couleur", "deb-vocabulaire"],
      cta: "The ranking sticks faster when you play: try a free game on <a href=\"/?lang=en\">Coincheur</a>.",
    },
  },
];
