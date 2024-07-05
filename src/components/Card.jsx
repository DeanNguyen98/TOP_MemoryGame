export default function Card({ pokemon, handleClick }) {
    return (
      <>
        <div className="card">
          <button onClick={handleClick}>
            <img src={pokemon.image} alt={pokemon.name} className="card-image"></img>
            <p className="card-name">{pokemon.name}</p>
          </button>
        </div>
      </>
    )
}