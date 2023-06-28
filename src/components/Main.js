import { useContext } from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";
import CardContext from "../contexts/CardContext";

import profileImage from "../images/symbols/edit_symbol.svg";
import editIcon from "../images/symbols/pencil_symbol.svg";
import addCardIcon from "../images/symbols/plus_symbol.svg";

import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import Card from "./Card";
import ImagePopup from "./ImagePopup";

import api from "../utils/api";

function Main(props) {
  const {
    onCloseClick,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    isDeleteConfirmPopupOpen,
    selectedCard,
    onEditAvatarClick,
    onEditProfileClick,
    onAddPlaceClick,
    onDeleteButtonClick,
    onCardClick,
  } = props;

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { cards, setCards } = useContext(CardContext);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  };

  const handleCardDelete = (card) => {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  };

  const handleUpdateUser = (value) => {
    api.setUserInfo(value).then((updatedUser) => {
      setCurrentUser(updatedUser);
      onCloseClick();
    });
  };

  return (
    <>
      <main>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={onCloseClick}
          onUpdateUser={handleUpdateUser}
        ></EditProfilePopup>
        <PopupWithForm
          name="add-card"
          title="Tempat baru"
          isOpen={isAddPlacePopupOpen}
          onClose={onCloseClick}
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
        <PopupWithForm
          name="profile-picture"
          title="Ubah foto profil"
          isOpen={isEditAvatarPopupOpen}
          onClose={onCloseClick}
        >
          <form className="form" noValidate>
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
            <button type="submit" className="btn btn__submit">
              Simpan
            </button>
          </form>
        </PopupWithForm>
        <PopupWithForm
          name="del-confirm"
          title="Apakah Anda yakin?"
          isOpen={isDeleteConfirmPopupOpen}
          onClose={onCloseClick}
        >
          <button type="submit" className="btn btn__submit">
            Ya
          </button>
        </PopupWithForm>
        <ImagePopup
          isOpen={Boolean(selectedCard)}
          card={selectedCard}
          onClose={onCloseClick}
        />
        <div className="profile">
          <button
            className="btn btn_profile"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            onClick={onEditAvatarClick}
          >
            <img
              src={profileImage}
              alt="profile edit"
              className="profile__picture-edit"
            />
          </button>
          <div className="profile__info">
            <p className="profile__username">{currentUser.name}</p>
            <p className="profile__about">{currentUser.about}</p>
            <button className="btn btn_edit" onClick={onEditProfileClick}>
              <img src={editIcon} alt="edit button" />
            </button>
          </div>
          <button className="btn btn_add" onClick={onAddPlaceClick}>
            <img src={addCardIcon} alt="add button" />
          </button>
        </div>
        <ul className="element">
          {cards.map((card) => {
            const isOwn = card.owner._id === currentUser._id;
            const isLiked = card.likes.some((i) => i._id === currentUser._id);

            const cardDeleteButtonClassName = `element__delete-btn ${
              isOwn
                ? "element__delete-btn_visible"
                : "element__delete-btn_hidden"
            }`;

            const cardLikeButtonClassName = `element__heart-btn ${
              isLiked
                ? "element__heart-btn_active"
                : "element__heart-btn_deactive"
            }`;

            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={handleCardLike}
                cardLikeButtonClassName={cardLikeButtonClassName}
                cardDeleteButtonClassName={cardDeleteButtonClassName}
                onCardDelete={handleCardDelete}
                handleDeleteButton={onDeleteButtonClick}
              />
            );
          })}
        </ul>
      </main>
    </>
  );
}

export default Main;
