import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/health',
  '/api/auth(.*)'
]);

export default clerkMiddleware((auth, req: NextRequest) => {
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }
  return auth.protect() as unknown as NextResponse;
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
