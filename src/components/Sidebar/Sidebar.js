import "./Sidebar.css";
import Modal from "../UI/Modal/Modal";

export default function Sidebar(props) {
	const { toggleSidebar, isOpen } = props;
	return (
		<>
			<Modal clicked={toggleSidebar} modalOpen={isOpen} />
			<div
				className={
					isOpen ? "Sidebar Sidebar-open" : "Sidebar Sidebar-closed"
				}
			></div>
		</>
	);
}
