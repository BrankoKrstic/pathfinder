import "./StartButton.css";

export default function StartButton(props) {
	return (
		<button
			className={props.isDark ? "StartButton Dark" : "StartButton Light"}
			onClick={props.clicked}
		>
			{props.text}
		</button>
	);
}
