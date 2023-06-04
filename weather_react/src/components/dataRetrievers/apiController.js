var myHeaders = new Headers();
myHeaders.append('Access-Control-Allow-Origin', "*");
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

const BASE_URL = "https://restweatherapi.herokuapp.com/api/weather";



// pass in cookie
async function apiController(location, option='now') {
    const TANGENT_BEST_URL = `/${option}&${location}`;
    return await fetch(BASE_URL+TANGENT_BEST_URL, requestOptions)
    .then(res => res.json())
    .then(data => {
        try {                           // If data is error message then catch.
            // console.log("In fetch:", data[0].forecast[0].temp)
            console.log("In 'NOW' fetch:", data)
            return data[0];
        } catch {
            return data;
        }
    })


}



/**
 * Get weather list from api.
 * @param {*} location 
 * @param {String} option "hourly weather, 7 day week weather."
 */
async function apiWeatherList(location, option) {
    const TANGENT_BEST_URL = `/${option}&${location}`;
    return await fetch(BASE_URL+TANGENT_BEST_URL, requestOptions)
    .then(res => res.json())
    .then(data => {
        try {                           // If data is error message then catch.
            console.log("In 'INTERVAL' fetch:", data[0])
            return data[0];
        } catch {
            console.log("Fetching error.")
            return data;
        }
    })
}




export { apiController, apiWeatherList }