import "./DropdownMenu.css";
import NavDropdown from "../NavComponents/NavDropdown/NavDropdown";

export default function DropdownMenu(props) {
	const { searchSpeed, changeSpeed, changeAlgo, searchAlgo } = props;
	const algoOptions = {
		dijkstra: "Dijkstra's",
		aStar: "A* Search",
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
		<div className="DropdownMenu">
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
	);
}
