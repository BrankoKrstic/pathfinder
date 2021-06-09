import "./PathfinderStats.css";

export default function PathfinderStats(props) {
	const { numVisitedNodes, shortestPathLength, searchTime } = props;
	return (
		<div className="Pathfinderstats">
			Nodes searched: {numVisitedNodes} Path length: {shortestPathLength}{" "}
			Found end node in: {searchTime}ms
		</div>
	);
}
