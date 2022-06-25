import { Base } from "components/Base";
import EditIcon from "components/icons/EditIcon";
import PlusIcon from "components/icons/PlusIcon";
import RefreshIcon from "components/icons/RefreshIcon";
import Link from "next/link";
import styles from "./missions.module.scss";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";
import SelectChild from "components/SelectChild";

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
      childs = await responseChilds.json();

    props.childs = childs;

    return { props };
  },
  sessionConfig
);

export default function render(props) {
  const data = {
    id: 1,
    description: "description de la mission",
    points: 300,
    isRepeated: "",
    createdAt: "",
    updatedAt: "",
    category: "",
    week: "",
    user: "",
    parentNotation: "",
    childNotation: "",
    userContract: "",
  };

  return (
    <Base>
      <div id={styles.Missions} className="mt-8">
        <div className="wrapper">
          <div className="select-container mb-2">
            <SelectChild childs={props.childs}></SelectChild>
          </div>
          <div className="missions-container">
            <h3>Missions</h3>
            <Link href="/missions/add-mission">
              <button className="Button Button--outline">
                {" "}
                Add mission{" "}
                <span className="ml-2">
                  <PlusIcon></PlusIcon>
                </span>
              </button>
            </Link>
            <div className="card mb-2">
              <p className="mission__title body-semibold">
                Do the dishes on Thursday evenings
                <span className="ml-2 mt-1">
                  <RefreshIcon></RefreshIcon>
                </span>
                <Link href="/missions/edit-mission">
                  <span className="ml-2 mt-1">
                    <EditIcon></EditIcon>
                  </span>
                </Link>
              </p>
              <p className="mission__date small">
                wednesday, thursday until january 02 2023
              </p>
              <div>
                <p className="mission__description">
                  Vestibulum ante ipsum primis in faucibus orci luctus et
                  ultrices posuere cubilia curae; Ut tellus tortor, tristique
                  quis velit at, semper laoreet ex.
                </p>
              </div>
            </div>
            <div className="card mb-2">
              <p className="mission__title body-semibold">
                Do the dishes on Thursday evenings
                <span className="ml-2 mt-1">
                  <RefreshIcon></RefreshIcon>
                </span>
                <Link href="/missions/edit-mission">
                  <span className="ml-2 mt-1">
                    <EditIcon></EditIcon>
                  </span>
                </Link>
              </p>
              <p className="mission__date small">
                wednesday, thursday until january 02 2023
              </p>
              <div>
                <p className="mission__description">
                  Vestibulum ante ipsum primis in faucibus orci luctus et
                  ultrices posuere cubilia curae; Ut tellus tortor, tristique
                  quis velit at, semper laoreet ex.
                </p>
              </div>
            </div>
            <div className="card mb-2">
              <p className="mission__title body-semibold">
                Do the dishes on Thursday evenings
                <span className="ml-2 mt-1">
                  <RefreshIcon></RefreshIcon>
                </span>
                <Link href="/missions/edit-mission">
                  <span className="ml-2 mt-1">
                    <EditIcon></EditIcon>
                  </span>
                </Link>
              </p>
              <p className="mission__date small">
                wednesday, thursday until january 02 2023
              </p>
              <div>
                <p className="mission__description">
                  Vestibulum ante ipsum primis in faucibus orci luctus et
                  ultrices posuere cubilia curae; Ut tellus tortor, tristique
                  quis velit at, semper laoreet ex.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}
