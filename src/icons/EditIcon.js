import React, { useEffect, useRef } from "react";
import { useState } from "react";

function EditIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.25 10.9921C15.129 11.6991 12.3009 8.87105 13.0079 6.75M13.8793 5.87857L9.30971 10.4482C7.3231 12.4348 5.91376 14.924 5.23236 17.6496L5.01156 18.5328C4.94276 18.808 5.19204 19.0572 5.46723 18.9884L6.35044 18.7676C9.07604 18.0862 11.5652 16.6769 13.5518 14.6903L18.1214 10.1207C18.684 9.55813 19 8.79516 19 7.99962C19 6.34297 17.657 5 16.0004 5C15.2048 5 14.4419 5.31603 13.8793 5.87857Z"
        stroke="#363853"
        stroke-width="1.5"
      />
    </svg>
  );
}

EditIcon.propTypes = {};

EditIcon.defaultProps = {};

export default EditIcon;
