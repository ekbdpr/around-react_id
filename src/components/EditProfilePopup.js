import { useContext, useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import FormValidator from "./FormValidator";

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const currentUser = useContext(CurrentUserContext);
  const formRef = useRef(null);

  useEffect(() => {
    setName(currentUser.name ?? "");
    setDescription(currentUser.about ?? "");
    setIsLoading(false);
  }, [currentUser]);

  useEffect(() => {
    const validation = new FormValidator(formRef.current);

    validation.enableValidation();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <>
      <PopupWithForm
        name="edit-profile"
        title="Edit Profil"
        isOpen={isOpen}
        onClose={onClose}
      >
        <form ref={formRef} className="form" noValidate onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            id="edit-profile-name"
            className="form__input"
            placeholder="Nama"
            minLength="2"
            maxLength="40"
            value={name ?? ""}
            onChange={handleNameChange}
            required
          />
          <div className="form__text-container">
            <span className="form__input-error edit-profile-name-error"></span>
          </div>
          <input
            type="text"
            name="title"
            id="edit-profile-title"
            className="form__input"
            placeholder="Tentang saya"
            minLength="2"
            maxLength="200"
            value={description ?? ""}
            onChange={handleDescriptionChange}
            required
          />
          <div className="form__text-container">
            <span className="form__input-error edit-profile-title-error"></span>
          </div>
          <button type="submit" className="btn btn__submit">
            {isLoading ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </PopupWithForm>
    </>
  );
}

export default EditProfilePopup;
