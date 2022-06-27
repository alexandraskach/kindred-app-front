import { withIronSessionApiRoute } from "iron-session/next";
import { sessionConfig } from "logic/session";

export default withIronSessionApiRoute(async function deleteReward(req, res) {
  console.log("req.body deleteReward", req.body);
  let response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/api/rewards/${req.body}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + req.session.token,
      },
    }
  );
  let result = await response.json();
  console.log("result delete reward", result);
  if (result) {
    return res.status(200).json(result);
  }
}, sessionConfig);
