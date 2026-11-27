import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import '@fontsource-variable/fraunces'
import '@fontsource-variable/nunito'
import './styles.css'
import App from './App'
import { t } from './i18n'

// Aplicația instalată poate sta deschisă în fundal zile întregi: verificăm actualizările
// când revine în prim-plan și o dată pe oră, nu doar la pornire.
registerSW({
  immediate: true,
  onRegisteredSW(_url, reg) {
    if (!reg) return
    // cât se descarcă versiunea nouă, arătăm discret un mesaj; la final aplicația se reîncarcă singură
    reg.addEventListener('updatefound', () => {
      if (!navigator.serviceWorker.controller) return // prima instalare, nu e o actualizare
      if (document.getElementById('update-pill')) return
      const pill = document.createElement('div')
      pill.id = 'update-pill'
      pill.className = 'update-pill'
      pill.textContent = t('Se încarcă versiunea nouă…')
      document.body.appendChild(pill)
      const sw = reg.installing
      sw?.addEventListener('statechange', () => { if (sw.state === 'redundant') pill.remove() })
    })
    const check = () => { if (navigator.onLine) reg.update().catch(() => {}) }
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') check() })
    setInterval(check, 60 * 60 * 1000)
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
