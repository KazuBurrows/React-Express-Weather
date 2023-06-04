


export default function Weather(props) {
    // have temp be passed through from app

    const {
        intervalTime,
        intervalToggle,
        weather
    } = props;


    let temp, main, precipitation, wind;
    temp = weather.temp;
    main = weather.main;
    precipitation = weather.precipitation;
    wind = weather.wind;


    // Return image icon url.
    function getIcon() {
        let src_url = "/icons/sun.png";
        switch (main) {
            case 'rain':
                src_url = "/icons/rain.png";
                break;
            case 'snow':
                src_url = "/icons/snow.png";
                break;
            default:
                break;
        }
        
        return src_url;
    }


    return (
        <>
            <div class={`weather-cells ${intervalToggle} active inactive`}>
                {/* Head component */}
                <div class={`table-header-cell ${intervalToggle}`}>{intervalTime[0].toUpperCase()+intervalTime.slice(1)}</div>


                {/* Body component */}
                <div class={`table-body-cell ${intervalToggle}`} >
                    <img class="weather_icon" src={getIcon()} alt="weather icon"/> 
                    <br/>
                    {temp}{'\u2103'}
                    <br/>
                    {/* {precipitation}% */}
                    {/* <br/>
                    {wind}km/h */}
                </div>

            </div>
            
        </>
    )

}