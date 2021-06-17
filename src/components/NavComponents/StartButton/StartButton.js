import "./StartButton.css";

export default function StartButton(props) {
	return (
		<button className="StartButton" onClick={props.clicked}>
			{props.text}
		</button>
	);
}
