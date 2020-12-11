import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
    }

    openPopup() {
        super.openPopup();
    }

    handleSubmit(handleDelete) {
        this._handleDelete = handleDelete;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector(".popup__form").addEventListener("submit", (evt) => {
            evt.preventDefault()
            this._handleDelete()
        })
    }
}