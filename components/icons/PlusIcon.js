// import { hover } from "@testing-library/user-event/dist/hover";
import React, { useEffect, useRef } from "react";
import { useState } from "react";

function PlusIcon() {
  const [active, setActive] = useState(true);
  const click = () => {
    setActive(!active);
  };

  return (
    <svg
      width="9"
      height="10"
      viewBox="0 0 9 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.833344 4.99998H8.16668M4.50001 1.33331L4.50001 8.66665"
        stroke="#363853"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

PlusIcon.propTypes = {};

PlusIcon.defaultProps = {};

export default PlusIcon;
