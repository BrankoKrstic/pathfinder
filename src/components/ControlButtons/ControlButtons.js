import NavButton from "../NavComponents/NavButton/NavButton";
import "./ControlButtons.css";

export default function ControlButtons(props) {
	const { generateMaze, resetSearch, removeWalls, reset, toggleHelp } = props;
	return (
		<div className="ControlButtons">
			<NavButton text="Generate Maze" clicked={generateMaze} />
			<NavButton text="Reset Search" clicked={resetSearch} />
			<NavButton text="Remove Walls" clicked={removeWalls} />
			<NavButton text="Reset Board" clicked={reset} />
			<NavButton text="Help" clicked={toggleHelp} />
		</div>
	);
}
