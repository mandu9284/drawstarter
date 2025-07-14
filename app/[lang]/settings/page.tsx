'use client'

import { redirect } from 'next/navigation'
import { useDictionary } from '@/hooks/useDictionary'
import { languages } from '@/types/dictionaryType'
import Link from 'next/link'
import { useUser } from '@/hooks/useUser'
import { useTheme } from '@/hooks/useTheme'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { setCookie } from '@/lib/cookie'

export default function SettingsPage() {
  const { dict, lang } = useDictionary()
  const { user } = useUser()
  const { theme, setTheme } = useTheme()

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // set cookie
    setCookie('NEXT_LOCALE', e.target.value, 365)
    redirect(`/${e.target.value}/settings`)
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <div className='flex flex-col items-center py-2 text-gray-800 dark:text-white'>
      <h1 className='text-2xl sm:text-3xl font-bold'>{dict.header.settings}</h1>

      <div className='flex flex-col items-stretch py-2 mt-4 w-full'>
        <label
          htmlFor='language'
          className='text-lg font-semibold'>
          {dict.header.language_label}
        </label>
        <select
          name='language'
          id='language'
          onChange={handleLanguageChange}
          value={lang}
          className='w-full border border-gray-300 rounded-md px-2 py-1 mt-4'>
          {languages.map((language) => (
            <option
              key={language.code}
              value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
      </div>

      <div className='flex flex-col items-stretch py-2 mt-4 w-full'>
        <h2 className='text-lg font-semibold'>{dict.settings.theme_label}</h2>
        <div className='flex gap-4 mt-4'>
          <label className='inline-flex items-center'>
            <input
              type='radio'
              className='form-radio'
              name='theme'
              value='light'
              checked={theme === 'light'}
              onChange={() => handleThemeChange('light')}
            />
            <span className='ml-2'>{dict.settings.light_mode}</span>
          </label>
          <label className='inline-flex items-center'>
            <input
              type='radio'
              className='form-radio'
              name='theme'
              value='dark'
              checked={theme === 'dark'}
              onChange={() => handleThemeChange('dark')}
            />
            <span className='ml-2'>{dict.settings.dark_mode}</span>
          </label>
        </div>
      </div>

      {user && (
        <>
          <div className='flex flex-col items-stretch py-2 mt-4 w-full'>
            <h2 className='text-lg font-semibold'>
              {dict.settings.change_password_title}
            </h2>

            <Link
              href={`/${lang}/settings/password`}
              className='text-blue-500 hover:underline mt-4 flex items-center gap-1'>
              {dict.settings.change_password_button}
              <FaArrowUpRightFromSquare className='w-4 h-4' />
            </Link>
          </div>

          <div className='flex flex-col items-stretch py-2 mt-4 w-full'>
            <h2 className='text-lg font-semibold'>
              {dict.settings.profile_title}
            </h2>
            <Link
              href={`/${lang}/settings/profile`}
              className='text-blue-500 hover:underline mt-4 flex items-center gap-1'>
              {dict.settings.profile_button}
              <FaArrowUpRightFromSquare className='w-4 h-4' />
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
