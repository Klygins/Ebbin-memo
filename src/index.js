import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import {initdb} from './db'

initdb()

ReactDOM.render(
    <Suspense fallback='Loading'>
        <App />
    </Suspense>,
    document.getElementById('root')
);