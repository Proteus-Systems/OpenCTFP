import { needsSetup } from "@/lib/setup";
import { type NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  if (await needsSetup()) {
    return NextResponse.redirect(new URL("/setup", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!setup|api/auth|api/health|_next/static|_next/image|.*\\.(?:svg|png|ico)$).*)",
  ],
};
