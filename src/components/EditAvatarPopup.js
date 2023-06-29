import { useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import FormValidator from "./FormValidator";

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;

  const [isLoading, setIsLoading] = useState(false);

  const avatarRef = useRef("");
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  useEffect(() => {
    if (!isOpen) {
      avatarRef.current.value = "";
      setIsLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const validation = new FormValidator(formRef.current);

    validation.enableValidation();
  }, []);

  return (
    <>
      <PopupWithForm
        name="profile-picture"
        title="Ubah foto profil"
        isOpen={isOpen}
        onClose={onClose}
      >
        <form ref={formRef} className="form" noValidate onSubmit={handleSubmit}>
          <input
            type="url"
            name="link"
            id="profile-picture-link"
            className="form__input"
            placeholder="Tautan gambar"
            ref={avatarRef}
            required
          />
          <div className="form__text-container">
            <span className="form__input-error profile-picture-link-error"></span>
          </div>
          <button type="submit" className="btn btn__submit">
            {isLoading ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </PopupWithForm>
    </>
  );
}

export default EditAvatarPopup;
