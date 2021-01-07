import React, { useState, useCallback } from 'react';

import { Search } from '../components/Search';
import { Time } from '../components/Time';

const Home = () => {
    const [selectedCity, setSelectedCity] = useState(null)

    const getCity = useCallback((city) => {
        setSelectedCity(city)
    }, [])

    return (
        <>
            <Search getCity={getCity} />
            <Time selectedCity={selectedCity} />
        </>
    )
}

export default Home;
