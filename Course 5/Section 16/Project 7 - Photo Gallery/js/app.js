import '../sass/style.scss';

class Dog {
  constructor() {
    this.apiUrl = 'https://dog.ceo/api';
    this.imgEl = document.querySelector('.featured-dog__image img');
    this.backgroundEl = document.querySelector('.featured-dog__background');
    this.tilesEl = document.querySelector('.tiles');
    this.spinnerEl = document.querySelector('.spinner');
    this.init();
  }

  showLoading() {
    this.spinnerEl.classList.add('spinner--visible');
  }

  hideLoading() {
    this.spinnerEl.classList.remove('spinner--visible');
  }

  listBreeds() {
    return fetch(`${this.apiUrl}/breeds/list/all`)
      .then(res => res.json())
      .then(data => data.message);
  }

  getRandomImage() {
    return fetch(`${this.apiUrl}/breeds/image/random`)
      .then(res => res.json())
      .then(data => data.message);
  }

  getRandomImageByBreed(breed) {
    return fetch(`${this.apiUrl}/breed/${breed}/images/random`)
      .then(res => res.json())
      .then(data => data.message);
  }

  init() {
    this.showLoading();
    this.getRandomImage().then(img => this.showImageWhenReady(img));
    this.showAllBreeds();
  }

  showImageWhenReady(img) {
    this.imgEl.setAttribute('src', img);
    this.backgroundEl.style.backgroundImage = `url("${img}")`;
    this.hideLoading();
  }

  addBreed(breed, subBreed) {
    let name;
    let type;

    if (typeof subBreed === 'undefined') {
      name = breed;
      type = breed;
    } else {
      name = `${breed} ${subBreed}`;
      type = `${breed}/${subBreed}`;
    }

    const tile = document.createElement('div');
    tile.classList.add('tiles__tile');
    const tileContent = document.createElement('div');
    tileContent.classList.add('tiles__tile-content');

    tileContent.textContent = name;
    tileContent.addEventListener('click', () => {
      scrollTo(0, 0);
      this.showLoading();
      this.getRandomImageByBreed(type).then(img =>
        this.showImageWhenReady(img)
      );
    });

    tile.append(tileContent);
    this.tilesEl.append(tile);
  }

  showAllBreeds() {
    this.listBreeds().then(breeds => {
      for (const breed in breeds) {
        if (breeds[breed].length === 0) {
          this.addBreed(breed);
        } else {
          for (const subBreed of breeds[breed]) {
            this.addBreed(breed, subBreed);
          }
        }
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Dog();
});
