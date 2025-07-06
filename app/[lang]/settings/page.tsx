'use client'

import { redirect } from 'next/navigation'
import { useDictionary } from '@/hooks/useDictionary'
import { languages } from '@/types/type'

export default function SettingsPage() {
  const { dict, lang } = useDictionary()

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    redirect(`/${e.target.value}/settings`)
  }

  return (
    <div className='flex flex-col items-center py-2'>
      <h1 className='text-2xl sm:text-3xl font-semibold'>
        {dict.header.settings}
      </h1>

      <div className='flex flex-col items-start py-2 mt-4 w-full'>
        <label
          htmlFor='language'
          className='mr-2 md:mr-2'>
          {dict.header.language_label}
        </label>
        <select
          name='language'
          id='language'
          onChange={handleLanguageChange}
          value={lang}
          className='w-full border border-gray-300 rounded-md px-2 py-1 mt-2 bg-gray-700'>
          {languages.map((language) => (
            <option
              key={language.code}
              value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
