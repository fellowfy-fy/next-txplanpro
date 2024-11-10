// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('next-auth.session-token') ||
    request.cookies.get('__Secure-next-auth.session-token')
  const { pathname, searchParams } = request.nextUrl



  if (pathname.includes('/undefined')) {
    return NextResponse.redirect(new URL('/dashboard/patients', request.url))
  }

  if (session && searchParams.get('auth') === 'required') {
    const url = new URL(request.url)
    url.searchParams.delete('auth')
    return NextResponse.redirect(url)
  }

  if (!session && pathname.startsWith('/dashboard')) {
    const url = new URL('/', request.url)
    url.searchParams.set('auth', 'required')
    return NextResponse.redirect(url)
  }

  if (session && pathname === '/') {
    const url = new URL('/dashboard/profile', request.url)
    return NextResponse.redirect(url)
  }


  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/'
  ]
}