async function fetchCatByBreed(breedId) {
 
  
  const response = await axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  );
  return response.data;

}



async function fetchBreeds() {


  const response = await axios.get('https://api.thecatapi.com/v1/breeds');

  return response.data;
}
  
module.exports = { fetchBreeds, fetchCatByBreed };
