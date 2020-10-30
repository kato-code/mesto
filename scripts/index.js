const popup = document.querySelector(".popup");

const popupProfile = document.querySelector(".popup_type_profile");
const openPopupProfileButton = document.querySelector(".button_type_edit-profile");
const closePopupProfileButton = document.querySelector("#close-profile");
const formProfile = document.querySelector("#form-profile");
const nameProfile = document.querySelector(".profile__name");
const professionProfile = document.querySelector(".profile__profession");
const nameProfileInput = document.querySelector("#name");
const professionProfileInput = document.querySelector("#profession");

const popupGallery = document.querySelector(".popup_type_gallery");
const openPopupGalleryButton = document.querySelector(".button_type_add-gallery");
const closePopupGalleryButton = document.querySelector("#close-gallery");
const formGallery = document.querySelector("#form-gallery");
const cardsGallery = document.querySelector(".cards")
const cardTemplate = document.querySelector("#card-template");
const nameCardInput = document.querySelector("#name-card");
const linkCardInput = document.querySelector("#link-card");
const addCardGalleryButton = document.querySelector("#save-gallery");

const popupCard = document.querySelector(".popup_type_card");
const imagePopupCard = document.querySelector(".popup__image-card");
const closePopupCard = document.querySelector("#close-card");
const titlePopupCard = document.querySelector(".popup__title_type_card");


const initialCards = [
    {
        name: "Домбай",
        link: "https://images.unsplash.com/photo-1556780183-f523058dc29b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80"
    },
    {
        name: "Эльбрус",
        link: "https://images.unsplash.com/photo-1601845715177-5d14775529c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1601&q=80"
    },
    {
        name: "Карачаевск",
        link: "https://images.unsplash.com/photo-1538819285938-6a9b4eda500b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1601&q=80"
    },
    {
        name: "Кичи-Балык",
        link: "https://images.unsplash.com/photo-1596713162555-b3dd0b22db81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80"
    },
    {
        name: "Бадукские озёра",
        link: "https://images.unsplash.com/photo-1582650517303-b42616d56fba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80"
    },
    {
        name: "Архыз",
        link: "https://images.unsplash.com/photo-1576866132817-b89299573a6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
    }
];


function renderCards () {
    const items = initialCards.map(element => getItem(element));

    cardsGallery.append(...items);
};

function togglePopup (popup) {
    popup.classList.toggle("popup_is-opened");

    document.addEventListener("keydown", function (evt) {
        closePopupOnClickEsc(evt, popup)
    });

    popup.addEventListener("click", function (evt) {
        closePopupOnСlickOverlay(evt, popup)
    });
};

function closePopupOnСlickOverlay (evt, popup) {
    if (evt.target === evt.currentTarget && popup.classList.contains("popup_is-opened")) {
        togglePopup(popup)
        console.log('click')
    }
};  

function closePopupOnClickEsc (evt, popup) {
    if (evt.key === "Escape" && popup.classList.contains("popup_is-opened")) {
        togglePopup(popup)
        console.log('esc')
    }
};

function openPopupProfile () {
    if (popupProfile.classList.contains("popup_is-opened") === false) {
        nameProfileInput.value = nameProfile.textContent;
        professionProfileInput.value = professionProfile.textContent;
    };
        
    togglePopup(popupProfile);
};

function sendFormProfile (evt) {
    evt.preventDefault(); 
    nameProfile.textContent = nameProfileInput.value;
    professionProfile.textContent = professionProfileInput.value;

    togglePopup(popupProfile);
    hasInvalidButton(popup);
}

function sendFormGallery (evt) {
    evt.preventDefault(); 
    const item = getItem({
        name: nameCardInput.value,
        link: linkCardInput.value
    });

    cardsGallery.prepend(item);

    formGallery.reset();

    togglePopup(popupGallery);
    hasInvalidButton(popup);
};

function getItem (data) {
    const card = cardTemplate.content.cloneNode(true);
    const cardTitle = card.querySelector(".card__title");
    const cardImage = card.querySelector(".card__image");
    
    cardTitle.innerText = data.name;
    cardImage.src = data.link;
    cardImage.alt = "Место: " + data.name;
    
    const likeСardButton = card.querySelector(".button_type_like-card");
    likeСardButton.addEventListener("click", function (evt) {
        evt.target.classList.toggle("button_type_like-card-active");
    });

    const trashCardButton = card.querySelector(".button_type_trash-card");
    trashCardButton.addEventListener("click", function (evt) {
        evt.target.closest(".card__item").remove();
    });

    cardImage.addEventListener("click", function () {
        imagePopupCard.src = cardImage.src;
        titlePopupCard.innerText = cardTitle.innerText;
 
        togglePopup(popupCard)
    });
   
    return card;
};

function hasInvalidButton () {
    const buttonSubmitList = Array.from(document.querySelectorAll(".button_type_save-popup"));

    buttonSubmitList.forEach((buttonSubmit) => {
        buttonSubmit.classList.add("button_type_invalid");
        buttonSubmit.setAttribute("disabled", true);
    });
    console.log('bu')
};

renderCards();

openPopupProfileButton.addEventListener("click", openPopupProfile);
closePopupProfileButton.addEventListener("click", () => togglePopup(popupProfile));
formProfile.addEventListener("submit", sendFormProfile);

openPopupGalleryButton.addEventListener("click", () => togglePopup(popupGallery));
closePopupGalleryButton.addEventListener("click", () => togglePopup(popupGallery));
formGallery.addEventListener("submit", sendFormGallery);

closePopupCard.addEventListener("click", () => togglePopup(popupCard));