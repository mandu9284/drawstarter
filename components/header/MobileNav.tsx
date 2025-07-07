import Link from 'next/link'
import { Button } from '../common/Button'
import { FaBars, FaGlobe } from 'react-icons/fa'
import { User } from '@supabase/supabase-js'
import { Dictionary, Language } from '@/types/type'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useRef, useState } from 'react'

export default function MobileNav({
  user,
  isMobileMenuOpen,
  dict,
  currentLocale,
  setIsMobileMenuOpen,
  handleLogout,
  languages,
  redirectedPathName,
}: {
  user: User | null
  isMobileMenuOpen: boolean
  dict: Dictionary
  currentLocale: string
  setIsMobileMenuOpen: (isMobileMenuOpen: boolean) => void
  handleLogout: () => void
  languages: Language[]
  redirectedPathName: (locale: string) => string
}) {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const languageDropdownRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <div className='md:hidden'>
        <Button
          variant='tertiary'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className='p-2'
          aria-controls='mobile-menu'
          aria-expanded={isMobileMenuOpen}>
          <FaBars className='text-lg' />
        </Button>
      </div>
      {isMobileMenuOpen && (
        <div
          id='mobile-menu'
          className='absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-md md:hidden z-40'>
          <nav className='flex flex-col gap-2 p-2'>
            {user && (
              <>
                <div className='flex items-center justify-center'>
                  <span>{user.email}</span>
                </div>
                <div className='border-t border-gray-200 dark:border-gray-700'></div>
                <Link href={`/${currentLocale}/settings`}>
                  <Button
                    variant='tertiary'
                    size='sm'
                    onClick={() => setIsMobileMenuOpen(false)}>
                    {dict.header.settings}
                  </Button>
                </Link>
                <div className='border-t border-gray-200 dark:border-gray-700'></div>
                <Button
                  variant='tertiary'
                  onClick={handleLogout}
                  size='sm'>
                  {dict.auth.logout}
                </Button>
              </>
            )} 
            {!user && (
              <>
                <Link
                  href={`/${currentLocale}/login`}
                  onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant='tertiary'
                    size='sm'>
                    {dict.auth.login}
                  </Button>
                </Link>
                <div className='border-t border-gray-200 dark:border-gray-700'></div>
                <div
                  className='relative'
                  ref={languageDropdownRef}>
                  <Button
                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                    variant='tertiary'
                    className='flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-full justify-center'
                    aria-haspopup='true'
                    aria-expanded={isLanguageOpen}>
                    <FaGlobe className='text-lg' />
                    {dict.header.languages}
                    <IoMdArrowDropdown
                      className={`transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`}
                    />
                  </Button>

                  {isLanguageOpen && (
                    <div className='mt-2 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50'>
                      {languages.map((language) => (
                        <Link
                          key={language.code}
                          href={redirectedPathName(language.code)}
                          className='flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                          onClick={() => {
                            setIsLanguageOpen(false)
                            setIsMobileMenuOpen(false)
                          }}>
                          <span className='mr-2'>{language.flag}</span>
                          {language.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
            <div className='border-t border-gray-200 dark:border-gray-700'></div>
            <Link
              href={`/${currentLocale}/terms`}
              onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                variant='tertiary'
                size='sm'>
                {dict.header.terms}
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
