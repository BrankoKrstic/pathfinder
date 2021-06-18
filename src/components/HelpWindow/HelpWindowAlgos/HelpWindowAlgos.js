import { Link } from "react-router-dom";
import "./HelpWindowAlgos.css";

export default function HelpWindowAlgos() {
	const algoData = [
		{
			name: "Dijkstra's Algorithm",
			info: "Grandfather of pathfinding algorithms. Explores all possible routes and guarantees finding the shortest path.",
		},
		{
			name: "A* Search",
			info: "Modified Dijkstra's algorithm. Calculates distance of nodes from the target to skew the search while guaranteeing to find the shortest path.",
		},
		{
			name: "BFS (Breadth-first Search)",
			info: "Explores nodes closest to the start first and expands outward. Doesn't guarantee finding the shortest path, but typically performs faster than Dijkstra's because it doesn't need to check all edges.",
		},
		{
			name: "DFS (Depth-first Search)",
			info: "Picks a path and explores as far as possible, only backtracking if the node it reaches has no neighboring nodes to jump to. Very poor for pathfinding but can be used to efficiently traverse an entire graph. Pathfinder uses a similar algorithm for randomizing a maze.",
		},
		{
			name: "Greedy Best-first Search",
			info: "Chooses its exploration route only based on the proximity to the end node. It can find the target very efficiently, but it doesn't guarantee finding the shortest path.",
		},
	];

	return (
		<div className="HelpWindowAlgos">
			<h2>Pathfinding Algorithms</h2>
			{algoData.map((el) => (
				<p>
					<strong>{el.name}</strong> - {el.info}
				</p>
			))}
			<Link to="/">Back</Link>
		</div>
	);
}
