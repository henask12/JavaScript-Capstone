/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

import { fetchData } from './api.js';
import showComments from './popUp.js';
import { fetchLikes } from './fetchLikes.js';
import { postLikes } from './postLikes.js';

export const ItemElement = async (item) => {
  const itemElement = document.createElement('div');
  itemElement.className = 'item';

  const { id } = item;
  itemElement.id = `${id}`;

  let count = 0;
  try {
    const likesData = await fetchLikes();

    // Check if likesData is empty or "No Content"
    if (!likesData || likesData === 'Unexpected end of JSON input' || likesData === 'undefined') {
      count = 0;
    } else {
      // Find the object with the designated id.
      const matchingLike = likesData.find((obj) => obj.item_id === `${item.id}`);
      count = matchingLike ? matchingLike.likes : 0;
    }

    const imageElement = document.createElement('img');
    imageElement.src = item.image ? item.image.medium : '';
    itemElement.appendChild(imageElement);

    const titleElement = document.createElement('div');
    titleElement.classList.add('div-title');
    titleElement.innerHTML = `
      <h2>${item.name}</h2>
      <div class="likes-container">
        <i class="fa-solid fa-heart"></i>
        <span>${count} likes</span>
      </div>
    `;
    itemElement.appendChild(titleElement);

    const buttonsDiv = document.createElement('span');
    buttonsDiv.className = 'item-buttons';

    buttonsDiv.innerHTML = `
      &nbsp; 
      <button id="btn-comment" class="comment-button"><i class="fa-regular fa-comment"></i> Comment</button>
      &nbsp; 
      <button id="reserve-button"><i class="fa-regular fa-clock"></i> Reserve</button>`;

    itemElement.append(buttonsDiv);

    // Add event listener to comment button
    const btnComment = itemElement.querySelector('#btn-comment');
    btnComment.addEventListener('click', () => {
      showComments(id);
    });

    const heartIcon = itemElement.querySelector('.fa-heart');

    heartIcon.addEventListener('click', async (event) => {
      try {
        await postLikes(event);
        event.target.classList.add('animation-heart');
        const span = event.target.nextElementSibling;
        let count = Number(span.textContent.replace('likes', ''));
        span.textContent = `${count += 1} likes`;
      } catch (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.error(error);
  }

 // Hide or remove the class from the loader element after 1 second
 const loaderElement = document.querySelector('.cont');
 if (loaderElement) {
   loaderElement.classList.remove('class-to-remove');
   setTimeout(() => {
     loaderElement.style.display = 'none';
   }, 1000);
 }
  return itemElement;
};
