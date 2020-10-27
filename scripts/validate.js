function showInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add("popup__subtitle_state_invalid");
};

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = "";
    inputElement.classList.remove("popup__subtitle_state_invalid");
};

function checkInputValidity(formElement, inputElement) {
    if (inputElement.checkValidity()) {
        hideInputError(formElement, inputElement);
    } else {
        showInputError(formElement, inputElement);
    }
};
  
function toggleButtonState(formElement, buttonElement) {
    if (formElement.checkValidity()) {
        buttonElement.classList.remove("button_type_invalid");
        buttonElement.disabled = false;
    } else {
        buttonElement.classList.add("button_type_invalid");
        buttonElement.disabled = true;
    }
};

function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(".popup__subtitle"));
    const buttonElement = formElement.querySelector(".button_type_save-popup");
    
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function(evt) {
            checkInputValidity(formElement, evt.target);

            toggleButtonState(formElement, buttonElement);
        });
    });
    
    toggleButtonState(formElement, buttonElement);
};

function enableValidation() {
    const formList = Array.from(document.forms);

    formList.forEach((formElement) => {
        formElement.addEventListener("submit", function(evt) {
            evt.preventDefault();
        });
        
        setEventListeners(formElement);
    });
};

enableValidation()

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });


