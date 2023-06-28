import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const { isOpen, onClose } = props;
  return (
    <>
      <PopupWithForm
        name="add-card"
        title="Tempat baru"
        isOpen={isOpen}
        onClose={onClose}
      >
        <form className="form" noValidate>
          <input
            type="text"
            name="title"
            id="add-card-title"
            className="form__input"
            placeholder="Judul"
            minLength="2"
            maxLength="30"
            required
          />
          <div className="form__text-container">
            <span className="form__input-error add-card-title-error"></span>
          </div>
          <input
            type="url"
            name="link"
            id="add-card-link"
            className="form__input"
            placeholder="Tautan gambar"
            required
          />
          <div className="form__text-container">
            <span className="form__input-error add-card-link-error"></span>
          </div>
          <button type="submit" className="btn btn__submit">
            Buat
          </button>
        </form>
      </PopupWithForm>
    </>
  );
}

export default AddPlacePopup;
