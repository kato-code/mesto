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
    submitForm => {
        userInfo.setUserInfo({
            name: submitForm.name,
            profession: submitForm.profession
        })

        popupProfileWithForm.closePopup()
    }
);

const popupGalleryWithForm = new PopupWithForm(
    popupGallery, 
    submitForm => {
        const dataCard = {
            name: submitForm.name_card, 
            link: submitForm.link_card
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
    nameProfileInput.value = nameProfile.textContent;
    professionProfileInput.value = professionProfile.textContent;
    validateFormProfile.disableButtonSubmit(submitPopupProfileButton)
    validateFormProfile.resetInputError()
    popupProfileWithForm.openPopup()
});

openPopupGalleryButton.addEventListener("click", function () {
    validateFormGallery.disableButtonSubmit(submitPopupGalleryButton)
    validateFormGallery.resetInputError()
    popupGalleryWithForm.openPopup()
});



// const cardList = new Section({
//     items: InitialCards,
//     renderer: (item) => {
//         const card = new Card(item, "#card-template");
//         const cardElement = card.generateCard();

//         cardList.addItem(cardElement);
//     }
// }, cards);
// cardList.renderItems();

// InitialCards.forEach((item) => {
//     const card = new Card(item, "#card-template");
//     const cardElement = card.generateCard();

//     cards.append(cardElement);
// })

// export function openPopup (popup) {
//     popup.classList.add("popup_is-opened")

//     document.addEventListener("keydown", closePopupOnClickEsc);
// };

// function closePopup (popup) {
//     popup.classList.remove("popup_is-opened")

//     document.removeEventListener("keydown", closePopupOnClickEsc);
// };

// function closePopupOnClickEsc (evt) {
//     if (evt.key === "Escape") {
//         const popupIsOpened = document.querySelector(".popup_is-opened");
//         closePopup(popupIsOpened)
//     }
// };

// function closePopupOnClickOverlayAndButton (evt) {
//     if (evt.target.classList.contains("popup_is-opened") ||
//         evt.target.classList.contains("button_type_close-popup")) {

//         const popupIsOpened = document.querySelector(".popup_is-opened");
//         closePopup(popupIsOpened)
//     }
// };

// function openPopupProfile () {
//     // if (popupProfile.classList.contains("popup_is-opened") === false) {
//     //     nameProfileInput.value = nameProfile.textContent;
//     //     professionProfileInput.value = professionProfile.textContent;
//     // }
    
//     openPopup(popupProfile)
//     validateFormProfile.disableButtonSubmit(submitPopupProfileButton)
//     validateFormProfile.resetInputError()
// };

// function sendFormProfile (evt) {
//     evt.preventDefault(); 
//     nameProfile.textContent = nameProfileInput.value;
//     professionProfile.textContent = professionProfileInput.value;

//     closePopup(popupProfile)
// }

// function sendFormGallery (evt) {
//     evt.preventDefault(); 
//     const item = {
//         name: nameCardInput.value,
//         link: linkCardInput.value
//     };

//     const card = new Card(item, "#card-template");
//     const cardElement = card.generateCard();

//     cards.prepend(cardElement)

//     closePopup(popupGallery)
// };


// formGallery.addEventListener("submit", function () {
//     // sendFormGallery

//     // const card = new Card(item, "#card-template");
//     // const cardElement = card.generateCard();

//     // cards.prepend(cardElement)
// });

// popupProfile.addEventListener("click", closePopupOnClickOverlayAndButton);
// popupGallery.addEventListener("click", closePopupOnClickOverlayAndButton);
// popupCard.addEventListener("click", closePopupOnClickOverlayAndButton);