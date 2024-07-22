import "../styles/EndModal.scss"
export default function EndModal({handleClick}) {
    return (
       <dialog open className="Modal">
            <div className="modal-content">
            <iframe src="https://giphy.com/embed/7SF5scGB2AFrgsXP63" className="giphy-embed"></iframe>
                <p>You lose. Try again?</p>
                <button onClick={handleClick}>Restart</button>
            </div>
       </dialog>
    )
}