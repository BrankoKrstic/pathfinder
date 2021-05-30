import { useState, useEffect } from "react";
import { WeightedGraph } from "../../algos/dijkstra";
import Node from "../Node/Node";
import "./Pathfinder.css";

const NUM_ROWS = 20;
const NUM_COLS = 50;

export default function Pathfinder() {
	const [gridState, setGridState] = useState({ graph: null });
	useEffect(() => {
		const newGraph = new WeightedGraph();
		for (let i = 0; i < NUM_ROWS * NUM_COLS; i++) {
			newGraph.addVertex(String(i));
			if (i % NUM_COLS !== 0) {
				newGraph.addEdge(String(i), String(i - 1), 1);
			}
			if (i > NUM_COLS) {
				newGraph.addEdge(String(i), String(i - NUM_COLS), 1);
			}
		}
		setGridState({ graph: newGraph });
		console.log(gridState.graph);
	}, []);
	const nodes =
		gridState.graph &&
		Object.entries(gridState.graph.adjacencyList).map((el, i) => (
			<Node key={i} location={i} />
		));
	return (
		<div className="Pathfinder">
			<header className="Pathfinder-nav">Nav goes here</header>
			<main className="Pathfinder-body">
				<div className="Pathfinder-grid">{nodes}</div>
			</main>
		</div>
	);
}
