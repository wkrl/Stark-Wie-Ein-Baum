import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab/';
import { Tooltip } from '@material-ui/core/';
import { orchardRoute, trainStationRoute } from '../helpers/routes/';
import { createPolylineFromRoute, initDeviceLocationMarker } from '../helpers/map';
import { setTrainRouteMarkers, setOrchardRouteMarkers } from '../helpers/markers';
import TrainIcon from '@material-ui/icons/Train';
import NatureIcon from '@material-ui/icons/Nature';

import { GOOGLE_MAPS_API_KEY } from '../.env';

var map, orchardPath, trainStationPath;

const MAP_CENTER = { lat: 52.874063, lng: 13.223638 };
const MAP_ZOOM = 18;

const useStyles = makeStyles({
    toggleContainer: {
      position: 'absolute',
      bottom: '30px',
      width: '100vw',
      textAlign: 'center',
    },
    toggleGroup: {
      backgroundColor: 'lightgrey',
    },
    toggleButton: {
        padding: '12px 24px',
    }
});

const RoutesMap = () => {
    const classes = useStyles();
    const [route, setRoute] = useState("");
    const [error, setError] = useState({ message: "" })

    const onScriptLoad = () => {
        map = new window.google.maps.Map(
            document.getElementById("map"),
            {
                center: MAP_CENTER,
                zoom: MAP_ZOOM,
                disableDefaultUI: true,
                mapTypeId: 'hybrid',
                styles: [{
                    featureType: 'poi',
                    stylers: [{ visibility: 'off' }]
                }]
            }
        )

        trainStationPath = createPolylineFromRoute(trainStationRoute);
        orchardPath = createPolylineFromRoute(orchardRoute);

        // Set user location
        if (navigator.geolocation) {
            initDeviceLocationMarker(map, () => setError({ message: "Standort konnte nicht abgerufen werden." }));
        } else {
            setError({ message: "Standort konnte nicht abgerufen werden." })
        }
    }

    const resetPaths = () => {
        if (trainStationPath) trainStationPath.setMap(null);
        if (orchardPath) orchardPath.setMap(null);
    }

    const calculateBounds = route => {
        let bounds = new window.google.maps.LatLngBounds();
        for (let i = 0; i < route.length; i++) {
            bounds.extend(route[i]);
        }
        return bounds;
    }

    const applyRoutesToMap = newRoute => {
        let bounds;
        resetPaths();
        if (newRoute === "train") {
            trainStationPath.setMap(map);
            setTrainRouteMarkers(map);
            bounds = calculateBounds(trainStationRoute);

        }
        if (newRoute === "orchard") {
            orchardPath.setMap(map);
            setOrchardRouteMarkers(map);
            bounds = calculateBounds(orchardRoute);
        }
        map.fitBounds(bounds);
    }

    const handleRoutes = (event, newRoute) => {
        setRoute(newRoute);
        if (newRoute === null) {
            map.panTo(MAP_CENTER);
            map.setZoom(MAP_ZOOM);
        } else {
            applyRoutesToMap(newRoute);
        }
    }

    useEffect(() => {
        if (!window.google) {
            let s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = `https://maps.google.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
            let x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            s.addEventListener('load', e => {
                onScriptLoad()
            })
        } else {
            onScriptLoad()
        }
    }, []);

    return <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1', height: '100vh' }} id="map" />
        <div className={classes.toggleContainer}>
            <ToggleButtonGroup
                className={classes.toggleGroup}
                value={route}
                exclusive
                onChange={handleRoutes}
                aria-label="routes"
            >
                <ToggleButton className={classes.toggleButton} value="train" aria-label="route to train station">
                    <Tooltip title="Zum Bahnhof Grüneberg" placement="top">
                        <TrainIcon />
                    </Tooltip>
                </ToggleButton>
                <ToggleButton className={classes.toggleButton} value="orchard" aria-label="route to orchard">
                    <Tooltip title="Zur Wiese" placement="top">
                        <NatureIcon />
                    </Tooltip>
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    </React.Fragment>
}

export default RoutesMap;