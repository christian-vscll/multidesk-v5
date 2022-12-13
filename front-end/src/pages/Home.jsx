import React from "react";
import Menu from "../components/Menu";

const windowWidth = window.innerWidth;
export default function Home() {
	return (
		<div className="home-page" style={homePage}>
				{
					windowWidth < 1024
					? (
						<>
							<div className="home-container-mobile" style={homeContainerMobile}>
								<Menu/>
							</div>
						</>
					) : (
						<>
							<Menu/>
							<div className="home-container-pc" style={homeContainerPc}>
								<h1>Home page</h1>
							</div>
						</>
					)
				}
		</div>
	);
}

let homeContainerMobile;
let homeContainerPc;

const homePage = {
	margin: "0",
	height: "100vh",
	width: "100vw",
}

switch (windowWidth) {
	case windowWidth <= 1023:
		console.log('tela mobile');
		homeContainerPc = { display: 'none' }
		homeContainerMobile = {
			display: 'visible',
			width: '100vw',
			height: '100vh',
		}
		break;

	case windowWidth >= 1024:
		console.log('tela pc');
		homeContainerMobile = { display: 'none' }
		homeContainerPc = {
			display: 'visible',
			width: '100vw',
			height: '100vh',
		}
		break;

	default:
		break;
}