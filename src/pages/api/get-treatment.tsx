import type { NextApiRequest, NextApiResponse } from "next";

async function fetchTreatment(doctorName: string, patientName: string) {
  const neo4j = require("neo4j-driver");

  const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
  );

  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (doctor:Doctor)-[r:Treatment]-(patient:Patient) WHERE doctor.name = $doctorName AND patient.name = $patientName RETURN r",
      {
        doctorName,
        patientName,
      }
    );

    const treatments = result.records.map((record) => {
      const properties = record.get("r").properties;

      const identity = record.get("r").identity;
      const actualIdentity = identity.low + identity.high * 0x100000000;

      const jsLastTreatmentDate = new Date(
        properties.last_treatment_date.year.low,
        properties.last_treatment_date.month.low, // JavaScript months are 0-indexed
        properties.last_treatment_date.day.low,
        properties.last_treatment_date.hour.low,
        properties.last_treatment_date.minute.low,
        properties.last_treatment_date.second.low
      );
      properties.last_treatment_date = jsLastTreatmentDate;

      const jsStartedTreatmentDate = new Date(
        properties.started_treatment_date.year.low,
        properties.started_treatment_date.month.low, // JavaScript months are 0-indexed
        properties.started_treatment_date.day.low,
        properties.started_treatment_date.hour.low,
        properties.started_treatment_date.minute.low,
        properties.started_treatment_date.second.low
      );
      properties.started_treatment_date = jsStartedTreatmentDate;

      // const jsNextTreatmentDate = new Date(
      //   properties.next_treatment_date.year.low,
      //   properties.next_treatment_date.month.low, // JavaScript months are 0-indexed
      //   properties.next_treatment_date.day.low,
      //   properties.next_treatment_date.hour.low,
      //   properties.next_treatment_date.minute.low,
      //   properties.next_treatment_date.second.low
      // );
      // properties.next_treatment_date = jsNextTreatmentDate;

      return {
        ...properties, // Include the properties
        identity: actualIdentity, // Include the elementId
      };
    });
    return treatments;
  } finally {
    await session.close();
    await driver.close();
  }
}

async function getTreatment(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { doctorName, patientName } = req.query;
    const result = await fetchTreatment(doctorName, patientName);
    console.log(result);
    if (result != null) {
      res.status(200).json({
        message: "Get Treatment Successfully",
        treatments: result,
      });
    } else {
      res.status(500).json({ message: "Get Treatment Failed" });
    }
  }
}

export default getTreatment;
