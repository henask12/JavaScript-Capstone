export const createItemElement = (item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "item";

    const imageDiv = document.createElement("div");
    const imageElement = document.createElement("img");
    imageElement.src = item.image ? item.image.medium : "";
    imageDiv.appendChild(imageElement);
    itemElement.appendChild(imageDiv);

    const itemDetailsDiv = document.createElement("div");
    itemDetailsDiv.className = "item-details";

    const titleElement = document.createElement("span");
    titleElement.className = "item-title";
    titleElement.textContent = item.name;
    itemDetailsDiv.appendChild(titleElement);

    const likeButton = document.createElement("button");
    likeButton.className = "like-button";
    likeButton.textContent = "Like";
    itemDetailsDiv.appendChild(likeButton);

    const buttonsDivComment = document.createElement("div");
    buttonsDivComment.className = "item-buttons";

    const commentButton = document.createElement("button");
    commentButton.className = "comment-button";
    commentButton.textContent = "Comments";
    buttonsDivComment.appendChild(commentButton);

    const buttonsDivReserve = document.createElement("div");
    buttonsDivReserve.className = "item-buttons";

    const reservationButton = document.createElement("button");
    reservationButton.className = "reserve-button";
    reservationButton.textContent = "Reservations";
    buttonsDivReserve.appendChild(reservationButton);

    itemDetailsDiv.appendChild(buttonsDivComment);
    itemDetailsDiv.appendChild(buttonsDivReserve);
    itemElement.appendChild(itemDetailsDiv);

    return itemElement;
};
