import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router";

// This is a Layout component, using React's composable nature
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        {/* The Outlet component is a placeholder for children components under this route */}
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
