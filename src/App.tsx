import React, { useContext } from 'react';
import './App.scss';
import Context, { MyContext } from './Context';
import { HashRouter, Route, Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import Detail from './pages/Detail';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Signupterms from './pages/Signupterms';
import Mypage from './pages/Mypage';
import Favorite from './pages/Favorite';

const App: React.FC = () => {

  return (
    <Context>
      <HashRouter>
      <>
      </>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/list' element={<List/>} />
      <Route path='/detail/:contentId' element={<Detail/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signupterms' element={<Signupterms/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/mypage' element={<Mypage/>} />
      <Route path='/favorite' element={<Favorite/>} />
      </Routes>
      </HashRouter>
    </Context>
  );
}

export default App;
