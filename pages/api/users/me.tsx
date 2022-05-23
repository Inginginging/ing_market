import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";

//rion session data의 type 추가하기
declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.session.user);
  //session에 저장된 user의 id와 동일한 id를 가진 user를 db에서 찾아와 할당
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });
  return res.json({
    ok: true,
    profile,
  });
}

export default withIronSessionApiRoute(withHandler("GET", handler), {
  cookieName: "ingmarketsession",
  password:
    "88995564752ajdl;ajiowpjrioqhoaJL;dajojeojawoaljflaohwonqlmlafnoaheoa;",
});
