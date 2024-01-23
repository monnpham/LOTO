import React from 'react';
import './App.css';
import Home from './page/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './page/HomePage';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/base/:id" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

