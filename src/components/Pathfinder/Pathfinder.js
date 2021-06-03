import { useState, useEffect } from "react";
import { WeightedGraph } from "../../algos/dijkstra";
import Node from "../Node/Node";
import "./Pathfinder.css";
import Navbar from "../Navbar/Navbar";
const NUM_ROWS = 40;
const NUM_COLS = 100;

export default function Pathfinder() {
	const defaultNodeState = {
		startNode: "410",
		endNode: "3380",
		wallNodes: [],
		movingStartNode: false,
		movingEndNode: false,
		mousePressed: false,
	};
	const [searchState, setSearchState] = useState({
		visitedNodes: {},
		shortestPath: [],
	});
	const [gridState, setGridState] = useState({
		graph: null,
		searchSpeed: 20,
		searchAlgo: "dijkstra",
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
		setGridState({ ...gridState, graph: newGraph });
	}, []);
	const visualize = () => {
		resetSearch();
		let { visitedNodes, shortestPath } = search();
		let visitedObj = {};
		let shortestPathArr = [];
		for (let i = 0; i < visitedNodes.length + shortestPath.length; i++) {
			if (i < visitedNodes.length) {
				setTimeout(() => {
					visitedObj[visitedNodes[i]] = true;
					setSearchState({
						visitedNodes: visitedObj,
						shortestPath: shortestPathArr,
					});
				}, i * gridState.searchSpeed);
			} else {
				setTimeout(() => {
					shortestPathArr.push(shortestPath[i - visitedNodes.length]);
					setSearchState({
						shortestPath: shortestPathArr,
						visitedNodes: visitedObj,
					});
				}, i * gridState.searchSpeed);
			}
		}
	};
	const clickDown = (val) => {
		if (Object.values(searchState.visitedNodes).length > 0) return;
		if (val === nodeState.startNode) {
			setNodeState({
				...nodeState,
				movingStartNode: true,
			});
		} else if (val === nodeState.endNode) {
			setNodeState({ ...nodeState, movingEndNode: true });
		} else {
			setNodeState({ ...nodeState, mousePressed: true });
		}
	};
	const clickUp = () => {
		setNodeState({
			...nodeState,
			movingStartNode: false,
			movingEndNode: false,
			mousePressed: false,
		});
	};
	const resetSearch = () => {
		setSearchState({ visitedNodes: {}, shortestPath: [] });
	};
	const reset = () => {
		resetSearch();
		setNodeState(defaultNodeState);
	};
	const removeWalls = () => {
		setNodeState({ ...nodeState, wallNodes: [] });
	};
	const search = () => {
		if (gridState.searchAlgo === "dijkstra") {
			return gridState.graph.dijkstra(
				nodeState.startNode,
				nodeState.endNode,
				nodeState.wallNodes
			);
		} else if (gridState.searchAlgo === "aStar") {
			return gridState.graph.aStar(
				nodeState.startNode,
				nodeState.endNode,
				NUM_COLS,
				nodeState.wallNodes
			);
		} else if (gridState.searchAlgo === "BFS") {
			return gridState.graph.BFS(
				nodeState.startNode,
				nodeState.endNode,
				nodeState.wallNodes
			);
		}
	};
	const changeAlgo = (val) => {
		resetSearch();
		setGridState({ ...gridState, searchAlgo: val });
	};
	const toggleWall = (node) => {
		if (nodeState.movingStartNode)
			return setNodeState({ ...nodeState, startNode: node });
		if (nodeState.movingEndNode)
			return setNodeState({ ...nodeState, endNode: node });
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
	const changeSpeed = (val) => {
		resetSearch();
		setGridState({ ...gridState, searchSpeed: Number(val) });
	};
	const nodes =
		gridState.graph &&
		Object.entries(gridState.graph.adjacencyList).map((el, i) => (
			<Node
				key={i}
				location={String(i)}
				start={String(i) === nodeState.startNode}
				end={String(i) === nodeState.endNode}
				visited={searchState.visitedNodes[String(i)]}
				final={searchState.shortestPath.includes(String(i))}
				wall={nodeState.wallNodes.includes(String(i))}
				toggleWall={toggleWall}
				clickDown={clickDown}
				clickUp={clickUp}
			/>
		));
	return (
		<div className="Pathfinder">
			<Navbar
				{...gridState}
				visualize={visualize}
				removeWalls={removeWalls}
				reset={reset}
				resetSearch={resetSearch}
				changeSpeed={changeSpeed}
				changeAlgo={changeAlgo}
			></Navbar>
			<main className="Pathfinder-body">
				<div className="Pathfinder-grid">{nodes}</div>
			</main>
		</div>
	);
}
