import React, { useState, useEffect }  from 'react';

const defaultTime = new Date();

export const Time = ({ selectedCity }) => {
    const [city, setCity] = useState('America/Vancouver');
    const [data, setData] = useState({datetime: defaultTime.toLocaleString()});
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
            // const PROXY_URL = 'https://cors-anywhere.herokuapp.com';
            // const response = await fetch(`${PROXY_URL}/http://worldtimeapi.org/api/timezone/${city}`);
            const response = await fetch(`http://worldtimeapi.org/api/timezone/${city}`);
            const newData = await response.json();
      
            if (!newData.error) {
                let datetime = newData.datetime;
                // datetime: 2021-01-07T03:14:52.001241-05:00 -> only want hours minutes and seconds
                let time = datetime.split('').splice(11, 8).join('')
                let hours = time.slice(0,2)
                let minutes = time.slice(3,5)
                let seconds = time.slice(6,8)
        
                setTime(time)
                setHours(hours);
                setMinutes(minutes);
                setSeconds(seconds);
            }
        }
        fetchData();
    }, [city])

    // console.log('time: ', time)
    // console.log('hours: ', hours)
    // console.log('minutes: ', minutes)
    // console.log('seconds: ', seconds)
    return (
        <span>{city}</span>
    )
}
