import React from "react";

export default function Concerts({
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
        d="M9 5a4 4 0 00-3.16 6.453l5.613-5.613A3.983 3.983 0 009 5zm3.532.461a5 5 0 10-2.152 8.346l6.787 6.066a.5.5 0 00.687-.02l2-2a.5.5 0 00.019-.686l-6.066-6.787C13.933 9.942 14 9.479 14 9a4.984 4.984 0 00-1.464-3.536c-.002 0-.003-.002-.004-.003zm-.372 1.086L6.547 12.16a4 4 0 005.613-5.613zm1.224 4.86a5.024 5.024 0 01-1.977 1.977l6.074 5.428 1.331-1.331-5.428-6.074z"
        fill={color}
      ></path>
    </svg>
  );
}
