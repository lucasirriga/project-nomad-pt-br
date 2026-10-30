import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import layoutEn from '~/locales/en/layout.json'
import layoutPtBR from '~/locales/pt-BR/layout.json'

const STORAGE_KEY = 'nomad-lang'

function detectLanguage(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return stored
  } catch {
    // localStorage unavailable (private mode, etc.) — fall through to browser detection.
  }
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt-BR' : 'en'
}

i18n.use(initReactI18next).init({
  resources: {
    en: { layout: layoutEn },
    'pt-BR': { layout: layoutPtBR },
  },
  lng: detectLanguage(),
  fallbackLng: 'en',
  ns: ['layout'],
  defaultNS: 'layout',
  interpolation: { escapeValue: false },
})

export function setLanguage(lang: string) {
  i18n.changeLanguage(lang)
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // ignore
  }
}

export default i18n
