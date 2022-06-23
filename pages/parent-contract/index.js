import { Base } from "components/Base";
import { useState } from "react";
import styles from "./parent-contract.module.scss";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";

const data = {
  first_name: "Katie",
  last_name: "Godwin",
  birth_date: "15/12/2019",
  contract_status: "draft",
  contract_done: "1",
  contract_description:
    "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut tellus tortor, tristique quis velit at, semper laoreet ex. Vivamus tempor eu arcu ac tristique. Aenean aliquam risus ante, vel auctor lorem vestibulum vitae. Ut condimentum finibus augue malesuada sagittis. Quisque eget feugiat nisi. Nunc fringilla faucibus felis ut sodales. Proin volutpat sagittis sem quis volutpat. Quisque eget libero nec urna lobortis ultricies.",
  contract_sign_date: "17/12/2019",
  contract_expire_date: "15/12/2022",
};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(context) {
    console.log("user", context.req.session.user);
    if (!context.req.session.user) {
      return { redirect: { destination: "/login" } };
    }
    return { props: context.req.session.user };
  },
  sessionConfig
);

export default function render() {
  const [toggle, setToggle] = useState(false);
  return (
    <Base>
      <div id={styles.ParentContract}>
        <div className={styles.header}>
          <h1>Contract</h1>
          {/* <Material */}
          <label className={styles.switch}>
            <input type="checkbox" value={data.contract_done} />
            <span></span>
          </label>
        </div>
        {data.contract_status == "signed" ? (
          <div className="color-success">Signed</div>
        ) : data.contract_status == "draft" ? (
          <div className="color-error">Draft</div>
        ) : data.contract_status == "awaiting_signature" ? (
          <div className="color-gray">Awaiting signature</div>
        ) : (
          ""
        )}
        <div className="Card">
          <div className={styles.child}>
            <div className={styles.child__picture}></div>
            <div className={styles.child__informations}>
              <div className="body-semibold">
                {data.first_name} {data.last_name}
              </div>
              <div className="color-gray">{data.birth_date}</div>
            </div>
            <div className={styles.profile__contract__status}></div>
          </div>
          <div>
            <p>{data.contract_description}</p>
          </div>
        </div>
        {data.contract_status != "signed" ? (
          <a
            type="button"
            className="Button Button-tertiary"
            href="/edit-contract"
          >
            Edit
          </a>
        ) : (
          ""
        )}
        <div className={styles.contract_dates}>
          <span>signed on {data.contract_sign_date}</span>
          <span>expires on {data.contract_expire_date}</span>
        </div>
      </div>
    </Base>
  );
}
