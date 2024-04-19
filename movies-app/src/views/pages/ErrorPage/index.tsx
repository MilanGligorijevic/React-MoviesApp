import React from 'react'
import './css/style.scss'
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';
import { useMediaQuery } from '@mui/material';
import { smallMobileScreen, tabletMobileScreen } from '../../../utilities/screenSizes';
import NavbarMobile from '../../components/NavbarMobile';

function ErrorPage() {
    const isSmallMobile = useMediaQuery(
        `(max-width: ${smallMobileScreen}px)`,
    );
    const isSmallerTablet = useMediaQuery(
        `(max-width: ${tabletMobileScreen}px)`,
    );

    return (
        <div className='error_main'>
            {isSmallMobile || isSmallerTablet ?
                <NavbarMobile />
                :
                <Navbar />
            }
            <div className='error_container text-center mt-56'>
                <h1>Nothing to see here!</h1>
                <h2>-Frank Drebin, Naked Gun</h2>
            </div>
            <Footer />
        </div>
    )
}

export default ErrorPage

