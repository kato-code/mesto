import { Card } from "./card.js";
import { initialCards } from "./card.js";

// const popup = document.querySelector(".popup");
const cards = document.querySelector(".cards");

const popupProfile = document.querySelector(".popup_type_profile");
const openPopupProfileButton = document.querySelector(".button_type_edit-profile");
const submitPopupProfileButton = document.querySelector("#save-profile")
const formProfile = document.querySelector("#form-profile");
const nameProfile = document.querySelector(".profile__name");
const professionProfile = document.querySelector(".profile__profession");
const nameProfileInput = document.querySelector("#name");
const professionProfileInput = document.querySelector("#profession");

const popupGallery = document.querySelector(".popup_type_gallery");
const openPopupGalleryButton = document.querySelector(".button_type_add-gallery");
const submitPopupGalleryButton = document.querySelector("#save-gallery");
const formGallery = document.querySelector("#form-gallery");

// const cardTemplate = document.querySelector("#card-template");
const nameCardInput = document.querySelector("#name-card");
const linkCardInput = document.querySelector("#link-card");

export const popupCard = document.querySelector(".popup_type_card");
export const imagePopupCard = document.querySelector(".popup__image-card");
export const titlePopupCard = document.querySelector(".popup__title_type_card");


initialCards.forEach((item) => {
    const card = new Card(item, "#card-template");
    const cardElement = card.generateCard();

    cards.append(cardElement);
})

export function openPopup (popup) {
    popup.classList.add("popup_is-opened")

    document.addEventListener("keydown", closePopupOnClickEsc);
};

function closePopup (popup) {
    popup.classList.remove("popup_is-opened")

    document.removeEventListener("keydown", closePopupOnClickEsc);
};

function closePopupOnClickEsc (evt) {
    if (evt.key === "Escape") {
        const popupIsOpened = document.querySelector(".popup_is-opened");
        closePopup(popupIsOpened)
    }
};

function closePopupOnClickOverlayAndButton (evt) {
    if (evt.target.classList.contains("popup_is-opened") ||
        evt.target.classList.contains("button_type_close-popup")) {

        const popupIsOpened = document.querySelector(".popup_is-opened");
        closePopup(popupIsOpened)
    }
};

function openPopupProfile () {
    if (popupProfile.classList.contains("popup_is-opened") === false) {
        nameProfileInput.value = nameProfile.textContent;
        professionProfileInput.value = professionProfile.textContent;
    }
        
    openPopup(popupProfile)
    disableSubmitButtonList(submitPopupProfileButton)
};

function sendFormProfile (evt) {
    evt.preventDefault(); 
    nameProfile.textContent = nameProfileInput.value;
    professionProfile.textContent = professionProfileInput.value;

    closePopup(popupProfile)
}

function sendFormGallery (evt) {
    evt.preventDefault(); 
    const item = {
        name: nameCardInput.value,
        link: linkCardInput.value
    };

    const card = new Card(item, "#card-template");
    const cardElement = card.generateCard();

    cards.prepend(cardElement)

    formGallery.reset()

    closePopup(popupGallery)
};

function disableSubmitButtonList () {
    const submitButtonList = Array.from(document.querySelectorAll(".button_type_save-popup"));
    
    submitButtonList.forEach((buttonElement) => {
        disableButtonSubmit(buttonElement, "button_type_invalid");
    });
}


openPopupProfileButton.addEventListener("click", openPopupProfile);
formProfile.addEventListener("submit", sendFormProfile);

openPopupGalleryButton.addEventListener("click", function () {
    openPopup(popupGallery)
    disableSubmitButtonList(submitPopupGalleryButton)
});
formGallery.addEventListener("submit", sendFormGallery);

popupProfile.addEventListener("click", closePopupOnClickOverlayAndButton);
popupGallery.addEventListener("click", closePopupOnClickOverlayAndButton);
popupCard.addEventListener("click", closePopupOnClickOverlayAndButton);