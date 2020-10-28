function showInputError(formElement, inputElement, {inputErrorClass}) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(inputErrorClass);
};

function hideInputError(formElement, inputElement, {inputErrorClass}) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = "";
    inputElement.classList.remove(inputErrorClass);
};

function checkInputValidity(formElement, inputElement, {inputErrorClass}) {
    if (inputElement.checkValidity()) {
        hideInputError(formElement, inputElement, {inputErrorClass});
    } else {
        showInputError(formElement, inputElement, {inputErrorClass});
    }
};
  
function toggleButtonState(formElement, buttonElement, {inactiveButtonClass}) {
    if (formElement.checkValidity()) {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    } else {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    }
};

function setEventListeners(formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function(evt) {
            checkInputValidity(formElement, evt.target, {...rest});

            toggleButtonState(formElement, buttonElement, {inactiveButtonClass});
        });
    });
    
    toggleButtonState(formElement, buttonElement, {inactiveButtonClass});
};

function enableValidation({formSelector, ...rest}) {
    const formList = Array.from(document.querySelectorAll(formSelector));
    
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", function(evt) {
            evt.preventDefault();
        });
        
        setEventListeners(formElement, {...rest});
    });
};

enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__subtitle",
    submitButtonSelector: ".button_type_save-popup",
    inactiveButtonClass: "button_type_invalid",
    inputErrorClass: "popup__subtitle_state_invalid",
    errorClass: 'popup__error_visible'
  });


