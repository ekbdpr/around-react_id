import { useContext } from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";

import profileImage from "../images/symbols/edit_symbol.svg";
import editIcon from "../images/symbols/pencil_symbol.svg";
import addCardIcon from "../images/symbols/plus_symbol.svg";

import Card from "./Card";

function Main(props) {
  const {
    onEditAvatarClick,
    onEditProfileClick,
    onAddPlaceClick,
    onDeleteButtonClick,
    onCardClick,
    cards,
    onCardLike,
    onCardDelete,
  } = props;

  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <main>
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
                onCardLike={onCardLike}
                cardLikeButtonClassName={cardLikeButtonClassName}
                cardDeleteButtonClassName={cardDeleteButtonClassName}
                onCardDelete={onCardDelete}
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
