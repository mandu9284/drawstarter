import subjects from '@/dictionaries/subjects.json'

export function getRandomPrompt(lang: 'en' | 'ja' | 'kr'): string {
  const subjectList = subjects[lang].subjects
  const styleList = subjects[lang].styles
  const extraList = subjects[lang].extras

  const r = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

  return `${r(subjectList)} + ${r(styleList)} + ${r(extraList)}`
}
