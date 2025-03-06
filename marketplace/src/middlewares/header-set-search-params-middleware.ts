import { NextRequest, NextResponse } from 'next/server';

export function headerSetSearchParamsMiddleware(
  request: NextRequest,
  response: NextResponse,
): NextResponse {
  const searchParams = request.nextUrl.searchParams.toString();
  response.headers.set('searchParams', searchParams);

  return response;
}
