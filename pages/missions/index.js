// import React from "react";
// import PropTypes from "prop-types";
// import "./Missions.scss";
// import Navbar from "../navbar/navbar";
// import Header from "../Header/Header";
import { Base } from "components/Base";
import Navbar from "components/navbar/Navbar";
import styles from "./missions.module.scss";

export default function render() {
  return (
    <Base>
      <div id={styles.Missions} className="mt-8">
        {/* <Header retour="true"></Header> */}
        <div className="wrapper">
          <div className="select-container mb-2">
            <select className="select">
              <option> Katie Moum</option>
            </select>
          </div>
          <div className="missions-container">
            <h3>Missions</h3>
            <button className="Button Button--outline"> Add mission</button>
            <div className="card mb-2">
              <p className="mission__title body-semibold">
                Do the dishes on Thursday evenings
              </p>
              <p className="mission__date small">
                wednesday, thursday until january 02 2023
              </p>
              <div>
                <p className="mission__description">
                  Vestibulum ante ipsum primis in faucibus orci luctus et
                  ultrices posuere cubilia curae; Ut tellus tortor, tristique
                  quis velit at, semper laoreet ex.
                </p>
              </div>
            </div>
            <div className="card mb-2">
              <p className="mission__title body-semibold">
                Do the dishes on Thursday evenings
              </p>
              <p className="mission__date small">
                wednesday, thursday until january 02 2023
              </p>
              <div>
                <p className="mission__description">
                  Vestibulum ante ipsum primis in faucibus orci luctus et
                  ultrices posuere cubilia curae; Ut tellus tortor, tristique
                  quis velit at, semper laoreet ex.
                </p>
              </div>
            </div>
            <div className="card mb-2">
              <p className="mission__title body-semibold">
                Do the dishes on Thursday evenings
              </p>
              <p className="mission__date small">
                wednesday, thursday until january 02 2023
              </p>
              <div>
                <p className="mission__description">
                  Vestibulum ante ipsum primis in faucibus orci luctus et
                  ultrices posuere cubilia curae; Ut tellus tortor, tristique
                  quis velit at, semper laoreet ex.
                </p>
              </div>
            </div>
          </div>

          <div className="nav">
            <Navbar></Navbar>
          </div>
        </div>
      </div>
    </Base>
  );
}

// const Missions = () => (
//   <div>
//     <Header retour="true"></Header>
//     <div className="wrapper">
//       <div className="select-container">
//         <select className="select">
//           <option> Katie Moum</option>
//         </select>
//       </div>
//       <div className="missions-container">
//         <h3>Missions</h3>
//         <button className="button-outline"> Add mission</button>
//         <div className="card">
//           <p className="mission__title">Do the dishes on Thursday evenings</p>
//           <p className="mission__date">
//             wednesday, thursday until january 02 2023
//           </p>
//           <div>
//             <p className="mission__description">
//               Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
//               posuere cubilia curae; Ut tellus tortor, tristique quis velit at,
//               semper laoreet ex.
//             </p>
//           </div>
//         </div>
//         <div className="card">
//           <p className="mission__title">Do the dishes on Thursday evenings</p>
//           <p className="mission__date">
//             wednesday, thursday until january 02 2023
//           </p>
//           <div>
//             <p className="mission__description">
//               Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
//               posuere cubilia curae; Ut tellus tortor, tristique quis velit at,
//               semper laoreet ex.
//             </p>
//           </div>
//         </div>
//         <div className="card">
//           <p className="mission__title">Do the dishes on Thursday evenings</p>
//           <p className="mission__date">
//             wednesday, thursday until january 02 2023
//           </p>
//           <div>
//             <p className="mission__description">
//               Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
//               posuere cubilia curae; Ut tellus tortor, tristique quis velit at,
//               semper laoreet ex.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="navbar">
//         <Navbar></Navbar>
//       </div>
//     </div>
//   </div>
// );

// Missions.propTypes = {};

// Missions.defaultProps = {};

// export default Missions;
