
import "../styles/MainGame.scss"
import Card from "./Card";


export default function MainGame(props) {
    const {pokemonData, handleClick, playerScore, highScore, flip} = props;   
    return (
        <div className="MainGame-ctn">
        <div className="score-ctn">
            <p>Score: {playerScore} </p>
            <p>🏆 High Score: {highScore}</p>
        </div>
        <div className="card-ctn">
        {pokemonData.length > 0 && pokemonData.map(card => {
                return <Card key={card.id} 
                pokemon={card}
                handleClick={() => {
                    handleClick(card);
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