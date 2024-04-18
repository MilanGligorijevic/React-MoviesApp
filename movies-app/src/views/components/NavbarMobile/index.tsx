import React, { useState } from "react";
import './css/style.scss';
import { Link } from "react-router-dom";
import { PopcornLogo } from "../../../assets/svg/PopcornLogo";
import { GenresContextProvider } from "../../../context/genreContext";
import { GenresShowsContextProvider } from "../../../context/genreShowsContext";
import SearchBar from "../SearchBar";
import TrendingDropdown from "../TrendingDropdown";
import GenresDropdown from "../GenresDropdown";
import GenresShowsDropdown from "../GenresShowsDropdown";
import { useCurrentUser } from "../../../context/usersContext";
import { getUsersWatchlist } from "../../../firebase/config";
import { NavbarMobileMenu } from "../../../assets/svg/NavbarMobileMenu";

function NavbarMobile(){
    const currentUser = useCurrentUser();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    function toggleMenu() {
    setMenuOpen((prevState) => !prevState);
    console.log(menuOpen);
    }

    function handleSignOut(){

    }

    return(
        <GenresContextProvider>
            <GenresShowsContextProvider>
                <nav className='mobile_navbar_main w-full h-16 flex justify-between'>
                    <Link to="/" className='mobile_navbar_logo ml-2 flex'>
                        <PopcornLogo height={46} width={46} />
                        <div className='mobile_navbar_logo-name'>POP <br></br>CORN</div>
                    </Link>
                    <div className="mr-2 z-50" onClick={toggleMenu}>
                        <NavbarMobileMenu toggleMenu={menuOpen} />
                    </div>
                    </nav>
                    {menuOpen && (
                        <div className="mobile_navbar_menu fixed top-0 z-20 h-full w-full flex flex-col gap-5 pt-16 px-7 text-2xl font-semibold">
                            <SearchBar />
                            <TrendingDropdown />
                            <GenresDropdown />
                            <GenresShowsDropdown />
                        </div>
                    )} 
                    {/* <SearchBar />
                    <TrendingDropdown />
                    <GenresDropdown />
                    <GenresShowsDropdown /> */}
                    {/* {currentUser.user && <Link to="/watchlist" onClick={() => getUsersWatchlist(currentUser.user.userId)}>+Watchlist</Link>}
                    {currentUser.user ?
                        <div className='ml-auto mr-5'>
                            <button onClick={() => handleSignOut()}>Sign out</button>
                        </div>
                        :
                        <div className='ml-auto mr-5'>
                            <Link to="/login">Sign in</Link>
                        </div>


                    } */}
            </GenresShowsContextProvider>
        </GenresContextProvider>
    );
}

export default NavbarMobile;