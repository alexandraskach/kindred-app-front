import React, { useEffect, useRef } from "react";
import { useState } from "react";

function CheckListIcon() {
  return (
    <svg
      className="checklist-icon"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.63228 16.3037L2.9021 16.475L3.63228 16.3037ZM3.63228 9.6963L2.9021 9.52502H2.9021L3.63228 9.6963ZM22.3677 9.69631L21.6375 9.86758L22.3677 9.69631ZM22.3677 16.3037L21.6375 16.1324L22.3677 16.3037ZM16.3037 22.3677L16.1324 21.6375L16.3037 22.3677ZM9.6963 22.3677L9.86758 21.6375L9.6963 22.3677ZM9.6963 3.63228L9.86758 4.36246L9.6963 3.63228ZM16.3037 3.63228L16.1324 4.36246L16.3037 3.63228ZM8.459 9.65226C8.16611 9.35937 7.69123 9.35937 7.39834 9.65226C7.10545 9.94516 7.10545 10.42 7.39834 10.7129L8.459 9.65226ZM9.05563 11.3096L8.5253 11.8399C8.81819 12.1328 9.29307 12.1328 9.58596 11.8399L9.05563 11.3096ZM11.8399 9.58596C12.1328 9.29307 12.1328 8.8182 11.8399 8.5253C11.547 8.23241 11.0721 8.23241 10.7792 8.5253L11.8399 9.58596ZM14.127 9.99608C13.7127 9.99608 13.377 10.3319 13.377 10.7461C13.377 11.1603 13.7127 11.4961 14.127 11.4961V9.99608ZM18.0713 11.4961C18.4855 11.4961 18.8213 11.1603 18.8213 10.7461C18.8213 10.3319 18.4855 9.99608 18.0713 9.99608V11.4961ZM8.459 15.2871C8.16611 14.9942 7.69123 14.9942 7.39834 15.2871C7.10545 15.58 7.10545 16.0548 7.39834 16.3477L8.459 15.2871ZM9.05563 16.9444L8.5253 17.4747C8.81819 17.7676 9.29307 17.7676 9.58596 17.4747L9.05563 16.9444ZM11.8399 15.2208C12.1328 14.9279 12.1328 14.453 11.8399 14.1601C11.547 13.8672 11.0721 13.8672 10.7792 14.1601L11.8399 15.2208ZM14.127 15.6309C13.7127 15.6309 13.377 15.9667 13.377 16.3809C13.377 16.7951 13.7127 17.1309 14.127 17.1309V15.6309ZM18.0713 17.1309C18.4855 17.1309 18.8213 16.7951 18.8213 16.3809C18.8213 15.9667 18.4855 15.6309 18.0713 15.6309V17.1309ZM4.36246 16.1324C3.87918 14.0721 3.87918 11.9279 4.36246 9.86758L2.9021 9.52502C2.36597 11.8107 2.36597 14.1893 2.9021 16.475L4.36246 16.1324ZM21.6375 9.86758C22.1208 11.9279 22.1208 14.0721 21.6375 16.1324L23.0979 16.475C23.634 14.1893 23.634 11.8107 23.0979 9.52503L21.6375 9.86758ZM16.1324 21.6375C14.0721 22.1208 11.9279 22.1208 9.86758 21.6375L9.52503 23.0979C11.8107 23.634 14.1893 23.634 16.475 23.0979L16.1324 21.6375ZM9.86758 4.36246C11.9279 3.87918 14.0721 3.87918 16.1324 4.36246L16.475 2.9021C14.1893 2.36597 11.8107 2.36597 9.52503 2.9021L9.86758 4.36246ZM9.86758 21.6375C7.13602 20.9968 5.0032 18.864 4.36246 16.1324L2.9021 16.475C3.67294 19.7612 6.23883 22.3271 9.52503 23.0979L9.86758 21.6375ZM16.475 23.0979C19.7612 22.3271 22.3271 19.7612 23.0979 16.475L21.6375 16.1324C20.9968 18.864 18.864 20.9968 16.1324 21.6375L16.475 23.0979ZM16.1324 4.36246C18.864 5.0032 20.9968 7.13602 21.6375 9.86758L23.0979 9.52503C22.3271 6.23883 19.7612 3.67294 16.475 2.9021L16.1324 4.36246ZM9.52503 2.9021C6.23883 3.67294 3.67294 6.23883 2.9021 9.52502L4.36246 9.86758C5.0032 7.13602 7.13602 5.0032 9.86758 4.36246L9.52503 2.9021ZM7.39834 10.7129L8.5253 11.8399L9.58596 10.7792L8.459 9.65226L7.39834 10.7129ZM9.58596 11.8399L11.8399 9.58596L10.7792 8.5253L8.5253 10.7792L9.58596 11.8399ZM14.127 11.4961H18.0713V9.99608H14.127V11.4961ZM7.39834 16.3477L8.5253 17.4747L9.58596 16.414L8.459 15.2871L7.39834 16.3477ZM9.58596 17.4747L11.8399 15.2208L10.7792 14.1601L8.5253 16.414L9.58596 17.4747ZM14.127 17.1309H18.0713V15.6309H14.127V17.1309Z"
        fill="#000A27"
      />
    </svg>
  );
}

CheckListIcon.propTypes = {};

CheckListIcon.defaultProps = {};

export default CheckListIcon;
