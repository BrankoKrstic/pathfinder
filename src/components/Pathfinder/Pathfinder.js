import { useState, useEffect } from "react";

import Navbar from "../Navbar/Navbar";
import Node from "../Node/Node";
import PathfinderStats from "./PathfinderStats/PathfinderStats";
import "./Pathfinder.css";

import { WeightedGraph } from "../../graph/graph";

import getSearchAlgo from "../../helpers/getSearchAlgo";
import getNextMazeNode from "../../helpers/getNextMazeNode";

const NUM_ROWS = 41;
const NUM_COLS = 101;

export default function Pathfinder() {
	const defaultNodeState = {
		startNode: "512",
		endNode: "3420",
		wallNodes: [],
		movingStartNode: false,
		movingEndNode: false,
		mousePressed: false,
	};
	const [searchState, setSearchState] = useState({
		visitedNodes: {},
		shortestPath: [],
		searchTime: null,
	});
	const [gridState, setGridState] = useState({
		graph: null,
		searchSpeed: 20,
		searchAlgo: "dijkstra",
		searching: false,
	});
	const [nodeState, setNodeState] = useState(defaultNodeState);
	// Set initial grid and graph data
	useEffect(() => {
		const newGraph = new WeightedGraph();
		for (let i = 0; i < NUM_ROWS * NUM_COLS; i++) {
			// Graph only accepts strings as vertex name. Using the index of each graph as its name.
			newGraph.addVertex(String(i));
			// Create edges between adjacent vertices
			if (i % NUM_COLS > 0) {
				// This version of the app does not use weighed edges, so the weight is always 1.
				// Turning the graph into a weighted graph requires adding a third argument with the weight to the addEdge method
				newGraph.addEdge(String(i), String(i - 1));
			}
			if (i >= NUM_COLS) {
				newGraph.addEdge(String(i), String(i - NUM_COLS));
			}
		}
		setGridState({ ...gridState, graph: newGraph });
	}, []);
	const visualize = () => {
		// Don't initialize search if already pushing nodes or walls to state.
		if (gridState.searching) return;
		const t0 = performance.now();
		setGridState({ ...gridState, searching: true });
		let { visitedNodes, shortestPath } = getSearchAlgo(
			gridState,
			nodeState,
			NUM_COLS
		);
		//calc how long the algorithm took to execute
		const timeToExecute = performance.now() - t0;
		resetSearch();
		let visitedObj = {};
		let shortestPathArr = [];
		// Iterate through all found nodes and the shortest path (if found) and animate them individually
		for (let i = 0; i < visitedNodes.length + shortestPath.length; i++) {
			if (i < visitedNodes.length) {
				setTimeout(() => {
					visitedObj[visitedNodes[i]] = true;
					setSearchState({
						...searchState,
						visitedNodes: visitedObj,
						shortestPath: shortestPathArr,
					});
				}, i * gridState.searchSpeed);
			} else {
				setTimeout(() => {
					shortestPathArr.push(shortestPath[i - visitedNodes.length]);
					setSearchState({
						...searchState,
						shortestPath: shortestPathArr,
						visitedNodes: visitedObj,
					});
				}, i * gridState.searchSpeed);
			}
		}
		// If shorest path found, push search stats to state once the animations are done
		setTimeout(() => {
			if (shortestPath.length > 0) {
				setSearchState({
					shortestPath: shortestPathArr,
					visitedNodes: visitedObj,
					searchTime: timeToExecute,
				});
			}
			setGridState({ ...gridState, searching: false });
		}, (visitedNodes.length + shortestPath.length) * gridState.searchSpeed);
	};
	// Function checks where the user clicked and either starts drawing a wall or moving start/end node
	const clickDown = (val) => {
		// Don't allow changing the grid before resetting search data
		if (Object.values(searchState.visitedNodes).length > 0) return;
		if (val === nodeState.startNode) {
			setNodeState({
				...nodeState,
				movingStartNode: true,
			});
		} else if (val === nodeState.endNode) {
			setNodeState({ ...nodeState, movingEndNode: true });
		} else {
			setNodeState({
				...nodeState,
				wallNodes: nodeState.wallNodes.concat(val),
				mousePressed: true,
			});
		}
	};
	// Stop changing the grid on click up
	const clickUp = () => {
		setNodeState({
			...nodeState,
			movingStartNode: false,
			movingEndNode: false,
			mousePressed: false,
		});
	};
	const resetSearch = () => {
		// Prevent resetting search state when in middle of a search
		if (gridState.searching) return;
		setSearchState({
			visitedNodes: {},
			shortestPath: [],
			searchTime: null,
		});
	};
	const reset = () => {
		if (gridState.searching) return;
		resetSearch();
		// Remove any walls and return start/end nodes to initial position
		setNodeState(defaultNodeState);
	};
	const removeWalls = () => {
		if (gridState.searching) return;
		setNodeState({ ...nodeState, wallNodes: [] });
	};

	const changeAlgo = (val) => {
		setGridState({ ...gridState, searchAlgo: val });
	};
	const changeSpeed = (val) => {
		setGridState({ ...gridState, searchSpeed: Number(val) });
	};
	// Function to toggle a node to/from being a wall or move the start/end node to current mouse position, depending on state
	const toggleNodeFunction = (node) => {
		if (gridState.searching) return;
		// Functions to move start/end node
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
		// Does nothing if attempting to put something over the current start/end node
		if (
			!nodeState.mousePressed ||
			node === nodeState.startNode ||
			node === nodeState.endNode
		)
			return;
		// Remove node from wall state if already in wallNodes array. If not, push it to wall nodes.
		let nodeIndex = nodeState.wallNodes.indexOf(node);
		let newArr = [...nodeState.wallNodes];
		if (nodeIndex >= 0) {
			newArr.splice(nodeIndex, 1);
		} else {
			newArr.push(node);
		}
		setNodeState({ ...nodeState, wallNodes: newArr });
	};
	// Function to generate random maze.
	const getMazeData = () => {
		const maze = [];
		let newCell;
		// All nodes start as a wall and then the maze gets carved out
		for (let i = 0; i < NUM_ROWS * NUM_COLS; i++) {
			newCell = String(i);
			maze.push(newCell);
		}
		// Recursive function that starts in corner of the maze, skips two nodes in any direction, and creates a path between the nodes if the found node is not already checked.
		// If all options are exhausted, the recursion brings it back to the last node with adjacent nodes to jump to until there are no elligible nodes left.
		const recurMaze = (currNode) => {
			maze.splice(maze.indexOf(String(currNode)), 1);
			let moves = ["LEFT", "DOWN", "UP", "RIGHT"];
			let nextNode, randDirection, elligible, move, betweenNode;
			// Checks if the function can find a path for the maze in a random direction
			while (moves.length > 0) {
				randDirection = Math.floor(Math.random() * moves.length);
				move = moves[randDirection];
				moves.splice(randDirection, 1);
				[nextNode, betweenNode, elligible] = getNextMazeNode(
					move,
					currNode,
					NUM_COLS,
					maze
				);
				if (elligible) {
					maze.splice(maze.indexOf(String(betweenNode)), 1);
					recurMaze(nextNode);
				}
			}
		};
		// Best to start at NUM_COLS + 1 at a maze with an odd number of rows and cols to make all the sides of the maze a wall. If maze starts has even rows/cols, can start at NUM_COLS + 1 or just 0.
		recurMaze(NUM_COLS + 1);
		// Remove a the start and end node locations from the generated maze. (TODO: There is a slight chance that a start/end node will end up at the intersection of walls if set on specific nodes rendering the maze unsolvable)
		if (maze.includes(nodeState.startNode)) {
			maze.splice(maze.indexOf(nodeState.startNode), 1);
		}
		if (maze.includes(nodeState.endNode)) {
			maze.splice(maze.indexOf(nodeState.endNode), 1);
		}
		return maze;
	};
	const generateMaze = () => {
		if (gridState.searching) return;
		// Remove all walls and search paths, but leave start/end nodes at the same position
		removeWalls();
		resetSearch();
		const mazeCells = getMazeData();
		const currMaze = [];
		setGridState({ ...gridState, searching: true });
		// Gradually push generated walls to state.
		for (let i = 0; i < mazeCells.length; i++) {
			setTimeout(() => {
				currMaze.push(mazeCells[i]);
				// Push rougly one row of wall cells at a time
				if (i % Math.floor(NUM_COLS / 2) === 0) {
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
				toggleNodeFunction={toggleNodeFunction}
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
			/>
			<main className="Pathfinder-body">
				<div className="Pathfinder-grid">{nodes}</div>
				{searchState.searchTime && (
					<PathfinderStats
						numVisitedNodes={
							Object.values(searchState.visitedNodes).length
						}
						shortestPathLength={searchState.shortestPath.length}
						searchTime={searchState.searchTime.toFixed(2)}
					/>
				)}
			</main>
		</div>
	);
}
