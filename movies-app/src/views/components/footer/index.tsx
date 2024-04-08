import React from 'react'
import './css/style.scss'

function Footer() {
    return (
        <div className='footer_main '>
            <div className='footer_top flex justify-center items-start gap-20 p-3'>
                <div className='footer_about_us'>
                    <p>About us</p>
                    <p>About POPCORN</p>
                    <p>Purpose</p>
                    <p>Careers</p>
                </div>
                <div className='footer_contact'>
                    <p>Contact Us</p>
                    <p>Customer service</p>
                    <p>(000) 123-4567</p>
                </div>
                <div className='footer_socials'>
                    <p>Socials</p>
                    <p>Facebook</p>
                    <p>Instagram</p>
                    <p>Twitter</p>
                    <p>Youtube</p>
                </div>
            </div>
            <div className='footer_bottom text-center font-bold p-3'>
                <div>© 2024 POPCORN. All rights reserved. by MG</div>
            </div>
        </div>
    )
}

export default Footer