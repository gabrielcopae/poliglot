import { useCallback, useEffect, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { saveSession, savedSession, type Session } from './accounts'
import { findLesson, getCourse } from './content'
import { db, openUserDb } from './db'
import type { Go, Route } from './nav'
import { isNight, seasonFor } from './season'
import { localGet, localSet, switchSettingsUser, useSettings } from './settings'
import { today } from './util'
import { Intro } from './components/Intro'
import { SeasonScene } from './components/SeasonScene'
import { BottomNav } from './components/ui'
import { Home } from './screens/Home'
import { CourseScreen } from './screens/CourseScreen'
import { LessonScreen } from './screens/LessonScreen'
import { ChapterOverview, HomeworkScreen, SessionScreen } from './screens/ChapterScreen'
import { ReviewScreen } from './screens/ReviewScreen'
import { KanaScreen } from './screens/KanaScreen'
import { StatsScreen } from './screens/StatsScreen'
import { SettingsScreen } from './screens/SettingsScreen'
import { LoginScreen } from './screens/LoginScreen'
import { DictionaryScreen } from './screens/DictionaryScreen'
import { PassportScreen } from './screens/PassportScreen'
import { AlbumScreen } from './screens/AlbumScreen'
import { TalkScreen, TalksScreen } from './screens/TalkScreen'
import { ExamScreen } from './screens/ExamScreen'
import { KanjiListScreen, KanjiOneScreen } from './screens/KanjiDrawScreen'

function shouldShowIntro(mode: string) {
  if (mode === 'never') return false
  if (mode === 'always') return true
  return localGet('poliglot.introDate') !== today()
}

/** Ceasul aplicației: se actualizează la fiecare minut ca tema să se schimbe singură. */
function useNow() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(t)
  }, [])
  return now
}

function activate(s: Session | null) {
  if (s) openUserDb(s.dbName)
  switchSettingsUser(s?.key ?? null)
}

// Contul ținut minte de la ultima deschidere
const initialSession = savedSession()
activate(initialSession)

export default function App() {
  const settings = useSettings()
  const now = useNow()
  const season = settings.season === 'auto' ? seasonFor(now) : settings.season
  const night = settings.time === 'auto' ? isNight(now) : settings.time === 'night'
  const [intro, setIntro] = useState(() => shouldShowIntro(settings.intro))
  const [session, setSession] = useState<Session | null>(initialSession)

  useEffect(() => {
    document.documentElement.dataset.season = season
    document.documentElement.dataset.time = night ? 'night' : 'day'
    const color = getComputedStyle(document.documentElement).getPropertyValue('--bg1').trim()
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color || '#c2552d')
  }, [season, night])

  useEffect(() => {
    navigator.storage?.persist?.().catch(() => {})
  }, [])

  const endIntro = useCallback(() => {
    localSet('poliglot.introDate', today())
    setIntro(false)
  }, [])

  const signIn = useCallback((s: Session) => {
    activate(s)
    saveSession(s)
    history.replaceState({ name: 'home' }, '')
    setSession(s)
  }, [])

  const signOut = useCallback(() => {
    saveSession(null)
    activate(null)
    history.replaceState({ name: 'home' }, '')
    setSession(null)
  }, [])

  return (
    <>
      <SeasonScene season={season} night={night} particles={settings.particles} />
      {intro && <Intro onDone={endIntro} />}
      {session ? (
        <MainApp key={session.key} session={session} season={season} signOut={signOut} />
      ) : (
        <main className="app"><LoginScreen onLogin={signIn} /></main>
      )}
    </>
  )
}

function MainApp({ session, season, signOut }: { session: Session; season: ReturnType<typeof seasonFor>; signOut: () => void }) {
  const [route, setRoute] = useState<Route>(() => (history.state as Route | null) ?? { name: 'home' })

  useEffect(() => {
    if (!history.state) history.replaceState({ name: 'home' }, '')
    const onPop = (e: PopStateEvent) => setRoute((e.state as Route | null) ?? { name: 'home' })
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const go: Go = useCallback((r) => {
    history.pushState(r, '')
    setRoute(r)
    window.scrollTo(0, 0)
  }, [])
  const back = useCallback(() => history.back(), [])
  // înlocuiește ecranul curent (ex. o ședință terminată) fără să-l lase în istoric
  const replace: Go = useCallback((r) => {
    history.replaceState(r, '')
    setRoute(r)
    window.scrollTo(0, 0)
  }, [])

  const due = useLiveQuery(() => db.cards.where('due').belowOrEqual(Date.now()).count(), [route], 0)
  const showNav = !['lesson', 'session', 'homework', 'dictionary', 'talk', 'exam', 'kanjiOne'].includes(route.name)

  return (
    <>
      <main className={`app ${showNav ? 'with-nav' : ''}`}>
        {route.name === 'home' && <Home go={go} season={season} user={session.name} />}
        {route.name === 'course' && <CourseScreen lang={route.lang} go={go} back={back} />}
        {route.name === 'lesson' && (findLesson(getCourse(route.lang), route.lessonId)?.chapter
          ? <ChapterOverview key={route.lessonId} lang={route.lang} lessonId={route.lessonId} go={go} back={back} />
          : <LessonScreen key={route.lessonId} lang={route.lang} lessonId={route.lessonId} back={back} />)}
        {route.name === 'session' && (
          <SessionScreen
            key={`${route.lessonId}-${route.session}-${route.step ?? 0}`}
            lang={route.lang}
            lessonId={route.lessonId}
            session={route.session}
            startStep={route.step}
            back={back}
            toChapter={() => (route.fromChapter ? back() : replace({ name: 'lesson', lang: route.lang, lessonId: route.lessonId }))}
          />
        )}
        {route.name === 'homework' && <HomeworkScreen key={route.lessonId} lang={route.lang} lessonId={route.lessonId} back={back} />}
        {route.name === 'review' && <ReviewScreen key={route.lang ?? 'all'} lang={route.lang} back={route.lang ? back : undefined} />}
        {route.name === 'kana' && <KanaScreen back={back} />}
        {route.name === 'dictionary' && <DictionaryScreen key={route.lang} lang={route.lang} back={back} />}
        {route.name === 'stats' && <StatsScreen />}
        {route.name === 'passport' && <PassportScreen go={go} back={back} />}
        {route.name === 'album' && <AlbumScreen back={back} />}
        {route.name === 'talks' && <TalksScreen go={go} back={back} />}
        {route.name === 'kanjiList' && <KanjiListScreen go={go} back={back} />}
        {route.name === 'kanjiOne' && <KanjiOneScreen key={route.char} char={route.char} go={go} back={back} />}
        {route.name === 'exam' && <ExamScreen key={route.lang + route.level} lang={route.lang} level={route.level} back={back} />}
        {route.name === 'talk' && <TalkScreen key={route.id} id={route.id} back={back} />}
        {route.name === 'settings' && <SettingsScreen user={session.name} signOut={signOut} />}
      </main>
      {showNav && <BottomNav current={route.name} go={go} due={due} />}
    </>
  )
}
