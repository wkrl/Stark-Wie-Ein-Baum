import deviceIcon from '../images/icons/device_location.svg';


/* This creates a new google.maps.Polyline from a coordinates array */
export const createPolylineFromRoute = route => {
    return new window.google.maps.Polyline({
        path: route,
        geodesic: true,
        strokeColor: '#FFF',
        strokeOpacity: 1.0,
        strokeWeight: 2.5
    });
}


/* This adds a user location marker to google.maps.Map */
export const initDeviceLocationMarker = (map, errorCallback) => {
    let marker;

    let iconImage = new window.google.maps.MarkerImage(
        deviceIcon,
        new window.google.maps.Size(95, 95), // icon width and height
        new window.google.maps.Point(0, 0),
        new window.google.maps.Point(47, 47) // icon anchor
    );

    let locationOptions = {
        enableHighAccuracy: true,
        timeout: 3000
    };

    const updateLocationMarker = pos => {
        marker.setPosition(new window.google.maps.LatLng({ lat: pos.coords.latitude, lng: pos.coords.longitude }));
    }

    navigator.geolocation.getCurrentPosition(pos => {
        let position = new window.google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        marker = new window.google.maps.Marker({ position, map, icon: iconImage, zIndex: 100, optimized: false });
        marker.setMap(map);

        navigator.geolocation.watchPosition(
            pos => updateLocationMarker(pos),
            errorCallback,
            locationOptions
        );
    }, errorCallback);
}