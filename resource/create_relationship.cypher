// Create relationships between patient and doctor
LOAD CSV WITH HEADERS FROM 'file:///treatments.csv' AS row
MATCH (patient:Patient {patient_id: row.patient_id})
MATCH (doctor:Doctor {doctor_id: row.doctor_id})
MERGE (patient)-[:Exam_By]->(doctor);

// Create relationships between treatment and mediation
LOAD CSV WITH HEADERS FROM 'file:///perscriptions.csv' AS row
MATCH (treatment:Treatment {treatment_id: row.treatment_id})
MATCH (mediation:Mediation {mediation_id: row.mediation_id})
MERGE (treatment)-[:Contain]->(mediation);

// Create relationships between treatment and doctor
LOAD CSV WITH HEADERS FROM 'file:///treatments.csv' AS row
MATCH (treatment:Treatment {treatment_id: row.id})
MATCH (doctor:Doctor {doctor_id: row.doctor_id})
MERGE (treatment)-[:Exam_By]->(doctor);

//Create relationships between treatment and patient
LOAD CSV WITH HEADERS FROM 'file:///treatments.csv' AS row
MATCH (treatment:Treatment {treatment_id: row.id})
MATCH (patient:Patient {patient_id: row.patient_id})
MERGE (treatment)-[:Exam_For]->(patient);
