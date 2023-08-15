import React from "react";

export default function Art({
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
        d="M8 17.5a.5.5 0 100-1 .5.5 0 000 1zM8 7.5a.5.5 0 100-1 .5.5 0 000 1zM11.5 16a.5.5 0 100-1 .5.5 0 000 1zM13 12.5a.5.5 0 100-1 .5.5 0 000 1zM11.5 9a.5.5 0 100-1 .5.5 0 000 1z"
        fill={color}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M8.156 4.5C5.394 4.5 3 5.906 3 7.781 3 10.125 5.5 9.656 5.5 12c0 2.344-2.5 1.875-2.5 4.219C3 18.094 5.394 19.5 8.156 19.5a7.501 7.501 0 000-15v0z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      ></path>
      <path
        d="M18 16a1.47 1.47 0 011.5-1.5s1.5 0 1.5 2-1 3.5-2 3.5c1-2.5-1-2.5-1-4z"
        fill={color}
      ></path>
      <path
        d="M18.5 5.5a1 1 0 012 0v8a1 1 0 11-2 0v-8z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      ></path>
    </svg>
  );
}
