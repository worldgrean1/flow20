import { useState } from 'react';

// Simple translation hook that can be expanded later
export function useTranslation() {
  const [language, setLanguage] = useState<string>('en');

  // Basic translation function
  const t = (key: string, replacements: Record<string, string> = {}): string => {
    // For now, just return the key since we don't have actual translations
    let result = key;
    
    // Handle replacements
    Object.entries(replacements).forEach(([k, v]) => {
      result = result.replace(new RegExp(`{{${k}}}`, 'g'), v);
    });
    
    return result;
  };

  // Allow changing language
  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
    // Here you would add logic to load new translation files
  };

  return {
    t,
    language,
    changeLanguage,
  };
} 