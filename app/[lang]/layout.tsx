import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Header } from '@/components/common/Header'
import { Analytics } from '@vercel/analytics/next'
import { UserProvider } from '@/hooks/useUser'
import { getDictionary } from '@/lib/dictionaries'
import { DictionaryProvider } from '@/hooks/useDictionary'
import * as React from 'react'
import { Dictionary } from '@/types/type'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const dict: Dictionary = await getDictionary(lang)

  return {
    title: 'DrawStarter',
    description: dict.metadata.description,
    generator: 'DrawStarter',
    applicationName: 'DrawStarter',
    referrer: 'strict-origin-when-cross-origin',
    keywords: dict.metadata.keywords,
    authors: [
      {
        name: 'mandu',
        url: 'https://github.com/mandu9284',
      },
    ],
    creator: 'mandu',
    publisher: 'mandu',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://drawstarter.vercel.app/'),
    alternates: {
      canonical: '/',
      languages: {
        en: '/en',
        ko: '/ko',
        ja: '/ja',
      },
    },
    openGraph: {
      images: '/og-image.png',
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict: Dictionary = await getDictionary(lang)

  return (
    <html lang={lang}>
      <body className='bg-gray-50 text-gray-800 font-sans'>
        <UserProvider>
          <DictionaryProvider
            dict={dict}
            lang={lang}>
            <Header dict={dict} />
            <main className='max-w-md md:max-w-xl lg:max-w-2xl mx-auto p-4'>
              {children}
            </main>
            <Analytics />
          </DictionaryProvider>
        </UserProvider>
      </body>
    </html>
  )
}
