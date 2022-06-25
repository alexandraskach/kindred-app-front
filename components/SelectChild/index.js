import ChevronTop from "components/icons/ChevronTop";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";
import Router from "next/router";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(context) {
    if (!context.req.session.user) {
      return { redirect: { destination: "/login" } };
    }
    return { props: context.req.session };
  },
  sessionConfig
);

export function toggle(select) {
  const others = select.querySelector(".SelectChild__others");
  const container = select.querySelector(".SelectChild__others__container");
  const containerWidth = container.clientHeight;

  select.classList.toggle("show");
  others.style.height = select.classList.contains("show")
    ? containerWidth + "px"
    : "0px";
}

export async function handleClick(childId) {
  console.log("childId", childId);
  let response = await fetch("/api/select-child", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: childId,
  });
  const json = await response.json().then(() => {
    // const router = useRouter();
    // router.reload(window.location.pathname);
    Router.reload();
  });
  console.log("response /api/select-child", json);
}

export default function SelectChild(childs) {
  console.log("childs SelectChild", childs);

  return (
    <div className="SelectChild">
      <div
        className="SelectChild__current"
        onClick={(e) => toggle(e.target.parentNode)}
      >
        <div className="SelectChild__current__informations">
          <span className="mt-1 mb-1 ml-1">Select child</span>
        </div>
        <ChevronTop />
      </div>
      <div className="SelectChild__others">
        <div className="SelectChild__others__container">
          {childs.childs.map((child) => (
            <div
              onClick={(e) => handleClick(child.id)}
              key={child.id}
              className="SelectChild__others__container__item"
            >
              <img src="" />
              <span>
                {child.firstName} {child.lastName}
              </span>
            </div>
          ))}

          {/*         
              <div className="SelectChild__others__container__item">
               <img src="" />
               <span>Lorem ipsum</span>
             </div> */}
        </div>
      </div>
    </div>
  );
}
