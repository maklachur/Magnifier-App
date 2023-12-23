// src/App.js
import React from 'react';
import './App.css';
import Magnifier from './Magnifier';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Magnifier Demo</h1>
        <Magnifier src="/grains.png" />
      </header>
    </div>
  );
}

export default App;
