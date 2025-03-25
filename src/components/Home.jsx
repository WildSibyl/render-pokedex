const Home = () => {
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

    const typeColors = {
      fire: "red-400",
      water: "blue-400",
      grass: "green-400",
      electric: "yellow-300",
      psychic: "purple-400",
      ice: "cyan-400",
      fighting: "orange-400",
      poison: "purple-500",
      ground: "yellow-500",
      flying: "indigo-400",
      bug: "green-600",
      rock: "gray-400",
      ghost: "indigo-600",
      dragon: "indigo-200",
      dark: "gray-700",
      steel: "gray-400",
      fairy: "pink-200",
      normal: "gray-300",
    };

    const getTypeGradient = (types) => {
      const primaryType = typeColors[types[0].type.name] || "gray-300";
      const secondaryType = types[1] ? typeColors[types[1].type.name] : null;

      return secondaryType
        ? `bg-gradient-to-b from-${primaryType} to-${secondaryType}`
        : `bg-${primaryType}`;
    };

    pokemonData.forEach((pokemon) => {
      if (pokemon) {
        const backgroundColor = getTypeGradient(pokemon.types);

        const pokeCard = document.createElement("div");
        pokeCard.classList.add(...backgroundColor.split(" ")); // Apply dynamic gradient or solid color
        pokeCard.classList.add(
          "rounded-2xl",
          "shadow-md",
          "p-4",
          "flex",
          "flex-col",
          "items-center",
          "text-center",
          "border-yellow-400",
          "border-solid",
          "border-8"
        );

        const pokeImage = document.createElement("img");
        pokeImage.classList.add(
          "bg-white",
          "rounded-lg",
          "p-4",
          "w-[95%]",
          "border-grey-500",
          "border-solid",
          "border-4"
        );
        pokeImage.src = pokemon.sprites.front_default || "placeholder.png";
        pokeImage.alt = pokemon.name;

        const pokeName = document.createElement("h2");
        pokeName.classList.add(
          "text-xl",
          "font-bold",
          "bg-white",
          "rounded-lg",
          "w-[95%]",
          "py-1",
          "mb-4"
        );
        pokeName.textContent =
          pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

        const pokeInfo = document.createElement("p");
        pokeInfo.textContent = `ID: ${pokemon.id} | Type: ${pokemon.types
          .map((typeInfo) => typeInfo.type.name)
          .join(", ")}`;
        pokeInfo.classList.add(
          "text-gray-600",
          "font-bold",
          "bg-white",
          "rounded-lg",
          "m-4",
          "p-4",
          "w-[95%]",
          "border-grey-500",
          "border-solid",
          "border-4"
        );

        pokeCard.appendChild(pokeName);
        pokeCard.appendChild(pokeImage);
        pokeCard.appendChild(pokeInfo);
        pokeGrid.appendChild(pokeCard);
      }
    });
  };

  displayPokemon();

  return (
    <div
      id="pokemon-container"
      class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4"
    ></div>
  );
};

export default Home;
