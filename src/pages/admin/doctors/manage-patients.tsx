// ** React Imports
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { SSRProvider } from "react-bootstrap";
import { AdminSideBar } from "@/components/admin-side-bar/admin-side-bar";
import { ListManagedPatients } from "@/components/admin-patients/list-manage-patients";

export default function AdminDoctors() {
  return (
    <SSRProvider>
      <main>
        <div className="main-wrapper main-wrapper-1">
          <AdminSideBar></AdminSideBar>
          <ListManagedPatients />
        </div>
      </main>
    </SSRProvider>
  );
}
