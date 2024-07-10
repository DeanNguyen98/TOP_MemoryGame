import { useState } from 'react';
import { useEffect } from 'react';
import { fetchData } from './components/PokemonAPI'
import "./App.scss";
import MainGame from './components/MainGame';
import EndModal from './components/EndModal';
import StartScreen from './components/StartScreen';
import Loading from './components/Loading';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [endCondition, setEndCondition] = useState(false);
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    if (playerScore > highScore) setHighScore(playerScore);
  }, [playerScore, highScore]);

  const getPokemonData = async () => {
    setLoading(true);
    const data = await fetchData();
    setPokemonData(data);
    setLoading(false);
  }

  async function gameStart() {
    setStart(true);
    await getPokemonData()

  }
   function gameReset() {
    setPokemonData((prevPokemonData) => {
      return prevPokemonData.map(pokemon => ({
        ...pokemon,
        isClicked: false
      }));
    })
    setPlayerScore(0)
   }

  function handleCardClicked (clicked) {
    if (clicked.isClicked === true){
      setEndCondition(true);
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
      {!start ? (
        <StartScreen 
        handleStartClick={gameStart}/>
      ) : loading ? (
        <Loading />
      ) : (
        <MainGame pokemonData={pokemonData} 
      playerScore={playerScore}
      highScore={highScore} 
      handleClick={handleCardClicked}
      />
      )
      
    }
      {endCondition &&  
        <EndModal
        handleClick={()=> {
          gameReset();
          setEndCondition(false);
        }}
        />
      }
    </div>
  )
}

export default App
