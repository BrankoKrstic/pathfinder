import { useState, useEffect } from "react";
import { WeightedGraph } from "../../algos/dijkstra";
import Node from "../Node/Node";
import "./Pathfinder.css";
import Navbar from "../Navbar/Navbar";
const NUM_ROWS = 20;
const NUM_COLS = 50;

export default function Pathfinder() {
	const defaultNodeState = {
		startNode: "110",
		endNode: "390",
		visitedNodes: [],
		shortestPath: [],
		wallNodes: [],
		mousePressed: false,
	};
	const [gridState, setGridState] = useState({
		graph: null,
	});
	const [nodeState, setNodeState] = useState(defaultNodeState);
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
		setGridState({ graph: newGraph });
	}, []);
	const visualize = () => {
		reset();
		let { visitedNodes, shortestPath } = gridState.graph.dijkstra(
			nodeState.startNode,
			nodeState.endNode,
			nodeState.wallNodes
		);
		let visitedArr = [];
		let shortestPathArr = [];
		for (let i = 0; i < visitedNodes.length + shortestPath.length; i++) {
			if (i < visitedNodes.length) {
				setTimeout(() => {
					visitedArr.push(visitedNodes[i]);
					setNodeState({ ...nodeState, visitedNodes: visitedArr });
				}, i * 25);
			} else {
				setTimeout(() => {
					shortestPathArr.push(shortestPath[i - visitedNodes.length]);
					setNodeState({
						...nodeState,
						shortestPath: shortestPathArr,
						visitedNodes: visitedArr,
					});
				}, i * 25);
			}
		}
	};
	const reset = () => {
		setNodeState(defaultNodeState);
	};
	const removeWalls = () => {
		setNodeState({ ...nodeState, wallNodes: [] });
	};
	const toggleMousePressed = (val) => {
		setNodeState({ ...nodeState, mousePressed: val });
	};
	const toggleWall = (node) => {
		if (
			!nodeState.mousePressed ||
			node === nodeState.startNode ||
			node === nodeState.endNode
		)
			return;
		let nodeIndex = nodeState.wallNodes.indexOf(node);
		let newArr = [...nodeState.wallNodes];
		if (nodeIndex >= 0) {
			newArr.splice(nodeIndex, 1);
		} else {
			newArr.push(node);
		}
		setNodeState({ ...nodeState, wallNodes: newArr });
	};
	const nodes =
		gridState.graph &&
		Object.entries(gridState.graph.adjacencyList).map((el, i) => (
			<Node
				key={i}
				location={String(i)}
				start={String(i) === nodeState.startNode}
				end={String(i) === nodeState.endNode}
				visited={nodeState.visitedNodes.includes(String(i))}
				final={nodeState.shortestPath.includes(String(i))}
				wall={nodeState.wallNodes.includes(String(i))}
				toggleWall={toggleWall}
			/>
		));
	return (
		<div className="Pathfinder" onMouseUp={() => toggleMousePressed(false)}>
			<Navbar
				visualize={visualize}
				removeWalls={removeWalls}
				reset={reset}
			></Navbar>
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
