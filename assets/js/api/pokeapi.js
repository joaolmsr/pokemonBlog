const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemons(limit, offset) {
    const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    return res.json();
}

export async function getPokemonDetails(url) {
    const res = await fetch(url);
    return res.json();
}