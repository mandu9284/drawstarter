'use client'

import { createContext, ReactNode } from 'react'
import { Dictionary } from '@/types/dictionaryType'

interface DictionaryContextType {
  dict: Dictionary
  lang: string
}

export const DictionaryContext = createContext<DictionaryContextType | null>(
  null,
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
    <DictionaryContext value={{ dict, lang }}>{children}</DictionaryContext>
  )
}
