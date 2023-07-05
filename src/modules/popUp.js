/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
import { fetchData } from './api.js';

const createCommentForm = (item) => {
  const form = document.createElement('form');
  form.className = 'comment-form';

  const commentInput = document.createElement('textarea');
  commentInput.placeholder = 'Enter your comment';
  commentInput.className = 'comment-input';
  form.appendChild(commentInput);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';
  submitButton.className = 'submit-button';
  form.appendChild(submitButton);

  // Manejar el evento de envío del formulario
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const commentText = commentInput.value;
    const savedComment = await saveComment(item, commentText);
    // eslint-disable-next-line no-undef
    displayComment(savedComment, commentsSection);
    commentInput.value = '';
  });

  return form;
};

const displayComment = (comment, commentsSection) => {
  const commentElement = document.createElement('div');
  commentElement.textContent = comment.comment;
  commentsSection.appendChild(commentElement);
};

const showComments = async (item) => {
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

  try {
    const comments = await fetchData(commentsUrl);

    const commentElement = document.createElement('div');
    commentElement.textContent = comments.name;
    commentsSection.appendChild(commentElement);

    const imageElement = document.createElement('img');
    imageElement.src = comments.image;
    commentElement.appendChild(imageElement);

    const commentForm = createCommentForm(item);
    popupContent.appendChild(commentForm);

    popupContainer.appendChild(popupContent);
    const mainElement = document.querySelector('main');
    mainElement.appendChild(popupContainer);
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

const saveComment = async (itemId, commentText) => {
  const commentData = {
    item_id: itemId,
    comment: commentText,
  };

  try {
    const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/c26WXJgsOY60FiNtcTNS/comments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      throw new Error('Failed to save comment');
    }

    const savedComment = await response.json();
    return savedComment;
  } catch (error) {
    console.error('Error saving comment:', error);
    throw error;
  }
};

export default showComments;
