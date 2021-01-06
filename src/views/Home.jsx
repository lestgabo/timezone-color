import React,  { useContext } from 'react';
import CitiesContext from '../context/CitiesContext';

export const Home = () => {
    const cities = useContext(CitiesContext)

    console.log('INSIDE Home');
    console.log('cities: ', cities);
    return (
        <>
            {/* <CitiesContext.Consumer>
                {value => 
                    // console.log('value: ', value)
                    value.a
                }
            </CitiesContext.Consumer> */}
            Here are the cities {cities}
        </>
    )
}
