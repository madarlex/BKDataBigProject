/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, StrictMode, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import EditIcon from "@mui/icons-material/Edit";

import Link from "next/link";
import { useRouter } from "next/router";

export const ListTreatmentDetail = () => {
  const [treatments, setTreatment] = useState([]);
  const router = useRouter();
  const { patientName, doctorName } = router.query;

  const fetchData = async (doctorName, patientName) => {
    const response = await fetch(
      `/api/get-treatment?doctorName=${doctorName}&patientName=${patientName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const results = await response.json();

    if (response.ok) {
      setTreatment(results.treatments);
    } else {
      console.log(results.error);
      console.log("Get treatments failed.");
    }
  };

  useEffect(() => {
    fetchData(doctorName, patientName); // Call the memoized function within useEffect
  }, [doctorName, patientName]);

  return (
    <React.Fragment>
      <StrictMode>
        <div className="main-content">
          <div className="card-header">
            <h4>Treatment</h4>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-md">
                <thead>
                  <tr>
                    <th>Meeting Time</th>
                    <th>Diagnosis</th>
                    <th>Instruction</th>
                    <th>Treatment Cost</th>
                    <th>Last Treatment Date</th>
                    <th>Started Treatment Date</th>
                    <th>Next Treatment Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {treatments.length > 0 &&
                    treatments?.map((item) => (
                      <tr key={item.identity}>
                        <td>{item.meeting_time}</td>
                        <td>{item.diagnosis}</td>
                        <td>{item.instruction}</td>
                        <td>{item.treatment_cost}</td>
                        <td>{item.last_treatment_date}</td>
                        <td>{item.started_treatment_date}</td>
                        <td>{item.next_treatment_date}</td>
                        <td>
                          <Link
                            href={`doctors/treament?patientName=${item.name}&doctorName=${item.doctor_name}`}
                          >
                            <EditIcon />
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </StrictMode>
    </React.Fragment>
  );
};
