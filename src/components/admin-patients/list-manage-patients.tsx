/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, StrictMode, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";

export const ListManagedPatients = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const fetchData = async (searchString) => {
    const response = await fetch(
      `/api/get-manage-patients?name=${searchString}&email=${searchString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const results = await response.json();

    if (response.ok) {
      setPatients(results.patients);
    } else {
      console.log(results.error);
      console.log("Get patients failed.");
    }
  };

  const fetchDataCallback = useCallback(
    (searchString) => fetchData(searchString),
    []
  ); // Memoize the fetchData function

  const deleteCategoryItem = async (id, pictureFilePath) => {
    const response = await fetch(`/api/category-delete-api/?id=${id}`, {
      method: "DELETE",
    });
    const results = await response.json();
    if (response.ok) {
      fetchData();
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
            <h4>Managed Patients</h4>
          </div>
          <div>
            <input
              type="search"
              className="form-control"
              name="search"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-md">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Identity Card</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.length > 0 &&
                    patients?.map((item) => (
                      <tr key={item.identity}>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.email}</td>
                        <td>{item.address}</td>
                        <td>{item.phone}</td>
                        <td>{item.identity_card}</td>
                        <td>
                          <DeleteIcon
                            onClick={() =>
                              deleteCategoryItem(item._id, item.picture)
                            }
                          />
                          <Link
                            href={`treatment?patientName=${item.name}&doctorName=${item.doctor_name}`}
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
