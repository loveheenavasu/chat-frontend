import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const path = request.nextUrl.pathname;

  // If the user is authenticated and trying to access the login or signup page, redirect them to the homepage
  if (token && (path === "/login" || path === "/signUp")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the user is not authenticated and trying to access a protected route, redirect them to the login page
  if (!token && path !== "/login" && path !== "/signUp") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow the request to continue if none of the above conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signUp", "/"], // Add other protected paths here if necessary
};
