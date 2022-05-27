import mail from "@sendgrid/mail";
import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";

mail.setApiKey(process.env.SENDGRIDE_API!);
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, phone } = req.body;
  const user = email ? { email } : phone ? { phone } : null; //req로 받아온 data
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + ""; //token을 위한 random한 payload 생성
  const token = await client.token.create({
    data: {
      payload,
      user: {
        //connectOrCreate => token과 connect된 user를 찾고, 없으면 create함.
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "사장님",
            ...user,
          },
        },
      },
    },
  });
  //token 받기
  if (phone) {
    /*  const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.PHONE_NUMBER!,
      body: `Ing Market 인증번호  ${payload}`,
    }); 
    console.log(message)*/
  } else if (email) {
    /* const message = await mail.send({
      from: process.env.EMAIL!,
      to: process.env.EMAIL!,
      subject: "Ing Market 인증 메일",
      text: `당신의 인증 번호는 ${payload} 입니다.`,
      html: `<strong>당신의 인증 번호는 ${payload} 입니다.</strong>`,
    }); 
    console.log(message)*/
  }

  return res.status(200).json({ ok: true });
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
