import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type Role = keyof typeof roleBasedPrivateRoutes;

const AuthRoutes = ['/login', '/register'];
const commonPrivateRoutes = [
   '/dashboard',
   '/dashboard/change-password',
   '/doctors',
   '/flatPost',
   '/flatDetails',
   '/flatShareRequest'

];
const roleBasedPrivateRoutes = {
   USER: [/^\/dashboard\/user/, /^\/flatDetails\/[a-z0-9-]+/,/^\/flatShareRequest\/[a-z0-9-]+/],
   ADMIN: [/^\/dashboard\/admin/,/^\/flatDetails\/[a-z0-9-]+/,/^\/flatShareRequest\/[a-z0-9-]+/],
   SUPER_ADMIN: [/^\/dashboard\/super-admin/,/^\/flatDetails\/[a-z0-9-]+/,/^\/flatShareRequest\/[a-z0-9-]+/],
};

export function middleware(request: NextRequest) {
   const { pathname } = request.nextUrl;

   const accessToken = cookies().get('accessToken')?.value;

   if (!accessToken) {
      if (AuthRoutes.includes(pathname)) {
         return NextResponse.next();
      } else {
         return NextResponse.redirect(new URL('/login', request.url));
      }
   }

   if (
      accessToken &&
      (commonPrivateRoutes.includes(pathname) ||
         commonPrivateRoutes.some((route) => pathname.startsWith(route)))
   ) {
      return NextResponse.next();
   }

   let decodedData = null;

   if (accessToken) {
      decodedData = jwtDecode(accessToken) as any;
   }

   const role = decodedData?.role;

   // if (role === 'ADMIN' && pathname.startsWith('/dashboard/admin')) {
   //    return NextResponse.next();
   // }

   if (role && roleBasedPrivateRoutes[role as Role]) {
      const routes = roleBasedPrivateRoutes[role as Role];
      if (routes.some((route) => pathname.match(route))) {
         return NextResponse.next();
      }
   }

   return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
   matcher: ['/login', '/register', '/dashboard/:page*', '/doctors/:page*'],
};
