import React from "react";

const TypingIndicator = () => {
  return (
    <div className="flex justify-start mt-3 animate-fade-in">
      <div className="bg-surface border border-border/30 rounded-2xl rounded-bl-md px-5 py-4 flex items-center gap-1.5 shadow-card">
        <span
          className="w-2 h-2 rounded-full bg-primary/70 animate-bounce"
          style={{ animationDelay: "0ms", animationDuration: "0.6s" }}
        />
        <span
          className="w-2 h-2 rounded-full bg-primary/70 animate-bounce"
          style={{ animationDelay: "150ms", animationDuration: "0.6s" }}
        />
        <span
          className="w-2 h-2 rounded-full bg-primary/70 animate-bounce"
          style={{ animationDelay: "300ms", animationDuration: "0.6s" }}
        />
      </div>
    </div>
  );
};

export default TypingIndicator;
