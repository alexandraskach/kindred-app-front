import { Base } from "components/Base";
import EditIcon from "components/icons/EditIcon";
import PlusIcon from "components/icons/PlusIcon";
import LoopIcon from "components/icons/LoopIcon";
import RefreshIcon from "components/icons/RefreshIcon";
import Link from "next/link";
import styles from "./missions.module.scss";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";
import SelectChild from "components/SelectChild";
import getChildren from "components/getChildren";
import redirectToAuth from "components/redirectToAuth";
import getData from "components/getData";
import DateToText from "components/DateToText";
import getCurrentChild from "components/getCurrentChild";


export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(context) {
    const props = context.req.session

		if (await redirectToAuth(props)) {
			return { redirect: { destination: "/login" } }
		}

    props.user = await getData(props.token, '/api/users/' + props.userId)
    props.children = await getChildren(props)

    if (props.children.length == 0) {
      return {
        redirect: {
          destination: '/settings'
        }
      }
    }

    props.currentChild = await getCurrentChild(props)

    if (props.user.parent) {
      props.contract = await getData(props.token, userId)
    } else {
      props.contract = await getData(props.token, props.currentChild.childContract)
    }

    props.missions = await getData(props.token, '/api/contracts/' + props.contract.id + '/missions')

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
          {props.children && (
            <a className="Button">Add mission <PlusIcon/></a>
          )}
        </Link>
        <div className="mt-3">
          {props.missions.map(mission => {
            return (
              <div key={mission.id} className="Card position-relative">
                <div>
                  <div className="body-semibold">{mission.title}</div>
                  {mission.isRepeated && (
                    <div className="d-flex align-items-center small color-gray">
                      <LoopIcon/>
                      <span className="ml-1">Begins on {DateToText(mission.start)}</span>
                    </div>
                  )}
                  {!mission.isRepeated && (
                    <div className="d-flex flex-columns small color-gray">
                      <span>Begins on {DateToText(mission.start)}<br></br>Ends on {DateToText(mission.end)}</span>
                    </div>
                  )}
                </div>
                <div>{mission.description}</div>
                <Link href={'/missions/edit/' + mission.id}><a className="position-fill"></a></Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
