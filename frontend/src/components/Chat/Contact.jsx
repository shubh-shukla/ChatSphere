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
  const isSelected = selectedUserId === userId;

  return (
    <li
      key={userId}
      className={`
        relative flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer
        transition-all duration-200 group
        ${isSelected
          ? "bg-primary/10 shadow-card"
          : "hover:bg-surfaceLight"
        }
      `}
      onClick={() => setSelectedUserId(userId)}
    >
      {/* Selection indicator */}
      {isSelected && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2.5px] h-7 bg-primary rounded-r-sm" />
      )}

      <Avatar
        userId={userId}
        username={username}
        isOnline={isOnline}
        avatarLink={avatarLink}
      />
      <div className="flex-1 min-w-0">
        <span className={`block text-[13px] font-semibold capitalize truncate ${
          isSelected ? "text-textPrimary" : "text-textSecondary group-hover:text-textPrimary"
        } transition-colors`}>
          {username}
        </span>
        <span className={`text-[11px] font-medium ${isOnline ? "text-accent" : "text-textMuted/60"}`}>
          {isOnline ? "Active now" : "Offline"}
        </span>
      </div>

      {/* Active indicator dot for selected */}
      {isSelected && (
        <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 shadow-glow-sm" />
      )}
    </li>
  );
};

export default Contact;
