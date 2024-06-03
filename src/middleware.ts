import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type Role = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

const AuthRoutes = ['/login', '/register'];
const commonPrivateRoutes = [
    '/dashboard',
    '/dashboard/change-password',
    '/doctors',
    '/flatPost',
    '/flatDetails',
    '/flatShareRequest'
];

const roleBasedPrivateRoutes: Record<Role, RegExp[]> = {
    USER: [/^\/dashboard\/user/],
    ADMIN: [/^\/dashboard\/admin/],
    SUPER_ADMIN: [/^\/dashboard\/super-admin/],
};

interface DecodedData {
    role?: Role;
}

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

    let decodedData: DecodedData = {};

    if (accessToken) {
        try {
            decodedData = jwtDecode<DecodedData>(accessToken);
        } catch (error) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    const role = decodedData.role;

    if (role && roleBasedPrivateRoutes[role]) {
        const routes = roleBasedPrivateRoutes[role];
        if (routes.some((route) => route.test(pathname))) {
            return NextResponse.next();
        }
    }

    return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
    matcher: ['/login', '/register', '/dashboard/:path*','/flatPost','/flatPost/:path*', '/flatDetails/:path*','/flatShareRequest' ,'/flatShareRequest/:path*'],
};
