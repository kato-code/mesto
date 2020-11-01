const popup = document.querySelector(".popup");

const popupProfile = document.querySelector(".popup_type_profile");
const openPopupProfileButton = document.querySelector(".button_type_edit-profile");
const closePopupProfileButton = document.querySelector("#close-profile");
const submitPopupProfileButton = document.querySelector("#save-profile")
const formProfile = document.querySelector("#form-profile");
const nameProfile = document.querySelector(".profile__name");
const professionProfile = document.querySelector(".profile__profession");
const nameProfileInput = document.querySelector("#name");
const professionProfileInput = document.querySelector("#profession");

const popupGallery = document.querySelector(".popup_type_gallery");
const openPopupGalleryButton = document.querySelector(".button_type_add-gallery");
const closePopupGalleryButton = document.querySelector("#close-gallery");
const submitPopupGalleryButton = document.querySelector("#save-gallery");
const formGallery = document.querySelector("#form-gallery");
const cardsGallery = document.querySelector(".cards")
const cardTemplate = document.querySelector("#card-template");
const nameCardInput = document.querySelector("#name-card");
const linkCardInput = document.querySelector("#link-card");

const popupCard = document.querySelector(".popup_type_card");
const imagePopupCard = document.querySelector(".popup__image-card");
const closePopupCard = document.querySelector("#close-card");
const titlePopupCard = document.querySelector(".popup__title_type_card");


function renderCards () {
    const items = initialCards.map(element => getItem(element));

    cardsGallery.append(...items)
};

function openPopup (popup) {
    popup.classList.add("popup_is-opened");

    document.addEventListener("keydown", closePopupOnClickEsc);

    popup.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("popup_is-opened") ||
            evt.target.classList.contains("button_type_close-popup")) {
            closePopup(popup)
        }
    });
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
    const item = getItem({
        name: nameCardInput.value,
        link: linkCardInput.value
    });

    cardsGallery.prepend(item)

    formGallery.reset()

    closePopup(popupGallery)
};

function getItem (data) {
    const card = cardTemplate.content.cloneNode(true);
    const cardTitle = card.querySelector(".card__title");
    const cardImage = card.querySelector(".card__image");
    
    cardTitle.innerText = data.name;
    cardImage.src = data.link;
    cardImage.alt = "Место: " + data.name;
    
    const likeCardButton = card.querySelector(".button_type_like-card");
    likeCardButton.addEventListener("click", function (evt) {
        evt.target.classList.toggle("button_type_like-card-active");
    });

    const trashCardButton = card.querySelector(".button_type_trash-card");
    trashCardButton.addEventListener("click", function (evt) {
        evt.target.closest(".card__item").remove();
    });

    cardImage.addEventListener("click", function () {
        imagePopupCard.src = cardImage.src;
        titlePopupCard.innerText = cardTitle.innerText;
 
        openPopup(popupCard)
    });
   
    return card
};

function disableSubmitButtonList () {
    const submitButtonList = Array.from(document.querySelectorAll(".button_type_save-popup"));
    
    submitButtonList.forEach((buttonElement) => {
        disableButtonSubmit(buttonElement, "button_type_invalid");
    });
}

renderCards()

openPopupProfileButton.addEventListener("click", openPopupProfile);
formProfile.addEventListener("submit", sendFormProfile);

openPopupGalleryButton.addEventListener("click", function () {
    openPopup(popupGallery)
    disableSubmitButtonList(submitPopupGalleryButton)
});
formGallery.addEventListener("submit", sendFormGallery);