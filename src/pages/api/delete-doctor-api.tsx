import type { NextApiRequest, NextApiResponse } from "next";

async function deleteDoctor(name: string) {
  const neo4j = require("neo4j-driver");

  const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
  );

  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (doctor:Doctor {name: $name}) DETACH DELETE doctor",
      {
        name,
      }
    );
    return true; // Deletion successful
  } catch (error) {
    console.error("Error deleting patient:", error);
    return false; // Handle the error and return false
  } finally {
    await session.close();
    await driver.close();
  }
}

async function deleteDoctorApiHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { name } = req.query;
    const result = await deleteDoctor(name);

    if (result) {
      res.status(200).json({
        message: "Delete Doctor Successfully",
      });
    } else {
      res.status(500).json({ message: "Delete Doctor Fail" });
    }
  }
}

export default deleteDoctorApiHandler;
