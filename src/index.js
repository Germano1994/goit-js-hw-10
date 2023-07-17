import axios from 'axios';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

 new SlimSelect('#breed-select', {
      placeholder: 'Select a breed'
    });

const breedSelect = document.getElementById('breed-select');
const loader = document.querySelector('.loader');
const error = document.getElementById('error');
const catInfo = document.querySelector('.cat-info');

axios.defaults.headers.common['x-api-key'] =
  'live_bbSmbWd4LO9F9gCofL8a7JnNnUrFCOQWnS7je4DpFmM1scOOeEW58Q1N4NYsjYvB';

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showError() {
  error.style.display = 'block';
}

function hideError() {
  error.style.display = 'none';
}

async function fetchCatByBreed(breedId) {
  showLoader();
  hideError();

  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_id=${breedId}`
      
    );
    const catData = response.data[0];

    catInfo.innerHTML = `
      <img src="${catData.url}" alt="Cat Image" class="cat-image">
      <p><strong>Breed:</strong> ${catData.breeds[0].name}</p>
      <p><strong>Description:</strong> ${catData.breeds[0].description}</p>
      <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
    `;

    catInfo.style.display = 'block';
  } catch (error) {
    showError();
  }

  hideLoader();
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


