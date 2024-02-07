import React, { useContext } from 'react';
import './App.scss';
import Context, { MyContext } from './Context';
import { HashRouter, Route, Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import Detail from './pages/Detail';

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
      </Routes>
      </HashRouter>
    </Context>
  );
}

export default App;
