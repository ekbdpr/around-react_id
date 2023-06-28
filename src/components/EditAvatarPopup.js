import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;

  const avatarRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <>
      <PopupWithForm
        name="profile-picture"
        title="Ubah foto profil"
        isOpen={isOpen}
        onClose={onClose}
      >
        <form className="form" noValidate onSubmit={handleSubmit}>
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
            Simpan
          </button>
        </form>
      </PopupWithForm>
    </>
  );
}

export default EditAvatarPopup;
