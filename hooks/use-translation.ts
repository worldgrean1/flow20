"use client"

import { useLanguage } from "../lib/language-context"
import { getTranslation } from "../lib/translations"
import { useEffect, useState } from "react"

export function useTranslation() {
  const { language, isLanguageLoaded } = useLanguage()
  const [isTranslating, setIsTranslating] = useState(false)

  useEffect(() => {
    // Reset translating state when language changes
    setIsTranslating(false)
  }, [language])

  const t = (key: string, fallback?: string): string => {
    if (!isLanguageLoaded) {
      return fallback || key
    }

    setIsTranslating(true)
    try {
      const translation = getTranslation(key, language)
      return translation || fallback || key
    } catch (error) {
      console.error(`Translation error for key "${key}":`, error)
      return fallback || key
    } finally {
      setIsTranslating(false)
    }
  }

  return {
    t,
    isTranslating,
    isLanguageLoaded,
    language,
  }
} 