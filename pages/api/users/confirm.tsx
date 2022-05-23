import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body; //token을 받아옴
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
    //include:{user:true}
  }); //db의 token과 일치하는지 확인
  if (!exists) return res.status(404).end();
  //token이 일치한다면 user session 제작
  req.session.user = {
    id: exists.userId,
  };
  await req.session.save();
  console.log(token);
  return res.status(200).end();
}

export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "ingmarketsession",
  password:
    "88995564752ajdl;ajiowpjrioqhoaJL;dajojeojawoaljflaohwonqlmlafnoaheoa;",
});
