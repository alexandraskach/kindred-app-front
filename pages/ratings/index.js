import { Base } from "components/Base";
import styles from "./ratings.module.scss";
import ReactStars from "react-stars";

const ratingChanged = (newRating) => {
  console.log(newRating);
};

export default function render() {
  return (
    <Base>
      <div id={styles.Ratings} className="mt-8">
        <div className="select-container">
          <select className="select">
            <option> Katie Moum</option>
          </select>
        </div>
        <div className="ratings-title mb-2 mt-2">
          <h3>You can rate this down</h3>
        </div>
        <div className="centered">
          <div className="ratings-container">
            <div className="ratings__mission card mb-2">
              <p>
                Aenean aliquam risus ante, vel auctor lorem vestibulum vitae
              </p>
              <div className="ratings__mission_button button-container">
                <ReactStars
                  className="mb-2"
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                />
                <button className="Button Button--primary">Submit</button>
              </div>
            </div>
            <div className="ratings__mission card mb-2">
              <p>
                Aenean aliquam risus ante, vel auctor lorem vestibulum vitae
              </p>
              <div className="ratings__mission_button button-container">
                <ReactStars
                  className="mb-2"
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                />
                <button className="Button Button--primary">Submit</button>
              </div>
            </div>
            <div className="ratings__mission card mb-2">
              <p>
                Aenean aliquam risus ante, vel auctor lorem vestibulum vitae
              </p>
              <div className="ratings__mission_button button-container">
                <ReactStars
                  className="mb-2"
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                />
                <button className="Button Button--primary">Submit</button>
              </div>
            </div>
          </div>
        </div>
        <div className="ratings-title">
          {" "}
          <h3>Last week</h3>
        </div>
        <div className="centered">
          <div className="ratings-container">
            <div className="ratings__mission card mb-2">
              <p>
                Aenean aliquam risus ante, vel auctor lorem vestibulum vitae
              </p>
              <div className="ratings__mission_button button-container">
                <p>Your rating</p>
                <span data-index="0" data-forhalf="★">
                  ★
                </span>
                <p>Kid's rating</p>
              </div>
            </div>
            <div className="ratings__mission card mb-2">
              <p>
                Aenean aliquam risus ante, vel auctor lorem vestibulum vitae
              </p>
              <div className="ratings__mission_button button-container">
                <p>Your rating</p>
                <p>Kid's rating</p>
              </div>
            </div>
            <div className="ratings__mission card mb-2">
              <p>
                Aenean aliquam risus ante, vel auctor lorem vestibulum vitae
              </p>
              <div className="ratings__mission_button button-container">
                <p>Your rating</p>
                <p>Kid's rating</p>
              </div>
            </div>
          </div>
        </div>
        <div className="ratings-title">
          {" "}
          <h3>Week of May 2</h3>
        </div>
        <div className="centered">
          <div className="ratings-container">
            <div className="ratings__mission card mb-2">
              <p>
                Aenean aliquam risus ante, vel auctor lorem vestibulum vitae
              </p>
              <div className="ratings__mission_button button-container">
                <p>Your rating</p>
                <p>Kid's rating</p>
              </div>
            </div>
            <div className="ratings__mission card mb-2">
              <p>
                Aenean aliquam risus ante, vel auctor lorem vestibulum vitae
              </p>
              <div className="ratings__mission_button button-container">
                <p>Your rating</p>
                <p>Kid's rating</p>
              </div>
            </div>
            <div className="ratings__mission card mb-2">
              <p>
                Aenean aliquam risus ante, vel auctor lorem vestibulum vitae
              </p>
              <div className="ratings__mission_button button-container">
                <p>Your rating</p>
                <p>Kid's rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}

// const Ratings = () => (
//   <div>
//     <Header retour="true"></Header>
//     <div className="select-container">
//       <select className="select">
//         <option> Katie Moum</option>
//       </select>
//     </div>
//     <div className="ratings-title">
//       <h3>You can rate this down</h3>
//     </div>
//     <div className="centered">
//       <div className="ratings-container">
//         <div className="ratings__mission card">
//           <p>Aenean aliquam risus ante, vel auctor lorem vestibulum vitae</p>
//           <div className="ratings__mission_button button-container">
//             <ReactStars
//               count={5}
//               onChange={ratingChanged}
//               size={24}
//               isHalf={true}
//               emptyIcon={<TrashIcon></TrashIcon>}
//               halfIcon={<TrashIcon></TrashIcon>}
//               fullIcon={<TrashIcon></TrashIcon>}
//               activeColor="#ffd700"
//             />
//             <button className="button-primary">Submit</button>
//           </div>
//         </div>
//         <div className="ratings__mission card">
//           <p>Aenean aliquam risus ante, vel auctor lorem vestibulum vitae</p>
//           <div className="ratings__mission_button button-container">
//             <ReactStars
//               count={5}
//               onChange={ratingChanged}
//               size={24}
//               isHalf={true}
//               emptyIcon={<TrashIcon></TrashIcon>}
//               halfIcon={<TrashIcon></TrashIcon>}
//               fullIcon={<TrashIcon></TrashIcon>}
//               activeColor="#ffd700"
//             />
//             <button className="button-primary">Submit</button>
//           </div>
//         </div>
//         <div className="ratings__mission card">
//           <p>Aenean aliquam risus ante, vel auctor lorem vestibulum vitae</p>
//           <div className="ratings__mission_button button-container">
//             <ReactStars
//               count={5}
//               onChange={ratingChanged}
//               size={24}
//               isHalf={true}
//               emptyIcon={<TrashIcon></TrashIcon>}
//               halfIcon={<TrashIcon></TrashIcon>}
//               fullIcon={<TrashIcon></TrashIcon>}
//               activeColor="#ffd700"
//             />
//             <button className="button-primary">Submit</button>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="ratings-title">
//       {" "}
//       <h3>Last week</h3>
//     </div>
//     <div className="centered">
//       <div className="ratings-container">
//         <div className="ratings__mission card">
//           <p>Aenean aliquam risus ante, vel auctor lorem vestibulum vitae</p>
//           <div className="ratings__mission_button button-container">
//             <p>Your rating</p>
//             <p>Kid's rating</p>
//           </div>
//         </div>
//         <div className="ratings__mission card">
//           <p>Aenean aliquam risus ante, vel auctor lorem vestibulum vitae</p>
//           <div className="ratings__mission_button button-container">
//             <p>Your rating</p>
//             <p>Kid's rating</p>
//           </div>
//         </div>
//         <div className="ratings__mission card">
//           <p>Aenean aliquam risus ante, vel auctor lorem vestibulum vitae</p>
//           <div className="ratings__mission_button button-container">
//             <p>Your rating</p>
//             <p>Kid's rating</p>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="ratings-title">
//       {" "}
//       <h3>Week of May 2</h3>
//     </div>
//     <div className="centered">
//       <div className="ratings-container">
//         <div className="ratings__mission card">
//           <p>Aenean aliquam risus ante, vel auctor lorem vestibulum vitae</p>
//           <div className="ratings__mission_button button-container">
//             <p>Your rating</p>
//             <p>Kid's rating</p>
//           </div>
//         </div>
//         <div className="ratings__mission card">
//           <p>Aenean aliquam risus ante, vel auctor lorem vestibulum vitae</p>
//           <div className="ratings__mission_button button-container">
//             <p>Your rating</p>
//             <p>Kid's rating</p>
//           </div>
//         </div>
//         <div className="ratings__mission card">
//           <p>Aenean aliquam risus ante, vel auctor lorem vestibulum vitae</p>
//           <div className="ratings__mission_button button-container">
//             <p>Your rating</p>
//             <p>Kid's rating</p>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="navbar">
//       <Navbar></Navbar>
//     </div>
//   </div>
// );

// Ratings.propTypes = {};

// Ratings.defaultProps = {};

// export default Ratings;