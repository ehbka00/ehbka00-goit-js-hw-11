import axios from "axios";

export async function getGallery (searchOptions) {
  const queryString =  new URLSearchParams(searchOptions);
  try {
    const response = await axios.get(`https://pixabay.com/api/?${queryString}`);
    return {error: false, data: response};
  } catch (Error) {
    return {error: true, data: Error};
  }
}