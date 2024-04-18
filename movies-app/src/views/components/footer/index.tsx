import React from 'react'
import './css/style.scss'
import { FacebookIcon } from '../../../assets/svg/FacebookIcon'
import { InstagramIcon } from '../../../assets/svg/InstagramIcon'
import { TwitterIcon } from '../../../assets/svg/TwitterIcon'

function Footer() {
    return (
        <div className='footer_main relative'>
            <div className='footer_top xl:flex xl:justify-center xl:items-start xl:gap-20 xl:p-6 xl:h-36 sm:gap-6 sm:p-2 sm:h-12'>
                {/* <div className='absolute left-20 top-5'>
                <PopcornLogo height={80} width={80} color="#ffffff"/>
                </div> */}
                <div className='footer_about_us xl:block sm:hidden'>
                    <h1>COMPANY</h1>
                    <p className='footer_item cursor-pointer'>About</p>
                    <p className='footer_item cursor-pointer'>Purpose</p>
                    <p className='footer_item cursor-pointer'>Careers</p>
                </div>
                <div className='footer_contact xl:block sm:hidden'>
                    <h1>USEFUL LINKS</h1>
                    <p className='footer_item cursor-pointer'>Support</p>
                    <p className='footer_item cursor-pointer'>Contact</p>
                </div>
                <div className='footer_socials'>
                    <h1 className='xl:block sm:hidden'>SOCIALS</h1>
                    <div className='flex gap-3 justify-center'>
                        <FacebookIcon />
                        <InstagramIcon />
                        <TwitterIcon />
                    </div>
                </div>
            </div>
            <div className='footer_bottom text-center p-3'>
                <div>  <span className='font-semibold'>© 2024 <a href="https://github.com/MilanGligorijevic/React-MoviesApp" target='_blank' rel="noreferrer">POPCORN.</a></span> All rights reserved. by <span className='font-semibold'><a href="https://github.com/MilanGligorijevic" target='_blank' rel="noreferrer">MG</a></span></div>
            </div>
        </div>
    )
}

export default Footer