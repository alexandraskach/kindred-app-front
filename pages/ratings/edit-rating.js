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
    let responseRating = await fetch(
      process.env.NEXT_PUBLIC_API_URL +
        `/api/ratings/${context.query.idRating}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
        },
      }
    );
    let rating = await responseRating.json();
    props.currentRating = rating;

    return { props };
  },
  sessionConfig
);

export async function onSubmit(data) {
  console.log(data);
  // const response = await fetch("/api/edit-reward", {
  //   method: "PUT",
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
        <h1>Edit rating</h1>
        <Formik
          initialValues={
            {
              // points: props.currentReward.points,
              // description: props.currentReward.description,
              // user: `/api/users/${props.session.currentChildId}`,
              // rewardId: props.currentReward.id,
            }
          }
          onSubmit={(data) => onSubmit(data)}
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
                <label htmlFor="form-points">Rating (1 to 5)</label>
                <Field
                  id="form-points"
                  className={pointsClassName}
                  type="number"
                  max="5"
                  min="1"
                  name="parentRating"
                  placeholder="Enter your new rating"
                  required
                />
                {errors.points && touched.points && (
                  <span className="form-error">{errors.points}</span>
                )}

                {/* description */}
                {/* <label htmlFor="form-description">Description</label>
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
                )} */}

                <button className="Button Button--tertiary" type="submit">
                  Save rating
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Base>
  );
}
