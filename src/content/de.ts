import type { Course, Unit } from './types'
import { deCap01 } from './de-cap01'
import { deCap02 } from './de-cap02'
import { deCap03 } from './de-cap03'
import { deCap04 } from './de-cap04'
import { deCap05 } from './de-cap05'
import { deCap06 } from './de-cap06'
import { deCap07 } from './de-cap07'
import { deCap08 } from './de-cap08'
import { deCap09 } from './de-cap09'
import { deCap10 } from './de-cap10'
import { deCap11 } from './de-cap11'
import { deCap12 } from './de-cap12'
import { deCap13 } from './de-cap13'
import { deCap14 } from './de-cap14'
import { deCap15 } from './de-cap15'
import { deCap16 } from './de-cap16'
import { deCap17 } from './de-cap17'
import { deCap18 } from './de-cap18'
import { deCap19 } from './de-cap19'
import { deCap20 } from './de-cap20'
import { deCap21 } from './de-cap21'
import { deCap22 } from './de-cap22'
import { deCap23 } from './de-cap23'
import { deCap24 } from './de-cap24'
import { deCap25 } from './de-cap25'
import { deCap26 } from './de-cap26'
import { deCap27 } from './de-cap27'
import { deCap28 } from './de-cap28'
import { deCap29 } from './de-cap29'
import { deCap30 } from './de-cap30'
import { deCap31 } from './de-cap31'
import { deCap32 } from './de-cap32'
import { deCap33 } from './de-cap33'
import { deCap34 } from './de-cap34'
import { deCap35 } from './de-cap35'
import { deCap36 } from './de-cap36'
import { deCap37 } from './de-cap37'
import { deCap38 } from './de-cap38'
import { deCap39 } from './de-cap39'
import { deCap40 } from './de-cap40'
import { deCap41 } from './de-cap41'
import { deCap42 } from './de-cap42'
import { deCap43 } from './de-cap43'
import { deCap44 } from './de-cap44'
import { deCap45 } from './de-cap45'
import { deCap46 } from './de-cap46'
import { deCap47 } from './de-cap47'
import { deCap48 } from './de-cap48'
import { deCap49 } from './de-cap49'
import { deCap50 } from './de-cap50'
import { deCap51 } from './de-cap51'
import { deCap52 } from './de-cap52'
import { deCap53 } from './de-cap53'
import { deCap54 } from './de-cap54'
import { deCap55 } from './de-cap55'
import { deCap56 } from './de-cap56'
import { deCap57 } from './de-cap57'
import { deCap58 } from './de-cap58'
import { deCap59 } from './de-cap59'
import { deCap60 } from './de-cap60'
import { deCap61 } from './de-cap61'
import { deCap62 } from './de-cap62'
import { deCap63 } from './de-cap63'
import { deCap64 } from './de-cap64'
import { deCap65 } from './de-cap65'
import { deCap66 } from './de-cap66'
import { deCap67 } from './de-cap67'
import { deCap68 } from './de-cap68'
import { deCap69 } from './de-cap69'
import { deCap70 } from './de-cap70'
import { deCap71 } from './de-cap71'
import { deCap72 } from './de-cap72'
import { deCap73 } from './de-cap73'
import { deCap74 } from './de-cap74'
import { deCap75 } from './de-cap75'
import { deCap76 } from './de-cap76'
import { deCap77 } from './de-cap77'
import { deCap78 } from './de-cap78'
import { deCap79 } from './de-cap79'
import { deCap80 } from './de-cap80'
import { deCap81 } from './de-cap81'
import { deCap82 } from './de-cap82'
import { deCap83 } from './de-cap83'
import { deCap84 } from './de-cap84'
import { deCap85 } from './de-cap85'
import { deCap86 } from './de-cap86'

