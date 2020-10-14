const openPopupProfileButton = document.querySelector(".button_type_edit-profile");
const closePopupProfileButton = document.querySelector("#close-profile");
const popupProfile = document.querySelector("#popup-profile");
const nameProfile = document.querySelector(".profile__name");
const professionProfile = document.querySelector(".profile__profession");
const nameProfileInput = document.querySelector("#name");
const professionProfileInput = document.querySelector("#profession");
const formProfile = document.querySelector("#form-profile");


function popupProfileToggle () {
    if (popupProfile.classList.contains("popup_is-opened") === false) {
    nameProfileInput.value = nameProfile.textContent;
    professionProfileInput.value = professionProfile.textContent;
    }
    popupProfile.classList.toggle("popup_is-opened");
}

function formProfileSubmitHandler (evt) {
    evt.preventDefault(); 
    nameProfile.textContent = nameProfileInput.value;
    professionProfile.textContent = professionProfileInput.value;

    popupProfileToggle();
}

openPopupProfileButton.addEventListener("click", popupProfileToggle);
closePopupProfileButton.addEventListener("click", popupProfileToggle);
formProfile.addEventListener("submit", formProfileSubmitHandler);


const openPopupGalleryButton = document.querySelector(".button_type_add-gallery");
const closePopupGalleryButton = document.querySelector("#close-gallery");
const popupGallery = document.querySelector("#popup-gallery");
const formGallery = document.querySelector("#form-gallery");

function popupGalleryToggle () {
    if (popupGallery.classList.contains("popup_is-opened") === false) {
        nameCardInput.value = "";
        linkCardInput.value = "";
    }
    
    popupGallery.classList.toggle("popup_is-opened");
}

openPopupGalleryButton.addEventListener("click", popupGalleryToggle);
closePopupGalleryButton.addEventListener("click", popupGalleryToggle);


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
        name: "Карачаево-Черкесская Республика",
        link: "https://images.unsplash.com/photo-1575631687630-f58400f0964f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=708&q=80"
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

const cardsGallery = document.querySelector(".cards")
const nameCardInput = document.querySelector("#name-card");
const linkCardInput = document.querySelector("#link-сard");
const addCardGalleryButton = document.querySelector("#save-gallery");
const cardTemplate = document.querySelector("#card-template");

function renderCards () {
    const items = initialCards.map(element => getItems(element));

    cardsGallery.append(...items);
};

function getItems (data) {
    const card = cardTemplate.content.cloneNode(true);
    card.querySelector(".cards__title").innerText = data.name;
    card.querySelector(".cards__image").src = data.link;
    
    const likeСardButton = card.querySelector(".button_type_like-cards");
    
    likeСardButton.addEventListener("click", function (evt) {
        evt.target.classList.toggle("button_type_like-cards-active");
    });

    return card;
};
renderCards();

function formGallerySubmitHandler (evt) {
    evt.preventDefault(); 
    const item = getItems({
        name: nameCardInput.value,
        link: linkCardInput.value
    });
    
    cardsGallery.prepend(item);

    popupGalleryToggle();
}
formGallery.addEventListener("submit", formGallerySubmitHandler);

// const addCardHandler = () => {
//     addCardGalleryButton.addEventListener("click", (evt) => {
//     evt.preventDefault();
//         const item = getItems({
//             name: nameCardInput.value,
//             link: linkCardInput.value
//         });
        
//         cardsGallery.prepend(item);

//         nameCardInput.value = "";
//         linkCardInput.value = "";

//         // popupGalleryToggle();
//     })
// };
// addCardHandler();