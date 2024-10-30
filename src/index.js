// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // make sure this line is included
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
