import { Base } from "components/Base";
import EditIcon from "components/icons/EditIcon";
import PlusIcon from "components/icons/PlusIcon";
import RefreshIcon from "components/icons/RefreshIcon";
import Link from "next/link";
import styles from "./missions.module.scss";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";
import SelectChild from "components/SelectChild";
import getChildren from "components/getChildren";
import redirectToAuth from "components/redirectToAuth";
import getData from "components/getData";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(context) {
    const props = context.req.session

		if (await redirectToAuth(props)) {
			return { redirect: { destination: "/login" } }
		}

    props.children = await getChildren(props)
    props.currentChild = await getData(props.token, '/api/users/' + props.currentChildId)
    props.contract = await getData(props.token, props.currentChild.childContract)

    return { props }
  },
  sessionConfig
);

export default function render(props) {
  console.log(props)
  return (
    <div>
      <h2>Missions</h2>
      <SelectChild children={props.children} currentChild={props.currentChild} />
      <div className="mt-3">
        <Link href="/missions/add">
          <a className="Button">Add mission <PlusIcon/></a>
        </Link>
        
      </div>
    </div>
  )
}
