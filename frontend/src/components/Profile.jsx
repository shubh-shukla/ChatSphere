import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Chat/Nav";
import { useProfile } from "../context/profileContext";
import SelectAvatar from "./SelectAvatar";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { userDetails } = useProfile();
  const [formData, setFormData] = useState({});
  const [selectedLink, setSelectedLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put("/api/user/profile/update", {
        ...formData,
        avatarLink: selectedLink,
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFormData(userDetails);
    if (userDetails?.avatarLink) {
      setSelectedLink(userDetails.avatarLink);
    }
  }, [userDetails]);

  // Dirty-check: only enable save button when something changed
  const hasChanges =
    (formData?.firstName || "") !== (userDetails?.firstName || "") ||
    (formData?.lastName || "") !== (userDetails?.lastName || "") ||
    selectedLink !== (userDetails?.avatarLink || "");

  const memberSince = userDetails?.createdAt
    ? new Date(userDetails.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "—";

  const colors = [
    "from-violet-500 to-purple-600",
    "from-rose-500 to-pink-600",
    "from-amber-500 to-orange-600",
    "from-emerald-500 to-teal-600",
    "from-blue-500 to-indigo-600",
    "from-cyan-500 to-sky-600",
  ];
  const colorIndex = userDetails?._id
    ? parseInt(userDetails._id.substring(10), 16) % colors.length
    : 0;

  const sections = [
    { id: "personal", label: "Personal Info", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    )},
    { id: "avatar", label: "Avatar", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
      </svg>
    )},
  ];

  return (
    <div className="flex h-screen bg-dark overflow-hidden relative">
      {/* Background orbs */}
      <div className="orb w-80 h-80 bg-primary/20 -top-40 right-1/4 fixed" />
      <div className="orb w-60 h-60 bg-accent/15 bottom-0 left-1/3 fixed" />

      <Nav />
      <div className="flex-1 overflow-auto no-scrollbar">
        <div className="max-w-2xl mx-auto px-6 py-10">

          {/* Profile Banner */}
          <div className="rounded-3xl overflow-hidden shadow-elevated mb-8 animate-fade-in bg-background/80 backdrop-blur-xl border border-border/30">
            {/* Gradient banner */}
            <div className={`h-32 bg-gradient-to-br ${colors[colorIndex]} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/5" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")" }} />
            </div>

            {/* Avatar & info overlay */}
            <div className="px-6 pb-6 -mt-14 relative">
              <div className="flex items-end gap-5">
                {/* Avatar */}
                <div className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center overflow-hidden ring-4 ring-background shadow-float`}>
                  {selectedLink ? (
                    <img src={selectedLink} className="w-full h-full object-cover" alt="avatar" />
                  ) : (
                    <span className="text-white font-bold text-3xl uppercase drop-shadow">
                      {userDetails?.firstName?.[0] || "?"}
                    </span>
                  )}
                </div>
                <div className="pb-2">
                  <h1 className="text-xl font-bold text-textPrimary capitalize tracking-tight">
                    {userDetails?.firstName || ""} {userDetails?.lastName || ""}
                  </h1>
                  <p className="text-sm text-textMuted">{userDetails?.email || ""}</p>
                </div>
              </div>

              {/* Stats row */}
              <div className="flex gap-8 mt-6 pt-5 border-t border-border/40">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] text-textMuted font-medium uppercase tracking-wider">Member since</p>
                    <p className="text-sm font-semibold text-textPrimary">{memberSince}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-accent">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] text-textMuted font-medium uppercase tracking-wider">Status</p>
                    <p className="text-sm font-semibold text-accent">Verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section tabs */}
          <div className="flex gap-1 p-1.5 bg-surface/60 backdrop-blur-sm rounded-2xl mb-8 border border-border/30">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeSection === s.id
                    ? "bg-primary text-white shadow-glow"
                    : "text-textMuted hover:text-textPrimary hover:bg-surface/80"
                }`}
              >
                {s.icon}
                {s.label}
              </button>
            ))}
          </div>

          {/* Form card */}
          <form onSubmit={handleSubmit}>
            <div className="rounded-3xl shadow-elevated overflow-hidden animate-fade-in bg-background/80 backdrop-blur-xl border border-border/30">
              {/* Personal Info section */}
              {activeSection === "personal" && (
                <div className="p-7 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="flex items-center gap-1.5 mb-2.5 text-xs font-semibold text-textMuted uppercase tracking-wider">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="w-full px-4 py-3.5 bg-surface/60 border border-border/50 rounded-xl text-textPrimary placeholder-textMuted text-sm focus:outline-none focus:border-primary/60 focus:bg-surface transition-all duration-200 input-glow"
                        value={formData?.firstName || ""}
                        placeholder="First Name"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="flex items-center gap-1.5 mb-2.5 text-xs font-semibold text-textMuted uppercase tracking-wider">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="w-full px-4 py-3.5 bg-surface/60 border border-border/50 rounded-xl text-textPrimary placeholder-textMuted text-sm focus:outline-none focus:border-primary/60 focus:bg-surface transition-all duration-200 input-glow"
                        value={formData?.lastName || ""}
                        placeholder="Last Name"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="flex items-center gap-1.5 mb-2.5 text-xs font-semibold text-textMuted uppercase tracking-wider">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        disabled
                        className="w-full px-4 py-3.5 bg-surface/30 border border-border/30 rounded-xl text-textMuted text-sm cursor-not-allowed pr-24"
                        value={userDetails?.email || ""}
                        placeholder="Email"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold bg-border/30 text-textMuted px-2.5 py-1 rounded-lg uppercase tracking-wider">
                        Locked
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Avatar section */}
              {activeSection === "avatar" && (
                <div className="p-7">
                  {/* Current avatar preview */}
                  <div className="flex items-center gap-4 mb-7 p-4 bg-surface/40 rounded-2xl border border-border/30">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center overflow-hidden shadow-card`}>
                      {selectedLink ? (
                        <img src={selectedLink} className="w-full h-full object-cover" alt="preview" />
                      ) : (
                        <span className="text-white font-bold text-2xl uppercase">
                          {userDetails?.firstName?.[0] || "?"}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-textPrimary">Current Avatar</p>
                      <p className="text-xs text-textMuted mt-0.5">Select a new avatar below to change it</p>
                    </div>
                  </div>
                  <SelectAvatar
                    setSelectedLink={setSelectedLink}
                    selectedLink={selectedLink}
                  />
                </div>
              )}

              {/* Save button footer */}
              <div className="px-7 py-5 border-t border-border/30 bg-surface/20 flex items-center justify-between">
                <div className="hidden sm:flex items-center gap-2">
                  {hasChanges ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                      <p className="text-xs font-medium text-warning">Unsaved changes</p>
                    </>
                  ) : (
                    <p className="text-xs text-textMuted">All changes saved</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading || !hasChanges}
                  className={`px-7 py-3 text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 text-sm ml-auto ${
                    hasChanges && !loading
                      ? "bg-primary hover:bg-primaryHover shadow-glow-sm hover:shadow-glow hover:scale-[1.02] active:scale-[0.98]"
                      : "bg-primary/30 cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
