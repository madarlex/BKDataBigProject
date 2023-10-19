import type { NextApiRequest, NextApiResponse } from "next";

async function matchDoctortoPatients(
  namesParam: string,
  name: string,
  diagnosis: string,
  treatment_cost: number,
  instruction: string,
  meeting_time: number,
  next_treatment_date: Date
) {
  const neo4j = require("neo4j-driver");

  const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
  );

  const session = driver.session();

  try {
    const result = await session.run(
      `MATCH (doctor:Doctor {name: $name})
      WITH doctor
      UNWIND split($namesParam, ', ') as patientName
      MATCH (patient:Patient {name: patientName})
      CREATE (patient)-[:Treatment{
        last_treatment_date: datetime(),
        meeting_time: $meeting_time,
        instruction: $instruction,
        diagnosis: $diagnosis,
        treatment_cost: $treatment_cost,
        started_treatment_date: datetime(),
        next_treatment_date: $next_treatment_date
      }]->(doctor)`,
      {
        name,
        namesParam,
        meeting_time,
        instruction,
        diagnosis,
        treatment_cost,
        next_treatment_date,
      }
    );

    return true;
  } finally {
    await session.close();
    await driver.close();
  }
}

async function matchDoctortoPatientsApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = req.body;
    console.log("1", body);
    const result = await matchDoctortoPatients(
      body.namesParam,
      body.name,
      body.doctorFormState.diagnosis,
      body.doctorFormState.treatment_cost,
      body.doctorFormState.instruction,
      body.doctorFormState.meeting_time,
      body.doctorFormState.next_treatment_date
    );

    if (result) {
      res.status(200).json({
        message: "Match Doctor to Patients Successfully",
      });
    } else {
      res.status(500).json({ message: "Match Doctor to Patients Failed" });
    }
  }
}

export default matchDoctortoPatientsApi;
