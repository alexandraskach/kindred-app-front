import { Base } from "components/Base";
// import styles from "./edit-contract.module.scss";
import { Form, Formik, Field } from "formik";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";
import redirectToAuth from "components/redirectToAuth";
import getData from "components/getData";
import { useState } from "react";
import DateToText from "components/DateToText";
import Link from 'next/link'
import { useRouter } from "next/router";

export const getServerSideProps = withIronSessionSsr(
	async function getServerSideProps(context) {
		const props = context.req.session

		if (await redirectToAuth(props)) {
			return { redirect: { destination: "/login" } }
		}

		props.child = await getData(props.token, '/api/users/' + context.params.childId)
		props.contract = await getData(props.token, props.child.childContract)

    // const missions = await Promise.all(props.contract.missions.map(async (url) => getData(props.token, url)))

		props.wallet = await getData(props.token, props.child.wallet)
    // props.missions = missions
	  
		return { props }
	},
	sessionConfig
)

export default function render(props) {
  const router = useRouter()
  console.log(props)
  return (
    <>
      <h2>Contract</h2>
      {props.contract.signedAt && (
        <p className="color-success">Signed</p>
      )}
      {!props.contract.signedAt && (
        <p className="color-gray">Awaiting signature</p>
      )}
      <div className="Card position-relative">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <div className="Picture Picture--letter mr-1 decoration-none">{props.child.firstName.split('')[0]}</div>
            <div>
              <div className="body-semibold mb-0">{props.child.fullName}</div>
              <div className="small color-gray mb-0">{DateToText(props.child.createdAt)}</div>
            </div>
          </div>
          {props.contract.signedAt && (
            <div className="Status Status--success"></div>
          )}
          {!props.contract.signedAt && (
            <div className="Status"></div>
          )}
        </div>
        <div>{props.contract.description}</div>
        <Link href={'/contract/edit/' + props.child.id}><a className="position-fill"></a></Link>
      </div>
    </>
  )
}
