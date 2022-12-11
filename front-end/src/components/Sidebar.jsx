import React from "react";
// import { useNavigate } from "react-router-dom";
import '../css/Sidebar.css';
import iconCasa from '../icons/casa.png';

function Header() {
	// const navigate = useNavigate();
	return (
		<div className='sidebar'>
			<h1>Multidesk</h1>
			<div className="separator"/>
			<nav className="nav-panel">
				<ul>
					<img src={iconCasa} alt="" className="nav-icon"/>
					<span>Home</span>
				</ul>
				<ul>
					<img src={iconCasa} alt="" className="nav-icon"/>
					<span>Testando uma coisa maior ainda</span>
				</ul>
			</nav>
			{/* <button className="header-btn-conversor" onClick={ () => navigate('/home') } >
				Home
			</button> */}
		</div>
	);
};

export default Header;