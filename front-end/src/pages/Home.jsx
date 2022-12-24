import React from "react";
import Menu from "../components/Menu";
import '../App.css';


export default function Home() {
	return (
		<div className="home-container">
			<div className="home-containerMobile">
				<Menu/>
			</div>
			<div className="home-containerPc">
				<Menu/>
				<h1>Home page</h1>
			</div>
		</div>
	);
}