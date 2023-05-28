import React from "react";
import profileImage from "../images/symbols/edit_symbol.svg";
import editIcon from "../images/symbols/pencil_symbol.svg";
import addCardIcon from "../images/symbols/plus_symbol.svg";
import api from "../utils/api";
import PopupWithForm from "./PopupWithForm";
import Card from "./Card";
import ImagePopup from "./ImagePopup";

function Main(props) {
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cardList, setCardList] = React.useState([]);

  React.useEffect(() => {
    api.getInitialInfo().then(([cards, user]) => {
      setUserName(user.name);
      setUserDescription(user.about);
      setUserAvatar(user.avatar);
      setCardList(cards);
    });
  }, []);

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
        <ImagePopup
          isOpen={Boolean(props.selectedCard)}
          card={props.selectedCard}
          onClose={props.onCloseClick}
        />
        <div className="profile">
          <button className="btn btn_profile" onClick={props.onEditAvatarClick}>
            <img
              src={userAvatar}
              alt="user profile"
              className="profile__picture"
            />
            <img
              src={profileImage}
              alt="profile edit"
              className="profile__picture-edit"
            />
          </button>
          <div className="profile__info">
            <p className="profile__username">{userName}</p>
            <p className="profile__about">{userDescription}</p>
            <button className="btn btn_edit" onClick={props.onEditProfileClick}>
              <img src={editIcon} alt="edit button" />
            </button>
          </div>
          <button className="btn btn_add" onClick={props.onAddPlaceClick}>
            <img src={addCardIcon} alt="add button" />
          </button>
        </div>
        <ul className="element">
          {cardList.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={props.onCardClick}
              />
            );
          })}
        </ul>
      </main>
    </>
  );
}

export default Main;
