import React from "react";

export default function Dj({
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
        d="M16 5.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H19v7a.5.5 0 01-.146.354l-3 3a.5.5 0 01-.708-.708L18 14.793V8h-1.5a.5.5 0 01-.5-.5v-2zM19 7h-2V6h2v1zm-9 0a5 5 0 100 10 5 5 0 000-10zm-3.333.011a6 6 0 116.667 9.978A6 6 0 016.667 7.01zM10 11a1 1 0 100 2.001A1 1 0 0010 11zm-1.111-.663a2 2 0 112.222 3.325 2 2 0 01-2.222-3.325z"
        fill={color}
      ></path>
    </svg>
  );
}
