  const CONFIG_API = {
    url: 'https://cats.petiteweb.dev/api/single/catsstm',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _onResponce(res) {
        return res.ok 
        ? res.json() 
        : Promise.reject({ ...res, message: "Ошибка на стороне сервера" })
    }

    getAllCats() {
        return fetch(`${this._url}/show`, {
            method: 'GET',
        }).then(this._onResponce);
    }

    getAllIds() {
        fetch(`${this._url}/ids`, {
            method: "GET"
        }).then(this._onResponce);
    }

    addNewCat(body) {
        return fetch(`${this._url}/add`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(body),
        }).then(this._onResponce);
    }

    updateCatById(data, idCat) {
        fetch(`${this._url}/update/${idCat}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: this._headers,
        }).then(this._onResponce);
    }

    deleteCatById(idCat) {
        fetch(`${this._url}/delete/${idCat}`, {
            method: 'DELETE',
        }).then(this._onResponce);
    }

    getCatById(idCat) {
        fetch(`${this._url}/show/${idCat}`, {
            method: 'GET',
        }).then(this._onResponce);
    }
}

const api = new Api (CONFIG_API);
api.getAllCats();