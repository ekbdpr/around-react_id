import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteConfirmPopupOpen, setisDeleteConfirmPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteCardClick() {
    setisDeleteConfirmPopupOpen(!isDeleteConfirmPopupOpen);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setisDeleteConfirmPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <>
      <div className="main-content">
        <Header />
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
        <Footer />
      </div>
    </>
  );
}

export default App;
