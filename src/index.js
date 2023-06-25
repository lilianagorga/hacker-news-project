import axios from 'axios';
import _ from 'lodash';

const API_BASE_URL = process.env.API_BASE_URL;
const MAX_NEWS_ITEMS = 10;

let newsIds = [];
let displayedNewsItems = [];

function fetchNewsIds() {
  return axios.get(`${API_BASE_URL}/newstories.json`)
    .then(response => response.data.slice(0, MAX_NEWS_ITEMS))
    .catch(error => {
      console.error('Error fetching news IDs:', error);
      return [];
    });
}

function fetchNewsDetails(newsId) {
  return axios.get(`${API_BASE_URL}/item/${newsId}.json`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching news details:', error);
      return null;
    });
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
  dateElement.textContent = new Date(newsItem.time * 1000).toLocaleString();
  newsItemElement.appendChild(dateElement);

  newsList.appendChild(newsItemElement);
  displayedNewsItems.push(newsItemElement);
}

function renderNewsItems() {
  displayedNewsItems.forEach(item => item.remove());
  displayedNewsItems = [];

  const newsIdsToFetch = newsIds.slice(0, MAX_NEWS_ITEMS);
  newsIds = newsIds.slice(MAX_NEWS_ITEMS);

  const fetchNewsPromises = newsIdsToFetch.map(newsId => fetchNewsDetails(newsId));
  Promise.all(fetchNewsPromises)
    .then(newsDetails => {
      newsDetails.forEach(newsItem => {
        if (newsItem) {
          renderNewsItem(newsItem);
        }
      });

      if (newsIds.length > 0) {
        document.getElementById('load-more-btn').style.display = 'block';
      } else {
        document.getElementById('load-more-btn').style.display = 'none';
      }
    })
    .catch(error => {
      console.error('Error rendering news items:', error);
    });
}

function onLoadMoreClick() {
  renderNewsItems();
}

document.getElementById('load-more-btn').addEventListener('click', onLoadMoreClick);

// Fetch initial news IDs and render the first batch of news items
fetchNewsIds()
  .then(ids => {
    newsIds = ids;
    renderNewsItems();
  })
  .catch(error => {
    console.error('Error fetching news IDs:', error);
  });
