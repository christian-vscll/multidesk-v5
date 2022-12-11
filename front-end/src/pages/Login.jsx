import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import '../css/Login.css';

export function Login() {
  const {
    loginVar, setLoginVar,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const funcSubmit = (e) => {
    e.preventDefault();
    (loginVar.user === 'admin' && loginVar.pasw === 'admin')
      ? navigate('/home')
      : alert('Usuário não existe')
  };

  return (
    <div className="login-container">
      <div className="center-text">
        <h1>Multidesk</h1>
        <span>Informe seus dados para acessar</span>
      </div>
      <form className="login-form" method="post" onSubmit={ (e) => funcSubmit(e) }>
        <span>Usuário</span>
        <input
          onChange={({target}) => setLoginVar({ ...loginVar, user: target.value })}
          className="login-input"
          type="text"
          placeholder="Usuário"
          required="required"
          autoFocus="autofocus"
        />
        <span>Senha</span>
        <input
          onChange={({target}) => setLoginVar({ ...loginVar, pasw: target.value })}
          className="login-input"
          type="password"
          placeholder="Senha"
          required="required"
        />
        <div className="separator"/>
        <button type="submit" className="login-btn">
          Entrar
        </button>
      </form>
    </div>
  );
};