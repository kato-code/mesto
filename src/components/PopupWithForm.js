import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
    }

    _getInputValues() {
        this._inputList = this._popup.querySelectorAll(".popup__subtitle");
        this._formValues = {};
        
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListeners() {
        this._form = this._popup.querySelector(".popup__form");
        
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();

            this._submitForm(this._getInputValues());
        })

        super.setEventListeners();
    }

    closePopup() {
        super.closePopup();
        this._form.reset()
    }
}