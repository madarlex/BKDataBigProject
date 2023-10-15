// ** React Imports
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { SSRProvider } from "react-bootstrap";
import { AdminSideBar } from "@/components/admin-side-bar/admin-side-bar";
import { AddDoctors } from "@/components/admin-doctors/add-doctors";
export default function Accounts() {
  return (
    <SSRProvider>
      <main>
        <div className="main-wrapper main-wrapper-1">
          <AdminSideBar></AdminSideBar>
          <AddDoctors></AddDoctors>
        </div>
      </main>
    </SSRProvider>
  );
}
