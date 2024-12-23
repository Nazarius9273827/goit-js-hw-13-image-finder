import apiService from './apiService';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', loadMoreImages);

function onSearch(event) {
  event.preventDefault();
  query = event.currentTarget.elements.query.value.trim();
  
  if (!query) return;

  clearGallery();
  loadMoreBtn.hidden = true;
  fetchAndRenderImages();
}

function loadMoreImages() {
  fetchAndRenderImages();
}

function fetchAndRenderImages() {
  apiService.fetchImages(query).then(images => {
    if (images.length === 0) {
      alert('No images found!');
      return;
    }

    renderGallery(images);
    loadMoreBtn.hidden = false;
  }).catch(error => console.error(error));
}

function renderGallery(images) {
  const markup = images.map(({ webformatURL, largeImageURL, likes, views, comments, downloads }) => `
    <li class="photo-card">
      <img src="${webformatURL}" alt="" />
      <div class="stats">
        <p><i class="material-icons">thumb_up</i>${likes}</p>
        <p><i class="material-icons">visibility</i>${views}</p>
        <p><i class="material-icons">comment</i>${comments}</p>
        <p><i class="material-icons">cloud_download</i>${downloads}</p>
      </div>
    </li>
  `).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

function clearGallery() {
  gallery.innerHTML = '';
}