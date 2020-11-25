export default class FormValidator {
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

