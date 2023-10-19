/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { useRouter } from "next/router";

export const AdminSideBar = () => {
  const router = useRouter();

  const patientOptions = [
    { id: 1, label: "Patients", route: "/admin/patients" },
    { id: 2, label: "Add Patient", route: "/admin/patients/add" },
  ];
  const doctorOptions = [
    { id: 1, label: "Doctors", route: "/admin/doctors" },
    { id: 2, label: "Add Doctor", route: "/admin/doctors/add" },
    {
      id: 3,
      label: "Manage Patients",
      route: "/admin/doctors/manage-patients",
    },
  ];

  const prescriptionOptions = [
    { id: 1, label: "Prescriptions", route: "/admin/account" },
  ];

  function productHandleSelect(eventKey) {
    console.log(`Selected option: ${eventKey}`);
  }

  function accountHandleSelect(eventKey) {
    console.log(`Selected option: ${eventKey}`);
  }

  function handleAccountItemClick(route) {
    router.push(route);
  }

  function handleProductItemClick(route) {
    router.push(route);
  }

  function handleHeroBannerItemClick(route) {
    router.push(route);
  }
  return (
    <React.Fragment>
      <div className="main-sidebar sidebar-style-2">
        <div className="sidebar-brand">
          {" "}
          <img
            src="/img/logo.png"
            alt="image"
            className="header-logo test"
          />{" "}
          <span className="logo-name">Admin Page</span>
        </div>

        <div className="sidebar-menu">
          {/* <div
            style={{
              width: `100%`,
              display: `inline-flex`,
              justifyContent: `space-between`,
              alignItems: `center`,
            }}
          > */}
          <DropdownButton
            title="Patients"
            onSelect={productHandleSelect}
            className="dropdown-button"
          >
            {patientOptions.map((option) => (
              <Dropdown.Item
                key={option.id}
                eventKey={option.id}
                className="dropdown-item"
                onClick={() => handleProductItemClick(option.route)}
              >
                {option.label}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <DropdownButton title="Doctors" className="dropdown-button">
            {doctorOptions.map((option) => (
              <Dropdown.Item
                key={option.id}
                eventKey={option.id}
                className="dropdown-item"
                onClick={() => handleHeroBannerItemClick(option.route)}
              >
                {option.label}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <DropdownButton
            title="Prescriptions"
            onSelect={accountHandleSelect}
            className="dropdown-button"
          >
            {prescriptionOptions.map((option) => (
              <Dropdown.Item
                key={option.id}
                eventKey={option.id}
                className="dropdown-item"
                onClick={() => handleAccountItemClick(option.route)}
              >
                {option.label}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
      </div>
    </React.Fragment>
  );
};
