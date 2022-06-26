import { Base } from "components/Base";
import styles from "./edit-contract.module.scss";
import { Form, Formik, Field } from "formik";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";
import redirectToAuth from "components/redirectToAuth";
import getData from "components/getData";
import { useState } from "react";

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

export async function onSubmit(data, contractId) {
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
}

export function validation(values) {
  const errors = {};

  // points
  if (values.ratio < 0) errors.ratio = "Ratio must be greater than 0";

  console.log(values.ratio)

  return errors;
}

export default function render(props) {
  console.log(props)

  const [ratio, SetRatio] = useState(props.contract.ratioMoney)

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
        <h2>Contrat pour {props.child.fullName}</h2>
        <p>Votre enfant aura {ratio * props.wallet.points}€</p>
        <Formik
          initialValues={{ ratio, description: props.contract.description }}
          onSubmit={(data) => onSubmit(data, props.contract.id)}
          validate={validation}
        >
          {({ errors, touched }) => {
            console.log(errors)
            return (
              <Form className="mt-5 mb-2">

                {/* points value */}
                <label htmlFor="form-ratio">1 kint = {ratio * 1}€</label>
                <Field className="Input" id="form-ratio" type="number" step="0.1" name="ratio" onChange={e => SetRatio(e.target.value)} value={ratio} placeholder="Enter points value" />
                {errors.ratio && touched.ratio && (<span className="form-error">{errors.ratio}</span>)}

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
  );
}
