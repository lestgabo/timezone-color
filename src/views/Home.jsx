import React, { useState, useCallback } from 'react';

import { Search } from '../components/Search';

const Home = () => {
    const [selectedCity, setSelectedCity] = useState(null)

    const getCity = useCallback((city) => {
        setSelectedCity(city)
    }, [])

    return (
        <>
            <Search getCity={getCity} />
        </>
    )
}

export default Home;
