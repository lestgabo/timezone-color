import React, { useState, useEffect }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        background: (props) => props.color,
        color: 'white',
        textShadow: '0 0 2px #000'
    }
})

export const Time = ({ selectedCity }) => {
    const [city, setCity] = useState(null);
    const [time, setTime] = useState(null);
    const [hours, setHours] = useState(null)
    const [minutes, setMinutes] = useState(null)
    const [seconds, setSeconds] = useState(null)

    // updates selected city
    useEffect(() => {
        setCity(selectedCity)
    }, [selectedCity])

    // calls api to get time of city
    useEffect( () => {
        const fetchData = async () => {
            if (city) {
                // const PROXY_URL = 'https://cors-anywhere.herokuapp.com';
                // const response = await fetch(`${PROXY_URL}/http://worldtimeapi.org/api/timezone/${city.value}`);
                const response = await fetch(`http://worldtimeapi.org/api/timezone/${city.value}`);
                const newData = await response.json();
          
                if (!newData.error) {
                    let datetime = newData.datetime;
                    // datetime: 2021-01-07T03:14:52.001241-05:00 -> only want hours minutes and seconds
                    let time = datetime.split('').splice(11, 8).join('')
                    let hours = time.slice(0,2)
                    let minutes = time.slice(3,5)
                    let seconds = time.slice(6,8)

                    // ratio the numbers compared to its RGB
                    let hourRatio = Math.floor((hours/24) * 255)
                    let minuteRatio = Math.floor((minutes/60) * 255)
                    let secondRatio = Math.floor((seconds/60) * 255)
            
                    setTime(time)
                    setHours(hourRatio);
                    setMinutes(minuteRatio);
                    setSeconds(secondRatio);
                }
            }
        }
        fetchData();
    }, [city])

    // color of bg -> tried hex but no variance in color, using rgb
    const props = {color: `rgb(${hours},${minutes},${seconds})`}
    const classes = useStyles(props);

    return (
        <div className={classes.root}>
            { city ? (
                <>
                    <Typography variant='h3'>What time and color is it at {city.label}?</Typography>
                    <Typography variant='h1' gutterBottom>It is currently {time} and color {props.color} at {city.label}.</Typography>
                </>
            ) : null}
        </div>
    )
}
