import { useEffect, useState } from "react";
import Card from "./Card";

export default function MainGame(props) {
    const {pokemonData, handleClick, playerScore, highScore} = props;
    const [cardtoShow, setCardtoShow] = useState([]);
    useEffect(() => {
        if (pokemonData.length > 0) {
            shuffleCard();
        }
    }, [pokemonData]);

    function shuffleCard () {
        const shuffledList = [...pokemonData].sort(() => 0.5 - Math.random());
        setCardtoShow(shuffledList);
        console.log(shuffledList);
        console.log(cardtoShow);
    }
    return (
        <>
        <div className="score-ctn">
            <p>Score: {playerScore} </p>
            <p>High Score: {highScore}</p>
        </div>
        <div className="card-ctn">
        {cardtoShow.length > 0 && cardtoShow.map(card => {
                return <Card key={card.id} 
                pokemon={card}
                handleClick={() => {
                    handleClick(card)
                }}/>
            })}
        </div>
        <div className="goal-ctn">
            <p>{playerScore}/{pokemonData.length}</p>
        </div>
        </>
    )
}