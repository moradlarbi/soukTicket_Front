import React from "react";

export default function Film({
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
        d="M7.453 6H4.5a.5.5 0 00-.5.5v11a.5.5 0 00.5.5h15a.5.5 0 00.5-.5v-11a.5.5 0 00-.5-.5h-2.953a.508.508 0 00-.094 0H7.547a.507.507 0 00-.094 0zM16 7H8v4.5h8V7zm1 0v1.5h2V7h-2zm2 2.5h-2v2h2v-2zm0 3h-2v2h2v-2zm0 3h-2V17h2v-1.5zM16 17v-4.5H8V17h8zm-9 0v-1.5H5V17h2zm-2-2.5h2v-2H5v2zm0-3h2v-2H5v2zm0-3h2V7H5v1.5z"
      ></path>
    </svg>
  );
}
