import "./Navbar.css";

export default function Navbar(props) {
	const { visualize, reset, removeWalls } = props;
	return (
		<nav className="Navbar">
			<div className="Navbar-logo">Pathfinder</div>
			<button className="Start-button" onClick={visualize}>
				Visualize!
			</button>
			<div className="Navbarbutton-container">
				<button className="Navbar-button" onClick={reset}>
					Reset
				</button>
				<button className="Navbar-button" onClick={removeWalls}>
					Remove Walls
				</button>
			</div>
		</nav>
	);
}
