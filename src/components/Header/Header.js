import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';

function Header(props) {
  const isReturnButton = props.retour
  return (
    <div>
      <div className='title'>
        Kindred {props.retour}
      </div>
      {isReturnButton ? (
        <>
          Go back
        </>
      ) : (
        ""
      )}
    </div>
  )
}

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
