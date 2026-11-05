import type { Drill, Reading } from './types'
import { POVESTI_A1 } from './es-povesti-a1'
import { POVESTI_A2A } from './es-povesti-a2a'
import { POVESTI_A2B } from './es-povesti-a2b'

export type Story = { reading: Reading; questions: Drill[] }

/** „Povestea capitolului” pentru fiecare capitol de spaniolă; textele cresc de la un capitol la altul. */
export const ES_POVESTI: Record<string, Story> = { ...POVESTI_A1, ...POVESTI_A2A, ...POVESTI_A2B }
