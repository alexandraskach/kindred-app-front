import { Base } from "components/Base";
import { Form, Formik, Field } from "formik";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(context) {
    if (!context.req.session.user) {
      return { redirect: { destination: "/login" } };
    }
    let props = context.req.session;
    return { props };
  },
  sessionConfig
);

export async function onSubmit(data, token) {
  console.log(data);
  const response = await fetch("/api/add-reward", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  console.log(json);
}

export function validation(values) {
  const errors = {};

  // points
  if (values.points == "") errors.points = "Required";

  // description
  if (values.description == "") errors.description = "Required";

  return errors;
}

export default function render(props) {
  return (
    <Base>
      <div>
        <h1>Add reward</h1>
        <Formik
          initialValues={{
            points: "",
            description: "",
            user: `/api/users/${props.idChildSelected}`,
          }}
          onSubmit={(data) => onSubmit(data, props.token)}
          validate={validation}
        >
          {({ errors, touched, validateOnChange }) => {
            let pointsClassName = "Input Input--text mb-1",
              descriptionClassName = "Input Input--text mb-1";

            pointsClassName +=
              errors.password && touched.password ? " error" : "";
            descriptionClassName +=
              errors.confirm__password && touched.confirm__password
                ? " error"
                : "";

            return (
              <Form className="mt-5 mb-2">
                {/* points */}
                <label htmlFor="form-points">Points</label>
                <Field
                  id="form-points"
                  className={pointsClassName}
                  type="number"
                  max="1000"
                  min="1"
                  name="points"
                  placeholder="Enter your new points"
                  required
                />
                {errors.points && touched.points && (
                  <span className="form-error">{errors.points}</span>
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
                  Save reward
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Base>
  );
}
