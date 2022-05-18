import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end(); //POST method가 아니면 잘못된 method
  }
  console.log(req.body.email);
  res.status(200).end();
}
