import React from 'react';
import './css/style.scss';
import { Link, useNavigate } from 'react-router-dom';
import GenresDropdown from '../GenresDropdown';
import { GenresContextProvider } from '../../../context/genreContext';
import SearchBar from '../SearchBar';
import TrendingDropdown from '../TrendingDropdown';
import { PopcornLogo } from '../../../assets/svg/PopcornLogo';
import GenresShowsDropdown from '../GenresShowsDropdown';
import { GenresShowsContextProvider } from '../../../context/genreShowsContext';
import { useCurrentUser } from '../../../context/usersContext';
import { signOut } from "firebase/auth";
import { auth, getUsersWatchlist } from '../../../firebase/config';


function Navbar() {
    const currentUser = useCurrentUser();
    //koristimo currentUsera za prikaz odredjenih komponenti ukoliko je korisnik ulogovan
    const navigateToHomePage = useNavigate();


    function handleSignOut() {
        signOut(auth).then(() => {
            currentUser.userDispatch({ type: 'SET_USER', payload: null });
            navigateToHomePage('/');
        }).catch((error) => {
            console.log("User signed out")
        });
    }

    return (
        <GenresContextProvider>
            <GenresShowsContextProvider>
                <nav className='main_navbar h-20 gap-10 md:text-base'>
                    <Link to="/" className='navbar_logo ml-32 xl:ml-10'>
                        <PopcornLogo height={52} width={52} />
                        <div className='navbar_logo-name'>POP <br></br>CORN</div>
                    </Link>
                    <SearchBar />
                    <TrendingDropdown />
                    <GenresDropdown />
                    <GenresShowsDropdown />
                    {currentUser.user && <Link to="/watchlist" onClick={() => getUsersWatchlist(currentUser.user.userId)}>+Watchlist</Link>}
                    {currentUser.user ?
                        <div className='ml-auto mr-5'>
                            <button onClick={() => handleSignOut()}>Sign out</button>
                        </div>
                        :
                        <div className='ml-auto mr-5'>
                            <Link to="/login">Sign in</Link>
                        </div>


                    }
                </nav>
            </GenresShowsContextProvider>
        </GenresContextProvider>
    )
}

export default Navbar