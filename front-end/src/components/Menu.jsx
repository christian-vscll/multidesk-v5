import React from "react";
// import { useNavigate } from "react-router-dom";
import iconCasa from '../icons/casa.png';
import '../App.css';

export default function Menu() {
	// const navigate = useNavigate();
	return (
		<div style={sidebar}>
			<h1 style={h1}>Multidesk</h1>
			<div style={separator}/>
			<nav style={navPanel}>
				<ul style={ul} className='navBtn' onClick={ (e) => alert('ponto 1') }>
					<img src={iconCasa} alt="" style={img}/>
					<span style={span}>Home</span>
				</ul>
				<ul style={ul} className='navBtn' onClick={ (e) => alert('ponto 2') }>
					<img src={iconCasa} alt="" style={img}/>
					<span style={span}>Testando uma coisa maior ainda</span>
				</ul>
			</nav>
			{/* <button className="header-btn-conversor" onClick={ () => navigate('/home') } >
				Home
			</button> */}
		</div>
	);
};

let sidebar;
let h1;
let separator;
let navPanel;
let ul;
let img;
let span;

switch (window.innerWidth) {
  case window.innerWidth < 1024:
    break;
  default:
    sidebar = {
      /* position: absolute; */
      /* top: 0px; left: 0px; */
      width: "17vw",
      height: "100vh",
      backgroundColor: "#ca3b3a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "all .15s linear",
    }
    h1 = {
      color: "#fffcfc",
      letterSpacing: "1px",
      textAlign: "center",
      fontFamily: "system-ui",
      fontSize: "2rem",
      margin: "0.8rem auto 0.2rem auto",
    } 
    separator = {
      width: "90%",
      height: "1px",
      marginBottom: "1rem",
      backgroundColor: "#ff9292",
    }
    navPanel = {
      width: "90%",
      display: "flex",
      flexDirection: "column",
    }
    ul = {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      margin: "2px 0px",
      height: "3rem",
      transition: "all .15s linear",
      cursor: "pointer",
    }
    img = {
      width: "1rem",
      marginRight: "-10px",
      position: "relative",
      left: "-1.5rem",
    }
    span = {
      fontSize: "0.7rem",
      textTransform: "uppercase",
      fontWeight: "700",
      color: "#fffcfc",
    }
    break;
}