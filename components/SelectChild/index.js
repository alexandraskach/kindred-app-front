import ChevronTop from "components/icons/ChevronTop";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";
import { useRouter } from "next/router";

export function toggle(select) {
  if (!select.classList.contains("SelectChild"))
    select = select.closest(".SelectChild");
  if (select.classList.contains("SelectChild--once")) return;

  const others = select.querySelector(".SelectChild__others");
  const container = select.querySelector(".SelectChild__others__container");

  if (!others) return;

  const containerWidth = container.clientHeight;

  select.classList.toggle("show");
  others.style.height = select.classList.contains("show")
    ? containerWidth + "px"
    : "0px";
}

export async function handleClick(childId, router, target) {
  let response = await fetch("/api/select-child", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ childId }),
  });

  console.log(await response.json());

  if (response.status == 200) {
    console.log("refresh");
    toggle(target.closest(".SelectChild"));
    router.replace(router.asPath);
  }
}

export default function SelectChild({ children, currentChild }) {
  const router = useRouter();
  let displayOthers = true;
  // if (currentChild === null) {
  //   currentChild = {
  //     id: children[0].id,
  //     firstName: children[0].firstName,
  //     lastName: children[0].lastName,
  //   };
  // }

  if (children.length == 1 && children[0].id == currentChild?.id)
    displayOthers = false;

  return (
    <div
      className={
        displayOthers ? "SelectChild" : "SelectChild SelectChild--once"
      }
    >
      {/* <div className={'SelectChild'}> */}
      <div
        className="SelectChild__current"
        onClick={(e) => toggle(e.target.parentNode)}
      >
        <div className="SelectChild__current__informations">
          {currentChild && (
            <div className="d-flex align-items-center">
              <div className="Picture Picture--letter mr-1">
                {currentChild.firstName.split("")[0]}
              </div>
              <span>
                {currentChild.firstName} {currentChild.lastName}
              </span>
            </div>
          )}
          {!currentChild && (
            <span className="mt-1 mb-1 ml-1">Select child</span>
          )}
        </div>
        <ChevronTop />
      </div>
      {displayOthers && (
        <div className="SelectChild__others">
          <div className="SelectChild__others__container">
            {children.map((child) => {
              return child.id != currentChild?.id ? (
                <div
                  onClick={(e) => handleClick(child.id, router, e.target)}
                  key={child.id}
                  className="SelectChild__others__container__item"
                >
                  <div className="Picture Picture--letter mr-1">
                    {child.firstName.split("")[0]}
                  </div>
                  <span>
                    {child.firstName} {child.lastName}
                  </span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
