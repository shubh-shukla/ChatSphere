import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import { useEffect } from "react";
import './App.css';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import VerifyEmail from "./pages/VerifyEmail";
import { AuthProvider, useAuth } from "./context/authContext";
import axios from "axios";
import ChatHome from "./pages/ChatHome";
import { ProfileProvider } from "./context/profileContext";
import { ThemeProvider } from "./context/themeContext";
import Profile from "./components/Profile";
import { baseUrl } from "../apiConfig";

const Layout = () => {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "users/:id/verify/:token",
        element: <VerifyEmail />,
      },
      {
        path: "chathome",
        element: <ChatHome />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  axios.defaults.baseURL = baseUrl;
  axios.defaults.withCredentials = true;

  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <ProfileProvider>
            <RouterProvider router={router} />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "rgb(var(--color-surface))",
                  color: "rgb(var(--color-text-primary))",
                  border: "1px solid rgb(var(--color-border))",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontFamily: "Inter, system-ui, sans-serif",
                  boxShadow: "0 4px 30px var(--shadow-card)",
                },
                success: {
                  iconTheme: {
                    primary: "rgb(var(--color-accent))",
                    secondary: "white",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "rgb(var(--color-danger))",
                    secondary: "white",
                  },
                },
              }}
            />
          </ProfileProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
