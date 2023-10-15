import type { NextApiRequest, NextApiResponse } from "next";
import { serialize, CookieSerializeOptions } from "cookie";

async function fetchUserByName(username: string, password: string) {
  const neo4j = require("neo4j-driver");

  const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
  );

  const session = driver.session();

  try {
    const result = await session.run(
      "match (user:Neo4JAdmin {username: $username, password: $password}) return user",
      {
        username,
        password,
      }
    );

    if (result.records.length > 0) {
      const user = result.records[0].get("user").properties;
      return user;
    }
    return null; // User not found
  } finally {
    await session.close();
    await driver.close();
  }
}

async function loginInHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const body = req.body;

    const result = await fetchUserByName(body.username, body.password);

    if (result != null) {
      res.setHeader(
        "Set-Cookie",
        serialize("neo4j_admin_login", "True", {
          path: "/",
          httpOnly: true,
          maxAge: 86400,
        })
      );
      res.status(200).json({
        message: "Login Successfully",
        username: result.username,
      });
    } else {
      res.status(401).json({ message: "Login Fail, Wrong Pass or Username" });
    }
  }
}

export default loginInHandler;
