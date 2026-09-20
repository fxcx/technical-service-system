import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const SESSION_COOKIE = "tech-service-session"

// Routes that don't require authentication
const publicRoutes = ["/login", "/api/auth/login"]

// Routes that require admin role
const adminRoutes = ["/admin"]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionCookie = request.cookies.get(SESSION_COOKIE)

  // Allow public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    // If logged in and trying to access login, redirect to dashboard
    if (sessionCookie?.value && pathname === "/login") {
      try {
        const decoded = Buffer.from(sessionCookie.value, "base64").toString()
        const session = JSON.parse(decoded)
        const redirectUrl = session.role === "ADMIN" ? "/admin/dashboard" : "/technician/dashboard"
        return NextResponse.redirect(new URL(redirectUrl, request.url))
      } catch {
        // Invalid session, allow access to login

      }
    }
    return NextResponse.next()
  }

  // Check authentication for protected routes
  if (!sessionCookie?.value) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Verify session and role-based access
  try {
    const decoded = Buffer.from(sessionCookie.value, "base64").toString()
    const session = JSON.parse(decoded)

    // Check admin routes
    if (adminRoutes.some((route) => pathname.startsWith(route))) {
      if (session.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/technician/dashboard", request.url))
      }
    }

    // Check technician routes
    if (pathname.startsWith("/technician") && session.role !== "TECHNICIAN") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url))
    }
  } catch {
    // Invalid session, redirect to login
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     * - api routes that don't need auth
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|api/auth).*)",
  ],
}
