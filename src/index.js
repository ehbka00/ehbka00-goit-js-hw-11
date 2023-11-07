import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

import { renderGalleryPosts} from "./js/renderGallery.js";
import {getGallery} from './js/gallery-api.js'

const searchBtn = document.querySelector(".searchBtn");
const searchField = document.querySelector(".searchfield");
const galleryElem = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");
const galleryBtn = document.querySelector(".gallery-btn");
const lightbox = new SimpleLightbox('.gallery a');
let currentPage = 1;

searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    galleryElem.innerHTML = '';
    currentPage = 1;
    galleryBtn.classList.contains('display-flx') ? galleryBtn.classList.remove('display-flx'):null;

    try {
        await requestGetGallery();
    } catch (error) {
       console.log("Request failed.");
    }
});

function handleGalleryResponse(response) {
    if (response.error) {
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        galleryBtn.classList.remove('display-flx')
        return;
    }
    const responseData = response.data;
    if (responseData.status === 200) {
        if (responseData.data.totalHits === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
        }
        if (galleryElem.children.length === 0) {
            Notiflix.Notify.success(`Hooray! We found ${responseData.totalHits} images.`);
            galleryElem.innerHTML = renderGalleryPosts(responseData.data.hits);
            changeScrollProperties();
        } else {
            galleryElem.insertAdjacentHTML("beforeend", renderGalleryPosts(responseData.data.hits));
        }
        updateGallery(responseData.data.hits.length);
    }
}

loadMoreBtn.addEventListener("click", async (e)=> {
    currentPage += 1;
    galleryBtn.classList.remove('display-flx');  

    try {
        await requestGetGallery();
    } catch (error) {
        console.log("Request failed.");
    }
});

function updateGallery(hits) {
    lightbox.refresh();
    if (hits >= 40) {
        galleryElem.nextElementSibling.classList.add('display-flx');
    }
    changeScrollProperties();
}

const prepareSearchOptions = (searchField, currentPage) =>  {
    return {
        key: '40398255-003f5e3643d0e18d6c44c1878',
        q: searchField.value,
        image_type : 'photo',
        orientation : 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: 40,
    }       
}

async function requestGetGallery() {
    const searchOptions = prepareSearchOptions(searchField, currentPage);  
    const galleryPosts = await getGallery(searchOptions, galleryElem);
    
    handleGalleryResponse(galleryPosts);
}

function changeScrollProperties() {
    const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 3,
        behavior: "smooth",
    });
}

  