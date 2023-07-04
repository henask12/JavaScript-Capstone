// Helper functions for creating item elements
export const createItemElement = (item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "item";

    const imageElement = document.createElement("img");
    imageElement.src = item.image ? item.image.medium : "";
    itemElement.appendChild(imageElement);

    const titleElement = document.createElement("span");
    titleElement.className = "item-title";
    titleElement.textContent = item.name;
    itemElement.appendChild(titleElement);

    const likeButton = document.createElement("button");
    likeButton.className = "button";
    likeButton.textContent = "Like";

    itemElement.appendChild(likeButton);

    const commentButton = document.createElement("button");
    commentButton.className = "button";
    commentButton.textContent = "Comments";
    itemElement.appendChild(commentButton);

    const reservationButton = document.createElement("button");
    reservationButton.className = "button";
    reservationButton.textContent = "Reservations";
    itemElement.appendChild(reservationButton);

    return itemElement;
};
