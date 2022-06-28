
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { Base } from "components/Base"
import { useRouter } from 'next/router';

export async function onSubmit(data, router) {
	const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/register', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
	})
  	const json = await response.json()
	console.log(json)

	if (json.success) {
		console.log('success')
		const responseLogin = await fetch("/api/login", {
			method: "POST",
			headers: {
			  "Accept": "application/json",
			  "Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		  });
	
		const jsonLogin = await responseLogin.json();
		console.log(jsonLogin);
	
		if (jsonLogin.userId) {
			// router.replace(router.asPath) <-- refresh page with new session data
			router.push("/");
		}
	}
}


export function validation(values) {
	const errors = {}

	// email
	if (values.email == '') errors.email = 'Required'
	else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = 'Invalid email address'
	
	// firstname
	if (values.firstname == '') errors.firstname = 'Required'
	
	// lastname
	if (values.lastname == '') errors.lastname = 'Required'

	// password
	if (values.password == '') errors.password = 'Required'
	
	// confirm password
	else if (values.password !== values.confirmPassword) errors.confirmPassword = 'Passwords don’t match'

	return errors
}


export default function render() {
	const router = useRouter()

	return (
		<Base>
			<div className='mt-8'>

				<div className='d-flex flex-column align-items-center'>
					<p className='big mb-3'>Kindred</p>
					<h2 className='m-0'>Welcome back</h2>
					<p className='m-0'>Fill your email and password</p>
				</div>

				<Formik
					// initialValues={{email: '', firstname: '', lastname: '', password: '', confirmPassword: ''}}
					initialValues={{email: 'test@gmail.com', firstname: 'Lorem', lastname: 'Ipsum', password: 'password', confirmPassword: 'password'}} // dev
					onSubmit={data => onSubmit(data, router)}
					validate={validation}
				>
					{({ errors, touched }) => {
						let emailClassName = 'Input Input--email',
							passwordClassName = 'Input Input--password mb-1',
							firstnameClassName = 'Input',
							lastnameClassName = 'Input'

						emailClassName += errors.email && touched.email ? ' error' : ''
						firstnameClassName += errors.firstname && touched.firstname ? ' error' : ''
						lastnameClassName += errors.lastname && touched.lastname ? ' error' : ''
						passwordClassName += errors.password && touched.password || errors.confirmPassword && touched.confirmPassword ? ' error' : ''

						return (
							<Form className='mt-5 mb-2'>

								{/* email */}
								<label htmlFor='form-email'>Email</label>
								<Field id='form-email' className={emailClassName} type='email' name='email' placeholder='example@gmail.com' required />
								{errors.email && touched.email && <span className='form-error'>{errors.email}</span>}
								
								{/* firstname */}
								<label htmlFor='form-firstname'>Firstname</label>
								<Field id='form-firstname' className={firstnameClassName} type='text' name='firstname' placeholder='Your firstname' required />
								{errors.firstname && touched.firstname && <span className='form-error'>{errors.firstname}</span>}
								
								{/* lastname */}
								<label htmlFor='form-lastname'>Lastname</label>
								<Field id='form-lastname' className={lastnameClassName} type='text' name='lastname' placeholder='Your lastname' required />
								{errors.lastname && touched.lastname && <span className='form-error'>{errors.lastname}</span>}

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
