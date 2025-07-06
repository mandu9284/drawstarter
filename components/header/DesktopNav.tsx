import { User } from '@supabase/supabase-js'
import { Button } from '../common/Button'
import { FaGlobe, FaUser } from 'react-icons/fa'
import { IoMdArrowDropdown } from 'react-icons/io'
import Link from 'next/link'
import { Dictionary, Language } from '@/types/type'

export default function DesktopNav({
  user,
  isOpen,
  dropdownRef,
  dict,
  currentLocale,
  languages,
  handleLogout,
  setIsOpen,
  redirectedPathName,
}: {
  user: User | null
  isOpen: boolean
  dropdownRef: React.RefObject<HTMLDivElement | null>
  dict: Dictionary
  currentLocale: string
  languages: Language[]
  handleLogout: () => void
  setIsOpen: (isOpen: boolean) => void
  redirectedPathName: (locale: string) => string
}) {
  return (
    <nav className='hidden md:flex items-center gap-2'>
      {user ? (
        <>
          <div
            className='relative'
            ref={dropdownRef}>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant='tertiary'
              className='flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
              aria-haspopup='true'
              aria-expanded={isOpen}>
              <FaUser className='text-lg' />
              <span>{user.email}</span>
              <IoMdArrowDropdown
                className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </Button>

            {isOpen && (
              <div className='absolute right-0 mt-2 w-50 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50'>
                <div className='flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'>
                  <span className='mr-2'>{user.email}</span>
                </div>
                <div className='border-t border-gray-200 dark:border-gray-700'></div>
                <div className='flex items-center text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'>
                  <Link
                    href={`/${currentLocale}/settings`}
                    onClick={() => setIsOpen(false)}>
                    <Button
                      variant='tertiary'
                      size='sm'>
                      {dict.header.settings}
                    </Button>
                  </Link>
                </div>
                <div className='border-t border-gray-200 dark:border-gray-700'></div>
                <div className='flex items-center text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'>
                  <Button
                    variant='tertiary'
                    size='sm'
                    onClick={handleLogout}>
                    {dict.auth.logout}
                  </Button>
                </div>
                <div className='border-t border-gray-200 dark:border-gray-700'></div>
                <div className='flex items-center text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'>
                  <Link
                    href={`/${currentLocale}/terms`}
                    onClick={() => setIsOpen(false)}>
                    <Button
                      variant='tertiary'
                      size='sm'>
                      {dict.header.terms}
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link href={`/${currentLocale}/login`}>
            <Button
              variant='tertiary'
              className='px-4 py-2 text-sm border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white transition-colors'>
              {dict.auth.login}
            </Button>
          </Link>
          <div
            className='relative'
            ref={dropdownRef}>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant='tertiary'
              className='flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
              aria-haspopup='true'
              aria-expanded={isOpen}>
              <FaGlobe className='text-lg' />
              <IoMdArrowDropdown
                className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </Button>

            {isOpen && (
              <div className='absolute right-0 mt-2 w-50 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50'>
                {languages.map((language) => (
                  <Link
                    key={language.code}
                    href={redirectedPathName(language.code)}
                    className='flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                    onClick={() => setIsOpen(false)}>
                    <span className='mr-2'>{language.flag}</span>
                    {language.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </nav>
  )
}
