import { useState } from "react";
import Link from "next/link";
import { Base } from "components/Base";
import SelectChild from "components/SelectChild";
import redirectToAuth from "components/redirectToAuth";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";
import { useRouter } from "next/router";
import getChildren from "components/getChildren";
import getWallet from "components/getWallet";
import getCurrentChild from "components/getCurrentChild";
import getData from "components/getData";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(context) {
    const props = context.req.session;

    if (await redirectToAuth(props)) {
      return { redirect: { destination: "/login" } };
    }

    props.user = await getData(props.token, '/api/users/' + props.userId);
    props.children = await getChildren(props);
    props.currentChild = await getCurrentChild(props);

    if (props.isParent && props.currentChild) {
      props.wallet = await getWallet(props);
      props.contract = await getData(
        props.token,
        props.currentChild.childContract
      )
      props.missions = await getData(
        props.token,
        `/api/contracts/${props.contract.id}/missions`
      );
    } else {
      props.contract = await getData(props.token, props.user.childContract)
      props.wallet = await getData(props.token, props.user.wallet);
      props.missions = await getData(props.token, `/api/contracts/${props.contract.id}/missions`);
    }
    props.ratings = await getData(props.token, `/api/contracts/${props.contract.id}/ratings`)
    return { props };
  },
  sessionConfig
);

const hasRatings = (ratings, isParent) => {
  let hasRating = false
  
  ratings.forEach((rating) => {
    if (isParent) if (!rating.parentRating) hasRating = true
    if (!isParent) if (!rating.childrating) hasRating = true
  })

  return hasRating
};

function isSameDate(date1, date2) {
  return (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate())
}

export default function render(props) {
  let needRating = false

  // is current week
  props.ratings.map(rating => {
    let currentDate = new Date(),
      ratingDate = new Date(rating.week)
      currentDate.setDate(currentDate.getDate() - (6 - (6 - currentDate.getDay())))
      ratingDate.setDate(ratingDate.getDate() - (6 - (6 - ratingDate.getDay())))

      rating.isCurrentWeek = isSameDate(currentDate, ratingDate)
  })

  // set ratings in missions
  props.missions.map(mission => {
    mission.ratings = []
    mission.isRated = false
    mission.hasRating = false

    props.ratings.map(rating => {
      if (mission.id == rating.mission.replace('/api/missions/', '')) {
        mission.ratings.push(rating)

        if (rating.isCurrentWeek) {
          if (props.isParent && rating.parentRating == undefined) needRating = true
          if (!props.isParent && !rating.childRating == undefined) needRating = true
        }
      }
    })
  })

  console.log(needRating)

  if (props.setDefaultChild) {
    let response = fetch("/api/select-child", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ childId: props.currentChild.id }),
    });
  }
  
  return (
    <>
      <h2 className="mb-3">Dashboard</h2>
      {!props.user.parent && (
        <SelectChild
          children={props.children}
          currentChild={props.currentChild}
        />
      )}
      <>
        {needRating ? (
          <Link href="/ratings">
            <button className="Button Button--big Button--primary mb-2">
              Rate new missions
            </button>
          </Link>
        ) : null}

        <div className="Card">
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="h1 m-0">{props.wallet.points} kint</span>
              {/* <span>{props.wallet.points * props.contract.ratioMoney}€</span> */}
            </div>
            <div className="color-success">38 missions accomplished</div>
          </div>
          <div>
            <Link href="/missions">
              <a className="Button Button--tertiary">View missions</a>
            </Link>
            {props.isParent && (
              <Link href="/missions/add">
                <a className="Button">Add mission</a>
              </Link>
            )}
          </div>
        </div>

        <div className="Card">
          <div className="h1 m-0">{props.contract.pointBonus} points</div>
          <div>
            <Link href="/rewards">
              <a className="Button Button--tertiary">View rewards</a>
            </Link>
            {props.isParent && (
              <Link href="/rewards/add-reward">
                <a className="Button">Add reward</a>
              </Link>
            )}
          </div>
        </div>
      </>
    </>
  );
}
