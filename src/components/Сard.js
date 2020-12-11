export default class Card {
    constructor({data, handleCardClick, handleCardDelete, handleLikeClick, userId, cardSelector}) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
     
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;
    this._cardSelector = cardSelector;
    this._userId = userId;
}

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector(".card__item")
        .cloneNode(true);

        return cardElement;
    }

    likeCard() {
        this._element.querySelector(".button_type_like-card").classList.toggle("button_type_like-card-active");
    }

    isLiked() {
        if (this._element.querySelector(".button_type_like-card").classList.contains("button_type_like-card-active")) {
            return true
        } else {
            return false
        }
    }

    countLikes(like) {
        this.likeCard();
        this._element.querySelector(".card__counter-likes").textContent = like;
    }

    getId() {
        return this._cardId
    }
     
    trashCard() {
        this._element.remove();
        this._element = null;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector(".card__title").textContent = this._name;
        this._element.querySelector(".card__image").src = this._link;
        this._element.querySelector(".card__image").alt = this._name;
        this._element.querySelector(".card__counter-likes").textContent = this._likes.length;

        if (this._ownerId !== this._userId) {
            this._element.querySelector(".button_type_trash-card").style.display = "none"
        }

        this._likes.forEach(elem => {
            if (elem._id == this._userId) {
                this._element.querySelector(".button_type_like-card").classList.toggle("button_type_like-card-active");
            }
        });

        return this._element
    }

    _setEventListeners() {
        this._element
        .querySelector(".button_type_like-card")
        .addEventListener("click", () => {
            this._handleLikeClick()
        });
              
        this._element
        .querySelector(".button_type_trash-card")
        .addEventListener("click", () => {
            this._handleCardDelete()
        });
        
        this._element
        .querySelector(".card__image")
        .addEventListener("click", () => {
            this._handleCardClick()
        });
              
    }
}