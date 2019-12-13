import React from 'react';

import './App.css';

import JobsView from "./views/JobsView";
import ProvidersView from "./views/ProvidersView";

const App: React.FC = () => {
  return (
    <div className="App">
      <ProvidersView/>
    </div>
  );
}

export default App;
