import React, {useState, useEffect} from 'react';

import CitiesContext from './CitiesContext';

export const CitiesProvider = () => {
    const [data, setData] = useState(null);
    
    useEffect( () => {
        const fetchData = async () => {
            const response = await fetch('http://worldtimeapi.org/api/timezone');
            const newData = await response.json();

            setData(newData);
        }
        fetchData();
    }, [])

    if (data) {
        // data is seen -> so api fetch is working
        // console.log('data: ', data) 
        return <CitiesContext.Provider value={data}>{this.props.children}</CitiesContext.Provider>;
        
    } else {
        return null;
    }
}
