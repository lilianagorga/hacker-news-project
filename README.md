# Hacker News Project

This is a web application developed to democratize the dissemination of tech news by utilizing the Hacker News service. The application retrieves the latest news from Hacker News API and displays the title, link, and date of each news item.

## Features

- Displays a list of the latest news items with their titles, links, and dates.
- Fetches the list of news IDs from the Hacker News API.
- Retrieves detailed information for each news item by calling the Hacker News API.
- Implements pagination to load more news items in batches.
- Uses environment variables for configuration.
- Utilizes Webpack for bundling the application.
- Makes API requests using Axios.
- Handles data manipulation and rendering using Lodash.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/lilianagorga/hacker-news-project.git
```

### Navigate to the project directory: 
* cd hacker-news-tech-app

### Install the dependecies: 
* npm install

### Create the necessary environment files: 
* Create a .env.dev file for the development environment.
* Create a .env.prod file for the production environment.
* Set the API_BASE_URL variable in both files to the appropriate Hacker News API base URL.

### Start the development server:
* npm start
* The application will be accessible at https://hacker-news-s2i-project.web.app

### Build the production version:
* npm run build
* The optimized and minified production build will be generated in the dist directory.
