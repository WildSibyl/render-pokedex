import { useState } from "react";
import { Link } from "react-router";
import { useFavePoke } from "../hooks/useFavePoke";
import favHeartUnselected from "../assets/favheart_unselected.png";
import favHeartHovered from "../assets/favheart_hovered.png";
import favHeartSelected from "../assets/favheart_selected.png";
import Diary from "../components/Diary";

const Favorites = () => {
  const { favorites, addToFavorites } = useFavePoke();

  return (
    <>
      <div id="filter-bar" className=""></div>
      <div id="favorite-container" className="grid grid-col gap-4">
        {favorites.map((pokemon) => {
          const isFavorite = favorites.some((fav) => fav.id === pokemon.id);
          const [hovered, setHovered] = useState(false);

          const handleMouseEnter = () => {
            if (!isFavorite) {
              setHovered(true);
            }
          };

          const handleMouseLeave = () => {
            if (!isFavorite) {
              setHovered(false);
            }
          };

          const favBtnState = isFavorite
            ? favHeartSelected
            : hovered
            ? favHeartHovered
            : favHeartUnselected;

          return (
            <div
              key={pokemon.id}
              className="rounded-2xl shadow-md px-4 flex flex-row items-center text-center border-gray-400 border-solid border-2 "
            >
              <Link
                to={`/pokemon/${pokemon.id}`}
                className="hover:cursor-pointer group"
              >
                <h2 className="text-xl font-bold w-[95%] py-1 mt-2 z-10">
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </h2>
                <div className=" overflow-hidden">
                  <img
                    className="rounded-lg p-4 transition duration-300 group-hover:scale-110 z-0"
                    src={pokemon.image || "placeholder.png"}
                    alt={pokemon.name}
                  />
                </div>
              </Link>
              <div className="flex flex-row w-full h-full py-4">
                <div className="flex flex-row w-full">
                  <Diary />
                </div>
                <button
                  onClick={() => addToFavorites(pokemon)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="w-[30px] z-30 cursor-pointer flex-end self-start ml-4"
                >
                  <img src={favBtnState} alt="Favorite button" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Favorites;
