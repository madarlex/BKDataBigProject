import Head from "next/head";
import React from "react";
import { AdminSideBar } from "@/components/admin-side-bar/admin-side-bar";

export default function Admin() {
  return (
    <>
      <Head>
        <meta name="description" content="Ogani Template" />
        <meta name="keywords" content="Ogani, unica, creative, html" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>BK | Data</title>
        <meta charSet="UTF-8" />
      </Head>
      <main>
        <div className="main-wrapper main-wrapper-1">
          <AdminSideBar></AdminSideBar>
        </div>
      </main>
    </>
  );
}
