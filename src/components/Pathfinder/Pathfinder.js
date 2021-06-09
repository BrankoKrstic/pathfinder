import { useState, useEffect } from "react";
import { WeightedGraph } from "../../graph/graph";
import Node from "../Node/Node";
import "./Pathfinder.css";
import Navbar from "../Navbar/Navbar";
const NUM_ROWS = 41;
const NUM_COLS = 101;

export default function Pathfinder() {
	const defaultNodeState = {
		startNode: "410",
		endNode: "3420",
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
		searching: false,
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
		switch (gridState.searchAlgo) {
			case "dijkstra":
				return gridState.graph.dijkstra(
					nodeState.startNode,
					nodeState.endNode,
					nodeState.wallNodes
				);
			case "aStar":
				return gridState.graph.aStar(
					nodeState.startNode,
					nodeState.endNode,
					NUM_COLS,
					nodeState.wallNodes
				);
			case "BFS":
				return gridState.graph.BFS(
					nodeState.startNode,
					nodeState.endNode,
					nodeState.wallNodes
				);
			case "DFS":
				return gridState.graph.DFS(
					nodeState.startNode,
					nodeState.endNode,
					nodeState.wallNodes
				);
			case "GBS":
				return gridState.graph.GBS(
					nodeState.startNode,
					nodeState.endNode,
					NUM_COLS,
					nodeState.wallNodes
				);
			default:
				return gridState.graph.dijkstra(
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
		if (
			nodeState.movingStartNode &&
			node !== nodeState.endNode &&
			!nodeState.wallNodes.includes(node)
		)
			return setNodeState({ ...nodeState, startNode: node });
		if (
			nodeState.movingEndNode &&
			node !== nodeState.startNode &&
			!nodeState.wallNodes.includes(node)
		)
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
	const getMazeData = () => {
		const maze = [];
		let newCell;
		for (let i = 0; i < NUM_ROWS * NUM_COLS; i++) {
			newCell = String(i);
			maze.push(newCell);
		}
		const checkElligibility = (node, direction) => {
			if (
				(direction === "LEFT" && node % NUM_COLS === NUM_COLS - 1) ||
				(direction === "RIGHT" && node % NUM_COLS === 0)
			)
				return false;
			return maze.includes(node);
		};
		const recurMaze = (currNode) => {
			maze.splice(maze.indexOf(String(currNode)), 1);
			let moves = ["LEFT", "DOWN", "UP", "RIGHT"];
			let nextNode, randDirection, elligible, move, betweenNode;
			while (moves.length > 0) {
				randDirection = Math.floor(Math.random() * moves.length);
				move = moves[randDirection];
				moves.splice(randDirection, 1);
				switch (move) {
					case "LEFT":
						nextNode = currNode - 2;
						betweenNode = currNode - 1;
						elligible = checkElligibility(String(nextNode), move);
						break;
					case "RIGHT":
						nextNode = currNode + 2;
						betweenNode = currNode + 1;
						elligible = checkElligibility(String(nextNode), move);
						break;
					case "UP":
						nextNode = currNode - NUM_COLS * 2;
						betweenNode = currNode - NUM_COLS;
						elligible = checkElligibility(String(nextNode), move);
						break;
					case "DOWN":
						nextNode = currNode + NUM_COLS * 2;
						betweenNode = currNode + NUM_COLS;
						elligible = checkElligibility(String(nextNode), move);
						break;
					default:
						nextNode = null;
						elligible = false;
				}
				if (elligible) {
					maze.splice(maze.indexOf(String(betweenNode)), 1);
					recurMaze(nextNode);
				}
			}
		};
		recurMaze(NUM_COLS + 1);
		if (maze.includes(nodeState.startNode)) {
			maze.splice(maze.indexOf(nodeState.startNode), 1);
		}
		if (maze.includes(nodeState.endNode)) {
			maze.splice(maze.indexOf(nodeState.endNode), 1);
		}
		return maze;
	};
	const generateMaze = () => {
		if (
			gridState.searching ||
			Object.values(searchState.visitedNodes).length > 0
		)
			return;
		removeWalls();
		const mazeCells = getMazeData();
		const currMaze = [];
		setGridState({ ...gridState, searching: true });
		for (let i = 0; i < mazeCells.length; i++) {
			setTimeout(() => {
				currMaze.push(mazeCells[i]);
				if (i % 20 === 0) {
					setNodeState({ ...nodeState, wallNodes: currMaze });
				}
			}, i);
		}
		setTimeout(() => {
			setGridState({ ...gridState, searching: false });
		}, mazeCells.length);
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
				generateMaze={generateMaze}
			></Navbar>
			<main className="Pathfinder-body">
				<div className="Pathfinder-grid">{nodes}</div>
			</main>
		</div>
	);
}
