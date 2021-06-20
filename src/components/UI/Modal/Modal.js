import "./Modal.css";

export default function Modal(props) {
	return (
		<>
			{props.modalOpen && (
				<div className="Modal" onClick={props.clicked}>
					{props.children}
				</div>
			)}
		</>
	);
}
