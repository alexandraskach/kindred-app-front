import React from "react";
import PropTypes from "prop-types";
import "./Navbar.scss";
import PiggyBankIcon from "../../icons/PiggyBankIcon";
import CheckListIcon from "../../icons/CheckListIcon";
import MenuIcon from "../../icons/MenuIcon";

const Navbar = () => (
  <div className="nav">
    <div className="nav__item">
      <CheckListIcon></CheckListIcon>
      <span className="nav__item_text">Missions</span>
    </div>
    <div className="nav__item">
      <MenuIcon></MenuIcon>
      <span className="nav__item_text">Dashboard</span>
    </div>
    <div className="nav__item">
      <PiggyBankIcon></PiggyBankIcon>
      <span className="nav__item_text">Piggybank</span>
    </div>
  </div>
);

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;
