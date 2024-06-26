import React, { useState } from 'react'
import './css/style.scss'
import Navbar from '../../components/Navbar'
import { auth, provider } from '../../../firebase/config';
import { getRedirectResult, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import User from '../../../types/user';
import Footer from '../../components/footer';
import { useCurrentUser } from '../../../context/usersContext';
import { Link, useNavigate } from 'react-router-dom';
import firebaseErrorHandler from '../../../utilities/firebaseErrorHandler';
import { useMediaQuery } from '@mui/material';
import { smallMobileScreen, smallerTabletScreen } from '../../../utilities/screenSizes';
import NavbarMobile from '../../components/NavbarMobile';

function LogIn() {
    const [userCredentials, setUserCredentials] = useState<User>({ id: 0, email: "", password: "" });
    const [errorState, setErrorState] = useState<string>('');
    const currentUser = useCurrentUser();
    const navigateToHomePage = useNavigate();

    const isSmallMobile = useMediaQuery(
        `(max-width: ${smallMobileScreen}px)`,
    );
    const isSmallerTablet = useMediaQuery(
        `(max-width: ${smallerTabletScreen}px)`,
    );



    function handleCredentials(e: React.ChangeEvent<HTMLInputElement>) {
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value })
        console.log(userCredentials)
    }

    function logInUser(id: string, email: string | null) {
        const user = { userId: id, userEmail: email };
        currentUser.userDispatch({ type: 'SET_USER', payload: user });
        console.log(currentUser.user);
    }

    function handleLogin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        setErrorState('');
        console.log("log in")
        signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
            .then((userCredentials) => {
                logInUser(userCredentials.user.uid, userCredentials.user.email);
                navigateToHomePage('/');
            }) //sva login logika ide iz observera onAuthStateChanged
            .catch((error) => {
                const errorMessage = error.message;
                setErrorState(firebaseErrorHandler(errorMessage));
            });
    }

    function handleGoogleLogin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        if (isSmallMobile) {
            signInWithRedirect(auth, provider);
            getRedirectResult(auth)
                .then((result) => {
                    const user = result?.user;
                    user && logInUser(user.uid, user.email);
                    navigateToHomePage('/');
                }).catch((error) => {
                    const errorMessage = error.message;
                    setErrorState(firebaseErrorHandler(errorMessage));
                });
        } else {
            signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    logInUser(user.uid, user.email);
                    navigateToHomePage('/');
                }).catch((error) => {
                    const errorMessage = error.message;
                    setErrorState(firebaseErrorHandler(errorMessage));
                });
        }
    }

    function handlePasswordReset(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        sendPasswordResetEmail(auth, userCredentials.email)
            .then(() => {
                // Poslat email za reset lozinke
            })
            .catch((error) => {
                const errorMessage = error.message;
                setErrorState(firebaseErrorHandler(errorMessage));
            });
    }

    return (
        <div className='log_in_main'>
            {isSmallMobile || isSmallerTablet ?
                <NavbarMobile />
                :
                <Navbar />
            }
            <div className='log_in_wrapper flex justify-center p-10 gap-20'>
                <div className='log_in_container flex flex-col w-72'>
                    <h1 className='log_in_container_title mb-4'>Sign in</h1>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" onChange={(e) => handleCredentials(e)} className="log_in_input h-8 block w-full p-4 mb-4 text-sm text-gray-900 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter email" required />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={(e) => handleCredentials(e)} className="log_in_input h-8 block w-full p-4 mb-5 text-sm text-gray-900 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter password" required />
                    <button className='log_in_btn rounded p-1 mb-1' onClick={(e) => handleLogin(e)}>Sign in</button>
                    <button className='forgot_pass_btn text-gray-400 mb-2' onClick={(e) => handlePasswordReset(e)}>Forgot password?</button>
                    <div className='error mb-20 self-center'>{errorState}</div>
                    <div className='separation_line-horizontal mb-3'><span>New to POPCORN?</span></div>
                    <Link to="/signin" className='sign_up_btn rounded p-1 mb-3 text-center'>Sign up</Link>
                    <button className='sign_up_google_btn rounded p-1 mb-1' onClick={(e) => handleGoogleLogin(e)}>Sign in with Google</button>
                </div>
                {!isSmallerTablet && <div className='separation_line'></div>}
                {!isSmallerTablet && <div className='benefits_container'>
                    <h1 className='benefits_title mb-5'>Benefits of your POPCORN account</h1>
                    <h2 className='benefits_item mb-3'>+ Browse TV shows and Movies</h2>
                    <h2 className='benefits_item mb-3'>+ Discover what to watch next</h2>
                    <h2 className='benefits_item mb-3'>+ Add Movies and TV shows to your Watchlist</h2>
                    <h2 className='benefits_item mb-3'>+ Keep track of everything you are watching</h2>
                </div>}
            </div>

            <Footer />
        </div>
    )
}

export default LogIn