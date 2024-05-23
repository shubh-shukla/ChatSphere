// Nav.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

import logo from '../../assets/logoIcon.svg';
const tabs = ['chathome', 'profile'];

const Nav = () => {
  const { logout, isAuthenticated } = useAuth();
  const [isMobile, setIsMobile] = useState(true);

  const activeTab = window.location.href.split('/').pop();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  return (
    <>
      <button
        onClick={() => setIsMobile(!isMobile)}
        className="flex fixed bottom-5 h-10 aspect-square lg:hidden justify-center items-center bg-dark left-5 z-50 ring-2 ring-gray-500 rounded-lg text-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      {isMobile && (
        <header className="fixed h-screen w-[150px] z-40 lg:static lg:w-[9%] text-white bg-[#030c35] flex flex-col">
          <Link
            to="/"
            className="flex flex-col gap-2 items-center justify-center h-[90px] border-b border-gray-600"
          >
            <img
              src={logo}
              className="h-12"
              alt="ChatSphere"
            />
          </Link>
          <nav className="h-full flex flex-col justify-between font-medium ">
            <div className="flex flex-col">
              <Link to="/profile" className="flex justify-center items-center	h-[80px] hover:bg-[#02195a]/40"
                style={{
                  backgroundColor: activeTab === 'profile' ? '#02195a' : '',
                  borderLeft: activeTab === 'profile' ? '4px solid #fff' : '',
                }}
              >
                <div id="profile-tab" className="flex flex-col justify-center items-center h-full w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  <span>My Profile</span>
                </div>
              </Link>
              <Link to="/chathome" className="flex justify-center items-center h-[80px] hover:bg-[#02195a]/40"
                style={{
                  backgroundColor: activeTab === 'chathome' ? '#02195a' : '',
                  borderLeft: activeTab === 'chathome' ? '4px solid #fff' : '',
                }}
              >
                <div id="chats-tab" className="flex flex-col justify-center items-center h-full w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                    />
                  </svg>
                  <span>Chats</span>
                </div>
              </Link>
            </div>
            <Link className="flex justify-center items-center hover:bg-[#02195a]/40	h-[80px]">
              <div className="flex flex-col justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
                <button onClick={logout}>Logout</button>
              </div>
            </Link>
          </nav>
        </header>
      )}
    </>
  );
};

export default Nav;
