import type { LangCode } from './types'

/** O replică a personajului sau a ta. */
export interface TalkLine { t: string; ro: string; r?: string }

export interface TalkChoice extends TalkLine {
  /** răspunsul potrivit duce mai departe */
  ok?: boolean
  next?: string
  /** pentru răspunsurile nepotrivite: reacția personajului și explicația */
  react?: TalkLine
  tip?: string
}

export interface TalkNode {
  npc: TalkLine
  choices: TalkChoice[]
}

export interface Talk {
  id: string
  lang: LangCode
  title: string
  emoji: string
  intro: string
  /** capitolul după care e recomandată */
  after: string
  afterLabel: string
  npc: { name: string; gender: 'f' | 'm'; emoji: string }
  start: string
  nodes: Record<string, TalkNode>
  /** replica de încheiere a personajului */
  end: TalkLine
}

export const TALKS: Talk[] = [
  // ——— Spaniolă ———
  {
    id: 'es-talk-ramen',
    lang: 'es',
    title: 'Prima seară la Kenji',
    emoji: '🍜',
    intro: 'Intri pentru prima dată în localul de ramen al lui Kenji, în Madrid. Kenji vorbește doar spaniolă cu clienții. E seară și ți-e foame.',
    after: 'es-cap05',
    afterLabel: 'Cap. 5',
    npc: { name: 'Kenji', gender: 'm', emoji: '👨‍🍳' },
    start: 'a',
    nodes: {
      a: {
        npc: { t: '¡Hola! Buenas noches. Bienvenido.', ro: 'Bună! Bună seara. Bine ai venit.' },
        choices: [
          { t: '¡Buenas noches!', ro: 'Bună seara!', ok: true, next: 'b' },
          { t: '¡Buenos días!', ro: 'Bună dimineața!', react: { t: '¿Buenos días? Son las nueve de la noche…', ro: 'Bună dimineața? E nouă seara…' }, tip: 'Seara se spune „buenas noches”. „Buenos días” e doar dimineața.' },
          { t: '¡Adiós!', ro: 'La revedere!', react: { t: '¿Ya te vas? ¡Si acabas de llegar!', ro: 'Pleci deja? Abia ai ajuns!' }, tip: '„Adiós” înseamnă „la revedere”, nu „bună”.' },
        ],
      },
      b: {
        npc: { t: 'Soy Kenji. ¿Cómo te llamas?', ro: 'Sunt Kenji. Cum te cheamă?' },
        choices: [
          { t: 'Me llamo Ana. Encantada.', ro: 'Mă cheamă Ana. Încântată.', ok: true, next: 'c' },
          { t: 'Tengo veinte años.', ro: 'Am douăzeci de ani.', react: { t: 'Muy bien… pero ¿cómo te llamas?', ro: 'Foarte bine… dar cum te cheamă?' }, tip: 'Te-a întrebat numele, nu vârsta: „Me llamo…”.' },
          { t: 'Estoy bien, gracias.', ro: 'Sunt bine, mulțumesc.', react: { t: 'Me alegro. Pero te he preguntado tu nombre.', ro: 'Mă bucur. Dar te-am întrebat cum te cheamă.' }, tip: '„¿Cómo te llamas?” = cum te cheamă, nu „ce mai faci”.' },
        ],
      },
      c: {
        npc: { t: 'Encantado. ¿Qué quieres comer?', ro: 'Încântat. Ce vrei să mănânci?' },
        choices: [
          { t: 'Quiero un ramen, por favor.', ro: 'Vreau un ramen, te rog.', ok: true, next: 'd' },
          { t: 'Quiero una cama, por favor.', ro: 'Vreau un pat, te rog.', react: { t: '¿Una cama? Esto es un restaurante, no un hotel.', ro: 'Un pat? Ăsta e restaurant, nu hotel.' }, tip: '„Cama” = pat. Ai vrut „ramen”.' },
          { t: 'No me gusta comer.', ro: 'Nu-mi place să mănânc.', react: { t: '¿Entonces por qué has venido a un restaurante?', ro: 'Atunci de ce ai venit la restaurant?' }, tip: 'Comandă ceva: „Quiero…, por favor”.' },
        ],
      },
      d: {
        npc: { t: 'Muy bien. ¿Y para beber? ¿Agua, té o cerveza?', ro: 'Foarte bine. Și de băut? Apă, ceai sau bere?' },
        choices: [
          { t: 'Un té verde, por favor.', ro: 'Un ceai verde, te rog.', ok: true, next: 'e' },
          { t: 'Un pan, por favor.', ro: 'O pâine, te rog.', react: { t: 'El pan no se bebe… ¿Agua, té o cerveza?', ro: 'Pâinea nu se bea… Apă, ceai sau bere?' }, tip: 'Ți-a oferit apă, ceai sau bere.' },
          { t: 'Sí.', ro: 'Da.', react: { t: '¿Sí qué? ¿Agua, té o cerveza?', ro: 'Da ce? Apă, ceai sau bere?' }, tip: 'Era o întrebare cu variante: alege una.' },
        ],
      },
      e: {
        npc: { t: 'Aquí tienes tu ramen. ¿Te gusta?', ro: 'Poftim ramen-ul tău. Îți place?' },
        choices: [
          { t: '¡Sí, me gusta mucho! Está muy rico.', ro: 'Da, îmi place mult! E foarte bun.', ok: true, next: 'f' },
          { t: 'Sí, me gustan mucho.', ro: 'Da, îmi plac mult.', react: { t: '¿Te gustan? Es solo un ramen…', ro: 'Îți plac? E un singur ramen…' }, tip: 'Pentru un singur lucru: „me gusta”. „Me gustan” e pentru mai multe.' },
          { t: 'Tengo frío.', ro: 'Mi-e frig.', react: { t: 'Pues el ramen está calentito. ¿Te gusta o no?', ro: 'Păi ramen-ul e cald… Îți place sau nu?' }, tip: 'Răspunde la întrebare: „Sí, me gusta”.' },
        ],
      },
      f: {
        npc: { t: 'Son doce euros, por favor.', ro: 'Sunt doisprezece euro, te rog.' },
        choices: [
          { t: 'Aquí tienes. ¡Gracias, Kenji! Hasta mañana.', ro: 'Poftim. Mulțumesc, Kenji! Pe mâine.', ok: true },
          { t: '¿Cuántos años tienes?', ro: 'Câți ani ai?', react: { t: 'Treinta y cinco… pero son doce euros.', ro: 'Treizeci și cinci… dar sunt doisprezece euro.' }, tip: 'Plătește și ia-ți rămas-bun: „Aquí tienes. Gracias”.' },
          { t: 'Buenas noches, me llamo Ana.', ro: 'Bună seara, mă cheamă Ana.', react: { t: 'Sí, ya lo sé, Ana. Doce euros, por favor.', ro: 'Da, știu deja, Ana. Doisprezece euro, te rog.' }, tip: 'Ne-am prezentat deja. Acum plătești.' },
        ],
      },
    },
    end: { t: '¡Gracias a ti! ¡Hasta mañana, Ana! Vuelve pronto.', ro: 'Mulțumesc și ție! Pe mâine, Ana! Să revii curând.' },
  },
  {
    id: 'es-talk-calle',
    lang: 'es',
    title: 'Rătăcit în Madrid',
    emoji: '🗺️',
    intro: 'Ești în centrul Madridului și vrei să ajungi la Puerta del Sol. Telefonul s-a descărcat. O doamnă în vârstă stă pe o bancă.',
    after: 'es-cap07',
    afterLabel: 'Cap. 7',
    npc: { name: 'Doña Carmen', gender: 'f', emoji: '👵' },
    start: 'a',
    nodes: {
      a: {
        npc: { t: 'Buenas tardes. ¿Necesitas ayuda?', ro: 'Bună ziua. Ai nevoie de ajutor?' },
        choices: [
          { t: 'Sí, por favor. ¿Dónde está la Puerta del Sol?', ro: 'Da, vă rog. Unde e Puerta del Sol?', ok: true, next: 'b' },
          { t: 'Sí, ¿qué hora es?', ro: 'Da, cât e ceasul?', react: { t: 'Son las cinco. ¿Algo más?', ro: 'E ora cinci. Altceva?' }, tip: 'Tu cauți un loc: „¿Dónde está…?”.' },
          { t: 'No, gracias. ¿Dónde está el sol?', ro: 'Nu, mulțumesc. Unde e soarele?', react: { t: '¿El sol? Pues… en el cielo, hijo.', ro: 'Soarele? Păi… pe cer, dragul meu.' }, tip: 'Locul se numește „la Puerta del Sol”, nu doar „el sol”.' },
        ],
      },
      b: {
        npc: { t: 'Está muy cerca. Sigue todo recto y gira a la izquierda en la segunda calle.', ro: 'E foarte aproape. Mergi drept înainte și cotește la stânga pe a doua stradă.' },
        choices: [
          { t: 'Todo recto y a la izquierda en la segunda calle. ¿Está lejos?', ro: 'Drept înainte și la stânga pe a doua stradă. E departe?', ok: true, next: 'c' },
          { t: 'Todo recto y a la derecha en la primera calle.', ro: 'Drept înainte și la dreapta pe prima stradă.', react: { t: 'No, no. A la izquierda, en la segunda.', ro: 'Nu, nu. La stânga, pe a doua.' }, tip: '„Izquierda” = stânga, „derecha” = dreapta, „segunda” = a doua.' },
          { t: 'Gracias, voy en coche.', ro: 'Mulțumesc, merg cu mașina.', react: { t: '¿En coche? Si no tienes coche…', ro: 'Cu mașina? Doar n-ai mașină…' }, tip: 'Repetă indicația ca să fii sigur că ai înțeles.' },
        ],
      },
      c: {
        npc: { t: 'No, está a cinco minutos andando. Hay una estatua de un oso.', ro: 'Nu, e la cinci minute de mers pe jos. E o statuie cu un urs.' },
        choices: [
          { t: '¡Perfecto! Muchas gracias, señora.', ro: 'Perfect! Mulțumesc mult, doamnă.', ok: true },
          { t: '¿Un oso? ¡Qué miedo! No voy.', ro: 'Un urs? Ce frică! Nu merg.', react: { t: 'Es una estatua, hijo, no muerde.', ro: 'E o statuie, dragul meu, nu mușcă.' }, tip: '„Estatua” = statuie. Ursul de la Sol e simbolul Madridului.' },
          { t: 'De nada.', ro: 'Cu plăcere.', react: { t: '¿De nada? Soy yo la que te ayuda…', ro: 'Cu plăcere? Eu sunt cea care te ajută…' }, tip: '„De nada” e răspunsul la „gracias”. Aici tu mulțumești.' },
        ],
      },
    },
    end: { t: 'De nada. ¡Que tengas un buen día en Madrid!', ro: 'Cu plăcere. Să ai o zi frumoasă în Madrid!' },
  },
  {
    id: 'es-talk-cervantes',
    lang: 'es',
    title: 'Interviul de la Cervantes',
    emoji: '🏫',
    intro: 'Ești Ana, la interviul pentru postul de profesoară de spaniolă la Institutul Cervantes din București. Directorul, domnul Martínez, vorbește formal (usted).',
    after: 'es-cap53',
    afterLabel: 'Cap. 53',
    npc: { name: 'Domnul Martínez', gender: 'm', emoji: '👔' },
    start: 'a',
    nodes: {
      a: {
        npc: { t: 'Buenos días, señora. Siéntese, por favor. ¿Por qué quiere trabajar con nosotros?', ro: 'Bună ziua, doamnă. Luați loc, vă rog. De ce vreți să lucrați cu noi?' },
        choices: [
          { t: 'Porque me encanta enseñar y me gustaría que mis alumnos descubrieran la cultura española.', ro: 'Pentru că îmi place mult să predau și mi-ar plăcea ca elevii mei să descopere cultura spaniolă.', ok: true, next: 'b' },
          { t: 'Porque me encanta enseñar y me gustaría que mis alumnos descubren la cultura española.', ro: '(aceeași idee, cu o greșeală de mod)', react: { t: 'Interesante… aunque una profesora debería usar bien el subjuntivo, ¿no?', ro: 'Interesant… deși o profesoară ar trebui să folosească bine subjonctivul, nu?' }, tip: 'După „me gustaría que” vine subjonctiv imperfect: „descubrieran”.' },
          { t: 'Porque necesito dinero, la verdad.', ro: 'Pentru că am nevoie de bani, sincer.', react: { t: 'Agradezco la sinceridad… pero esperaba otra respuesta.', ro: 'Apreciez sinceritatea… dar mă așteptam la alt răspuns.' }, tip: 'La interviu vorbește despre motivația profesională.' },
        ],
      },
      b: {
        npc: { t: 'Veo que tiene una hija pequeña. ¿Podría trabajar por las tardes?', ro: 'Văd că aveți o fetiță mică. Ați putea lucra după-amiaza?' },
        choices: [
          { t: 'Sí, siempre que me avisen con antelación, podría organizarme.', ro: 'Da, cu condiția să mă anunțați din timp, m-aș putea organiza.', ok: true, next: 'c' },
          { t: 'Sí, siempre que me avisan con antelación.', ro: '(cu o greșeală de mod)', react: { t: 'Entiendo la idea… pero «siempre que» con condición pide subjuntivo.', ro: 'Înțeleg ideea… dar „siempre que” de condiție cere subjonctiv.' }, tip: '„Siempre que” = cu condiția să → subjonctiv: „me avisen”.' },
          { t: '¿Y a usted qué le importa?', ro: 'Și pe dumneavoastră ce vă privește?', react: { t: '…Bueno. Pasemos a la siguiente pregunta.', ro: '…Bine. Să trecem la următoarea întrebare.' }, tip: 'Întrebarea era despre program, nu personală. Răspunde politicos.' },
        ],
      },
      c: {
        npc: { t: 'Última pregunta: si un alumno no hiciera los deberes nunca, ¿qué haría usted?', ro: 'Ultima întrebare: dacă un elev nu și-ar face niciodată temele, ce ați face?' },
        choices: [
          { t: 'Hablaría con él para entender qué le pasa y buscaría una forma de motivarlo.', ro: 'Aș vorbi cu el ca să înțeleg ce se întâmplă și aș căuta un mod de a-l motiva.', ok: true },
          { t: 'Hablo con él para entender qué le pasa.', ro: '(timp nepotrivit)', react: { t: 'Bien, pero le he preguntado qué haría, en hipótesis.', ro: 'Bine, dar v-am întrebat ce ați face, ipotetic.' }, tip: 'La „si + imperfect de subjonctiv” răspunzi cu condițional: „hablaría”.' },
          { t: 'Lo echaría de clase.', ro: 'L-aș da afară din clasă.', react: { t: 'Hmm. Esperaba algo más pedagógico.', ro: 'Hmm. Mă așteptam la ceva mai pedagogic.' }, tip: 'Gramatica e bună, dar răspunsul nu e potrivit pentru o profesoară.' },
        ],
      },
    },
    end: { t: 'Me parece una respuesta excelente. Bienvenida al Instituto Cervantes, señora.', ro: 'Mi se pare un răspuns excelent. Bine ați venit la Institutul Cervantes, doamnă.' },
  },

  // ——— Japoneză ———
  {
    id: 'ja-talk-eki',
    lang: 'ja',
    title: 'Unde e gara?',
    emoji: '🚉',
    intro: 'Ești în Tokyo, în prima zi. Cauți gara. Întrebi o tânără care trece pe stradă.',
    after: 'ja-cap03',
    afterLabel: 'Cap. 3',
    npc: { name: 'O tânără', gender: 'f', emoji: '👩' },
    start: 'a',
    nodes: {
      a: {
        npc: { t: 'はい、なん です か。', r: 'Hai, nan desu ka.', ro: 'Da, ce s-a întâmplat?' },
        choices: [
          { t: 'すみません。えき は どこ です か。', r: 'Sumimasen. Eki wa doko desu ka.', ro: 'Scuzați-mă. Unde e gara?', ok: true, next: 'b' },
          { t: 'えき は なん です か。', r: 'Eki wa nan desu ka.', ro: 'Ce este gara?', react: { t: 'えき は… えき です。', r: 'Eki wa… eki desu.', ro: 'Gara e… gară.' }, tip: '„Unde” e どこ, nu なん (ce).' },
          { t: 'はじめまして。えき です。', r: 'Hajimemashite. Eki desu.', ro: 'Încântat. Sunt gara.', react: { t: 'え? あなた は えき です か?', r: 'E? Anata wa eki desu ka?', ro: 'Poftim? Tu ești gara?' }, tip: 'Așa te prezinți pe tine. Ca să întrebi de un loc: „～ は どこ です か”.' },
        ],
      },
      b: {
        npc: { t: 'えき は あそこ です。あの しろい たてもの です。', r: 'Eki wa asoko desu. Ano shiroi tatemono desu.', ro: 'Gara e acolo. E clădirea aceea albă.' },
        choices: [
          { t: 'あそこ です ね。トイレ も あります か。', r: 'Asoko desu ne. Toire mo arimasu ka.', ro: 'Acolo, da. Are și toaletă?', ok: true, next: 'c' },
          { t: 'ここ です か。', r: 'Koko desu ka.', ro: 'Aici?', react: { t: 'いいえ、ここ じゃ ありません。あそこ です。', r: 'Iie, koko ja arimasen. Asoko desu.', ro: 'Nu, nu aici. Acolo.' }, tip: 'ここ = aici, あそこ = acolo (departe).' },
          { t: 'しろい ねこ です か。', r: 'Shiroi neko desu ka.', ro: 'E o pisică albă?', react: { t: 'ねこ? いいえ、たてもの です よ。', r: 'Neko? Iie, tatemono desu yo.', ro: 'Pisică? Nu, e o clădire.' }, tip: 'たてもの = clădire.' },
        ],
      },
      c: {
        npc: { t: 'はい、えき の なか に あります。', r: 'Hai, eki no naka ni arimasu.', ro: 'Da, e în interiorul gării.' },
        choices: [
          { t: 'ありがとう ございます!', r: 'Arigatō gozaimasu!', ro: 'Vă mulțumesc!', ok: true },
          { t: 'いただきます!', r: 'Itadakimasu!', ro: 'Poftă bună! (înainte de masă)', react: { t: 'え? たべもの は ありません よ。', r: 'E? Tabemono wa arimasen yo.', ro: 'Poftim? Nu e nimic de mâncare.' }, tip: 'いただきます se spune înainte de a mânca. Ca să mulțumești: ありがとう ございます.' },
          { t: 'すみません、わかりません。', r: 'Sumimasen, wakarimasen.', ro: 'Scuzați, nu înțeleg.', react: { t: 'えき の なか。なか です。', r: 'Eki no naka. Naka desu.', ro: 'În gară. Înăuntru.' }, tip: 'なか = înăuntru. Toaleta e în gară.' },
        ],
      },
    },
    end: { t: 'どう いたしまして。きを つけて!', r: 'Dō itashimashite. Ki o tsukete!', ro: 'Cu plăcere. Ai grijă de tine!' },
  },
  {
    id: 'ja-talk-ramen',
    lang: 'ja',
    title: 'Ramen la Kenji (în japoneză)',
    emoji: '🍜',
    intro: 'Kenji îți propune să exersați japoneza: azi îți vorbește doar în japoneză, ca într-un local din Tokyo.',
    after: 'ja-cap06',
    afterLabel: 'Cap. 6',
    npc: { name: 'Kenji', gender: 'm', emoji: '👨‍🍳' },
    start: 'a',
    nodes: {
      a: {
        npc: { t: 'いらっしゃいませ! なんめいさま です か。', r: 'Irasshaimase! Nanmei-sama desu ka.', ro: 'Bine ați venit! Câte persoane sunteți?' },
        choices: [
          { t: 'ひとり です。', r: 'Hitori desu.', ro: 'O persoană (singur).', ok: true, next: 'b' },
          { t: 'ひとつ です。', r: 'Hitotsu desu.', ro: 'Un (obiect).', react: { t: 'ひとつ? あなた は もの じゃ ない です よ。', r: 'Hitotsu? Anata wa mono ja nai desu yo.', ro: 'Un obiect? Tu nu ești un lucru.' }, tip: 'Pentru oameni: ひとり, ふたり. ひとつ e pentru lucruri.' },
          { t: 'いただきます!', r: 'Itadakimasu!', ro: 'Poftă bună!', react: { t: 'まだ ラーメン が ありません よ!', r: 'Mada rāmen ga arimasen yo!', ro: 'Încă nu e ramen-ul!' }, tip: 'いただきます se spune când ai mâncarea în față.' },
        ],
      },
      b: {
        npc: { t: 'こちら へ どうぞ。なに を たべます か。', r: 'Kochira e dōzo. Nani o tabemasu ka.', ro: 'Pe aici, vă rog. Ce mâncați?' },
        choices: [
          { t: 'みそ ラーメン を ください。', r: 'Miso rāmen o kudasai.', ro: 'Un ramen cu miso, vă rog.', ok: true, next: 'c' },
          { t: 'みそ ラーメン が ください。', r: 'Miso rāmen ga kudasai.', ro: '(particulă greșită)', react: { t: 'はい… でも 「を ください」 です よ。', r: 'Hai… demo “o kudasai” desu yo.', ro: 'Da… dar se spune „o kudasai”.' }, tip: 'Cu ください, obiectul primește を: ～を ください.' },
          { t: 'ラーメン を のみます。', r: 'Rāmen o nomimasu.', ro: 'Beau ramen.', react: { t: 'のみます? スープ だけ です か?', r: 'Nomimasu? Sūpu dake desu ka?', ro: 'Beți? Doar supa?' }, tip: 'Ramen se mănâncă: たべます. のみます = a bea.' },
        ],
      },
      c: {
        npc: { t: 'のみもの は?', r: 'Nomimono wa?', ro: 'Și de băut?' },
        choices: [
          { t: 'おちゃ を おねがいします。', r: 'Ocha o onegaishimasu.', ro: 'Un ceai, vă rog.', ok: true, next: 'd' },
          { t: 'おちゃ を たべます。', r: 'Ocha o tabemasu.', ro: 'Mănânc ceai.', react: { t: 'おちゃ を たべます か? めずらしい ですね。', r: 'Ocha o tabemasu ka? Mezurashii desu ne.', ro: 'Mâncați ceai? Ce neobișnuit.' }, tip: 'Ceaiul se bea: のみます. Sau simplu: おちゃ を おねがいします.' },
          { t: 'いいえ、ラーメン です。', r: 'Iie, rāmen desu.', ro: 'Nu, ramen.', react: { t: 'ラーメン は もう ちゅうもん しました よ。のみもの は?', r: 'Rāmen wa mō chūmon shimashita yo. Nomimono wa?', ro: 'Ramen-ul l-ați comandat deja. De băut?' }, tip: 'のみもの = băutură.' },
        ],
      },
      d: {
        npc: { t: 'おまたせ しました。みそ ラーメン です。どう です か。', r: 'Omatase shimashita. Miso rāmen desu. Dō desu ka.', ro: 'Mulțumesc că ați așteptat. Ramen cu miso. Cum e?' },
        choices: [
          { t: 'とても おいしい です!', r: 'Totemo oishii desu!', ro: 'E foarte bun!', ok: true },
          { t: 'とても たかい です!', r: 'Totemo takai desu!', ro: 'E foarte scump!', react: { t: 'え… まだ おかね の はなし は して いません よ。', r: 'E… mada okane no hanashi wa shite imasen yo.', ro: 'Poftim… încă n-am vorbit de bani.' }, tip: 'Te-a întrebat de gust: おいしい.' },
          { t: 'とても しずか です!', r: 'Totemo shizuka desu!', ro: 'E foarte liniștit!', react: { t: 'みせ が? それとも ラーメン が?', r: 'Mise ga? Soretomo rāmen ga?', ro: 'Localul? Sau ramen-ul?' }, tip: 'Pentru mâncare: おいしい (bun), まずい (prost).' },
        ],
      },
    },
    end: { t: 'ありがとう ございます! また きて ください!', r: 'Arigatō gozaimasu! Mata kite kudasai!', ro: 'Vă mulțumesc! Să mai veniți!' },
  },
  {
    id: 'ja-talk-sakura',
    lang: 'ja',
    title: 'Sakura s-a rătăcit',
    emoji: '🧭',
    intro: 'Sakura te sună: s-a rătăcit în Madrid, lângă statuia ursului din Puerta del Sol. Tu știi drumul spre localul lui Kenji. Explică-i în japoneză.',
    after: 'ja-cap24',
    afterLabel: 'Cap. 24',
    npc: { name: 'Sakura', gender: 'f', emoji: '👧' },
    start: 'a',
    nodes: {
      a: {
        npc: { t: 'もしもし! わたし、まいご に なっちゃった… どう すれば いい?', r: 'Moshimoshi! Watashi, maigo ni nacchatta… Dō sureba ii?', ro: 'Alo! M-am rătăcit… Ce să fac?' },
        choices: [
          { t: 'だいじょうぶ。いま どこ に いる?', r: 'Daijōbu. Ima doko ni iru?', ro: 'E în regulă. Unde ești acum?', ok: true, next: 'b' },
          { t: 'だいじょうぶ。いま なんじ?', r: 'Daijōbu. Ima nanji?', ro: 'E în regulă. Cât e ceasul?', react: { t: 'じゅうにじ… でも、いま それ は だいじ じゃ ない!', r: 'Jūniji… demo, ima sore wa daiji ja nai!', ro: 'E douăsprezece… dar acum nu asta contează!' }, tip: 'Întreab-o unde e: どこ に いる?' },
          { t: 'ないて ください。', r: 'Naite kudasai.', ro: 'Plângi, te rog.', react: { t: 'え?! なきたく ない よ!', r: 'E?! Nakitaku nai yo!', ro: 'Poftim?! Nu vreau să plâng!' }, tip: 'Mai bine liniștește-o: だいじょうぶ.' },
        ],
      },
      b: {
        npc: { t: 'くま の ぞう の まえ に いる。', r: 'Kuma no zō no mae ni iru.', ro: 'Sunt în fața statuii ursului.' },
        choices: [
          { t: 'じゃあ、おおきい みち を まっすぐ いく と、しんごう が ある よ。', r: 'Jā, ōkii michi o massugu iku to, shingō ga aru yo.', ro: 'Atunci, dacă mergi drept pe strada mare, ajungi la un semafor.', ok: true, next: 'c' },
          { t: 'じゃあ、おおきい みち を まっすぐ いったら、しんごう が あった。', r: 'Jā, ōkii michi o massugu ittara, shingō ga atta.', ro: '(timp greșit: „era un semafor”)', react: { t: 'あった? いま は ない の?', r: 'Atta? Ima wa nai no?', ro: '„Era”? Acum nu mai e?' }, tip: 'Pentru indicații de drum: dicționar + と, apoi prezent: しんごう が ある.' },
          { t: 'くま は あぶない よ! にげて!', r: 'Kuma wa abunai yo! Nigete!', ro: 'Ursul e periculos! Fugi!', react: { t: 'ぞう だ よ… うごかない よ。', r: 'Zō da yo… ugokanai yo.', ro: 'E o statuie… nu se mișcă.' }, tip: 'ぞう = statuie. Dă-i indicații: まっすぐ いく と…' },
        ],
      },
      c: {
        npc: { t: 'しんごう、あった! つぎ は?', r: 'Shingō, atta! Tsugi wa?', ro: 'Am găsit semaforul! Și apoi?' },
        choices: [
          { t: 'しんごう を わたって、ひだり に まがって。みっつ め の かど に あかい ちょうちん が ある よ。', r: 'Shingō o watatte, hidari ni magatte. Mittsu me no kado ni akai chōchin ga aru yo.', ro: 'Traversează, cotește la stânga. La al treilea colț e un felinar roșu.', ok: true },
          { t: 'しんごう を たべて、ひだり に まがって。', r: 'Shingō o tabete, hidari ni magatte.', ro: 'Mănâncă semaforul, cotește la stânga.', react: { t: 'しんごう を たべる?! むり だ よ!', r: 'Shingō o taberu?! Muri da yo!', ro: 'Să mănânc semaforul?! Imposibil!' }, tip: 'Semaforul se traversează: わたる → わたって.' },
          { t: 'みぎ に まがって。', r: 'Migi ni magatte.', ro: 'Cotește la dreapta.', react: { t: 'みぎ? カード に は ひだり って かいて ある よ。', r: 'Migi? Kādo ni wa hidari tte kaite aru yo.', ro: 'La dreapta? Pe cartonaș scrie la stânga.' }, tip: 'Localul e la stânga: ひだり.' },
        ],
      },
    },
    end: { t: 'あかい ちょうちん、みえた! おとうさん! ありがとう、おねえさん!', r: 'Akai chōchin, mieta! Otōsan! Arigatō, onēsan!', ro: 'Văd felinarul roșu! Tati! Mulțumesc, Ana!' },
  },
]

export function talksFor(lang: LangCode) {
  return TALKS.filter((t) => t.lang === lang)
}
