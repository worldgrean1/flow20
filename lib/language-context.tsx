"use client"

import React, { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from "react"
import type { Language } from "./translations"
import { detectBrowserLanguage } from "./language-utils"

// Define language context types
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isLanguageLoaded: boolean
  isAmharic: boolean
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  isLanguageLoaded: false,
  isAmharic: false,
  toggleLanguage: () => {},
})

export const useLanguage = () => useContext(LanguageContext)

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>("en")
  const [isInitialized, setIsInitialized] = useState(false)
  const isAmharic = language === "am"

  // Load language preference from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedLanguage = localStorage.getItem("preferred-language")
        console.log("LanguageProvider: Loading saved language:", savedLanguage)

        if (savedLanguage === "am" || savedLanguage === "en") {
          setLanguage(savedLanguage)
        } else {
          const detectedLanguage = detectBrowserLanguage()
          setLanguage(detectedLanguage)
        }

        setIsInitialized(true)
      } catch (error) {
        console.error("Error loading language preference:", error)
        setIsInitialized(true)
      }
    }
  }, [])

  // Save language preference and update UI when language changes
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      console.log("LanguageProvider: Saving language to localStorage:", language)
      localStorage.setItem("preferred-language", language)

      // Update HTML lang attribute
      document.documentElement.lang = language

      // Apply or remove Amharic font class to the entire document
      if (language === "am") {
        document.documentElement.classList.add("am-text")
        document.body.classList.add("amharic")
      } else {
        document.documentElement.classList.remove("am-text")
        document.body.classList.remove("amharic")
      }

      // Force a re-render of all components using translations
      const event = new CustomEvent("languagechange", { 
        detail: { language },
        bubbles: true,
        composed: true
      })
      window.dispatchEvent(event)
    }
  }, [language, isInitialized])

  const handleSetLanguage = useCallback((newLang: Language) => {
    console.log("LanguageProvider: Setting language to:", newLang)
    setLanguage(newLang)
  }, [])

  // Toggle between English and Amharic
  const toggleLanguage = useCallback(() => {
    const newLang: Language = language === "en" ? "am" : "en"
    handleSetLanguage(newLang)
  }, [language, handleSetLanguage])

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        isLanguageLoaded: isInitialized,
        isAmharic,
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
} 