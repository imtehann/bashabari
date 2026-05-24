// src/context/LanguageContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import en from '../translations/en'
import bn from '../translations/bn'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'bashabari_lang'

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'en'
    } catch {
      return 'en'
    }
  })

  const t = lang === 'bn' ? bn : en

  const toggleLang = () => {
    const next = lang === 'en' ? 'bn' : 'en'
    setLang(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {}
  }

  const setLanguage = (l) => {
    setLang(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {}
  }

  // Update html lang attribute for SEO & accessibility
  useEffect(() => {
    document.documentElement.lang = lang
    if (lang === 'bn') {
      document.body.classList.add('font-bangla')
    } else {
      document.body.classList.remove('font-bangla')
    }
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
