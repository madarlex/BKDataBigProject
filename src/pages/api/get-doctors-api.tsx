import type { NextApiRequest, NextApiResponse } from "next";

async function fetchDoctorsByNameOrEmail(name: string, email: string) {
  const neo4j = require("neo4j-driver");

  const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
  );

  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (doctor:Doctor) WHERE doctor.name =~ '(?i).*' + $name + '.*' OR doctor.email =~ '(?i).*' + $email + '.*' RETURN doctor",
      {
        name,
        email,
      }
    );

    const doctors = result.records.map((record) => {
      const properties = record.get("doctor").properties;
      const identity = record.get("doctor").identity;
      const actualIdentity = identity.low + identity.high * 0x100000000;
      const doctorAge = properties.age.low;

      properties.age = doctorAge;
      return {
        ...properties, // Include the properties
        identity: actualIdentity, // Include the elementId
      };
    });
    return doctors;
  } finally {
    await session.close();
    await driver.close();
  }
}

async function getDoctorsByNameOrEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { name, email } = req.query;

    const result = await fetchDoctorsByNameOrEmail(name, email);

    if (result != null) {
      res.status(200).json({
        message: "Get All Doctors Successfully",
        doctors: result,
      });
    } else {
      res.status(500).json({ message: "Get All Failed" });
    }
  }
}

export default getDoctorsByNameOrEmail;
