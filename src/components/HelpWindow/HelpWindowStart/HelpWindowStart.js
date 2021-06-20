import { Link } from "react-router-dom";
import StartButton from "../../NavComponents/StartButton/StartButton";
import "./HelpWindowStart.css";

export default function HelpWindowStart(props) {
	return (
		<>
			<h1>Welcome to Pathfinder!</h1>
			<p>
				Pathfinder is a software that visualizes search patterns of
				common algorithms for finding a path in a graph.
			</p>
			<p>
				Some of the algorithms guarantee finding the shortest path while
				others illustrate different traversal patterns.
			</p>
			<p>
				Feel free to run any algorithm, click and drag to draw
				obstacles, or play with any of the other options.
			</p>
			<p>Most importantly, have fun!</p>
			<div className="HelpButtons">
				<div className="HelpButtons-left">
					<Link to="/legend">Legend</Link>
					<Link to="/algos">Algorithms</Link>
				</div>
				<StartButton
					isDark={false}
					clicked={props.toggleHelp}
					text="Ready!"
				/>
			</div>
		</>
	);
}
