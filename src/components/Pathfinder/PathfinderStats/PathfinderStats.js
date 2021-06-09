import "./PathfinderStats.css";

export default function PathfinderStats(props) {
	const { numVisitedNodes, shortestPathLength, searchTime } = props;
	return (
		<div className="Pathfinderstats">
			Nodes searched: {numVisitedNodes} Path length: {shortestPathLength}{" "}
			Found path in: {searchTime}ms
		</div>
	);
}
