import React, { useState, useEffect, useCallback, useRef } from "react";
import { useGeolocated } from "react-geolocated";

export default function Geolocation({coordsStateSetter}) {

    const {
        coords,
        isGeolocationAvailable,
        isGeolocationEnabled,
        positionError,
    } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        }
    });


    const [myCoords, setMyCoords] = useState(undefined);

    useEffect(() => {
        if (coords !== undefined) {
            let latitude = coords.latitude;
            let longitude = coords.longitude;
    
            setMyCoords(coords)
            coordsStateSetter(myCoords);
        }

        
    }, [coordsStateSetter, myCoords, coords]);




    return !isGeolocationAvailable ? (
        <div class='weatherLocation'>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
        <div class='weatherLocation'>Geolocation is not enabled</div>
    ) : coords ? (
        // <div>Successfully got coords</div>
        <></>
    ) : (
        <div class='weatherLocation'>Loading...</div>
    );


};