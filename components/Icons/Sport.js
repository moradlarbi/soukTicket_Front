import React from "react";

export default function Sport({
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
        d="M6.5 4.5A.5.5 0 017 4h10a.5.5 0 01.5.5v.542a3 3 0 01-.038 5.922c-.109.661-.438 1.265-.85 1.79-.508.65-1.174 1.22-1.819 1.687a16.211 16.211 0 01-2.293 1.374V19H15a.5.5 0 010 1H9a.5.5 0 010-1h2.5v-3.185a16.213 16.213 0 01-2.293-1.375c-.645-.467-1.31-1.037-1.82-1.685-.411-.526-.74-1.13-.849-1.79A3 3 0 016.5 5.041V4.5zm0 1.564a2 2 0 000 3.873V6.064zm1-.564V5h9v5.5c0 .537-.244 1.088-.675 1.638-.429.547-1.013 1.055-1.618 1.492A15.192 15.192 0 0112 14.947a15.194 15.194 0 01-2.207-1.316c-.605-.438-1.19-.946-1.618-1.493-.431-.55-.675-1.101-.675-1.638v-5zm10 .564v3.873a2 2 0 000-3.873z"
      ></path>
    </svg>
  );
}
