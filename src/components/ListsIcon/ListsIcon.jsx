import React from "react";

const ListsIcon = ({ activeNavlink }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.3999 13.8666C6.3999 9.84393 6.3999 7.83261 7.64958 6.58293C8.89926 5.33325 10.9106 5.33325 14.9332 5.33325H17.0666C21.0892 5.33325 23.1005 5.33325 24.3502 6.58293C25.5999 7.83261 25.5999 9.84393 25.5999 13.8666V18.1333C25.5999 22.1559 25.5999 24.1672 24.3502 25.4169C23.1005 26.6666 21.0892 26.6666 17.0666 26.6666H14.9332C10.9106 26.6666 8.89926 26.6666 7.64958 25.4169C6.3999 24.1672 6.3999 22.1559 6.3999 18.1333V13.8666Z"
        stroke={activeNavlink === "lists" ? "#FFFFFF" : "#070127"}
        strokeWidth="1.5"
      />
      <path
        d="M11.7334 16H20.2667"
        stroke={activeNavlink === "lists" ? "#FFFFFF" : "#070127"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M11.7334 11.7334H20.2667"
        stroke={activeNavlink === "lists" ? "#FFFFFF" : "#070127"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M11.7334 20.2666H17.0667"
        stroke={activeNavlink === "lists" ? "#FFFFFF" : "#070127"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ListsIcon;
