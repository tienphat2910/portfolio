import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  // Check if credentials are set. If not, bypass middleware to prevent crashes.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        }
      }
    }
  );

  // Refresh session
  const {
    data: { user }
  } = await supabase.auth.getUser();

  // Route matches
  const isEnAdmin = request.nextUrl.pathname.startsWith("/en/admin");
  const isViAdmin = request.nextUrl.pathname.startsWith("/vi/admin");
  const isAdminPath = isEnAdmin || isViAdmin;
  
  const isEnLogin = request.nextUrl.pathname.startsWith("/en/admin/login");
  const isViLogin = request.nextUrl.pathname.startsWith("/vi/admin/login");
  const isLoginPath = isEnLogin || isViLogin;

  if (isAdminPath && !isLoginPath) {
    if (!user) {
      const locale = isViAdmin ? "vi" : "en";
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/admin/login`;
      return NextResponse.redirect(url);
    }
  }

  if (isLoginPath && user) {
    const locale = isViLogin ? "vi" : "en";
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/admin`;
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ]
};
