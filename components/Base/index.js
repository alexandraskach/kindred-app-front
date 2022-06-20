// import Link from "next/link";

// export function getJWT() {
// 	return typeof window !== 'undefined' && localStorage.JWT ? localStorage.JWT : null
// }

// export async function getServerSideProps(context) {
// 	const JWT = getJWT()
	
// 	if (JWT == null) {
// 		return {
// 			redirect: {
// 				destination: "/login",
// 				permanent: false
// 			}
// 		}
// 	}

// 	return {
// 		props: JWT
// 	}
// }

export function Base({ children }) {
	return <main>{children}</main>
}
