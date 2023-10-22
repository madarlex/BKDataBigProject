/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { useForm } from "react-hook-form";
import DoneIcon from "@mui/icons-material/Done";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export const AddPatients = () => {
  const [isCreated, setIsCreated] = useState(Boolean);
  const [patientFormState, setPatientFormState] = useState({});
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const patientFormHandleChange = (e) => {
    setPatientFormState({
      ...patientFormState,
      [e.target.name]: e.target.value,
    });
  };

  const patientFormOnSubmit = async (e) => {
    const event = e || window.event;
    const { name, age, email, address, phone, identity_card } =
      patientFormState;

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

    // Submit the form
    // Do something with the form data
    const response = await fetch("/api/add-patient-api", {
      method: "POST",
      body: JSON.stringify(patientFormState),
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
                    <h4>Add Patient</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit(patientFormOnSubmit)}>
                      <div className="form-group row mb-4">
                        <label className="col-form-label text-md-right col-12 col-md-2 col-lg-2 align-items-center d-flex">
                          Patient Name
                        </label>
                        <div className="col-sm-12 col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={patientFormState.name}
                            onChange={patientFormHandleChange}
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
                            value={patientFormState.age}
                            onChange={patientFormHandleChange}
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
                            value={patientFormState.email}
                            onChange={patientFormHandleChange}
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
                            value={patientFormState.address}
                            onChange={patientFormHandleChange}
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
                            value={patientFormState.phone}
                            onChange={patientFormHandleChange}
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
                            value={patientFormState.identity_card}
                            onChange={patientFormHandleChange}
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
