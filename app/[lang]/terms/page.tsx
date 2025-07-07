import EnTerms from '@/components/terms/EnTerms'
import JpTerms from '@/components/terms/JaTerms'
import KrTerms from '@/components/terms/KrTerms'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return (
    <div className='container mx-auto p-4'>
      {lang === 'en' && <EnTerms lang={lang} />}
      {lang === 'ja' && <JpTerms lang={lang} />}
      {lang === 'ko' && <KrTerms lang={lang} />}
    </div>
  )
}
