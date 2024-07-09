import { useState } from 'react';
import { useEffect } from 'react';
import { fetchData } from './components/PokemonAPI'
import "./App.scss";
import MainGame from './components/MainGame';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  useEffect(() => {
    const getPokemonData = async () => {
      const data = await fetchData();
      setPokemonData(data);
    }
    getPokemonData();
  }, []);

  useEffect(() => {
    if (playerScore > highScore) setHighScore(playerScore);
  }, [playerScore, highScore]);
  
  //  function gameReset() {
  //   setPokemonData((prevPokemonData) => {
  //     return prevPokemonData.map(pokemon => ({
  //       ...pokemon,
  //       isClicked: false
  //     }));
  //   })
  //  }

  function handleCardClicked (clicked) {
    setPokemonData(prevPokemonData => {
      return prevPokemonData.map(pokemon => {
        if (pokemon.id === clicked.id) {
          if (!clicked.isClicked) {
            setPlayerScore(playerScore + 1)
            return {...pokemon, isClicked: true}
          }
          else {
            alert(" You lose");
            setPlayerScore(0);
          }
        }
        return pokemon;
      })
    })
  }
  return (
    <>
      <MainGame pokemonData={pokemonData} 
      playerScore={playerScore}
      highScore={highScore} 
      handleClick={handleCardClicked}
      />
    </>
  )
}

export default App
