import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import NavBar from "components/navBar/NavBar";
import Home from "views/home/Home";
import Resume from "views/resume/Resume";

import './App.scss'

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <Switch>
          <Route path="/resume">
            <Resume />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
