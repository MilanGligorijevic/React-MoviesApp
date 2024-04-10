import React, { useEffect, useState } from 'react'
import './css/style.scss'
import Navbar from '../../components/Navbar'
import { auth } from '../../../firebase/config';
import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import User from '../../../types/user';
import Footer from '../../components/footer';
import { useCurrentUser } from '../../../context/usersContext';

function LogIn() {
    const [userCredentials, setUserCredentials] = useState<User>({ id: 0, email: "", password: "" });
    const currentUser = useCurrentUser();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                logInUser(user.uid, user.email); //ukoliko promenimo tab ili zatvorimo browser, user ce i dalje ostati ulogovan
            } else {
                currentUser.userDispatch({ type: 'SET_USER', payload: null });
            }
        });
        return unsubscribe;
    }, [])

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
        signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password) //sva login logika ide iz observera onAuthStateChanged
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
            <div className='log_in_container'>
                <label htmlFor="email">Email</label>
                <input type="text" id='email' name="email" placeholder='Enter email' onChange={(e) => handleCredentials(e)}></input>
                <label htmlFor="password">Password</label>
                <input type="text" id='password' name="password" placeholder='Enter password' onChange={(e) => handleCredentials(e)}></input>
                <button onClick={(e) => handleLogin(e)}>Log in</button>
                <button onClick={() => handlePasswordReset}>Forgot password?</button>
            </div>
            <Footer />
        </div>
    )
}

export default LogIn