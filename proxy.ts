import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
  if (!req.auth) {
    if (req.nextUrl.pathname.startsWith("/api")) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/api/readme/:path*", "/api/generate"],
};
