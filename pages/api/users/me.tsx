import { withApiSession } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  //session에 저장된 user의 id와 동일한 id를 가진 user를 db에서 찾아와 할당
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });
  return res.json({
    ok: true,
    profile,
  });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
