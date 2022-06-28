import { Base } from "components/Base";
import redirectToAuth from "components/redirectToAuth";
import styles from "./parent-profile.module.scss";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";
import getChildren from "components/getChildren";
import PlusFillIcon from "components/icons/PlusFillIcon";
import { useReducer } from "react";
import Link from 'next/link'
import getData from "components/getData";


export const getServerSideProps = withIronSessionSsr(
	async function getServerSideProps(context) {
		const props = context.req.session

		if (await redirectToAuth(props)) {
			return { redirect: { destination: "/login" } }
		}
	  
		props.user = await getData(props.token, '/api/users/' + props.userId)
		props.children = await getChildren(props)
	  
		return { props }
	},
	sessionConfig
)

export function logout() {

}

export default function render({user, children, isParent}) {
	console.log(user)

	return (
		<Base>
			<div>
				<div className="d-flex flex-column align-items-center mb-3">
					<div className="Picture Picture--letter Picture--big mx-auto mb-1">{user.firstName.split('')[0]}</div>
					<h3 className="m-0">{user.firstName + ' ' + user.lastName}</h3>
					<p className="small m-0">{isParent ? 'Parent' : 'Child'}</p>
				</div>

				{/* Children */}
				{isParent && (
					<div className="Card">
						<div className="d-flex justify-content-between align-items-center">
							<div>Children</div>
							<Link href="/register-child"><a><PlusFillIcon/></a></Link>
						</div>
						{ children.map( (child, i) => {
							const dateToText = (d) => {
								let monthTexts = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
									date = new Date(d),
									dayText = date.getDate().toString().length == 1 ? '0' + date.getDate() : date.getDate(),
									monthText = monthTexts[date.getMonth() - 1]
								
								return dayText + ' ' + monthText + ' ' +  date.getFullYear()
							}

							return (
								<div key={child.id} className="d-flex align-items-center position-relative">
									<div className="Picture Picture--letter mr-1 decoration-none">{child.firstName.split('')[0]}</div>
									<div>
										<div className="body-semibold m-0 decoration-none">{child.fullName}</div>
										<div className="small color-gray m-0 decoration-none">Added on {dateToText(child.createdAt)}</div>
									</div>
									<Link href={"/contract/" + child.id}><a className="position-fill"></a></Link>
								</div>
							)
						} ) }
					</div>
				)}

				{/* personnal informations */}
				<div className="Card">
					<div>{user.email}</div>
					<a className="Button" href="">logout</a>
					<div>
						<div><a className="" href="#0">Change your password</a></div>
						<div><a className="" href="#0">Delete your account</a></div>
					</div>
				</div>
		</div>
		</Base>
	);
}
