import Hero from "../components/Hero";
import { useAuth } from "../context/authContext";
import LandingNav from "../components/LandingNav";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-dark min-h-screen relative overflow-hidden">
      <LandingNav />
      <Hero />
    </div>
  );
};

export default Home;
