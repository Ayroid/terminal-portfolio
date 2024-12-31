import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});

// Protect all routes under /private
export const config = {
  matcher: "/private/:path*",
};
