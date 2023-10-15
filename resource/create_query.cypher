// Create patients
LOAD CSV WITH HEADERS FROM 'file:///patients.csv' AS row
MERGE (patient:Patient {patient_ID: row.id})
  ON CREATE SET patient.id = row.id;
  on CREATE SET patient.name = row.name;
  on CREATE SET patient.age = row.age;
  on CREATE SET patient.email = row.email;
  on CREATE SET patient.address = row.address;
  on CREATE SET patient.phone = row.phone;
  on CREATE SET patient.identity_card = row.identity_card;
