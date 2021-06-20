import "./Sidebar.css";
import Modal from "../UI/Modal/Modal";

import DropdownMenu from "../DropdownMenu/DropdownMenu";
import ControlButtons from "../ControlButtons/ControlButtons";

export default function Sidebar(props) {
	const { toggleSidebar, isOpen } = props;
	return (
		<>
			<Modal clicked={toggleSidebar} modalOpen={isOpen} />
			<div
				className={
					isOpen ? "Sidebar Sidebar-open" : "Sidebar Sidebar-closed"
				}
			>
				<div className="Sidebar-header"></div>
				<div className="Sidebar-items">
					<DropdownMenu />
					<ControlButtons />
				</div>
			</div>
		</>
	);
}
