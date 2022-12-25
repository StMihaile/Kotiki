class Popup {
  constructor(className) {
      this._className = className;
      this.popup = document.querySelector(`.${className}`);
  }

  open() {
      this.popup.classList.add('popup_active');
  }

  close() {
      this.popup.classList.remove('popup_active');
  }

  setEventListener() {
      this.popup.addEventListener('click', (evt) => {
          if (
              evt.target.classList.contains(this._className) ||
              !!evt.target.closest('.popup__close')
          ) {
              this.close();
          }
      });
  }
}