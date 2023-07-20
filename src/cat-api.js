import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_bbSmbWd4LO9F9gCofL8a7JnNnUrFCOQWnS7je4DpFmM1scOOeEW58Q1N4NYsjYvB';


async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data[0];
  } catch (error) {
    console.log('axios error in fetchCatByBreed:', error);
    return false;
  }
}

async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    console.log('axios error in fetchBreeds:', error);
    return false;
  }
}

module.exports = { fetchBreeds, fetchCatByBreed };
