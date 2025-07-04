import Link from 'next/link'

export default function JpTerms({ lang }: { lang: string }) {
  return (
    <div className='p-8 shadow-md rounded-lg'>
      <h1 className='text-2xl font-bold mb-4'>利用規約</h1>
      <p className='mb-4'>
        DrawStarterへようこそ。本サービスを利用することにより、お客様は以下の利用規約に同意したものとみなされます。
      </p>

      <h2 className='text-xl font-semibold mb-2'>1. アカウント</h2>
      <p className='mb-4'>
        本サービスの特定の機能を利用するためには、アカウントの作成が必要になる場合があります。お客様は、ご自身のアカウントで発生するすべての活動に対して責任を負い、アカウント情報を安全に保管する必要があります。
      </p>

      <h2 className='text-xl font-semibold mb-2'>2. サービスの利用</h2>
      <p className='mb-4'>
        お客様は、合法的な目的のためにのみ本サービスを利用しなければなりません。違法行為、他者の権利を侵害する行為、または本サービスの運営を妨害する行為は禁止されています。
      </p>

      <h2 className='text-xl font-semibold mb-2'>3. 知的財産権</h2>
      <p className='mb-4'>
        本サービスに関連するすべてのコンテンツ（テキスト、グラフィック、ロゴ、画像など）は、DrawStarterまたはそのライセンサーの所有物であり、著作権法によって保護されています。
      </p>

      <h2 className='text-xl font-semibold mb-2'>4. 免責事項</h2>
      <p className='mb-4'>
        本サービスは「現状有姿」で提供されます。DrawStarterは、本サービスの正確性、信頼性、可用性について、いかなる保証も行いません。
      </p>

      <h2 className='text-xl font-semibold mb-2'>5. 利用規約の変更</h2>
      <p className='mb-4'>
        DrawStarterは、いつでも本利用規約を変更することができます。変更は、本サービスに掲載された時点で直ちに有効となります。
      </p>

      <h2 className='text-xl font-semibold mb-2'>6. お問い合わせ</h2>
      <p className='mb-4'>
        本利用規約に関するご質問は、
        <Link
          href='mailto:mandu9284@gmail.com'
          className='text-blue-500 hover:underline'>
          mandu9284@gmail.com
        </Link>
        までお問い合わせください。
      </p>
      <div className='mt-8 text-center'>
        <Link
          href={`/${lang}/`}
          className='text-blue-500 hover:underline'>
          Homeに戻る
        </Link>
      </div>
    </div>
  )
}
