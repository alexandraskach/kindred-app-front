import { withIronSessionApiRoute } from "iron-session/next";
import { sessionConfig } from "logic/session";

export default withIronSessionApiRoute(async function selectChild(req, res) {
  req.session.currentChildId = req.body.childId
  await req.session.save();
  return res.status(200).json({success: 'Current child is updated'})
}, sessionConfig);
