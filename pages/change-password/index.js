import { Base } from "components/Base";
import styles from "./change-password.module.scss";
import { Formik, Form, Field } from "formik";

export async function onSubmit(data) {
  // const response = await fetch(
  //   process.env.NEXT_PUBLIC_API_URL + "/login_check",
  //   {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   }
  // );
  // const json = await response.json();
  // localStorage.JWT = json.token;
  // console.log(json.token);
}

export function validation(values) {
  const errors = {};

  // password
  if (values.password == "") errors.password = "Required";

  // confirm password
  if (values.confirm__password == "") errors.confirm__password = "Required";

  return errors;
}

export default function render() {
  return (
    <Base>
      <div id={styles.ChangePassword}>
        <h1>Change your password</h1>
        <div>
          <Formik
            initialValues={{
              password: "",
              confirm__password: "",
            }}
            onSubmit={(data) => onSubmit(data)}
            validate={validation}
          >
            {({ errors, touched, validateOnChange }) => {
              let passwordClassName = "Input Input--password mb-1",
                confirmPasswordClassName = "Input Input--password mb-1";

              passwordClassName +=
                errors.password && touched.password ? " error" : "";
              confirmPasswordClassName +=
                errors.confirm__password && touched.confirm__password
                  ? " error"
                  : "";

              return (
                <Form className="mt-5 mb-2">
                  {/* password */}
                  <label htmlFor="form-password">New password</label>
                  <Field
                    id="form-password"
                    className={passwordClassName}
                    type="password"
                    name="password"
                    placeholder="Enter your new password"
                    required
                  />
                  {errors.password && touched.password && (
                    <span className="form-error">{errors.password}</span>
                  )}

                  {/* confirm password */}
                  <Field
                    id="form-confirm-password"
                    className={confirmPasswordClassName}
                    type="password"
                    name="confirm__password"
                    placeholder="Confirm your new password"
                    required
                  />
                  {errors.confirm__password && touched.confirm__password && (
                    <span className="form-error">
                      {errors.confirm__password}
                    </span>
                  )}

                  <button className="Button Button--tertiary" type="submit">
                    Change the password
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Base>
  );
}

// <Formik
//   initialValues={{
//     password: "",
//     password: "",
//   }}
//   validate={(values) => {
//     const errors = {};
//     if (!values.email) {
//       errors.email = "Required";
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//       errors.email = "Invalid email address";
//     }
//     return errors;
//   }}
//   onSubmit={async (values) => {
//     fetch(process.env.REACT_APP_API + "/api/login", {
//       method: "post",
//       body: JSON.stringify(values),
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then(
//         (result) => {
//           if (result.access_token) {
//             sessionStorage.setItem("isLoggedIn", true);
//             sessionStorage.setItem("role", result.user.role);
//             sessionStorage.setItem("user", JSON.stringify(result));
//             // result.user.role === "admin"
//             //   ? setRoleAdmin(true)
//             //   : setIsSubmitted(true);
//             // setIsSubmitted(true)
//           } else {
//             // setIsSubmitted(false);
//             alert("Error, please verify your user or your password");
//           }
//         },
//         (error) => {
//           // setIsSubmitted(false);
//           console.log(error);
//         }
//       );
//   }}
// >
//   <Form>
//     <div className="input-container">
//       <Field
//         type="text"
//         name="password"
//         placeholder="Enter your new password"
//         required
//       />
//     </div>
//     <div className="input-container">
//       <Field
//         type="text"
//         name="password"
//         placeholder="Confirm your new password"
//         required
//       />
//     </div>
//     {/* {renderErrorMessage("pass")}
//     {renderErrorMessage("email")} */}
//     <div className="button-container">
//       <button className="button-dark" type="submit">
//         Sign in
//       </button>
//     </div>
//   </Form>
// </Formik>;
