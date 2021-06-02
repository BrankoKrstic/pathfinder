import { memo } from "react";
import "./Node.css";
import startBg from "./icon-start.svg";
import endBg from "./icon-end.svg";

function Node(props) {
	const { start, end, visited, wall, final, toggleWall, location } = props;
	const classes = `Node ${wall && "Node-wall"} ${visited && "Node-visited"} ${
		start && "Node-start"
	} ${end && "Node-end"}  ${final && "Node-shortest-path"}`;
	const background = (start && `url(${startBg})`) || (end && `url(${endBg})`);
	return (
		<div
			style={{ backgroundImage: background }}
			className={classes}
			onMouseEnter={() => toggleWall(location)}
		></div>
	);
}

export default memo(Node);
