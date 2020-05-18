import React, { useEffect, useState } from 'react';
import { Snackbar, SnackbarContent } from '@material-ui/core/';
import TreeInfoBox from './TreeInfoBox.js';
import quitteIcon from '../images/icons/quitte_icon.svg';
import apfelIcon from '../images/icons/apfel_icon.svg';
import birneIcon from '../images/icons/birne_icon.svg';
import pflaumeIcon from '../images/icons/pflaume_icon.svg';
import mapPin from '../images/icons/map_pin.svg';


const axios = require('axios');
var map; 

const Map = (props) => {
    let clickedIconId;
    let features = [];

    const [error, setError] = React.useState(false);
    const [clickInfo, setClickInfo] = React.useState(true);
    const [state, setState] = useState({
        "open": false, 
        "hasSponse": null, 
        "treeId": null,
        "sortenId": null,
        "reihe": null, 
        "pflanzreihePosition": null,    
    });    

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setError(false);
        setClickInfo(false);
    };

    const addResponseToFeatures = (data) => {
        data.map(tree => { 
            let feature = {                
                "geometry": {
                    "coordinates": [tree.Latitude, tree.Longitude],
                    "type": "Point",
                },
                "properties": {
                    "hasSponsor": tree.PatenID === 0 ? false : true,
                    "treeId": tree.BaumNr,
                    "sortenId": tree.SortenID,
                    "frucht": tree.Frucht,
                    "reihe": tree.Pflanzreihe, 
                    "pflanzreihePosition": tree.PflanzreihePosition, 
                },
                "type": "Feature",
                "id": tree.BaumNr, 
            }
            features.push(feature);
        });
    }

    const getIconBasedOnFruitname = (name) => {
        if (name === "Apfel") return apfelIcon;
        if (name === "Quitte") return quitteIcon;
        if (name === "Pflaume") return pflaumeIcon;
        if (name === "Birne") return birneIcon;
    }

    const changeGeoJsonIcons = () => {
        map.data.setStyle(function(feature) {
            let fruitname = feature.getProperty("frucht");
            return ({icon: { url: getIconBasedOnFruitname(fruitname) }}); 
        });
    }

    const onScriptLoad = () => {
        map = new window.google.maps.Map(
            document.getElementById("map"),
            {
                center: { lat: 52.870173, lng: 13.265909 },
                zoom: 19,
                minZoom: 17,
                disableDefaultUI: true,
                mapTypeId: 'satellite',                
            }
        )

        // Get map features
        axios.get("https://swebapi.demo.datexis.com/api/karte")
        .then(response => {
            addResponseToFeatures(response.data);
            map.data.addGeoJson({"type": "FeatureCollection", "features": features});            
            changeGeoJsonIcons();
            setClickInfo(true);
        })        
        .catch((e) => {
            setError(true);
        });

        // Display info box
        map.data.addListener('click', function(event) {
            let hasSponsor = event.feature.getProperty("hasSponsor"); 
            let treeId = event.feature.getProperty("treeId");     
            let sortenId = event.feature.getProperty("sortenId");
            let pflanzreihePosition = event.feature.getProperty("pflanzreihePosition");
            let reihe = event.feature.getProperty("reihe");

            // If clicked feature exists, reset icon
            if (clickedIconId && clickedIconId !== treeId) {
                let feature = map.data.getFeatureById(clickedIconId);
                let fruitname = feature.getProperty("frucht");
                map.data.overrideStyle(feature, {icon: getIconBasedOnFruitname(fruitname)});
            }

            setState({        
                "open": true,                 
                "hasSponsor": hasSponsor, 
                "treeId": treeId,
                "sortenId": sortenId, 
                "reihe": reihe, 
                "pflanzreihePosition": pflanzreihePosition,                 
            });

            clickedIconId = treeId;
            map.data.overrideStyle(event.feature, {icon: mapPin});
            map.panTo(new window.google.maps.LatLng(event.latLng.lat(), event.latLng.lng()));        
        });

        window.google.maps.event.addListener(map, 'click', function() {
            // If clicked feature exists, reset icon
            if (clickedIconId) {
                let feature = map.data.getFeatureById(clickedIconId);
                let fruitname = feature.getProperty("frucht");
                map.data.overrideStyle(feature, {icon: getIconBasedOnFruitname(fruitname)});
            }

            // Close info box when clicking on map
            setState({
                "open": false, 
                "hasSponsor": null, 
                "treeId": null,
                "sortenId": null,
                "reihe": null, 
                "pflanzreihePosition": null,                 
            }); 
        })
    }

    useEffect(() => {
        if (!window.google) {
            let s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'https://maps.google.com/maps/api/js?key=AIzaSyCdyHnS8ib7S3WTpOe8TD1XjxGbWtHKb-o';
            let x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            s.addEventListener('load', e => {
                onScriptLoad()
            })
        } else {
            onScriptLoad()
        }
    }, [clickedIconId]);

    return <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1', height: '100vh' }} id="map" />
        {!state.open && 
        <Snackbar open={clickInfo} autoHideDuration={6000} onClose={handleClose}>
            <SnackbarContent
                style={{
                    backgroundColor: 'rgb(236, 108, 63)',                    
                }}
                message={                          
                    "Klicke auf Bäume, um mehr Infos zu sehen."
                }
            />
        </Snackbar>}
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
            <SnackbarContent
                style={{
                    backgroundColor: 'rgb(211, 56, 47)',
                }}
                message={                          
                    "Bäume konnten nicht geladen werden!"
                }
            />
        </Snackbar>
        {state.open && 
            <TreeInfoBox parentCallback={(childData) => setState({ "open": childData})} 
                key={new Date()} 
                reihe={state.reihe} 
                pflanzreihePosition={state.pflanzreihePosition} 
                treeId={state.treeId} 
                sortenId={state.sortenId} 
                hasSponsor={state.hasSponsor} />}
    </React.Fragment>
}

export default Map;
