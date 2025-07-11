import randomPromptWord from '@/dictionaries/random-prompt-word.json'
import { SupportedLanguage } from '@/types/dictionaryType'

export function getRandomPrompt(lang: SupportedLanguage): string {
  const subjectList = randomPromptWord[lang].subjects
  const styleList = randomPromptWord[lang].styles
  const extraList = randomPromptWord[lang].extras

  const r = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

  return `${r(subjectList)} + ${r(styleList)} + ${r(extraList)}`
}
