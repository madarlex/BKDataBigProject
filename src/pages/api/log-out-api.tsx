import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

async function logOutInHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.setHeader(
      "Set-Cookie",
      serialize("neo4j_admin_login", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0), // Set the expiration date in the past
      })
    );

    res.status(200).json({ message: "Cookie Deleted" });
  }
}

export default logOutInHandler;
