import "./Sidebar.css";
import Modal from "../UI/Modal/Modal";

import DropdownMenu from "../DropdownMenu/DropdownMenu";
import ControlButtons from "../ControlButtons/ControlButtons";

export default function Sidebar(props) {
	const {
		toggleSidebar,
		isOpen,
		searchSpeed,
		changeSpeed,
		changeAlgo,
		searchAlgo,
		reset,
		resetSearch,
		removeWalls,
		generateMaze,
		toggleHelp,
	} = props;
	return (
		<>
			<Modal clicked={toggleSidebar} modalOpen={isOpen} />
			<div
				className={
					isOpen ? "Sidebar Sidebar-open" : "Sidebar Sidebar-closed"
				}
			>
				<div className="Sidebar-header">
					<button
						className="Sidebar-backbutton"
						onClick={toggleSidebar}
					></button>
				</div>
				<div className="Sidebar-items">
					<DropdownMenu
						searchSpeed={searchSpeed}
						changeSpeed={changeSpeed}
						changeAlgo={changeAlgo}
						searchAlgo={searchAlgo}
					/>
					<ControlButtons
						reset={reset}
						resetSearch={resetSearch}
						removeWalls={removeWalls}
						generateMaze={generateMaze}
						toggleHelp={toggleHelp}
					/>
				</div>
			</div>
		</>
	);
}
