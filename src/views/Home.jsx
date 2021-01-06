import React,  { useContext } from 'react';
import CitiesContext from '../context/CitiesContext';

export const Home = () => {
    const cities = useContext(CitiesContext)
    console.log('cities: ', cities);
    return (
        <>
        Hello from home
        </>
    )
}
