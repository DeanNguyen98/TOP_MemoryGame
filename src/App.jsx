import { useState } from 'react';
import { useEffect } from 'react';
import { fetchData } from './components/PokemonAPI'
import "./App.scss";
import MainGame from './components/MainGame';
import EndModal from './components/EndModal';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [endCondition, setEndCondition] = useState(false);
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
  
   function gameReset() {
    setPokemonData((prevPokemonData) => {
      return prevPokemonData.map(pokemon => ({
        ...pokemon,
        isClicked: false
      }));
    })
   }

  function handleCardClicked (clicked) {
    if (clicked.isClicked === true){
      setEndCondition(true);
      setPlayerScore(0);
      gameReset();
    }
    else {
      setPokemonData(prevPokemonData => {
        return prevPokemonData.map(pokemon => {
          if (pokemon.id === clicked.id) {
            if (clicked.isClicked === false) {
              return {...pokemon, isClicked: true}
            }
          }
          return pokemon;
        })
      })
      setPlayerScore(playerScore + 1)
    }
  }
  return (
    <div className="main-container">
       <MainGame pokemonData={pokemonData} 
      playerScore={playerScore}
      highScore={highScore} 
      handleClick={handleCardClicked}
      />
      {endCondition &&  
        <EndModal/>
      }
    </div>
  )
}

export default App
