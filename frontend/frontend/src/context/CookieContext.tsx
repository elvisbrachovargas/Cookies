import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import Cookies from 'js-cookie'
import type { CookiePreferences } from '../types/consent'
import { DEFAULT_PREFERENCES } from '../types/consent'

interface CookieContextType {
  preferences: CookiePreferences
  hasResponded: boolean
  acceptAll: () => void
  rejectOptional: () => void
  saveCustom: (prefs: Partial<CookiePreferences>) => void
}

const COOKIE_NAME = 'user_cookie_consent'
const CookieContext = createContext<CookieContextType | null>(null)

function loadScripts(preferences: CookiePreferences) {
  if (preferences.analytics && !document.getElementById('ga-script')) {
    const script = document.createElement('script')
    script.id = 'ga-script'
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'
    script.async = true
    document.head.appendChild(script)
  }

  if (preferences.marketing && !document.getElementById('marketing-script')) {
    const script = document.createElement('script')
    script.id = 'marketing-script'
    script.dataset.consent = 'marketing'
    document.head.appendChild(script)
  }
}

export function CookieProvider({ children }: { children: ReactNode }) {
  const [storedConsent] = useState(() => {
    const saved = Cookies.get(COOKIE_NAME)
    if (!saved) return null

    try {
      const parsed = JSON.parse(saved) as CookiePreferences
      return { ...DEFAULT_PREFERENCES, ...parsed, essential: true }
    } catch {
      Cookies.remove(COOKIE_NAME)
      return null
    }
  })
  const [preferences, setPreferences] = useState<CookiePreferences>(storedConsent ?? DEFAULT_PREFERENCES)
  const [hasResponded, setHasResponded] = useState(storedConsent !== null)

  useEffect(() => {
    if (storedConsent) loadScripts(storedConsent)
  }, [storedConsent])

  function saveConsent(newPreferences: CookiePreferences) {
    setPreferences(newPreferences)
    setHasResponded(true)
    Cookies.set(COOKIE_NAME, JSON.stringify(newPreferences), { expires: 365, sameSite: 'Lax' })
    loadScripts(newPreferences)
  }

  function acceptAll() {
    saveConsent({ essential: true, analytics: true, marketing: true, timestamp: new Date().toISOString() })
  }

  function rejectOptional() {
    saveConsent({ essential: true, analytics: false, marketing: false, timestamp: new Date().toISOString() })
  }

  function saveCustom(customPreferences: Partial<CookiePreferences>) {
    saveConsent({ ...DEFAULT_PREFERENCES, ...customPreferences, essential: true, timestamp: new Date().toISOString() })
  }

  return (
    <CookieContext.Provider value={{ preferences, hasResponded, acceptAll, rejectOptional, saveCustom }}>
      {children}
    </CookieContext.Provider>
  )
}

export function useCookies() {
  const context = useContext(CookieContext)
  if (!context) throw new Error('useCookies debe usarse dentro de CookieProvider')
  return context
}
