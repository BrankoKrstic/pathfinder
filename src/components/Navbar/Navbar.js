import NavButton from "../NavComponents/NavButton/NavButton";
import "./Navbar.css";

export default function Navbar(props) {
	const {
		visualize,
		reset,
		removeWalls,
		searchSpeed,
		changeSpeed,
		resetSearch,
		changeAlgo,
		searchAlgo,
		generateMaze,
	} = props;
	return (
		<nav className="Navbar">
			<div className="Navbar-left">
				<div className="Navbar-logo">Pathfinder</div>
				<label className="Navbar-label" htmlFor="algo-select">
					Algorithm:
				</label>
				<span className="Navbar-dropdown">
					<select
						id="algo-select"
						value={searchAlgo}
						onChange={(e) => changeAlgo(e.target.value)}
					>
						<option value="dijkstra">Dijkstra's</option>
						<option value="aStar">A* Search</option>
						<option value="BFS">BFS</option>
						<option value="DFS">DFS</option>
						<option value="GBS">Greedy Best-first Search</option>
					</select>
				</span>
				<label className="Navbar-label" htmlFor="speed-select">
					Speed:
				</label>
				<span className="Navbar-dropdown">
					<select
						id="speed-select"
						value={searchSpeed}
						onChange={(e) => changeSpeed(e.target.value)}
					>
						<option value="10">Fast</option>
						<option value="20">Medium</option>
						<option value="40">Slow</option>
					</select>
				</span>
			</div>
			<button className="Start-button" onClick={visualize}>
				Run!
			</button>
			<div className="Navbar-button-container">
				<NavButton text="Generate Maze" clicked={generateMaze} />
				<NavButton text="Reset Search" clicked={resetSearch} />
				<NavButton text="Remove Walls" clicked={removeWalls} />
				<NavButton text="Reset Board" clicked={reset} />
				<NavButton text="Help" clicked={generateMaze} />
			</div>
		</nav>
	);
}
