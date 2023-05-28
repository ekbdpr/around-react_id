import deleteCardIcon from "../images/symbols/delete.svg";
import likeCardIcon from "../images/symbols/heart.svg";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <>
      <li className="element__item">
        <div className="element__container">
          <img
            src={props.card.link}
            alt={props.card.name}
            className="element__image"
            onClick={handleClick}
          />
          <p className="element__text">{props.card.name}</p>
          <button className="btn element__heart-btn">
            <img src={likeCardIcon} alt="heart symbol" />
          </button>
          <button className="btn element__delete-btn">
            <img src={deleteCardIcon} alt="delete symbol" />
          </button>
          <p className="element__like-counts">{props.card.likes.length}</p>
        </div>
      </li>
    </>
  );
}

export default Card;
