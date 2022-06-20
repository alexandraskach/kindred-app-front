import React from "react";
import PropTypes from "prop-types";
import "./Ratings.scss";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import ReactStars from "react-rating-stars-component";
import TrashIcon from "../../icons/TrashIcon";

const ratingChanged = (newRating) => {
  console.log(newRating);
};

const Ratings = () => (
  <div>
    <Header retour="true"></Header>
    <div className="select-container">
      <select className="select">
        <option> Katie Moum</option>
      </select>
    </div>
    <div className="ratings-title">
      <h3>You can rate this down</h3>
    </div>
    <div className="centered">
      <div className="ratings-container">
        <div className="ratings__mission card">
          <p>Aenean aliquam risus ante, vel auctor lorem vestibulum vitae</p>
          <div className="ratings__mission_button button-container">
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              isHalf={true}
              emptyIcon={<TrashIcon></TrashIcon>}
              halfIcon={<TrashIcon></TrashIcon>}
              fullIcon={<TrashIcon></TrashIcon>}
              activeColor="#ffd700"
            />
            <button className="button-primary">Submit</button>
          </div>
        </div>
        <div className="ratings__mission card">
          <p>Aenean aliquam risus ante, vel auctor lorem vestibulum vitae</p>
          <div className="ratings__mission_button button-container">
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              isHalf={true}
              emptyIcon={<TrashIcon></TrashIcon>}
              halfIcon={<TrashIcon></TrashIcon>}
              fullIcon={<TrashIcon></TrashIcon>}
              activeColor="#ffd700"
            />
            <button className="button-primary">Submit</button>
          </div>
        </div>
        <div className="ratings__mission card">
          <p>Aenean aliquam risus ante, vel auctor lorem vestibulum vitae</p>
          <div className="ratings__mission_button button-container">
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              isHalf={true}
              emptyIcon={<TrashIcon></TrashIcon>}
              halfIcon={<TrashIcon></TrashIcon>}
              fullIcon={<TrashIcon></TrashIcon>}
              activeColor="#ffd700"
            />
            <button className="button-primary">Submit</button>
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
        <div className="ratings__mission card">
          <p>Aenean aliquam risus ante, vel auctor lorem vestibulum vitae</p>
          <div className="ratings__mission_button button-container">
            <p>Your rating</p>
            <p>Kid's rating</p>
          </div>
        </div>
        <div className="ratings__mission card">
          <p>Aenean aliquam risus ante, vel auctor lorem vestibulum vitae</p>
          <div className="ratings__mission_button button-container">
            <p>Your rating</p>
            <p>Kid's rating</p>
          </div>
        </div>
        <div className="ratings__mission card">
          <p>Aenean aliquam risus ante, vel auctor lorem vestibulum vitae</p>
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
        <div className="ratings__mission card">
          <p>Aenean aliquam risus ante, vel auctor lorem vestibulum vitae</p>
          <div className="ratings__mission_button button-container">
            <p>Your rating</p>
            <p>Kid's rating</p>
          </div>
        </div>
        <div className="ratings__mission card">
          <p>Aenean aliquam risus ante, vel auctor lorem vestibulum vitae</p>
          <div className="ratings__mission_button button-container">
            <p>Your rating</p>
            <p>Kid's rating</p>
          </div>
        </div>
        <div className="ratings__mission card">
          <p>Aenean aliquam risus ante, vel auctor lorem vestibulum vitae</p>
          <div className="ratings__mission_button button-container">
            <p>Your rating</p>
            <p>Kid's rating</p>
          </div>
        </div>
      </div>
    </div>
    <div className="navbar">
      <Navbar></Navbar>
    </div>
  </div>
);

Ratings.propTypes = {};

Ratings.defaultProps = {};

export default Ratings;
