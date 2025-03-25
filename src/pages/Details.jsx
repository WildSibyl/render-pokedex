import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { usePokeId } from "../hooks/usePokeData";

const Details = () => {
  const { id } = useParams();
  console.log("Id:", id);
  const { pokemonId, loading, error } = usePokeId(id);

  if (loading) return <div>Loading pokemon data...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!pokemonId) return <div>Loading pokemon data...</div>;
    
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

    const getTypeColor2 = (types) => {
      if (types.length > 1) {
        const color = typeColors[types[1].type.name] || null;
        return color;
      }
      return null;
    };
  
    const bgColor = getTypeColor(pokemonId.types);
    const bgColor2 = getTypeColor2(pokemonId.types);
    
  return (
    <>
    <div id="pokemon-details" className="rounded-2xl shadow-md px-4 flex flex-col items-center text-center border-gray-400 border-solid border-2">
      <h2 className="text-xl font-bold bg-white rounded-lg w-[95%] py-1 mt-2">
        {pokemonId.name.charAt(0).toUpperCase() + pokemonId.name.slice(1)}
      </h2>
      <div className="overflow-hidden">
        <img
          className="bg-white rounded-lg p-4 transition duration-300 hover:scale-110"
          src={
            pokemonId.sprites.other["official-artwork"].front_default ||
            "placeholder.png"
          }
          alt={pokemonId.name}
        />
      </div>
      <p id="type" className="text-gray-900 bg-white rounded-lg mx-4 w-[95%]">
      ID: {String(pokemonId.id).padStart(3,"0")}
      </p>
      <div className="flex flex-row mb-4">
      <p className={`text-gray-900 rounded-lg mx-2 w-[95%]`}>
        Type:
      </p>
      <p className={`text-gray-900 ${bgColor} rounded-xl mx-2 px-2 w-[95%]`}>
          {pokemonId.types[0].type.name}
        </p>
        {pokemonId.types.length > 1 && (
          <p className={`text-gray-900 ${bgColor2} rounded-xl mx-2 px-2 w-[95%]`}>
            {pokemonId.types[1].type.name}
        </p>  
      )}
      </div>
    </div>
</>
  );
      
};

export default Details;

