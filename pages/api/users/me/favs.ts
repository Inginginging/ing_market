import { withApiSession } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../libs/server/client";
import withHandler, { ResponseType } from "../../../../libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
  } = req;
  const favs = await client.fav.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: true,
    },
  });
  return res.json({
    ok: true,
    favs,
  });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
