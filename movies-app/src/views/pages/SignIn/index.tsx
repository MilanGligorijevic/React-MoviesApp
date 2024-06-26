import React, { useState } from 'react'
import './css/style.scss'
import Navbar from '../../components/Navbar'
import { auth } from '../../../firebase/config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import User from '../../../types/user';
import Footer from '../../components/footer';
import { useCurrentUser } from '../../../context/usersContext';
import { useNavigate } from 'react-router';
import firebaseErrorHandler from '../../../utilities/firebaseErrorHandler';
import { useMediaQuery } from '@mui/material';
import { smallMobileScreen, smallerTabletScreen } from '../../../utilities/screenSizes';
import NavbarMobile from '../../components/NavbarMobile';

function SignIn() {
    const [userCredentials, setUserCredentials] = useState<User>({ id: 0, email: "", password: "", firstName: '', lastName: '' });
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
        console.log(e.target.value);
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value })
        console.log(userCredentials)
    }

    function signInUser(id: string, email: string | null) {
        const user = { userId: id, userEmail: email };
        currentUser.userDispatch({ type: 'SET_USER', payload: user });
        console.log(currentUser.user);
        navigateToHomePage('/');
    }

    function handleSignup(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        if (userCredentials.firstName?.length === 0 || userCredentials.lastName?.length === 0) {
            setErrorState("Please fill in your name");
            return;
        };
        setErrorState('');
        createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
            .then((userCredential) => {
                const { uid, email } = userCredential.user;
                console.log(uid, email);
                signInUser(uid, email);
            })
            .catch((error) => {
                const errorMessage = error.message;
                setErrorState(firebaseErrorHandler(errorMessage));
            });

    }
    return (
        <div className='sign_in_main'>
            {isSmallMobile || isSmallerTablet ?
                <NavbarMobile />
                :
                <Navbar />
            }
            <div className='sign_in_wrapper flex justify-center p-10 gap-20'>
                <div className='sign_in_container flex flex-col w-72'>
                    <h1 className='sign_in_container_title mb-4'>Sign up</h1>
                    <label htmlFor="email">First name</label>
                    <input type="text" name='firstName' onChange={(e) => handleCredentials(e)} className="sign_in_input h-8 block w-full p-4 mb-4 text-sm text-gray-900 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter first name" required />
                    <label htmlFor="email">Last name</label>
                    <input type="text" name='lastName' onChange={(e) => handleCredentials(e)} className="sign_in_input h-8 block w-full p-4 mb-4 text-sm text-gray-900 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter last name" required />
                    <label htmlFor="email">Email</label>
                    <input type="text" name='email' onChange={(e) => handleCredentials(e)} className="sign_in_input h-8 block w-full p-4 mb-4 text-sm text-gray-900 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter email" required />
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' onChange={(e) => handleCredentials(e)} className="sign_in_input h-8 block w-full p-4 mb-5 text-sm text-gray-900 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter password" required />
                    <button className='sign_in_btn rounded p-1 mb-2' onClick={(e) => handleSignup(e)}>Sign up</button>
                    <div className='error mb-20 self-center'>{errorState}</div>
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

export default SignIn