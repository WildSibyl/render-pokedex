import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./components/Home.jsx";
import Details from "./components/Details.jsx";

// This component simply renders a navigation bar
const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        My Pokédex
      </div>
    </nav>
  );
};

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<Details />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
