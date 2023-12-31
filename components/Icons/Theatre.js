import React from "react";

export default function Theatre({
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
        d="M6.5 7a.5.5 0 000 1V7zm1 1a.5.5 0 000-1v1zm4-1a.5.5 0 000 1V7zm1 1a.5.5 0 000-1v1zm2 1.5H14h.5zm-10-6V3a.5.5 0 00-.5.5h.5zm10 0h.5a.5.5 0 00-.5-.5v.5zm-2.4 13.7a.5.5 0 00.8.599l-.8-.6zm2.4-.7v.5-.5zm1.605 1.306a.5.5 0 10.803-.596l-.803.596zM11.9 11.301a.5.5 0 00-.8-.6l.8.6zM9.5 12v-.5.5zm-1.605-1.306a.5.5 0 10-.803.596l.803-.596zM16.5 13a.5.5 0 000 1v-1zm1 1a.5.5 0 000-1v1zm-7.409 2.407a.5.5 0 10-.98.202l.98-.202zM14.5 20.5v.5-.5zm5-5h.5-.5zm0-6h.5a.5.5 0 00-.5-.5v.5zm-3-.5a.5.5 0 000 1V9zm-10-1h1V7h-1v1zm5 0h1V7h-1v1zM14 9.5a4.5 4.5 0 01-1.318 3.182l.707.707A5.5 5.5 0 0015 9.5h-1zm-1.318 3.182A4.5 4.5 0 019.5 14v1a5.5 5.5 0 003.89-1.61l-.708-.708zM9.5 14a4.5 4.5 0 01-3.182-1.318l-.707.707A5.5 5.5 0 009.5 15v-1zm-3.182-1.318A4.5 4.5 0 015 9.5H4a5.5 5.5 0 001.61 3.89l.708-.708zM5 9.5v-6H4v6h1zM4.5 4h10V3h-10v1zm9.5-.5v6h1v-6h-1zm-1.1 14.299c.187-.248.428-.45.706-.588l-.447-.895c-.417.208-.78.51-1.059.883l.8.6zm.706-.588c.277-.14.583-.211.894-.211v-1c-.465 0-.925.108-1.341.316l.447.895zM14.5 17c.312 0 .62.073.898.212l.45-.893c-.419-.21-.88-.32-1.348-.319v1zm.898.212c.279.14.52.344.707.594l.803-.596a2.996 2.996 0 00-1.06-.891l-.45.893zM11.1 10.701c-.187.248-.428.45-.706.588l.447.895c.417-.208.78-.51 1.059-.883l-.8-.6zm-.706.588c-.277.14-.583.211-.894.211v1c.465 0 .925-.108 1.341-.316l-.447-.894zM9.5 11.5c-.312 0-.62-.072-.898-.213l-.45.894c.419.21.88.32 1.348.319v-1zm-.898-.213a1.996 1.996 0 01-.707-.593l-.803.596c.28.376.642.68 1.06.891l.45-.893zM16.5 14h1v-1h-1v1zm-7.388 2.609a5.502 5.502 0 001.912 3.154l.632-.775a4.502 4.502 0 01-1.565-2.581l-.98.202zm1.912 3.154c.982.8 2.21 1.237 3.476 1.237v-1a4.502 4.502 0 01-2.844-1.012l-.632.775zM14.5 21a5.5 5.5 0 003.89-1.61l-.708-.708A4.5 4.5 0 0114.5 20v1zm3.89-1.61A5.5 5.5 0 0020 15.5h-1a4.5 4.5 0 01-1.318 3.182l.707.707zM20 15.5v-6h-1v6h1zM19.5 9h-3v1h3V9z"
        fill={color}
      ></path>
    </svg>
  );
}
