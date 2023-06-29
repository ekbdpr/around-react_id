import { useState, useEffect, useRef } from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";

import api from "../utils/api";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteConfirmPopupOpen, setisDeleteConfirmPopupOpen] =
    useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const popupRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([api.getUserInfo(), api.getInitialCard()])
      .then(([user, card]) => {
        setCurrentUser(user);
        setCards([...card]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });

    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    const handleClickOutside = (e) => {
      if (e.target.classList.contains("popup_is-opened")) {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const handleDeleteCardClick = (card) => {
    setSelectedCard(card);
    setisDeleteConfirmPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setisDeleteConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
  };

  const handleUpdateUser = (value) => {
    api
      .setUserInfo(value)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = (value) => {
    api
      .setUserPicture(value.avatar)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlace = (value) => {
    api
      .postCard(value)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="main-content">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          {isLoading ? (
            <div className="loader">
              <span className="loader__circle" />
            </div>
          ) : (
            <Main
              onEditAvatarClick={handleEditAvatarClick}
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onDeleteButtonClick={handleDeleteCardClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
            />
          )}
          <div ref={popupRef}>
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlaceSubmit={handleAddPlace}
            />
            <DeleteConfirmationPopup
              isOpen={isDeleteConfirmPopupOpen}
              card={selectedCard}
              onClose={closeAllPopups}
              onCardDelete={handleCardDelete}
            />
            <ImagePopup
              isOpen={isImagePopupOpen}
              card={selectedCard}
              onClose={closeAllPopups}
            />
          </div>
          <Footer />
        </CurrentUserContext.Provider>
      </div>
    </>
  );
}

export default App;
