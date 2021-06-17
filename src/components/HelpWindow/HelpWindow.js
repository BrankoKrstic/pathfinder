import "./HelpWindow.css";
import Modal from "../UI/Modal/Modal";

export default function HelpWindow(props) {
	const { toggleHelp } = props;
	return (
		<>
			<Modal clicked={toggleHelp}>
				<div className="HelpWindow"></div>
			</Modal>
		</>
	);
}
