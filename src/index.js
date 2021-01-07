import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import App from './App';
import reportWebVitals from './reportWebVitals';

const theme = createMuiTheme({
    typography: {
        fontFamily: "'Fira Code', 'monospace'",
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
    },
    palette: {
        primary: {
            main: '#1E90FF',
            // light: '#77769A',
        },
        secondary: {
            main: '#008000',
            // light: '#C96471',
        },
    },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
