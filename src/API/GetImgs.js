const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33984657-99052f04a8590384bf426a6ee';

const getImages = async (searchTerm, page) => {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    searchTerm
  )}&image_type=photo&per_page=12&safesearch=true&page=${page}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.hits;
  } catch (err) {
    console.error('Error fetching images', err);
    throw err;
  }
};

export default getImages;
