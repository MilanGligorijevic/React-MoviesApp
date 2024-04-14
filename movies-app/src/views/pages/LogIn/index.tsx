import React, { useState } from 'react'
import './css/style.scss'
import Navbar from '../../components/Navbar'
import { auth, getUsersWatchlist } from '../../../firebase/config';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import User from '../../../types/user';
import Footer from '../../components/footer';
import { useCurrentUser } from '../../../context/usersContext';
import { Link, useNavigate } from 'react-router-dom';


function LogIn() {
    const [userCredentials, setUserCredentials] = useState<User>({ id: 0, email: "", password: "" });
    const currentUser = useCurrentUser();
    const navigateToHomePage = useNavigate();

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
        console.log("log in")
        signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
            .then((userCredentials) => {
                logInUser(userCredentials.user.uid, userCredentials.user.email);
                navigateToHomePage('/');
            }) //sva login logika ide iz observera onAuthStateChanged
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)

            });

    }

    function handlePasswordReset() {
        sendPasswordResetEmail(auth, "email") //promeniti u validnu email proveru, moze se promeniti template reset email-a na firebase-u
    }

    return (
        <div className='log_in_main'>
            <Navbar />
            <div className='log_in_wrapper flex justify-center p-10 gap-20'>
                <div className='log_in_container flex flex-col w-72'>
                    <h1 className='log_in_container_title mb-4'>Sign in</h1>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" onChange={(e) => handleCredentials(e)} className="log_in_input h-8 block w-full p-4 mb-4 text-sm text-gray-900 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter email" required />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={(e) => handleCredentials(e)} className="log_in_input h-8 block w-full p-4 mb-5 text-sm text-gray-900 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter password" required />
                    <button className='log_in_btn rounded p-1 mb-1' onClick={(e) => handleLogin(e)}>Sign in</button>
                    <button className='forgot_pass_btn text-gray-400 mb-20' onClick={() => handlePasswordReset}>Forgot password?</button>
                    <div className='separation_line-horizontal mb-3'><span>New to POPCORN?</span></div>
                    <Link to="/signin" className='sign_up_btn rounded p-1 mb-3 text-center'>Sign up</Link>
                    <button className='sign_up_google_btn rounded p-1 mb-1' onClick={(e) => handleLogin(e)}>Sign in with Google</button>
                    {/* OVAJ DEO SREDITI, DA RADI SIGN-UP KAO I SIGN-IN SA DRUGIM SERVISIMA (GOOGLE ITD) */}
                </div>
                <div className='separation_line'></div>
                <div className='benefits_container'>
                    <h1 className='benefits_title mb-5'>Benefits of your POPCORN account</h1>
                    <h2 className='benefits_item mb-3'>+ Browse TV shows and Movies</h2>
                    <h2 className='benefits_item mb-3'>+ Discover what to watch next</h2>
                    <h2 className='benefits_item mb-3'>+ Add Movies and TV shows to your Watchlist</h2>
                    <h2 className='benefits_item mb-3'>+ Keep track of everything you are watching</h2>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default LogIn