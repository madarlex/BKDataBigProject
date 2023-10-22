/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useForm } from "react-hook-form";
import DoneIcon from "@mui/icons-material/Done";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

export const AddDoctors = () => {
  const [isCreated, setIsCreated] = useState(Boolean);
  const [doctorFormState, setDoctorFormState] = useState({});
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const doctorFormHandleChange = (e) => {
    setDoctorFormState({
      ...doctorFormState,
      [e.target.name]: e.target.value,
    });
  };

  const doctorFormOnSubmit = async (e) => {
    const event = e || window.event;
    const {
      name,
      age,
      email,
      address,
      phone,
      identity_card,
      department,
      specialization,
    } = doctorFormState;

    if (!name) {
      // Display an error message
      alert("Please fill name");
      return;
    }

    if (!parseInt(age)) {
      // Display an error message
      alert("Please fill age");
      return;
    }

    if (!email) {
      // Display an error message
      alert("Please fill email");
      return;
    }

    if (!address) {
      // Display an error message
      alert("Please fill Address");
      return;
    }

    if (!phone) {
      // Display an error message
      alert("Please fill Phone");
      return;
    }

    if (!identity_card) {
      // Display an error message
      alert("Please fill Identity Card");
      return;
    }

    if (!department) {
      // Display an error message
      alert("Please fill Department");
      return;
    }

    if (!specialization) {
      // Display an error message
      alert("Please fill Specialization");
      return;
    }

    // Submit the form
    // Do something with the form data
    const response = await fetch("/api/add-doctor-api", {
      method: "POST",
      body: JSON.stringify(doctorFormState),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const results = await response.json();
      setIsCreated(true);
    } else {
      setIsCreated(false);
      console.log("Create Doctor failed.");
    }

    if (event instanceof Event) {
      event.preventDefault();
    }
    // Do something with the form data
  };

  return (
    <React.Fragment>
      <div className="main-content">
        <section className="section">
          <div className="section-body">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4>Add Doctor</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit(doctorFormOnSubmit)}>
                      <div className="form-group row mb-4">
                        <label className="col-form-label text-md-right col-12 col-md-2 col-lg-2 align-items-center d-flex">
                          Doctor Name
                        </label>
                        <div className="col-sm-12 col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={doctorFormState.name}
                            onChange={doctorFormHandleChange}
                          />
                        </div>
                      </div>

                      <div className="form-group row mb-4">
                        <label className="col-form-label text-md-right col-12 col-md-2 col-lg-2 align-items-center d-flex">
                          Age
                        </label>
                        <div className="col-sm-12 col-md-9 ">
                          <input
                            type="number"
                            className="form-control"
                            name="age"
                            value={doctorFormState.age}
                            onChange={doctorFormHandleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-4">
                        <label className="col-form-label text-md-right col-12 col-md-2 col-lg-2 align-items-center d-flex">
                          Email
                        </label>
                        <div className="col-sm-12 col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            name="email"
                            value={doctorFormState.email}
                            onChange={doctorFormHandleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-4">
                        <label className="col-form-label text-md-right col-12 col-md-2 col-lg-2 align-items-center d-flex">
                          Address
                        </label>
                        <div className="col-sm-12 col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={doctorFormState.address}
                            onChange={doctorFormHandleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-4">
                        <label className="col-form-label text-md-right col-12 col-md-2 col-lg-2 align-items-center d-flex">
                          Phone
                        </label>
                        <div className="col-sm-12 col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={doctorFormState.phone}
                            onChange={doctorFormHandleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-4">
                        <label className="col-form-label text-md-right col-12 col-md-2 col-lg-2 align-items-center d-flex">
                          Identity Card
                        </label>
                        <div className="col-sm-12 col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            name="identity_card"
                            value={doctorFormState.identity_card}
                            onChange={doctorFormHandleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-4">
                        <label className="col-form-label text-md-right col-12 col-md-2 col-lg-2 align-items-center d-flex">
                          Department
                        </label>
                        <div className="col-sm-12 col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            name="department"
                            value={doctorFormState.department}
                            onChange={doctorFormHandleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-4">
                        <label className="col-form-label text-md-right col-12 col-md-2 col-lg-2 align-items-center d-flex">
                          Specialization
                        </label>
                        <div className="col-sm-12 col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            name="specialization"
                            value={doctorFormState.specialization}
                            onChange={doctorFormHandleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-4 ">
                        <label className="col-form-label text-md-right col-12 col-md-2 col-lg-2"></label>
                        <div
                          className="col-sm-12 col-md-9 col-lg-2"
                          style={{ display: `flex`, alignItems: `center` }}
                        >
                          <input
                            className="btn btn-primary"
                            id="submit"
                            style={{ margin: 0 }}
                            type="submit"
                            value="Add"
                          />
                        </div>
                        <div className="col-sm-12 col-md-9 col-lg-2">
                          {isCreated ? <DoneIcon /> : <ErrorOutlineIcon />}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};
