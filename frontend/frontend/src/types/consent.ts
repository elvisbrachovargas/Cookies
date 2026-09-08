export interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
  timestamp: string
}

export const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
  timestamp: new Date().toISOString(),
}
