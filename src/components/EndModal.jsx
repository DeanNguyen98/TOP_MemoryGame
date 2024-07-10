import "../styles/EndModal.scss"
export default function EndModal() {
    return (
       <dialog open className="endModal">
            <div className="modal-content">
                <p>You lose. Try again?</p>
                <button>Restart</button>
            </div>
       </dialog>
    )
}