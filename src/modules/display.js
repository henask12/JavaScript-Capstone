import fetchData from './api.js';
import ItemElement from './helpers.js';
import likesCounter from './likesCounter.js';

const display = async () => {
  const url = 'https://api.tvmaze.com/shows';

  try {
    const data = await fetchData(url);

    // Sort the data based on rating average in descending order
    data.sort((a, b) => b.rating.average - a.rating.average);

    // Limit the data to the top 16 items
    const topItems = data.slice(0, 16);

    const itemsContainer = document.getElementById('items-container');

    const itemElements = await Promise.all(topItems.map((item) => ItemElement(item)));

    itemElements.forEach((itemElement) => {
      itemsContainer.appendChild(itemElement);
    });

    const likesCount = document.querySelectorAll('.items-count');

    likesCount.forEach((span) => {
      span.textContent = `(${likesCounter()})`;
    });
  } catch (error) {
    const snackbar = document.getElementById('snackbar');
    snackbar.className = 'show';
    const text = document.createElement('span');

    text.textContent = error;

    snackbar.appendChild(text);
    setTimeout(() => {
      snackbar.className = snackbar.className.replace('show', '');
    }, 5000);
  }
};

export default display;
