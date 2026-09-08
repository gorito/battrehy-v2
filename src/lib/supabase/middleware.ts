import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Only execute auth logic for protected admin routes.
  // Public pages must return immediately to avoid external network calls and 504 timeouts.
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // refreshing the auth token only for /admin
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    // no user, redirect to login page
    const url = request.nextUrl.clone()
    url.pathname = '/portal-access'
    return NextResponse.redirect(url)
  }

  // restrict to specific email
  const ALLOWED_EMAILS = ['info@battrehy.se', 'info@gorito.com'];
  if (!user.email || !ALLOWED_EMAILS.includes(user.email)) {
    console.warn(`Unauthorized access attempt to /admin by ${user.email}`);
    const url = request.nextUrl.clone()
    url.pathname = '/' // Redirect to home page if not authorized
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
