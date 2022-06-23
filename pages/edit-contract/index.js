import { Base } from "components/Base";
import styles from "./edit-contract.module.scss";
import { Form, Formik, Field } from "formik";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(context) {
    console.log("user", context.req.session.user);
    if (!context.req.session.user) {
      return { redirect: { destination: "/login" } };
    }
    return { props: context.req.session.user };
  },
  sessionConfig
);

export async function onSubmit(data) {
  //   const response = await fetch(
  //     process.env.NEXT_PUBLIC_API_URL + "/login_check",
  //     {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     }
  //   );
  //   const json = await response.json();
  //   localStorage.JWT = json.token;
  //   console.log(json.token);
}

export function validation(values) {
  const errors = {};

  // points
  if (values.points == "") errors.points = "Required";

  // description
  if (values.description == "") errors.description = "Required";

  return errors;
}

export default function render() {
  const data = {
    first_name: "Robert",
    last_name: "Godwin",
    mail: "robertgodwin@mail.com",
    roles: "Parent",
    birthdate: "20/02/1972",
    contract_value: "0,80",
    contract_description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut tellus tortor, tristique quis velit at, semper laoreet ex. Vivamus tempor eu arcu ac tristique. Aenean aliquam risus ante, vel auctor lorem vestibulum vitae. Ut condimentum finibus augue malesuada sagittis. Quisque eget feugiat nisi. Nunc fringilla faucibus felis ut sodales. Proin volutpat sagittis sem quis volutpat. Quisque eget libero nec urna lobortis ultricies.",
    children: [
      {
        id: 1,
        first_name: "Katie",
        last_name: "Godwin",
        created_at: "02/02/2017",
        contract_date: "15/12/2019",
      },
      {
        id: 2,
        first_name: "Samantha",
        last_name: "Godwin",
        created_at: "02/02/2017",
        contract_date: "15/12/2019",
      },
      {
        id: 3,
        first_name: "Brock",
        last_name: "Godwin",
        created_at: "02/02/2017",
        contract_date: "15/12/2019",
      },
    ],
  };

  return (
    <Base>
      <div id={styles.EditContract}>
        {/* <div>
          <div className="body-semibold">Child</div>
          <select>
            {data.children.map((child) => (
              <option value={child.first_name}>
                {child.first_name} {child.last_name}
              </option>
            ))}
          </select>
        </div> */}
        <Formik
          initialValues={{ points: "", description: "" }}
          onSubmit={(data) => onSubmit(data)}
          validate={validation}
        >
          {({ errors, touched, validateOnChange }) => {
            let childClassName = "Input Input--select mb-1",
              pointsValueClassName = "Input Input--text mb-1",
              descriptionClassName = "Input Input--text mb-1";

            childClassName += errors.child && touched.child ? " error" : "";
            pointsValueClassName +=
              errors.points__value && touched.points__value ? " error" : "";
            descriptionClassName +=
              errors.description && touched.description ? " error" : "";

            return (
              <Form className="mt-5 mb-2">
                {/* Child */}
                <label htmlFor="form-child">Child</label>
                <Field
                  id="form-child"
                  className={childClassName}
                  type="select"
                  name="child"
                  required
                />
                {errors.child && touched.child && (
                  <span className="form-error">{errors.child}</span>
                )}

                {/* points value */}
                <label htmlFor="form-points-value">Value of each point</label>
                <Field
                  id="form-points-value"
                  className={pointsValueClassName}
                  type="text"
                  name="points-value"
                  placeholder="Enter points value"
                  required
                />
                {errors.points__value && touched.points__value && (
                  <span className="form-error">{errors.points__value}</span>
                )}

                {/* description */}
                <label htmlFor="form-description">Description</label>
                <Field
                  as="textarea"
                  id="form-description"
                  className={descriptionClassName}
                  type="text"
                  name="description"
                  placeholder="Enter your new description"
                  required
                />
                {errors.description && touched.description && (
                  <span className="form-error">{errors.description}</span>
                )}

                <button className="Button Button--tertiary" type="submit">
                  Save modification
                </button>
                <button className="Button Button-tertiary" type="submit">
                  Save as draft
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Base>
  );
}
