import { useContext } from "react";
import deleteCardIcon from "../images/symbols/delete.svg";
import likeCardIcon from "../images/symbols/heart.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const { card, handleDeleteButton, onCardClick, onCardLike } = props;

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    handleDeleteButton(card);
  };

  return (
    <>
      <li className="element__item">
        <div className="element__container">
          <img
            src={card.link}
            alt={card.name}
            className="element__image"
            onClick={handleClick}
          />
          <p className="element__text">{card.name}</p>
          <button
            className={`btn element__heart-btn ${
              isLiked
                ? "element__heart-btn_active"
                : "element__heart-btn_deactive"
            }`}
          >
            <img
              src={likeCardIcon}
              alt="heart symbol"
              onClick={handleLikeClick}
            />
          </button>
          <button
            className={`btn element__delete-btn ${
              isOwn
                ? "element__delete-btn_visible"
                : "element__delete-btn_hidden"
            }`}
            onClick={handleDeleteClick}
          >
            <img src={deleteCardIcon} alt="delete symbol" />
          </button>
          <p className="element__like-counts">{card.likes.length}</p>
        </div>
      </li>
    </>
  );
}

export default Card;
