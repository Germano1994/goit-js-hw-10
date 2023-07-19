import axios from "axios";


axios.defaults.headers.common['x-api-key'] =
  'live_bbSmbWd4LO9F9gCofL8a7JnNnUrFCOQWnS7je4DpFmM1scOOeEW58Q1N4NYsjYvB';

export async function fetchBreeds() {
    // showLoader();
    // hideError();

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

    export async function fetchCatByBreed(breedId) {
        showLoader();
        hideError();
      
        try {
          const response = await axios.get(
            `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
            
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