import "../styles/StartScreen.scss"
export default function StartScreen ({handleStartClick}) {
    return (
        <>
        <div className="start-screen Modal">
            <div className="start-menu">
            <button onClick={handleStartClick}>START GAME</button>
            </div>
        </div>
        </>
    )
}