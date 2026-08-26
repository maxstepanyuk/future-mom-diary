import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parseSetCookie } from "cookie";
import { checkSessionServer } from "./lib/api/serverApi";

const privateRoutes = [
  "/profile",
  "/diary",
  "/journey",
  "/auth/register/onboarding",
];
const publicRoutes = ["/auth/register", "/auth/login"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!accessToken) {
    if (refreshToken) {
      // If accessToken is missing but refreshToken exists — the session needs to be checked even for a public route,
      // since the session may still be active, in which case access to the public route must be blocked.
      const data = await checkSessionServer();
      // console.log(data);
      const setCookie = data.headers["set-cookie"];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parseSetCookie(cookieStr);

          if (parsed.value) {
            cookieStore.set(parsed.name, parsed.value, parsed);
          }
        }
        // If the session is still active:
        // for a public route — redirect to the home page.
        if (isPublicRoute) {
          return NextResponse.redirect(new URL("/", request.url), {
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
        // for a private route — allow access
        if (isPrivateRoute) {
          console.log(cookieStore.toString());
          return NextResponse.next({
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
      }
    }
    // If there is no refreshToken or no session:
    // public route — allow access
    if (isPublicRoute) {
      return NextResponse.next();
    }

    // private route — redirect to the login page
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/auth/register", request.url));
    }
  }

  // If accessToken exists:
  // public route — redirect to the home page
  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // private route — allow access
  if (isPrivateRoute) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/profile",
    "/diary",
    "/journey/:path*",
    "/auth/login",
    "/auth/register",
  ],
};