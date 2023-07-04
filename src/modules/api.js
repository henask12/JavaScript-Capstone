/* eslint-disable import/prefer-default-export */
// API module for fetching data
export const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};