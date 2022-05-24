import { withApiSession } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body; //token을 받아옴
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
    //include:{user:true}
  }); //db의 token과 일치하는지 확인
  if (!foundToken) return res.status(404).end();
  //token이 일치한다면 user session 제작
  req.session.user = {
    id: foundToken.userId,
  };
  await req.session.save();
  //기존의 token들 모두 삭제
  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });
  return res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({ method: "POST", handler, isPrivate: false })
);
