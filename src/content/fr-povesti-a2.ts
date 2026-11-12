import type { Story } from './es-povesti'

/** „Povestea capitolului” pentru franceză A2: texte narative care cresc de la ~300 la ~500 de cuvinte. */
export const FR_POVESTI_A2: Record<string, Story> = {
  'fr-cap13': {
    reading: {
      title: 'Les treize desserts',
      cast: { Narrateur: 'm' },
      lines: [
        { t: 'Le 24 décembre, à trois heures de l’après-midi, la cuisine de la vieille maison était en désordre.', ro: 'Pe 24 decembrie, la trei după-amiaza, bucătăria casei vechi era în dezordine.' },
        { t: 'Il y avait de la farine partout : sur la table, sur le sol, et même dans les cheveux de Julien.', ro: 'Era făină peste tot: pe masă, pe jos și chiar în părul lui Julien.' },
        { t: 'Julien lisait le cahier de sa grand-mère à voix haute. « Un peu de farine, un peu de sucre… Mais combien, un peu ? »', ro: 'Julien citea cu voce tare caietul bunicii lui. „Puțină făină, puțin zahăr… Dar cât înseamnă puțin?”' },
        { br: true, t: 'Ioana riait. « Ta grand-mère ne mesurait jamais rien. Ma grand-mère non plus ! Elle disait : “Les mains savent.” »', ro: 'Ioana râdea. „Bunica ta nu măsura niciodată nimic. Nici bunica mea! Zicea: «Mâinile știu.»”' },
        { t: 'Ils ont commencé par les choses faciles. Les noix, les figues, les amandes et les raisins secs, ce sont les « quatre mendiants ». Il suffisait de les mettre dans des petits bols.', ro: 'Au început cu lucrurile ușoare. Nucile, smochinele, migdalele și stafidele sunt „cei patru cerșetori”. Era de ajuns să le pună în boluri mici.' },
        { t: 'Ensuite, les oranges, les mandarines, les dattes et le melon d’hiver. Neuf desserts, déjà !', ro: 'Apoi portocalele, mandarinele, curmalele și pepenele de iarnă. Deja nouă deserturi!' },
        { br: true, t: 'Mais les quatre derniers étaient plus difficiles. Le nougat blanc et le nougat noir, ils les ont achetés à la pâtisserie du port. « Mamie ne les faisait pas non plus », a dit Julien.', ro: 'Dar ultimele patru erau mai grele. Nuga albă și nuga neagră le-au cumpărat de la cofetăria din port. „Nici bunica nu le făcea”, a spus Julien.' },
        { t: 'Il restait la pompe à l’huile et les oreillettes, des petits beignets.', ro: 'Mai rămâneau „pompe à l’huile” și „oreillettes”, niște gogoșele.' },
        { t: 'La pompe à l’huile est sortie du four toute plate et un peu brûlée. Julien a fait une grimace.', ro: 'Brioșa a ieșit din cuptor complet turtită și puțin arsă. Julien s-a strâmbat.' },
        { t: '« Quand Mamie la faisait, elle était grande et dorée… »', ro: '„Când o făcea bunica, era mare și aurie…”' },
        { br: true, t: 'Alors Ioana a pris la pâte des oreillettes. Elle travaillait vite, sans regarder le cahier. Elle faisait exactement comme sa grand-mère à Iași, quand elle préparait les gogoși.', ro: 'Atunci Ioana a luat aluatul pentru „oreillettes”. Lucra repede, fără să se uite în caiet. Făcea exact ca bunica ei la Iași, când pregătea gogoși.' },
        { t: 'Dix minutes plus tard, il y avait sur la table une montagne de beignets dorés, avec du sucre en poudre.', ro: 'După zece minute, pe masă era un munte de gogoșele aurii, cu zahăr pudră.' },
        { t: 'Julien en a goûté un et il a fermé les yeux. « C’est exactement le goût de mon enfance. Comment tu as fait ? »', ro: 'Julien a gustat una și a închis ochii. „E exact gustul copilăriei mele. Cum ai făcut?”' },
        { t: 'Ioana a souri. « Je n’ai pas lu le cahier. Les mains savent. »', ro: 'Ioana a zâmbit. „N-am citit caietul. Mâinile știu.”' },
        { br: true, t: 'Le soir, ils ont mangé les treize desserts devant la cheminée. La pompe à l’huile était brûlée, mais personne ne l’a dit.', ro: 'Seara au mâncat cele treisprezece deserturi în fața șemineului. Brioșa era arsă, dar nimeni n-a spus nimic.' },
        { t: 'Dehors, la mer était calme et les étoiles brillaient. C’était un Noël parfait.', ro: 'Afară marea era liniștită și stelele străluceau. A fost un Crăciun perfect.' },
      ],
      gloss: { désordre: 'dezordine', farine: 'făină', partout: 'peste tot', sol: 'pământ, podea', cheveux: 'păr', lisait: 'citea', voix: 'voce („à voix haute” = cu voce tare)', riait: 'râdea', mesurait: 'măsura', savent: 'știu', noix: 'nuci', figues: 'smochine', amandes: 'migdale', 'raisins secs': 'stafide', mendiants: 'cerșetori', suffisait: 'era de ajuns', bols: 'boluri', mandarines: 'mandarine', melon: 'pepene galben', nougat: 'nuga', pâtisserie: 'cofetărie', restait: 'rămânea', oreillettes: 'gogoșele provensale', beignets: 'gogoși', four: 'cuptor', plate: 'turtită', brûlée: 'arsă', grimace: 'strâmbătură', dorée: 'aurie', pâte: 'aluat', poudre: 'pudră', goût: 'gust', cheminée: 'șemineu', étoiles: 'stele', brillaient: 'străluceau' },
    },
    questions: [
      { kind: 'choice', q: 'Pourquoi c’était difficile de suivre le cahier ?', options: ['Il était en provençal', 'Il n’y avait pas de quantités précises', 'Il manquait des pages'], answer: 'Il n’y avait pas de quantités précises' },
      { kind: 'choice', q: 'Où ont-ils acheté les nougats ?', options: ['Au supermarché', 'À la pâtisserie du port', 'Au marché'], answer: 'À la pâtisserie du port' },
      { kind: 'choice', q: 'Comment était la pompe à l’huile ?', options: ['Grande et dorée', 'Plate et un peu brûlée', 'Parfaite'], answer: 'Plate et un peu brûlée' },
      { kind: 'fill', before: 'Les mains', after: '.', answers: ['savent'] },
    ],
  },

  'fr-cap14': {
    reading: {
      title: 'L’homme au manteau gris',
      cast: { Narratrice: 'f' },
      lines: [
        { t: 'C’était au début du mois de janvier. Il faisait froid et il y avait du brouillard sur la Saône.', ro: 'Era la începutul lui ianuarie. Era frig și era ceață pe Saône.' },
        { t: 'Un soir, Ioana rentrait du travail quand elle a remarqué un homme devant son immeuble.', ro: 'Într-o seară, Ioana se întorcea de la lucru când a observat un bărbat în fața blocului ei.' },
        { t: 'Il était assez âgé. Il portait un long manteau gris et un chapeau noir. Il avait une grande moustache blanche.', ro: 'Era destul de în vârstă. Purta un palton lung, gri, și o pălărie neagră. Avea o mustață mare, albă.' },
        { t: 'Il ne bougeait pas. Il regardait les fenêtres de l’immeuble, très attentivement.', ro: 'Nu se mișca. Se uita la ferestrele blocului, foarte atent.' },
        { br: true, t: 'Le lendemain, l’homme était encore là, à la même heure, au même endroit. Et le jour suivant aussi.', ro: 'A doua zi, bărbatul era din nou acolo, la aceeași oră, în același loc. Și în ziua următoare la fel.' },
        { t: 'Madame Bernard était inquiète. « Il regarde mon appartement ! C’est peut-être un voleur. Il attend le bon moment… »', ro: 'Doamna Bernard era îngrijorată. „Se uită la apartamentul meu! Poate e un hoț. Așteaptă momentul potrivit…”' },
        { t: 'Victor, lui, n’avait pas peur. Il dormait sur le radiateur, comme d’habitude.', ro: 'Victor, în schimb, nu se temea. Dormea pe calorifer, ca de obicei.' },
        { br: true, t: 'Le quatrième soir, Ioana a décidé de parler à l’homme. Elle est descendue avec Julien. Ils avaient un peu peur.', ro: 'În a patra seară, Ioana a hotărât să vorbească cu bărbatul. A coborât cu Julien. Le era puțin frică.' },
        { t: '« Excusez-moi, monsieur. Vous attendez quelqu’un ? »', ro: '„Scuzați-mă, domnule. Așteptați pe cineva?”' },
        { t: 'L’homme a sursauté. Puis il a souri et il a ouvert son manteau. Dessous, il tenait un grand carnet de dessin.', ro: 'Bărbatul a tresărit. Apoi a zâmbit și și-a deschis paltonul. Dedesubt ținea un caiet mare de desen.' },
        { t: '« Pardon, je vous ai fait peur ! Je suis peintre. Je dessine les vieilles maisons de Lyon au coucher du soleil. »', ro: '„Iertați-mă, v-am speriat! Sunt pictor. Desenez casele vechi ale Lyonului la apus.”' },
        { br: true, t: 'Dans le carnet, il y avait un dessin magnifique de leur immeuble. On voyait toutes les fenêtres, les balcons, les fleurs…', ro: 'În caiet era un desen minunat al blocului lor. Se vedeau toate ferestrele, balcoanele, florile…' },
        { t: 'Et sur un balcon, il y avait un petit chat roux qui dormait. C’était Victor !', ro: 'Iar pe un balcon era o pisicuță roșcată care dormea. Era Victor!' },
        { t: '« J’ai grandi dans cet immeuble, a expliqué l’homme. Quand j’étais enfant, j’habitais au troisième étage. Il y avait toujours un chat sur ce balcon. »', ro: '„Am crescut în blocul ăsta, a explicat bărbatul. Când eram copil, locuiam la etajul trei. Pe balconul acela era mereu o pisică.”' },
        { br: true, t: 'Madame Bernard est arrivée à ce moment-là. Elle a regardé l’homme longtemps. Puis elle a crié : « Paul ? Le petit Paul Martin ? »', ro: 'Doamna Bernard a sosit chiar atunci. S-a uitat mult la bărbat. Apoi a strigat: „Paul? Micuțul Paul Martin?”' },
        { t: 'C’était le petit garçon des anciens voisins, qui jouait dans l’escalier il y a cinquante ans !', ro: 'Era băiețelul foștilor vecini, care se juca pe scară acum cincizeci de ani!' },
        { t: 'Ce soir-là, ils ont tous bu un thé chez Madame Bernard, et Paul a offert son dessin. Aujourd’hui, il est accroché dans le salon, au-dessus du radiateur de Victor.', ro: 'În seara aceea au băut toți un ceai la doamna Bernard, iar Paul și-a dăruit desenul. Azi e agățat în sufragerie, deasupra caloriferului lui Victor.' },
      ],
      gloss: { début: 'început', brouillard: 'ceață', rentrait: 'se întorcea', remarqué: 'observat', âgé: 'în vârstă', moustache: 'mustață', bougeait: 'se mișca', attentivement: 'atent', lendemain: 'a doua zi', endroit: 'loc', suivant: 'următor', inquiète: 'îngrijorată', radiateur: 'calorifer', décidé: 'hotărât', sursauté: 'tresărit', dessous: 'dedesubt', tenait: 'ținea', carnet: 'caiet', dessin: 'desen', peintre: 'pictor', dessine: 'desenez', coucher: 'apus („coucher du soleil”)', roux: 'roșcat', grandi: 'crescut', expliqué: 'explicat', anciens: 'foști', escalier: 'scară', accroché: 'agățat', 'au-dessus': 'deasupra', paul: 'Paul (nume)', martin: 'Martin (nume de familie)' },
    },
    questions: [
      { kind: 'choice', q: 'Comment était l’homme ?', options: ['Jeune, avec une barbe noire', 'Âgé, avec une grande moustache blanche', 'Grand, avec une casquette rouge'], answer: 'Âgé, avec une grande moustache blanche' },
      { kind: 'choice', q: 'Que faisait l’homme devant l’immeuble ?', options: ['Il attendait un voleur', 'Il dessinait l’immeuble', 'Il cherchait son chat'], answer: 'Il dessinait l’immeuble' },
      { kind: 'choice', q: 'Qui était Paul Martin ?', options: ['Un policier', 'Le petit garçon des anciens voisins', 'Le frère de Julien'], answer: 'Le petit garçon des anciens voisins' },
      { kind: 'fill', before: 'Victor dormait sur le', after: ', comme d’habitude.', answers: ['radiateur'] },
    ],
  },
}
