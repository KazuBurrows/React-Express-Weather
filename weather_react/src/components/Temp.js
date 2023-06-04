import '../styles/Temp.css';


export default function Temp(props) {
    // have temp be passed through from app

    const {
        weather,
        isPageReady
    } = props;


    return (
        <>
            <div class='weatherTemp'>{(weather !== undefined ? weather.forecast[0].temp+'\u2103' : "Temp: undefined")}</div>
        </>
    )

}