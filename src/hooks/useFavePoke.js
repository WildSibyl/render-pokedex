import { useState } from "react";
import favHeartUnselected from "../assets/favheart_unselected.png";
import favHeartHovered from "../assets/favheart_hovered.png";
import favHeartSelected from "../assets/favheart_selected.png";

export const useFavePoke = () => {
  const [favorites, setFavorites] = useState(() => {
    let favorites = JSON.parse(localStorage.getItem("pokeArray")) || [];
    return favorites;
  });

  console.log("pokeArray created");

  const addToFavorites = (pokemon) => {
    let updatedFavorites = [...favorites];

    // Create an object with necessary Pokémon details
    const pokemonData = {
      id: pokemon.id,
      name: pokemon.name,
      image:
        pokemon.sprites.other["official-artwork"].front_default ||
        pokemon.sprites.front_default,
      type: pokemon.types.map((t) => t.type.name).join(", "),
      hp: pokemon.stats[0].base_stat,
      attack: pokemon.stats[1].base_stat,
      defense: pokemon.stats[2].base_stat,
      speed: pokemon.stats[5].base_stat,
    };
    console.log("pokemonData Fav:", pokemonData);

    // Check if Pokémon is already in favorites
    const exists = updatedFavorites.some((fav) => fav.id === pokemon.id);

    if (!exists) {
      updatedFavorites.push(pokemonData);
      // heartselected
    } else {
      updatedFavorites = updatedFavorites.filter(
        (fav) => fav.id !== pokemon.id
      ); // Remove if already favorited
      // heartunselected
    }

    // Save back to localStorage
    localStorage.setItem("pokeArray", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites); // setting the state to the updated version with the new pokemon that was just added and triggers the rerender
  };

  return { favorites, addToFavorites }; //updatedFavorites becomes favorites again and it calls the function
};
