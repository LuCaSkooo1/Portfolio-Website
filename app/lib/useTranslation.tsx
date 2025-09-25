"use client"

import { useState, useContext, createContext, ReactNode } from "react"
import en from "../locales/en.json"
import sk from "../locales/sk.json"

// Define available languages
type Language = "en" | "sk"

// Infer JSON type
type Translation = typeof en

// Flatten nested keys helper (optional, keeps type-safe "hero.title" usage)
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & string]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & string]

type TranslationKey = NestedKeyOf<Translation>

const translations: Record<Language, Translation> = { en, sk }

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: TranslationKey) => string | undefined
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("sk") // default English

  const t = (key: TranslationKey): string | undefined => {
    return key
      .split(".")
      .reduce<any>((obj, part) => obj?.[part], translations[lang])
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider")
  }
  return context
}
