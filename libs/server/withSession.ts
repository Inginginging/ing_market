import { withIronSessionApiRoute } from "iron-session/next";

//rion session data의 type 추가하기
declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "ingmarketsession",
  password: process.env.COOKIE_PW!,
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
