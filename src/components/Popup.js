export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }

    openPopup () {
        this._popup.classList.add("popup_is-opened")
    
        document.addEventListener("keydown", this._handleEscClose)
        this._popup.addEventListener("click", this._handleOverlayClose)
    }

    closePopup () {
        this._popup.classList.remove("popup_is-opened")
    
        document.removeEventListener("keydown", this._handleEscClose)
        this._popup.removeEventListener("click", this._handleOverlayClose)

    }

    _handleEscClose (evt) {
        if (evt.key === "Escape") {
            this.closePopup()
        }
    }

    _handleOverlayClose (evt) {
        if (evt.target.classList.contains("popup_is-opened")) {
            this.closePopup()
        }
    }

    setEventListeners () {
        this._popup
        .querySelector(".button_type_close-popup")
        .addEventListener("click", () => {
            this.closePopup()
        })
    }
    
}