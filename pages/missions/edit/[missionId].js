import { Base } from "components/Base";
import DatePickerField from "components/Datepicker";
import PlusIcon from "components/icons/PlusIcon";
import RefreshIcon from "components/icons/RefreshIcon";
import { Field, Form, Formik, validateYupSchema } from "formik";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";
import redirectToAuth from "components/redirectToAuth";
import getCurrentChild from "components/getCurrentChild";
import { useEffect, useState } from "react";
import { date } from "yup";
import ArrowLeftIcon from "components/icons/ArrowLeftIcon";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import { useRouter } from "next/router";
import getData from "components/getData";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(context) {
    const props = context.req.session

		if (await redirectToAuth(props)) {
			return { redirect: { destination: "/login" } }
		}

    props.mission = await getData(props.token, '/api/missions/' + context.params.missionId)

    return { props }
  },
  sessionConfig
);
export async function onSubmit(data, id, router) {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/missions/" + id, {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  
  const json = await response.json();
  console.log(json);
  console.log(response.status);

  if (response.status == 200) {
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
  console.log(props)
  const router = useRouter()
  const [displayEnd, setDisplayEnd] = useState(props.mission.isRepeated)

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

  const updateDate = (action = null, isStart = null, setFieldValue = null) => {

    // end
    const inputControlStart = document.querySelector('.Input--control[target="#form-start"]')
    const dateInputStart = document.querySelector(inputControlStart.getAttribute('target'))
    const dateStart = getDateFromInput(dateInputStart)

    // start
    const inputControlEnd = document.querySelector('.Input--control[target="#form-end"]')
    const dateInputEnd = document.querySelector(inputControlEnd.getAttribute('target'))
    const dateEnd = getDateFromInput(dateInputEnd)
    
    if (action && isStart !== null) {
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
        setFieldValue(isStart ? 'start' : 'end', dataText)
        currentDateInput.value = dataText
        currentInputControl.querySelector('.information').textContent = dataText
      }
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

  useEffect(() => document.addEventListener('DOMContentLoaded', updateDate), [])

  return (
    <>
      <h2>Add mission</h2>
      <Formik
        initialValues={{
          title: props.mission.title,
          points: props.mission.points,
          start: getDateForInput(new Date(props.mission.start)),
          end: getDateForInput(new Date(props.mission.end)),
          description: props.mission.description,
          isRepeated: props.mission.isRepeated,
          updatedAt: getDateForInput(new Date()),
        }}
        onSubmit={(data) => onSubmit(data, props.mission.id, router)}
        validate={validation}
      >
        {({ errors, touched, setFieldValue }) => {
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
                <div className="d-flex cursor-pointer" onClick={e => updateDate('previous', true, setFieldValue)}><ArrowLeftIcon/></div>
                <div className="information">{getDateForInput(minStart)}</div>
                <div className="d-flex cursor-pointer" onClick={e => updateDate('next', true, setFieldValue)}><ArrowRightIcon/></div>
              </div>
              {errors.start && touched.start && (
                <span className="form-error">{errors.start}</span>
              )}

              {/* is repeated */}
              <div className="d-flex align-items-center mb-2">
                <Field id="form-is-repeated" name="isRepeated" type="checkbox" checked={displayEnd} onChange={() => {
                  setFieldValue('isRepeated', !displayEnd)
                  setDisplayEnd(!displayEnd)
                }} />
                <label className="small m-0" htmlFor="form-is-repeated">Do not terminate</label>
              </div>

              
              {/* end week */}
              {!displayEnd && (
                <>
                  <label htmlFor="form-end">End week</label>
                  <Field
                    id="form-end"
                    className="d-none"
                    name="end"
                    type="date"
                  />
                  <div className="Input Input--control d-flex justify-content-between align-items-center minimum" target="#form-end">
                    <div className="d-flex cursor-pointer" onClick={e => updateDate('previous', false, setFieldValue)}><ArrowLeftIcon/></div>
                    <div className="information">{getDateForInput(minEnd)}</div>
                    <div className="d-flex cursor-pointer" onClick={e => updateDate('next', false, setFieldValue)}><ArrowRightIcon/></div>
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
