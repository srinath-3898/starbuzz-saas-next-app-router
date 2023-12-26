import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";
  const token = request.cookies.get("token")?.value || null;
  let user = request.cookies.get("user")?.value || null;
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true") {
    return NextResponse.redirect(new URL("/maintenance", request.nextUrl));
  }
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicPath && token) {
    if (user) {
      user = JSON.parse(user);
      if (path !== "/" && !user?.isEmailVerified) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
      } else if (!user?.appTour && path !== "/appTour" && path !== "/") {
        return NextResponse.redirect(new URL("/appTour", request.nextUrl));
      }
    }
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/dashboard",
    "/profile/:path*",
    "/lists/:path*",
    "/campaigns/:path*",
    "/roles",
    "/reports",
    "/users",
    "/brands",
    "/appTour",
    "/report/:path*",
  ],
};
