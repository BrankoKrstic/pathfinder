import { memo } from "react";
import "./Node.css";
import startBg from "./icon-start.svg";
import endBg from "./icon-end.svg";

function Node(props) {
	const {
		start,
		end,
		visited,
		wall,
		final,
		toggleNodeFunction,
		location,
		clickDown,
		clickUp,
	} = props;
	const classes = `Node ${wall && "Node-wall"} ${visited && "Node-visited"} ${
		start && "Node-start"
	} ${end && "Node-end"}  ${final && "Node-shortest-path"}`;
	const background = (start && `url(${startBg})`) || (end && `url(${endBg})`);
	return (
		<div
			style={{ backgroundImage: background }}
			className={classes}
			onMouseEnter={() => toggleNodeFunction(location)}
			onMouseDown={() => clickDown(location)}
			onMouseUp={() => clickUp(location)}
		></div>
	);
}

export default memo(Node);
