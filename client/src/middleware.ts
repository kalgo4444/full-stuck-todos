import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { privateRoutes } from './const/routes';

export function middleware(request: NextRequest) {
  const username = request.cookies.get('uname');
  const pathname = request.nextUrl.pathname;

  if (
    !username?.value.trim() &&
    privateRoutes.some((route) => pathname.includes(route))
  ) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
}

export const config = {
  matcher: ['/tasks/:path*'],
};
