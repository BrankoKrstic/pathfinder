import NavButton from "../NavComponents/NavButton/NavButton";
import NavDropdown from "../NavComponents/NavDropdown/NavDropdown";
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
				<NavDropdown
					id="algo-select"
					label="Algorithm"
					value={searchAlgo}
					handleChange={(e) => changeAlgo(e.target.value)}
					options={{
						dijkstra: "Dijkstra's",
						aStar: "A* search",
						BFS: "BFS",
						DFS: "DFS",
						GBS: "Greedy Best-first Search",
					}}
				/>
				<NavDropdown
					id="speed-select"
					label="Speed"
					value={searchSpeed}
					handleChange={(e) => changeSpeed(e.target.value)}
					options={{
						10: "Fast",
						20: "Medium",
						40: "Slow",
					}}
				/>
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
