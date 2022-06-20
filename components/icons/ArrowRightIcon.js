import React, { useEffect, useRef } from "react";
import { useState } from "react";

function ArrowRightIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.3464 7.50716C12.6186 7.19494 13.0924 7.16249 13.4046 7.43468L17.9929 11.4347C18.1562 11.5771 18.25 11.7833 18.25 12C18.25 12.2168 18.1562 12.4229 17.9929 12.5653L13.4046 16.5653C13.0924 16.8375 12.6186 16.8051 12.3464 16.4929C12.0742 16.1806 12.1067 15.7069 12.4189 15.4347L15.4984 12.75H6.5C6.08579 12.75 5.75 12.4142 5.75 12C5.75 11.5858 6.08579 11.25 6.5 11.25H15.4984L12.4189 8.56534C12.1067 8.29315 12.0742 7.81938 12.3464 7.50716Z"
        fill="#363853"
      />
    </svg>
  );
}

ArrowRightIcon.propTypes = {};

ArrowRightIcon.defaultProps = {};

export default ArrowRightIcon;
