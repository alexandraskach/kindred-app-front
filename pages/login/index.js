
import { Formik, Field, Form } from 'formik'
import { Base } from "components/Base"
import styles from './login.module.scss'


export async function onSubmit(data) {
	const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/login_check', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
	})
  	const json = await response.json()
	localStorage.JWT = json.token
	console.log(json.token)
}


export function validation(values) {
	const errors = {}

	// email
	if (values.email == '') errors.email = 'Required'
	else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = 'Invalid email address'

	// password
	if (values.password == '') errors.password = 'Required'

	return errors
}


export default function render() {
	return (
		<Base>
			<div id={styles.Login} className='mt-8'>

				<div className='d-flex flex-column align-items-center'>
					<p className='big mb-3'>Kindred</p>
					<h2 className='m-0'>Welcome back</h2>
					<p className='m-0'>Fill your email and password</p>
				</div>

				<Formik
					// initialValues={{email: '', password: ''}}
					initialValues={{email: 'parent@mail.com', password: 'password'}} // for dev
					onSubmit={data => onSubmit(data)}
					validate={validation}
				>
					{({ errors, touched, validateOnChange }) => {
						let emailClassName = 'Input Input--email',
							passwordClassName = 'Input Input--password mb-1'

						emailClassName += errors.email && touched.email ? ' error' : ''
						passwordClassName += errors.password && touched.password ? ' error' : ''

						return (
							<Form className='mt-5 mb-2'>

								{/* email */}
								<label htmlFor='form-email'>Email</label>
								<Field id='form-email' className={emailClassName} type='email' name='email' placeholder='example@gmail.com' required />
								{errors.email && touched.email && <span className='form-error'>{errors.email}</span>}

								{/* password */}
								<label htmlFor='form-password'>Password</label>
								<Field id='form-password' className={passwordClassName} type='password' name='password' placeholder='password' required />
								{errors.password && touched.password && <span className='form-error'>{errors.password}</span>}

								{/* remember */}
								<div className='d-flex align-items-center mt-1 color-gray'>
									<Field type='checkbox' name='remember' />
									<label className='small m-0'>Remember me</label>
								</div>

								<button className='Button Button--primary m-0 mt-2' type='submit'>Sign up</button>
							</Form>
						)
					}}
				</Formik>

				<div className='color-gray'>
					<p className='small m-0'>Don't have an account ? <a href="/register">Sign in</a></p>
				</div>
			</div>
		</Base>
	)
}
