/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, StrictMode, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Link from "next/link";

export const ListDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const fetchData = async (searchString) => {
    const response = await fetch(
      `/api/get-doctors-api?name=${searchString}&email=${searchString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const results = await response.json();

    if (response.ok) {
      setDoctors(results.doctors);
    } else {
      console.log(results.error);
      console.log("Get Doctors failed.");
    }
  };

  const fetchDataCallback = useCallback(
    (searchString) => fetchData(searchString),
    []
  ); // Memoize the fetchData function

  // useEffect(() => {
  //   fetchDataCallback(); // Call the memoized function within useEffect
  // }, [fetchDataCallback]);

  const deleteDoctorItem = async (name: string) => {
    const response = await fetch(`/api/delete-doctor-api/?name=${name}`, {
      method: "DELETE",
    });
    const results = await response.json();
    if (response.ok) {
      // const parts = pictureFilePath.split("/");
      // const filename = parts[parts.length - 1];
      fetchDataCallback("");
      // const key = `Category/${filename}`;
      // s3DeleteHandler(key);
    } else {
      console.log("Delete Doctor Items failed.");
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
            <h4>Doctors</h4>
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
                    <th>Department</th>
                    <th>Specialization</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.length > 0 &&
                    doctors?.map((item) => (
                      <tr key={item.identity}>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.email}</td>
                        <td>{item.address}</td>
                        <td>{item.phone}</td>
                        <td>{item.identity_card}</td>
                        <td>{item.department}</td>
                        <td>{item.specialization}</td>
                        <td>
                          <DeleteIcon
                            onClick={() => deleteDoctorItem(item.name)}
                          />
                          <Link href={`doctors/edit?name=${item.name}`}>
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
