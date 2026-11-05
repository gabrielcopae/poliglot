import { lesson, s, w, withStory, type Course } from './types'
import { JA_POVESTI } from './ja-povesti'
import { jaCap01 } from './ja-cap01'
import { jaCap02 } from './ja-cap02'
import { jaCap03 } from './ja-cap03'
import { jaCap04 } from './ja-cap04'
import { jaCap05 } from './ja-cap05'
import { jaCap06 } from './ja-cap06'
import { jaCap07 } from './ja-cap07'
import { jaCap08 } from './ja-cap08'
import { jaCap09 } from './ja-cap09'
import { jaCap10 } from './ja-cap10'
import { jaCap11 } from './ja-cap11'
import { jaCap12 } from './ja-cap12'
import { jaCap13 } from './ja-cap13'
import { jaCap14 } from './ja-cap14'
import { jaCap15 } from './ja-cap15'
import { jaCap16 } from './ja-cap16'
import { jaCap17 } from './ja-cap17'
import { jaCap18 } from './ja-cap18'
import { jaCap19 } from './ja-cap19'
import { jaCap20 } from './ja-cap20'
import { jaCap21 } from './ja-cap21'
import { jaCap22 } from './ja-cap22'
import { jaCap23 } from './ja-cap23'
import { jaCap24 } from './ja-cap24'
import { jaCap25 } from './ja-cap25'

/** Tabelul hiragana (rând cu rând). Celulele goale sunt `null`. */
export const HIRAGANA: (readonly [string, string] | null)[][] = [
  [['あ', 'a'], ['い', 'i'], ['う', 'u'], ['え', 'e'], ['お', 'o']],
  [['か', 'ka'], ['き', 'ki'], ['く', 'ku'], ['け', 'ke'], ['こ', 'ko']],
  [['さ', 'sa'], ['し', 'shi'], ['す', 'su'], ['せ', 'se'], ['そ', 'so']],
  [['た', 'ta'], ['ち', 'chi'], ['つ', 'tsu'], ['て', 'te'], ['と', 'to']],
  [['な', 'na'], ['に', 'ni'], ['ぬ', 'nu'], ['ね', 'ne'], ['の', 'no']],
  [['は', 'ha'], ['ひ', 'hi'], ['ふ', 'fu'], ['へ', 'he'], ['ほ', 'ho']],
  [['ま', 'ma'], ['み', 'mi'], ['む', 'mu'], ['め', 'me'], ['も', 'mo']],
  [['や', 'ya'], null, ['ゆ', 'yu'], null, ['よ', 'yo']],
  [['ら', 'ra'], ['り', 'ri'], ['る', 'ru'], ['れ', 're'], ['ろ', 'ro']],
  [['わ', 'wa'], null, null, null, ['を', 'wo']],
  [['ん', 'n'], null, null, null, null],
]

export const KATAKANA: (readonly [string, string] | null)[][] = [
  [['ア', 'a'], ['イ', 'i'], ['ウ', 'u'], ['エ', 'e'], ['オ', 'o']],
  [['カ', 'ka'], ['キ', 'ki'], ['ク', 'ku'], ['ケ', 'ke'], ['コ', 'ko']],
  [['サ', 'sa'], ['シ', 'shi'], ['ス', 'su'], ['セ', 'se'], ['ソ', 'so']],
  [['タ', 'ta'], ['チ', 'chi'], ['ツ', 'tsu'], ['テ', 'te'], ['ト', 'to']],
  [['ナ', 'na'], ['ニ', 'ni'], ['ヌ', 'nu'], ['ネ', 'ne'], ['ノ', 'no']],
  [['ハ', 'ha'], ['ヒ', 'hi'], ['フ', 'fu'], ['ヘ', 'he'], ['ホ', 'ho']],
  [['マ', 'ma'], ['ミ', 'mi'], ['ム', 'mu'], ['メ', 'me'], ['モ', 'mo']],
  [['ヤ', 'ya'], null, ['ユ', 'yu'], null, ['ヨ', 'yo']],
  [['ラ', 'ra'], ['リ', 'ri'], ['ル', 'ru'], ['レ', 're'], ['ロ', 'ro']],
  [['ワ', 'wa'], null, null, null, ['ヲ', 'wo']],
  [['ン', 'n'], null, null, null, null],
]

const kana = (k: string, romaji: string) => w(k, romaji)

