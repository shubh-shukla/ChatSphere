import React, { useRef } from "react";

const MessageInputForm = ({
  selectedUserId,
  newMessage,
  setNewMessage,
  sendMessage,
  onTyping,
}) => {
  const inputRef = useRef(null);

  const handleInputChange = (ev) => {
    setNewMessage(ev.target.value);
    if (onTyping) onTyping();
  };

  const handleKeyDown = (ev) => {
    if (ev.key === "Enter" && !ev.shiftKey) {
      ev.preventDefault();
      if (newMessage.trim()) {
        sendMessage(ev);
      }
    }
  };

  return (
    <>
      {!!selectedUserId && (
        <div className="px-5 lg:px-8 pb-5 pt-2">
          <form
            onSubmit={sendMessage}
            className="flex items-end gap-3 bg-surface border border-border rounded-xl px-3 py-2.5 shadow-card transition-all duration-300 focus-within:border-primary/40 focus-within:shadow-glow-sm"
          >
            {/* Attachment button */}
            <button
              type="button"
              className="p-2 rounded-xl text-textMuted hover:text-primary hover:bg-primary/10 transition-all duration-200 flex-shrink-0"
              title="Attach file"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
              </svg>
            </button>

            {/* Emoji button */}
            <button
              type="button"
              className="p-2 rounded-xl text-textMuted hover:text-warning hover:bg-warning/10 transition-all duration-200 flex-shrink-0"
              title="Add emoji"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
              </svg>
            </button>

            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              className="flex-1 bg-transparent text-textPrimary placeholder-textMuted text-sm outline-none py-2 min-w-0"
              placeholder="Type a message..."
              value={newMessage}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              required
            />

            {/* Send button */}
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                newMessage.trim()
                  ? "bg-primary hover:bg-primaryHover text-white shadow-glow-sm hover:shadow-glow hover:scale-105 active:scale-95"
                  : "bg-surface text-textMuted/40 cursor-not-allowed"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`w-4 h-4 transition-transform duration-300 ${newMessage.trim() ? "-rotate-45" : ""}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </form>
          {/* Keyboard shortcut hint */}
          <p className="text-[10px] text-textMuted/40 mt-1.5 text-right px-2 font-medium">
            Press <kbd className="px-1.5 py-0.5 text-[9px] bg-surface/80 rounded-md border border-border/50 font-mono">Enter</kbd> to send
          </p>
        </div>
      )}
    </>
  );
};

export default MessageInputForm;
