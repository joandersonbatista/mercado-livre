import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { headerSetSearchParamsMiddleware } from '@/middlewares/header-set-search-params-middleware';

export function middleware(request: NextRequest): NextResponse {
  let response = NextResponse.next();

  response = headerSetSearchParamsMiddleware(request, response);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|.*\\.svg$|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
