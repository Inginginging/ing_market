import { withApiSession } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query; //req받은 url의 query사용
  const product = await client.product.findUnique({
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
    },
  });
  //product의 name을 공백을 기준으로 나눠 related product 찾기
  const terms = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));
  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms, //terms에 해당하는 product 찾기
      AND: {
        id: {
          not: product?.id, //자기 자신은 제외
        },
      },
    },
  });
  return res.json({ ok: true, product, relatedProducts });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
