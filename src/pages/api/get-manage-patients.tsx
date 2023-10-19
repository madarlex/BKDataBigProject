import type { NextApiRequest, NextApiResponse } from "next";

async function fetchManagePatients(name: string, email: string) {
  const neo4j = require("neo4j-driver");

  const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
  );

  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (doctor:Doctor)-[r:Treatment]-(patient:Patient) WHERE doctor.name =~ '(?i).*' + $name + '.*' OR doctor.email =~ '(?i).*' + $email + '.*' RETURN patient, doctor",
      {
        name,
        email,
      }
    );

    const patients = result.records.map((record) => {
      const properties = record.get("patient").properties;
      const doctor_name = record.get("doctor").properties.name;
      const identity = record.get("patient").identity;
      const actualIdentity = identity.low + identity.high * 0x100000000;
      return {
        ...properties, // Include the properties
        identity: actualIdentity, // Include the elementId
        doctor_name: doctor_name,
      };
    });
    return patients;
  } finally {
    await session.close();
    await driver.close();
  }
}

async function getManagePatients(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { name, email } = req.query;

    const result = await fetchManagePatients(name, email);

    if (result != null) {
      res.status(200).json({
        message: "Get All Patients Successfully",
        patients: result,
      });
    } else {
      res.status(500).json({ message: "Get All Failed" });
    }
  }
}

export default getManagePatients;
