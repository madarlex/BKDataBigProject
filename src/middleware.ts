import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("neo4j_admin_login")?.value;

  if (cookie == "True") {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/login", request.url).toString());
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*",
};
