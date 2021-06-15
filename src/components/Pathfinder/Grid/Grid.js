import Node from "../../Node/Node";
import "./Grid.css";

export default function Grid(props) {
	const {
		graph,
		startNode,
		endNode,
		visitedNodes,
		shortestPath,
		wallNodes,
		toggleNodeFunction,
		clickDown,
		clickUp,
	} = props;
	const nodes = Object.entries(graph.adjacencyList).map((el, i) => (
		<Node
			key={i}
			location={String(i)}
			start={String(i) === startNode}
			end={String(i) === endNode}
			visited={visitedNodes[String(i)]}
			final={shortestPath.includes(String(i))}
			wall={wallNodes.includes(String(i))}
			toggleNodeFunction={toggleNodeFunction}
			clickDown={clickDown}
			clickUp={clickUp}
		/>
	));
	return <div className="Grid">{nodes}</div>;
}
