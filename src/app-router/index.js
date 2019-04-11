import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from '../helpers';
import  Chat from "../components/chat";
import  Main from "../components/main";
import '../App.css';

const AppRoute =()=> (
    <div className="App">        
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/chat" component={Chat} />
            </Switch> 
        </Router>
    </div>
);

export default AppRoute;
