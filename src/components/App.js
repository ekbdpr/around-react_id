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

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
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
          onCloseClick={closeAllPopups}
        />
        <Footer />
      </div>
      <template id="card-template">
        <li className="element__item">
          <div className="element__container">
            <img src="#" alt="" className="element__image" />
            <p className="element__text"></p>
            <button className="btn element__heart-btn">
              <img src="./images/symbols/heart.svg" alt="heart symbol" />
            </button>
            <button className="btn element__delete-btn">
              <img src="./images/symbols/delete.svg" alt="delete symbol" />
            </button>
            <p className="element__like-counts">0</p>
          </div>
        </li>
      </template>
    </>
  );
}

export default App;
