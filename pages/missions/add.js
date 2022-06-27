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
import { useRouter } from "next/router";

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
export async function onSubmit(data, router) {
  console.log("form data", data);
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/missions", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  
  const json = await response.json();
  console.log(json);
  console.log(response.status);

  if (response.status == 201) {
    router.replace('/missions')
  }
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
  const router = useRouter()

  function getNextMonday(date) {
    let newDay = date.getDate() + (7 - (7 - date.getDay() + 1))
    date.setDate(newDay)
    return date
  }

  function getDateForInput(date) {
    let formatDay = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate(),
      formatMonth = date.getMonth() >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1),
      formatYear = date.getFullYear()
    
    return `${formatYear}-${formatMonth}-${formatDay}`
  }

  function getDateFromInput(date) {
    let splitedDate = date.value.split('-')
    return new Date(splitedDate[0] * 1, splitedDate[1] * 1 - 1, splitedDate[2] * 1)
  }

  function isSameDate(date1, date2) {
    return (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate())
  }

  const minStart = getNextMonday(new Date())
  const minEnd = new Date(minStart.getFullYear(), minStart.getMonth(), minStart.getDate())
    minEnd.setDate(minEnd.getDate() + 7)

  const updateDate = (action, isStart, min) => {

    // end
    const inputControlStart = document.querySelector('.Input--control[target="#form-start"]')
    const dateInputStart = document.querySelector(inputControlStart.getAttribute('target'))
    const dateStart = getDateFromInput(dateInputStart)

    // start
    const inputControlEnd = document.querySelector('.Input--control[target="#form-end"]')
    const dateInputEnd = document.querySelector(inputControlEnd.getAttribute('target'))
    const dateEnd = getDateFromInput(dateInputEnd)
    
    // current
    const currentInputControl = isStart ? inputControlStart : inputControlEnd
    const currentDateInput = isStart ? dateInputStart : dateInputEnd
    const currentDate = isStart ? dateStart : dateEnd

    // change date
    if (action == 'previous') currentDate.setDate(currentDate.getDate() - 7)
    if (action == 'next') currentDate.setDate(currentDate.getDate() + 7)

    // change date if dates are not equal
    if (!isSameDate(dateStart, dateEnd)) {
      let dataText = getDateForInput(currentDate)
      currentDateInput.value = dataText
      currentInputControl.querySelector('.information').textContent = dataText
    }

    // is minimum for start
    if (isSameDate(dateStart, minStart)) {
      inputControlStart.classList.add('minimum')
    } else {
      inputControlStart.classList.remove('minimum')
    }

    // is maximum for start
    dateStart.setDate(dateStart.getDate() + 7)
    if (isSameDate(dateStart, dateEnd)) {
      inputControlStart.classList.add('maximum')
    } else {
      inputControlStart.classList.remove('maximum')
    }
    dateStart.setDate(dateStart.getDate() - 7)
    
    // is minimum for end
    dateEnd.setDate(dateEnd.getDate() - 7)
    if (isSameDate(dateStart, dateEnd)) {
      inputControlEnd.classList.add('minimum')
    } else {
      inputControlEnd.classList.remove('minimum')
    }
    dateEnd.setDate(dateEnd.getDate() - 7)
  }

  return (
    <>
      <h2>Add mission</h2>
      <Formik
        initialValues={{
          title: "Lorem ipsum",
          points: 200,
          start: getDateForInput(minStart),
          end: getDateForInput(minEnd),
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et eum modi esse vel nihil ducimus, eius quis veniam. Placeat, molestias?",
          isRepeated,
          contract: props.currentChild.childContract,
          createdAt: getDateForInput(new Date()),
          updatedAt: getDateForInput(new Date()),
        }}
        onSubmit={(data) => onSubmit(data, router)}
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
                className="d-none"
                name="start"
                type="date"
              />
              <div className="Input Input--control d-flex justify-content-between align-items-center mb-1 minimum maximum" target="#form-start">
                <div className="d-flex cursor-pointer" onClick={e => updateDate('previous', true, minStart)}><ArrowLeftIcon/></div>
                <div className="information">{getDateForInput(minStart)}</div>
                <div className="d-flex cursor-pointer" onClick={e => updateDate('next', true, minStart)}><ArrowRightIcon/></div>
              </div>
              {errors.start && touched.start && (
                <span className="form-error">{errors.start}</span>
              )}

              {/* is repeated */}
              <div className="d-flex align-items-center mb-2">
                <Field id="form-is-repeated" name="isRepeated" type="checkbox" checked={isRepeated} onChange={() => setIsRepeated(!isRepeated)} />
                <label className="small m-0" htmlFor="form-is-repeated">Do not terminate</label>
              </div>

              
              {/* end week */}
              {!isRepeated && (
                <>
                  <label htmlFor="form-end">End week</label>
                  <Field
                    id="form-end"
                    className="d-none"
                    name="end"
                    type="date"
                  />
                  <div className="Input Input--control d-flex justify-content-between align-items-center minimum" target="#form-end">
                    <div className="d-flex cursor-pointer" onClick={e => updateDate('previous', false, minEnd)}><ArrowLeftIcon/></div>
                    <div className="information">{getDateForInput(minEnd)}</div>
                    <div className="d-flex cursor-pointer" onClick={e => updateDate('next', false, minEnd)}><ArrowRightIcon/></div>
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
                className="Input"
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
