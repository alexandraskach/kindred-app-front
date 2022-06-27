// pages/api/login.js
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionConfig } from "logic/session";


export default withIronSessionApiRoute(async function login(req, res) {
  
  // token
  let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/login_check', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(req.body),
	})
  let json = await response.json(),
      token = json.token

  if (!token) {
    return res.status(400).json({
      error: "Invalid username/password",
    })
  }


  // id
  let responseId = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/current-user', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
		},
	})
  let id = await responseId.json()

  
  // user
  response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/users/' + id, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
		},
	})
  let user = await response.json()


  if (user) {
    req.session.token = token
    req.session.userId = user.id
    await req.session.save();
    return res.status(200).json({ token, userId: user.id })
	}
}, sessionConfig);

