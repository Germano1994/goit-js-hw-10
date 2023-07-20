import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';

new SlimSelect('#breed-select', {
  placeholder: 'Select a breed',
});

const breedSelect = document.getElementById('breed-select');
const error = document.getElementById('error');
const catInfo = document.querySelector('.cat-info');
const loadingMessage = document.querySelector('.loader-container');


function showLoader() {
  loadingMessage.style.display = 'block';
  breedSelect.disabled = true;
  hideError();
}

function hideLoader() {
  loadingMessage.style.display = 'none';
  breedSelect.disabled = false;
}

function showError() {
  catInfo.innerHTML = '';
  error.style.display = 'block';
}

function hideError() {
  error.style.display = 'none';
}

async function getCatByBreed(breedId) {
  showLoader();
  hideError()

  if (breedId === "") {
    catInfo.innerHTML = '';
    hideLoader();
    return;
  }

  const catData = await fetchCatByBreed(breedId);
  hideLoader();

  if (catData && catData.breeds.length > 0) {
    catInfo.innerHTML = `
        <img src="${catData.url}" alt="Cat Image" class="cat-image">
        <p><strong>Breed:</strong> ${catData.breeds[0].name}</p>
        <p><strong>Description:</strong> ${catData.breeds[0].description}</p>
        <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
      `;

    catInfo.style.display = 'block';
  } else {
    showError();
  }
}


async function getBreeds() {
  showLoader();
  hideError();

  loadingMessage.style.display = 'block';

  const breeds = await fetchBreeds();
  breedSelect.style.display = 'block';
  hideLoader();

  if (!breeds || breeds.length === 0) {
    showError();
    return;
  }

  const catsInfo = breeds.map(({ id, name }) => `<option value="${id}">${name}</option>`);
  catsInfo.unshift('<option value="">Choise of breed</option>');
  catsInfo.join('');
  breedSelect.innerHTML = catsInfo;
}

let fetchTimeout;

breedSelect.addEventListener('change', async (event) => {
  const breedId = event.target.value;
  clearTimeout(fetchTimeout);

  fetchTimeout = setTimeout(async () => {
    await getCatByBreed(breedId);
  }, 500);
});

getBreeds();