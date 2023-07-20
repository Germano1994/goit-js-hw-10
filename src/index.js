
import axios from 'axios';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

new SlimSelect('#breed-select', {
  placeholder: 'Select a breed',
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

let fetchTimeout;

breedSelect.addEventListener('input', async (event) => {
  const breedId = event.target.value;

 
  clearTimeout(fetchTimeout);

  
  fetchTimeout = setTimeout(async () => {
    await getCatByBreed(breedId);
  }, 500);
});

(async() =>{
  await getBreeds();
})();




async function getCatByBreed(breedId) {
  showLoader();
  hideError();

  try {
  
    const catData = await fetchCatByBreed(breedId);

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


async function getBreeds() {
  showLoader();
  hideError();
console.log()
  try {
    const loadingMessage = document.querySelector('.loading-message');
    loadingMessage.style.display = 'block';

    
    const breeds = await fetchBreeds();

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