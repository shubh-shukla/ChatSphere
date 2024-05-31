// Contact.js
import React from "react";
import Avatar from "./Avatar";

const Contact = ({
  userId,
  username,
  selectedUserId,
  setSelectedUserId,
  isOnline,
  avatarLink,
}) => {
  return (
    <li
      key={userId}
      className={`${
        selectedUserId === userId ? "bg-[#1d3072]" : ""
      } capitalize py-2 lg:py-3 px-2 lg:px-5  rounded-[0.5rem]  border-gray-300 hover:bg-[#1d3072] flex flex-col lg:flex-row items-center gap-1 my-1.5 lg:gap-4 font-medium hover:cursor-pointer lg:my-3 text-white `}
      onClick={() => {
        setSelectedUserId(userId);
      }}
    >
      <Avatar
        userId={userId}
        username={username}
        isOnline={isOnline}
        avatarLink={avatarLink}
      />
      <span className="text-xs lg:text-base text-center">{username}</span>
      {isOnline && (
        <span
          className={`text-xs rounded-full bg-green-500 px-2 py-0.5  z-20 
        }`}
        >
          Active
        </span>
      )}
    </li>
  );
};

export default Contact;