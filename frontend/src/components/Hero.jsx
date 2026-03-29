import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Hero = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated background orbs */}
      <div className="orb w-[500px] h-[500px] bg-primary -top-20 -left-20 animate-pulse-soft" />
      <div className="orb w-[400px] h-[400px] bg-accent bottom-20 right-10 animate-pulse-soft" style={{ animationDelay: "1.5s" }} />
      <div className="orb w-[300px] h-[300px] bg-primaryLight top-1/2 left-1/2 animate-pulse-soft" style={{ animationDelay: "3s" }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface/50 backdrop-blur-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-textSecondary font-medium">Real-time messaging platform</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              <span className="text-textPrimary">Where</span>{" "}
              <span className="gradient-text">conversations</span>
              <br />
              <span className="text-textPrimary">come alive</span>
            </h1>

            <p className="text-lg md:text-xl text-textSecondary leading-relaxed mb-10 max-w-lg">
              Connect instantly with friends and colleagues. Fast, secure, and beautifully designed for the way you communicate.
            </p>

            <div className="flex flex-wrap gap-4">
              {!isAuthenticated && (
                <>
                  <Link
                    to="/register"
                    className="group inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-primary hover:bg-primaryHover rounded-2xl transition-all duration-200 btn-lift"
                  >
                    Start Chatting
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transition-transform group-hover:translate-x-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-textSecondary border border-border hover:border-borderLight hover:text-textPrimary hover:bg-surface rounded-2xl transition-all duration-200"
                  >
                    Sign In
                  </Link>
                </>
              )}
              {isAuthenticated && (
                <Link
                  to="/chathome"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-primary hover:bg-primaryHover rounded-2xl transition-all duration-200 btn-lift"
                >
                  Open Chat
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transition-transform group-hover:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              )}
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 mt-12 pt-8 border-t border-border">
              <div className="text-center">
                <p className="text-2xl font-bold text-textPrimary">Real-time</p>
                <p className="text-xs text-textMuted mt-1">WebSocket powered</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-textPrimary">Secure</p>
                <p className="text-xs text-textMuted mt-1">End-to-end encrypted</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-textPrimary">Free</p>
                <p className="text-xs text-textMuted mt-1">No hidden costs</p>
              </div>
            </div>
          </div>

          {/* Right side - Chat preview mockup */}
          <div className="hidden lg:block animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              
              {/* Chat mockup card */}
              <div className="relative glass rounded-3xl p-6 shadow-float">
                {/* Chat header */}
                <div className="flex items-center gap-3 pb-4 border-b border-border mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primaryLight flex items-center justify-center text-white font-semibold text-sm">
                    CS
                  </div>
                  <div>
                    <p className="font-semibold text-textPrimary text-sm">ChatSphere</p>
                    <p className="text-xs text-accent flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      Online
                    </p>
                  </div>
                </div>
                
                {/* Mock messages */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-start">
                    <div className="bg-surface rounded-2xl rounded-tl-md px-4 py-2.5 max-w-[75%]">
                      <p className="text-sm text-textPrimary">Hey! Welcome to ChatSphere &#128075;</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary rounded-2xl rounded-tr-md px-4 py-2.5 max-w-[75%]">
                      <p className="text-sm text-white">This looks amazing! Love the UI</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-surface rounded-2xl rounded-tl-md px-4 py-2.5 max-w-[75%]">
                      <p className="text-sm text-textPrimary">It's fast, secure, and fun to use &#9889;</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary rounded-2xl rounded-tr-md px-4 py-2.5 max-w-[75%]">
                      <p className="text-sm text-white">Sign me up! &#128640;</p>
                    </div>
                  </div>
                </div>

                {/* Mock input */}
                <div className="flex items-center gap-2 bg-surface rounded-xl px-4 py-3">
                  <span className="text-textMuted text-sm flex-1">Type a message...</span>
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
