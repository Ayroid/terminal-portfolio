import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";

export default async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  const path = req.nextUrl.pathname;

  if (path.startsWith("/private") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  if (path.startsWith("/auth/signin") && isAuthenticated) {
    return NextResponse.redirect(new URL("/private", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/private/:path*", "/auth/signin"],
};
