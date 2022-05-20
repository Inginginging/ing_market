import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler from "../../../libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, phone } = req.body;
  const payload = email ? { email } : { phone: +phone }; //data
  //upsert = update+insert
  const user = await client.user.upsert({
    where: {
      ...payload,
    },
    create: {
      name: "사장님",
      ...payload,
    },
    update: {},
  });
  console.log(user);
  /* let user;
  //email을 data로 받은 경우
  if (email) {
    //기존의 회원인지 확인
    user = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (user) console.log("found it");
    //기존 회원 db에 없을 경우
    if (!user) {
      console.log("Did not find. Will Create");
      user = await client.user.create({
        data: {
          email,
          name: "사장님",
        },
      });
    }
    console.log(user);
  }
  //phone을 data로 받은 경우
  if (phone) {
    user = await client.user.findUnique({
      where: {
        phone: +phone,
      },
    });
    if (user) console.log("found it");
    if (!user) {
      console.log("Did not find. Will Create");
      user = await client.user.create({
        data: {
          phone: +phone,
          name: "사장님",
        },
      });
    }
    console.log(user);
  } */
  return res.status(200).end();
}

export default withHandler("POST", handler);
