class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCard() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? "PUT" : "DELETE";

    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method,
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserInfo(value) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      body: JSON.stringify({
        name: value.name,
        about: value.about,
      }),
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserPicture(value) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({ avatar: value }),
      headers: this._headers,
    }).then(this._checkResponse);
  }

  postCard(value) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      body: JSON.stringify(value),
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_idn_02",
  headers: {
    authorization: "008c1c55-3b56-46f6-9605-a10cac4bcdce",
    "Content-Type": "application/json",
  },
});

export default api;
