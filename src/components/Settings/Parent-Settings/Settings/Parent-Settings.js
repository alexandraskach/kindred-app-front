import React from 'react';
import PropTypes from 'prop-types';
import './Settings/Parent-Settings.scss';

function ParentSettings({fromNotFound}) {
  return (
    <div className=''>
      <div className='title'>Kindred</div>
      <div className='container'>
        <img className='profile-picture'/>
        <span className='profile-name'>Robert godwin</span>
        <span className='profile-status'>Parent</span>
      </div>
      <div>
        <span className='profile-email'>robertgodwin@mail.com</span>

      </div>
      <div>
        <span className='profile-birthdate'>february 20th 1972</span>
      </div>
      <input type={button} className='logout-button'>logout</input>
      <a>Delete your account</a>
    </div>
  )
}

ParentSettings.propTypes = {};

ParentSettings.defaultProps = {};

export default ParentSettings;
