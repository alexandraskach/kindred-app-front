import { Base } from "components/Base";
import { Form, Formik, Field } from "formik";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(context) {
    console.log("user", context.req.session.user);
    if (!context.req.session.user) {
      return { redirect: { destination: "/login" } };
    }

    let props = context.req.session;
    let responseReward = await fetch(
      process.env.NEXT_PUBLIC_API_URL +
        `/api/rewards/${context.query.idReward}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
        },
      }
    );
    let reward = await responseReward.json();

    return {
      props: {
        token: context.req.session.token,
        user: context.req.session.user,
        idReward: context.query.idReward,
        currentReward: reward,
        idChildSelected: context.req.session.idChildSelected,
      },
    };
  },
  sessionConfig
);

export async function onSubmit(data, token) {
  console.log(data, token);
  //TODO
  // const response = await fetch("/api/edit-reward", {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer " + token,
  //   },
  //   body: JSON.stringify(data),
  // });
  // const json = await response.json();
  // console.log(json);
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
  console.log(props);
  return (
    <Base>
      <div>
        <h1>Edit reward</h1>
        <Formik
          initialValues={{
            points: props.currentReward.points,
            description: props.currentReward.description,
            user: `${props.idChildSelected}`,
          }}
          onSubmit={(data) => onSubmit(data, props.token)}
          validate={validation}
        >
          {({ errors, touched, validateOnChange }) => {
            let pointsClassName = "Input Input--text mb-1",
              descriptionClassName = "Input Input--text mb-1";

            pointsClassName += errors.points && touched.points ? " error" : "";
            descriptionClassName +=
              errors.description && touched.description ? " error" : "";

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
                <button className="Button Button-tertiary" type="submit">
                  Delete reward
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Base>
  );
}
