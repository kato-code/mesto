export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector(".card__item")
        .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector(".card__title").textContent = this._name;
        this._element.querySelector(".card__image").src = this._link;
        this._element.querySelector(".card__image").alt = this._name;

        return this._element
    }

    _likeCard() {
        this._element.querySelector(".button_type_like-card").classList.toggle("button_type_like-card-active");
    }

    _trashCard() {
        this._element.remove();
    }

    _setEventListeners() {
        this._element
        .querySelector(".button_type_like-card")
        .addEventListener("click", () => {
            this._likeCard()
        });
        
        this._element
        .querySelector(".button_type_trash-card")
        .addEventListener("click", () => {
            this._trashCard()
        });

        this._element
        .querySelector(".card__image")
        .addEventListener("click", () => {
            this._handleCardClick(this._name, this._link)
        });
        
    }
}

