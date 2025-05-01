"use client"

import { useLanguage } from "../../../lib/language-context"
import { Button } from "./button"

// Import flag icons from Lucide or create custom flag components
const EthiopiaFlag = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="block">
    <rect y="6" width="32" height="6" fill="#078930"/>
    <rect y="12" width="32" height="6" fill="#FCDD09"/>
    <rect y="18" width="32" height="6" fill="#DA121A"/>
    <circle cx="16" cy="15" r="4" fill="#0645AD" stroke="#FCDD09"/>
  </svg>
);

const UKFlag = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="block">
    <rect width="32" height="32" fill="#012169"/>
    <path d="M0 0L32 32M32 0L0 32" stroke="white" strokeWidth="4"/>
    <path d="M0 0L32 32M32 0L0 32" stroke="#C8102E" strokeWidth="2"/>
    <path d="M16 0V32M0 16H32" stroke="white" strokeWidth="8"/>
    <path d="M16 0V32M0 16H32" stroke="#C8102E" strokeWidth="4"/>
  </svg>
);

export function LanguageSwitch() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <Button 
      onClick={toggleLanguage}
      variant="outline" 
      className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-white rounded-md w-[32px] h-[32px] p-0 flex items-center justify-center"
      style={{ 
        backdropFilter: 'blur(8px)',
        background: 'rgba(30, 41, 59, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        minWidth: '32px',
        minHeight: '32px',
        padding: '4px'
      }}
      title={language === "en" ? "Switch to Amharic" : "Switch to English"}
    >
      {language === "en" ? <EthiopiaFlag /> : <UKFlag />}
    </Button>
  )
} 