import { useEffect, useState } from "react";
import { Link } from "react-router";
import { usePokeData } from "../hooks/usePokeData";

const Home = () => {
  const { pokemonList, loading, error } = usePokeData(); // Get all 150 Pokémon
  const [pokemonData, setPokemonData] = useState([]);

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

  return (
    <div
      id="pokemon-container"
      className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4"
    >
      {pokemonData.map((pokemon) => (
        <div
          key={pokemon.id}
          className="rounded-2xl shadow-md px-4 flex flex-col items-center text-center border-gray-400 border-solid border-2 hover:cursor-pointer group"
        >
            <Link
              to={`/pokemon/${pokemon.id}`}
            >
          <h2 className="text-xl font-bold bg-white rounded-lg w-[95%] py-1 mt-2 z-10">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h2>
          <div className="overflow-hidden">
            <img
              className="bg-white rounded-lg p-4 transition duration-300 group-hover:scale-110 z-0"
              src={
                pokemon.sprites.other["official-artwork"].front_default ||
                "placeholder.png"
              }
              alt={pokemon.name}
            />
          </div>
          <p className="text-gray-900 bg-white rounded-lg mx-4 w-[95%] z-10 mb-4">
            # {String(pokemon.id).padStart(3, "0")}
          </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
