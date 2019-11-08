import React from 'react';

import './App.css';

import ProvidersView from './views/ProvidersView'
import JobsView from "./views/JobsView";

const App: React.FC = () => {
  return (
    <div className="App">
      {/*<JobsView />*/}
      <ProvidersView />
    </div>
  );
}

export default App;
