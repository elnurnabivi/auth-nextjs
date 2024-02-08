import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//LOGIC PART
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  //they will not be visible who dont have token
  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";
  const token = request.cookies.get("token")?.value || "";

  //redirect authenticated users to the slash of app. In case they wanna go to signup, login
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

//MATCHING PART
export const config = {
  matcher: ["/", "/profile", "/login", "/signup", "/verifyemail"],
};
