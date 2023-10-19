/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, StrictMode, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Link from "next/link";
import { useRouter } from "next/router";

export const ListTreatmentDetail = () => {
  const [treatments, setTreatment] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { patientName, doctorName } = router.query;
  console.log("1", treatments);
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

  //   const fetchDataCallback = useCallback(
  //     (doctorName, patientName) => fetchData(doctorName, patientName),
  //     []
  //   ); // Memoize the fetchData function

  useEffect(() => {
    fetchData(doctorName, patientName); // Call the memoized function within useEffect
  }, [doctorName, patientName]);

  const deleteCategoryItem = async (id, pictureFilePath) => {
    const response = await fetch(`/api/category-delete-api/?id=${id}`, {
      method: "DELETE",
    });
    const results = await response.json();
    if (response.ok) {
      // const parts = pictureFilePath.split("/");
      // const filename = parts[parts.length - 1];
      fetchData();
      // const key = `Category/${filename}`;
      // s3DeleteHandler(key);
    } else {
      console.log("Delete Category Items failed.");
      console.log("err: " + results.error);
    }
  };

  const handleSearchChange = (e) => {
    // Update the 'search' state when the input value changes
    setSearch(e.target.value);
    fetchDataCallback(e.target.value);
  };

  return (
    <React.Fragment>
      <StrictMode>
        <div className="main-content">
          <div className="card-header">
            <h4>Treatment</h4>
            {/* <div className="card-header-form"> */}
            {/* <form action="" method="post" onSubmit={handle}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="keyword"
                  placeholder="Search"
                />
                <div className="input-group-btn">
                  <button className="btn btn-primary" type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <a href="s" style={{ marginLeft: `10px` }}>
            <button className="btn btn-primary">View All</button>
          </a> */}
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
                          <DeleteIcon
                            onClick={() =>
                              deleteCategoryItem(item._id, item.picture)
                            }
                          />
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
