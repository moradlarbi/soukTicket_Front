import React from "react";

export default function Social({
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
        d="M4 5.5a.5.5 0 01.5-.5h10a.5.5 0 01.5.5v8a.5.5 0 01-.5.5h-3.857l-3.878 2.424A.5.5 0 016 16v-2H4.5a.5.5 0 01-.5-.5v-8zM5 6v7h1.5a.5.5 0 01.5.5v1.598l3.235-2.022A.5.5 0 0110.5 13H14V6H5zm11 2.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v8a.5.5 0 01-.5.5H18v2a.5.5 0 01-.765.424L13.357 17H10.5a.5.5 0 010-1h3a.5.5 0 01.265.076L17 18.098V16.5a.5.5 0 01.5-.5H19V9h-2.5a.5.5 0 01-.5-.5z"
        fill={color}
      ></path>
    </svg>
  );
}
