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

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(context) {
    if (!context.req.session.user) {
      return { redirect: { destination: "/login" } };
    }

    let props = context.req.session;
    let responseChilds = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `/api/users/${props.user.id}/childs`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
        },
      }
    );
    let childs = await responseChilds.json();
    let responseRewards;
    if (context.req.session.currentChildId) {
      responseRewards = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          `/api/users/${context.req.session.currentChildId}/rewards`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.token,
          },
        }
      );
    }
    let rewards = await responseRewards.json();
    props.rewards = rewards;
    props.childs = childs;

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
