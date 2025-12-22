import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // 1. Pegar o token do cookie
  const token = request.cookies.get('auth-token')?.value
  
  // 2. Se não tem token, redireciona para login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [

  ]
}