import { useEffect, useState } from "react";
import "../styles/MainGame.scss"
import Card from "./Card";


export default function MainGame(props) {
    const {pokemonData, handleClick, playerScore, highScore, flip} = props;
    const [cardtoShow, setCardtoShow] = useState([]);
    useEffect(() => {
        if (pokemonData.length > 0) {
            shuffleCard();
        }
    }, [pokemonData]);

    function shuffleCard () {
        const shuffledList = [...pokemonData].sort(() => 0.5 - Math.random());
        setCardtoShow(shuffledList);
    }

    return (
        <div className="MainGame-ctn">
        <div className="score-ctn">
            <p>Score: {playerScore} </p>
            <p>🏆 High Score: {highScore}</p>
        </div>
        <div className="card-ctn">
        {cardtoShow.length > 0 && cardtoShow.map(card => {
                return <Card key={card.id} 
                pokemon={card}
                handleClick={() => {
                    handleClick(card)
                }}
                flip={flip}/>
            })}
        </div>
        <div className="goal-ctn">
            <p>{playerScore}/{pokemonData.length}</p>
        </div>
        </div>
    )
}