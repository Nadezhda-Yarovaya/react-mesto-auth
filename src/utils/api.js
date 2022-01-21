class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка такова: ${res.status}`);
  }

  _getRequest(currentUrl) {
    return fetch(`${this._url}${currentUrl}`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return this._getRequest("/cards");
  }
  getProfileInfo() {
    return this._getRequest("/users/me");
  }

  postNewCard(newCardData) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(newCardData),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    this._id = cardId;
    return fetch(`${this._url}/cards/${this._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  _saveProfileAll(data, fetchUrl) {
    return fetch(fetchUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  saveProfileData(nameResult, jobResult) {
    return this._saveProfileAll(
      {
        name: nameResult,
        about: jobResult,
      },
      `${this._url}/users/me`
    );
  }

  saveAvatarUrl(avatarUrl) {
    return this._saveProfileAll(
      {
        avatar: avatarUrl,
      },
      `${this._url}/users/me/avatar`
    );
  }

  _manageLikes(methodToUse, cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: methodToUse,
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._manageLikes("DELETE", cardId);
    } else {
      console.log('false: ' + isLiked);
      return this._manageLikes("PUT", cardId);
    }
  }

}
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-30",
  headers: {
    authorization: "cd4b9d27-bb3f-46e8-b234-b4266f9e218c",
    "Content-Type": "application/json",
  },
});

export default api;