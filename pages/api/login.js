import { withIronSessionApiRoute } from "iron-session/next";
import { databaseLogin } from "../../logic/database";
import { sessionConfig } from "../../logic/session";

export default withIronSessionApiRoute(async function login(req, res) {
  const { username, password } = req.body;
  const user = await databaseLogin(username, password);
  if (user) {
    req.session.user = user;
    await req.session.save();
    return res.status(200).json({ user: user });
  }
  return res.status(400).json({ error: "Invalid username/password" });
}, sessionConfig);
