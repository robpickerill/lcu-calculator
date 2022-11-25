import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <BrowserRouter basename='https://github.bamtech.co/pages/rpickerill/'>
        <App />
    </BrowserRouter>
    , document.getElementById('root')
);