// Germană: Mara Ionescu, asistentă medicală din Sibiu, la un spital din Berlin (Prenzlauer Berg).
const units: Unit[] = [
  { id: 'de-a1-1', title: 'A1 · Primii pași', level: 'A1', lessons: [deCap01, deCap02, deCap03, deCap04] },
  { id: 'de-a1-2', title: 'A1 · Viața de zi cu zi', level: 'A1', lessons: [deCap05, deCap06, deCap07, deCap08] },
  { id: 'de-a1-3', title: 'A1 · Timp liber, haine, sănătate', level: 'A1', lessons: [deCap09, deCap10, deCap11, deCap12] },
  { id: 'de-a2-1', title: 'A2 · Trecutul și amintirile', level: 'A2', lessons: [deCap13, deCap14, deCap15, deCap16] },
  { id: 'de-a2-2', title: 'A2 · Descrieri', level: 'A2', lessons: [deCap17, deCap18, deCap19, deCap20] },
  { id: 'de-a2-3', title: 'A2 · Planuri și dorințe', level: 'A2', lessons: [deCap21, deCap22, deCap23, deCap24] },
  { id: 'de-a2-4', title: 'A2 · Legături și argumente', level: 'A2', lessons: [deCap25, deCap26, deCap27, deCap28] },
  { id: 'de-a2-5', title: 'A2 · Lumea din jur', level: 'A2', lessons: [deCap29, deCap30, deCap31, deCap32] },
  { id: 'de-a2-6', title: 'A2 · Finalul A2', level: 'A2', lessons: [deCap33, deCap34, deCap35, deCap36] },
  { id: 'de-b1-1', title: 'B1 · Ce-ar fi fost dacă', level: 'B1', lessons: [deCap37, deCap38, deCap39, deCap40] },
  { id: 'de-b1-2', title: 'B1 · Legături noi', level: 'B1', lessons: [deCap41, deCap42, deCap43, deCap44] },
  { id: 'de-b1-3', title: 'B1 · Vorbe și zvonuri', level: 'B1', lessons: [deCap45, deCap46, deCap47, deCap48] },
  { id: 'de-b1-4', title: 'B1 · Casa și rădăcinile', level: 'B1', lessons: [deCap49, deCap50, deCap51, deCap52] },
  { id: 'de-b1-5', title: 'B1 · Scrisori și argumente', level: 'B1', lessons: [deCap53, deCap54, deCap55, deCap56] },
  { id: 'de-b1-6', title: 'B1 · Lumea muncii', level: 'B1', lessons: [deCap57, deCap58, deCap59, deCap60] },
  { id: 'de-b1-7', title: 'B1 · Finalul B1', level: 'B1', lessons: [deCap61, deCap62, deCap63, deCap64, deCap65, deCap66] },
  { id: 'de-b2-1', title: 'B2 · Nuanțe și stil', level: 'B2', lessons: [deCap67, deCap68, deCap69, deCap70] },
  { id: 'de-b2-2', title: 'B2 · Acte și ceremonii', level: 'B2', lessons: [deCap71, deCap72, deCap73, deCap74] },
  { id: 'de-b2-3', title: 'B2 · Societate și opinii', level: 'B2', lessons: [deCap75, deCap76, deCap77, deCap78] },
  { id: 'de-b2-4', title: 'B2 · Limbă și identitate', level: 'B2', lessons: [deCap79, deCap80, deCap81, deCap82] },
  { id: 'de-b2-5', title: 'B2 · Text și dialog', level: 'B2', lessons: [deCap83, deCap84, deCap85, deCap86] },
]

export const de: Course = {
  lang: 'de',
  name: 'Germană',
  native: 'Deutsch',
  flag: '🇩🇪',
  locale: 'de-DE',
  hello: 'Hallo',
  exam: 'Goethe-Zertifikat B2',
  plan: [
    { level: 'A1', title: 'Începător', chapters: 12 },
    { level: 'A2', title: 'Elementar', chapters: 24 },
    { level: 'B1', title: 'Intermediar', chapters: 30 },
    { level: 'B2', title: 'Intermediar avansat', chapters: 36 },
    { level: 'C1', title: 'Avansat (profesionist)', chapters: 44 },
  ],
  units,
}
