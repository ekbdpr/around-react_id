import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlaceSubmit } = props;

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleAddPlaceSubmit = (e) => {
    e.preventDefault();

    onAddPlaceSubmit({ name: title, link });
  };
  return (
    <>
      <PopupWithForm
        name="add-card"
        title="Tempat baru"
        isOpen={isOpen}
        onClose={onClose}
      >
        <form className="form" noValidate onSubmit={handleAddPlaceSubmit}>
          <input
            type="text"
            name="title"
            id="add-card-title"
            className="form__input"
            placeholder="Judul"
            minLength="2"
            maxLength="30"
            onChange={handleTitleChange}
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
            onChange={handleLinkChange}
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
