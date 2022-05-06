import React from "react";
import PropTypes from "prop-types";
import "./Parent-Settings.scss";
// import EditIcon from "../icons/EditIcon";
import EditIcon from "../../../icons/EditIcon";
import { Link, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import Header from "../../Header/Header";
import Navbar from "../../Navbar/Navbar";

function ParentSettings() {
  const location = useLocation();

  const isSettingsPage = location.pathname === "/settings";
  const isChangePasswordPage = location.pathname === "/change-password";
  const isLogOutPage = location.pathname === "/logout";

  return (
    <div>
      <Header retour="true"></Header>
      <div className="container__profile">
        {isSettingsPage ? (
          <>
            <div>
              <img className="profile__picture" />
              <div className="profile__name">Robert godwin</div>
              <div className="profile__status">Parent</div>
            </div>
            <div>
              <span className="profile__email">robertgodwin@mail.com</span>
              {/* <a className='profile-edit-icon'><EditIcon></EditIcon></a> */}
            </div>
            <div>
              <span className="profile__birthdate">february 20th 1972</span>
              {/* <a className='profile-edit-icon'><EditIcon></EditIcon></a> */}
            </div>
            <button className="button-outline">Logout</button>
            <p className="profile-link">
              <Link to="/change-password">Change your password</Link>
            </p>
            <p className="profile-link">
              <Link to="/logout">Delete your account</Link>
            </p>
          </>
        ) : isChangePasswordPage ? (
          <>
            <h2>Changing your password</h2>
            <h3>New password</h3>
            <div className="form">
              <Formik
                initialValues={{
                  password: "",
                  password: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = "Required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Invalid email address";
                  }
                  return errors;
                }}
                onSubmit={async (values) => {
                  fetch(process.env.REACT_APP_API + "/api/login", {
                    method: "post",
                    body: JSON.stringify(values),
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                  })
                    .then((res) => res.json())
                    .then(
                      (result) => {
                        if (result.access_token) {
                          sessionStorage.setItem("isLoggedIn", true);
                          sessionStorage.setItem("role", result.user.role);
                          sessionStorage.setItem(
                            "user",
                            JSON.stringify(result)
                          );
                          // result.user.role === "admin"
                          //   ? setRoleAdmin(true)
                          //   : setIsSubmitted(true);
                          // setIsSubmitted(true)
                        } else {
                          // setIsSubmitted(false);
                          alert(
                            "Error, please verify your user or your password"
                          );
                        }
                      },
                      (error) => {
                        // setIsSubmitted(false);
                        console.log(error);
                      }
                    );
                }}
              >
                <Form>
                  <div className="input-container">
                    <Field
                      type="text"
                      name="password"
                      placeholder="Enter your new password"
                      required
                    />
                  </div>
                  <div className="input-container">
                    <Field
                      type="text"
                      name="password"
                      placeholder="Confirm your new password"
                      required
                    />
                  </div>
                  {/* {renderErrorMessage("pass")}
    {renderErrorMessage("email")} */}
                  <div className="button-container">
                    <button className="button-dark" type="submit">
                      Sign in
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </>
        ) : isLogOutPage ? (
          <Navigate to="/" />
        ) : (
          ""
        )}
        <div className="navbar">
          {" "}
          <Navbar></Navbar>
        </div>
      </div>
    </div>
  );
}

ParentSettings.propTypes = {};

ParentSettings.defaultProps = {};

export default ParentSettings;
