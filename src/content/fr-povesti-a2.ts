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
}
