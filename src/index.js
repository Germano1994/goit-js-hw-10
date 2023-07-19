
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
    await fetchCatByBreed(breedId);
  }, 500);
});

fetchBreeds();
