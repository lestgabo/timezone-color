import React, {useState, useEffect} from 'react';

import CitiesContext from './CitiesContext';

export const CitiesProvider = ({ children }) => {
    const [data, setData] = useState(null);
    
    useEffect( () => {
        const fetchData = async () => {
            // const PROXY_URL = 'https://cors-anywhere.herokuapp.com';
            // const response = await fetch(`${PROXY_URL}/http://worldtimeapi.org/api/timezone`);
            const response = await fetch(`http://worldtimeapi.org/api/timezone`);
            const newData = await response.json();

            setData(newData);
        }
        fetchData();
    }, [])

    if (data) {
        // data is seen, make it searchable and have clean labels
        // search schema is: 
        // [{value: 'chocolate', label:'Chocolate'}, {value: 'vanilla', label:'Vanilla'}]
        let searchableCity = []
        data.forEach((value) => {
            // value: America/Vancouver

            // remove none city and split city from its region
            if (value.includes('/')) {
                let array = value.split('/')
                // array: [ "America", "Vancouver" ]
                let city = array.join(', ')
                // city: America, Vancouver

                // if 'New_York', we want 'New York'
                if (city.includes('_')) {
                    let temp = city.split('_')
                    // temp: [ 'America, New', 'York']
                    city = temp.join(' ')
                    // city: New York
                }

                // final result: {value: "America/New_York", label: "America, New York"}
                searchableCity.push({value: value, label: city})
            }
        })
        return <CitiesContext.Provider value={searchableCity}>{children}</CitiesContext.Provider>;
    } else {
        return null;
    }
}
