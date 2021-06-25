import React from 'react';
import NavBar from '../components/NavBar';
import RoutesMap from '../components/RoutesMap';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    mapContainer: {
        position: 'absolute',
        z: '-1',
        top: '0',
        left: '0',
    },
}));

const RoutesView = () => {
    const classes = useStyles;

    return <React.Fragment>
        <div className={classes.mapContainer}>
            <RoutesMap />
            <NavBar />
        </div>
    </React.Fragment>
}

export default RoutesView;