'use client'

import KrTerms from '@/components/terms/KrTerms'
import JaTerms from '@/components/terms/JaTerms'
import EnTerms from '@/components/terms/EnTerms'
import { useDictionary } from '@/hooks/useDictionary'

const TermsComponents = {
  ko: KrTerms,
  ja: JaTerms,
  en: EnTerms,
} as const

export default function TermsPage() {
  const { lang } = useDictionary()
  const Terms = TermsComponents[lang as keyof typeof TermsComponents] || EnTerms

  return <Terms lang={lang} />
}
