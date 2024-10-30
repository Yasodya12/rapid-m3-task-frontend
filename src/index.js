// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // make sure this line is included
import App from './App';
import {store} from "./store/store";
import {Provider} from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
