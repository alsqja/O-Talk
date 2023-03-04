import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { FirstPage } from './pages/Firstpage';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { FirstLogin } from './pages/Firstlogin';
import { UserInfo } from './pages/Userinfo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FirstPage/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/firstlogin' element={<FirstLogin/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/userinfo' element={<UserInfo/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
