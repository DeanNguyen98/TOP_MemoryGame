import "../styles/EndModal.scss"
export default function WinModal({handleClick}) {
    return (
       <dialog open className="Modal">
            <div className="modal-content">
            <iframe src="https://giphy.com/embed/13G7hmmFr9yuxG" className="giphy-embed"></iframe>
                <p>You win. Congratulations!!!</p>
                <button onClick={handleClick}>Catch some more?</button>
            </div>
       </dialog>
    )
}