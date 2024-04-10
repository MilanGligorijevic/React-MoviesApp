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
import { useCurrentUser } from '../../../context/usersContext';
import { signOut } from "firebase/auth";
import { auth } from '../../../firebase/config';


function Navbar() {
    const currentUser = useCurrentUser();
    //koristimo currentUsera za prikaz odredjenih komponenti ukoliko je korisnik ulogovan

    function handleSignOut() {
        signOut(auth).then(() => {
            currentUser.userDispatch({ type: 'SET_USER', payload: null });
        }).catch((error) => {
            console.log("User signed out")
        });
    }

    return (
        <GenresContextProvider>
            <GenresShowsContextProvider>
                <nav className='main_navbar h-20 gap-10'>
                    <Link to="/" className='navbar_logo ml-32'>
                        <PopcornLogo height={52} width={52} />
                        <div className='navbar_logo-name'>POP <br></br>CORN</div>
                    </Link>
                    <SearchBar />
                    <TrendingDropdown />
                    <GenresDropdown />
                    <GenresShowsDropdown />
                    {currentUser.user && <Link to="/watchlist">+Watchlist</Link>}
                    {currentUser.user ?
                        <div className='ml-auto mr-5'>
                            <button onClick={() => handleSignOut()}>Sign out</button>
                        </div>
                        :
                        <div className='ml-auto mr-5'>
                            <Link to="/login">Log in</Link>
                            <span> | </span>
                            <Link to="/signin">Sign up</Link>
                        </div>


                    }
                </nav>
            </GenresShowsContextProvider>
        </GenresContextProvider>
    )
}

export default Navbar