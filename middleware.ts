import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [

  "/login",
  "/signup",
  "/auth/callback",
  "/products",
  "/vendors",
];

const protectedRoutes = ["/profile", "/checkout", "/cart", "/orders"];

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = req.cookies.get("access_token")?.value || null;

  const isPublic = publicRoutes.some((r) => pathname.startsWith(r));
  if (isPublic) return NextResponse.next();

  const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"], // <--- THE FIX
};
