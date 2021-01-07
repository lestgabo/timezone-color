import React from 'react';
import './App.css';

import Home from './views/Home';
import { CitiesProvider } from './context/CitiesProvider';

const App = () => {
    return (
        <div className="App">
            <CitiesProvider>
                <Home />
            </CitiesProvider>
        </div>
    );
};

export default App;
