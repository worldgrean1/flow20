"use client"

import { useState } from "react"
import { useTranslation } from "@/hooks/use-translation"

interface Language {
  code: string
  name: string
}

const languages: Language[] = [
  { code: "en", name: "English" },
  { code: "am", name: "Amharic" },
  { code: "fr", name: "French" },
  { code: "zh", name: "Chinese" },
]

export function LanguageSelector() {
  const { language, changeLanguage } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const selectedLanguage = languages.find((l) => l.code === language) || languages[0]

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{selectedLanguage.name}</span>
        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu-button"
        >
          <div className="py-1" role="none">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`block w-full px-4 py-2 text-left text-sm ${lang.code === language ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                onClick={() => {
                  changeLanguage(lang.code)
                  setIsOpen(false)
                }}
                role="menuitem"
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 