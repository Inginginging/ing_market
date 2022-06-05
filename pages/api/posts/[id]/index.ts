import { withApiSession } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../libs/server/client";
import withHandler, { ResponseType } from "../../../../libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const post = await client.post.findFirst({
    where: {
      id: +id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      answers: {
        select: {
          id: true,
          answer: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          answers: true,
          curiosity: true,
        },
      },
    },
  });
  const isCuriosity = Boolean(
    await client.curiosity.findFirst({
      where: {
        postId: +id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  return res.json({
    ok: true,
    post,
    isCuriosity,
  });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
