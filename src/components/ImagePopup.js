import closeIcon from "../images/symbols/close.svg";

function PopupWithForm() {
  return (
    <>
      <div className="show-picture">
        <div className="show-picture__container">
          <button className="btn btn__close">
            <img src={closeIcon} alt="close icon" className="btn__close-icon" />
          </button>
          <img src="#" alt="" className="show-picture__image" />
          <p className="show-picture__text"></p>
        </div>
      </div>
    </>
  );
}

export default PopupWithForm;
