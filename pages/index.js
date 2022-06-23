import { useState } from "react";
import Link from "next/link";
import { Base } from "components/Base";
import SelectChild from "components/SelectChild";
import redirectToAuh from "components/redirectToAuh";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";
import { useRouter } from "next/router";

// export async function getServerSideProps() {
//   // const childs = [
//   // 	{firstname: 'Lorem', lastname: 'ipsum', picture: '#0'},
//   // ]
// 	return {
// 	  props: {
// 		childs: await getTodos(),
// 	  },
// 	};

// }

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

export default function render(props) {
  const router = useRouter();
  console.log("props", props);
  return (
    <Base>
      <SelectChild childs={props.childs} />

      <h2 className="mb-3">Dashboard</h2>
      <button className="Button Button--big Button--primary mb-2">
        Rate new missions
      </button>

      <div className="Card">
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <span className="h1 m-0">400 kint</span>
            <span>230€</span>
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
    </Base>
  );
}
