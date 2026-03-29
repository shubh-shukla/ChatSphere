import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("Please accept the terms and conditions");
      return;
    }
    setLoading(true);
    try {
      const url = "/api/user/register";
      const { data: res } = await axios.post(url, data);
      toast.success(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 300 &&
        error.response.status <= 500
      ) {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-dark min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background orbs */}
      <div className="orb w-[400px] h-[400px] bg-accent -top-20 -left-20 animate-pulse-soft" />
      <div
        className="orb w-[300px] h-[300px] bg-primary bottom-10 right-10 animate-pulse-soft"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 w-full max-w-md mx-auto px-6 animate-slide-up">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-textSecondary hover:text-textPrimary mb-8 transition-colors group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 transition-transform group-hover:-translate-x-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          <span className="text-sm font-medium">Back to home</span>
        </Link>

        <div className="glass rounded-3xl p-8 shadow-card">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-textPrimary mb-2">
              Create your account
            </h1>
            <p className="text-textSecondary text-sm">
              Join ChatSphere and start chatting instantly
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-textSecondary"
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-textMuted">
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
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <input
                  onChange={handleChange}
                  value={data.email}
                  type="email"
                  name="email"
                  id="email"
                  className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-xl text-textPrimary placeholder-textMuted text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all input-glow"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-textSecondary"
                >
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-textMuted">
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
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </div>
                  <input
                    onChange={handleChange}
                    value={data.firstName}
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="John"
                    className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-xl text-textPrimary placeholder-textMuted text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all input-glow"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-textSecondary"
                >
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-textMuted">
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
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </div>
                  <input
                    onChange={handleChange}
                    value={data.lastName}
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Doe"
                    className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-xl text-textPrimary placeholder-textMuted text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all input-glow"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-textSecondary"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-textMuted">
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
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                </div>
                <input
                  onChange={handleChange}
                  value={data.password}
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-xl text-textPrimary placeholder-textMuted text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all input-glow"
                  required
                />
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-border bg-surface text-primary focus:ring-primary focus:ring-offset-0"
              />
              <span className="text-sm text-textSecondary leading-snug">
                I accept the{" "}
                <span className="font-medium text-primary hover:text-primaryLight cursor-pointer">
                  Terms and Conditions
                </span>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 text-white font-semibold bg-primary hover:bg-primaryHover rounded-xl transition-all duration-200 btn-lift disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                "Create Account"
              )}
            </button>

            <p className="text-sm text-textSecondary text-center pt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-primary hover:text-primaryLight transition-colors"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
