import "../styles/index.css";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { editProfileActive, editProfileInactive } from "../utils/utils.js";
import {
  validationElements,
  content,
  element,
  cardTemplate,
  profileTemplate,
  editTemplate,
  addTemplate,
  deleteCardTemplate,
  showPictureTemplate,
  editButtonSelector,
  addButtonSelector,
  profileUserSelector,
  profileAboutSelector,
  profilePictureSelector,
} from "../utils/constants.js";
// initialize cards api
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_idn_02",
  headers: {
    authorization: "008c1c55-3b56-46f6-9605-a10cac4bcdce",
    "Content-Type": "application/json",
  },
});
// rendering cards to page
let cardList;

api
  .getInitialInfo()
  .then(([cards, user]) => {
    profilePictureSelector.src = user.avatar;
    userInfo.setUserInfo({ name: user.name, about: user.about });
    cardList = new Section(
      {
        items: cards,
        renderer: (item) => {
          const card = new Card(
            {
              handleCardClick: (e) => {
                popupImage(e);
              },

              handleDeleteClick: (e) => {
                confirmDelete(item, card, e);
              },

              handleLikeClick: () => {
                if (card.isLiked() === false) {
                  item.likes.push(user);
                  card.toggleLike();
                  api
                    .likeCard(item._id)
                    .then()
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  item.likes.pop();
                  card.toggleLike();
                  api
                    .dislikeCard(item._id)
                    .then()
                    .catch((err) => {
                      console.log(err);
                    });
                }
              },
            },
            item,
            cardTemplate
          );
          const cardElement = card.generateCard();
          cardList.addItem(cardElement);
        },
      },
      element
    );
    cardList.clear();
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });
// get current user info
const userInfo = new UserInfo({
  userName: profileUserSelector,
  userAbout: profileAboutSelector,
});
// popup add modal
const popupProfileForm = new Section(
  {
    items: profileTemplate,
    renderer: (item) => {
      const popupWindows = new PopupWithForm(
        {
          handleEventSubmit: (value) => {
            popupWindows.renderLoading(true);
            api
              .setUserPicture(value.link)
              .then((data) => {
                profilePictureSelector.src = data.avatar;
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                popupWindows.renderLoading(false, "Simpan");
                popupWindows.close();
              });
          },
        },
        item
      );
      const showFormModal = popupWindows.open();
      const validation = new FormValidator(validationElements, showFormModal);
      validation.enableValidation();
      popupProfileForm.addItem(showFormModal);
    },
  },
  content
);
// popup edit modal
const popupEditForm = new Section(
  {
    items: editTemplate,
    renderer: (item) => {
      const popupWindows = new PopupWithForm(
        {
          handleEventSubmit: (value) => {
            popupWindows.renderLoading(true);
            userInfo.setUserInfo({ name: value.name, about: value.title });
            api
              .setUserInfo(value)
              .then(() => {})
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                popupWindows.renderLoading(false, "Simpan");
                popupWindows.close();
              });
          },
        },
        item
      );
      const showFormModal = popupWindows.open();
      const getInfo = userInfo.getUserInfo();
      const nameValue = showFormModal.querySelector('input[name="name"]');
      const aboutValue = showFormModal.querySelector('input[name="title"]');
      const validation = new FormValidator(validationElements, showFormModal);
      validation.enableValidation();
      setTimeout(() => {
        nameValue.value = getInfo.name;
        aboutValue.value = getInfo.about;
      }, 100);
      popupEditForm.addItem(showFormModal);
    },
  },
  content
);
// popup add modal
const popupAddForm = new Section(
  {
    items: addTemplate,
    renderer: (item) => {
      const popupWindows = new PopupWithForm(
        {
          handleEventSubmit: (value) => {
            popupWindows.renderLoading(true);
            const newCard = {
              name: value.title,
              link: value.link,
            };
            api
              .postCard(newCard)
              .then((data) => {
                cardList._renderedItems.unshift(data);
                cardList.clear();
                cardList.renderItems();
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                popupWindows.renderLoading(false, "Simpan");
                popupWindows.close();
              });
          },
        },
        item
      );
      const showFormModal = popupWindows.open();
      const validation = new FormValidator(validationElements, showFormModal);
      validation.enableValidation();
      popupAddForm.addItem(showFormModal);
    },
  },
  content
);
// popup add modal
const confirmDelete = (elem, data, event) => {
  const deleteCardModal = new Section(
    {
      items: deleteCardTemplate,
      renderer: (item) => {
        const popupWindows = new PopupWithConfirmation(
          {
            handleEventSubmit: () => {
              data.deleteCard(event);
              api
                .deleteCard(elem._id)
                .then()
                .catch((err) => {
                  console.log(err);
                });
              popupWindows.close();
            },
          },
          item
        );
        const showFormModal = popupWindows.open();
        deleteCardModal.addItem(showFormModal);
      },
    },
    content
  );
  deleteCardModal.renderItems();
};

// popup image modal
const popupImage = (evt) => {
  const showPopup = new Section(
    {
      items: evt.target,
      renderer: (item) => {
        const imageModal = new PopupWithImage(item, showPictureTemplate);
        const showImageModal = imageModal.open();
        showPopup.addItem(showImageModal);
      },
    },
    content
  );
  showPopup.renderItems();
};
// global event listeners
profilePictureSelector.addEventListener("click", () => {
  popupProfileForm.renderItems();
});
editButtonSelector.addEventListener("click", () => {
  popupEditForm.renderItems();
});
addButtonSelector.addEventListener("click", () => {
  popupAddForm.renderItems();
});
profilePictureSelector.addEventListener("mouseover", editProfileActive);
profilePictureSelector.addEventListener("mouseout", editProfileInactive);
