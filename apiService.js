const API_KEY = '47475037-a019c47be6692940311d6755b';
const BASE_URL = 'https://pixabay.com/api/';
const DEFAULT_PARAMS = {
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

let currentPage = 1;

function fetchImages(query) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&page=${currentPage}&${new URLSearchParams(DEFAULT_PARAMS)}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Помилка при завантаженні');
      return response.json();
    })
    .then(data => {
      currentPage += 1;
      return data.hits;
    });
}

function resetPage() {
  currentPage = 1;
}

export default { fetchImages, resetPage };