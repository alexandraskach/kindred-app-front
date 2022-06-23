// import redirectToAuh from "components/redirectToAuh"
// import { useRouter } from 'next/router'

// import { withIronSessionSsr } from "iron-session/next"
// import { sessionConfig } from "logic/session";

// export const getServerSideProps = withIronSessionSsr(
// 	async function getServerSideProps(context) {
// 		if (!context.req.session.token) {
// 			return { redirect: { destination: "/login" } };
// 			// return { props: { token: JSON.stringify(context.req.session) } }
// 		}
// 		return { props: {} }
// 	},
// 	sessionConfig
// )

export function Base({ children }) {
	// redirectToAuh()
	return <main>{children}</main>
}
