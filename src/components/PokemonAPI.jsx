import { v4 as uuidv4 } from 'uuid';

const pokeAPI = `https://pokeapi.co/api/v2/pokemon?limit=150&offset=0`;

export const fetchData = async () => {
  try {
    const response = await fetch(pokeAPI);
    const data = await response.json();
    const selectedPokemon = [];
    while (selectedPokemon.length < 9) {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const selected = data.results.splice(randomIndex, 1)[0];
      if (selected) {
        selectedPokemon.push(selected);
      }
    }

    const promises = selectedPokemon.map(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemondata = await pokemonResponse.json();
      return {
        name: pokemon.name,
        url: pokemon.url,
        image: pokemondata.sprites.front_default,
        id: uuidv4(),
        isClicked: false
      }
    });

    const pokemonList = await Promise.all(promises);
    return pokemonList;
  } catch (error) {
    console.log('Error fetching data', error);
  }
};