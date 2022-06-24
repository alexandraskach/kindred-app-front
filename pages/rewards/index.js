import { Base } from "components/Base";
import PlusIcon from "components/icons/PlusIcon";
import Link from "next/link";
import styles from "./rewards.module.scss";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";
import SelectChild from "components/SelectChild";
import { useEffect, useState } from "react";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(context) {
    
    if (!context.req.session.user) {
      return { redirect: { destination: "/login" } }
    }

    let props = context.req.session,
        responseChilds = await fetch( process.env.NEXT_PUBLIC_API_URL + `/api/users/${props.user.id}/childs`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + props.token,
          }
        } ),
        childs = await responseChilds.json()

    props.childs = childs

    return { props }
  },
  sessionConfig
);

export default function render(props) {
  return (
    <Base>
      <div id={styles.Rewards} className="mt-8 wrapper">
        <div className="select-container">
          <SelectChild childs={props.childs}></SelectChild>
        </div>
        <h2 className="mt-2">Rewards</h2>
        <Link href="/rewards/add-reward">
          <button className="Button Button--outline">
            {" "}
            Add reward{" "}
            <span className="ml-2">
              <PlusIcon></PlusIcon>
            </span>
          </button>
        </Link>
        <div className="Card">
          <h2>120 points</h2>
          <p>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Ut tellus tortor, tristique quis velit at,
            semper laoreet ex.
          </p>
        </div>
        <div className="Card">
          <h2>120 points</h2>
          <p>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Ut tellus tortor, tristique quis velit at,
            semper laoreet ex.
          </p>
        </div>
      </div>
    </Base>
  );
}
