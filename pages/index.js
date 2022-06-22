import { useState } from "react";
import Link from "next/link";
import { Base } from "components/Base";
import SelectChild from "components/SelectChild";

export async function getServerSideProps() {
	const childs = [
		{firstname: 'Lorem', lastname: 'ipsum', picture: '#0'},
	]

	return {
		props: { childs }
	}
}

export default function render({ childs }) {
	return (
		<Base>
			<SelectChild/>

			<h2 className="mb-3">Dashboard</h2>
			<button className="Button Button--big Button--primary mb-2">Rate new missions</button>

			<div className='Card'>
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
			
			<div className='Card'>
				<div className="h1 m-0">180 points</div>
				<a href="#0">View history</a>
				<div>
					<a className="Button Button--tertiary">View rewards</a>
					<a className="Button">Add reward</a>
				</div>
			</div>
		</Base>
	)
}