import { useState, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import FormValidator from "./FormValidator";

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlaceSubmit } = props;

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setLink("");
      setIsLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const validation = new FormValidator(formRef.current);

    validation.enableValidation();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleAddPlaceSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

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
        <form
          ref={formRef}
          className="form"
          noValidate
          onSubmit={handleAddPlaceSubmit}
        >
          <input
            type="text"
            name="title"
            id="add-card-title"
            className="form__input"
            placeholder="Judul"
            minLength="2"
            maxLength="30"
            value={title}
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
            value={link}
            onChange={handleLinkChange}
            required
          />
          <div className="form__text-container">
            <span className="form__input-error add-card-link-error"></span>
          </div>
          <button type="submit" className="btn btn__submit">
            {isLoading ? "Menyimpan..." : "Buat"}
          </button>
        </form>
      </PopupWithForm>
    </>
  );
}

export default AddPlacePopup;
