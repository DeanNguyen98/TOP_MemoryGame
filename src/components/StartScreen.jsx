import "../styles/StartScreen.scss"
export default function StartScreen ({handleStartClick}) {
    return (
        <>
        <div className="start-screen Modal">
            <div className="start-menu">
            <button onClick={handleStartClick}>START GAME</button>
            </div>
            <div className="instructions">
            <p>Instruction: There are 9 randomly generated pokemons to catch. Try not to catch a pokemon twice. </p>
            <p>Let&apos;s catch them all, pokemon trainer</p>
            </div>
        </div>
        </>
    )
}