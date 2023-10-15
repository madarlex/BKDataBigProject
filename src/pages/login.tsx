import { AccountLogin } from "@/components/account/account-login";
import Head from "next/head";
import React from "react";

export default function Product() {
  return (
    <>
      <Head>
        <meta name="description" content="Ogani Template" />
        <meta name="keywords" content="Ogani, unica, creative, html" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Login 01</title>
        <meta charSet="UTF-8" />
        <title>Login 01</title>
      </Head>
      <main style={{ background: `#f8f9fd` }}>
        <AccountLogin />
      </main>
    </>
  );
}
