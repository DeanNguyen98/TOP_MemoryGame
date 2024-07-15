import "../styles/EndModal.scss"
export default function WinModal({handleClick}) {
    return (
       <dialog open className="Modal">
            <div className="modal-content">
                <p>You win. Congratulations!?</p>
                <button onClick={handleClick}>Restart</button>
            </div>
       </dialog>
    )
}