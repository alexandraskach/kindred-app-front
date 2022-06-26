import { Base } from "components/Base";
import DatePickerField from "components/Datepicker";
import PlusIcon from "components/icons/PlusIcon";
import RefreshIcon from "components/icons/RefreshIcon";
import { Field, Form, Formik } from "formik";
import styles from "./missions.module.scss";
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
  console.log("form data", data);
  const response = await fetch("/api/edit-mission", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  console.log(json);
}

export function validation(values) {
  const errors = {};

  // title
  if (values.title == "") errors.title = "Title is required";

  // Kins
  if (values.points == "") errors.points = "Kins are required";

  // startWeek
  if (values.startWeek == "") errors.startWeek = "Start week is required";

  // endWeek
  if (values.endWeek == "") errors.endWeek = "End week is required";

  // description
  if (values.description == "") errors.description = "Description is required";

  // category
  if (values.category == "") errors.category = "Category is required";

  return errors;
}

export default function render() {
  return (
    <Base>
      <div id={styles.Missions} className="mt-8">
        <div className="wrapper">
          <h2>Edit mission</h2>
          <Formik
            //TODO
            initialValues={{
              title: "",
              points: "",
              startWeek: "",
              endWeek: "",
              description: "",
              category: "",
              isRepeated: false,
              createdAt: "",
              updatedAt: new Date(),
              week: "",
              user: `/api/users/${props.idChildSelected}`,
              parentNotation: "",
              childNotation: "",
              contract: "/api/contracts/1",
            }} // for dev
            onSubmit={(data) => onSubmit(data)}
            validate={validation}
          >
            {({ errors, touched, validateOnChange }) => {
              let titleClassName = "Input ",
                kinsClassName = "Input mb-1",
                startWeekClassName,
                endWeekClassName,
                descriptionClassName = "Input";

              titleClassName += errors.title && touched.title ? " error" : "";
              kinsClassName += errors.points && touched.points ? " error" : "";
              startWeekClassName +=
                errors.startWeek && touched.startWeek ? " error" : "";
              endWeekClassName +=
                errors.endWeek && touched.endWeek ? " error" : "";
              descriptionClassName +=
                errors.description && touched.description ? " error" : "";

              return (
                <Form className="mt-5 mb-2">
                  {/* title */}
                  <label htmlFor="form-title">Title</label>
                  <Field
                    id="form-title"
                    className={titleClassName}
                    name="title"
                    placeholder="Do the dishes on Thursday evening"
                    required
                  />
                  {errors.title && touched.title && (
                    <span className="form-error">{errors.title}</span>
                  )}

                  {/* kins */}
                  <label htmlFor="form-points">Kins</label>
                  <Field
                    id="form-points"
                    className={kinsClassName}
                    name="points"
                    placeholder="200"
                    type="number"
                    max="1000"
                    min="1"
                    required
                  />
                  {errors.points && touched.points && (
                    <span className="form-error">{errors.points}</span>
                  )}

                  {/* start week */}
                  <label htmlFor="form-start-week">Start week</label>
                  <Field
                    name="startWeek"
                    as={DatePickerField}
                    placeholder="09/07/2022"
                    className={startWeekClassName}
                  />
                  {errors.startWeek && touched.startWeek && (
                    <span className="form-error">{errors.startWeek}</span>
                  )}

                  {/* end week */}
                  <label htmlFor="form-end-week">End week</label>
                  <Field
                    name="endWeek"
                    as={DatePickerField}
                    className={endWeekClassName}
                  />
                  {errors.endWeek && touched.endWeek && (
                    <span className="form-error">{errors.endWeek}</span>
                  )}
                  {/* description */}
                  <label htmlFor="form-description">Description</label>
                  <Field
                    id="form-description"
                    className={descriptionClassName}
                    component="textarea"
                    name="description"
                    placeholder="Provide the description for the task"
                    required
                  />
                  {errors.description && touched.description && (
                    <span className="form-error">{errors.description}</span>
                  )}

                  <label htmlFor="form-start-week">Category</label>
                  <p>
                    <Field type="radio" name="category" value="One" required />
                    Item 1
                  </p>
                  <p>
                    <Field type="radio" name="category" value="One" required />
                    Item 2
                  </p>
                  {errors.category && touched.category && (
                    <span className="form-error">{errors.category}</span>
                  )}

                  <button
                    className="Button Button--dark m-0 mt-2"
                    type="submit"
                  >
                    Save mission
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
