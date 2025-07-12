import { User } from '@supabase/supabase-js'
import { Button } from '@/components/common/Button'
import { FaGlobe, FaUser } from 'react-icons/fa'
import { IoMdArrowDropdown } from 'react-icons/io'
import Link from 'next/link'
import { Dictionary, Language } from '@/types/dictionaryType'
import { UserProfile } from '@/types/userType'
import { AvatarImage } from '@/components/common/AvartarImage'
import { CiLogout, CiSettings } from 'react-icons/ci'

export default function DesktopNav({
  user,
  profile,
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
  profile: UserProfile | null
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
              {profile?.profilePictureUrl ? (
                <AvatarImage
                  src={`avatars/${profile?.profilePictureUrl}`}
                  alt='Profile Picture'
                  width={48}
                  height={48}
                  quality={50}
                />
              ) : (
                <FaUser className='text-lg' />
              )}
              <IoMdArrowDropdown
                className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </Button>

            {isOpen && (
              <div
                className='absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 z-50 ml-4 dark:bg-gray-800 bg-white'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='user-menu'>
                <div className='px-4 py-3 border-b border-gray-100 dark:border-gray-700'>
                  <p className='text-sm font-medium text-gray-800 dark:text-white text-left'>
                    {profile?.userName || ''}
                  </p>
                  <p className='text-sm text-gray-500 dark:text-gray-300 truncate text-left'>
                    {user?.email || ''}
                  </p>
                </div>
                <ul
                  className='py-1'
                  role='none'>
                  <li>
                    <Link
                      href={`/${currentLocale}/settings`}
                      className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                      role='menuitem'
                      onClick={() => setIsOpen(false)}>
                      <CiSettings className='mr-3 text-lg' />
                      {dict.header.settings}
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className='flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer'
                      role='menuitem'>
                      <CiLogout className='mr-3 text-lg' />
                      {dict.auth.logout}
                    </button>
                  </li>
                </ul>
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
