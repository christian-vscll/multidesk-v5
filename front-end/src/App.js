import React from 'react';
import Provider from './context/Provider';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFoundPage';
import Conversor from './pages/Conversor';
import Classificador from './pages/Classificador';

function App() {
  return (
    <main id='main'>
      <Provider>
        <Routes>
          <Route path='/' element={ <Login /> } />
          <Route path='/home' element={ <Home /> } />
          <Route path='/conversor' element={ <Conversor /> } />
          <Route path='/classificador' element={ <Classificador /> } />
          <Route path='*' element={ <NotFound /> } />
        </Routes>
      </Provider>
    </main>
  );
}

export default App;
