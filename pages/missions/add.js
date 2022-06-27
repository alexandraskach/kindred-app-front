import { Base } from "components/Base";
import DatePickerField from "components/Datepicker";
import PlusIcon from "components/icons/PlusIcon";
import RefreshIcon from "components/icons/RefreshIcon";
import { Field, Form, Formik, validateYupSchema } from "formik";
import styles from "./missions.module.scss";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";
import redirectToAuth from "components/redirectToAuth";
import getCurrentChild from "components/getCurrentChild";
import { useState } from "react";
import { date } from "yup";
import ArrowLeftIcon from "components/icons/ArrowLeftIcon";
import ArrowRightIcon from "components/icons/ArrowRightIcon";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(context) {
    const props = context.req.session

		if (await redirectToAuth(props)) {
			return { redirect: { destination: "/login" } }
		}

    props.currentChild = await getCurrentChild(props)

    return { props }
  },
  sessionConfig
);
export async function onSubmit(data) {
  console.log("form data", data);
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/missions", {
    method: "POST",
    headers: {
      "Accept": "application/json",
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

  // start
  if (values.start == "") errors.start = "Start week is required";

  // end
  if (values.isRepeated == false && values.end == "") errors.end = "End week is required";

  // category
  if (values.category == "") errors.category = "Category is required";

  return errors;
}

export default function render(props) {
  const [isRepeated, setIsRepeated] = useState(false)

  function getNextMonday(date) {
    let newDay = date.getDate() + (6 - (6 - date.getDay()) + 1)
    date.setDate(newDay)
    return date
  }

  function getDateForInput(date) {
    let formatDay = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate(),
      formatMonth = date.getMonth() >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1),
      formatYear = date.getFullYear()
    
    return `${formatYear}-${formatMonth}-${formatDay}`
  }

  let nextMonday = getNextMonday(new Date())
  let minEnd = new Date(nextMonday.getFullYear(), nextMonday.getMonth(), nextMonday.getDate())
    minEnd.setDate(minEnd.getDate() + 7)

  const updateDate = (action, target) => {
    const inputControl = target.closest('.Input'),
    information = inputControl.querySelector('.information'),
    input = document.querySelector(inputControl.getAttribute('target')),
    splitedDate = input.value.split('-'),
    date = new Date(splitedDate[0] * 1, splitedDate[1] * 1 - 1, splitedDate[2] * 1)
    
    if (action == 'previous') date.setDate(date.getDate() - 7)
    if (action == 'next') date.setDate(date.getDate() + 7)

    let dataText = getDateForInput(date)
    input.value = dataText
    information.textContent = dataText
  }

  return (
    <>
      <h2>Add mission</h2>
      <Formik
        initialValues={{
          title: "Lorem ipsum",
          points: 200,
          start: getDateForInput(nextMonday),
          end: getDateForInput(minEnd),
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et eum modi esse vel nihil ducimus, eius quis veniam. Placeat, molestias?",
          isRepeated,
          contract: props.currentChild.childContract,
        }}
        onSubmit={(data) => onSubmit(data)}
        validate={validation}
      >
        {({ errors, touched, validateOnChange }) => {
          let titleClassName = "Input ",
            kinsClassName = "Input mb-1",
            startClassName = 'Input mb-1',
            endClassName = 'Input',
            descriptionClassName = "Input";

          titleClassName += errors.title && touched.title ? " error" : "";
          kinsClassName += errors.points && touched.points ? " error" : "";
          startClassName += errors.start && touched.start ? " error" : "";
          endClassName += errors.end && touched.end ? " error" : "";
          descriptionClassName += errors.description && touched.description ? " error" : "";

          return (
            <Form className="mb-2">
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
                type="number"
                max="1000"
                min="1"
                placeholder="200"
                required
              />
              {errors.points && touched.points && (
                <span className="form-error">{errors.points}</span>
              )}

              {/* start week */}
              <label htmlFor="form-start">Start week</label>
              <Field
                id="form-start"
                name="start"
                type="date"
                className={startClassName}
              />
              <div className="Input Input--control d-flex justify-content-between align-items-center" target="#form-start">
                <div className="d-flex" onClick={e => updateDate('previous', e.target)}><ArrowLeftIcon/></div>
                <div className="information"></div>
                <div className="d-flex" onClick={e => updateDate('next', e.target)}><ArrowRightIcon/></div>
              </div>
              {errors.start && touched.start && (
                <span className="form-error">{errors.start}</span>
              )}

              {/* is repeated */}
              <div className="d-flex align-items-center mb-2">
                <Field id="form-is-repeated" name="isRepeated" type="checkbox" checked={isRepeated} onChange={() => setIsRepeated(!isRepeated)} />
                <label className="small m-0" htmlFor="form-is-repeated">Is repeated ?</label>
              </div>

              
              {/* end week */}
              {!isRepeated && (
                <>
                  <label htmlFor="form-end">End week</label>
                  <Field
                    id="form-end"
                    name="end"
                    type="date"
                    className={endClassName}
                  />
                  <div className="Input Input--control d-flex justify-content-between align-items-center" target="#form-end">
                    <div className="d-flex" onClick={e => updateDate('previous', e.target)}><ArrowLeftIcon/></div>
                    <div className="information"></div>
                    <div className="d-flex" onClick={e => updateDate('next', e.target)}><ArrowRightIcon/></div>
                  </div>
                  {errors.end && touched.end && (
                    <span className="form-error">{errors.end}</span>
                  )}
                </>
              )}

              {/* description */}
              <label htmlFor="form-description">Description</label>
              <Field
                id="form-description"
                className={descriptionClassName}
                component="textarea"
                name="description"
                placeholder="Provide the description for the task"
              />
              {errors.description && touched.description && (
                <span className="form-error">{errors.description}</span>
              )}

              <button
                className="Button Button--dark m-0 mt-2"
                type="submit"
              >
                Save mission
              </button>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}
