import subjects from '@/dictionaries/subjects.json'

export function getRandomPrompt(lang: 'en' | 'ja' | 'kr'): string {
  const subjectList = subjects[lang]
  const styles = ['수채화 스타일', '픽셀 아트', '흑백 잉크', '3D 렌더링']
  const extras = [
    '투명한 질감',
    '미래적인 분위기',
    '레트로 느낌',
    '화려한 색감',
  ]

  const r = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

  return `${r(subjectList)} + ${r(styles)} + ${r(extras)}`
}
