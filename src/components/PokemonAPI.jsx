import { v4 as uuidv4 } from 'uuid';

const pokeAPI = `https://pokeapi.co/api/v2/pokemon?limit=9&offset=1000`
export const fetchData = async () => {
    try {
      const response = await fetch(pokeAPI);
      const data = await response.json();
      const promises = data.results.map(async (pokemon) => {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemondata = await pokemonResponse.json();
        return {
          name: pokemon.name,
          url: pokemon.url,
          image: pokemondata.sprites.front_default,
          id: uuidv4()
        }
      })
      const pokemonList = await Promise.all(promises);
      return pokemonList;
    } catch (error) {
      console.log('Error fetching data', error);
    }
  } 