import { Dictionary } from '@/types/dictionaryType'
import Link from 'next/link'

export default function Footer({
  dict,
  lang,
}: {
  dict: Dictionary
  lang: string
}) {
  return (
    <footer className='p-10 flex flex-col items-center gap-2 border-t border-gray-400 dark:border-gray-700'>
      <p className='text-xs text-gray-500'>
        © DrawStarter. All rights reserved.
      </p>
      <p className='text-xs text-gray-500'>Version: 1.0.0</p>
      <Link
        href={`/${lang}/terms`}
        className='text-xs text-gray-500 hover:underline hover:text-blue-500'>
        {dict.metadata.terms_of_service}
      </Link>
      <Link
        href={`/${lang}/privacy`}
        className='text-xs text-gray-500 hover:underline hover:text-blue-500'>
        {dict.metadata.privacy_policy}
      </Link>
    </footer>
  )
}
