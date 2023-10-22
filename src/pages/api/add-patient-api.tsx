import type { NextApiRequest, NextApiResponse } from "next";

async function addPatient(
  name: string,
  age: number,
  email: string,
  address: string,
  phone: string,
  identity_card: string
) {
  const neo4j = require("neo4j-driver");

  const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
  );

  const session = driver.session();

  try {
    const result = await session.run(
      "CREATE (patient:Patient {name: $name, age: toInteger($age), email: $email, address: $address, phone: $phone, identity_card: $identity_card}) RETURN patient",
      {
        name,
        age,
        email,
        address,
        phone,
        identity_card,
      }
    );

    if (result.records.length > 0) {
      const patient = result.records[0].get("patient").properties;
      return patient;
    }
    return null; // patient not found
  } finally {
    await session.close();
    await driver.close();
  }
}

async function addPatientApiHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const body = req.body;

    const result = await addPatient(
      body.name,
      body.age,
      body.email,
      body.address,
      body.phone,
      body.identity_card
    );

    if (result != null) {
      res.status(200).json({
        message: "Create Patient Successfully",
        patient: result,
      });
    } else {
      res.status(500).json({ message: "Create Doctor Fail" });
    }
  }
}

export default addPatientApiHandler;
