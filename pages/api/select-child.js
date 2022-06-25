import { withIronSessionApiRoute } from "iron-session/next";
import { sessionConfig } from "logic/session";

export default withIronSessionApiRoute(async function selectChild(req, res) {
  console.log("hello");
  req.session.idChildSelected = req.body;
  console.log(" req.session", req.session);
  await req.session.save();
  return res.status(200).json("childId updated");
}, sessionConfig);
