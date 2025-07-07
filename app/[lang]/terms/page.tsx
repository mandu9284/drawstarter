import EnTerms from '@/components/terms/EnTerms'
import JpTerms from '@/components/terms/JaTerms'
import KrTerms from '@/components/terms/KrTerms'

export default function Page({
  params: { lang },
}: {
  params: { lang: string }
}) {
  return (
    <div className='container mx-auto p-4'>
      {lang === 'en' && <EnTerms lang={lang} />}
      {lang === 'ja' && <JpTerms lang={lang} />}
      {lang === 'ko' && <KrTerms lang={lang} />}
    </div>
  )
}
