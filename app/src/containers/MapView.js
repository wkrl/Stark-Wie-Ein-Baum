import React from 'react';
import NavBar from '../components/NavBar';
import { makeStyles } from '@material-ui/core/styles';
import Map from '../components/Map';

const useStyles = makeStyles(theme => ({
    mapContainer: {
        position: 'absolute',
        z: '-1',
        top: '0', 
        left: '0',        
    },
}));

const MapView = () => {
    const classes = useStyles;

    return <React.Fragment>
        <div className={classes.mapContainer}>
            <Map />
            <NavBar />
        </div>
        </React.Fragment>
}

export default MapView; 
