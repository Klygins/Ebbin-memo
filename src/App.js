import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import config from './config';
import Home from './pages/Home'
import Header from './components/Header';
import Footer from './components/Footer'


const App = () => {
    return (
        <div style={{backgroundColor: 'rgb(249, 250, 253)'}}>
        <Router>
            <Header />
            <Switch>
                <Route exact path={config.pages.home} component={Home} />
            </Switch>
            <Footer />
        </Router>
        </div>
    )
}

export default App;
