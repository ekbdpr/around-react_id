import { useContext, useEffect, useState } from "react";

import PopupWithForm from "./PopupWithForm";

import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  };

  useEffect(() => {
    setName(currentUser.name ?? "");
    setDescription(currentUser.about ?? "");
  }, [currentUser]);

  return (
    <>
      <PopupWithForm
        name="edit-profile"
        title="Edit Profil"
        isOpen={isOpen}
        onClose={onClose}
      >
        <form className="form" noValidate onSubmit={handleSubmit}>
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
            Simpan
          </button>
        </form>
      </PopupWithForm>
    </>
  );
}

export default EditProfilePopup;
