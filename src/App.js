import React, { useEffect } from 'react';
import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import config from './config';
import Home from './pages/Home'
import Header from './components/Header';
import Footer from './components/Footer'
import { markMemoRepeated, searchNotCheckedMemos } from './db/api';


const App = () => {


    useEffect(() => {
        setInterval(() => {
            searchNotCheckedMemos((err, res) => {
                res.forEach(memo => {
                    if (confirm('memo text: ' + memo.text))
                        markMemoRepeated(memo.id)
                })
            })
        }, 3000)
    }, [])

    return (
        <div style={{ backgroundColor: 'rgb(249, 250, 253)' }}>
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
