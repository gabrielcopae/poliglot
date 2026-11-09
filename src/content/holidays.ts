import type { LangCode } from './types'

/** Sărbători din lumea limbilor din curs. rule: zi fixă (m, d) sau „a n-a zi X din lună” / „ultima zi X din lună”. */
export interface Holiday {
  id: string
  lang: LangCode
  emoji: string
  name: string
  local: string
  where: string
  m: number
  d?: number
  /** zi a săptămânii (0 = duminică) pentru sărbătorile mobile */
  weekday?: number
  nth?: number | 'last'
  fact: string
  words: { t: string; ro: string }[]
}

export const HOLIDAYS: Holiday[] = [
  // ——— Spaniolă ———
  { id: 'reyes', lang: 'es', emoji: '👑', name: 'Ziua Regilor Magi', local: 'Día de Reyes', where: 'Spania și America Latină', m: 1, d: 6,
    fact: 'În Spania, mulți copii primesc cadourile nu de Crăciun, ci pe 6 ianuarie, de la cei trei Regi Magi. Se mănâncă „roscón de Reyes”, un colac cu o figurină ascunsă înăuntru.',
    words: [{ t: 'los Reyes Magos', ro: 'Regii Magi' }, { t: 'el roscón', ro: 'colacul' }, { t: 'el regalo', ro: 'cadoul' }] },
  { id: 'fallas', lang: 'es', emoji: '🔥', name: 'Las Fallas', local: 'Las Fallas', where: 'Valencia, Spania', m: 3, d: 19,
    fact: 'Timp de câteva zile, străzile Valenciei se umplu de statui uriașe din carton și lemn, „fallas”. În noaptea de 19 martie, la „la cremà”, aproape toate sunt arse.',
    words: [{ t: 'el fuego', ro: 'focul' }, { t: 'los petardos', ro: 'petardele' }, { t: 'quemar', ro: 'a arde' }] },
  { id: 'santjordi', lang: 'es', emoji: '🌹', name: 'Sant Jordi și Ziua Cărții', local: 'Sant Jordi / Día del Libro', where: 'Barcelona și toată Spania', m: 4, d: 23,
    fact: 'În Catalonia, de Sfântul Gheorghe, oamenii își dăruiesc un trandafir și o carte. 23 aprilie e și ziua în care se comemorează moartea lui Cervantes.',
    words: [{ t: 'la rosa', ro: 'trandafirul' }, { t: 'el libro', ro: 'cartea' }, { t: 'el dragón', ro: 'balaurul' }] },
  { id: 'sanfermin', lang: 'es', emoji: '🐂', name: 'San Fermín', local: 'San Fermín', where: 'Pamplona, Spania', m: 7, d: 7,
    fact: 'Începând cu 7 iulie, în fiecare dimineață, la „el encierro”, oamenii aleargă pe străzi în fața taurilor. Toată lumea poartă alb și o eșarfă roșie.',
    words: [{ t: 'el toro', ro: 'taurul' }, { t: 'correr', ro: 'a alerga' }, { t: 'el pañuelo rojo', ro: 'eșarfa roșie' }] },
  { id: 'tomatina', lang: 'es', emoji: '🍅', name: 'La Tomatina', local: 'La Tomatina', where: 'Buñol, Spania', m: 8, weekday: 3, nth: 'last',
    fact: 'În ultima miercuri din august, mii de oameni se aruncă unii în alții cu roșii, pe străzile micului oraș Buñol, timp de o oră.',
    words: [{ t: 'el tomate', ro: 'roșia' }, { t: 'lanzar', ro: 'a arunca' }, { t: 'la fiesta', ro: 'petrecerea' }] },
  { id: 'grito', lang: 'es', emoji: '🇲🇽', name: 'Ziua Independenței Mexicului', local: 'Día de la Independencia', where: 'Mexic', m: 9, d: 16,
    fact: 'În noaptea de 15 spre 16 septembrie, președintele repetă „el Grito” de la balcon, iar mulțimea strigă „¡Viva México!”.',
    words: [{ t: 'el grito', ro: 'strigătul' }, { t: 'la independencia', ro: 'independența' }, { t: '¡Viva México!', ro: 'Trăiască Mexicul!' }] },
  { id: 'hispanidad', lang: 'es', emoji: '🌎', name: 'Ziua Hispanității', local: 'Día de la Hispanidad', where: 'Spania și America Latină', m: 10, d: 12,
    fact: 'Pe 12 octombrie 1492, corăbiile lui Columb au ajuns în America. Azi e o zi a lumii hispanice, a celor aproape 500 de milioane de vorbitori de spaniolă nativi.',
    words: [{ t: 'el barco', ro: 'corabia' }, { t: 'el idioma', ro: 'limba' }, { t: 'el mundo', ro: 'lumea' }] },
  { id: 'muertos', lang: 'es', emoji: '💀', name: 'Ziua Morților', local: 'Día de Muertos', where: 'Mexic', m: 11, d: 2,
    fact: 'Pe 1 și 2 noiembrie, mexicanii își amintesc cu bucurie de cei dragi care au murit: fac altare cu flori portocalii, lumânări, fotografii și „pan de muerto”.',
    words: [{ t: 'la calavera', ro: 'craniul (decorat)' }, { t: 'la ofrenda', ro: 'altarul cu daruri' }, { t: 'la vela', ro: 'lumânarea' }] },
  { id: 'nochebuena', lang: 'es', emoji: '🎄', name: 'Ajunul Crăciunului', local: 'Nochebuena', where: 'Spania și America Latină', m: 12, d: 24,
    fact: '„Nochebuena” înseamnă „Noaptea cea Bună”: familia cinează împreună, iar în multe țări din America Latină cadourile se deschid la miezul nopții.',
    words: [{ t: 'la cena', ro: 'cina' }, { t: 'la familia', ro: 'familia' }, { t: '¡Feliz Navidad!', ro: 'Crăciun fericit!' }] },
  { id: 'inocentes', lang: 'es', emoji: '🤡', name: 'Ziua Păcălelilor', local: 'Día de los Santos Inocentes', where: 'Spania și America Latină', m: 12, d: 28,
    fact: 'E „1 aprilie” al lumii hispanice: pe 28 decembrie oamenii își fac farse, numite „inocentadas”, iar chiar și ziarele publică știri false, în glumă.',
    words: [{ t: 'la broma', ro: 'gluma, farsa' }, { t: 'la inocentada', ro: 'păcăleala' }, { t: '¡Inocente!', ro: 'Te-am păcălit!' }] },
  { id: 'uvas', lang: 'es', emoji: '🍇', name: 'Revelionul cu 12 struguri', local: 'Nochevieja', where: 'Spania', m: 12, d: 31,
    fact: 'La miezul nopții, spaniolii mănâncă 12 boabe de strugure, câte una la fiecare bătaie a ceasului din Puerta del Sol. Dacă reușești, ai noroc tot anul.',
    words: [{ t: 'las uvas', ro: 'strugurii' }, { t: 'la medianoche', ro: 'miezul nopții' }, { t: '¡Feliz Año Nuevo!', ro: 'La mulți ani! (de Anul Nou)' }] },

  // ——— Japoneză ———
  { id: 'shogatsu', lang: 'ja', emoji: '🎍', name: 'Anul Nou japonez', local: 'お正月 (Oshōgatsu)', where: 'Japonia', m: 1, d: 1,
    fact: 'E cea mai importantă sărbătoare: familia mănâncă „おせち”, copiii primesc bani în plicuri, „お年玉” (otoshidama), și se merge la templu.',
    words: [{ t: 'あけまして おめでとう', ro: 'La mulți ani! (de Anul Nou)' }, { t: 'おとしだま', ro: 'banii primiți de copii' }, { t: 'おせち', ro: 'mâncarea de Anul Nou' }] },
  { id: 'seijin', lang: 'ja', emoji: '👘', name: 'Ziua Majoratului', local: '成人の日 (Seijin no hi)', where: 'Japonia', m: 1, weekday: 1, nth: 2,
    fact: 'În a doua luni din ianuarie, tinerii care devin adulți merg la ceremonii în chimonouri și costume elegante.',
    words: [{ t: 'せいじん', ro: 'adult' }, { t: 'きもの', ro: 'chimono' }, { t: 'おめでとう', ro: 'felicitări' }] },
  { id: 'setsubun', lang: 'ja', emoji: '👹', name: 'Setsubun', local: '節分 (Setsubun)', where: 'Japonia', m: 2, d: 3,
    fact: 'Se aruncă boabe de soia prin casă strigând „鬼は外、福は内” (Demonii afară, norocul înăuntru!).',
    words: [{ t: 'おに', ro: 'demon' }, { t: 'まめ', ro: 'boabe' }, { t: 'ふく', ro: 'noroc' }] },
  { id: 'hina', lang: 'ja', emoji: '🎎', name: 'Ziua Fetelor', local: 'ひな祭り (Hinamatsuri)', where: 'Japonia', m: 3, d: 3,
    fact: 'Familiile cu fetițe expun păpuși îmbrăcate ca o curte imperială veche și le urează sănătate și noroc.',
    words: [{ t: 'にんぎょう', ro: 'păpușă' }, { t: 'おんなのこ', ro: 'fetiță' }, { t: 'まつり', ro: 'festival' }] },
  { id: 'hanami', lang: 'ja', emoji: '🌸', name: 'Privitul cireșilor (aproximativ)', local: 'お花見 (Ohanami)', where: 'toată Japonia', m: 4, d: 1,
    fact: 'Pe la sfârșitul lui martie și începutul lui aprilie, japonezii fac picnicuri sub cireșii înfloriți. Televiziunile anunță zilnic „frontul florilor de cireș”.',
    words: [{ t: 'さくら', ro: 'cireș, floare de cireș' }, { t: 'はなみ', ro: 'privitul florilor' }, { t: 'きれい', ro: 'frumos' }] },
  { id: 'kodomo', lang: 'ja', emoji: '🎏', name: 'Ziua Copiilor', local: 'こどもの日 (Kodomo no hi)', where: 'Japonia', m: 5, d: 5,
    fact: 'Pe case se înalță steaguri în formă de crap, „こいのぼり”: crapul care urcă râul împotriva curentului e simbolul puterii.',
    words: [{ t: 'こども', ro: 'copil' }, { t: 'こいのぼり', ro: 'steagul-crap' }, { t: 'げんき', ro: 'sănătos, plin de viață' }] },
  { id: 'tanabata', lang: 'ja', emoji: '🎋', name: 'Festivalul Stelelor', local: '七夕 (Tanabata)', where: 'Japonia', m: 7, d: 7,
    fact: 'Legenda spune că doi îndrăgostiți despărțiți de Calea Lactee se întâlnesc o dată pe an. Oamenii își scriu dorințele pe hârtiuțe, „たんざく”, și le agață de bambus.',
    words: [{ t: 'ほし', ro: 'stea' }, { t: 'ねがい', ro: 'dorință' }, { t: 'たけ', ro: 'bambus' }] },
  { id: 'obon', lang: 'ja', emoji: '🏮', name: 'Obon', local: 'お盆 (Obon)', where: 'Japonia', m: 8, d: 13,
    fact: 'Pe la jumătatea lui august, japonezii merg acasă la familie ca să-și cinstească strămoșii; se aprind felinare și se dansează „ぼんおどり”.',
    words: [{ t: 'かぞく', ro: 'familie' }, { t: 'ちょうちん', ro: 'felinar' }, { t: 'おどり', ro: 'dans' }] },
  { id: 'shichigosan', lang: 'ja', emoji: '🍬', name: 'Șapte-Cinci-Trei', local: '七五三 (Shichi-go-san)', where: 'Japonia', m: 11, d: 15,
    fact: 'Copiii de 3, 5 și 7 ani sunt duși la sanctuar în haine tradiționale și primesc „ちとせあめ”, bomboane lungi, „ale celor o mie de ani”.',
    words: [{ t: 'しち', ro: 'șapte' }, { t: 'ご', ro: 'cinci' }, { t: 'さん', ro: 'trei' }] },
  { id: 'omisoka', lang: 'ja', emoji: '🔔', name: 'Revelionul japonez', local: '大晦日 (Ōmisoka)', where: 'Japonia', m: 12, d: 31,
    fact: 'Se mănâncă tăiței soba, pentru o viață lungă, iar clopotele templelor bat de 108 ori, „除夜の鐘”, ca să alunge cele 108 dorințe rele.',
    words: [{ t: 'そば', ro: 'tăiței de hrișcă' }, { t: 'かね', ro: 'clopot' }, { t: 'よい おとし を', ro: 'Un an nou bun!' }] },

  // ——— Italiană ———
  { id: 'befana', lang: 'it', emoji: '🧹', name: 'La Befana', local: 'La Befana / Epifania', where: 'Italia', m: 1, d: 6,
    fact: 'În noaptea de 5 spre 6 ianuarie, o vrăjitoare bătrână și bună, „la Befana”, zboară pe mătură și umple ciorapii copiilor cu dulciuri. Cei obraznici primesc „carbone”, cărbune (de zahăr).',
    words: [{ t: 'la calza', ro: 'ciorapul' }, { t: 'i dolci', ro: 'dulciurile' }, { t: 'il carbone', ro: 'cărbunele' }] },
  { id: 'liberazione', lang: 'it', emoji: '🇮🇹', name: 'Ziua Eliberării', local: 'Festa della Liberazione', where: 'Italia', m: 4, d: 25,
    fact: 'Pe 25 aprilie, Italia sărbătorește sfârșitul ocupației din al Doilea Război Mondial; se cântă des „Bella ciao”.',
    words: [{ t: 'la libertà', ro: 'libertatea' }, { t: 'la festa', ro: 'sărbătoarea' }, { t: 'la canzone', ro: 'cântecul' }] },
  { id: 'repubblica', lang: 'it', emoji: '🎆', name: 'Ziua Republicii', local: 'Festa della Repubblica', where: 'Italia', m: 6, d: 2,
    fact: 'Pe 2 iunie 1946, italienii au votat să devină republică. Avioanele militare desenează pe cer steagul verde-alb-roșu, „il Tricolore”.',
    words: [{ t: 'la bandiera', ro: 'steagul' }, { t: 'verde, bianco, rosso', ro: 'verde, alb, roșu' }, { t: 'il cielo', ro: 'cerul' }] },
  { id: 'palio', lang: 'it', emoji: '🐎', name: 'Il Palio di Siena', local: 'Il Palio', where: 'Siena, Italia', m: 7, d: 2,
    fact: 'Pe 2 iulie și pe 16 august, cartierele Sienei se întrec într-o cursă de cai de vreo 90 de secunde, în jurul pieței Piazza del Campo.',
    words: [{ t: 'il cavallo', ro: 'calul' }, { t: 'la corsa', ro: 'cursa' }, { t: 'la piazza', ro: 'piața' }] },
  { id: 'ferragosto', lang: 'it', emoji: '🏖️', name: 'Ferragosto', local: 'Ferragosto', where: 'Italia', m: 8, d: 15,
    fact: 'Numele vine din latinescul „Feriae Augusti”, sărbătorile împăratului Augustus. Azi, aproape toată Italia pleacă la mare.',
    words: [{ t: 'il mare', ro: 'marea' }, { t: 'le vacanze', ro: 'vacanța' }, { t: 'agosto', ro: 'august' }] },
  { id: 'natale', lang: 'it', emoji: '🎅', name: 'Crăciunul italian', local: 'Natale', where: 'Italia', m: 12, d: 25,
    fact: 'Italienii fac „il presepe”, ieslea cu figurine, și mănâncă „panettone” sau „pandoro”. Proverbul spune „Natale con i tuoi, Pasqua con chi vuoi”: Crăciunul cu ai tăi, Paștele cu cine vrei.',
    words: [{ t: 'Buon Natale!', ro: 'Crăciun fericit!' }, { t: 'il presepe', ro: 'ieslea' }, { t: 'il panettone', ro: 'cozonacul italian' }] },
]

/** Data următoarei apariții a sărbătorii, de azi încolo. */
export function nextDate(h: Holiday, from = new Date()): Date {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  for (const y of [from.getFullYear(), from.getFullYear() + 1]) {
    let d: Date
    if (h.d) d = new Date(y, h.m - 1, h.d)
    else if (h.nth === 'last') {
      d = new Date(y, h.m, 0)
      while (d.getDay() !== h.weekday) d.setDate(d.getDate() - 1)
    } else {
      d = new Date(y, h.m - 1, 1)
      while (d.getDay() !== h.weekday) d.setDate(d.getDate() + 1)
      d.setDate(d.getDate() + 7 * ((h.nth as number) - 1))
    }
    if (d >= start) return d
  }
  return new Date(from.getFullYear() + 1, h.m - 1, h.d ?? 1)
}

export const daysUntil = (d: Date, from = new Date()) =>
  Math.round((d.getTime() - new Date(from.getFullYear(), from.getMonth(), from.getDate()).getTime()) / 86400000)
