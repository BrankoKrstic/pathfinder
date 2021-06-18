import "./HelpWindow.css";
import Modal from "../UI/Modal/Modal";

export default function HelpWindow(props) {
	const { toggleHelp } = props;
	return (
		<>
			<Modal clicked={toggleHelp}>
				<div className="HelpWindow">
					<div className="HelpWindowStart">
						<h1>Welcome to Pathfinder!</h1>
						<p>
							Pathfinder is a software that visualizes the search
							patterns of common algorithms for finding a path in
							a graph.
						</p>
						<p>
							Some of the algorithms guarantee finding the
							shortest path while others illustrate different
							traversal patterns.
						</p>
						<p>
							Feel free to run any algorithm, click and drag to
							draw obstacles, or play with any of the other
							options.
						</p>
						<p>Most importantly, have fun!</p>
						<div className="HelpButtons">
							<button
								className="HelpCloseButton"
								onClick={toggleHelp}
							>
								Ready!
							</button>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
}
