import "./index.css";
import {
    cards,
    popupProfile,
    openPopupProfileButton,
    submitPopupProfileButton,
    formProfile,
    nameProfileInput,
    professionProfileInput,
    popupGallery,
    openPopupGalleryButton,
    submitPopupGalleryButton,
    formGallery,
    popupCard,
    configValidation,
    popupConfirm,
    popupAvatar, 
    openPopupAvatarButton, 
    submitPopupAvatarButton,
    formAvatar,
    configUser
} from "../utils/constants.js";

import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";


const validateFormProfile = new FormValidator(configValidation, formProfile);
const validateFormGallery = new FormValidator(configValidation, formGallery);
const validateFormAvatar = new FormValidator(configValidation, formAvatar);

const popupWithImage = new PopupWithImage(popupCard);

const popupWithConfirm = new PopupWithConfirm(popupConfirm);

const userInfo = new UserInfo(configUser);

const api = new Api ({
    url: "https://mesto.nomoreparties.co/v1/cohort-18",
    headers: {
        authorization: "ee7d3d7a-088a-4faf-a6a4-125e05d2a819",
        "Content-Type": "application/json"
    }
});

let userId

Promise.all([api.getUserData(), api.getInitialCards()])
    .then((data) => {
        userId = data[0]._id
        userInfo.setUserInfo({
            name: data[0].name, 
            profession: data[0].about
        })
        userInfo.setUserAvatar({
            avatar: data[0].avatar
        })
        cardList.renderItems(data[1]) 
    })
    .catch((error) => {
        console.log("Ошибка:", error)
    }
);

const cardList = new Section({
    renderer: (item) => {
        createCard(item);
    }
}, cards);

function createCard (item) {
    const card = new Card({
        data: item,
        handleCardClick: () => {
            popupWithImage.openPopup(item.name, item.link)
        },
        handleCardDelete: () => {
            popupWithConfirm.openPopup(item)
            popupWithConfirm.handleSubmit(() => {
                api.deleteCard(item._id)
                .then((res) => {
                    card.trashCard(res)
                    popupWithConfirm.closePopup()
                })
                .catch((error) => {
                    console.log("Ошибка:", error)
                })
            })
        },
        handleLikeClick: () => {
            const id = card.getId();
                if (card.isLiked()) {
                    api.deleteLike(id)
                    .then((res) => {
                        card.countLikes(res.likes.length)
                    })
                    .catch((error) => {
                        console.log("Ошибка:", error)
                    })
                } else {
                    api.putLike(id)
                    .then((res) => {
                        card.countLikes(res.likes.length)
                    })
                    .catch((error) => {
                        console.log("Ошибка:", error)
                    })
                }
            },

        cardSelector: "#card-template",
        userId: userId
    })

    const cardElement = card.generateCard()
    cardList.addItem(cardElement); 
};


const popupProfileWithForm = new PopupWithForm(
    popupProfile, 
        dataForm => {
            popupProfileWithForm.loadingData(true);
            api.updateUserData(dataForm)
            .then(() => {
                userInfo.setUserInfo({
                    name: dataForm.name,
                    profession: dataForm.profession
                });
                popupProfileWithForm.closePopup()
            })
            .catch((error) => {
                console.log("Ошибка:", error)
            })
            .finally(() => {
                popupProfileWithForm.loadingData(false)
            })
        }
);

const popupGalleryWithForm = new PopupWithForm(
    popupGallery, 
        dataForm => {
            popupGalleryWithForm.loadingData(true);
            api.addNewCard(dataForm)
            .then((res) => {
                createCard(res, "#card-template")
                popupGalleryWithForm.closePopup()
            })
            .catch((error) => {
                console.log("Ошибка:", error)
            })
            .finally(() => {
                popupGalleryWithForm.loadingData(false)
            })
        }
);

const popupAvatarWithForm = new PopupWithForm(
    popupAvatar, 
        dataForm => {
            popupAvatarWithForm.loadingData(true);
            api.updateUserAvatar(dataForm)
            .then((data) => {
                userInfo.setUserAvatar(data)
                popupAvatarWithForm.closePopup()
            })
            .catch((error) => {
                console.log("Ошибка:", error)
            })
            .finally(() => {
                popupAvatarWithForm.loadingData(false)
            })
        }
);


popupWithImage.setEventListeners();
popupProfileWithForm.setEventListeners();
popupGalleryWithForm.setEventListeners()
popupAvatarWithForm.setEventListeners();
popupWithConfirm.setEventListeners();

validateFormProfile.enableValidation();
validateFormGallery.enableValidation();
validateFormAvatar.enableValidation();


openPopupProfileButton.addEventListener("click", function () {
    const user = userInfo.getUserInfo()
    nameProfileInput.value = user.name;
    professionProfileInput.value = user.profession;
    validateFormProfile.disableButtonSubmit(submitPopupProfileButton)
    validateFormProfile.resetInputError()
    popupProfileWithForm.openPopup()
});

openPopupGalleryButton.addEventListener("click", function () {
    validateFormGallery.disableButtonSubmit(submitPopupGalleryButton)
    validateFormGallery.resetInputError()
    popupGalleryWithForm.openPopup()
});

openPopupAvatarButton.addEventListener("click", function () {
    validateFormAvatar.disableButtonSubmit(submitPopupAvatarButton)
    validateFormAvatar.resetInputError()
    popupAvatarWithForm.openPopup()
});
