import { useState, useEffect } from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";
import CardContext from "../contexts/CardContext";

import api from "../utils/api";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

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
      setCards(card);
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

  return (
    <>
      <div className="main-content">
        <Header />
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <CardContext.Provider value={{ cards, setCards }}>
            <Main
              onEditAvatarClick={handleEditAvatarClick}
              isEditAvatarPopupOpen={isEditAvatarPopupOpen}
              onEditProfileClick={handleEditProfileClick}
              isEditProfilePopupOpen={isEditProfilePopupOpen}
              onAddPlaceClick={handleAddPlaceClick}
              isAddPlacePopupOpen={isAddPlacePopupOpen}
              onDeleteButtonClick={handleDeleteCardClick}
              isDeleteConfirmPopupOpen={isDeleteConfirmPopupOpen}
              onCardClick={handleCardClick}
              selectedCard={selectedCard}
              onCloseClick={closeAllPopups}
            />
          </CardContext.Provider>
        </CurrentUserContext.Provider>
        <Footer />
      </div>
    </>
  );
}

export default App;
