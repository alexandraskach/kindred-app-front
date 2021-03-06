import React, { useEffect, useRef } from "react";
import { useState } from "react";

function ArrowLeftIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 12L6.5 12M6.5 12L11.0882 16M6.5 12L11.0882 8"
        stroke="#000A27"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

ArrowLeftIcon.propTypes = {};

ArrowLeftIcon.defaultProps = {};

export default ArrowLeftIcon;
