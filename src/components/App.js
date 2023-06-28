import { useState, useEffect } from "react";

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
  const [selectedCard, setSelectedCard] = useState(null);
  const [isDeleteConfirmPopupOpen, setisDeleteConfirmPopupOpen] =
    useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo().then((user) => {
      setCurrentUser(user);
    });

    api.getInitialCard().then((card) => {
      setCards([...card]);
    });
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleDeleteCardClick = () => {
    setisDeleteConfirmPopupOpen(!isDeleteConfirmPopupOpen);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setisDeleteConfirmPopupOpen(false);
    setSelectedCard(null);
  };

  const handleUpdateUser = (value) => {
    api.setUserInfo(value).then((newUserInfo) => {
      setCurrentUser(newUserInfo);
      closeAllPopups();
    });
  };

  const handleUpdateAvatar = (value) => {
    api.setUserPicture(value.avatar).then((newUserInfo) => {
      setCurrentUser(newUserInfo);
      closeAllPopups();
    });
  };

  const handleAddPlace = (value) => {
    api.postCard(value).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    });
  };

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

  return (
    <>
      <div className="main-content">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
            onEditAvatarClick={handleEditAvatarClick}
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onDeleteButtonClick={handleDeleteCardClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
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
            onClose={closeAllPopups}
          />
          <ImagePopup
            isOpen={Boolean(selectedCard)}
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <Footer />
        </CurrentUserContext.Provider>
      </div>
    </>
  );
}

export default App;
