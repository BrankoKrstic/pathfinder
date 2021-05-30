import "./Node.css";

export default function Node(props) {
	const { start, end, visited, wall, final } = props;
	const classes = `Node ${start && "Node-start"} ${end && "Node-end"} ${
		wall && "Node-wall"
	} ${visited && "Node-visited"} ${final && "Node-shortest-path"}`;
	return <div className={classes}></div>;
}
