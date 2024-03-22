import React from 'react';
import Header from './Header';
import MapInterface from './MapInterface';
import Sidebar from './Sidebar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Sidebar />
        <MapInterface />
      </div>
    </div>
  );
}

export default App;
