import orchardLogo from '../images/logo_sweb.png';
import hofGruenebergLogo from '../images/logo_hof.png';
import { orchardRoute, trainStationRoute } from './routes';


let markers = [];

const hofGruenebergMarker = () => {
    return new window.google.maps.Marker({
        position: trainStationRoute[trainStationRoute.length - 1],
        icon: new window.google.maps.MarkerImage(
            hofGruenebergLogo,
            new window.google.maps.Size(160, 50), // icon width and height
            new window.google.maps.Point(0, 0),
            new window.google.maps.Point(160/2, 70) // icon anchor
        ),
        animation: window.google.maps.Animation.DROP,
    });
}

const orchardMarker = () => {
    return new window.google.maps.Marker({
        position: orchardRoute[orchardRoute.length - 1],
        icon: new window.google.maps.MarkerImage(
            orchardLogo,
            new window.google.maps.Size(160, 87), // icon width and height
            new window.google.maps.Point(0, 0),
            new window.google.maps.Point(160/2, 0) // icon anchor
        ),
        animation: window.google.maps.Animation.DROP,
    });
}

const setMarkers = map => markers.forEach(marker => marker.setMap(map));

const resetMarkers = () => {
    setMarkers(null);
    markers = [];
};

export const setTrainRouteMarkers = (map) => {
    resetMarkers();
    markers.push(hofGruenebergMarker());
    setMarkers(map);
}

export const setOrchardRouteMarkers = (map) => {
    resetMarkers();
    markers.push(hofGruenebergMarker(), orchardMarker())
    setMarkers(map);
}
