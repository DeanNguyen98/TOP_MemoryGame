import { useState } from 'react';
import { useEffect } from 'react';
import { fetchData } from './components/PokemonAPI'
import "./App.scss";
import MainGame from './components/MainGame';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  useEffect(() => {
    const getPokemonData = async () => {
      const data = await fetchData();
      setPokemonData(data);
    }
    getPokemonData();
  }, []);
  function handleCardClicked (clicked) {
    pokemonData.find(pokemon => {
      if (pokemon.id === clicked.id) {
        if (!clicked.isClicked) {
          pokemon.isClicked = true;
          console.log(pokemonData);
          setPlayerScore(playerScore+1);
        } else {
          alert('you lose, try again');
        }
      }
    })
  }
  console.log(playerScore);
  return (
    <>
      <MainGame pokemonData={pokemonData} handleClicked={handleCardClicked} />
    </>
  )
}

export default App
