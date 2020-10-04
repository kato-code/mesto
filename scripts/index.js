let openPopupButton = document.querySelector(".button_type_edit-profile");
let closePopupButton = document.querySelector(".button_type_close-popup");
let popup = document.querySelector(".popup");
let nameProfile = document.querySelector(".profile__name");
let professionProfile = document.querySelector(".profile__profession");
let nameInput = document.querySelector("#name");
let professionInput = document.querySelector("#profession");
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

    popupToggle();
}

openPopupButton.addEventListener("click", popupToggle);
closePopupButton.addEventListener("click", popupToggle);
form.addEventListener('submit', formSubmitHandler);
