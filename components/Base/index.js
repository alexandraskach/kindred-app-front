// import Link from "next/link";

export function getJWT() {
	return typeof window !== 'undefined' && localStorage.JWT ? localStorage.JWT : null
}

export function Base({ children }) {
	console.log(getJWT())

	return (
		<>
			<main>{children}</main>
		</>
	)
}
