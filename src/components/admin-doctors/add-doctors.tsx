/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormCheck } from "react-bootstrap";
import { useForm } from "react-hook-form";
import DoneIcon from "@mui/icons-material/Done";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

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
                        {/* <label className="col-form-label text-md-right col-12 col-md-2 col-lg-1 align-items-center d-flex">
                          Danh Mục Phụ
                        </label>
                        <div className="col-sm-12 col-md-9 col-lg-4">
                          <select
                            name="subcategory"
                            className="col-sm-4 col-md-4 col-lg-7"
                            onChange={subcategoryItemHandleChange}
                          >
                            {renderSubCategoryResults()}
                          </select>
                        </div> */}
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
                        {/* <label
                          className="col-form-label col-12 col-md-2 col-lg-1 align-items-center d-flex"
                          style={{ justifyContent: `right` }}
                        >
                          Thương Hiệu
                        </label>
                        <div className="col-sm-12 col-md-9 col-lg-2">
                          <input
                            type="text"
                            className="form-control"
                            name="brand"
                            value={doctorFormState.brand}
                            onChange={doctorFormHandleChange}
                          />
                        </div>
                        <label
                          className="col-form-label col-12 col-md-2 col-lg-1 align-items-center d-flex"
                          style={{ justifyContent: `right` }}
                        >
                          Tồn Kho
                        </label>
                        <div className="col-sm-12 col-md-9 col-lg-2">
                          <input
                            type="number"
                            className="form-control"
                            name="stock"
                            value={doctorFormState.stock}
                            onChange={doctorFormHandleChange}
                          />
                        </div> */}
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
                        {/* <label
                          className="col-form-label col-12 col-md-2 col-lg-1 align-items-center text-center d-flex"
                          style={{ justifyContent: `right` }}
                        >
                          Hàng Hot
                        </label>

                        <div className="col-sm-12 col-md-9 col-lg-2 align-items-center d-flex">
                          <FormCheck
                            id="isHotCheckbox"
                            checked={isHotChecked}
                            onChange={() => isHotCheckboxHandler(isHotChecked)}
                            className="align-items-center d-flex"
                            name="is_hot"
                          />
                        </div>
                        <label
                          className="col-form-label col-12 col-md-2 col-lg-1 align-items-center text-center d-flex"
                          style={{ justifyContent: `right` }}
                        >
                          Hàng Chạy Trên Trang Chủ
                        </label>

                        <div className="col-sm-12 col-md-9 col-lg-2 align-items-center d-flex">
                          <FormCheck
                            id="isSelectedCheckbox"
                            checked={isSelectedChecked}
                            onChange={() =>
                              isSelectedCheckboxHandler(isSelectedChecked)
                            }
                            className="align-items-center d-flex"
                            name="is_selected"
                          />
                        </div> */}
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
                      {/* <div className="form-group row mb-4">
                        <label className="col-form-label text-md-right col-12 col-md-2 col-lg-2 align-items-center d-flex">
                          Mô Tả Sản Phẩm
                        </label>

                        <div className="col-sm-12 col-md-9">
                          <ReactQuill
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            value={doctorFormState.description}
                            onChange={descriptionHandleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-4">
                        <label className="col-form-label text-md-right col-12 col-md-2 col-lg-2 align-items-center d-flex">
                          Thông Tin Phụ Sản Phẩm
                        </label>

                        <div className="col-sm-12 col-md-9">
                          <ReactQuill
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            value={doctorFormState.info}
                            onChange={infoHandleChange}
                          />
                        </div>
                      </div> */}
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
