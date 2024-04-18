import React from 'react'
import './css/style.scss'
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

function ErrorPage() {
    return (
        <div className='error_main'>
            <Navbar />
            <div className='error_container text-center mt-52'>
                <h1>Nothing to see here!</h1>
                <h2>-Frank Drebin, Naked Gun</h2>
            </div>
            <Footer />
        </div>
    )
}

export default ErrorPage

