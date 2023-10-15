/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const AccountSetting = () => {
  return (
    <React.Fragment>
      <div className="tw-main-content">
        <section className="section">
          <div className="section-body">
            <div className="row">
              <div className="col-12">
                <div className="card card-primary">
                  <div className="card-header">
                    <h4>Edit</h4>
                  </div>
                  <div className="card-body">
                    <form method="POST">
                      <div className="form-group">
                        <label htmlFor="email">Full Name</label>
                        <input type="text" className="form-control" />
                        <div className="invalid-feedback"></div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">User Name</label>
                        <input type="text" className="form-control" />
                        <div className="invalid-feedback"></div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" />
                        <div className="invalid-feedback"></div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Phone</label>
                        <input type="text" className="form-control" />
                        <div className="invalid-feedback"></div>
                      </div>

                      <div className="row">
                        <div className="form-group col-6">
                          <label htmlFor="password" className="d-block">
                            Password
                          </label>
                          <input
                            id="password"
                            type="password"
                            className="form-control pwstrength"
                            data-indicator="pwindicator"
                          />
                          <div id="pwindicator" className="pwindicator">
                            <div className="bar"></div>
                            <div className="label"></div>
                          </div>
                        </div>
                        <div className="form-group col-6">
                          <label htmlFor="password2" className="d-block">
                            Password Confirmation
                          </label>{" "}
                          <input
                            id="password2"
                            type="password"
                            className="form-control"
                            name="password-confirm"
                          />
                        </div>
                      </div>

                      {/* <%-- <div className="form-group">
									<label for="email">Role</label>
										 <c:forEach var="t" items="${types }">
											 <div className="form-check">
												<input className="form-check-input" type="radio" name="type" value="${t.id }">
												<label className="form-check-label">
						                          ${t.name }
						                        </label>
					                        </div>
										</c:forEach>
										<c:forEach var="t" items="${types }">
											<br><input type="radio" name="type" value="${t.id }"> ${t.name }<br>
										</c:forEach>
									<div className="invalid-feedback"></div>
								</div> --%> */}
                      {/* <div className="form-group">
									<checkbox path="status"/> Active
								</div> */}
                      <div className="form-group">
                        <button
                          id="btnRegis"
                          type="submit"
                          className="btn btn-primary btn-lg btn-block"
                        >
                          Update
                        </button>
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
