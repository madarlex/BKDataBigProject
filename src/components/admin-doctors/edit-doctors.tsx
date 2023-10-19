/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef, useCallback } from "react";
import "quill/dist/quill.snow.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DoneIcon from "@mui/icons-material/Done";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "react-quill/dist/quill.snow.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
export const EditDoctors = () => {
  const [isCreated, setIsCreated] = useState(Boolean);
  const [patients, setPatients] = useState([]);
  const [selectedPatients, setSelectedPatients] = useState([]);

  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { name } = router.query;
  const [doctorFormState, setDoctorFormState] = useState({});

  const fetchData = async (searchString) => {
    const response = await fetch(
      `/api/get-patients-by-name-api?name=${searchString}`,
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
      console.log("Get Patients failed.");
    }
  };

  const fetchDataCallback = useCallback(
    (searchString) => fetchData(searchString),
    []
  );
  const handleInputChange = (event, newInputValue) => {
    fetchDataCallback(newInputValue);
  };
  const handlePatientSelection = (event, newValue) => {
    setSelectedPatients(newValue);
  };
  const selectedPatientNames = selectedPatients
    .map((patient) => patient.name)
    .join(", ");
  const doctorFormHandleChange = (e) => {
    setDoctorFormState({
      ...doctorFormState,
      [e.target.name]: e.target.value,
    });
  };

  const doctorFormOnSubmit = async (e) => {
    const event = e || window.event;
    const {
      diagnosis,
      instruction,
      treatment_cost,
      meeting_time,
      next_treatment_date,
    } = doctorFormState;

    if (!diagnosis) {
      // Display an error message
      alert("Please fill Diagnosis");
      return;
    }

    if (!next_treatment_date) {
      // Display an error message
      alert("Please fill next treatment date");
      return;
    }

    if (!parseInt(treatment_cost)) {
      // Display an error message
      alert("Please fill Treatment Cost");
      return;
    }

    if (!parseInt(meeting_time)) {
      // Display an error message
      alert("Please fill Meeting Time");
      return;
    }

    if (!instruction) {
      // Display an error message
      alert("Please fill Instruction");
      return;
    }

    // Submit the form
    // Do something with the form data
    const response = await fetch("/api/match-doctor-to-patient-api", {
      method: "POST",
      body: JSON.stringify({
        namesParam: selectedPatientNames,
        name: name,
        doctorFormState,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const results = await response.json();
      setIsCreated(true);
    } else {
      setIsCreated(false);
      console.log("Match Doctor to Patient failed.");
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
                    <h4>Doctors Manage Patients</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit(doctorFormOnSubmit)}>
                      <div className="form-group row mb-4">
                        <label className="col-form-label text-md-right col-12 col-md-2 col-lg-2 align-items-center d-flex">
                          Patient Names
                        </label>
                        <div className="col-sm-12 col-md-9">
                          <Stack spacing={3} sx={{ width: 500 }}>
                            <Autocomplete
                              multiple
                              id="tags-standard"
                              value={selectedPatients}
                              options={patients}
                              getOptionLabel={(patient) => patient.name}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="standard"
                                  label="Multiple values"
                                  placeholder="Favorites"
                                />
                              )}
                              onChange={handlePatientSelection}
                              onInputChange={handleInputChange}
                            />
                          </Stack>
                        </div>
                      </div>
                      <div className="form-group row mb-4">
                        <label className="col-form-label text-md-right col-12 col-md-2 col-lg-2 align-items-center d-flex">
                          Diagnosis
                        </label>
                        <div className="col-sm-12 col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            name="diagnosis"
                            value={doctorFormState.diagnosis}
                            onChange={doctorFormHandleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-4">
                        <label className="col-form-label text-md-right col-12 col-md-2 col-lg-2 align-items-center d-flex">
                          Instruction
                        </label>
                        <div className="col-sm-12 col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            name="instruction"
                            value={doctorFormState.instruction}
                            onChange={doctorFormHandleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-4">
                        <label className="col-form-label text-md-right col-12 col-md-2 col-lg-2 align-items-center d-flex">
                          Treatment Cost
                        </label>
                        <div className="col-sm-12 col-md-9">
                          <input
                            type="number"
                            className="form-control"
                            name="treatment_cost"
                            value={doctorFormState.treatment_cost}
                            onChange={doctorFormHandleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-4">
                        <label className="col-form-label text-md-right col-12 col-md-2 col-lg-2 align-items-center d-flex">
                          Meeting Time
                        </label>
                        <div className="col-sm-12 col-md-9">
                          <input
                            type="number"
                            className="form-control"
                            name="meeting_time"
                            value={doctorFormState.meeting_time}
                            onChange={doctorFormHandleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-4">
                        <label className="col-form-label text-md-right col-12 col-md-2 col-lg-2 align-items-center d-flex">
                          Next Treatment Date
                        </label>
                        <div className="col-sm-12 col-md-9">
                          <input
                            type="date"
                            className="form-control"
                            name="next_treatment_date"
                            value={doctorFormState.next_treatment_date}
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
