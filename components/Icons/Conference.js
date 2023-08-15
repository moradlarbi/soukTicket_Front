import React from "react";

export default function Conference({
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
        d="M12 4a.5.5 0 01.5.5V6h7a.5.5 0 01.5.5v8a.5.5 0 01-.5.5h-7v2.15l5.17 1.88a.5.5 0 01-.34.94L12 18.032 6.67 19.97a.5.5 0 11-.34-.94l5.17-1.88V15h-7a.5.5 0 01-.5-.5v-8a.5.5 0 01.5-.5h7V4.5A.5.5 0 0112 4zm0 10h7V7H5v7h7z"
      ></path>
    </svg>
  );
}
