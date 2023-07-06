import { fetchData } from './api.js';
import { ItemElement } from './helpers.js';

const display = async () => {
  const url = "https://api.tvmaze.com/shows";

  try {
    const data = await fetchData(url);

    // Sort the data based on rating average in descending order
    data.sort((a, b) => b.rating.average - a.rating.average);

    // Limit the data to the top 6 items
    const topItems = data.slice(0, 16);

    const itemsContainer = document.getElementById("items-container");

    const itemElements = await Promise.all(topItems.map(item => ItemElement(item)));

    itemElements.forEach(itemElement => {
      itemsContainer.appendChild(itemElement);
    });
  } catch (error) {
    console.error(error);
  }
};

export default display;
