import React, { useContext } from 'react'
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
            <div className='pl-40 pt-16 w-6/12'>
                <h1 className='hero_section-text mb-5'>Join our growing community of TV and Movie fans</h1>
                <h2 className='hero_section-item flex items-center gap-5 mb-4'><SearchIcon />Browse TV shows and Movies</h2>
                <h2 className='hero_section-item flex items-center gap-5 mb-4'><FindEye />Discover what to watch next</h2>
                <h2 className='hero_section-item flex items-center gap-5 mb-10'><TrackIcon />Keep track of everything you are watching</h2>
                {!currentUser.user && <Link to='/signin' className='hero_section_button rounded-3xl p-2.5'>SIGN UP FOR FREE</Link>}
            </div>
            <div className='ml-10 absolute right-52 top-20'>
                <PopcornLogo width={500} height={500} color="#ffffff" />
            </div>
        </div>
    )
}

export default HeroSection