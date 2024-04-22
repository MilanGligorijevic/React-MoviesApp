import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Home from './views/pages/Home';
import SignIn from './views/pages/SignIn';
import Watchlist from './views/pages/Watchlist';
import LogIn from './views/pages/LogIn';
import TrendingMovies from './views/pages/TrendingMovies';
import { MoviesContextProvider } from './context/moviesContext';
import TrendingShows from './views/pages/TrendingShows';
import { ShowsContextProvider } from './context/tvShowsContext';
import SingleMovie from './views/pages/SingleMovie';
import SingleShow from './views/pages/SingleShow';
import GenresMovies from './views/pages/GenresMovies';
import GenresShows from './views/pages/GenresShows';
import SearchResults from './views/pages/SearchResults';
import { UsersContextProvider } from './context/usersContext';
import { WatchlistContextProvider } from './context/watchlistContext';
import ErrorPage from './views/pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
    // errorElement: <ErrorPage />,
    // children: [
    //   {
    //     path: "/",
    //     element: <Home />
    //   },
    //   {
    //     path: "/watchlist",
    //     element: <Watchlist />
    //   },
    //   {
    //     path: "/login",
    //     element: <LogIn />
    //   },
    //   {
    //     path: "/signin",
    //     element: <SignIn />
    //   },
    //   {
    //     path: "/genreMovies/:genreId/:genreName",
    //     element: <GenresMovies />
    //   },
    //   {
    //     path: "/genreShows/:genreId/:genreName",
    //     element: <GenresShows />
    //   },
    //   {
    //     path: "/trendingmovies",
    //     element: <TrendingMovies />
    //   },
    //   {
    //     path: "/trendingshows",
    //     element: <TrendingShows />
    //   },
    //   {
    //     path: "/movie/:movieId",
    //     element: <SingleMovie />
    //   },
    //   {
    //     path: "/show/:showId",
    //     element: <SingleShow />
    //   },
    //   {
    //     path: "/searchResults/:searchQuery",
    //     element: <SearchResults />,
    //   }
    // ]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <UsersContextProvider>
      <WatchlistContextProvider>
        <MoviesContextProvider>
          <ShowsContextProvider>
            <RouterProvider router={router} />
          </ShowsContextProvider>
        </MoviesContextProvider>
      </WatchlistContextProvider>
    </UsersContextProvider>
  </React.StrictMode>
);

