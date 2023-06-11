import deleteCardIcon from "../images/symbols/delete.svg";
import likeCardIcon from "../images/symbols/heart.svg";

function Card(props) {
  const {
    card,
    handleDeleteButton,
    cardLikeButtonClassName,
    cardDeleteButtonClassName,
  } = props;

  function handleClick() {
    props.onCardClick(card);
  }

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
          <button className={`btn ${cardLikeButtonClassName}`}>
            <img src={likeCardIcon} alt="heart symbol" />
          </button>
          <button
            className={`btn ${cardDeleteButtonClassName}`}
            onClick={handleDeleteButton}
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
