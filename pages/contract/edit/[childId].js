import { Base } from "components/Base";
// import styles from "./edit-contract.module.scss";
import { Form, Formik, Field } from "formik";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";
import redirectToAuth from "components/redirectToAuth";
import getData from "components/getData";
import { useState } from "react";
import { useRouter } from "next/router";

export const getServerSideProps = withIronSessionSsr(
	async function getServerSideProps(context) {
		const props = context.req.session

		if (await redirectToAuth(props)) {
			return { redirect: { destination: "/login" } }
		}

		props.child = await getData(props.token, '/api/users/' + context.params.childId)
		props.contract = await getData(props.token, props.child.childContract)
		props.wallet = await getData(props.token, props.child.wallet)
	  
		return { props }
	},
	sessionConfig
)

export async function onSubmit(data, contractId, router, childId) {
    console.log(data)
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/contracts/" + contractId,
      {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const json = await response.json()
    console.log(json)

    if (response.status == 200) {
      // router.replace('/contract/' + childId)
    }
}

export function validation(values) {
  const errors = {};

  // points
  if (values.ratioMoney < 0) errors.ratioMoney = "Ratio must be greater than 0";

  return errors;
}

export default function render(props) {
  const [ratio, setRatio] = useState(props.contract.ratioMoney)
  const router = useRouter()

  return (

    <Base>
      <div>
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
        <h2>Contrat pour {props.child.fullName}</h2>
        <p>Votre enfant aura {ratio * props.wallet.points}€</p>
        <Formik
          initialValues={{ ratioMoney: props.contract.ratioMoney, description: props.contract.description }}
          onSubmit={(data) => onSubmit(data, props.contract.id, router, props.child.id)}
          validate={validation}
        >
          {({ errors, touched, setFieldValue }) => {
            return (
              <Form className="mt-5 mb-2">

                {/* points value */}
                <label htmlFor="form-ratio">1 kint = {ratio * 1}€</label>
                <Field className="Input" id="form-ratio" type="number" step="0.1" name="ratioMoney" onChange={e => {
                  setRatio(e.target.value * 1)
                  setFieldValue('ratioMoney', e.target.value * 1)
                }} value={ratio} placeholder="Enter points value" />
                {errors.ratioMoney && touched.ratioMoney && (<span className="form-error">{errors.ratio}</span>)}

                {/* description */}
                <label htmlFor="form-description">Description</label>
                <Field className="Input" id="form-description" as="textarea" type="text" name="description" placeholder="Enter your new description" />

                <button className="Button Button--tertiary" type="submit">Save modification</button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Base>
  )
}
