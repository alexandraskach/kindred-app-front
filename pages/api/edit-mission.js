import { withIronSessionApiRoute } from "iron-session/next";
import { sessionConfig } from "logic/session";

export default withIronSessionApiRoute(async function editMission(req, res) {
  let response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/missions",
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + req.session.token,
      },
      body: JSON.stringify(req.body),
    }
  );
  let result = await response.json();
  console.log("result update mission", result);
  if (result) {
    return res.status(200).json(result);
  }
}, sessionConfig);
