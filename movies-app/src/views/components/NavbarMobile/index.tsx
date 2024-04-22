import React, { useState } from "react";
import './css/style.scss';
import { Link, useNavigate } from "react-router-dom";
import { PopcornLogo } from "../../../assets/svg/PopcornLogo";
import { GenresContextProvider } from "../../../context/genreContext";
import { GenresShowsContextProvider } from "../../../context/genreShowsContext";
import SearchBar from "../SearchBar";
import TrendingDropdown from "../TrendingDropdown";
import GenresDropdown from "../GenresDropdown";
import GenresShowsDropdown from "../GenresShowsDropdown";
import { useCurrentUser } from "../../../context/usersContext";
import { auth, getUsersWatchlist } from "../../../firebase/config";
import { NavbarMobileMenu } from "../../../assets/svg/NavbarMobileMenu";
import { signOut } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

function NavbarMobile() {
    const currentUser = useCurrentUser();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const navigateToHomePage = useNavigate();

    const menuVariants = {
        initial: {
          scaleX: 0,
        },
        animate: {
          scaleX: 1,
          transition: {
            duration: 0.35,
            ease: "easeInOut",
          },
        },
        exit: {
          scaleX: 0,
          transition: {
            duration: 0.2,
            ease: "easeInOut",
          },
        },
      };

    function toggleMenu() {
        setMenuOpen((prevState) => !prevState);
    }

    function handleSignOut() {
        signOut(auth).then(() => {
            currentUser.userDispatch({ type: 'SET_USER', payload: null });
            navigateToHomePage('/');
            setMenuOpen(false);
        }).catch((error) => {
            console.log("User signed out")
        });
    }

    return (
        <GenresContextProvider>
            <GenresShowsContextProvider>
                <nav className='mobile_navbar_main w-full h-16 flex justify-between sticky top-0 z-50'>
                    <Link to="/" className='mobile_navbar_logo ml-2 flex' onClick={() => toggleMenu()}>
                        <PopcornLogo height={46} width={46} />
                        <div className='mobile_navbar_logo-name'>POP <br></br>CORN</div>
                    </Link>
                    <div className="mr-2 z-50" onClick={toggleMenu}>
                        <NavbarMobileMenu toggleMenu={menuOpen} />
                    </div>
                </nav>
                <AnimatePresence >
                {menuOpen && (
                    <motion.div 
                        className="mobile_navbar_menu fixed top-0 z-20 h-full w-full flex flex-col gap-5 pt-20 px-7 text-2xl font-semibold"
                        variants={menuVariants}
                        style={{originX: 1}}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        >
                        <SearchBar />
                        <TrendingDropdown toggleFunction={toggleMenu} />
                        <GenresDropdown toggleFunction={toggleMenu} />
                        <GenresShowsDropdown toggleFunction={toggleMenu} />
                        {currentUser.user && <Link to="/watchlist" onClick={() => getUsersWatchlist(currentUser.user.userId)}>+Watchlist</Link>}
                        {currentUser.user ?
                            <button className='mobile_button mx-auto w-3/5 pl-1 mt-12 bg-black rounded-3xl p-1.5' onClick={() => handleSignOut()}>SIGN OUT</button>
                            :
                            <button className='mobile_button mx-auto w-3/5 pl-1 mt-12 bg-black rounded-3xl p-1.5 '>
                                <Link to="/login">SIGN IN</Link>
                            </button>
                        }
                    </motion.div>
                )}
                </AnimatePresence>
            </GenresShowsContextProvider>
        </GenresContextProvider>
    );
}

export default NavbarMobile;