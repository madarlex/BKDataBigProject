import type { NextApiRequest, NextApiResponse } from "next";

async function addDoctor(
  name: string,
  age: number,
  email: string,
  address: string,
  phone: string,
  identity_card: string,
  department: string,
  specialization: string
) {
  const neo4j = require("neo4j-driver");

  const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
  );

  const session = driver.session();

  try {
    const result = await session.run(
      "CREATE (doctor:Doctor {name: $name, age: $age, email: $email, address: $address, phone: $phone, identity_card: $identity_card, department: $department, specialization: $specialization}) RETURN doctor",
      {
        name,
        age,
        email,
        address,
        phone,
        identity_card,
        department,
        specialization,
      }
    );

    if (result.records.length > 0) {
      const doctor = result.records[0].get("doctor").properties;
      return doctor;
    }
    return null; // Doctor not found
  } finally {
    await session.close();
    await driver.close();
  }
}

async function addDoctorApiHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const body = req.body;

    const result = await addDoctor(
      body.name,
      body.age,
      body.email,
      body.address,
      body.phone,
      body.identity_card,
      body.department,
      body.specialization
    );

    if (result != null) {
      res.status(200).json({
        message: "Create Doctor Successfully",
        doctor: result,
      });
    } else {
      res.status(500).json({ message: "Create Doctor Fail" });
    }
  }
}

export default addDoctorApiHandler;
