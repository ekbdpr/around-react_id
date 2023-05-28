import closeIcon from "../images/symbols/close.svg";

function ImagePopup(props) {
  return (
    <>
      <div className={`show-picture ${props.isOpen ? "popup_is-opened" : ""}`}>
        <div className="show-picture__container">
          <button className="btn btn__close" onClick={props.onClose}>
            <img src={closeIcon} alt="close icon" className="btn__close-icon" />
          </button>
          <img
            src={props.card ? props.card.link : ""}
            alt={props.card ? props.card.name : ""}
            className="show-picture__image"
          />
          <p className="show-picture__text">
            {props.card ? props.card.name : ""}
          </p>
        </div>
      </div>
    </>
  );
}

export default ImagePopup;
