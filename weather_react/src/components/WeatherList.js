import React, { useState, useEffect } from "react";

import Weather from './Weather';
import ReactDOM from 'react-dom/client'

import '../styles/WeatherList.css';
import '../styles/Hamburger.css';
import $, { get } from 'jquery';


export default function WeatherList(props) {
    const {
        location,
        apiWeatherList
    } = props;

    const [activeTab , setActiveTab] = useState();              // What weather tab is currently selected 'today' or 'seven day'.
    const [isTodayLoaded, setIsTodayLoaded] = useState(false);        // True when today weather data has been fetched.
    const [isWeekLoaded, setIsWeekLoaded] = useState(false);    // True when seven day weather data has been fetched.
    
    const [intervalWeather, setintervalWeather] = useState([]);     // 'Weather' components.
    const [weatherDom, setWeatherTableDOM] = useState();             // DOM create root




    // Toggle hamburger css animation.
    function hamburgerToggle() {
        $('#hamburger').toggleClass( 'inactive' );
        $('#hamburger-invert').toggleClass( 'inactive' );
        $('.tablinks').toggleClass( 'inactive' );
        
    }



    /**
     * OnClick select tab triggers fetch if user 'location' exists.
     * @param {String} selectedTab "Name of tab that was clicked."
     */
    function openWeatherTab(selectedTab) {
        // Do nothing if 'selectedTab' is already active.
        if (activeTab === selectedTab) {
            return;
        }

        setActiveTab(selectedTab);


        // Get interval weather data from api.
        const getIntervalWeather = async () => {               // '(async function() {' work around for the 'await'.
            let weatherData = await apiWeatherList(location, selectedTab);
            
            if (weatherData !== undefined) {
                let forecast = weatherData.forecast;
                populateIntervalWeather(forecast, selectedTab);
                
            }
            

            
            // Set 'isLoaded' states after data fetch.
            switch (selectedTab) {
                case 'today':
                    setIsTodayLoaded(true);
                    break;
                case 'week':
                    setIsWeekLoaded(true);
                    break;
                default:
            }
        };


        // Call 'getIntervalWeather' if data has not been fetched during current session.
        if (selectedTab === 'today' && isTodayLoaded) {
            toggleActiveWeather();
        }
        else if (selectedTab === 'week' && isWeekLoaded) {
            toggleActiveWeather();
            return;
        } else {
            getIntervalWeather();
        }

    }



    /**
     * Toggle 'activeTab'(week's weather..) HTML div's visibility.
     */
    function toggleActiveWeather() { 
        $('.weather-cells.today').toggleClass( 'inactive' );
        $('.weather-cells.week').toggleClass( 'inactive' );
        
    }



    /**
     * Generate & setState on Weather components before rendering to DOM
     * @param {string} interval 
     * @param {JSON} forecast 
     */
    function populateIntervalWeather(forecast, selectedTab) {
        let weatherComponent;
        let weatherComponents = [];         // Temporary array before pushing generated React components to setState.

        
        // Iterate over weather data and populate 'active' div/ 'tab'
        forecast.map(weather => {
            let intervalTime;
            
            if (selectedTab === 'today') {           // Set for 'today' tab.
                intervalTime = weather.time;
                
            } else {                                // Set for 'week' tab.
                intervalTime = weather.day;

            }
            

            // Populate array before setting state for 'weather-table' components that are appended to the DOM.
            weatherComponent = <Weather intervalTime={intervalTime} intervalToggle={selectedTab} weather={weather}/>
            weatherComponents.push(weatherComponent);

            return [];
        })

        setintervalWeather([...intervalWeather, ...weatherComponents]);     // Set state for componets for 'weather-table'.
    }



    /**
     * Once location data is ready get 'today' data for default view.
     */
    useEffect(() => {
        if (location !== undefined) {
            openWeatherTab('today');
        }
        
    }, [location])




    /**
     * Once weather data has been made into react components, append components to HTML DOM
     */
    useEffect(() => {
        console.log("WEATHER:", intervalWeather)
        if (weatherDom !== undefined) {
            weatherDom.render(intervalWeather)
        } else {
            const tempWeatherTableDOM = ReactDOM.createRoot(
                document.getElementById('weather-table')
            );

            // Set DOM root for next 'active tab' change so no duplicate roots will be made.
            setWeatherTableDOM(tempWeatherTableDOM);
    
            // Since 'weatherTableBody' will only exist after the next render just use 'tempWeatherTableBody' DOM root to render.
            tempWeatherTableDOM.render(intervalWeather);
        }

        toggleActiveWeather();
    }, [intervalWeather])





    return (
        <>
            <div class="weatherTab">
                <div id="hamburger" class='active inactive' onClick={() => hamburgerToggle()}>
                    <span class="line line1"></span>
                    <span class="line line2"></span>
                </div>
                
                <div id='hamburger-invert' class='active inactive' onClick={() => hamburgerToggle()}>
                    <span class='line-invert i-line1'></span>
                    <span class='line-invert i-line2'></span>
                </div>
                

                <div class="tablinks active inactive">
                    <button class="today active inactive" onClick={() => openWeatherTab('today')}>Today</button>
                    <button class="week active inactive" onClick={() => openWeatherTab('week')}>Week</button>            
                </div>
            </div>


            <div id="WeatherListWrapper">
                <div class="weather-title">{activeTab}</div>
                {/* Populate these divs in js via 'active' trigger. */}
                <div id="weather-table">
                    <div id="weather-table-header"></div>

                    <div id="weather-table-body"></div>
                </div>
            </div>
        </>
        




    )

}