import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.ua?.isBot) {
    //bot의 접근을 막음
    return new Response("Bot cannot access this page", { status: 403 });
  }
  //login 되지 않은 사용자 enter 페이지로 redirect
  if (!req.url.includes("/api")) {
    if (!req.url.includes("/enter") && !req.cookies.ingmarketsession) {
      const url = req.nextUrl.clone();
      url.pathname = "/enter";
      return NextResponse.redirect(url);
    }
  }
}
