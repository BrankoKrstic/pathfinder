import "./PathfinderStats.css";

export default function PathfinderStats(props) {
	const { shortestPath, visitedNodes, searchTime } = props;
	return (
		<div className="Pathfinderstats">
			Nodes searched: {Object.values(visitedNodes).length} Path length:{" "}
			{shortestPath.length} Found path in: {searchTime.toFixed(2)}ms
		</div>
	);
}
