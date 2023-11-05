export function renderGalleryPosts(data) {
  return data.map(obj => {
    return `<div class="photo-card">
    <a href="${obj.largeImageURL }"  data-lightbox="my-gallery">
    <img class="img" src="${obj.webformatURL }" alt="${obj.tags}" loading="lazy" />
    </a>
   <input typr="text" name="imageId" value="${obj.id}" hidden>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        <span>${obj.likes}</span>
      </p>
      <p class="info-item">
        <b>Views</b>
        <span>${obj.views}</span>
      </p>
      <p class="info-item">
        <b>Comments</b>
        <span>${obj.comments}</span>
      </p>
      <p class="info-item">
        <b>Downloads</b>
        <span>${obj.downloads}</span>
      </p>
    </div>
  </div>`
  }).join("");
}