import { NextResponse, type NextRequest } from 'next/server';

const PUBLIC = ['/login', '/'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get('safepit_session');

  if (PUBLIC.includes(pathname)) {
    if (session && pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    if (pathname === '/' && session) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    if (pathname === '/' && !session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
