import { Base } from "components/Base";
import DatePickerField from "components/Datepicker";
import PlusIcon from "components/icons/PlusIcon";
import RefreshIcon from "components/icons/RefreshIcon";
import { Field, Form, Formik } from "formik";
import styles from "./missions.module.scss";

export async function onSubmit(data) {
  console.log("form data", data);
  // const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/edit-mission', {
  // 	method: 'PUT',
  // 	headers: {
  // 		'Accept': 'application/json',
  // 		'Content-Type': 'application/json'
  // 	},
  // 	body: JSON.stringify(data),
  // })
  // 	const json = await response.json()
  // localStorage.JWT = json.token
  // console.log(json.token)
}

export function validation(values) {
  const errors = {};

  // title
  if (values.title == "") errors.title = "Title is required";

  // Kins
  if (values.kins == "") errors.kins = "Kins are required";

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
          <h2>Add mission</h2>
          <Formik
            initialValues={{
              title: "",
              kins: "",
              startWeek: "",
              endWeek: "",
              description: "",
              category: "",
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
              kinsClassName += errors.kins && touched.kins ? " error" : "";
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
                  <label htmlFor="form-kins">Kins</label>
                  <Field
                    id="form-kins"
                    className={kinsClassName}
                    name="kins"
                    placeholder="200"
                    required
                  />
                  {errors.kins && touched.kins && (
                    <span className="form-error">{errors.kins}</span>
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
