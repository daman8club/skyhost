import { NextResponse } from 'next/server'

export function middleware(request) {
  // Temporarily disable middleware for debugging
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}