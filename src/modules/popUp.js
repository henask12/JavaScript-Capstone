/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
import countComments from './commentsCounter.js';

import { fetchData } from './api.js';

const createCommentForm = (itemId, commentsSection) => {
  const form = document.createElement('form');
  form.className = 'comment-form';

  const formTitle = document.createElement('h2');
  formTitle.textContent = 'Add Your Comment';
  form.appendChild(formTitle);

  const nameInput = document.createElement('input');
  nameInput.placeholder = 'Your name';
  nameInput.type = 'text';
  nameInput.className = 'name-input';
  form.appendChild(nameInput);

  const commentInput = document.createElement('textarea');
  commentInput.placeholder = 'Your insights';
  commentInput.className = 'comment-input';
  form.appendChild(commentInput);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Comment';
  submitButton.className = 'submit-button';
  form.appendChild(submitButton);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const commentText = commentInput.value;
    const savedComment = await saveComment(itemId, name, commentText);
    displayComment(savedComment, commentsSection);
    commentInput.value = '';
    nameInput.value = '';
  });

  return form;
};

const displayComment = (comment, commentsSection) => {
  const commentElement = document.createElement('div');

  const usernameElement = document.createElement('strong');
  usernameElement.textContent = comment.username;
  commentElement.appendChild(usernameElement);

  const textElement = document.createElement('p');
  textElement.textContent = comment.comment;
  commentElement.appendChild(textElement);

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
  const commentData = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/c26WXJgsOY60FiNtcTNS/comments?item_id=${parseInt(item, 10)}`;

  try {
    const comments = await fetchData(commentsUrl);

    const data = await fetchData(commentData);

    const commentdata = document.createElement('div');
    commentdata.classList.add('comments-section-data');
    popupContent.appendChild(commentdata);

    if (!data.error) {
      data.forEach((comment) => {
        const commentElement = createCommentElement(comment);
        commentdata.appendChild(commentElement);
      });

      const commentsCount = countComments(data);

      const commentsCountElement = document.createElement('span');
      commentsCountElement.textContent = `Total Comments: ${commentsCount}`;
      commentsCountElement.className = 'comment-counter';
      popupContent.appendChild(commentsCountElement);
    } else {
    // Handle the error case, e.g., display an error message
      console.error('Error fetching comments:', data.error.message);
    // You can choose to display an error message or handle the error in another way
    }

    const commentForm = createCommentForm(item, commentsSection);
    popupContent.appendChild(commentForm);

    const commentElement = document.createElement('div');
    commentElement.className = 'Movie-name';
    commentElement.textContent = comments.name;
    commentsSection.appendChild(commentElement);

    const imageElement = document.createElement('img');
    imageElement.src = comments.image ? comments.image.medium : '';
    imageElement.className = 'comment-image';
    commentElement.appendChild(imageElement);

    const infoDiv = document.createElement('div');
    infoDiv.className = 'info-div';
    commentElement.appendChild(infoDiv);

    const languageElement = document.createElement('span');
    languageElement.className = 'language';
    languageElement.textContent = `Language: ${comments.language}`;
    infoDiv.appendChild(languageElement);

    const genresElement = document.createElement('span');
    genresElement.className = 'genres';
    genresElement.textContent = `Genres: ${comments.genres.join(', ')}`;
    infoDiv.appendChild(genresElement);

    popupContainer.appendChild(popupContent);
    document.body.appendChild(popupContainer);
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
  function createCommentElement(comment) {
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';

    const usernameElement = document.createElement('span');
    usernameElement.textContent = comment.username;
    commentElement.appendChild(usernameElement);

    const dateElement = document.createElement('span');
    dateElement.textContent = comment.creation_date;
    commentElement.appendChild(dateElement);

    const commentTextElement = document.createElement('p');
    commentTextElement.textContent = comment.comment;
    commentElement.appendChild(commentTextElement);

    return commentElement;
  }
};

const saveComment = async (itemId, name, commentText) => {
  const commentData = {
    item_id: itemId,
    username: name,
    comment: commentText,
  };

  try {
    const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/c26WXJgsOY60FiNtcTNS/comments', {
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