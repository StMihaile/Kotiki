const cardsContainer = document.querySelector('.cards');
const btnOpenPopupForm = document.querySelector('#add');
const btnOpenPopupLogin = document.querySelector('#login');
const formCatAdd = document.querySelector('#popup-form-cat');

const popupAddCat = new Popup('popup-add-cats');
popupAddCat.setEventListener();

const popupLogin = new Popup('popup-login');
popupLogin.setEventListener();

btnOpenPopupForm.addEventListener('click', () => {
  popupAddCat.open();
});

formCatAdd.addEventListener('submit', handleFormAddCat);
btnOpenPopupLogin.addEventListener('click', () => popupLogin.open());

function serializeForm(elements) {
    const formData = {};

    elements.forEach((input) => {
        if (input.type === 'submit') {
            return
        }

        if (input.type !== 'checkbox') {
            formData[input.name] = input.value;
        }

        if (input.type === 'checkbox') {
            formData[input.name] = input.checked;
        }
    })
    
    return formData;
}

function createCat(dataCat) {
    const cardInstance = new Card(dataCat, '#card-template');
    const newCardElement = cardInstance.getElement();
    cardsContainer.append(newCardElement);
}

function handleFormAddCat(e) {
    e.preventDefault();
    const elementsFormCat = [...formCatAdd.elements];
    const dataFromForm = serializeForm(elementsFormCat);
    api.addNewCat(dataFromForm).then(() => {
        createCat(dataFromForm);
    })
    popupAddCat.close();
}

api.getAllCats().then((data) => {
    data.forEach(function (catData) {
        createCat(catData);
    });
})