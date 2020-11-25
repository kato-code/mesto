import "./index.css";
import {
    cards,
    popupProfile,
    openPopupProfileButton,
    submitPopupProfileButton,
    formProfile,
    nameProfile,
    professionProfile,
    nameProfileInput,
    professionProfileInput,
    popupGallery,
    openPopupGalleryButton,
    submitPopupGalleryButton,
    formGallery,
    popupCard,
    configValidation
} from "../utils/constants.js";

import { InitialCards } from "../utils/InitialCards.js";
import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js"
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

const validateFormProfile = new FormValidator(configValidation, formProfile);
const validateFormGallery = new FormValidator(configValidation, formGallery);

const popupWithImage = new PopupWithImage(popupCard);

const userInfo = new UserInfo(nameProfile, professionProfile);

function createCard (item) {
    const card = new Card(item, "#card-template", (name, link) => {
        popupWithImage.openPopup({
            name: name,
            link: link
        })
    })

    return card.generateCard()
}

const cardList = new Section({
    items: InitialCards,
    renderer: (item) => {
        const card = createCard(item);

        cardList.addItem(card);
    }
}, cards);

const popupProfileWithForm = new PopupWithForm(
    popupProfile,
    dataForm => {
        userInfo.setUserInfo({
            name: dataForm.name,
            profession: dataForm.profession
        })

        popupProfileWithForm.closePopup()
    }
);

const popupGalleryWithForm = new PopupWithForm(
    popupGallery, 
    dataForm => {
        const dataCard = {
            name: dataForm.name_card, 
            link: dataForm.link_card
        };

        const card = createCard(dataCard)

        cards.prepend(card)

        popupGalleryWithForm.closePopup()
    }
);


cardList.renderItems();

popupWithImage.setEventListeners();

popupProfileWithForm.setEventListeners();
popupGalleryWithForm.setEventListeners()

validateFormProfile.enableValidation();
validateFormGallery.enableValidation();


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