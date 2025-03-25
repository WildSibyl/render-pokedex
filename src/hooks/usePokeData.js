import {useState, useEffect} from 'react';

export const usePokeData = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150&offset=0");
                const data = await response.json();
                setPokemonList(data.results);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchPokemonList();
    }
    , []);

    return {pokemonList, loading, error};
}

export const usePokeId = (pokeId) => {
    const [pokemonId, setPokemonId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemonId = async () => {
            if (!pokeId) return;

            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
                const data = await response.json();
                setPokemonId(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchPokemonId();
    }
    , [pokeId]);

    return {pokemonId, loading, error};
}


