import { NextRequest } from 'next/server'
import {NextResponse} from 'next/server'

const PUBLIC_ROUTES = ['/login', '/registration', '/forgetPass']

export function middleware (req:NextRequest) {
    const {pathname} = req.nextUrl

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname === '/favicon.ico' ||
        pathname.match(/\.(.*)$/)
    ) {
        return NextResponse.next()
    }

    const isPublic = PUBLIC_ROUTES.some((p)=>pathname.startsWith(p))
    if (isPublic) {
        return NextResponse.next()
    }
    const token = req.cookies.get('token')?.value
    if (!token) {
        const url = req.nextUrl.clone()
        url.pathname = '/login'
        url.searchParams.set('next', pathname)
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher:["/((?!_next/static|_next/image|favicon.ico).*)"]
}