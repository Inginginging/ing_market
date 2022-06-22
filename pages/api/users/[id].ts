import { withApiSession } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";
import client from "../../../libs/server/client";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const profile = await client.user.findUnique({
    where: { id: +req.query.id },
    include: {
      receivedReviews: true,
    },
  });
  return res.json({
    ok: true,
    profile,
  });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
