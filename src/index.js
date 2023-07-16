import axios from 'axios';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const breedSelect = document.getElementById('breed-select');
const loader = document.getElementById('loader');
const catInfo = document.getElementById('cat-info');
const catImage = document.getElementById('cat-image');
const catBreed = document.getElementById('cat-breed');
const catDescription = document.getElementById('cat-description');
const catTemperament = document.getElementById('cat-temperament');
const error = document.getElementById('error');

axios.defaults.headers.common['x-api-key'] = 'live_bbSmbWd4LO9F9gCofL8a7JnNnUrFCOQWnS7je4DpFmM1scOOeEW58Q1N4NYsjYvN';

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showError() {
  error.style.display = 'block';
  Notiflix.Notify.failure('Oops! Something went wrong!');
}

function hideError() {
  error.style.display = 'none';
}

async function fetchBreeds() {
  showLoader();
  hideError();

  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    const breeds = response.data;

    const catsInfo = breeds
      .map(({ id, name }) => `<option value="${id}">${name}</option>`)
      .join('');
    breedSelect.innerHTML = catsInfo;

    new SlimSelect({
      select: '#breed-select',
      placeholder: 'Оберіть породу'
    });
  } catch (error) {
    showError();
  }

  hideLoader();
}

async function fetchCatByBreed(breedId) {
  showLoader();
  hideError();

  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    const catData = response.data[0];

    catImage.src = catData.url;
    catBreed.textContent = catData.breeds[0].name;
    catDescription.textContent = catData.breeds[0].description;
    catTemperament.textContent = `Темперамент: ${catData.breeds[0].temperament}`;

    catInfo.style.display = 'block';
  } catch (error) {
    showError();
  }

  hideLoader();
}

breedSelect.addEventListener('change', async (event) => {
  const breedId = event.target.value;
  await fetchCatByBreed(breedId);
});

fetchBreeds();



