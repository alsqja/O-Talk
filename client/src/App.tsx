import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { FirstPage } from './pages/FirstPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FirstPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
