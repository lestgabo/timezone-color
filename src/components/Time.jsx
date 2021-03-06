import React, { useState, useEffect }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        background: (props) => props.color,
        color: 'white',
        textShadow: '0 0 2px #000',
        height: 'calc(100vh - 38px)'
    }
})

export const Time = ({ selectedCity }) => {
    const [city, setCity] = useState(null);
    const [timeDifference, setTimeDifference] = useState(null)
    const [liveTime, setLiveTime] = useState(null)
    const [timeNow, setTimeNow] = useState(new Date().getTime());
    const [props, setProps] = useState({ color: `rgb(0,0,0)` })

    // updates selected city
    useEffect(() => {
        setCity(selectedCity)
    }, [selectedCity])

    // calls api to get time of city
    useEffect( () => {
        const fetchData = async () => {
            if (city) {
                const response = await fetch(`http://worldtimeapi.org/api/timezone/${city.value}`);    
                const newData = await response.json();

                if (!newData.error) {
                    /** now using live time */
                    let datetime = newData.datetime;
                    // datetime: 2021-01-07T03:14:52.001241-05:00 -> only want hours minutes and seconds
                    let time = datetime.split('').splice(11, 8).join('')
                    let hours = time.slice(0,2)
                    let minutes = time.slice(3,5)
                    let seconds = time.slice(6,8)           

                    // make live time
                    /**
                        algorithm: get city time, subtract with localtime, get time difference
                        use localtime to get new time every second, and then add the time difference to get city time
                     */
                    let timeNow = new Date();
                    let nowHours = timeNow.getHours()
                    let nowMinutes = timeNow.getMinutes()
                    let nowSeconds = timeNow.getSeconds()
                    let tempNow = new Date(0,0,0, nowHours, nowMinutes, nowSeconds)
                    let tempCity = new Date(0,0,0,hours,minutes,seconds)
                    // convert to milliseconds and get difference
                    setTimeDifference(tempCity.getTime() - tempNow.getTime())
                }
            }
        }
        fetchData();
    }, [city])

    // live time
    useEffect( () => {
        const timerID = setInterval( () => tick(), 1000 )

        let timeCity = new Date(timeNow + timeDifference);
        let cityHours = timeCity.getHours()
        let cityMinutes = timeCity.getMinutes()
        let citySeconds = timeCity.getSeconds()
        // pad 0 to single digits
        if (cityHours < 10) cityHours = '0'+ cityHours
        if (cityMinutes < 10) cityMinutes = '0'+ cityMinutes
        if (citySeconds < 10) citySeconds = '0'+ citySeconds
        setLiveTime(`${cityHours}:${cityMinutes}:${citySeconds}`);

        // ratio the numbers compared to its RGB
        let hourRatio = Math.floor((cityHours/24) * 255)
        let minuteRatio = Math.floor((cityMinutes/60) * 255)
        let secondRatio = Math.floor((citySeconds/60) * 255)
                    
        setProps({ color: `rgb(${hourRatio},${minuteRatio},${secondRatio})` })

        return () => clearInterval(timerID)
    }, [timeDifference, timeNow])

    const tick = () => {
        setTimeNow(new Date().getTime())
    }

    // color of bg -> tried hex but no variance in color, using rgb
    const classes = useStyles(props);

    return (
        <div className={classes.root}>
            { city ? (
                <>
                    <br />
                    <Typography variant='h4'>What time-color is it in {city.label}?</Typography>
                    <br />
                    <br />
                    <Typography variant='h1' gutterBottom>It is {liveTime} and color {props.color} in {city.label}.</Typography>
                </>
            ) : null}
        </div>
    )
}
