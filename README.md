# BK Neo4J Big Data Project

## Overview

This project involves setting up a Neo4J database, creating a Node.js application using Next.js, and implementing various features for managing patients and doctors in the system.

## Setup Infrastructure

### Neo4J Database Setup

1. Download Neo4J for Desktop.
2. Set up the database and admin role.
3. Download Node.js 18.
4. Go to the "resources/data" folder.
5. Copy the "patients_0.csv" to "patients_10.csv" and "doctors.csv" to the Neo4J Desktop Folder Destination. The destination folder may vary depending on your OS.
6. Open Neo4j Desktop, run the database, and then access Neo4J Browser.
7. In Neo4J Desktop interface, accesss terminal, and cd to bin if you are in window, in macos no need.
8. Then run these command to bulk insert into db: bin/neo4j-admin database import full --nodes=import/doctors.csv --nodes=import/patients_0.csv --nodes=import/patients_1.csv --nodes=import/patients_2.csv --nodes=import/patients_3.csv --nodes=import/patients_4.csv neo4j --overwrite-destination
9. Import patients from 0 to 10 and doctors into the database depend on your demands.
10. In the resource folder, open the "create_admin.cypher" file, copy and paste the import code, and run it in Neo4J Browser to create the admin account.

### Setting up Next.js Project

1. Open a terminal and clone the project repository: `git clone https://github.com/madarlex/BKDataBigProject.git`
2. Use your preferred IDE to open the cloned project folder.
3. Install project dependencies by running: `npm install`
4. Install the Yarn package globally: `npm install -g yarn`
5. Start the development server by running: `yarn dev`

## Application Features

1. Go to the path: `/login` to log in.
2. Use the following login credentials:
   - Username: admin
   - Password: 12345678
3. If login is successful, you will be redirected to the `/admin` page.
4. On the sidebar, you will find three categories, but only "Patients" and "Doctors" have been implemented.
5. For Doctors:
   - Create doctors.
   - Search for doctors by name or email.
   - Add treatment relationships by linking multiple patients to doctors.
   - Search for managed patients to view their treatment.
   - Delete a doctor.
6. For Patients:
   - Create patients.
   - Search for patients by name or email.
   - Delete a patient.

Feel free to explore and use these features for managing patients and doctors in the application.

## Author

1. Nguyen Minh Thanh
2. Vu Huynh
