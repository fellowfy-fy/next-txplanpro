// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('next-auth.session-token')
  const { pathname, searchParams } = request.nextUrl

  // Если есть сессия и параметр auth=required, удаляем его
  if (session && searchParams.get('auth') === 'required') {
    const url = new URL(request.url)
    url.searchParams.delete('auth')
    return NextResponse.redirect(url)
  }

  // Если нет сессии и путь защищенный, редиректим с параметром
  if (!session && pathname.startsWith('/dashboard')) {
    const url = new URL('/', request.url)
    url.searchParams.set('auth', 'required')
    return NextResponse.redirect(url)
  }


  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
  ]
}