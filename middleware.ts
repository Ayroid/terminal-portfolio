import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAuthenticated = !!req.auth;
  const path = req.nextUrl.pathname;

  if (path.startsWith("/private") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  if (path.startsWith("/auth/signin") && isAuthenticated) {
    return NextResponse.redirect(new URL("/private", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/private/:path*", "/auth/signin"],
};
