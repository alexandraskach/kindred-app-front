import React from "react";
import PropTypes from "prop-types";
import "./Header.scss";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";

function Header(props) {
  const isReturnButton = props.retour;
  return (
    <div className="header">
      <div>
        <span className="logo">Kindred</span>
      </div>
      <div>
        {isReturnButton ? (
          <button className="header__button">
            <span className="header__button_icon">
              <ArrowLeftIcon></ArrowLeftIcon>
            </span>
            Go back
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