export const ja: Course = {
  lang: 'ja',
  name: 'Japoneză',
  native: '日本語',
  flag: '🇯🇵',
  locale: 'ja-JP',
  hello: 'こんにちは',
  exam: 'JLPT',
  plan: [
    { level: 'N5', title: 'Începător (≈ A1)', chapters: 20 },
    { level: 'N4', title: 'Elementar (≈ A2)', chapters: 30 },
    { level: 'N3', title: 'Intermediar (≈ B1)', chapters: 40 },
    { level: 'N2', title: 'Intermediar avansat (≈ B2)', chapters: 50 },
    { level: 'N1', title: 'Avansat (≈ C1)', chapters: 60 },
  ],
  units: [
    {
      id: 'ja-u1',
      title: 'Hiragana',
      level: 'N5',
      lessons: [
        lesson({
          id: 'ja-h-vocale',
          title: 'Vocalele あいうえお',
          emoji: 'あ',
          kind: 'kana',
          goal: 'Citești cele 5 vocale, baza întregului alfabet.',
          words: [
            kana('あ', 'a'), kana('い', 'i'), kana('う', 'u'), kana('え', 'e'), kana('お', 'o'),
            w('あい', 'dragoste', { r: 'ai' }),
            w('いえ', 'casă', { r: 'ie' }),
            w('うえ', 'sus / deasupra', { r: 'ue' }),
            w('あお', 'albastru', { r: 'ao' }),
          ],
          grammar: [
            {
              title: 'Cele trei scrieri japoneze',
              body: [
                'Japoneza folosește trei scrieri împreună: hiragana (sunete, pentru cuvinte japoneze și gramatică), katakana (cuvinte străine) și kanji (caractere cu sens, din chineză).',
                'Începi cu hiragana: 46 de semne de bază. Fiecare semn este o silabă.',
                'Vocalele se citesc ca în română: a, i, u, e, o. Ordinea japoneză este a-i-u-e-o.',
              ],
            },
          ],
        }),
        lesson({
          id: 'ja-h-k',
          title: 'Rândul K かきくけこ',
          emoji: 'か',
          kind: 'kana',
          goal: 'Adaugi silabele ka, ki, ku, ke, ko.',
          words: [
            kana('か', 'ka'), kana('き', 'ki'), kana('く', 'ku'), kana('け', 'ke'), kana('こ', 'ko'),
            w('あか', 'roșu', { r: 'aka' }),
            w('かお', 'față', { r: 'kao' }),
            w('こえ', 'voce', { r: 'koe' }),
            w('えき', 'gară', { r: 'eki' }),
            w('いけ', 'iaz', { r: 'ike' }),
          ],
          grammar: [
            {
              title: 'Cum se formează rândurile',
              body: [
                'Fiecare rând = o consoană + cele 5 vocale: k + a/i/u/e/o.',
                '„ki” se citește „chi” ca în „chiar”, iar „ke” ca „che” în „chem”.',
              ],
            },
          ],
        }),
        lesson({
          id: 'ja-h-s',
          title: 'Rândul S さしすせそ',
          emoji: 'さ',
          kind: 'kana',
          goal: 'Adaugi silabele sa, shi, su, se, so.',
          words: [
            kana('さ', 'sa'), kana('し', 'shi'), kana('す', 'su'), kana('せ', 'se'), kana('そ', 'so'),
            w('すし', 'sushi', { r: 'sushi' }),
            w('あさ', 'dimineață', { r: 'asa' }),
            w('いす', 'scaun', { r: 'isu' }),
            w('かさ', 'umbrelă', { r: 'kasa' }),
          ],
          grammar: [
            {
              title: 'O excepție: し = shi',
              body: [
                'し nu se citește „si”, ci „și” (scris shi).',
                'Vocala u se aude foarte slab după s: です se aude aproape „des”.',
              ],
            },
          ],
        }),
        lesson({
          id: 'ja-h-t',
          title: 'Rândul T たちつてと',
          emoji: 'た',
          kind: 'kana',
          goal: 'Adaugi silabele ta, chi, tsu, te, to.',
          words: [
            kana('た', 'ta'), kana('ち', 'chi'), kana('つ', 'tsu'), kana('て', 'te'), kana('と', 'to'),
            w('て', 'mână', { r: 'te' }),
            w('した', 'jos / sub', { r: 'shita' }),
            w('くつ', 'pantofi', { r: 'kutsu' }),
            w('ちかてつ', 'metrou', { r: 'chikatetsu' }),
          ],
          grammar: [
            {
              title: 'Două excepții: ち și つ',
              body: [
                'ち = chi, se citește „ci” ca în „cină”.',
                'つ = tsu, se citește „țu”.',
              ],
            },
          ],
        }),
        lesson({
          id: 'ja-h-n',
          title: 'Rândul N なにぬねの',
          emoji: 'な',
          kind: 'kana',
          goal: 'Adaugi silabele na, ni, nu, ne, no.',
          words: [
            kana('な', 'na'), kana('に', 'ni'), kana('ぬ', 'nu'), kana('ね', 'ne'), kana('の', 'no'),
            w('いぬ', 'câine', { r: 'inu' }),
            w('ねこ', 'pisică', { r: 'neko' }),
            w('なつ', 'vară', { r: 'natsu' }),
            w('あなた', 'tu', { r: 'anata' }),
          ],
        }),
        lesson({
          id: 'ja-h-h',
          title: 'Rândul H はひふへほ',
          emoji: 'は',
          kind: 'kana',
          goal: 'Adaugi silabele ha, hi, fu, he, ho.',
          words: [
            kana('は', 'ha'), kana('ひ', 'hi'), kana('ふ', 'fu'), kana('へ', 'he'), kana('ほ', 'ho'),
            w('はな', 'floare', { r: 'hana' }),
            w('ひと', 'om / persoană', { r: 'hito' }),
            w('ふね', 'vapor', { r: 'fune' }),
            w('ほし', 'stea', { r: 'hoshi' }),
          ],
          grammar: [
            {
              title: 'ふ = fu și は ca particulă',
              body: [
                'ふ se citește între „fu” și „hu”, cu buzele aproape închise.',
                'Când は este particulă (marchează subiectul), se citește „wa”: わたしは = watashi wa.',
              ],
            },
          ],
        }),
        lesson({
          id: 'ja-h-m',
          title: 'Rândul M まみむめも',
          emoji: 'ま',
          kind: 'kana',
          goal: 'Adaugi silabele ma, mi, mu, me, mo.',
          words: [
            kana('ま', 'ma'), kana('み', 'mi'), kana('む', 'mu'), kana('め', 'me'), kana('も', 'mo'),
            w('め', 'ochi', { r: 'me' }),
            w('みみ', 'ureche', { r: 'mimi' }),
            w('あめ', 'ploaie', { r: 'ame' }),
            w('もも', 'piersică', { r: 'momo' }),
            w('むし', 'insectă', { r: 'mushi' }),
          ],
        }),
        lesson({
          id: 'ja-h-yr',
          title: 'Rândurile Y și R',
          emoji: 'や',
          kind: 'kana',
          goal: 'Adaugi ya, yu, yo și ra, ri, ru, re, ro.',
          words: [
            kana('や', 'ya'), kana('ゆ', 'yu'), kana('よ', 'yo'),
            kana('ら', 'ra'), kana('り', 'ri'), kana('る', 'ru'), kana('れ', 're'), kana('ろ', 'ro'),
            w('やま', 'munte', { r: 'yama' }),
            w('ゆき', 'zăpadă', { r: 'yuki' }),
            w('さくら', 'floare de cireș', { r: 'sakura' }),
            w('くるま', 'mașină', { r: 'kuruma' }),
          ],
          grammar: [
            {
              title: 'R-ul japonez',
              body: [
                'R-ul japonez e un sunet între r și l, atins o singură dată cu limba. E mult mai moale decât r-ul românesc.',
              ],
            },
          ],
        }),
        lesson({
          id: 'ja-h-wn',
          title: 'わ, を și ん',
          emoji: 'ん',
          kind: 'kana',
          goal: 'Termini alfabetul hiragana de bază!',
          words: [
            kana('わ', 'wa'), kana('を', 'wo'), kana('ん', 'n'),
            w('わたし', 'eu', { r: 'watashi' }),
            w('ほん', 'carte', { r: 'hon' }),
            w('にほん', 'Japonia', { r: 'nihon' }),
            w('みかん', 'mandarină', { r: 'mikan' }),
          ],
          grammar: [
            {
              title: 'Semnele care schimbă sunetul',
              body: [
                'を se citește „o” și e folosit doar ca particulă pentru complementul direct.',
                'ん este singurul semn format doar dintr-o consoană.',
                'Ghilimelele mici ゛(dakuten) sonorizează consoana: か→が (ga), さ→ざ (za), た→だ (da), は→ば (ba). Cerculețul ゜ dă p: は→ぱ (pa).',
              ],
              table: [
                ['De bază', 'Cu ゛', 'Cu ゜'],
                ['か ka', 'が ga', ''],
                ['さ sa', 'ざ za', ''],
                ['た ta', 'だ da', ''],
                ['は ha', 'ば ba', 'ぱ pa'],
              ],
            },
          ],
        }),
      ],
    },
    {
      id: 'ja-u2',
      title: 'Primele cuvinte',
      level: 'N5',
      lessons: [
        lesson({
          id: 'ja-aisatsu',
          title: 'Saluturi',
          emoji: '🙇',
          goal: 'Saluți politicos în orice moment al zilei.',
          words: [
            w('こんにちは', 'bună ziua', { r: 'konnichiwa' }),
            w('おはようございます', 'bună dimineața', { r: 'ohayou gozaimasu', alt: ['ohayo gozaimasu'] }),
            w('こんばんは', 'bună seara', { r: 'konbanwa' }),
            w('さようなら', 'la revedere', { r: 'sayounara', alt: ['sayonara'] }),
            w('おやすみなさい', 'noapte bună', { r: 'oyasuminasai' }),
            w('ありがとう', 'mulțumesc', { r: 'arigatou', alt: ['arigato'] }),
            w('すみません', 'scuzați-mă', { r: 'sumimasen' }),
            w('はい', 'da', { r: 'hai' }),
            w('いいえ', 'nu', { r: 'iie' }),
            w('はじめまして', 'încântat de cunoștință', { r: 'hajimemashite' }),
          ],
          sentences: [
            s('わたしは がくせいです。', 'Eu sunt student.', { r: 'watashi wa gakusei desu', parts: ['わたしは', 'がくせい', 'です。'] }),
            s('ありがとう ございます。', 'Vă mulțumesc.', { r: 'arigatou gozaimasu', parts: ['ありがとう', 'ございます。'] }),
            s('すみません、えきは どこですか。', 'Scuzați-mă, unde este gara?', { r: 'sumimasen, eki wa doko desu ka', parts: ['すみません、', 'えきは', 'どこ', 'ですか。'] }),
            s('これは ほんです。', 'Aceasta este o carte.', { r: 'kore wa hon desu', parts: ['これは', 'ほん', 'です。'] }),
          ],
          grammar: [
            {
              title: 'Propoziția de bază: X は Y です',
              body: [
                '„X は Y です” = „X este Y”. は (citit wa) arată despre ce vorbești, iar です încheie politicos propoziția.',
                'Pentru întrebare adaugi か la final: これは ほんですか。= Aceasta este o carte?',
                'Verbul stă mereu la sfârșitul propoziției.',
              ],
            },
          ],
        }),
        lesson({
          id: 'ja-kazu',
          title: 'Numerele 1–10',
          emoji: '🔢',
          goal: 'Numeri până la zece în japoneză.',
          words: [
            w('いち', 'unu', { r: 'ichi' }),
            w('に', 'doi', { r: 'ni' }),
            w('さん', 'trei', { r: 'san' }),
            w('よん', 'patru', { r: 'yon', alt: ['shi'] }),
            w('ご', 'cinci', { r: 'go' }),
            w('ろく', 'șase', { r: 'roku' }),
            w('なな', 'șapte', { r: 'nana', alt: ['shichi'] }),
            w('はち', 'opt', { r: 'hachi' }),
            w('きゅう', 'nouă', { r: 'kyuu', alt: ['kyu', 'ku'] }),
            w('じゅう', 'zece', { r: 'juu', alt: ['ju'] }),
            w('いくら', 'cât costă?', { r: 'ikura' }),
          ],
          sentences: [
            s('これは いくらですか。', 'Cât costă aceasta?', { r: 'kore wa ikura desu ka', parts: ['これは', 'いくら', 'ですか。'] }),
            s('いち、に、さん。', 'Unu, doi, trei.', { r: 'ichi, ni, san', parts: ['いち、', 'に、', 'さん。'] }),
          ],
          grammar: [
            {
              title: 'Numerele se compun simplu',
              body: [
                'După 10 numerele se construiesc logic: じゅういち (10+1) = 11, にじゅう (2×10) = 20, にじゅうさん = 23.',
                '4 și 7 au două citiri: よん / し și なな / しち. Se preferă よん și なな, pentru că し seamănă cu cuvântul pentru „moarte”.',
              ],
            },
          ],
        }),
      ],
    },
    {
      id: 'ja-u3',
      title: 'N5 · Primele conversații',
      level: 'N5',
      lessons: [jaCap01, jaCap02, jaCap03, jaCap04, jaCap05, jaCap06, jaCap07, jaCap08, jaCap09, jaCap10, jaCap11, jaCap12].map((l) => (JA_POVESTI[l.id] ? withStory(l, JA_POVESTI[l.id]) : l)),
    },
    {
      id: 'ja-u4',
      title: 'N5 · Viața de zi cu zi',
      level: 'N5',
      lessons: [jaCap13, jaCap14, jaCap15, jaCap16, jaCap17, jaCap18, jaCap19, jaCap20],
    },
    {
      id: 'ja-u5',
      title: 'N4 · Pregătiri de nuntă',
      level: 'N4',
      lessons: [jaCap21, jaCap22, jaCap23, jaCap24, jaCap25],
    },
  ],
}
