import { withApiSession } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";
import client from "../../../../libs/server/client";
import withHandler, { ResponseType } from "../../../../libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    //session에 저장된 user의 id와 동일한 id를 가진 user를 db에서 찾아와 할당
    const profile = await client.user.findUnique({
      where: { id: req.session.user?.id },
    });
    return res.json({
      ok: true,
      profile,
    });
  }
  if (req.method === "POST") {
    const {
      session: { user },
      body: { email, phone, name },
    } = req;
    const currentUser = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });
    //currentUser의 email과 새로 받은 email이 다를때
    if (email && email !== currentUser?.email) {
      const alreadyExists = await client.user.findUnique({
        where: { email },
        select: { id: true },
      });
      //이미 email 사용자가 있으면
      if (alreadyExists) {
        return res.json({
          ok: false,
          error: "This Email has Already Taken",
        });
      }
      //중복이 안된 email이라면
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          email,
        },
      });
      res.json({ ok: true });
    }
    //currentUser의 phone과 새로 받은 phone이 다를때
    if (phone && phone !== currentUser?.phone) {
      const alreadyExists = await client.user.findUnique({
        where: { phone },
        select: { id: true },
      });
      //이미 phone 사용자가 있으면
      if (alreadyExists) {
        return res.json({
          ok: false,
          error: "This Phone number has Already Taken",
        });
      }
      //중복이 안된 phone이라면
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          phone,
        },
      });
      res.json({ ok: true });
    }
    //name은 중복 가능. data로 들어왔는지만 확인
    if (name) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          name,
        },
      });
      res.json({ ok: true });
    }
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);
