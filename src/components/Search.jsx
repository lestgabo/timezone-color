import React, { useContext, useState, useEffect }  from 'react';
import Select from 'react-select';

import CitiesContext from '../context/CitiesContext';

export const Search = ({getCity}) => {
    const cities = useContext(CitiesContext);
    const [selectedCity, setSelectedCity] = useState(null);

    const handleOnChange = (selected) => {
        setSelectedCity(selected);
    }

    // calls getCity function passed from parent if selected city updates
    useEffect(()=>{
        getCity(selectedCity)
    }, [getCity, selectedCity])

    return (
        <Select 
            options={cities}
            onChange={handleOnChange}
        />
    )
}
