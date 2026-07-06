import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames, excluding static assets and api routes
  matcher: ['/', '/(en|jp|zh|ko|hi)/:path*', '/((?!api|_next/static|_next/image|images|data|favicon.ico).*)']
};
