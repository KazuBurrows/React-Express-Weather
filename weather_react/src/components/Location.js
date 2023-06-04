import React, { useState, useEffect } from 'react';
import Geocode from "react-geocode";
import '../styles/Location.css';

export default function Location(props) {
    const {
        coords,
        locationStateSetter
    } = props;

    const [country, setCountry] = useState();
    const [city, setCity] = useState();
    const [suburb, setSuburb] = useState();
    // const [location, setLocation] = useState();


    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey("AIzaSyBGfzzlIN5Szl_Ov-6HId4D1dsQ9502bkM");

    // set response language. Defaults to english.
    Geocode.setLanguage("en");


    /**
     * Get location by latitude & longitude from 'geoCode' api.
     */
    useEffect(() => {
        
        let suburb, city, country;

        // Get address from latitude & longitude.
        const getToken = async () => { Geocode.fromLatLng(coords.latitude, coords.longitude).then(
            (response) => {
                const address = response.results[0];

                country = address.address_components[5].long_name;
                city = address.address_components[3].long_name;
                suburb = address.address_components[2].long_name;


                setCountry(country)
                setCity(city)
                setSuburb(suburb)

            },
            (error) => {
                console.error(error);
            }
        )};


        if (coords !== undefined) {
            getToken()
        }
        
    }, [coords]);


    useEffect(() => {

        // setLocation(suburb)
        if (suburb !== undefined) {
            locationStateSetter([country, city, suburb]);
        }
        

    }, [locationStateSetter, suburb]);          // 'suburb' state set last and if 'suburb' is set then 'country' & 'city'.


    if (suburb !== undefined) {
        return (
            <div class='weatherLocation'>
                <img src='https://img.icons8.com/windows/96/FFFFFF/marker.png' alt="Girl in a jacket"></img>
                {city}, {suburb}
                {/* <p>{country}</p> */}
            </div>
        )
    }

    return (
        <p class='weatherLocation'>Location not found.</p>
    )

}


// AIzaSyBGfzzlIN5Szl_Ov-6HId4D1dsQ9502bkM