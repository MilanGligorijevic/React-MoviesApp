import React from 'react';
import './css/style.scss';
import { Link } from 'react-router-dom';
import GenresDropdown from '../GenresDropdown';
import { GenresContextProvider } from '../../../context/genreContext';
import SearchBar from '../SearchBar';
import TrendingDropdown from '../TrendingDropdown';
import { PopcornLogo } from '../../../assets/svg/PopcornLogo';
import GenresShowsDropdown from '../GenresShowsDropdown';
import { GenresShowsContextProvider } from '../../../context/genreShowsContext';


function Navbar() {
    return (
        <GenresContextProvider>
            <GenresShowsContextProvider>
                <nav className='main_navbar h-20 gap-10'>
                    <Link to="/" className='navbar_logo ml-32'>
                        <PopcornLogo height={51} width={51}/>
                        <div className='navbar_logo-name'>POP <br></br>CORN</div>
                    </Link>
                    <SearchBar />
                    <TrendingDropdown />
                    <GenresDropdown />
                    <GenresShowsDropdown />
                    <Link to="/watchlist">+Watchlist</Link>
                    <div className='ml-auto mr-5'>
                        <Link to="/login">Log in</Link>
                        <span> | </span>
                        <Link to="/signin">Sign up</Link>
                    </div>
                </nav>
            </GenresShowsContextProvider>
        </GenresContextProvider>
    )
}

export default Navbar