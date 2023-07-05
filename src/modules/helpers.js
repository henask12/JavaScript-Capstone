export const createItemElement = (item) => {
    debugger;
    const itemElement = document.createElement("div");
    itemElement.className = "item";

    const imageElement = document.createElement("img");
    imageElement.src = item.image ? item.image.medium : "";
    itemElement.appendChild(imageElement);

    const titleElement = document.createElement("div");
    titleElement.classList.add("div-title");
    titleElement.innerHTML = `
    <h2>${item.name}</h2>
    <div class="likes-container">
      <i class="fa-solid fa-heart"></i>
      <span>${item.likes} likes</span>
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

    return itemElement;
};
