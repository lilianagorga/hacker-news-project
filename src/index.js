import axios from 'axios';
import './main.scss';

const API_BASE_URL = process.env.API_BASE_URL;
const MAX_NEWS_ITEMS = 10;

let newsIds = [];
let loadedNewsItems = 0;

async function fetchNewsIds() {
  try {
    const response = await axios.get(`${API_BASE_URL}/newstories.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching news IDs:', error);
    return [];
  }
}

async function fetchNewsDetails(newsId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/item/${newsId}.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching news details:', error);
    return null;
  }
}

function renderNewsItem(newsItem) {
  const newsList = document.getElementById('news-list');
  const newsItemElement = document.createElement('div');
  newsItemElement.classList.add('news-item');

  const titleElement = document.createElement('div');
  titleElement.classList.add('news-item-title');
  titleElement.textContent = newsItem.title;
  newsItemElement.appendChild(titleElement);

  const linkElement = document.createElement('a');
  linkElement.classList.add('news-item-link');
  linkElement.href = newsItem.url;
  linkElement.target = '_blank';
  linkElement.rel = 'noopener noreferrer';
  linkElement.textContent = 'Read more';
  newsItemElement.appendChild(linkElement);

  const dateElement = document.createElement('div');
  dateElement.classList.add('news-item-date'); // Aggiunge la classe per lo stile
  dateElement.textContent = new Date(newsItem.time * 1000).toLocaleString();
  newsItemElement.appendChild(dateElement);

  newsList.appendChild(newsItemElement);
}

function renderNewsItems() {
  const newsList = document.getElementById('news-list');
  newsList.innerHTML = ''; // Rimuove le news precedenti

  const newsIdsToFetch = newsIds.slice(loadedNewsItems, loadedNewsItems + MAX_NEWS_ITEMS);

  const fetchNewsPromises = newsIdsToFetch.map(newsId => fetchNewsDetails(newsId));
  Promise.all(fetchNewsPromises)
    .then(newsDetails => {
      newsDetails.forEach(newsItem => {
        if (newsItem) {
          renderNewsItem(newsItem);
        }
      });

      loadedNewsItems += MAX_NEWS_ITEMS;

      if (loadedNewsItems < newsIds.length) {
        toggleButtonDisplay(false);
      } else {
        toggleButtonDisplay(true);
      }
    })
    .catch(error => {
      console.error('Error rendering news items:', error);
    });
}

function toggleButtonDisplay(hide) {
  const loadMoreButton = document.getElementById('load-more-btn');
  loadMoreButton.style.display = hide ? 'none' : 'block';
}

function onLoadMoreClick() {
  renderNewsItems();
}

document.getElementById('load-more-btn').addEventListener('click', onLoadMoreClick);

fetchNewsIds()
  .then(ids => {
    newsIds = ids;
    toggleButtonDisplay(false);
    renderNewsItems();
  })
  .catch(error => {
    console.error('Error fetching news IDs:', error);
  });
