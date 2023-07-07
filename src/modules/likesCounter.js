const likesCounter = () => {
  if (!document.querySelectorAll('.item')) {
    return 0;
  }
  if (document.querySelectorAll('.item').length > 30) {
    return 'Error';
  }
  return document.querySelectorAll('.item').length;
};

export default likesCounter;
