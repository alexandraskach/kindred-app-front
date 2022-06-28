import { Base } from "components/Base";
import styles from "./ratings.module.scss";
import ReactStars from "react-stars";
import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "logic/session";
import SelectChild from "components/SelectChild";
import { useRouter } from "next/router";
import redirectToAuth from "components/redirectToAuth";
import getChildren from "components/getChildren";
import getData from "components/getData";
import { useState } from "react";
import Link from "next/link";
import EditIcon from "components/icons/EditIcon";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(context) {
    const props = context.req.session;

    if (await redirectToAuth(props)) {
      return { redirect: { destination: "/login" } };
    }
    props.children = await getChildren(props);
    props.currentChild = await getData(
      props.token,
      "/api/users/" + props.currentChildId
    );
    props.contract = await getData(
      props.token,
      props.currentChild.childContract
    );

    props.ratings = await getData(
      props.token,
      `/api/contracts/${props.contract.id}/ratings`
    );
    let responseMissions;
    responseMissions = await fetch(
      process.env.NEXT_PUBLIC_API_URL +
        `/api/contracts/${props.contract.id}/missions`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
        },
      }
    );

    let missions = await responseMissions.json();
    props.currentChild.missions = missions;
    return { props };
  },
  sessionConfig
);

function getMondayOfCurrentWeek(today) {
  const first = today.getDate() - today.getDay() + 1;
  const monday = new Date(today.setDate(first));
  console.log("monday", monday);
  return monday;
}
export async function newRating(missionId, parentRating, contractId) {
  console.log("missionId", missionId);
  console.log("parentRating", parentRating);
  const data = {
    parentRating: parentRating,
    week: getMondayOfCurrentWeek(new Date()),
    mission: `api/missions/${missionId}`,
    contract: `api/contracts/${contractId}`,
  };
  const response = await fetch("/api/add-rating", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  console.log(json);
}

const dateToText = (d) => {
  let monthTexts = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ],
    date = new Date(d),
    dayText =
      date.getDate().toString().length == 1
        ? "0" + date.getDate()
        : date.getDate(),
    monthText = monthTexts[date.getMonth() - 1];

  return dayText + " " + monthText + " " + date.getFullYear();
};

function getRatingsOfLastWeek(ratings) {
  let thisWeek = getMondayOfCurrentWeek(new Date());
  thisWeek = thisWeek.toISOString().split("T")[0];
  console.log(thisWeek);
  return ratings.filter((rating) => {
    return rating.week < thisWeek;
  });
}

export default function render(props) {
  console.log("props", props);
  const ratingsOfLastWeek = getRatingsOfLastWeek(props.ratings);
  console.log("ratingsOfLastWeek", ratingsOfLastWeek);
  const ratingChanged = (newRating) => {
    props.user.newRating = newRating;
  };
  return (
    <Base>
      <div id={styles.Ratings} className="mt-8">
        <div className="select-container">
          <SelectChild
            children={props.children}
            currentChild={props.currentChild}
          ></SelectChild>
        </div>
        <div className="ratings-title mb-2 mt-2">
          <h3>You can rate this down</h3>
        </div>
        <div className="centered">
          <div className="ratings-container">
            {props.currentChild.missions.map((mission) => {
              // si la mission n'a pas de note on affiche la liste des mission à noter
              if (mission.ratings.length < 1)
                return (
                  <div key={mission.id} className="ratings__mission card mb-2">
                    <p className="body-semibold">{mission.title}</p>
                    <div>
                      <p>Start date : {dateToText(mission.start)}</p>
                      <p>End date : {dateToText(mission.end)}</p>
                      <p>Points : {mission.points}</p>
                    </div>
                    <div className="ratings__mission_button button-container">
                      <ReactStars
                        className="mb-2 ml-1"
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#f2c84b"
                      />
                      <button
                        onClick={() =>
                          newRating(
                            mission.id,
                            props.user.newRating,
                            props.contract.id
                          )
                        }
                        className="Button Button--primary"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
        <div className="ratings-title">
          {" "}
          <h3>Last week</h3>
        </div>

        <div className="ratings-container">
          {ratingsOfLastWeek.length === 0 ? (
            <p>There is no ratings of last week</p>
          ) : (
            ratingsOfLastWeek.map((rating) => {
              return (
                <div key={rating.id} className="ratings__mission Card mb-2">
                  <p className="body-semibold">
                    Mission title
                    <Link
                      href={{
                        pathname: "/ratings/edit-rating",
                        query: {
                          idRating: rating.id,
                        },
                      }}
                    >
                      <span style={{ float: "right" }} className="ml-2">
                        <EditIcon></EditIcon>
                      </span>
                    </Link>
                  </p>
                  <div className="ratings__mission_button button-container">
                    <p>Your rating : {rating.parentRating}/5</p>
                    <p>
                      Kid's rating :{" "}
                      {rating.childRating
                        ? `${rating.childRating}/5`
                        : "There is no rating yet"}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="ratings-title">
          {" "}
          <h3>All ratings completed</h3>
        </div>

        <div className="ratings-container">
          {props.ratings.map((rating) => {
            return (
              <div key={rating.id} className="ratings__mission Card mb-2">
                <p className="body-semibold">
                  Mission title
                  <Link
                    href={{
                      pathname: "/ratings/edit-rating",
                      query: {
                        idRating: rating.id,
                      },
                    }}
                  >
                    <span style={{ float: "right" }} className="ml-2">
                      <EditIcon></EditIcon>
                    </span>
                  </Link>
                </p>
                <div className="ratings__mission_button button-container">
                  <p>Your rating : {rating.parentRating}/5</p>
                  <p>
                    Kid's rating :{" "}
                    {rating.childRating
                      ? `${rating.childRating}/5`
                      : "There is no rating yet"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
