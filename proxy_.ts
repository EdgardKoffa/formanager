
import { auth } from "@/app/api/auth/auth"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export default auth((req) => {
  // Condition 1 : utilisateur connecté
  const userSession= req.auth?.user as any
  //console.log("Session utilisateur:", userSession)
  if (!userSession?.id) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Condition 2 : vérifier le rôle
 /*  const role = userSession?.role
  if (req.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url))
  } */

 /*  if (req.nextUrl.pathname.startsWith("/employe") && role !== "employe") {
    return NextResponse.redirect(new URL("/unauthorized", req.url))
  } */

 /*  if (req.nextUrl.pathname.startsWith("/etudiant") && role !== "etudiant") {
    return NextResponse.redirect(new URL("/unauthorized", req.url))
  }
 */
  // Si toutes les conditions passent → accès autorisé
})

/* export const config = {
  matcher: ["/:path*", "/admin/:path*", "/employe/:path*", "/etudiant/:path*"],
}
 */

  export const config = {
  matcher: [
    '/:path*',
  //  '/((?!api/auth|_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.jpeg$).*)',
  /* {
      source: '/api/:path*',
      locale: false,
      has: [
        { type: 'header', key: 'Authorization', value: 'Bearer Token' },
        { type: 'query', key: 'userId', value: '123' },
      ],
      missing: [{ type: 'cookie', key: 'session', value: 'active' }],
    },  */
  ],
}