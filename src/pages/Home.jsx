import { useEffect, useState } from "react";
import { Link } from "react-router";
import { usePokeData } from "../hooks/usePokeData";
import { useFavePoke } from "../hooks/useFavePoke";
import favHeartUnselected from "../assets/favheart_unselected.png";
import favHeartHovered from "../assets/favheart_hovered.png";
import favHeartSelected from "../assets/favheart_selected.png";

console.log("useFavePoke:", { useFavePoke });

const Home = () => {
  const { pokemonList, loading, error } = usePokeData(); // Get all 150 Pokémon
  const [pokemonData, setPokemonData] = useState([]);

  const { addToFavorites } = useFavePoke();

  useEffect(() => {
    console.log("pokemonList:", pokemonList);

    // Function to fetch Pokémon details
    const fetchPokemonDetails = async (url) => {
      try {
        const response = await fetch(url);
        return await response.json();
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        return null;
      }
    };

    // Function to display Pokémon cards
    const displayPokemon = async () => {
      console.log("displayPokemon called");

      if (!Array.isArray(pokemonList)) return; // Ensure pokemonList is an array

      const pokemonPromises = pokemonList.map((pokemon) =>
        fetchPokemonDetails(pokemon.url)
      );
      const pokemonData = await Promise.all(pokemonPromises); // Fetch all details in parallel

      console.log("pokemonData:", pokemonData);
      setPokemonData(pokemonData);
    };

    if (Array.isArray(pokemonList) && pokemonList.length > 0) {
      console.log("Calling displayPokemon"); // Debugging: Check if condition is met
      displayPokemon();
    } else {
      console.log("pokemonList is not an array or is empty"); // Debugging: Check if condition is not met
    }
  }, [pokemonList]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const favBtnState = favHeartUnselected;

  return (
    <div
      id="pokemon-container"
      className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4"
    >
      {pokemonData.map((pokemon) => (
        <div
          key={pokemon.id}
          className="rounded-2xl shadow-md flex flex-col items-center text-center border-gray-400 border-solid border-2 hover:cursor-pointer group"
        >
          <Link to={`/pokemon/${pokemon.id}`}>
            <h2 className="text-xl font-bold bg-white rounded-lg w-[95%] py-1 mt-2 z-10">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h2>
            <div className="overflow-hidden">
              <img
                className="rounded-lg p-4 transition duration-300 group-hover:scale-110 z-0"
                src={
                  pokemon.sprites.other["official-artwork"].front_default ||
                  "placeholder.png"
                }
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
                className="w-[20px] z-10 cursor-pointer"
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
      ))}
    </div>
  );
};

export default Home;
