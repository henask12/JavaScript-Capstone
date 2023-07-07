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

    if (response.ok) {
      const inputName = document.querySelectorAll('.name-input');
      const inputComment = document.querySelectorAll('.comment-input');

      inputComment.forEach((input) => {
        input.value = '';
      });
      inputName.forEach((input) => {
        input.value = '';
      });

      const snackbar = document.getElementById('snackbar');
      snackbar.className = 'show';
      const text = document.createElement('span');

      text.textContent = 'Comment SuccessFully Added!';

      snackbar.appendChild(text);
      setTimeout(() => {
        snackbar.className = snackbar.className.replace('show', '');
      }, 10000);
    } else if (!response.ok) {
      throw new Error('Failed to save comment');
    }
  } catch (error) {
    const snackbar = document.getElementById('snackbar');
    snackbar.className = 'show';
    const text = document.createElement('span');

    text.textContent = `Error Saving: ${error}`;

    snackbar.appendChild(text);
    setTimeout(() => {
      snackbar.className = snackbar.className.replace('show', '');
    }, 5000);
    throw error;
  }
};

export default saveComment;