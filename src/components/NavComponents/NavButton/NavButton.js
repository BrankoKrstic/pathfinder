import "./NavButton.css";

export default function NavButton(props) {
	return (
		<button className="NavButton" onClick={props.clicked}>
			{props.text}
		</button>
	);
}
