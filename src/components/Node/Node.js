import { memo } from "react";
import "./Node.css";

function Node(props) {
	const { start, end, visited, wall, final, toggleWall, location } = props;
	const classes = `Node ${wall && "Node-wall"} ${visited && "Node-visited"} ${
		start && "Node-start"
	} ${end && "Node-end"}  ${final && "Node-shortest-path"}`;
	return (
		<div
			className={classes}
			onMouseEnter={() => toggleWall(location)}
		></div>
	);
}

export default memo(Node);
