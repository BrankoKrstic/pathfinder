import "./Modal.css";

export default function Modal(props) {
	return (
		<div className="Modal" onClick={props.clicked}>
			{props.children}
		</div>
	);
}
