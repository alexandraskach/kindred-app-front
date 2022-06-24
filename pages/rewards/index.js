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
    return { props: context.req.session };
  },
  sessionConfig
);

export default function render(props) {
  // const [isLoading, setIsLoading] = useState(false);
  const childs = [];
  useEffect(() => {
    // setIsLoading(true);

    fetch(
      process.env.NEXT_PUBLIC_API_URL + `/api/users/${props.user.id}/childs`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        childs.push(data);
      });

    console.log("childs", childs);
  });

  return (
    <Base>
      <div id={styles.Rewards} className="mt-8 wrapper">
        <div className="select-container">
          <SelectChild childs={childs}></SelectChild>
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
