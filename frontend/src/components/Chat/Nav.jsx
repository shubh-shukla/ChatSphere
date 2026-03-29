import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useTheme } from "../../context/themeContext";
import { useProfile } from "../../context/profileContext";
import logo from "../../assets/logoIcon.svg";

const Nav = () => {
  const { logout, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { userDetails } = useProfile();
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeTab = window.location.href.split("/").pop();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const navItems = [
    {
      to: "/chathome",
      id: "chathome",
      label: "Chats",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>
      ),
    },
    {
      to: "/profile",
      id: "profile",
      label: "Profile",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
    },
  ];

  // Color for user avatar fallback
  const colors = [
    "from-violet-500 to-purple-600",
    "from-rose-500 to-pink-600",
    "from-amber-500 to-orange-600",
    "from-emerald-500 to-teal-600",
    "from-blue-500 to-indigo-600",
    "from-cyan-500 to-sky-600",
  ];
  const userColorIndex = userDetails?._id
    ? parseInt(userDetails._id.substring(10), 16) % colors.length
    : 0;

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed bottom-5 left-5 z-50 lg:hidden w-11 h-11 rounded-md bg-primary text-white shadow-lg flex items-center justify-center transition-all hover:brightness-110 active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {/* Sidebar */}
      <header
        className={`
          fixed lg:static z-40 h-screen w-[80px]
          bg-surfaceLight border-r border-border shadow-elevated
          flex flex-col items-center py-4
          transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <Link to="/" className="mb-6 p-2 rounded-md hover:bg-surface/60 transition-colors duration-150 group">
          <img src={logo} className="h-8 w-8 transition-transform duration-200 group-hover:scale-105" alt="ChatSphere" />
        </Link>

        {/* Divider */}
        <div className="w-10 h-px bg-border/40 mb-4" />

        {/* Nav items */}
        <nav className="flex-1 flex flex-col items-center gap-1 w-full px-2.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                to={item.to}
                className={`
                  relative w-full flex flex-col items-center gap-1 py-2.5 rounded-md
                  text-[10px] font-medium tracking-wider uppercase transition-all duration-150
                  ${isActive
                    ? "bg-primary/12 text-primary"
                    : "text-textMuted hover:text-textPrimary hover:bg-surface/50"
                  }
                `}
                onClick={() => setMobileOpen(false)}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2.5px] h-5 bg-primary rounded-r-sm" />
                )}
                <span className="w-6 h-6 flex items-center justify-center">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="flex flex-col items-center gap-1 w-full px-2.5">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-center py-2.5 rounded-md text-textMuted hover:text-warning hover:bg-surface/50 transition-all duration-150 group"
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[18px] h-[18px] transition-transform group-hover:rotate-45">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[18px] h-[18px] transition-transform group-hover:-rotate-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            )}
          </button>

          {/* Divider */}
          <div className="w-10 h-px bg-border/40 my-1" />

          {/* User avatar */}
          <Link
            to="/profile"
            className="mb-1.5 group"
            title={userDetails?.firstName ? `${userDetails.firstName} ${userDetails.lastName || ""}` : "Profile"}
          >
            <div className={`w-9 h-9 rounded-md bg-gradient-to-br ${colors[userColorIndex]} flex items-center justify-center overflow-hidden ring-1 ring-border/30 group-hover:ring-primary/50 transition-all duration-200`}>
              {userDetails?.avatarLink ? (
                <img src={userDetails.avatarLink} className="w-full h-full object-cover" alt="You" />
              ) : (
                <span className="text-white font-semibold text-xs uppercase">
                  {userDetails?.firstName?.[0] || "?"}
                </span>
              )}
            </div>
          </Link>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full flex items-center justify-center py-2.5 rounded-md text-textMuted hover:text-danger hover:bg-danger/8 transition-all duration-150 mb-1"
            title="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[18px] h-[18px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
          </button>
        </div>
      </header>
    </>
  );
};

export default Nav;
