import React, { useState, useEffect, useCallback } from "react";

import Geolocation from "./components/dataRetrievers/Geolocation";
import Location from './components/Location';
import Temp from './components/Temp';
import WeatherList from './components/WeatherList';
import { apiController, apiWeatherList } from "./components/dataRetrievers/apiController";

import './styles/App.css';
import './styles/Loading.css';
import $ from 'jquery';


// import { useCookies } from 'react-cookie';


function App() {

  const [coords, setCoords] = useState();
  const [location, setLocation] = useState();
  const [weather, setWeather] = useState();
  // const [cookie, setCookie, removeCookie] = useCookies(["location-cookie"]);
  const [isPageReady, setIsPageReady] = useState(false);




  // Pass a callback function in React component to get back users coords, then set state.
  const coordsStateSetter = useCallback(coords => {
    setCoords(coords);
  }, []);

  // Pass a callback function in React component to get back users location, then set state.
  const locationStateSetter = useCallback(location => {
    setLocation(location)
  }, []);


  // // Used to set/ update 'cookies'
  // useEffect(() => {
  //   if (location !== undefined) {                 // Condition already exists in 'Location' component.
  //     let json_location = {"country": location[0], "city": location[1], "suburb": location[2]};
  //     setCookie("location-cookie", json_location, {maxAge : 120, path: '/'});      // 'maxAge': 2min
      
  //   }
    
  // }, [location]);



  /**
   * Fetch weather data from api.
   *  Then set 'weather' state.
   */
  useEffect(() => {
    // removeCookie('testCookieName')


    if (location === undefined) return;

    (async function() {               // '(async function() {' work around for the 'await'.
      let weatherJson = await apiController(location);
      
      if (weatherJson !== undefined) {        // Since 'weatherJson' is a 'Promise', make sure it's not undifined before setting state.
        setWeather(weatherJson);
        setIsPageReady(true);

      } else {
        console.log("get api weather ERROR 'weatherJson' is undefined.",)
      }
    })();


  }, [location])



  /**
   * Hide loading animation and show weather.
   */
  useEffect(() => {
    
    if (isPageReady) {
      $('body').css('visibility', 'visible');
      $('#wrapper').css('visibility', 'hidden');
      $('#dot1').css('animation', 'none');
      $('#dot2').css('animation', 'none');
      $('#dot3').css('animation', 'none');
    }
    
    // $('body').css('background-color', 'black')

  },[isPageReady]) 



  useEffect(() => {
    $('body').css('visibility', 'hidden');
    $('#wrapper').css('visibility', 'visible');
  },[])
  
  


  return (
    <>
    <div id='wrapper'>
      <div id='loading'>Loading</div>
      <div class='dots'>
        <div id='dot1'>.</div>
        <div id='dot2'>.</div>
        <div id='dot3'>.</div>
      </div>
    </div>

      <Geolocation coordsStateSetter={coordsStateSetter}/>
      <Location
        coords={coords}
        locationStateSetter={locationStateSetter}
      />
      <Temp
        weather={weather}
        isPageReady={isPageReady}
      />
      <WeatherList
        location={location}
        apiWeatherList={apiWeatherList}
      />
    </>
  );
}

export default App;
