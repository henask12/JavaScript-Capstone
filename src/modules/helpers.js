import {fetchLikes} from './fetchLikes.js';

export const ItemElement = async  (item) => {
let count = 0;
    const itemElement = document.createElement("div");
    itemElement.className = "item";
    try {
  const likesData = await fetchLikes();

 // Check if likesData is empty or "No Content"
if (!likesData || likesData === "Unexpected end of JSON input") {
   count = 0;
} else {
  // Find the object with the designated id.
  const matchingLike = likesData.find((obj) => obj.item_id === `${item.id}`);
  count = matchingLike ? matchingLike.likes : 0;
}

    const imageElement = document.createElement("img");
    imageElement.src = item.image ? item.image.medium : "";
    itemElement.appendChild(imageElement);

    const titleElement = document.createElement("div");
    titleElement.classList.add("div-title");

    titleElement.innerHTML = `
    <h2>${item.name}</h2>
    <div class="likes-container">
      <i class="fa-solid fa-heart"></i>
      <span>${count} likes</span>
    </div>
  `;
    itemElement.appendChild(titleElement);

    const buttonsDiv = document.createElement("span");
    buttonsDiv.className = "item-buttons";

    buttonsDiv.innerHTML = `
      &nbsp; 
      <button class="comment-button"><i class="fa-regular fa-comment"></i> Comment</button>
      &nbsp; 
      <button id="reserve-button"><i class="fa-regular fa-clock"></i> Reserve</button>`;

    itemElement.append(buttonsDiv);
    // itemElement.appendChild(itemDetailsDiv);
  } catch (error) {
    console.error(error);
  }
    return itemElement;
};
