import React, { Component } from 'react';
import logo from './logo.svg';
import  AppRoute from "./app-router";
import './App.css';

import moment from "moment";
moment.locale('pt-br')

class Main extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <div className="container">
          <img src={logo} className="App-logo" alt="logo" />
            <AppRoute />
          </div>
        </header>
      </div>
    );
  }
}

export default Main;
