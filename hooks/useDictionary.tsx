'use client'

import { createContext, ReactNode, useContext } from 'react'

interface DictionaryContextType {
  dict: Dictionary
  lang: string
}

const DictionaryContext = createContext<DictionaryContextType | undefined>(
  undefined,
)

export function DictionaryProvider({
  children,
  dict,
  lang,
}: {
  children: ReactNode
  dict: Dictionary
  lang: string
}) {
  return (
    <DictionaryContext.Provider value={{ dict, lang }}>
      {children}
    </DictionaryContext.Provider>
  )
}

export function useDictionary() {
  const context = useContext(DictionaryContext)
  if (context === undefined) {
    throw new Error('useDictionary must be used within a DictionaryProvider')
  }
  return context
}
