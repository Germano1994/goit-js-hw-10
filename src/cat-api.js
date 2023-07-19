
const axios = require('axios');

axios.defaults.headers.common['x-api-key'] =
  'live_bbSmbWd4LO9F9gCofL8a7JnNnUrFCOQWnS7je4DpFmM1scOOeEW58Q1N4NYsjYvB';

const breedSelect = document.getElementById('breed-select');
const catInfo = document.querySelector('.cat-info');

function showLoader() {
  const loaderContainer = document.querySelector('.loader-container');
  loaderContainer.style.display = 'block';
}

function hideLoader() {
  const loaderContainer = document.querySelector('.loader-container');
  loaderContainer.style.display = 'none';
}

function showError() {
  const error = document.getElementById('error');
  error.classList.add('show-error');
}

function hideError() {
  const error = document.getElementById('error');
  error.classList.remove('show-error');
}

function clearCatForm() {
  breedSelect.value = ''; 
  clearCatInfo(); 
}

async function fetchCatByBreed(breedId) {
  showLoader();
  hideError();

  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    const catData = response.data[0];

    if (!catData) {
      clearCatInfo();
    } else {
      catInfo.innerHTML = `
        <img src="${catData.url}" alt="Cat Image" class="cat-image">
        <p><strong>Breed:</strong> ${catData.breeds[0].name}</p>
        <p><strong>Description:</strong> ${catData.breeds[0].description}</p>
        <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
      `;

      catInfo.style.display = 'block';
    }
  } catch (error) {
    showError();
    clearCatInfo(); 
  }

  hideLoader();
}

async function fetchBreeds() {
  showLoader();
  hideError();

  try {
    const loadingMessage = document.querySelector('.loading-message');
    loadingMessage.style.display = 'block';

    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    const breeds = response.data;

    if (!breeds || breeds.length === 0) {
      breedSelect.innerHTML = '';
      showError();
      return;
    }

    const catsInfo = breeds
      .map(({ id, name }) => `<option value="${id}">${name}</option>`)
      .join('');
    breedSelect.innerHTML = catsInfo;

    breedSelect.style.display = 'block';

    const firstBreedId = breeds[0].id;
    await fetchCatByBreed(firstBreedId);
  } catch (error) {
    showError();
  } finally {
    const loadingMessage = document.querySelector('.loading-message');
    loadingMessage.style.display = 'none';
  }

  hideLoader();
}

module.exports = { fetchBreeds, fetchCatByBreed };


