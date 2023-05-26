import closeIcon from "../images/symbols/close.svg";

function PopupWithForm(props) {
  return (
    <>
      <div className={`${props.name} ${props.isOpen ? "popup_is-opened" : ""}`}>
        <div className={`${props.name}__container`}>
          <button className="btn btn__close" onClick={props.onClose}>
            <img src={closeIcon} alt="close icon" className="btn__close-icon" />
          </button>
          <span className="form__title">{props.title}</span>
          <form className="form" noValidate>
            {props.children}
          </form>
          <button type="submit" className="btn btn__submit">
            {props.saveButton}
          </button>
        </div>
      </div>
    </>
  );
}

export default PopupWithForm;
