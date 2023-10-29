LOAD CSV WITH HEADERS FROM 'file:///patients.csv' AS row
MERGE (patient:Patient {patient_ID: row.id})
ON CREATE SET patient.id = row.id,
              patient.name = row.name,
              patient.age = toInteger(row.age),
              patient.email = row.email,
              patient.address = row.address,
              patient.phone = row.phone,
              patient.identity_card = row.identity_card;

LOAD CSV WITH HEADERS FROM 'file:///doctors.csv' AS row
MERGE (doctor:Doctor {doctor_ID: row.id})
ON CREATE SET doctor.id = row.id,
              doctor.name = row.name,
              doctor.age = toInteger(row.age),
              doctor.email = row.email,
              doctor.address = row.address,
              doctor.phone = row.phone,
              doctor.department = row.department,
              doctor.specialization = row.secialization,
              doctor.identity_card = row.identity_card;
