import React, { useContext }  from 'react';
import Select from 'react-select';

import CitiesContext from '../context/CitiesContext';

export const Search = () => {
    const cities = useContext(CitiesContext);

    return (
        <Select 
            options={cities}
        />
    )
}
