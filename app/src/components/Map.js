import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useGlobal from '../store';
import { useMediaQuery } from '@material-ui/core';
import { Snackbar, SnackbarContent } from '@material-ui/core/';
import TreeInfoBox from './TreeInfoBox.js';
import Chip from '@material-ui/core/Chip';
import quitteIcon from '../images/icons/quitte_icon.svg';
import apfelIcon from '../images/icons/apfel_icon.svg';
import birneIcon from '../images/icons/birne_icon.svg';
import pflaumeIcon from '../images/icons/pflaume_icon.svg';
import grayQuitteIcon from '../images/icons/quitte_icon_gray.svg';
import grayApfelIcon from '../images/icons/apfel_icon_gray.svg';
import grayBirneIcon from '../images/icons/birne_icon_gray.svg';
import grayPflaumeIcon from '../images/icons/pflaume_icon_gray.svg';
import deviceIcon from '../images/icons/device_location.svg';
import mapPin from '../images/icons/map_pin.svg';

const axios = require('axios');
var map, marker;

const Map = () => {    
    let clickedIconId;
    let features = [];

    const isDesktop = useMediaQuery('(min-width:426px)'); 
    const history = useHistory();

    const [globalState, globalActions] = useGlobal();
    const [error, setError] = React.useState({ message: "" });
    const [clickInfo, setClickInfo] = React.useState(true);
    const [state, setState] = useState({
        "open": false,
        "hasSponse": null,
        "treeId": null,
        "sortenId": null,
        "reihe": null,
        "pflanzreihePosition": null,
    });

    const handleClose = (_, reason) => {
        if (reason === 'clickaway') return;        
        setError({ message: "" });
        setClickInfo(false);
    };

    const addResponseToFeatures = (data) => {
        data.forEach(tree => {
            let feature = {
                "geometry": { "coordinates": [tree.Latitude, tree.Longitude], "type": "Point" },
                "properties": { 
                    "hasSponsor": !!tree.PatenID, 
                    "treeId": tree.BaumNr, 
                    "sortenId": tree.SortenID, 
                    "frucht": tree.Frucht, 
                    "reihe": tree.Pflanzreihe, 
                    "pflanzreihePosition": tree.PflanzreihePosition 
                },
                "type": "Feature",
                "id": tree.BaumNr,
            }
            features.push(feature);
        });
    }    

    const getIcon = (feature) => {
        const isFilteredMap = globalState.fruitTypeIds.length > 0; 
        const name = feature.getProperty("frucht");
        const hasSponsor = feature.getProperty("hasSponsor");

        if (name === "Apfel") return isFilteredMap ? hasSponsor ? apfelIcon : grayApfelIcon : apfelIcon;
        if (name === "Quitte") return isFilteredMap ? hasSponsor ? quitteIcon : grayQuitteIcon : quitteIcon;
        if (name === "Pflaume") return isFilteredMap ? hasSponsor ? pflaumeIcon : grayPflaumeIcon : pflaumeIcon;
        if (name === "Birne") return isFilteredMap? hasSponsor ? birneIcon : grayBirneIcon : birneIcon;    
    }

    const changeGeoJsonIcons = () => {        
        map.data.setStyle(feature => { return ({ icon: { url: getIcon(feature) } }) });        
    } 

    const filterResponseData = response => {
        if (globalState.fruitTypeIds.length > 0) {
            return {...response, data: response.data.filter(tree => globalState.fruitTypeIds.indexOf(tree.SortenID) > -1)};         
        }
        return response;
    }

    const filterDelete = () => globalActions.updateState("fruitTypeIds", []);    

    const onScriptLoad = () => {
        map = new window.google.maps.Map(
            document.getElementById("map"),
            { center: { lat: 52.870173, lng: 13.265909 }, zoom: 19, minZoom: 17, disableDefaultUI: true, mapTypeId: 'satellite' }
        );

        let iconImage = new window.google.maps.MarkerImage(
            deviceIcon,
            new window.google.maps.Size(95, 95), // icon width and height 
            new window.google.maps.Point(0, 0),
            new window.google.maps.Point(47, 47) // icon anchor
        );

        const updateLocationMarker = pos => marker.setPosition(new window.google.maps.LatLng({ lat: pos.coords.latitude, lng: pos.coords.longitude }));        

        const initDeviceLocationMarker = () => {
            let options = { enableHighAccuracy: true, timeout: 3000 };

            navigator.geolocation.getCurrentPosition(pos => {
                let position = new window.google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                marker = new window.google.maps.Marker({ position, map, icon: iconImage });
                marker.setMap(map);

                navigator.geolocation.watchPosition(
                    pos => updateLocationMarker(pos),
                    () => setError({ message: "Standort konnte nicht abgerufen werden." }),
                    options
                );
            }, () => setError({ message: "Standort konnte nicht abgerufen werden." }));
        }

        // Set map data
        axios.get("https://swebapi.demo.datexis.com/api/karte")
            .then(response => filterResponseData(response))
            .then(response => {                
                addResponseToFeatures(response.data);
                if (navigator.geolocation) {
                    initDeviceLocationMarker();
                } else {
                    setError({ message: "Standort konnte nicht abgerufen werden." })
                }
                changeGeoJsonIcons();
                map.data.addGeoJson({ "type": "FeatureCollection", features });
                setClickInfo(true);
            })
            .catch(() => setError({ message: "Bäume konnten nicht geladen werden!" }));

        // Display info box
        map.data.addListener('click', function (event) {
            let hasSponsor = event.feature.getProperty("hasSponsor");
            let treeId = event.feature.getProperty("treeId");
            let sortenId = event.feature.getProperty("sortenId");
            let pflanzreihePosition = event.feature.getProperty("pflanzreihePosition");
            let reihe = event.feature.getProperty("reihe");

            // If clicked feature exists, reset icon
            if (clickedIconId && clickedIconId !== treeId) {
                let feature = map.data.getFeatureById(clickedIconId);
                map.data.overrideStyle(feature, { icon: getIcon(feature) });
            }

            setState({ "open": true, "hasSponsor": hasSponsor, "treeId": treeId, "sortenId": sortenId, "reihe": reihe, "pflanzreihePosition": pflanzreihePosition });

            clickedIconId = treeId;
            map.data.overrideStyle(event.feature, { icon: mapPin });
            map.panTo(new window.google.maps.LatLng(event.latLng.lat(), event.latLng.lng()));
        });

        window.google.maps.event.addListener(map, 'click', function () {
            // If clicked feature exists, reset icon
            if (clickedIconId) {
                let feature = map.data.getFeatureById(clickedIconId);
                map.data.overrideStyle(feature, { icon: getIcon(feature) });
            }

            // Close info box when clicking on map
            setState({ "open": false, "hasSponsor": null, "treeId": null, "sortenId": null, "reihe": null, "pflanzreihePosition": null });
        })
    }

    useEffect(() => {
        if (!window.google) {
            let s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'https://maps.google.com/maps/api/js?key=AIzaSyCdyHnS8ib7S3WTpOe8TD1XjxGbWtHKb-o';
            let x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            s.addEventListener('load', () => onScriptLoad())
        } else {
            onScriptLoad()
        }
    }, [clickedIconId, globalState.fruitTypeIds]);

    return <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1', height: '100vh' }} id="map" />
        {!state.open &&
            <Snackbar open={clickInfo} autoHideDuration={6000} onClose={handleClose}>
                <SnackbarContent
                    style={{ backgroundColor: 'rgb(236, 108, 63)' }}
                    message={"Klicke auf Bäume, um mehr Infos zu sehen."}
                />
            </Snackbar>}
        <Snackbar open={error.message.length > 0} autoHideDuration={6000} onClose={handleClose}>
            <SnackbarContent
                style={{ backgroundColor: 'rgb(211, 56, 47)' }}
                message={error.message}
            />
        </Snackbar>
        {state.open &&
            <TreeInfoBox parentCallback={childData => setState({ "open": childData })}
                key={new Date()}
                reihe={state.reihe}
                pflanzreihePosition={state.pflanzreihePosition}
                treeId={state.treeId}
                sortenId={state.sortenId}
                hasSponsor={state.hasSponsor} />}
        {globalState.fruitTypeIds.length > 0 && 
            <Chip
                label={"Sortenfilter"}
                onDelete={filterDelete}
                color="primary"
                style={{ position: 'absolute', top: isDesktop ? '82px' : '72px', left: '12px', zIndex: '1' }} />}
        {globalState.fruitTypeIds.length < 1 && 
            <Chip
                label={"Zum Sortenfilter"}
                onClick={() => history.push("/lieblingssorte")}
                color="primary"
                style={{ position: 'absolute', top: isDesktop ? '82px' : '72px', left: '12px', zIndex: '1' }} />}
    </React.Fragment>
}

export default Map;
