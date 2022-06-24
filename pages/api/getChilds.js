import { withIronSessionApiRoute } from "iron-session/next";
import { sessionConfig } from "logic/session";

// export default withIronSessionApiRoute(async function getChilds(req, res) {
//   // req.session.user.childs.forEach((child) => {
//   let childs = [];
//   let response = await fetch(
//     process.env.NEXT_PUBLIC_API_URL +
//       `/api/users/${req.session.user.id}/childs`,
//     {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + req.session.token,
//       },
//     }
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       // setIsLoading(false);
//       console.log("data", data);
//       data = childs;
//       // childs.push(data);
//     });
//   // });
//   // console.log(data);
//   // let childs = await response.json();
//   return childs;
// }, sessionConfig);
