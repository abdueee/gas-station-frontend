import React from 'react';
import Header from './Header';
import './App.css';
import ParentComponent from './ParentComponent';

function App() {

  return (
    <div className="App">
      <Header />
      <div className='content'>
        <ParentComponent />
      </div>
    </div>
  );
}

export default App;
