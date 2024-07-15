import { useState } from 'react';
import { useEffect } from 'react';
import { fetchData } from './components/PokemonAPI'
import "./App.scss";
import MainGame from './components/MainGame';
import EndModal from './components/EndModal';
import StartScreen from './components/StartScreen';
import Loading from './components/Loading';
import WinModal from './components/WinModal';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [endCondition, setEndCondition] = useState("");
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const LOAD_TIME = 250;
  useEffect(() => {
    if (playerScore > highScore) setHighScore(playerScore);
  }, [playerScore, highScore]);
  
  useEffect(() => {
    if (!start) return;
    async function getPokemonData () {
      try {
        const data = fetchData();
        
        setLoading(true);
        
        await sleep(LOAD_TIME);

        setPokemonData(await data);
        
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch Pokemon data:', error);
      }
    }
    getPokemonData();
  }, [start])

  function gameStart() {
    setStart(true);
    console.log(pokemonData)
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
      setEndCondition("lose");
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
      setPlayerScore(prevScore => {
        const newScore = prevScore + 1;
        if (newScore === pokemonData.length) {
          setEndCondition("win");
        }
        return newScore;
      });
    }
  }

  return (
    <div className="main-container">
    {!start ? ( 
      <StartScreen handleStartClick={gameStart} />
    ) : loading ? ( 
      <Loading />
    ) : (
      <MainGame 
        pokemonData={pokemonData} 
        playerScore={playerScore}
        highScore={highScore} 
        handleClick={handleCardClicked}
      />
    )}
    {endCondition === "lose" && (
      <EndModal
      handleClick={() => {
        gameReset();
        setEndCondition('');
      }}
    />
    )}
    {endCondition === "win" && (
       <WinModal
       handleClick={() => {
         gameReset();
         setEndCondition('');
       }}
     />
    )}
  </div>
  )
}

export default App
