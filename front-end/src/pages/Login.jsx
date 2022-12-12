import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
// import '../css/Login.css';

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
    <div style={loginContainer}>
      <div style={centerText}>
        <h1 style={h1}>Multidesk</h1>
        <span style={subtitle}>Informe seus dados para acessar</span>
      </div>
      <form style={loginForm} method="post" onSubmit={ (e) => funcSubmit(e) }>
        <span style={formSpan}>Usuário</span>
        <input
          onChange={({target}) => setLoginVar({ ...loginVar, user: target.value })}
          className="formInput"
          style={formInput}
          type="text"
          placeholder="Usuário"
          required="required"
          autoFocus="autofocus"
        />
        <span style={formSpan}>Senha</span>
        <input
          onChange={({target}) => setLoginVar({ ...loginVar, pasw: target.value })}
          className="formInput"
          style={formInput}
          type="password"
          placeholder="Senha"
          required="required"
        />
        <div style={separator}/>
        <button type="submit" className="loginBtn" style={loginBtn}>
          Entrar
        </button>
      </form>
    </div>
  );
};

let loginContainer;
let h1;
let centerText;
let subtitle;
let formSpan;
let loginForm;
let formInput;
let separator;
let loginBtn;

switch (window.innerWidth) {
  case window.innerWidth < 1024:
    loginContainer = { width: "80vw" }
    h1 = { fontSize: "3.5rem" }
    subtitle = { fontSize: "1.5rem" }
    separator = { margin: "1.5rem 0px" }
    formInput = {
      fontSize: "1.3rem",
      height: "50px",
      width: "98%",
    }
    loginBtn = {
      marginTop: "0rem",
      fontSize: "1.5rem",
      height: "60px",
    }
    break;

  default:
    loginContainer = {
      width: "400px",
      padding: "10px 50px 40px 50px",
      backgroundColor: "#fbfbfb",
      color: "#707070",
      boxShadow: "0px 10px 10px 0px rgba(196,196,196,0.75)",
    }
    h1 = {
      color: "#cc3c3a",
      letterSpacing: "1px",
      textAlign: "center",
      fontFamily: "system-ui",
      fontSize: "2rem",
    }
    centerText = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }
    subtitle = {
      fontSize: "0.97rem",
      color: "#878787",
    }
    loginForm = {
      display: "flex",
      flexDirection: "column",
      marginTop: "10px",
    }
    formSpan = {
      marginTop: "1rem",
      fontSize: ".75rem",
      marginBottom: "5px",
      textTransform: "uppercase",
    }
    formInput = {
      width: "96.5%",
      height: "30px",
      backgroundColor: "#fff",
      boxShadow: "none",
      border: "1px solid #e3e3e3",
      fontSize: ".78rem",
      color: "#565656",
      transition: "all .3s linear",
      paddingLeft: "10px",
    }
    separator = {
      width: "100%",
      height: "1px",
      marginTop: "1rem",
      backgroundColor: "#cacaca",
    }
    loginBtn = {
      marginTop: "1rem",
      width: "100%",
      height: "35px",
      backgroundColor: "rgba(251,64,75,255)",
      color: "#fbfbfb",
      border: "1px solid #fb404b",
      cursor: "pointer",
      fontSize: "0.9rem",
    }
    break;
}