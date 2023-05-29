import closeIcon from "../images/symbols/close.svg";

function ImagePopup(props) {
  const { isOpen, onClose, card } = props;

  return (
    <>
      <div className={`show-picture ${isOpen ? "popup_is-opened" : ""}`}>
        <div className="show-picture__container">
          <button className="btn btn__close" onClick={onClose}>
            <img src={closeIcon} alt="close icon" className="btn__close-icon" />
          </button>
          <img
            src={card ? card.link : ""}
            alt={card ? card.name : ""}
            className="show-picture__image"
          />
          <p className="show-picture__text">{card ? card.name : ""}</p>
        </div>
      </div>
    </>
  );
}

export default ImagePopup;
