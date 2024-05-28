import Hero from "../components/Hero";
import { useAuth } from "../context/authContext";
import LandingNav from "../components/LandingNav";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-dark h-full flex flex-col bg-gradient-to-r from-blue-800 to-slate-900">
      <LandingNav />
      <Hero />
      {isAuthenticated && console.log("Authenticated")}
    </div>
  );
};

export default Home;
