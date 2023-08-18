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
import Database from './pages/Database';
import CDL from './pages/CDL';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyANthbKkoujTwIOkKDO5bvgvNhsDprZfVc",
  authDomain: "multideskv5.firebaseapp.com",
  databaseURL: "https://multideskv5-default-rtdb.firebaseio.com",
  projectId: "multideskv5",
  storageBucket: "multideskv5.appspot.com",
  messagingSenderId: "873117002730",
  appId: "1:873117002730:web:17a080f060b1a76941a093",
  measurementId: "G-DYNDHZK8X8"
};

initializeApp(firebaseConfig); // Initialize Firebase

function App() {
  return (
    <Provider>
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/home' element={ <Home /> } />
        <Route path='/consult-cnpj' element={ <ConsultCnpj /> } />
        <Route path='/situa-fiscal' element={ <SituaFiscal /> } />
        <Route path='/pgto-ecac' element={ <PgtoEcac /> } />
        <Route path='/conv-class' element={ <Conversor /> } />
        <Route path='/db-class' element={ <Database /> } />
        <Route path='/cdl' element={ <CDL /> } />
        <Route path='*' element={ <NotFound /> } />
      </Routes>
    </Provider>
  );
}

export default App;
