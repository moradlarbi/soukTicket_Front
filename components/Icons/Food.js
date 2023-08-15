import React from "react";

export default function Food({
  size = 30, // or any default size of your choice
  color = "white", // or any color of your choice
}) {
  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: { size }, height: { size } }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.5 4a.5.5 0 01.5.5V10a1 1 0 001 1V4.5a.5.5 0 011 0V11a1 1 0 001-1V4.5a.5.5 0 011 0V10a2 2 0 01-2 2v7.5a.5.5 0 01-1 0V12a2 2 0 01-2-2V4.5a.5.5 0 01.5-.5zm8 .5A.5.5 0 0115 4h.5A2.5 2.5 0 0118 6.5v5a2.5 2.5 0 01-2.5 2.5v5.5a.5.5 0 01-1 0v-15zm1 .5v8a1.5 1.5 0 001.5-1.5v-5A1.5 1.5 0 0015.5 5z"
      ></path>
    </svg>
  );
}
