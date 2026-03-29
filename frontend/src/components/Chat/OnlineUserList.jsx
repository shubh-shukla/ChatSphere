import React, { useState } from "react";
import Contact from "./Contact";
import { ContactSkeleton } from "../Skeleton";

const OnlineUsersList = ({
  onlinePeople,
  offlinePeople,
  selectedUserId,
  setSelectedUserId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const isLoading = Object.keys(onlinePeople).length === 0 && Object.keys(offlinePeople).length === 0;

  const filteredOnlinePeople = Object.keys(onlinePeople).filter((userId) => {
    const username = onlinePeople[userId].username || "";
    return username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredOfflinePeople = Object.keys(offlinePeople).filter((userId) => {
    const { firstName, lastName } = offlinePeople[userId];
    const fullName = `${firstName} ${lastName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalContacts = Object.keys(onlinePeople).length + Object.keys(offlinePeople).length;

  return (
    <section className="w-[300px] lg:w-[320px] flex flex-col bg-surface border-r border-border shadow-panel">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-textPrimary tracking-tight">Messages</h2>
            {totalContacts > 0 && (
              <p className="text-xs text-textMuted mt-0.5">{totalContacts} conversation{totalContacts !== 1 ? "s" : ""}</p>
            )}
          </div>
          {/* New chat button placeholder */}
          <button className="w-9 h-9 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="relative rounded-lg">
          <div className="flex items-center gap-2.5 bg-surfaceLight border border-border/60 rounded-lg px-3.5 py-2.5 transition-all duration-200 focus-within:border-primary/40 focus-within:shadow-glow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 text-textMuted flex-shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-sm text-textPrimary placeholder-textMuted outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="p-0.5 rounded-md text-textMuted hover:text-textSecondary hover:bg-surfaceLight transition-all flex-shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Contact list */}
      <div className="flex-1 overflow-auto no-scrollbar px-3 pb-3">
        {/* Loading skeleton */}
        {isLoading && <ContactSkeleton />}

        {!isLoading && filteredOnlinePeople.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center gap-2 px-3 py-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <p className="text-[11px] font-bold text-textMuted uppercase tracking-widest">
                Online
              </p>
              <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full ml-auto tabular-nums">
                {filteredOnlinePeople.length}
              </span>
            </div>
            <ul className="space-y-0.5">
              {filteredOnlinePeople.map((userId) => {
                const { username, avatarLink } = onlinePeople[userId];
                return (
                  <Contact
                    key={userId}
                    userId={userId}
                    username={username}
                    selectedUserId={selectedUserId}
                    setSelectedUserId={setSelectedUserId}
                    isOnline={true}
                    avatarLink={avatarLink}
                  />
                );
              })}
            </ul>
          </div>
        )}

        {!isLoading && filteredOfflinePeople.length > 0 && (
          <div>
            <div className="flex items-center gap-2 px-3 py-2.5">
              <span className="w-2 h-2 rounded-full bg-textMuted/40" />
              <p className="text-[11px] font-bold text-textMuted uppercase tracking-widest">
                Offline
              </p>
              <span className="text-[10px] font-bold text-textMuted bg-surface px-2 py-0.5 rounded-full ml-auto tabular-nums">
                {filteredOfflinePeople.length}
              </span>
            </div>
            <ul className="space-y-0.5">
              {filteredOfflinePeople.map((userId) => {
                const { _id, firstName, lastName, avatarLink } =
                  offlinePeople[userId];
                return (
                  <Contact
                    key={_id}
                    userId={_id}
                    username={`${firstName} ${lastName}`}
                    selectedUserId={selectedUserId}
                    setSelectedUserId={setSelectedUserId}
                    isOnline={false}
                    avatarLink={avatarLink}
                  />
                );
              })}
            </ul>
          </div>
        )}

        {!isLoading && filteredOnlinePeople.length === 0 && filteredOfflinePeople.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-3xl bg-surface flex items-center justify-center mb-4 shadow-card">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 text-textMuted/40">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-textSecondary mb-1">
              {searchTerm ? "No results found" : "No contacts yet"}
            </p>
            <p className="text-xs text-textMuted">
              {searchTerm ? "Try a different search term" : "Start a new conversation"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OnlineUsersList;
