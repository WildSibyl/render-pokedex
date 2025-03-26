import { useState } from "react";
import { Link } from "react-router";
import { useFavePoke } from "../hooks/useFavePoke";
import favHeartUnselected from "../assets/favheart_unselected.png";
import favHeartHovered from "../assets/favheart_hovered.png";
import favHeartSelected from "../assets/favheart_selected.png";

const Favorites = () => {
  const { favorites, addToFavorites } = useFavePoke();

  return (
    <div
      id="favorite-container"
      className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4"
    >
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
            className="rounded-2xl shadow-md px-4 flex flex-col items-center text-center border-gray-400 border-solid border-2 hover:cursor-pointer group"
          >
            <Link to={`/pokemon/${pokemon.id}`}>
              <h2 className="text-xl font-bold bg-white rounded-lg w-[95%] py-1 mt-2 z-10">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h2>
              <div className="overflow-hidden">
                <img
                  className="rounded-lg p-4 transition duration-300 group-hover:scale-110 z-0"
                  src={pokemon.image || "placeholder.png"}
                  alt={pokemon.name}
                />
              </div>
            </Link>
            <div className="flex flex-row w-full">
              <Link to={`/pokemon/${pokemon.id}`}>
                <p className="text-gray-900 rounded-lg flex-grow flex-1 px-4 z-10">
                  # {String(pokemon.id).padStart(3, "0")}
                </p>
              </Link>

              <Link to={`/pokemon/${pokemon.id}`} className="flex-grow">
                <div className="p-2"></div>
              </Link>

              <div className="flex flex-row">
                <button
                  onClick={() => addToFavorites(pokemon)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="w-[20px] z-30 cursor-pointer"
                >
                  <img src={favBtnState} alt="Favorite button" />
                </button>

                <Link to={`/pokemon/${pokemon.id}`}>
                  <div className="p-2"></div>
                </Link>
              </div>
            </div>
            <Link to={`/pokemon/${pokemon.id}`} className="w-full">
              <div className="p-2"></div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Favorites;
