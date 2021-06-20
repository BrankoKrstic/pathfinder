import DropdownMenu from "../DropdownMenu/DropdownMenu";
import ControlButtons from "../ControlButtons/ControlButtons";
import StartButton from "../NavComponents/StartButton/StartButton";
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
		toggleHelp,
		toggleSidebar,
	} = props;

	return (
		<nav className="Navbar">
			<div className="Navbar-left">
				<div className="Navbar-logo">Pathfinder</div>
				<div className="Navbar-dropdowns">
					<DropdownMenu
						searchSpeed={searchSpeed}
						changeSpeed={changeSpeed}
						changeAlgo={changeAlgo}
						searchAlgo={searchAlgo}
					/>
				</div>
			</div>
			<StartButton text="Run!" isDark clicked={visualize} />
			<div className="Navbar-button-container">
				<ControlButtons
					reset={reset}
					resetSearch={resetSearch}
					removeWalls={removeWalls}
					generateMaze={generateMaze}
					toggleHelp={toggleHelp}
				/>
			</div>
			<div className="Navbar-button-container-mobile">
				<NavButton text="Menu" clicked={toggleSidebar} />
			</div>
		</nav>
	);
}
