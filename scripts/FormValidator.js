export class FormValidator {
    constructor(config, formElement) {
        this._formElement = formElement;
        this._config = config;
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._config.inputErrorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = "";
        inputElement.classList.remove(this._config.inputErrorClass);
    }

    _checkInputValidity(inputElement) {
        if (inputElement.checkValidity()) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement);
        }
    }
    
    disableButtonSubmit() { 
        this._buttonElement.classList.add(this._config.inactiveButtonClass);
        this._buttonElement.disabled = true;
    };   

    _toggleButtonState() {
        if (this._formElement.checkValidity()) {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
            this._buttonElement.disabled = false;
        } else {
            this.disableButtonSubmit (this._config.inactiveButtonClass);
        }
    }

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);

                this._toggleButtonState(this._buttonElement);
            });
        });
        
        this._toggleButtonState(this._formElement, this._buttonElement);
    }

    enableValidation() {
        this._formElement.addEventListener("submit", function(evt) {
            evt.preventDefault();
        });

        this._setEventListeners();

    }

    resetInputError() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
            this.disableButtonSubmit(this._inputList, this._buttonElement);
        })
    }
}


// function showInputError(formElement, inputElement, {inputErrorClass}) {
//     const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//     errorElement.textContent = inputElement.validationMessage;
//     inputElement.classList.add(inputErrorClass);
// };

// function hideInputError(formElement, inputElement, {inputErrorClass}) {
//     const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//     errorElement.textContent = "";
//     inputElement.classList.remove(inputErrorClass);
// };

// function checkInputValidity(formElement, inputElement, {inputErrorClass}) {
//     if (inputElement.checkValidity()) {
//         hideInputError(formElement, inputElement, {inputErrorClass});
//     } else {
//         showInputError(formElement, inputElement, {inputErrorClass});
//     }
// };
  
// function toggleButtonState(formElement, buttonElement, {inactiveButtonClass}) {
//     if (formElement.checkValidity()) {
//         buttonElement.classList.remove(inactiveButtonClass);
//         buttonElement.disabled = false;
//     } else {
//         disableButtonSubmit (buttonElement, inactiveButtonClass);
//     }
// };

// function setEventListeners(formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) {
//     const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//     const buttonElement = formElement.querySelector(submitButtonSelector);
    
//     inputList.forEach((inputElement) => {
//         inputElement.addEventListener("input", function(evt) {
//             checkInputValidity(formElement, evt.target, {...rest});

//             toggleButtonState(formElement, buttonElement, {inactiveButtonClass});
//         });
//     });
    
//     toggleButtonState(formElement, buttonElement, {inactiveButtonClass});
// };

// function enableValidation({formSelector, ...rest}) {
//     const formList = Array.from(document.querySelectorAll(formSelector));
    
//     formList.forEach((formElement) => {
//         formElement.addEventListener("submit", function(evt) {
//             evt.preventDefault();
//         });
        
//         setEventListeners(formElement, {...rest});
//     });
// };

// function disableButtonSubmit (buttonElement, inactiveButtonClass) {
//     buttonElement.classList.add(inactiveButtonClass);
//     buttonElement.disabled = true;
// };  

// enableValidation({
//     formSelector: ".popup__form",
//     inputSelector: ".popup__subtitle",
//     submitButtonSelector: ".button_type_save-popup",
//     inactiveButtonClass: "button_type_invalid",
//     inputErrorClass: "popup__subtitle_state_invalid",
//     errorClass: 'popup__error_visible'
//   });

