/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useRouter } from "next/router";

export const AccountLogin = () => {
  const router = useRouter();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/account-api", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      router.push("/admin");
    } else {
      console.log("Login failed.");
    }
  };

  return (
    <React.Fragment>
      <section className="ftco-section">
        <div className="w-full">
          <div className="">
            <div className="text-center">
              <h2 className="heading-section" style={{ color: `#1089ff` }}>
                Neo4J
              </h2>
            </div>

            <div className="flex justify-center">
              <div className="w-1/5">
                <div className="login-wrap p-4 p-md-5">
                  <div className="flex justify-center">
                    <AccountCircleOutlinedIcon
                      fontSize="small"
                      className="login-icon d-flex align-items-center justify-content-center"
                      style={{ color: `#1089ff` }}
                    />
                  </div>
                  <h3 className="text-center mb-4">Sign In</h3>
                  <form
                    action="#"
                    className="login-form"
                    onSubmit={handleLogin}
                  >
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control rounded-left w-full"
                        placeholder="Username"
                        value={username}
                        onChange={(event) => setUserName(event.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group d-flex">
                      <input
                        type="password"
                        className="form-control rounded-left w-full"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className="form-control btn btn-primary rounded submit px-3 w-full"
                      >
                        Login
                      </button>
                    </div>
                    <div className="form-group d-md-flex">
                      {/* <div className="w-50">
                      <label className="checkbox-wrap checkbox-primary">
                        Remember Me
                        <input type="checkbox" checked />
                        <span className="checkmark"></span>
                      </label>
                    </div> */}
                      <div className="flex justify-center">
                        <a href="#">Forgot Password</a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
