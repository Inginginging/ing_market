import { withApiSession } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../libs/server/client";
import withHandler, { ResponseType } from "../../../../libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id }, //query에서 product id 받아옴
    session: { user },
  } = req;
  const product = await client.product.findUnique({
    where: {
      id: +id,
    },
  });
  if (product) {
    const favExist = await client.fav.findFirst({
      where: {
        productId: +id,
        userId: user?.id,
      },
    });
    if (favExist) {
      //이미 fav에 존재하는데 fav를 또 클릭하면 삭제
      await client.fav.delete({
        where: {
          id: favExist.id,
        },
      });
    } else {
      //fav에 POST
      await client.fav.create({
        data: {
          user: {
            connect: {
              id: user?.id,
            },
          },
          product: {
            connect: {
              id: +id,
            },
          },
        },
      });
    }
    return res.json({ ok: true });
  } else {
    return res.status(404).json({ ok: false });
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
