import { Dictionary } from '@/types/dictionaryType'
import 'server-only'

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  ja: () => import('../dictionaries/ja.json').then((module) => module.default),
  ko: () => import('../dictionaries/kr.json').then((module) => module.default),
}

export const getDictionary = async (locale: string): Promise<Dictionary> =>
  dictionaries[locale as keyof typeof dictionaries]()
