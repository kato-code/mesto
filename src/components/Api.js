export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    statusResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserData() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers
        })
        .then(this.statusResponse)
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers
        })
        .then(this.statusResponse)
    }

    updateUserData(data) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.profession
            })
        })
        .then(this.statusResponse)
    }
    
    addNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name_card,
                link: data.link_card
            })
        })
        .then(this.statusResponse)
    }

    deleteCard(_id) {
        return fetch(`${this._url}/cards/${_id}`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(this.statusResponse)
    }

    putLike(_id) {
        return fetch(`${this._url}/cards/likes/${_id}`, {
            method: "PUT",
            headers: this._headers
        })
        .then(this.statusResponse)
    }
    
    deleteLike(_id) {
        return fetch(`${this._url}/cards/likes/${_id}`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(this.statusResponse)
    }

    updateUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.link_avatar
            })
        })
        .then(this.statusResponse)
    }
}