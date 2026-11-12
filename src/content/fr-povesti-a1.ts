import type { Story } from './es-povesti'

/** „Povestea capitolului” pentru franceză A1: texte narative care cresc de la ~80 la ~250 de cuvinte. */
export const FR_POVESTI_A1: Record<string, Story> = {
  'fr-cap01': {
    reading: {
      title: 'Victor, le chat de Lyon',
      cast: { Narrateur: 'm' },
      lines: [
        { t: 'Bonjour ! Je m’appelle Victor. Je suis un chat.', ro: 'Bună ziua! Mă numesc Victor. Sunt un motan.' },
        { t: 'Je suis français. Je suis de Lyon, de la rue Mercière.', ro: 'Sunt francez. Sunt din Lyon, de pe strada Mercière.' },
        { br: true, t: 'Ma maîtresse s’appelle Madame Bernard. Elle est de Marseille. Elle est médecin, mais elle est à la retraite.', ro: 'Stăpâna mea se numește doamna Bernard. E din Marsilia. E medic, dar e pensionară.' },
        { t: 'Aujourd’hui, il y a une nouvelle voisine. Elle s’appelle Ioana.', ro: 'Azi avem o vecină nouă. Se numește Ioana.' },
        { t: 'Elle n’est pas française. Elle est roumaine, de Iași.', ro: 'Nu e franțuzoaică. E româncă, din Iași.' },
        { br: true, t: 'Ioana dit : « Bonjour, Madame Bernard ! Ça va ? »', ro: 'Ioana spune: „Bună ziua, doamnă Bernard! Ce mai faceți?”' },
        { t: 'Et moi, je dis : « Miaou ! » Ça veut dire : « Enchanté, Ioana ! »', ro: 'Iar eu spun: „Miau!” Asta înseamnă: „Încântat, Ioana!”' },
      ],
      gloss: { maîtresse: 'stăpână', nouvelle: 'nouă', voisine: 'vecină', dit: '(ea) spune', dis: '(eu) spun', miaou: 'miau', veut: '(din „ça veut dire” = asta înseamnă)', dire: 'a spune', retraite: 'pensie', chat: 'pisică, motan' },
    },
    questions: [
      { kind: 'choice', q: 'Victor est…', options: ['un chien', 'un chat', 'un professeur'], answer: 'un chat' },
      { kind: 'choice', q: 'Madame Bernard est de…', options: ['Lyon', 'Marseille', 'Iași'], answer: 'Marseille' },
      { kind: 'choice', q: 'Ioana est…', options: ['française', 'roumaine', 'italienne'], answer: 'roumaine' },
      { kind: 'fill', before: 'Madame Bernard', after: 'médecin.', answers: ['est'] },
    ],
  },

  'fr-cap02': {
    reading: {
      title: 'La photo de famille',
      cast: { Narrateur: 'm' },
      lines: [
        { t: 'Le soir, Ioana est dans son nouvel appartement. Elle a une photo dans la main.', ro: 'Seara, Ioana e în apartamentul ei nou. Are o fotografie în mână.' },
        { t: 'Sur la photo, il y a sa famille : sa mère, son père et son frère, Radu.', ro: 'În fotografie e familia ei: mama, tatăl și fratele ei, Radu.' },
        { br: true, t: 'Sa mère s’appelle Elena. Elle a cinquante-deux ans. Elle est professeur de chimie.', ro: 'Mama ei se numește Elena. Are cincizeci și doi de ani. E profesoară de chimie.' },
        { t: 'Son père a cinquante-cinq ans. Il est ingénieur. Il a une petite voiture rouge.', ro: 'Tatăl ei are cincizeci și cinci de ani. E inginer. Are o mașină mică, roșie.' },
        { t: 'Radu a dix-neuf ans. Il est étudiant en informatique. Il n’a pas de chambre à lui : il a un petit lit dans le salon !', ro: 'Radu are nouăsprezece ani. E student la informatică. N-are o cameră a lui: are un pat mic în sufragerie!' },
        { br: true, t: 'Ioana regarde la photo. Elle est un peu triste. Sa famille est loin.', ro: 'Ioana se uită la fotografie. E puțin tristă. Familia ei e departe.' },
        { t: 'Mais il y a un bruit à la fenêtre. C’est Victor, le chat de la voisine !', ro: 'Dar se aude un zgomot la fereastră. E Victor, motanul vecinei!' },
        { t: 'Ioana rit : « Bonsoir, Victor. Maintenant, j’ai une famille à Lyon aussi. »', ro: 'Ioana râde: „Bună seara, Victor. Acum am o familie și la Lyon.”' },
      ],
      gloss: { soir: 'seară', dans: 'în', son: 'său, ei (masculin)', sa: 'sa, ei (feminin)', main: 'mână', sur: 'pe', chimie: 'chimie', ingénieur: 'inginer', voiture: 'mașină', rouge: 'roșie', informatique: 'informatică', lit: 'pat', regarde: 'se uită la', triste: 'tristă', loin: 'departe', bruit: 'zgomot', fenêtre: 'fereastră', rit: 'râde', maintenant: 'acum', radu: 'Radu', elena: 'Elena' },
    },
    questions: [
      { kind: 'choice', q: 'La mère de Ioana a quel âge ?', options: ['Quarante-deux ans', 'Cinquante-deux ans', 'Cinquante-cinq ans'], answer: 'Cinquante-deux ans' },
      { kind: 'choice', q: 'Le père de Ioana est…', options: ['professeur', 'ingénieur', 'médecin'], answer: 'ingénieur' },
      { kind: 'choice', q: 'Radu a une chambre ?', options: ['Oui, une grande chambre', 'Non, il a un lit dans le salon'], answer: 'Non, il a un lit dans le salon' },
      { kind: 'fill', before: 'Radu a', after: 'ans.', answers: ['dix-neuf', '19'] },
    ],
  },

  'fr-cap03': {
    reading: {
      title: 'Sophie, la boulangère qui parle vite',
      cast: { Narrateur: 'f' },
      lines: [
        { t: 'Sophie a quarante ans. Elle habite à Lyon depuis toujours. Elle travaille dans une petite boulangerie, rue Saint-Jean.', ro: 'Sophie are patruzeci de ani. Locuiește la Lyon dintotdeauna. Lucrează într-o brutărie mică pe strada Saint-Jean.' },
        { t: 'Elle commence le travail très tôt : à quatre heures du matin ! Elle prépare le pain et les croissants.', ro: 'Începe lucrul foarte devreme: la patru dimineața! Pregătește pâinea și croissanturile.' },
        { br: true, t: 'Sophie adore parler. Elle parle avec tous les clients : les touristes, les étudiants, les vieilles dames du quartier.', ro: 'Sophie adoră să vorbească. Vorbește cu toți clienții: turiștii, studenții, bătrânele din cartier.' },
        { t: 'Mais elle parle très, très vite ! Les touristes ne comprennent pas toujours.', ro: 'Dar vorbește foarte, foarte repede! Turiștii nu înțeleg mereu.' },
        { t: 'Ioana aussi a un problème : le matin, elle comprend seulement « bonjour » et « merci ».', ro: 'Și Ioana are o problemă: dimineața înțelege doar „bonjour” și „merci”.' },
        { br: true, t: 'Un jour, Ioana dit : « Sophie, s’il vous plaît, parlez lentement. Je suis roumaine et j’apprends le français. »', ro: 'Într-o zi, Ioana spune: „Sophie, vă rog, vorbiți rar. Sunt româncă și învăț franceza.”' },
        { t: 'Sophie rit : « Ah, pardon ! Moi, je ne parle pas roumain. Je parle seulement français… et un peu italien, pour les pizzas ! »', ro: 'Sophie râde: „Ah, pardon! Eu nu vorbesc română. Vorbesc doar franceză… și puțin italiană, pentru pizza!”' },
        { t: 'Maintenant, avec Ioana, Sophie parle lentement. Et Ioana comprend tout.', ro: 'Acum, cu Ioana, Sophie vorbește rar. Și Ioana înțelege tot.' },
      ],
      gloss: { depuis: 'de (când)', toujours: 'mereu („depuis toujours” = dintotdeauna)', travail: 'lucru, muncă', tôt: 'devreme', prépare: 'pregătește', clients: 'clienți', vieilles: 'bătrâne', dames: 'doamne', vite: 'repede', comprennent: 'înțeleg', comprend: 'înțelege', seulement: 'doar', problème: 'problemă', jour: 'zi', lentement: 'rar, încet', "j’apprends": 'învăț', pizzas: 'pizza', tout: 'tot', 'saint-jean': 'Saint-Jean (stradă)' },
    },
    questions: [
      { kind: 'choice', q: 'Sophie commence le travail à…', options: ['quatre heures', 'sept heures', 'neuf heures'], answer: 'quatre heures' },
      { kind: 'choice', q: 'Le problème de Sophie, c’est…', options: ['elle parle très vite', 'elle ne parle pas', 'elle parle roumain'], answer: 'elle parle très vite' },
      { kind: 'choice', q: 'Sophie parle quelles langues ?', options: ['Français et roumain', 'Français et un peu italien', 'Français et anglais'], answer: 'Français et un peu italien' },
      { kind: 'fill', before: 'Sophie', after: 'à Lyon depuis toujours.', answers: ['habite'] },
    ],
  },

  'fr-cap04': {
    reading: {
      title: 'Le premier rendez-vous avec le client',
      cast: { Narrateur: 'm' },
      lines: [
        { t: 'Il est dix heures moins le quart. Ioana et Karim vont chez le client, Monsieur Garnier.', ro: 'E zece fără un sfert. Ioana și Karim merg la client, domnul Garnier.' },
        { t: 'Monsieur Garnier a une vieille maison au numéro quatre-vingt-dix-sept, rue de la République. Il veut une nouvelle cuisine et un grand salon.', ro: 'Domnul Garnier are o casă veche la numărul nouăzeci și șapte, pe strada Republicii. Vrea o bucătărie nouă și o sufragerie mare.' },
        { br: true, t: 'Ils vont chez lui en tramway. Le trajet dure quinze minutes.', ro: 'Merg la el cu tramvaiul. Drumul durează cincisprezece minute.' },
        { t: 'Dans le tramway, Karim explique : « Monsieur Garnier est très gentil, mais il parle beaucoup. Le rendez-vous dure toujours deux heures ! »', ro: 'În tramvai, Karim explică: „Domnul Garnier e foarte drăguț, dar vorbește mult. Întâlnirea durează mereu două ore!”' },
        { t: 'À dix heures pile, ils sonnent à la porte. Monsieur Garnier ouvre. Il a soixante-dix-huit ans et un grand sourire.', ro: 'La zece fix, sună la ușă. Domnul Garnier deschide. Are șaptezeci și opt de ani și un zâmbet larg.' },
        { br: true, t: 'Il montre la maison. Il y a onze pièces, trois escaliers et… soixante-quatre fenêtres !', ro: 'Arată casa. Sunt unsprezece camere, trei scări și… șaizeci și patru de ferestre!' },
        { t: 'Ioana compte en roumain dans sa tête. En français, les grands nombres sont encore difficiles pour elle.', ro: 'Ioana numără în română în gând. În franceză, numerele mari sunt încă grele pentru ea.' },
        { t: 'À midi, Monsieur Garnier dit : « Vous restez pour le déjeuner ? Mardi, jeudi, samedi… ici, on mange toujours à midi et demi ! »', ro: 'La prânz, domnul Garnier spune: „Rămâneți la masă? Marți, joi, sâmbătă… aici se mănâncă mereu la douăsprezece și jumătate!”' },
        { t: 'Karim regarde Ioana et sourit : « Je te l’ai dit : deux heures ! »', ro: 'Karim se uită la Ioana și zâmbește: „Ți-am spus: două ore!”' },
      ],
      gloss: { garnier: 'Garnier (nume)', vieille: 'veche', maison: 'casă', veut: 'vrea', tramway: 'tramvai', trajet: 'drum', dure: 'durează', explique: 'explică', gentil: 'drăguț, amabil', 'rendez-vous': 'întâlnire', pile: 'fix', sonnent: 'sună', porte: 'ușă', ouvre: 'deschide', sourire: 'zâmbet', montre: 'arată', pièces: 'camere', escaliers: 'scări', fenêtres: 'ferestre', compte: 'numără', tête: 'cap („dans sa tête” = în gând)', nombres: 'numere', difficiles: 'grele', restez: 'rămâneți', déjeuner: 'prânz', sourit: 'zâmbește', "l’ai": '(din „je te l’ai dit” = ți-am spus)', dit: 'spus / spune' },
    },
    questions: [
      { kind: 'choice', q: 'Ils vont chez le client comment ?', options: ['En métro', 'En tramway', 'À pied'], answer: 'En tramway' },
      { kind: 'choice', q: 'Monsieur Garnier a quel âge ?', options: ['Soixante-huit ans', 'Soixante-dix-huit ans', 'Quatre-vingt-huit ans'], answer: 'Soixante-dix-huit ans' },
      { kind: 'choice', q: 'Il y a combien de fenêtres ?', options: ['Quarante-quatre', 'Soixante-quatre', 'Quatre-vingt-quatre'], answer: 'Soixante-quatre' },
      { kind: 'fill', before: 'Ils sonnent à la porte à dix heures', after: '.', answers: ['pile'] },
    ],
  },

  'fr-cap05': {
    reading: {
      title: 'Le dîner roumain',
      cast: { Narratrice: 'f' },
      lines: [
        { t: 'Samedi, Ioana invite ses nouveaux amis à dîner : Julien, Karim et sa femme Leïla, Sophie et Madame Bernard.', ro: 'Sâmbătă, Ioana își invită prietenii noi la cină: pe Julien, pe Karim și soția lui, Leïla, pe Sophie și pe doamna Bernard.' },
        { t: 'Elle veut préparer un vrai repas roumain. Le matin, elle va au marché. Elle achète de la viande, du chou, du riz, des oignons et de la crème.', ro: 'Vrea să pregătească o masă românească adevărată. Dimineața merge la piață. Cumpără carne, varză, orez, ceapă și smântână.' },
        { br: true, t: 'Le soir, la table est prête. En entrée, il y a de la salade de vinete, une crème d’aubergines.', ro: 'Seara, masa e gata. Ca aperitiv e salată de vinete, o cremă de vinete.' },
        { t: 'En plat principal, des sarmale avec de la polenta et de la crème. Pour le dessert, des papanași, des beignets avec du fromage et de la confiture.', ro: 'Ca fel principal, sarmale cu mămăligă și smântână. La desert, papanași, gogoși cu brânză și dulceață.' },
        { t: 'Karim ne mange pas de porc. Alors Ioana prépare aussi des sarmale au poulet, juste pour lui.', ro: 'Karim nu mănâncă porc. Așa că Ioana pregătește și sarmale cu pui, doar pentru el.' },
        { br: true, t: 'Julien goûte les sarmale. « Mmm ! C’est délicieux ! Qu’est-ce que c’est ? » « Du chou avec de la viande et du riz. »', ro: 'Julien gustă sarmalele. „Mmm! E delicios! Ce e asta?” „Varză cu carne și orez.”' },
        { t: 'Madame Bernard prend encore de la polenta. « En Provence, on mange aussi de la polenta. Mais pas avec de la crème ! »', ro: 'Doamna Bernard mai ia mămăligă. „În Provence se mănâncă și mămăligă. Dar nu cu smântână!”' },
        { t: 'Sophie apporte du pain, bien sûr. Leïla apporte du thé à la menthe.', ro: 'Sophie aduce pâine, bineînțeles. Leïla aduce ceai de mentă.' },
        { br: true, t: 'À minuit, il n’y a plus de papanași. Il n’y a plus de sarmale. Il reste seulement un peu de polenta.', ro: 'La miezul nopții nu mai sunt papanași. Nu mai sunt sarmale. A rămas doar puțină mămăligă.' },
        { t: 'Et sous la table, Victor mange de la viande, discrètement. Lui aussi adore la cuisine roumaine !', ro: 'Iar sub masă, Victor mănâncă carne, pe furiș. Și lui îi place bucătăria românească!' },
      ],
      gloss: { invite: 'invită', préparer: 'a pregăti', vrai: 'adevărat', repas: 'masă (mâncare)', chou: 'varză', riz: 'orez', oignons: 'cepe', crème: 'smântână / cremă', table: 'masă (mobilă)', prête: 'gata', aubergines: 'vinete', principal: 'principal', polenta: 'mămăligă', beignets: 'gogoși', confiture: 'dulceață, gem', porc: 'porc', poulet: 'pui', lui: 'el', goûte: 'gustă', provence: 'Provence (regiune)', apporte: 'aduce', menthe: 'mentă', plus: '(„ne… plus” = nu mai)', reste: 'rămâne', sous: 'sub', discrètement: 'pe furiș', leïla: 'Leïla (nume)', sarmale: 'sarmale', vinete: 'vinete', papanași: 'papanași' },
    },
    questions: [
      { kind: 'choice', q: 'Ioana achète du chou où ?', options: ['Au supermarché', 'Au marché', 'À la boulangerie'], answer: 'Au marché' },
      { kind: 'choice', q: 'Pourquoi Ioana prépare des sarmale au poulet ?', options: ['Karim ne mange pas de porc', 'Julien n’aime pas le chou', 'Il n’y a pas de porc'], answer: 'Karim ne mange pas de porc' },
      { kind: 'choice', q: 'Leïla apporte…', options: ['du pain', 'du vin', 'du thé à la menthe'], answer: 'du thé à la menthe' },
      { kind: 'fill', before: 'À minuit, il n’y a plus', after: 'papanași.', answers: ['de'] },
    ],
  },

  'fr-cap06': {
    reading: {
      title: 'Une journée de Julien',
      cast: { Narrateur: 'm' },
      lines: [
        { t: 'Julien est professeur de musique dans un collège. Sa journée commence tôt.', ro: 'Julien e profesor de muzică la un gimnaziu. Ziua lui începe devreme.' },
        { t: 'Il se réveille à six heures et quart, mais il ne se lève pas tout de suite. Il reste cinq minutes au lit et il écoute la radio.', ro: 'Se trezește la șase și un sfert, dar nu se scoală imediat. Mai stă cinci minute în pat și ascultă radioul.' },
        { br: true, t: 'D’abord, il se douche. Ensuite, il se rase et il s’habille. Il porte toujours une chemise et un pull, jamais de cravate.', ro: 'Mai întâi face duș. Apoi se bărbierește și se îmbracă. Poartă mereu o cămașă și un pulover, niciodată cravată.' },
        { t: 'Au petit-déjeuner, il boit un grand café et il mange une tartine avec du beurre et de la confiture d’abricots, la confiture de sa grand-mère.', ro: 'La micul dejun bea o cafea mare și mănâncă o tartină cu unt și dulceață de caise, dulceața bunicii lui.' },
        { t: 'À sept heures et demie, il part au collège à vélo. Il fait beau ou il pleut, Julien prend toujours son vélo.', ro: 'La șapte și jumătate pleacă la gimnaziu cu bicicleta. Fie că e soare, fie că plouă, Julien ia mereu bicicleta.' },
        { br: true, t: 'Au collège, il a cinq cours par jour. Les élèves chantent, ils jouent de la flûte et du tambour. C’est souvent très bruyant !', ro: 'La gimnaziu are cinci ore pe zi. Elevii cântă, cântă la flaut și la tobă. E adesea foarte gălăgie!' },
        { t: 'À midi, il mange à la cantine avec ses collègues. Le mercredi après-midi, il ne travaille pas : il fait les courses et le ménage.', ro: 'La prânz mănâncă la cantină cu colegii. Miercuri după-amiaza nu lucrează: face cumpărăturile și curățenie.' },
        { br: true, t: 'Le soir, il rentre chez lui et il se repose un peu. Puis, il joue du piano pendant deux heures. C’est sa passion.', ro: 'Seara se întoarce acasă și se odihnește puțin. Apoi cântă la pian două ore. E pasiunea lui.' },
        { t: 'Ses voisins aiment la musique… ou peut-être pas. Ils ne disent jamais rien.', ro: 'Vecinilor lui le place muzica… sau poate nu. Nu spun niciodată nimic.' },
        { t: 'Enfin, vers onze heures, il se couche. Mais ce soir, il ne dort pas tout de suite. Il pense à quelqu’un… une architecte roumaine.', ro: 'În sfârșit, pe la unsprezece, se culcă. Dar diseară nu adoarme imediat. Se gândește la cineva… o arhitectă româncă.' },
      ],
      gloss: { collège: 'gimnaziu', "tout de suite": 'imediat', reste: 'rămâne', lit: 'pat', radio: 'radio', rase: 'bărbierește', porte: 'poartă', cravate: 'cravată', beurre: 'unt', abricots: 'caise', 'grand-mère': 'bunică', part: 'pleacă', vélo: 'bicicletă', beau: 'frumos („il fait beau” = e frumos afară)', pleut: 'plouă', cours: 'ore, lecții', élèves: 'elevi', chantent: 'cântă (cu vocea)', jouent: 'cântă (la instrument)', flûte: 'flaut', tambour: 'tobă', bruyant: 'gălăgios', cantine: 'cantină', ménage: 'curățenie', rentre: 'se întoarce', pendant: 'timp de', passion: 'pasiune', voisins: 'vecini', 'peut-être': 'poate', disent: 'spun', rien: 'nimic', dort: 'doarme', pense: 'se gândește', "quelqu’un": 'cineva' },
    },
    questions: [
      { kind: 'choice', q: 'Julien se lève tout de suite ?', options: ['Oui', 'Non, il reste cinq minutes au lit'], answer: 'Non, il reste cinq minutes au lit' },
      { kind: 'choice', q: 'Julien va au collège comment ?', options: ['En bus', 'À vélo', 'En voiture'], answer: 'À vélo' },
      { kind: 'choice', q: 'Le mercredi après-midi, Julien…', options: ['travaille', 'fait les courses et le ménage', 'joue au football'], answer: 'fait les courses et le ménage' },
      { kind: 'fill', before: 'Julien ne porte jamais de', after: '.', answers: ['cravate'] },
    ],
  },

  'fr-cap07': {
    reading: {
      title: 'Le chat perdu',
      cast: { Narratrice: 'f' },
      lines: [
        { t: 'Un dimanche matin, Madame Bernard frappe à la porte de Ioana. Elle a l’air très inquiète.', ro: 'Într-o duminică dimineața, doamna Bernard bate la ușa Ioanei. Pare foarte îngrijorată.' },
        { t: '« Ioana ! Victor n’est pas à la maison ! Il n’est pas dans le jardin, il n’est pas sur le balcon. Je ne sais pas où il est ! »', ro: '„Ioana! Victor nu e acasă! Nu e în grădină, nu e pe balcon. Nu știu unde e!”' },
        { br: true, t: 'Ioana prend son manteau. « Ne vous inquiétez pas, madame. Venez, on cherche ensemble ! »', ro: 'Ioana își ia paltonul. „Nu vă îngrijorați, doamnă. Veniți, căutăm împreună!”' },
        { t: 'D’abord, elles vont à la boulangerie. Sophie dit : « Victor ? Non, pas ce matin. Allez voir au marché, à côté du fleuve. »', ro: 'Mai întâi merg la brutărie. Sophie spune: „Victor? Nu, nu azi-dimineață. Duceți-vă la piață, lângă fluviu.”' },
        { t: 'Au marché, le vendeur de poisson rit : « Votre chat ? Il vient ici tous les dimanches ! Mais aujourd’hui, il est parti vers la place Saint-Jean. »', ro: 'La piață, vânzătorul de pește râde: „Motanul dumneavoastră? Vine aici în fiecare duminică! Dar azi a plecat spre piața Saint-Jean.”' },
        { br: true, t: 'Elles traversent la rue, tournent à gauche et continuent tout droit jusqu’à la place. Devant la cathédrale, il y a beaucoup de touristes, mais pas de chat.', ro: 'Traversează strada, cotesc la stânga și merg drept înainte până în piață. În fața catedralei sunt mulți turiști, dar nicio pisică.' },
        { t: 'Madame Bernard est fatiguée. Elle s’assoit sur un banc. « Il est peut-être loin maintenant… »', ro: 'Doamna Bernard e obosită. Se așază pe o bancă. „Poate că e departe acum…”' },
        { t: 'Soudain, Ioana entend une voix familière. C’est Julien ! Il est en face, devant un café, avec… Victor dans les bras !', ro: 'Deodată, Ioana aude o voce cunoscută. E Julien! E vizavi, în fața unei cafenele, cu… Victor în brațe!' },
        { br: true, t: '« Il est à vous, ce chat ? Il est dans ce café depuis une heure. Il mange les croissants des clients ! »', ro: '„E al dumneavoastră motanul ăsta? E în cafeneaua asta de o oră. Mănâncă croissanturile clienților!”' },
        { t: 'Madame Bernard prend Victor et l’embrasse. « Méchant chat ! Ne pars plus jamais comme ça ! »', ro: 'Doamna Bernard îl ia pe Victor și îl pupă. „Motan rău! Să nu mai pleci niciodată așa!”' },
        { t: 'Victor ne répond pas. Il a l’air très content. Et il a encore des miettes de croissant sur le nez.', ro: 'Victor nu răspunde. Pare foarte mulțumit. Și mai are firimituri de croissant pe nas.' },
      ],
      gloss: { frappe: 'bate', inquiète: 'îngrijorată', jardin: 'grădină', sais: 'știu', manteau: 'palton', "inquiétez": '(din „ne vous inquiétez pas” = nu vă îngrijorați)', cherche: 'căutăm (cu „on”)', ensemble: 'împreună', voir: 'a vedea', fleuve: 'fluviu', vendeur: 'vânzător', parti: 'plecat', traversent: 'traversează', tournent: 'cotesc', cathédrale: 'catedrală', fatiguée: 'obosită', "s’assoit": 'se așază', banc: 'bancă (de șezut)', soudain: 'deodată', entend: 'aude', voix: 'voce', familière: 'cunoscută', bras: 'brațe', embrasse: 'pupă', méchant: 'rău', pars: 'pleci', comme: 'ca, așa', répond: 'răspunde', content: 'mulțumit', miettes: 'firimituri', nez: 'nas' },
    },
    questions: [
      { kind: 'choice', q: 'Qui dit « Allez voir au marché » ?', options: ['Julien', 'Sophie', 'Le vendeur de poisson'], answer: 'Sophie' },
      { kind: 'choice', q: 'Où est Victor, finalement ?', options: ['Au marché', 'Dans un café', 'Dans la cathédrale'], answer: 'Dans un café' },
      { kind: 'choice', q: 'Qu’est-ce que Victor mange ?', options: ['Du poisson', 'Les croissants des clients', 'Du fromage'], answer: 'Les croissants des clients' },
      { kind: 'fill', before: 'Julien est en', after: ', devant un café.', answers: ['face'] },
    ],
  },

  'fr-cap08': {
    reading: {
      title: 'La veste de Karim',
      cast: { Narrateur: 'm' },
      lines: [
        { t: 'Karim a un problème : samedi prochain, il va au mariage de son cousin Mehdi, à Marseille. Et il n’a pas de costume.', ro: 'Karim are o problemă: sâmbăta viitoare merge la nunta vărului său Mehdi, la Marsilia. Și n-are costum.' },
        { t: 'Il a un vieux costume gris, mais il est trop petit. « Je ne peux pas porter ça ! C’est le costume de mon mariage, il y a dix ans ! »', ro: 'Are un costum vechi, gri, dar e prea mic. „Nu pot să port asta! E costumul de la nunta mea, de acum zece ani!”' },
        { br: true, t: 'Alors, mercredi après-midi, Karim va dans un grand magasin avec Ioana. Ioana a bon goût, dit sa femme Leïla.', ro: 'Așa că miercuri după-amiaza, Karim merge într-un magazin mare cu Ioana. Ioana are gust bun, zice soția lui, Leïla.' },
        { t: 'Le vendeur est très élégant. Il porte une chemise rose et une cravate violette. « Bonjour, monsieur. Je peux vous aider ? »', ro: 'Vânzătorul e foarte elegant. Poartă o cămașă roz și o cravată violet. „Bună ziua, domnule. Vă pot ajuta?”' },
        { t: '« Je cherche un costume pour un mariage. Pas trop cher, s’il vous plaît. »', ro: '„Caut un costum pentru o nuntă. Nu prea scump, vă rog.”' },
        { br: true, t: 'Le vendeur montre un costume noir. Karim l’essaie. « Il est trop sérieux. Je ne vais pas à un enterrement ! »', ro: 'Vânzătorul arată un costum negru. Karim îl probează. „E prea serios. Nu merg la o înmormântare!”' },
        { t: 'Ensuite, un costume bleu clair. Ioana rit : « Avec ce costume, tu ressembles à un marin ! »', ro: 'Apoi, un costum albastru deschis. Ioana râde: „Cu costumul ăsta semeni cu un marinar!”' },
        { t: 'Enfin, le vendeur apporte une belle veste bleu marine et un pantalon gris. Karim sort de la cabine. Ioana et le vendeur disent ensemble : « Parfait ! »', ro: 'În sfârșit, vânzătorul aduce o jachetă frumoasă, bleumarin, și un pantalon gri. Karim iese din cabină. Ioana și vânzătorul spun împreună: „Perfect!”' },
        { br: true, t: '« Ça coûte combien ? » demande Karim. « Deux cent quarante euros pour la veste et le pantalon. »', ro: '„Cât costă?”, întreabă Karim. „Două sute patruzeci de euro pentru jachetă și pantalon.”' },
        { t: 'Karim fait une grimace. C’est cher… Mais il regarde dans le miroir. Il est beau. Vraiment beau.', ro: 'Karim se strâmbă. E scump… Dar se uită în oglindă. E frumos. Cu adevărat frumos.' },
        { t: '« Je les prends. Et cette cravate violette, aussi ! »', ro: '„Le iau. Și cravata asta violet, de asemenea!”' },
        { t: 'Le soir, Leïla regarde la cravate et ne dit rien. Puis elle sourit : « Bon… pour un mariage à Marseille, c’est parfait. »', ro: 'Seara, Leïla se uită la cravată și nu spune nimic. Apoi zâmbește: „Mă rog… pentru o nuntă la Marsilia, e perfectă.”' },
      ],
      gloss: { prochain: 'viitor', mariage: 'nuntă / căsătorie', cousin: 'văr', mehdi: 'Mehdi (nume)', costume: 'costum', gris: 'gri', porter: 'a purta', 'il y a': 'acum (cu timp: „il y a dix ans” = acum zece ani)', goût: 'gust', élégant: 'elegant', rose: 'roz', cravate: 'cravată', violette: 'violet', montre: 'arată', "l’essaie": 'îl probează', sérieux: 'serios', enterrement: 'înmormântare', clair: 'deschis (culoare)', ressembles: 'semeni', marin: 'marinar', marine: 'bleumarin („bleu marine”)', sort: 'iese', demande: 'întreabă', grimace: 'strâmbătură', miroir: 'oglindă', vraiment: 'cu adevărat', sourit: 'zâmbește' },
    },
    questions: [
      { kind: 'choice', q: 'Karim va à quel événement ?', options: ['Un concert', 'Un mariage', 'Un enterrement'], answer: 'Un mariage' },
      { kind: 'choice', q: 'Pourquoi Karim ne porte pas son vieux costume ?', options: ['Il est trop petit', 'Il est rouge', 'Il est à Marseille'], answer: 'Il est trop petit' },
      { kind: 'choice', q: 'Combien coûtent la veste et le pantalon ?', options: ['Cent quarante euros', 'Deux cent quarante euros', 'Quatre cents euros'], answer: 'Deux cent quarante euros' },
      { kind: 'fill', before: 'Karim achète aussi la cravate', after: '.', answers: ['violette'] },
    ],
  },

  'fr-cap09': {
    reading: {
      title: 'Un week-end à Annecy',
      cast: { Narratrice: 'f' },
      lines: [
        { t: 'Samedi matin, il fait beau mais froid. Julien et Ioana prennent la voiture de Julien, une vieille Renault bleue.', ro: 'Sâmbătă dimineață e frumos, dar frig. Julien și Ioana iau mașina lui Julien, un Renault vechi, albastru.' },
        { t: 'Après une heure de route, ils arrivent à Annecy. Le lac est bleu turquoise et les montagnes sont déjà blanches en haut.', ro: 'După o oră de drum ajung la Annecy. Lacul e albastru-turcoaz, iar munții sunt deja albi în vârf.' },
        { br: true, t: 'Les parents de Julien habitent dans une petite maison avec un jardin. Son père, Pierre, est boulanger. Sa mère, Brigitte, est infirmière.', ro: 'Părinții lui Julien locuiesc într-o căsuță cu grădină. Tatăl lui, Pierre, e brutar. Mama lui, Brigitte, e asistentă.' },
        { t: 'Brigitte embrasse Ioana deux fois, sur les deux joues. « Bienvenue ! Vous avez faim ? Il fait froid, je vais faire du thé. »', ro: 'Brigitte o pupă pe Ioana de două ori, pe ambii obraji. „Bun venit! Vă e foame? E frig, o să fac un ceai.”' },
        { t: 'Manon, la petite sœur de Julien, regarde Ioana avec curiosité. « Tu es la copine de mon frère ? » Julien devient tout rouge.', ro: 'Manon, sora mai mică a lui Julien, se uită la Ioana cu curiozitate. „Tu ești prietena fratelui meu?” Julien se face roșu tot.' },
        { br: true, t: 'L’après-midi, Julien et Ioana font le tour du lac à vélo. Il y a du soleil, mais il y a aussi du vent. Ioana a froid aux mains.', ro: 'După-amiaza, Julien și Ioana fac turul lacului cu bicicleta. E soare, dar bate și vântul. Ioanei îi e frig la mâini.' },
        { t: 'Ils s’arrêtent dans un petit café et boivent un chocolat chaud. « C’est l’automne ici, mais à Iași, c’est déjà presque l’hiver », dit Ioana.', ro: 'Se opresc la o cafenea mică și beau o ciocolată caldă. „Aici e toamnă, dar la Iași e deja aproape iarnă”, spune Ioana.' },
        { br: true, t: 'Le soir, Brigitte sert la tartiflette. Tout le monde mange beaucoup. Pierre parle de son pain, Manon parle de son lycée, Pompon le chien dort près de la cheminée.', ro: 'Seara, Brigitte servește tartiflette. Toată lumea mănâncă mult. Pierre vorbește despre pâinea lui, Manon despre liceul ei, iar câinele Pompon doarme lângă șemineu.' },
        { t: 'Dehors, il commence à pleuvoir. Ioana écoute la pluie et sourit. Elle se sent comme à la maison.', ro: 'Afară începe să plouă. Ioana ascultă ploaia și zâmbește. Se simte ca acasă.' },
        { t: 'Avant de dormir, Pierre dit : « Demain, il va neiger sur le Semnoz. Vous allez voir la première neige ! »', ro: 'Înainte de culcare, Pierre spune: „Mâine o să ningă pe Semnoz. O să vedeți prima zăpadă!”' },
      ],
      gloss: { voiture: 'mașină', renault: 'Renault (marcă de mașini)', route: 'drum, șosea', arrivent: 'ajung', turquoise: 'turcoaz', haut: 'sus („en haut” = în vârf)', pierre: 'Pierre (nume)', brigitte: 'Brigitte (nume)', infirmière: 'asistentă medicală', embrasse: 'pupă', joues: 'obraji', faim: 'foame', curiosité: 'curiozitate', copine: 'prietenă (iubită)', devient: 'devine', mains: 'mâini', "s’arrêtent": 'se opresc', presque: 'aproape', sert: 'servește', monde: 'lume („tout le monde” = toată lumea)', lycée: 'liceu', cheminée: 'șemineu', dehors: 'afară', sourit: 'zâmbește', sent: 'simte', avant: 'înainte', voir: 'a vedea', première: 'prima' },
    },
    questions: [
      { kind: 'choice', q: 'Le père de Julien est…', options: ['infirmier', 'boulanger', 'professeur'], answer: 'boulanger' },
      { kind: 'choice', q: 'Qui demande « Tu es la copine de mon frère ? »', options: ['Brigitte', 'Manon', 'Pierre'], answer: 'Manon' },
      { kind: 'choice', q: 'Qu’est-ce qu’ils boivent au café ?', options: ['Un café', 'Un chocolat chaud', 'Du thé'], answer: 'Un chocolat chaud' },
      { kind: 'fill', before: 'Demain, il va', after: 'sur le Semnoz.', answers: ['neiger'] },
    ],
  },

  'fr-cap10': {
    reading: {
      title: 'La photo en noir et blanc',
      cast: { Narratrice: 'f' },
      lines: [
        { t: 'Mardi soir, Ioana apporte un morceau de gâteau à Madame Bernard. La vieille dame l’invite à boire un thé.', ro: 'Marți seara, Ioana îi duce doamnei Bernard o bucată de prăjitură. Bătrâna doamnă o invită la un ceai.' },
        { t: 'Sur le buffet, il y a une photo en noir et blanc : un jeune homme avec une moustache et une jeune femme avec une robe à fleurs.', ro: 'Pe bufet e o fotografie alb-negru: un tânăr cu mustață și o tânără cu o rochie înflorată.' },
        { br: true, t: '« C’est vous, madame ? » demande Ioana. « Oui, c’est moi, en 1971. Et c’est Henri, mon mari. »', ro: '„Sunteți dumneavoastră, doamnă?”, întreabă Ioana. „Da, eu sunt, în 1971. Și el e Henri, soțul meu.”' },
        { t: 'Madame Bernard sourit et raconte. « J’ai rencontré Henri à Marseille, sur le port. J’ai eu vingt ans cet été-là. »', ro: 'Doamna Bernard zâmbește și povestește. „L-am cunoscut pe Henri la Marsilia, în port. În vara aceea am împlinit douăzeci de ani.”' },
        { t: '« Il a travaillé sur un bateau. Il a vu l’Afrique, l’Amérique, l’Asie… Il a appris l’anglais, l’espagnol et même un peu de japonais ! »', ro: '„Lucra pe un vapor. A văzut Africa, America, Asia… A învățat engleza, spaniola și chiar puțină japoneză!”' },
        { br: true, t: '« Un jour, il a acheté deux glaces et il m’a demandé : “Vous aimez la vanille ou le chocolat ?” J’ai choisi le chocolat. »', ro: '„Într-o zi a cumpărat două înghețate și m-a întrebat: «Vă place vanilia sau ciocolata?» Eu am ales ciocolata.”' },
        { t: '« Pendant un an, il a écrit beaucoup de lettres. J’ai lu chaque lettre dix fois ! »', ro: '„Un an întreg mi-a scris multe scrisori. Am citit fiecare scrisoare de zece ori!”' },
        { t: '« En 1973, nous avons eu notre fille, Isabelle. Ensuite, Henri a trouvé un travail à Lyon, et nous avons acheté cet appartement. »', ro: '„În 1973 am avut-o pe fiica noastră, Isabelle. Apoi Henri și-a găsit de lucru la Lyon și am cumpărat apartamentul acesta.”' },
        { br: true, t: 'Ioana regarde la photo. « Et Henri, maintenant ? » Madame Bernard pose sa tasse. « Il nous a quittés il y a cinq ans. »', ro: 'Ioana se uită la fotografie. „Și Henri, acum?” Doamna Bernard își pune ceașca jos. „Ne-a părăsit acum cinci ani.”' },
        { t: 'Pendant un moment, elles n’ont rien dit. Puis Madame Bernard a souri : « Mais j’ai eu une très belle vie. Et maintenant, j’ai Victor… et une voisine roumaine ! »', ro: 'O vreme n-au spus nimic. Apoi doamna Bernard a zâmbit: „Dar am avut o viață foarte frumoasă. Și acum îl am pe Victor… și o vecină româncă!”' },
        { t: 'Ce soir-là, Ioana a pensé longtemps à Henri, aux lettres et à la glace au chocolat.', ro: 'În seara aceea, Ioana s-a gândit mult la Henri, la scrisori și la înghețata de ciocolată.' },
      ],
      gloss: { morceau: 'bucată', "l’invite": 'o invită', buffet: 'bufet', noir: 'negru („en noir et blanc” = alb-negru)', moustache: 'mustață', fleurs: 'flori („robe à fleurs” = rochie înflorată)', demande: 'întreabă', henri: 'Henri (nume)', mari: 'soț', raconte: 'povestește', rencontré: 'întâlnit, cunoscut', port: 'port', 'cet été-là': 'în vara aceea', bateau: 'vapor, barcă', appris: 'învățat', même: 'chiar', glaces: 'înghețate', vanille: 'vanilie', choisi: 'ales', lettres: 'scrisori', chaque: 'fiecare', notre: 'noastră', isabelle: 'Isabelle (nume)', trouvé: 'găsit', pose: 'pune jos', tasse: 'ceașcă', quittés: 'părăsit („il nous a quittés” = a murit)', vie: 'viață', pensé: 'gândit', longtemps: 'mult timp' },
    },
    questions: [
      { kind: 'choice', q: 'Madame Bernard a rencontré Henri où ?', options: ['À Lyon', 'À Marseille', 'À Paris'], answer: 'À Marseille' },
      { kind: 'choice', q: 'Henri a travaillé…', options: ['dans une boulangerie', 'sur un bateau', 'dans un hôpital'], answer: 'sur un bateau' },
      { kind: 'choice', q: 'Madame Bernard a choisi quelle glace ?', options: ['Vanille', 'Chocolat', 'Fraise'], answer: 'Chocolat' },
      { kind: 'fill', before: 'Henri a écrit beaucoup de', after: '.', answers: ['lettres'] },
    ],
  },

  'fr-cap11': {
    reading: {
      title: 'Radu arrive à Lyon',
      cast: { Narratrice: 'f' },
      lines: [
        { t: 'Un vendredi de novembre, Radu, le petit frère de Ioana, est venu à Lyon pour la première fois. Il a pris l’avion à Iași à six heures du matin.', ro: 'Într-o vineri din noiembrie, Radu, fratele mai mic al Ioanei, a venit pentru prima dată la Lyon. A luat avionul de la Iași la șase dimineața.' },
        { t: 'Mais le voyage a été long. Il est d’abord allé à Munich. Là, son deuxième avion est parti avec deux heures de retard.', ro: 'Dar călătoria a fost lungă. Mai întâi a mers la München. Acolo, al doilea avion a plecat cu două ore întârziere.' },
        { br: true, t: 'Ioana est arrivée à l’aéroport à midi. Elle a attendu. Une heure, deux heures, trois heures… Elle a bu trois cafés et elle a lu tout un journal.', ro: 'Ioana a ajuns la aeroport la prânz. A așteptat. O oră, două ore, trei ore… A băut trei cafele și a citit un ziar întreg.' },
        { t: 'Enfin, à quinze heures, Radu est sorti avec un énorme sac à dos. « Salut, sœurette ! Je suis mort de faim ! »', ro: 'În sfârșit, la ora cincisprezece, Radu a ieșit cu un rucsac uriaș. „Salut, surioară! Mor de foame!”' },
        { t: 'Ils sont rentrés en ville en tramway. Radu a regardé par la fenêtre tout le temps. « C’est beau, ici ! Plus beau qu’à la télé ! »', ro: 'S-au întors în oraș cu tramvaiul. Radu s-a uitat tot timpul pe fereastră. „E frumos aici! Mai frumos decât la televizor!”' },
        { br: true, t: 'Le samedi, ils sont montés à Fourvière, la colline avec la grande basilique blanche. Ils sont restés une heure en haut, devant la vue sur toute la ville.', ro: 'Sâmbătă au urcat pe Fourvière, dealul cu bazilica mare, albă. Au stat o oră sus, în fața priveliștii asupra întregului oraș.' },
        { t: 'Ensuite, ils sont descendus à pied par les petites rues du Vieux Lyon. Radu est entré dans toutes les boutiques de bonbons.', ro: 'Apoi au coborât pe jos pe străduțele din Vieux Lyon. Radu a intrat în toate magazinele de bomboane.' },
        { t: 'Le soir, Julien est venu dîner. Radu et Julien ont parlé de football pendant deux heures, en anglais, en français et avec les mains.', ro: 'Seara, Julien a venit la cină. Radu și Julien au vorbit despre fotbal două ore, în engleză, în franceză și cu mâinile.' },
        { br: true, t: 'Dimanche matin, Ioana s’est réveillée tôt. Radu n’était pas dans le salon ! Elle est sortie sur le palier, inquiète.', ro: 'Duminică dimineață, Ioana s-a trezit devreme. Radu nu era în sufragerie! A ieșit pe palier, îngrijorată.' },
        { t: 'La porte de Madame Bernard était ouverte. Radu était là, assis dans la cuisine, avec Victor sur les genoux et un croissant dans la main.', ro: 'Ușa doamnei Bernard era deschisă. Radu era acolo, așezat în bucătărie, cu Victor în brațe și un croissant în mână.' },
        { t: '« Bonjour, Ioana ! » a dit Madame Bernard. « Ton frère est descendu à sept heures. Il parle très mal français, mais il mange très bien ! »', ro: '„Bună ziua, Ioana!”, a spus doamna Bernard. „Fratele tău a coborât la șapte. Vorbește foarte prost franceză, dar mănâncă foarte bine!”' },
      ],
      gloss: { novembre: 'noiembrie', munich: 'München', retard: 'întârziere', "l’aéroport": 'aeroportul', attendu: 'așteptat', énorme: 'uriaș', 'sac à dos': 'rucsac', sœurette: 'surioară', mort: 'mort („mort de faim” = mort de foame)', rentrés: 'întorși', fourvière: 'Fourvière (dealul din Lyon)', colline: 'deal', basilique: 'bazilică', restés: 'rămași', descendus: 'coborâți', entré: 'intrat', boutiques: 'magazine', bonbons: 'bomboane', football: 'fotbal', mains: 'mâini', "s’est réveillée": 's-a trezit', "n’était": 'nu era', palier: 'palier', inquiète: 'îngrijorată', ouverte: 'deschisă', assis: 'așezat', genoux: 'genunchi („sur les genoux” = în brațe, pe genunchi)', mal: 'prost, rău' },
    },
    questions: [
      { kind: 'choice', q: 'Le deuxième avion de Radu est parti…', options: ['à l’heure', 'avec deux heures de retard', 'en avance'], answer: 'avec deux heures de retard' },
      { kind: 'choice', q: 'Samedi, ils sont montés à…', options: ['la tour Eiffel', 'Fourvière', 'Annecy'], answer: 'Fourvière' },
      { kind: 'choice', q: 'Dimanche matin, Radu était…', options: ['dans le salon', 'chez Madame Bernard', 'à la boulangerie'], answer: 'chez Madame Bernard' },
      { kind: 'fill', before: 'Radu est', after: 'avec un énorme sac à dos.', answers: ['sorti'] },
    ],
  },

  'fr-cap12': {
    reading: {
      title: 'Trois mois à Lyon',
      cast: { Narratrice: 'f' },
      lines: [
        { t: 'Le soir de son anniversaire, Ioana est rentrée chez elle à minuit. Elle n’a pas tout de suite ouvert le cadeau de Julien. D’abord, elle a pris son vieux carnet.', ro: 'În seara zilei ei, Ioana s-a întors acasă la miezul nopții. N-a deschis imediat cadoul lui Julien. Mai întâi și-a luat carnețelul vechi.' },
        { t: 'Dans ce carnet, elle a écrit des mots en français depuis son arrivée. À la première page, il y a seulement : « bonjour, merci, au revoir, je ne comprends pas ».', ro: 'În carnețelul acesta a scris cuvinte în franceză de când a sosit. Pe prima pagină sunt doar: „bonjour, merci, au revoir, je ne comprends pas”.' },
        { br: true, t: 'Elle a relu les pages et elle a souri. En septembre, elle a eu peur de tout : du téléphone, de la boulangère, des réunions au bureau.', ro: 'A recitit paginile și a zâmbit. În septembrie îi era frică de tot: de telefon, de brutăreasă, de ședințele de la birou.' },
        { t: 'Elle s’est souvenue de son premier jour à l’Atelier Rhône. Elle n’a pas compris les nombres de Nathalie. Quatre-vingt-dix-sept ! Aujourd’hui, elle compte jusqu’à cent sans problème.', ro: 'Și-a amintit de prima ei zi la Atelier Rhône. N-a înțeles numerele lui Nathalie. Nouăzeci și șapte! Azi numără până la o sută fără probleme.' },
        { t: 'Elle a pensé à Sophie, qui parle maintenant lentement pour elle, à Karim et à ses blagues, à Madame Bernard et à son chat gourmand.', ro: 'S-a gândit la Sophie, care acum vorbește rar pentru ea, la Karim și glumele lui, la doamna Bernard și motanul ei pofticios.' },
        { br: true, t: 'Elle a pensé à Annecy, au lac turquoise, à la tartiflette de Brigitte, à la neige sur le Semnoz. Et à la main de Julien, au sommet.', ro: 'S-a gândit la Annecy, la lacul turcoaz, la tartiflette-ul lui Brigitte, la zăpada de pe Semnoz. Și la mâna lui Julien, în vârf.' },
        { t: 'En trois mois, sa vie a beaucoup changé. Elle a un travail, un appartement, des amis. Elle rêve même en français, parfois !', ro: 'În trei luni, viața ei s-a schimbat mult. Are un loc de muncă, un apartament, prieteni. Uneori chiar visează în franceză!' },
        { t: 'Bien sûr, elle fait encore des erreurs. Elle confond « le » et « la ». Elle oublie le « ne » de la négation. Elle dit « je suis allé » au lieu de « je suis allée ».', ro: 'Bineînțeles, încă face greșeli. Încurcă „le” și „la”. Uită „ne”-ul din negație. Spune „je suis allé” în loc de „je suis allée”.' },
        { br: true, t: 'Mais les Français la comprennent. Et elle, elle comprend les Français. C’est l’essentiel.', ro: 'Dar francezii o înțeleg. Iar ea îi înțelege pe francezi. Asta e esențialul.' },
        { t: 'À la dernière page du carnet, elle a écrit une nouvelle phrase : « Je suis heureuse ici. » Puis, elle a ajouté : « L’année prochaine, je vais passer le DELF B1. »', ro: 'Pe ultima pagină a carnețelului a scris o propoziție nouă: „Sunt fericită aici.” Apoi a adăugat: „Anul viitor o să dau DELF B1.”' },
        { t: 'Enfin, elle a pris la boîte de Julien. Ses mains ont tremblé un peu. Elle a ouvert le papier rouge, très lentement…', ro: 'În sfârșit, a luat cutia lui Julien. Mâinile i-au tremurat puțin. A desfăcut hârtia roșie, foarte încet…' },
        { t: 'Victor, sur le balcon, a regardé par la fenêtre. Lui, il sait déjà ce qu’il y a dans la boîte. Mais il ne va rien dire.', ro: 'Victor, pe balcon, s-a uitat pe fereastră. El știe deja ce e în cutie. Dar n-o să spună nimic.' },
      ],
      gloss: { carnet: 'carnețel', mots: 'cuvinte', arrivée: 'sosire', page: 'pagină', relu: 'recitit', souri: 'zâmbit', peur: 'frică („avoir peur de” = a-i fi frică de)', "s’est souvenue": 'și-a amintit', nombres: 'numere', compte: 'numără', sans: 'fără', blagues: 'glume', gourmand: 'pofticios', changé: 'schimbat', rêve: 'visează', erreurs: 'greșeli', confond: 'încurcă', oublie: 'uită', négation: 'negație', 'au lieu de': 'în loc de', comprennent: 'înțeleg', essentiel: 'esențial', phrase: 'propoziție', ajouté: 'adăugat', passer: 'a da (un examen)', tremblé: 'tremurat', papier: 'hârtie', sait: 'știe' },
    },
    questions: [
      { kind: 'choice', q: 'Qu’est-ce que Ioana a fait d’abord ?', options: ['Elle a ouvert le cadeau', 'Elle a pris son vieux carnet', 'Elle a appelé sa mère'], answer: 'Elle a pris son vieux carnet' },
      { kind: 'choice', q: 'En septembre, Ioana a eu peur…', options: ['de tout', 'des chats', 'de la mer'], answer: 'de tout' },
      { kind: 'choice', q: 'Quelle erreur Ioana fait encore ?', options: ['Elle oublie le « ne » de la négation', 'Elle ne parle pas', 'Elle parle trop vite'], answer: 'Elle oublie le « ne » de la négation' },
      { kind: 'fill', before: 'L’année prochaine, je vais', after: 'le DELF B1.', answers: ['passer'] },
    ],
  },
}
