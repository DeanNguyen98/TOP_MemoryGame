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
  const [flip, setAllFlip] = useState(false);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const LOAD_TIME = 1050;
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
    setStart(false);
   }

   function shuffleCard() {
    const availableCards = [...pokemonData];
    const shuffledPokemons = [];
    while (availableCards.length) {
      const index = Math.floor(Math.random() * availableCards.length);
      const card = availableCards[index];
      shuffledPokemons.push(card);
      availableCards.splice(index, 1);
    }
    setPokemonData(shuffledPokemons);
  }

  function updateCardsClicked(id) {
    const cardIndex = pokemonData.findIndex(pokemon => pokemon.id === id);   
    const newPokemonData = [...pokemonData];
    newPokemonData[cardIndex].isClicked = true;  
    setPokemonData(newPokemonData);
  }

  function handleCardClicked(clicked) {
    if (clicked.isClicked === true) {
      setEndCondition("lose");
      return;
    }
    setAllFlip(true);
    updateCardsClicked(clicked.id);
    setPlayerScore(prevScore => {
      const newScore = prevScore + 1;
      if (newScore === pokemonData.length) {
        setEndCondition("win");
      }
      return newScore;
    });
    setTimeout(() => {
      shuffleCard();
      setTimeout(() => {
        setAllFlip(false)
      },200)
    }, 800);
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
        setPokemonData={setPokemonData}
        playerScore={playerScore}
        highScore={highScore} 
        handleClick={handleCardClicked}
        flip={flip}
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
