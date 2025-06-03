import React, { useEffect, useState } from "react";
import ImageWithBasePath from "../../core/common/imageWithBasePath";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";

const Login = () => {
  const route = all_routes;
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };
  useEffect(() => {
    localStorage.setItem("menuOpened", "Dashboard");
  }, []);
  return (
    <div className="account-content">
      <div className="d-flex flex-wrap w-100 vh-100 overflow-hidden account-bg-01">
        <div className="d-flex align-items-center justify-content-center flex-wrap vh-100 overflow-auto p-4 w-50 bg-backdrop">
          <form className="flex-fill">
            <div className="mx-auto mw-450">
              <div className="text-center mb-4">
                <ImageWithBasePath
                  src="assets/img/logo.svg"
                  className="img-fluid"
                  alt="Logo"
                />
              </div>
              <div className="mb-4">
                <h4>Sign In</h4>
                <p>Access the CRMS panel using your email and passcode.</p>
              </div>
              <div className="mb-3">
                <label className="col-form-label">Email Address</label>
                <div className="position-relative">
                  <span className="input-icon-addon">
                    <i className="ti ti-mail"></i>
                  </span>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="mb-3">
                <label className="col-form-label">Password</label>
                <div className="pass-group">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    className="pass-input form-control"
                  />
                  <span
                    className={`ti toggle-password ${
                      isPasswordVisible ? "ti-eye" : "ti-eye-off"
                    }`}
                    onClick={togglePasswordVisibility}
                  ></span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="form-check form-check-md d-flex align-items-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-md"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="checkebox-md">
                    Remember Me
                  </label>
                </div>
                <div className="text-end">
                  <Link
                    to={route.forgotPassword}
                    className="text-primary fw-medium link-hover"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <div className="mb-3">
                <Link
                  to={route.dealsDashboard}
                  className="btn btn-primary w-100"
                >
                  Sign In
                </Link>
              </div>
              <div className="mb-3">
                <h6>
                  New on our platform?
                  <Link to={route.register} className="text-purple link-hover">
                    {" "}
                    Create an account
                  </Link>
                </h6>
              </div>
              <div className="form-set-login or-text mb-3">
                <h4>OR</h4>
              </div>
              <>
                <div className="d-flex align-items-center justify-content-center flex-wrap mb-3">
                  <div className="text-center me-2 flex-fill">
                    <Link
                      to="#"
                      className="br-10 p-2 px-4 btn bg-pending  d-flex align-items-center justify-content-center"
                    >
                      <ImageWithBasePath
                        className="img-fluid m-1"
                        src="assets/img/icons/facebook-logo.svg"
                        alt="Facebook"
                      />
                    </Link>
                  </div>
                  <div className="text-center me-2 flex-fill">
                    <Link
                      to="#"
                      className="br-10 p-2 px-4 btn bg-white d-flex align-items-center justify-content-center"
                    >
                      <ImageWithBasePath
                        className="img-fluid  m-1"
                        src="assets/img/icons/google-logo.svg"
                        alt="Facebook"
                      />
                    </Link>
                  </div>
                  <div className="text-center flex-fill">
                    <Link
                      to="#"
                      className="bg-dark br-10 p-2 px-4 btn btn-dark d-flex align-items-center justify-content-center"
                    >
                      <ImageWithBasePath
                        className="img-fluid  m-1"
                        src="assets/img/icons/apple-logo.svg"
                        alt="Apple"
                      />
                    </Link>
                  </div>
                </div>
                <div className="text-center">
                  <p className="fw-medium text-gray">Copyright © 2024 - CRMS</p>
                </div>
              </>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
