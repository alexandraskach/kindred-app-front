import { Formik, Field, Form } from "formik";
import { Base } from "components/Base";
import { useRouter } from "next/router";
import styles from "./login.module.scss";
import { useEffect, useState } from "react";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";

// export async function getServerSideProps() {
// 	let token = null

// 	// token = sessionStorage?.JWT

// 	return {
// 		props: { token }
// 	}
// }

// pages/login.js
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(context) {
    if (context.req.session.token) {
      return {
        props: {
          token: context.req.session.token
        }
      }
    }
    return { props: { token: "" } }
  },
  sessionConfig
);

export async function onSubmit(data, router) {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  console.log(json);

  if (json.userId) {
    // router.replace(router.asPath) <-- refresh page with new session data
    router.push("/");
  }
}

export function validation(values) {
  const errors = {};

  // email
  if (values.email == "") errors.email = "Required";
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
    errors.email = "Invalid email address";

  // password
  if (values.password == "") errors.password = "Required";

  return errors;
}

export default function render(props) {
  const router = useRouter();
  console.log(router)

  return (
    <div id={styles.Login} className="mt-8">
      {/* <p>token : {props.token}</p> */}

      <div className="d-flex flex-column align-items-center">
        <p className="big mb-3">Kindred</p>
        <h2 className="m-0">Welcome back</h2>
        <p className="m-0">Fill your email and password</p>
      </div>

      <Formik
        // initialValues={{email: '', password: ''}}
        initialValues={{ email: "parent@mail.com", password: "password" }} // for dev
        onSubmit={(data) => onSubmit(data, router)}
        validate={validation}
      >
        {({ errors, touched, validateOnChange }) => {
          let emailClassName = "Input Input--email",
            passwordClassName = "Input Input--password mb-1";

          emailClassName += errors.email && touched.email ? " error" : "";
          passwordClassName +=
            errors.password && touched.password ? " error" : "";

          return (
            <Form className="mt-5 mb-2">
              {/* email */}
              <label htmlFor="form-email">Email</label>
              <Field
                id="form-email"
                className={emailClassName}
                type="email"
                name="email"
                placeholder="example@gmail.com"
                required
              />
              {errors.email && touched.email && (
                <span className="form-error">{errors.email}</span>
              )}

              {/* password */}
              <label htmlFor="form-password">Password</label>
              <Field
                id="form-password"
                className={passwordClassName}
                type="password"
                name="password"
                placeholder="password"
                required
              />
              {errors.password && touched.password && (
                <span className="form-error">{errors.password}</span>
              )}

              {/* remember */}
              {/* <div className="d-flex align-items-center mt-1 color-gray">
                <Field type="checkbox" name="remember" />
                <label className="small m-0">Remember me</label>
              </div> */}

              <button className="Button Button--primary m-0 mt-2" type="submit">
                Sign in
              </button>
            </Form>
          );
        }}
      </Formik>

      <div className="color-gray">
        <p className="small m-0">
          Don't have an account ? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
}
