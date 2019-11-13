import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import './App.css'

import Home from "./views/home/Home"
import Resume from "./views/resume/Resume";

const Other = () => {
  return <div>Other</div>
}

const App: React.FC = () => {
  return (
    <div className="app">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/resume">Resume</Link>
            </li>
            <li>
              <Link to="/other">Other</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/resume">
            <Resume />
          </Route>
          <Route path="/other">
            <Other />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App
