import React from 'react'
import './css/style.scss'
import { FacebookIcon } from '../../../assets/svg/FacebookIcon'
import { InstagramIcon } from '../../../assets/svg/InstagramIcon'
import { TwitterIcon } from '../../../assets/svg/TwitterIcon'

function Footer() {
    return (
        <div className='footer_main relative mt-16'>
            <div className='footer_top flex justify-center items-start gap-20 p-6 h-36'>
                {/* <div className='absolute left-20 top-5'>
                <PopcornLogo height={80} width={80} color="#ffffff"/>
                </div> */}
                <div className='footer_about_us'>
                    <h1>COMPANY</h1>
                    <p className='footer_item cursor-pointer'>About</p>
                    <p className='footer_item cursor-pointer'>Purpose</p>
                    <p className='footer_item cursor-pointer'>Careers</p>
                </div>
                <div className='footer_contact'>
                    <h1>USEFUL LINKS</h1>
                    <p className='footer_item cursor-pointer'>Support</p>
                    <p className='footer_item cursor-pointer'>Contact</p>
                </div>
                <div className='footer_socials'>
                    <h1>SOCIALS</h1>
                    <div className='flex gap-3'>
                    <FacebookIcon />
                    <InstagramIcon />
                    <TwitterIcon />
                    </div>
                </div>
            </div>
            <div className='footer_bottom text-center p-3'>
                <div>  <span className='font-semibold'>© 2024 POPCORN.</span> All rights reserved. by <span className='font-semibold'>MG</span></div>
            </div>
        </div>
    )
}

export default Footer