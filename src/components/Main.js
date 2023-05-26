import profileImage from "../images/symbols/edit_symbol.svg";
import editIcon from "../images/symbols/pencil_symbol.svg";
import addCardIcon from "../images/symbols/plus_symbol.svg";
import PopupWithForm from "./PopupWithForm";

function Main(props) {
  return (
    <>
      <main>
        <PopupWithForm
          name="edit-profile"
          title="Edit Profil"
          saveButton="Simpan"
          isOpen={props.isEditProfilePopupOpen}
          onClose={props.onCloseClick}
        >
          <input
            type="text"
            name="name"
            id="edit-profile-name"
            className="form__input"
            placeholder="Nama"
            minLength="2"
            maxLength="40"
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
            required
          />
          <div className="form__text-container">
            <span className="form__input-error edit-profile-title-error"></span>
          </div>
        </PopupWithForm>
        <PopupWithForm
          name="add-card"
          title="Tempat baru"
          saveButton="Buat"
          isOpen={props.isAddPlacePopupOpen}
          onClose={props.onCloseClick}
        >
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
        </PopupWithForm>
        <PopupWithForm
          name="profile-picture"
          title="Ubah foto profil"
          saveButton="Simpan"
          isOpen={props.isEditAvatarPopupOpen}
          onClose={props.onCloseClick}
        >
          <input
            type="url"
            name="link"
            id="profile-picture-link"
            className="form__input"
            placeholder="Tautan gambar"
            required
          />
          <div className="form__text-container">
            <span className="form__input-error profile-picture-link-error"></span>
          </div>
        </PopupWithForm>
        <PopupWithForm
          name="del-confirm"
          title="Apakah Anda yakin?"
          saveButton="Ya"
        />
        <div className="profile">
          <button className="btn btn_profile" onClick={props.onEditAvatarClick}>
            <img src="#" alt="user profile" className="profile__picture" />
            <img
              src={profileImage}
              alt="profile edit"
              className="profile__picture-edit"
            />
          </button>
          <div className="profile__info">
            <p className="profile__username"></p>
            <p className="profile__about"></p>
            <button className="btn btn_edit" onClick={props.onEditProfileClick}>
              <img src={editIcon} alt="edit button" />
            </button>
          </div>
          <button className="btn btn_add" onClick={props.onAddPlaceClick}>
            <img src={addCardIcon} alt="add button" />
          </button>
        </div>
        <ul className="element"></ul>
      </main>
    </>
  );
}

export default Main;
