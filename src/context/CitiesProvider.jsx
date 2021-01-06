import React, {useState, useEffect} from 'react';

import CitiesContext from './CitiesContext';

export const CitiesProvider = ({ children }) => {
    const [data, setData] = useState(null);
    
    useEffect( () => {
        const fetchData = async () => {
            const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
            const response = await fetch(`${PROXY_URL}http://worldtimeapi.org/api/timezone`);
            const newData = await response.json();

            setData(newData);
        }
        fetchData();
    }, [])

    if (data) {
        // data is seen -> so api fetch is working
        return <CitiesContext.Provider value={data}>{children}</CitiesContext.Provider>;
    } else {
        return null;
    }
}
