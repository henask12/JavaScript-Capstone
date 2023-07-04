import { fetchData } from "./api.js";
import { createItemElement } from "./helpers.js";

const display = () => {
    const url = "https://api.tvmaze.com/shows";

    fetchData(url).then((data) => {
        debugger;
        // Sort the data based on rating average in descending order
        data.sort((a, b) => b.rating.average - a.rating.average);

        // Limit the data to the top 6 items
        const topItems = data.slice(0, 9);

        const itemsContainer = document.getElementById("items-container");

        topItems.forEach((item) => {
            const itemElement = createItemElement(item);

            // Create a new column for each item
            // const columnElement = document.createElement("div");
            // columnElement.classList.add("col-md-4");
            itemsContainer.appendChild(itemElement);

            // itemsContainer.appendChild(columnElement);
        });
    });
};

export default display;
