
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { Base } from "components/Base"




export async function onSubmit(data) {
	const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/user/new', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
	})
  	const json = await response.json()
	console.log(json)
}

export function validation(values) {
	const errors = {}

	// email
	if (values.email == '') errors.email = 'Required'
	else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = 'Invalid email address'

	// password
	if (values.password == '') errors.password = 'Required'
	
	// confirm password
	else if (values.password !== values.confirmPassword) errors.confirmPassword = 'Passwords don’t match'

	return errors
}

export default function render() {
	return (
		<Base>
			<div className='mt-8'>

				<div className='d-flex flex-column align-items-center'>
					<p className='big mb-3'>Kindred</p>
					<h2 className='m-0'>Welcome back</h2>
					<p className='m-0'>Fill your email and password</p>
				</div>

				<Formik
					// initialValues={{email: '', password: '', confirmPassword: ''}}
					initialValues={{email: 'test@gmail.com', password: 'password', confirmPassword: 'password'}} // dev
					onSubmit={data => onSubmit(data)}
					validate={validation}
				>
					{({ errors, touched, validateOnChange }) => {
						let emailClassName = 'Input Input--email',
							passwordClassName = 'Input Input--password mb-1'

						emailClassName += errors.email && touched.email ? ' error' : ''
						passwordClassName += errors.password && touched.password || errors.confirmPassword && touched.confirmPassword ? ' error' : ''

						return (
							<Form className='mt-5 mb-2'>

								{/* email */}
								<label htmlFor='form-email'>Email</label>
								<Field id='form-email' className={emailClassName} type='email' name='email' placeholder='example@gmail.com' required />
								{errors.email && touched.email && <span className='form-error'>{errors.email}</span>}

								{/* password */}
								<label htmlFor='form-password'>Password</label>
								<Field id='form-password' className={passwordClassName} type='password' name='password' placeholder='Enter a password' required />
								
								{/* confirm password */}
								<Field id='form-password' className={passwordClassName} type='password' name='confirmPassword' placeholder='Confirm your password' required />
								{errors.password && touched.password && <span className='form-error'>{errors.password}</span>}
								{errors.confirmPassword && touched.confirmPassword && <span className='form-error'>{errors.confirmPassword}</span>}

								{/* remember */}
								<div className='d-flex align-items-center mt-1 color-gray'>
									<Field type='checkbox' name='remember' />
									<label className='small m-0'>Remember me</label>
								</div>

								<button className='Button Button--primary m-0 mt-2' type='submit'>Sign in</button>
							</Form>
						)
					}}
				</Formik>

				<div className='color-gray'>
					<p className='small m-0'>You have an account ? <a href="/login">Sign up</a></p>
					<p className='small m-0'><a href="#0">Forgot password ?</a></p>
				</div>
			</div>
		</Base>
	)
}
