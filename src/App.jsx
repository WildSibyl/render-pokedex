import { BrowserRouter, Link, Route, Routes } from "react-router";

import MainLayout from "./layout/Mainlayout.jsx";
import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="pokemon/:id" element={<Details />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
