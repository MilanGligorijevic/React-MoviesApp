import React, { useState } from 'react'
import './css/style.scss'
import Navbar from '../../components/Navbar'
import { auth } from '../../../firebase/config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import User from '../../../types/user';
import Footer from '../../components/footer';
import { useCurrentUser } from '../../../context/usersContext';

function SignIn() {
    const [userCredentials, setUserCredentials] = useState<User>({ id: 0, email: "", password: "" });
    const currentUser = useCurrentUser();


    function handleCredentials(e: React.ChangeEvent<HTMLInputElement>) {
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value })
        console.log(userCredentials)
    }

    function signInUser(id: string, email: string | null) {
        const user = { userId: id, userEmail: email };
        currentUser.userDispatch({ type: 'SET_USER', payload: user });
        console.log(currentUser.user);
    }

    function handleSignup(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        console.log("sign up")
        createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
            .then((userCredential) => {
                const { uid, email } = userCredential.user;
                signInUser(uid, email);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });

    }
    return (
        <div className='sign_in_page'>
            <Navbar />
            <div className='sign_in_container'>
                <div className='sign_in-google'>Sign in with Google</div>
                <div>Create New Account</div>
                <label htmlFor="email">Email</label>
                <input type="text" id='email' name="email" placeholder='Enter email' onChange={(e) => handleCredentials(e)}></input>
                <label htmlFor="password">Password</label>
                <input type="text" id='password' name="password" placeholder='Enter password' onChange={(e) => handleCredentials(e)}></input>
                <button onClick={(e) => handleSignup(e)}>Sign up</button>
            </div>
            <Footer />
        </div>
    )
}

export default SignIn