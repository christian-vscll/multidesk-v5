import React from 'react';
import Provider from './context/Provider';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './pages/Login';
import Home from './pages/Home';
import ConsultCnpj from './pages/ConsultCnpj';
import SituaFiscal from './pages/SituaFiscal';
import PgtoEcac from './pages/PagamentosEcac';
import NotFound from './pages/NotFoundPage';
import Conversor from './pages/Conversor';
import Classificador from './pages/Classificador';

function App() {
  return (
    <>
      <Provider>
        <Routes>
          <Route path='/' element={ <Login /> } />
          <Route path='/home' element={ <Home /> } />
          <Route path='/consult-cnpj' element={ <ConsultCnpj /> } />
          <Route path='/situa-fiscal' element={ <SituaFiscal /> } />
          <Route path='/pgto-ecac' element={ <PgtoEcac /> } />
          <Route path='/conversor' element={ <Conversor /> } />
          <Route path='/classificador' element={ <Classificador /> } />
          <Route path='*' element={ <NotFound /> } />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
