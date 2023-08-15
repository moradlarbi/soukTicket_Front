import React from "react";

export default function Atelier({
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
        d="M6.146 5.146A.5.5 0 016.5 5h2a.5.5 0 01.354.146l1 1a.5.5 0 010 .708L8.207 8.5l2.647 2.646a.5.5 0 01-.708.708L7.5 9.207l-1.646 1.647a.5.5 0 01-.708 0l-2-2a.5.5 0 010-.708l3-3zM6.707 6l-2.5 2.5L5.5 9.793l1.646-1.647L8.793 6.5l-.5-.5H6.707zm8.44-.854A.5.5 0 0115.5 5h2a.5.5 0 01.354.146l3 3a.5.5 0 010 .708l-2 2a.5.5 0 01-.708 0L16.5 9.207l-9.646 9.647a.5.5 0 01-.708-.708L15.793 8.5l-1.647-1.646a.5.5 0 010-.708l1-1zm.56.854l-.5.5 1.647 1.646L18.5 9.793 19.793 8.5l-2.5-2.5h-1.586zm-2.56 8.146a.5.5 0 01.707 0l4 4a.5.5 0 01-.708.708l-4-4a.5.5 0 010-.708z"
      ></path>
    </svg>
  );
}
