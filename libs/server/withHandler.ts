import { NextApiRequest, NextApiResponse } from "next";

//res type
export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

interface ConfigType {
  method: "GET" | "POST" | "DELETE";
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

export default function withHandler({
  method,
  handler,
  isPrivate = true,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    if (req.method !== method) {
      //옳지 않은 req일때.
      return res.status(405).end();
    }
    //login 하지 않은 사용자가 private한 영역으로 들어올때.
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: "Should Log In" });
    }
    try {
      //정상일 시 return 되어 실행될 함수
      await handler(req, res);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
}
