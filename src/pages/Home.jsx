import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const pokeGrid = document.getElementById("pokemon-container");

    // Fetch the first 150 Pokémon list (names & URLs)
    const fetchPokemonList = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0"
        );
        const data = await response.json();
        return data.results; // Returns an array of Pokémon objects with name & URL
      } catch (error) {
        console.error("Error fetching Pokémon list", error);
      }
    };

    // Fetch detailed data for a single Pokémon using its URL
    const fetchPokemonDetails = async (url) => {
      try {
        const response = await fetch(url);
        return await response.json();
      } catch (error) {
        console.error("Error fetching Pokémon details", error);
      }
    };

    // Function to display Pokémon cards
    const displayPokemon = async () => {
      const pokemonList = await fetchPokemonList(); // Get all 150 Pokémon
      const pokemonPromises = pokemonList.map((pokemon) =>
        fetchPokemonDetails(pokemon.url)
      );
      const pokemonData = await Promise.all(pokemonPromises); // Fetch all details in parallel

      pokemonData.forEach((pokemon) => {
        if (pokemon) {
          const pokeCard = document.createElement("div");
          pokeCard.classList.add(
            "rounded-2xl",
            "shadow-md",
            "px-4",
            "flex",
            "flex-col",
            "items-center",
            "text-center",
            "border-gray-400",
            "border-solid",
            "border-2",
            "hover:cursor-pointer",
            "group"
          );

          const pokeImageContainer = document.createElement("div");
          pokeImageContainer.classList.add("overflow-hidden");

          const pokeImage = document.createElement("img");
          pokeImage.classList.add(
            "bg-white",
            "rounded-lg",
            "p-4",
            "transition",
            "duration-300",
            "group-hover:scale-110",
            "z-0"
          );
          pokeImage.src =
            pokemon.sprites.other["official-artwork"].front_default ||
            "placeholder.png";
          pokeImage.alt = pokemon.name;

          const pokeName = document.createElement("h2");
          pokeName.classList.add(
            "text-xl",
            "font-bold",
            "bg-white",
            "rounded-lg",
            "w-[95%]",
            "py-1",
            "mt-2",
            "z-10"
          );
          pokeName.textContent =
            pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

          const pokeInfo = document.createElement("p");
          pokeInfo.textContent = `# ${String(pokemon.id).padStart(3,"0")}`;
          pokeInfo.classList.add(
            "text-gray-900",
            "bg-white",
            "rounded-lg",
            "mx-4",
            "w-[95%]",
            "z-10",
            "mb-4"
          );

          pokeImageContainer.appendChild(pokeImage);
          pokeCard.appendChild(pokeName);
          pokeCard.appendChild(pokeImage);
          pokeCard.appendChild(pokeInfo);
          pokeGrid.appendChild(pokeCard);
        }
      });
    };

    displayPokemon();
  }, []);

  return (
    <>
      <div
        id="pokemon-container"
        className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4"
      ></div>
    </>
  );
};

export default Home;
