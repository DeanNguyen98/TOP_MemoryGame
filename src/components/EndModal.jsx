import "../styles/EndModal.scss"
export default function EndModal({handleClick}) {
    return (
       <dialog open className="endModal">
            <div className="modal-content">
                <p>You lose. Try again?</p>
                <button onClick={handleClick}>Restart</button>
            </div>
       </dialog>
    )
}