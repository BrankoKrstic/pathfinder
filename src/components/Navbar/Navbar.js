import NavButton from "../NavComponents/NavButton/NavButton";
import StartButton from "../NavComponents/StartButton/StartButton";
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
		toggleHelp,
	} = props;
	const algoOptions = {
		dijkstra: "Dijkstra's",
		aStar: "A* search",
		BFS: "BFS",
		DFS: "DFS",
		GBS: "Greedy Best-first Search",
	};
	const speedOptions = {
		10: "Fast",
		20: "Medium",
		40: "Slow",
	};
	return (
		<nav className="Navbar">
			<div className="Navbar-left">
				<div className="Navbar-logo">Pathfinder</div>
				<NavDropdown
					id="algo-select"
					label="Algorithm"
					value={searchAlgo}
					handleChange={(e) => changeAlgo(e.target.value)}
					options={algoOptions}
				/>
				<NavDropdown
					id="speed-select"
					label="Speed"
					value={searchSpeed}
					handleChange={(e) => changeSpeed(e.target.value)}
					options={speedOptions}
				/>
			</div>
			<StartButton text="Run!" isDark clicked={visualize} />
			<div className="Navbar-button-container">
				<NavButton text="Generate Maze" clicked={generateMaze} />
				<NavButton text="Reset Search" clicked={resetSearch} />
				<NavButton text="Remove Walls" clicked={removeWalls} />
				<NavButton text="Reset Board" clicked={reset} />
				<NavButton text="Help" clicked={toggleHelp} />
			</div>
		</nav>
	);
}
