import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/authContext";

const VerifyEmail = () => {
  const { id, token } = useParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const { isAuthenticated, checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    if (isAuthenticated) navigate("/chathome", { replace: true });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/user/${id}/verify/${token}`);
        toast.success(response.data.message);
        setSuccess(true);
      } catch (error) {
        toast.error(error.response?.data?.message || "Verification failed");
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, token]);

  return (
    <div className="bg-dark min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background orbs */}
      <div className="orb w-[400px] h-[400px] bg-accent top-20 -right-20 animate-pulse-soft" />
      <div className="orb w-[300px] h-[300px] bg-primary -bottom-10 -left-20 animate-pulse-soft" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 text-center animate-slide-up">
        {loading && (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-primaryMuted flex items-center justify-center mb-6">
              <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-textPrimary mb-2">Verifying your email...</h2>
            <p className="text-sm text-textMuted">Please wait a moment</p>
          </div>
        )}

        {!loading && success && (
          <div className="flex flex-col items-center glass rounded-3xl p-10 shadow-card">
            <div className="w-16 h-16 rounded-2xl bg-accentMuted flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-accent">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-textPrimary mb-2">Email Verified!</h2>
            <p className="text-sm text-textMuted mb-8">Your account has been successfully verified</p>
            {!isAuthenticated && (
              <Link
                to="/login"
                className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary hover:bg-primaryHover rounded-xl transition-all duration-200 btn-lift"
              >
                Continue to Login
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 transition-transform group-hover:translate-x-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            )}
          </div>
        )}

        {!loading && !success && (
          <div className="flex flex-col items-center glass rounded-3xl p-10 shadow-card">
            <div className="w-16 h-16 rounded-2xl bg-dangerMuted flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-danger">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-textPrimary mb-2">Verification Failed</h2>
            <p className="text-sm text-textMuted mb-8">The link may have expired or is invalid</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-textSecondary border border-border hover:border-borderLight hover:text-textPrimary rounded-xl transition-all"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
