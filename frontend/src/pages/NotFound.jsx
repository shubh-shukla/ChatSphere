import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="bg-dark min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background orbs */}
      <div className="orb w-[400px] h-[400px] bg-primary -top-20 -right-20 animate-pulse-soft" />
      <div
        className="orb w-[300px] h-[300px] bg-accent bottom-10 -left-10 animate-pulse-soft"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 text-center px-6 animate-slide-up">
        <div className="mb-6">
          <span className="text-[10rem] font-black leading-none gradient-text">
            404
          </span>
        </div>
        <h1 className="text-2xl font-bold text-textPrimary mb-3">
          Page not found
        </h1>
        <p className="text-textSecondary mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold bg-primary hover:bg-primaryHover rounded-xl transition-all duration-200 btn-lift"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
