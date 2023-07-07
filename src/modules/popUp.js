import displayComment from './displayComment.js';
import saveComment from './saveComment.js';
import fetchData from './api.js';
import countComments from './commentsCounter.js';

const createCommentForm = (itemId, commentsSection) => {
  const form = document.createElement('form');
  form.className = 'comment-form';
  form.setAttribute('id', 'formId');

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
  submitButton.setAttribute('id', 'btn-from');
  form.appendChild(submitButton);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    // get the name from input value and put here

    const name = nameInput.value;
    const commentText = commentInput.value;
    // call saveComment function
    const savedComment = await saveComment(itemId, name, commentText);
    displayComment(savedComment, commentsSection);

    showComments(itemId);
    commentInput.value = '';
    nameInput.value = '';
  });

  return form;
};

const createCommentElement = (comment) => {
  const commentElement = document.createElement('div');
  commentElement.className = 'comment';

  const usernameElement = document.createElement('span');
  usernameElement.textContent = comment?.username;
  commentElement.appendChild(usernameElement);

  const dateElement = document.createElement('span');
  dateElement.textContent = comment?.creation_date;
  commentElement.appendChild(dateElement);

  const commentTextElement = document.createElement('p');
  commentTextElement.textContent = comment?.comment;
  commentElement.appendChild(commentTextElement);

  return commentElement;
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
    let popupContainers = document.querySelectorAll('.popup-container');

    while (popupContainers.length > 0) {
      popupContainers[0].remove();
      popupContainers = document.querySelectorAll('.popup-container'); // Re-evaluate the collection
    }
  });
  popupContent.appendChild(closeButton);

  const commentsSection = document.createElement('div');
  commentsSection.classList.add('comments-section');
  popupContent.appendChild(commentsSection);

  const commentsUrl = `https://api.tvmaze.com/shows/${item}`;
  const commentData = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/c26WXJgsOY60FiNtcTNS/comments?item_id=${parseInt(
    item,
    10,
  )}`;

  const popupGrid = document.createElement('div');
  popupGrid.classList.add('comments-section-grid');
  popupContent.appendChild(popupGrid);

  try {
    const comments = await fetchData(commentsUrl);

    const data = await fetchData(commentData);

    const commentdata = document.createElement('div');
    commentdata.classList.add('comments-section-data');
    popupGrid.appendChild(commentdata);
    const pagCom = document.createElement('div');
    pagCom.classList.add('pagination-comment');
    popupContent.appendChild(pagCom);

    // Add pagination controls
    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('pagination-container');
    pagCom.appendChild(paginationContainer);

    const previousButton = document.createElement('button');
    previousButton.textContent = 'Previous';
    previousButton.classList.add('pagination-button', 'previous-button');
    paginationContainer.appendChild(previousButton);

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.classList.add('pagination-button', 'next-button');
    paginationContainer.appendChild(nextButton);

    let currentPage = 1;
    const commentsPerPage = 5;

    if (!data.error) {
      const commentsCount = countComments(data);

      const commentsCountElement = document.createElement('span');
      commentsCountElement.textContent = `Total Comments: ${commentsCount}`;
      commentsCountElement.className = 'comment-counter';

      // Insert the commentsCountElement before the comments-section-grid
      popupContent.insertBefore(commentsCountElement, popupGrid);

      const commentElements = data.map(createCommentElement);

      const totalPages = Math.ceil(commentElements.length / commentsPerPage);

      const handlePagination = () => {
        commentdata.innerHTML = '';
        const startIndex = (currentPage - 1) * commentsPerPage;
        const endIndex = startIndex + commentsPerPage;

        for (let i = startIndex; i < endIndex && i < commentElements.length; i += 1) {
          commentdata.appendChild(commentElements[i]);
        }
      };

      previousButton.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage -= 1;
          handlePagination();
        }
      });

      nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
          currentPage += 1;
          handlePagination();
        }
      });

      handlePagination();
    } else {
      console.error('Error fetching comments:', data.error.message);
    }

    const commentForm = createCommentForm(item, commentsSection);
    popupGrid.appendChild(commentForm);

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
};

export default showComments;
