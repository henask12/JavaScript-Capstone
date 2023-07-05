import { fetchData } from './api.js';
import { createItemElement } from './helpers.js';

const display = () => {
  const url = 'https://api.tvmaze.com/shows';

    fetchData(url).then((data) => {
        // Sort the data based on rating average in descending order
        data.sort((a, b) => b.rating.average - a.rating.average);

        // Limit the data to the top 6 items
        const topItems = data.slice(0, 16);

    const itemsContainer = document.getElementById('items-container');

    topItems.forEach((item) => {
      const itemElement = createItemElement(item);

            itemsContainer.appendChild(itemElement);
        });
    });
};

export default display;