import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import ClothingManagement from './components/ClothingManagement';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ClothingManagement />
      </div>
    </BrowserRouter>
  );
}

export default App;
