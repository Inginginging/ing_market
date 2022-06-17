import { withApiSession } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const {
      session: { user },
      body: { name, description, price },
    } = req;
    const {
      result: {
        uid,
        rtmps: { streamKey, url },
      },
    } = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/stream/live_inputs`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.CF_STREAM_TOKEN}`,
          },
          body: `{"meta": {"name":"${name}"},"recording": { "mode": "automatic", "timeoutSeconds": 10}}`,
        }
      )
    ).json();
    const stream = await client.stream.create({
      data: {
        cloudflareId: uid,
        cloudflareUrl: url,
        cloudflareKey: streamKey,
        name,
        description,
        price,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    return res.json({
      ok: true,
      stream,
    });
  } else if (req.method === "GET") {
    const streams = await client.stream.findMany();
    return res.json({
      ok: true,
      streams,
    });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);
