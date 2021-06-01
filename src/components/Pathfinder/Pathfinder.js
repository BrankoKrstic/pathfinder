import { useState, useEffect } from "react";
import { WeightedGraph } from "../../algos/dijkstra";
import Node from "../Node/Node";
import "./Pathfinder.css";
import Navbar from "../Navbar/Navbar";
const NUM_ROWS = 20;
const NUM_COLS = 50;

export default function Pathfinder() {
	const [gridState, setGridState] = useState({
		graph: null,
		startNode: "160",
		endNode: "690",
		visitedNodes: [],
		shortestPath: [],
		wallNodes: [],
		mousePressed: false,
	});
	useEffect(() => {
		const newGraph = new WeightedGraph();
		for (let i = 0; i < NUM_ROWS * NUM_COLS; i++) {
			newGraph.addVertex(String(i));
			if (i % NUM_COLS > 0) {
				newGraph.addEdge(String(i), String(i - 1), 1);
			}
			if (i >= NUM_COLS) {
				newGraph.addEdge(String(i), String(i - NUM_COLS), 1);
			}
		}
		setGridState({ ...gridState, graph: newGraph });
	}, []);
	const visualize = () => {
		reset();
		let { visitedNodes, shortestPath } = gridState.graph.dijkstra(
			gridState.startNode,
			gridState.endNode,
			gridState.wallNodes
		);
		let visitedArr = [];
		let shortestPathArr = [];
		for (let i = 0; i < visitedNodes.length + shortestPath.length; i++) {
			if (i < visitedNodes.length) {
				setTimeout(() => {
					visitedArr.push(visitedNodes[i]);
					setGridState({ ...gridState, visitedNodes: visitedArr });
				}, i * 20);
			} else {
				setTimeout(() => {
					shortestPathArr.push(shortestPath[i - visitedNodes.length]);
					setGridState({
						...gridState,
						visitedNodes: visitedArr,
						shortestPath: shortestPathArr,
					});
				}, i * 20);
			}
		}
	};
	const reset = () => {
		setGridState({
			...gridState,
			shortestPath: [],
			visitedNodes: [],
			wallNodes: [],
		});
	};
	const toggleMousePressed = (val) => {
		setGridState({ ...gridState, mousePressed: val });
	};
	const toggleWall = (node) => {
		if (
			!gridState.mousePressed ||
			node === gridState.startNode ||
			node === gridState.endNode
		)
			return;
		let nodeIndex = gridState.wallNodes.indexOf(node);
		let newArr = [...gridState.wallNodes];
		if (nodeIndex >= 0) {
			newArr.splice(nodeIndex, 1);
		} else {
			newArr.push(node);
		}
		setGridState({ ...gridState, wallNodes: newArr });
	};
	const nodes =
		gridState.graph &&
		Object.entries(gridState.graph.adjacencyList).map((el, i) => (
			<Node
				key={i}
				location={String(i)}
				start={String(i) === gridState.startNode}
				end={String(i) === gridState.endNode}
				visited={gridState.visitedNodes.includes(String(i))}
				final={gridState.shortestPath.includes(String(i))}
				wall={gridState.wallNodes.includes(String(i))}
				toggleWall={toggleWall}
			/>
		));
	return (
		<div className="Pathfinder" onMouseUp={() => toggleMousePressed(false)}>
			<Navbar visualize={visualize} reset={reset}></Navbar>
			<main className="Pathfinder-body">
				<div
					className="Pathfinder-grid"
					onMouseDown={() => toggleMousePressed(true)}
				>
					{nodes}
				</div>
			</main>
		</div>
	);
}
