import React from "react";
import closeIcon from "../images/symbols/close.svg";

function PopupWithForm(props) {
  const { isOpen, onClose, name, title, children, saveButton } = props;

  return (
    <>
      <div className={`${name} ${isOpen ? "popup_is-opened" : ""}`}>
        <div className={`${name}__container`}>
          <button className="btn btn__close" onClick={onClose}>
            <img src={closeIcon} alt="close icon" className="btn__close-icon" />
          </button>
          <span className="form__title">{title}</span>
          {children}
          <button type="submit" className="btn btn__submit">
            {saveButton}
          </button>
        </div>
      </div>
    </>
  );
}

export default PopupWithForm;
