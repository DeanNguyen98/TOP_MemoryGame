import { useEffect, useState } from "react";
import Card from "./Card";

export default function MainGame(props) {
    const {pokemonData, handleClicked} = props;
    const [cardtoShow, setCardtoShow] = useState([]);
    useEffect(() => {
        if (pokemonData.length > 0) {
            setCardtoShow(pokemonData.slice(0,5));
        }
    },[pokemonData])

    function shuffleCard () {
        const shuffledList = [...pokemonData].sort(() => 0.5 - Math.random());
        setCardtoShow(shuffledList.slice(0,5));
    }
    function onCardClicked(clicked) {
        handleClicked(clicked);
        shuffleCard();
    }
    return (
        <>
            {cardtoShow.length > 0 && cardtoShow.map(card => {
                return <Card key={card.id} 
                pokemon={card}
                handleClick={() => {
                    onCardClicked(card)
                }}/>
            })}
        </>
    )
}