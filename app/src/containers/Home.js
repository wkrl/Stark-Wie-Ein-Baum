import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import NavBar from '../components/NavBar';
import HomeDesktop from './HomeDesktop';
import HomeMobile from './HomeMobile';

const Home = () => {
    const isDesktop = useMediaQuery('(min-width:426px)');

    return <React.Fragment>
        <NavBar isSticky></NavBar>
        {isDesktop ?
            <HomeDesktop /> :
            <HomeMobile />
        }
    </React.Fragment>
}

export default Home;
