import React, { useState, useEffect }  from 'react';

export const Time = ({ selectedCity }) => {
    const [city, setCity] = useState(null);

    useEffect(() => {
        setCity(selectedCity)
    }, [selectedCity])

    return (
        <span>{city}</span>
    )
}
