import React from 'react'
import './css/style.scss'
import { PopcornLogo } from '../../../assets/svg/PopcornLogo'
import { SearchIcon } from '../../../assets/svg/SearchIcon'
import { FindEye } from '../../../assets/svg/DiscoverIcon'
import { TrackIcon } from '../../../assets/svg/TrackIcon'
import { useCurrentUser } from '../../../context/usersContext'
import { Link } from 'react-router-dom'

function HeroSection() {
    const currentUser = useCurrentUser();

    return (
        <div className='hero_section flex-column relative overflow-hidden'>
            <div className='pl-40 pt-16 w-6/12 sm:pl-5 sm:pt-6 sm:pr-5 sm:w-full md:w-9/12 s:w-full s:pt-6 s:pl-5'>
                <h1 className='hero_section-text mb-5 text-4xl sm:text-xl s:text-2xl'>Join our growing community of TV and Movie fans</h1>
                <h2 className='hero_section-item flex items-center gap-5 mb-4 sm:text-lg s:text-lg'><SearchIcon />Browse TV shows and Movies</h2>
                <h2 className='hero_section-item flex items-center gap-5 mb-4 sm:text-lg s:text-lg'><FindEye />Discover what to watch next</h2>
                <h2 className='hero_section-item flex items-center gap-5 mb-10 sm:text-lg sm:gap-6 sm:mb-6 s:text-lg s:gap-6 s:mb-6'><TrackIcon />Keep track of everything you watch</h2>
                {!currentUser.user && <Link to='/signin' className='hero_section_button rounded-3xl p-2.5 sm:p-2 sm:text-lg s:p-2 s:text-lg'>SIGN UP FOR FREE</Link>}
            </div>
            <div className='ml-10 absolute right-52 top-20 block sm:hidden xl:right-16 md:hidden s:hidden'>
                <PopcornLogo width={500} height={500} color="#ffffff" />
            </div>
        </div>
    )
}

export default HeroSection