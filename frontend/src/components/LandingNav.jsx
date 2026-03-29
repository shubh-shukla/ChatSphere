import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useTheme } from "../context/themeContext";

import logo from "../assets/logo-horizontal.webp";

const LandingNav = () => {
  const { isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-strong shadow-card py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={logo}
            className="h-10 transition-transform duration-300 group-hover:scale-105"
            alt="ChatSphere"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-textMuted hover:text-warning hover:bg-surfaceLight transition-all duration-200"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            )}
          </button>
          <Link
            to={isAuthenticated ? "/chathome" : "/login"}
            className="px-5 py-2.5 text-sm font-medium text-textSecondary hover:text-textPrimary transition-colors duration-200 rounded-xl hover:bg-surfaceLight"
          >
            {isAuthenticated ? "Dashboard" : "Sign In"}
          </Link>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="px-5 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primaryHover rounded-xl transition-all duration-200 btn-lift"
            >
              Get Started
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/chathome"
              className="px-5 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primaryHover rounded-xl transition-all duration-200 btn-lift"
            >
              Open Chat
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-xl text-textSecondary hover:text-textPrimary hover:bg-surfaceLight transition-colors"
        >
          {mobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-2 mx-4 p-4 rounded-2xl glass animate-fade-in">
          <div className="flex flex-col gap-2">
            <Link
              to={isAuthenticated ? "/chathome" : "/login"}
              className="px-4 py-3 text-sm font-medium text-textSecondary hover:text-textPrimary rounded-xl hover:bg-surfaceLight transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {isAuthenticated ? "Dashboard" : "Sign In"}
            </Link>
            {!isAuthenticated ? (
              <Link
                to="/register"
                className="px-4 py-3 text-sm font-medium text-white bg-primary hover:bg-primaryHover rounded-xl text-center transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            ) : (
              <Link
                to="/chathome"
                className="px-4 py-3 text-sm font-medium text-white bg-primary hover:bg-primaryHover rounded-xl text-center transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Open Chat
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingNav;
