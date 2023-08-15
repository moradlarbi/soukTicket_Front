import React from "react";

export default function Podcast({
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
        d="M8.44 4.44A1.5 1.5 0 019.5 4h5A1.5 1.5 0 0116 5.5v9a1.5 1.5 0 01-1.5 1.5h-5A1.5 1.5 0 018 14.5v-9c0-.398.158-.78.44-1.06zM9 7h1.5a.5.5 0 000-1H9v-.5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5V6h-1.5a.5.5 0 000 1H15v1h-1.5a.5.5 0 000 1H15v1h-1.5a.5.5 0 000 1H15v1H9v-1h1.5a.5.5 0 000-1H9V9h1.5a.5.5 0 000-1H9V7zm0 6v1.5a.5.5 0 00.5.5h5a.5.5 0 00.5-.5V13H9zm-2.5 1a.5.5 0 01.5.5A2.5 2.5 0 009.5 17h5a2.5 2.5 0 002.5-2.5a.5.5 0 011 0a3.5 3.5 0 01-3.5 3.5h-2.013v1H14.5a.5.5 0 010 1h-2.411a.502.502 0 01-.204 0H9.5a.5.5 0 010-1h1.987v-1H9.5A3.5 3.5 0 016 14.5a.5.5 0 01.5-.5z"
      ></path>
    </svg>
  );
}
