import { useState } from "react";
import Link from "next/link";
import { Base } from "components/Base";
import SelectChild from "components/SelectChild";
import redirectToAuth from "components/redirectToAuth";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";
import { useRouter } from "next/router";
import getChildren from "components/getChildren";
import getWallet from "components/getWallet";
import getCurrentChild from "components/getCurrentChild";
import getData from "components/getData";


export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(context) {
    const props = context.req.session

		if (await redirectToAuth(props)) {
			return { redirect: { destination: "/login" } }
		}

    props.children = await getChildren(props)
    props.currentChild = await getCurrentChild(props)

    if (props.currentChild) {
      props.wallet = await getWallet(props)
    }
    // props.contract = await getData(props.token, props.currentChild.childContract)

    return { props };
  },
  sessionConfig
);

export default function render(props) {
  console.log(props)
  // return null
  return (
    <>
      <h2 className="mb-3">Dashboard</h2>

      <SelectChild children={props.children} currentChild={props.currentChild} />

      {props.currentChild && (
        <>
          <button className="Button Button--big Button--primary mb-2">Rate new missions</button>
          <div className="Card">
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="h1 m-0">{props.wallet.points} kint</span>
                {/* <span>{props.wallet.points * props.contract.ratioMoney}€</span> */}
              </div>
              <div className="color-success">38 missions accomplished</div>
            </div>
            <a href="#0">View history</a>
            <div>
              <a className="Button Button--tertiary">View missions</a>
              <a className="Button">Add mission</a>
            </div>
          </div>

          <div className="Card">
            <div className="h1 m-0">180 points</div>
            <a href="#0">View history</a>
            <div>
              <a className="Button Button--tertiary">View rewards</a>
              <a className="Button">Add reward</a>
            </div>
          </div>
        </>
      )}
    </>
  )
}
