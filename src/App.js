import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './App.css';
import GasMap from './MapWithGasStations';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Sidebar />
        <GasMap />
      </div>
    </div>
  );
}

export default App;
