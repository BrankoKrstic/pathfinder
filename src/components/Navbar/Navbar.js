import "./Navbar.css";

export default function Navbar(props) {
	const { visualize } = props;
	return (
		<nav className="Navbar">
			<div className="Navbar-logo">Pathfinder</div>
			<button className="Navbar-button" onClick={visualize}>
				Visualize!
			</button>
		</nav>
	);
}
