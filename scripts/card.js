import { imagePopupCard, titlePopupCard, openPopup, popupCard } from "./index.js";

export const initialCards = [
    {
        name: "Домбай",
        link: "https://images.unsplash.com/photo-1556780183-f523058dc29b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80"
    },
    {
        name: "Эльбрус",
        link: "https://images.unsplash.com/photo-1601845715177-5d14775529c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1601&q=80"
    },
    {
        name: "Карачаевск",
        link: "https://images.unsplash.com/photo-1538819285938-6a9b4eda500b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1601&q=80"
    },
    {
        name: "Кичи-Балык",
        link: "https://images.unsplash.com/photo-1596713162555-b3dd0b22db81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80"
    },
    {
        name: "Бадукские озёра",
        link: "https://images.unsplash.com/photo-1582650517303-b42616d56fba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80"
    },
    {
        name: "Архыз",
        link: "https://images.unsplash.com/photo-1576866132817-b89299573a6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
    }
];

export class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
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

    _zoomCard() {
        imagePopupCard.src = this._link;
        titlePopupCard.innerText = this._name;

        openPopup(popupCard)
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
            this._zoomCard()
        });
        
    }
}

