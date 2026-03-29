import React from "react";

export const ContactSkeleton = () => (
  <div className="space-y-1 px-2 py-2">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="flex items-center gap-3 px-3 py-3 animate-pulse"
        style={{ animationDelay: `${i * 100}ms` }}
      >
        <div className="w-11 h-11 rounded-2xl bg-surface flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div
            className="h-3.5 bg-surface rounded-lg mb-2"
            style={{ width: `${50 + Math.random() * 40}%` }}
          />
          <div className="h-2.5 w-16 bg-surface rounded-lg opacity-50" />
        </div>
      </div>
    ))}
  </div>
);

export const MessageSkeleton = () => (
  <div className="flex flex-col gap-3 max-w-2xl mx-auto pt-6">
    {[...Array(8)].map((_, i) => {
      const isRight = i % 3 === 1 || i % 3 === 2;
      const widths = ["w-52", "w-36", "w-64", "w-40", "w-48", "w-32", "w-56", "w-44"];
      return (
        <div
          key={i}
          className={`flex ${isRight ? "justify-end" : "justify-start"} animate-pulse`}
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div
            className={`rounded-2xl px-4 py-3 ${
              isRight ? "bg-primary/8 rounded-br-md" : "bg-surface rounded-bl-md border border-border/20"
            }`}
          >
            <div className={`h-3 ${widths[i]} rounded-lg ${isRight ? "bg-primary/15" : "bg-surfaceLight"}`} />
            {i % 2 === 0 && (
              <div className={`h-3 mt-1.5 rounded-lg ${isRight ? "bg-primary/8" : "bg-surfaceLight/60"}`} style={{ width: "60%" }} />
            )}
          </div>
        </div>
      );
    })}
  </div>
);
