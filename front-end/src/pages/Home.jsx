import React from "react";
import Sidebar from "../components/Sidebar";

function Home() {
	return (
		<div className="home-page" style={homePage}>
			<Sidebar/>
			<main className="home-container">
				<h1>Home page</h1>
			</main>
		</div>
	);
}

export default Home;

const homePage = {
  margin: "0",
  height: "100vh",
  width: "100vw",
  display: "flex",
}