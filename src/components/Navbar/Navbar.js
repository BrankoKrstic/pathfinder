import "./Navbar.css";

export default function Navbar(props) {
	const { visualize, reset } = props;
	return (
		<nav className="Navbar">
			<div className="Navbar-logo">Pathfinder</div>
			<button className="Start-button" onClick={visualize}>
				Visualize!
			</button>
			<button className="Navbar-button" onClick={reset}>
				Reset
			</button>
		</nav>
	);
}
