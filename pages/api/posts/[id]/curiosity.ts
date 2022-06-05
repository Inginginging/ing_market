import { withApiSession } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../libs/server/client";
import withHandler, { ResponseType } from "../../../../libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id }, //query에서 post id 받아옴.
    session: { user },
  } = req;
  //logic이 Fav와 매우 유사.
  const curiosityExist = await client.curiosity.findFirst({
    where: {
      postId: +id,
      userId: user?.id,
    },
    select: {
      id: true,
    },
  });
  if (curiosityExist) {
    await client.curiosity.delete({
      where: {
        id: curiosityExist.id,
      },
    });
  } else {
    await client.curiosity.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        post: {
          connect: {
            id: +id,
          },
        },
      },
    });
  }
  return res.json({
    ok: true,
  });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
