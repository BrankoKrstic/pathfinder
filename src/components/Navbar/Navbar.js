import "./Navbar.css";

export default function Navbar(props) {
	const {
		visualize,
		reset,
		removeWalls,
		searchSpeed,
		changeSpeed,
		resetSearch,
	} = props;
	return (
		<nav className="Navbar">
			<div className="Navbar-logo">Pathfinder</div>
			<div>
				<label className="Navbar-label" htmlFor="speed-select">
					Change speed:
				</label>
				<span className="Navbar-dropdown">
					<select
						id="speed-select"
						value={searchSpeed}
						onChange={(e) => changeSpeed(e.target.value)}
					>
						<option value="15">Fast</option>
						<option value="25">Medium</option>
						<option value="50">Slow</option>
					</select>
				</span>
			</div>
			<button className="Start-button" onClick={visualize}>
				Visualize!
			</button>
			<div className="Navbarbutton-container">
				<button className="Navbar-button" onClick={resetSearch}>
					Reset Search
				</button>
				<button className="Navbar-button" onClick={removeWalls}>
					Remove Walls
				</button>
				<button className="Navbar-button" onClick={reset}>
					Reset Board
				</button>
			</div>
		</nav>
	);
}
