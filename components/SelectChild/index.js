import ChevronTop from "components/icons/ChevronTop";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";
import { useRouter } from "next/router";

// export const getServerSideProps = withIronSessionSsr(
//   async function getServerSideProps(context) {
//     if (!context.req.session.user) {
//       return { redirect: { destination: "/login" } };
//     }
//     return { props: context.req.session };
//   },
//   sessionConfig
// )

export function toggle(select) {
  if (!select.classList.contains('SelectChild')) select = select.closest('.SelectChild')
  if (select.classList.contains('SelectChild--once')) return

  const others = select.querySelector(".SelectChild__others");
  const container = select.querySelector(".SelectChild__others__container");

  if (!others) return

  const containerWidth = container.clientHeight;

  select.classList.toggle("show");
  others.style.height = select.classList.contains("show") ? containerWidth + "px" : "0px"
}

export async function handleClick(childId, router) {
  let response = await fetch("/api/select-child", {
    method: "POST",
    headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
    body: JSON.stringify({ childId })
  })
  
  console.log(await response.json())
  
  if (response.status == 200) {
    console.log('refresh')
    router.replace(router.asPath)
  }
}

export default function SelectChild(props) {
  const router = useRouter()

  // console.log(props)

  return (
    <div className={props.children.length == 1 ? 'SelectChild SelectChild--once' : 'SelectChild'}>
    {/* <div className={'SelectChild'}> */}
      <div className="SelectChild__current" onClick={(e) => toggle(e.target.parentNode)}>
        <div className="SelectChild__current__informations">
          { props.currentChild && (
            <div className="d-flex align-items-center">
              <div className="Picture Picture--letter mr-1">{props.currentChild.firstName.split('')[0]}</div>
              <span>
                {props.currentChild.firstName} {props.currentChild.lastName}
              </span>
            </div>
          ) }
          { !props.currentChild && (
            <span className="mt-1 mb-1 ml-1">Select child</span>
          ) }
        </div>
        <ChevronTop />
      </div>
      {props.children.length !== 1 && props.children[0].id != props.currentChildId && (
        <div className="SelectChild__others">
          <div className="SelectChild__others__container">
            { props.children.map((child) => {
              return child.id != props.currentChild?.id ? (
                <div onClick={(e) => handleClick(child.id, router)} key={child.id} className="SelectChild__others__container__item">
                  <div className="Picture Picture--letter mr-1">{child.firstName.split('')[0]}</div>
                  <span>
                    {child.firstName} {child.lastName}
                  </span>
                </div>
              ) : null
            })}
          </div>
        </div>
      )}
    </div>
  )
}
