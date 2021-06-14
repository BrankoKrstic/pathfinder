import { memo } from "react";
import "./Node.css";
import startBg from "./icon-start.svg";
import endBg from "./icon-end.svg";

function Node(props) {
	const {
		start,
		end,
		wall,
		final,
		visited,
		toggleNodeFunction,
		location,
		clickDown,
		clickUp,
	} = props;
	const getClass = () => {
		let nodeClass = "Node";
		if (start) {
			nodeClass = nodeClass + " Node-start";
		} else if (end) {
			nodeClass = nodeClass + " Node-end";
		} else if (wall) {
			nodeClass = nodeClass + " Node-wall";
		}
		if (final) {
			nodeClass = nodeClass + " Node-shortest-path";
		} else if (visited) {
			nodeClass = nodeClass + " Node-visited";
		}
		return nodeClass;
	};
	const background = (start && `url(${startBg})`) || (end && `url(${endBg})`);
	return (
		<div
			style={{ backgroundImage: background }}
			className={getClass()}
			onMouseEnter={() => toggleNodeFunction(location)}
			onMouseDown={() => clickDown(location)}
			onMouseUp={() => clickUp(location)}
		></div>
	);
}

export default memo(Node);
