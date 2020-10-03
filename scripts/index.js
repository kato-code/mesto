let openPopupButton = document.querySelector(".profile__edit-button");
let closePopupButton = document.querySelector(".popup__close-button");
let popup = document.querySelector(".popup");
let nameProfile = document.querySelector(".profile__name");
let professionProfile = document.querySelector(".profile__profession");
let nameInput = document.querySelector("#name");
let professionInput = document.querySelector("#profession");
let savePopupButton = document.querySelector(".popup__save-button")
let form = document.querySelector(".popup__container");

function popupToggle () {
    if (popup.classList.contains("popup_is-opened") === false) {
    nameInput.value = nameProfile.textContent;
    professionInput.value = professionProfile.textContent;
    }
    popup.classList.toggle("popup_is-opened");
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    nameProfile.textContent = nameInput.value;
    professionProfile.textContent = professionInput.value;
}

openPopupButton.addEventListener("click", popupToggle);
closePopupButton.addEventListener("click", popupToggle);
savePopupButton.addEventListener("click", popupToggle);
form.addEventListener('submit', formSubmitHandler);
