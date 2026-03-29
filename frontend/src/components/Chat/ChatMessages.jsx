import React, { useEffect, useRef } from "react";
import TypingIndicator from "./TypingIndicator";
import { MessageSkeleton } from "../Skeleton";

const formatTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();
  if (isToday) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDateSeparator = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();
  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";
  return date.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

const getDateKey = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};

const ChatMessages = ({ messages, userDetails, selectedUserId, isTyping, loadingMessages }) => {
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-auto px-6 lg:px-12 pt-6 pb-4 no-scrollbar"
      ref={messagesContainerRef}
    >
      {!!selectedUserId && (
        <div className="flex flex-col gap-1 max-w-2xl mx-auto">
          {messages.map((message, index) => {
            const isOwn = message.sender === userDetails._id;
            const showTail =
              index === 0 ||
              messages[index - 1]?.sender !== message.sender;

            // Date separator logic
            const currentDateKey = getDateKey(message.createdAt);
            const prevDateKey = index > 0 ? getDateKey(messages[index - 1]?.createdAt) : null;
            const showDateSeparator = index === 0 || currentDateKey !== prevDateKey;

            return (
              <React.Fragment key={message._id}>
                {/* Date separator */}
                {showDateSeparator && (
                  <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    <span className="text-[11px] font-semibold text-textMuted bg-surface px-4 py-1.5 rounded-full border border-border shadow-card">
                      {formatDateSeparator(message.createdAt)}
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                  </div>
                )}

                <div
                  className={`flex ${isOwn ? "justify-end" : "justify-start"} ${
                    showTail ? "mt-3" : "mt-0.5"
                  } animate-fade-in group`}
                >
                  <div className={`max-w-[70%] ${isOwn ? "items-end" : "items-start"} flex flex-col`}>
                    <div className="relative">
                      <div
                        className={`
                          px-4 py-2.5 text-[14px] leading-relaxed
                          ${isOwn
                            ? "msg-own text-white rounded-2xl rounded-br-md shadow-card"
                            : "bg-surface text-textPrimary rounded-2xl rounded-bl-md border border-border shadow-card"
                          }
                          ${!showTail && isOwn ? "rounded-br-2xl" : ""}
                          ${!showTail && !isOwn ? "rounded-bl-2xl" : ""}
                          transition-all duration-150
                        `}
                        style={{ wordBreak: "break-word" }}
                      >
                        {message.text}
                      </div>
                      {/* Hover timestamp for non-tail messages */}
                      {!showTail && index !== messages.length - 1 && (
                        <span className={`absolute top-1/2 -translate-y-1/2 text-[10px] text-textMuted opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap ${
                          isOwn ? "-left-16" : "-right-16"
                        }`}>
                          {formatTime(message.createdAt)}
                        </span>
                      )}
                    </div>
                    {/* Timestamp */}
                    {(showTail || index === messages.length - 1) && (
                      <div className={`flex items-center gap-1.5 mt-1.5 px-1 ${isOwn ? "flex-row-reverse" : ""}`}>
                        <span className="text-[10px] text-textMuted/70 font-medium">
                          {formatTime(message.createdAt)}
                        </span>
                        {isOwn && (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 text-primary/50">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
          {isTyping && <TypingIndicator />}
        </div>
      )}

      {!selectedUserId && (
        <div className="h-full flex flex-col items-center justify-center text-center px-6">
          <div className="relative mb-10">
            {/* Main icon */}
            <div className="w-28 h-28 rounded-[2rem] bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center animate-float shadow-glow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="currentColor" className="w-14 h-14 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
              </svg>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-accent/20 animate-pulse-soft" />
            <div className="absolute -bottom-2 -left-4 w-4 h-4 rounded-full bg-primary/20 animate-pulse-soft" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 -right-6 w-2.5 h-2.5 rounded-full bg-warning/20 animate-pulse-soft" style={{ animationDelay: "2s" }} />
          </div>
          <h3 className="text-2xl font-bold text-textPrimary mb-2 tracking-tight">Welcome to ChatSphere</h3>
          <p className="text-sm text-textMuted max-w-sm leading-relaxed mb-6">Select a conversation from the sidebar to start chatting with your friends</p>
          <div className="flex items-center gap-2 text-xs text-textMuted/50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            End-to-end encrypted
          </div>
        </div>
      )}

      {/* Loading skeleton */}
      {selectedUserId && loadingMessages && (
        <MessageSkeleton />
      )}

      {selectedUserId && !loadingMessages && !messages.length && (
        <div className="h-full flex flex-col items-center justify-center text-center px-6">
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center animate-bounce-soft shadow-card">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-12 h-12 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-bold text-textPrimary mb-2 tracking-tight">Start the conversation</h3>
          <p className="text-sm text-textMuted mb-5">Say hello and break the ice!</p>
          <div className="flex gap-2">
            <span className="text-xs bg-surface text-textSecondary px-4 py-2 rounded-full border border-border/50 hover:bg-surfaceLight transition-colors cursor-default">
              👋 Wave hello
            </span>
            <span className="text-xs bg-surface text-textSecondary px-4 py-2 rounded-full border border-border/50 hover:bg-surfaceLight transition-colors cursor-default">
              💬 Ask a question
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
