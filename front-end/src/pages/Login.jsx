import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import '../App.css';

export function Login() {
  const { loginVar, setLoginVar } = useContext(AppContext);

  const navigate = useNavigate();

  const funcSubmit = (e) => {
    e.preventDefault();
    (loginVar.user === 'admin' && loginVar.pasw === 'admin')
      ? navigate('/home')
      : alert('Usuário não existe')
  };

  return (
    <div className="login-loginContainer">
      <div className="login-centerText">
        <h1 className="login-title">Multidesk</h1>
        <span className="login-subtitle">Informe seus dados para acessar</span>
      </div>
      <form className="login-loginForm" method="post" onSubmit={ (e) => funcSubmit(e) }>
        <span className="login-formSpan">Usuário</span>
        <input
          onChange={({target}) => setLoginVar({ ...loginVar, user: target.value })}
          className="login-formInput"
          type="text"
          placeholder="Usuário"
          required="required"
          autoFocus="autofocus"
        />
        <span className="login-formSpan">Senha</span>
        <input
          onChange={({target}) => setLoginVar({ ...loginVar, pasw: target.value })}
          className="login-formInput"
          type="password"
          placeholder="Senha"
          required="required"
        />
        <div className="login-separator"/>
        <button type="submit" className="login-loginBtn">
          Entrar
        </button>
      </form>
    </div>
  );
};