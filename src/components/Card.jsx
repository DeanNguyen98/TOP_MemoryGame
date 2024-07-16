export default function Card({ pokemon, handleClick, flip }) {
    return (
      <>
        <div className={`card ${flip ? "flip" : ""}`}>
          {/* card-front */}
          <div className="card-front">
            <button onClick={handleClick}>
              <img src={pokemon.image} alt={pokemon.name} className="card-image"></img>
              <p className="card-name">{pokemon.name}</p>
            </button>
          </div>
          {/*card-back*/}
          <div className="card-back">
            <img src="../../public/cardBack.jpg"></img>
          </div>
        </div>
      </>
    )
}