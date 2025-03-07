# Movie App

This is a React-based movie application that allows users to search for movies, view popular movies, and watch trailers. The app fetches data from an external API to display movie details, genres, cast, and watch providers.

## Features

- Search for movies
- View popular movies
- Display movie details including description, genres, cast, and runtime
- Watch movie trailers
- View watch providers for buying options

## Technologies Used

- React
- JavaScript
- CSS
- [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/movie-app.git
    ```
2. Navigate to the project directory:
    ```sh
    cd movie-app
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the development server:
    ```sh
    npm run dev
    ```
2. Open your browser and go to `http://localhost:5173` to view the app.

## Project Structure

- `src/components`: Contains React components such as `MovieCard` and `ModalMovieCard`.
- `src/pages`: Contains the main pages of the app, such as `Home`.
- `src/services`: Contains API service functions for fetching data from TMDb.
- `src/css`: Contains CSS files for styling the app.

## API Integration

This app uses the TMDb API to fetch movie data. You need to obtain an API key from TMDb and configure it in your project.

1. Create a `.env` file in the root directory.
2. Add your TMDb API key to the `.env` file:
    ```env
    VITE_API_KEY=your_api_key_here
    VITE_BASE_URL=https://api.themoviedb.org/3
    ```



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
