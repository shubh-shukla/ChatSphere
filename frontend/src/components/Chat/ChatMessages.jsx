import React, { useEffect, useRef, useState } from "react";

const ChatMessages = ({ messages, userDetails, selectedUserId }) => {
  const messagesContainerRef = useRef(null);
  useEffect(() => {
    const container = messagesContainerRef.current;

    if (container) {
      // Set the container scrollTop to the scrollHeight with smooth behavior
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, messagesContainerRef]);

  return (
    <div
      className="absolute bottom-24 w-full px-7 lg:px-20 left-1/2 transform -translate-x-1/2 overflow-auto max-h-[90vh] pt-28 h-full"
      ref={messagesContainerRef}
    >
      {!!selectedUserId && (
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`text-white ${message.sender !== userDetails._id
                ? "bg-[#263d8a]  self-start  rounded-r-2xl "
                : "bg-[#17285c] self-end  rounded-l-2xl "
                } relative group  rounded-b-2xl px-5 py-3 `}
            >
              <div
                style={{ wordWrap: "breakWord" }}
                className="flex flex-wrap max-w-[500px] overflow-auto"
              >
                {message.text}
              </div>
              <div
                className={`absolute top-0  w-0 h-0  ${message.sender !== userDetails._id
                  ? "border-r-[#263d8a] -left-4 border-r-[20px]"
                  : "rounded-l-lg -right-4 border-l-[#17285c] border-l-[20px]"
                  } border-b-[20px] border-b-transparent `}
              ></div>
            </div>
          ))}
        </div>
      )}

      {selectedUserId && !messages.length && (
        <div className="text-gray-500   flex items-end justify-center h-full ">
          Start a conversation
        </div>
      )}
    </div>
  );
};

export default ChatMessages;