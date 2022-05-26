import { withApiSession } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { name, price, description } = req.body; //upload page에서 useMutation을 사용해 req로 정보 보냄
  const { user } = req.session; //session에는 upload user의 정보가 있음
  const product = await client.product.create({
    data: {
      name,
      price: +price,
      description,
      image: "xx",
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });

  return res.json({
    ok: true,
    product,
  });
}

export default withApiSession(withHandler({ method: "POST", handler }));
