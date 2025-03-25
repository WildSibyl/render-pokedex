import { useState } from "react";

const Details = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
   
    const pokemonDisplayed = pokemonList.map((pokemon) =>
      fetchPokemonDetails(pokemon.url)
    );
    
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
          "border-2"
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
          "hover:scale-110"
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
          "mt-2"
        );
        pokeName.textContent =
          pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

        const pokeInfo = document.createElement("p");
        pokeInfo.textContent = `ID: ${pokemon.id} | Type: ${pokemon.types
          .map((typeInfo) => typeInfo.type.name)
          .join(", ")}`;
        pokeInfo.classList.add(
          "text-gray-900",
          "bg-white",
          "rounded-lg",
          "mx-4",
          "w-[95%]"
        );

        
        const typeColors = {
          fire: "bg-red-400",
          water: "bg-blue-400",
          grass: "bg-green-400",
          electric: "bg-yellow-300",
          psychic: "bg-purple-400",
          ice: "bg-cyan-400",
          fighting: "bg-orange-400",
          poison: "bg-purple-500",
          ground: "bg-yellow-500",
          flying: "bg-indigo-400",
          bug: "bg-green-600",
          rock: "bg-gray-400",
          ghost: "bg-indigo-600",
          dragon: "bg-indigo-200",
          dark: "bg-gray-700",
          steel: "bg-gray-400",
          fairy: "bg-pink-200",
          normal: "bg-gray-300",
        };
        
        const getTypeColor = (types) => {
          const color = typeColors[types[0].type.name] || "gray-300";
          return color;
        };
        
        const backgroundColor = getTypeColor(pokemon.types);
        
        pokeImageContainer.appendChild(pokeImage);
        pokeCard.appendChild(pokeName);
        pokeCard.appendChild(pokeImage);
        pokeCard.appendChild(pokeInfo);
        pokeGrid.appendChild(pokeCard);
      }

        return (
          <>
      <div id="pokemon-details" className="font-bold"></div>
    </>
  );
};

export default Details;
