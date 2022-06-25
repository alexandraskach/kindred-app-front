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
      return { redirect: { destination: "/login" } };
    }

    let props = context.req.session,
      responseChilds = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/api/users/${props.user.id}/childs`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.token,
          },
        }
      ),
      responseRewards = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/api/users/${props.user.id}/rewards`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.token,
          },
        }
      ),
      rewards = await responseRewards.json(),
      childs = await responseChilds.json();

    props.rewards = rewards;
    props.childs = childs;

    return { props };
  },
  sessionConfig
);

export default function render(props) {
  console.log("rewards", props.rewards);
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
        {props.rewards.map((reward) => (
          <div key={reward.id} className="Card">
            <h2>{reward.points} points</h2>
            <p>{reward.description}</p>
          </div>
        ))}
      </div>
    </Base>
  );
}
