'use server'

import { NextRequest, NextResponse } from 'next/server'
import Negotiator from 'negotiator'
import { match } from '@formatjs/intl-localematcher'
import { cookies } from 'next/dist/server/request/cookies'

let locales = ['ko', 'en', 'ja']

function getLocale(request: NextRequest): string {
  let acceptLanguage = request.headers.get('accept-language') || ''
  let languages = new Negotiator({
    headers: { 'accept-language': acceptLanguage },
  }).languages(locales)
  return match(languages, locales, 'en')
}

export async function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return

  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || getLocale(request)
  // Redirect if there is no locale
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en/products
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!api|_next|public|favicon\\.ico|default-avatar\\.png).*)'],
}
