import ChevronTop from "components/icons/ChevronTop";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";

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

export default function SelectChild(childs) {
  console.log("childs SelectChild", childs);
  const children = [{ id: 1, firstName: "ff", lastName: "toto" }];
  return (
    <div className="SelectChild">
      <div
        className="SelectChild__current"
        onClick={(e) => toggle(e.target.parentNode)}
      >
        <div className="SelectChild__current__informations">
          <img src="" />
          <span>Lorem ipsum</span>
        </div>
        <ChevronTop />
      </div>
      <div className="SelectChild__others">
        <div className="SelectChild__others__container">
          {childs.childs.map((child) => (
            <div
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
