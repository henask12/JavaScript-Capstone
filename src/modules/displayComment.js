const displayComment = (comment, commentsSection) => {
  const commentElement = document.createElement('div');

  const usernameElement = document.createElement('strong');
  usernameElement.textContent = comment?.username;
  commentElement.appendChild(usernameElement);

  const textElement = document.createElement('p');
  textElement.textContent = comment?.comment;
  commentElement.appendChild(textElement);

  commentsSection.appendChild(commentElement);
};

export default displayComment;