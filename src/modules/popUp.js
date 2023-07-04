import { fetchData } from './api.js';

const showComments = (item) => {

  const popupContainer = document.createElement('div');
  popupContainer.classList.add('popup-container');

  const popupContent = document.createElement('div');
  popupContent.classList.add('popup-content');

  const closeButton = document.createElement('button');
  closeButton.classList.add('popup-close');
  closeButton.textContent = 'Close';
  closeButton.addEventListener('click', () => {
    popupContainer.remove();
  });
  popupContent.appendChild(closeButton);

  const commentsSection = document.createElement('div');
  commentsSection.classList.add('comments-section');
  popupContent.appendChild(commentsSection);

  const commentsUrl = `https://api.tvmaze.com/shows/${item}`;
  // const involvmentUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/c26WXJgsOY60FiNtcTNS/comments`
  fetchData(commentsUrl)
    .then((comments) => {
      
        const commentElement = document.createElement('div');
        commentElement.textContent = comments.name;
        commentsSection.appendChild(commentElement);
  

      popupContainer.appendChild(popupContent);
      const mainElement = document.querySelector('main');
      mainElement.appendChild(popupContainer);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error fetching comments:', error);
    });
};

export default showComments;
