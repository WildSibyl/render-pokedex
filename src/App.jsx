import { BrowserRouter, Link, Route, Routes } from "react-router";

import MainLayout from "./layout/Mainlayout.jsx";
import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";
import Favorites from "./pages/Favorites.jsx";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="pokemon/:id" element={<Details />} />
          <Route path="favorites" element={<Favorites />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
