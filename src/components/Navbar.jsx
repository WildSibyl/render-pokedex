import { Link } from "react-router";
import pokeballLogo from "../assets/pokeball_logo.png";
import favHeartSelected from "../assets/favheart_selected.png";

// This component simply renders a navigation bar
const Navbar = () => {
  return (
    <nav className="bg-gray-600 p-2 mb-4 flex flex-row justify-between sticky top-0 z-20 shadow-md">
      <Link to="/">
        <div className="pt-0.5 mx-3 flex flex-row">
          <img
            src={pokeballLogo}
            alt="Favorites icon"
            className="w-[30px] mr-2 "
          />
          <div className=" self-center text-white font-bold ">My Pokédex</div>
        </div>
      </Link>

      <div className="flex">
        <div className="flex border-3 border-gray-900 rounded-xl focus-within:border-gray-400">
          <input
            id="searchInput"
            className=" bg-gray-100 border-none focus:outline-none focus:ring-0 focus:border-transparent h-[30px] rounded-bl-lg rounded-tl-lg self-center text-center"
            type="text"
            placeholder="Search by name or ID"
          />
          <button
            id="searchButton"
            type="submit"
            className="bg-gray-600 rounded-br-lg rounded-tr-lg text-white  hover:border-gray-600 hover:border-l-gray-500 hover:bg-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
                d="M7 19a8 8 9 100-18 9 9 0 000 18zm8-1l10 10"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <Link to="/favorites">
        <div className="pt-0.5 mx-4 flex flex-row">
          <img
            src={favHeartSelected}
            alt="Favorites icon"
            className="w-[30px] ml-4 mr-2"
          />
          <div className=" self-center text-white font-bold ">Favorites</div>
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
