import { Base } from "components/Base";
import PlusIcon from "components/icons/PlusIcon";
import Link from "next/link";
import styles from "./rewards.module.scss";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";
import SelectChild from "components/SelectChild";
import { useEffect, useState } from "react";
import EditIcon from "components/icons/EditIcon";
import TrashIcon from "components/icons/TrashIcon";
import redirectToAuth from "components/redirectToAuth";
import getChildren from "components/getChildren";
import getCurrentChild from "components/getCurrentChild";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(context) {
    const props = context.req.session;
    if (await redirectToAuth(props)) {
      return { redirect: { destination: "/login" } };
    }
    props.children = await getChildren(props);
    props.currentChild = await getCurrentChild(props);

    let responseRewards;
    responseRewards = await fetch(
      process.env.NEXT_PUBLIC_API_URL +
        `/api/users/${props.currentChildId}/rewards`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
        },
      }
    );

    let rewards = await responseRewards.json();
    props.rewards = rewards;
    return { props };
  },
  sessionConfig
);

export async function deleteReward(rewardId) {
  console.log("rewardId", rewardId);
  const response = await fetch("/api/delete-reward", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rewardId),
  });
  const json = await response.json();
  console.log(json);
}

export default function render(props) {
  console.log("props", props);
  return (
    <Base>
      <div id={styles.Rewards} className="mt-8 wrapper">
        {props.isParent && (
          <div className="select-container">
            <SelectChild
              children={props.children}
              currentChild={props.currentChild}
            ></SelectChild>
          </div>
        )}
        <h2 className="mt-2">Rewards</h2>
        {props.isParent && (
          <Link href="/rewards/add-reward">
            <button className="Button Button--outline">
              {" "}
              Add reward{" "}
              <span className="ml-2">
                <PlusIcon></PlusIcon>
              </span>
            </button>
          </Link>
        )}
        {props.rewards.length == 0 && (
          <div>
            <p>There is no reward available yet ! 😕</p>
            <Link href="/"><a className="Button">Go to dashboard</a></Link>
          </div>
        )}
        {props.rewards.map((reward) => (
          <div key={reward.id} className="Card">
            <h2>
              {reward.points} points{" "}
              <Link
                href={{
                  pathname: "/rewards/edit-reward",
                  query: {
                    idReward: reward.id,
                  },
                }}
              >
                <span style={{ float: "right" }}>
                  <EditIcon></EditIcon>
                </span>
              </Link>
              <span
                style={{ float: "right" }}
                onClick={() => deleteReward(reward.id)}
              >
                <TrashIcon></TrashIcon>
              </span>
            </h2>
            <p>{reward.description}</p>
          </div>
        ))}
      </div>
    </Base>
  );
}
