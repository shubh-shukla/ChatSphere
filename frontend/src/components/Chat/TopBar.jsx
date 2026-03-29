import React from "react";
import Avatar from "./Avatar";

const TopBar = ({
  setSelectedUserId,
  selectedUserId,
  offlinePeople,
  onlinePeople,
  isTyping,
}) => {
  const isOnline = !!onlinePeople[selectedUserId];
  const userData = isOnline
    ? onlinePeople[selectedUserId]
    : offlinePeople[selectedUserId];
  const name = isOnline
    ? userData?.username
    : userData?.firstName;
  const avatarLink = userData?.avatarLink;

  return (
    <div className="flex items-center gap-4 px-6 py-3.5 border-b border-border bg-surface shadow-card">
      <button
        onClick={() => setSelectedUserId(null)}
        className="p-2 -ml-2 rounded-xl hover:bg-surface text-textMuted hover:text-textPrimary transition-all lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </button>

      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Avatar
          userId={selectedUserId}
          username={name}
          isOnline={isOnline}
          avatarLink={avatarLink}
          size="md"
        />
        <div className="min-w-0">
          <h3 className="text-[15px] font-bold text-textPrimary capitalize truncate tracking-tight">{name}</h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            {isTyping ? (
              <span className="text-xs text-primary font-semibold animate-pulse-soft flex items-center gap-1">
                <span className="flex gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms", animationDuration: "0.6s" }} />
                  <span className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms", animationDuration: "0.6s" }} />
                  <span className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms", animationDuration: "0.6s" }} />
                </span>
                typing
              </span>
            ) : (
              <>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isOnline ? "bg-accent shadow-glow-accent" : "bg-textMuted/40"
                  }`}
                />
                <span className={`text-xs font-medium ${isOnline ? "text-accent" : "text-textMuted"}`}>
                  {isOnline ? "Online" : "Offline"}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-0.5">
        <button
          className="p-2.5 rounded-xl text-textMuted hover:text-textPrimary hover:bg-surface transition-all duration-200"
          title="Voice call"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[18px] h-[18px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
          </svg>
        </button>
        <button
          className="p-2.5 rounded-xl text-textMuted hover:text-textPrimary hover:bg-surface transition-all duration-200"
          title="Video call"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[18px] h-[18px]">
            <path strokeLinecap="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </button>
        <button
          className="p-2.5 rounded-xl text-textMuted hover:text-textPrimary hover:bg-surface transition-all duration-200"
          title="More options"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[18px] h-[18px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TopBar;
