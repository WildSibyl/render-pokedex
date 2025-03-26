import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router";

// This is a Layout component, using React's composable nature
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow container mx-auto">
        {/* The Outlet component is a placeholder for children components under this route */}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
