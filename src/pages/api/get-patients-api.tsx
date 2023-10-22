import type { NextApiRequest, NextApiResponse } from "next";

async function fetchPatientsByNameOrEmail(name: string, email: string) {
  const neo4j = require("neo4j-driver");

  const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
  );

  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (patient:Patient) WHERE patient.name =~ '(?i).*' + $name + '.*' OR patient.email =~ '(?i).*' + $email + '.*' RETURN patient",
      {
        name,
        email,
      }
    );

    const patients = result.records.map((record) => {
      const properties = record.get("patient").properties;
      const identity = record.get("patient").identity;
      const actualIdentity = identity.low + identity.high * 0x100000000;
      const patientAge = properties.age.low;

      properties.age = patientAge;
      return {
        ...properties, // Include the properties
        identity: actualIdentity, // Include the elementId
      };
    });
    return patients;
  } finally {
    await session.close();
    await driver.close();
  }
}

async function getPatientsByNameOrEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { name, email } = req.query;

    const result = await fetchPatientsByNameOrEmail(name, email);

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

export default getPatientsByNameOrEmail;
