import { useState, useEffect } from "react";

import Navbar from "../Navbar/Navbar";
import Grid from "./Grid/Grid";
import PathfinderStats from "./PathfinderStats/PathfinderStats";
import "./Pathfinder.css";

import getSearchAlgo from "../../helpers/getSearchAlgo";
import getNextMazeNode from "../../helpers/getNextMazeNode";
import getNewGraph from "../../helpers/getNewGraph";

const NUM_ROWS = 41;
const NUM_COLS = 101;

const START_NODE_STATE = {
	startNode: "512",
	endNode: "3420",
	wallNodes: [],
	movingStartNode: false,
	movingEndNode: false,
	mousePressed: false,
};

export default function Pathfinder() {
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
	const [nodeState, setNodeState] = useState(START_NODE_STATE);
	// Set initial grid and graph data
	useEffect(() => {
		const graph = getNewGraph(NUM_ROWS, NUM_COLS);
		setGridState({ ...gridState, graph });
	}, []);
	const visualize = () => {
		// Don't initialize search if already pushing nodes or walls to state.
		if (gridState.searching) return;
		resetSearch();
		const t0 = performance.now();
		setGridState({ ...gridState, searching: true });
		let { visitedNodes, shortestPath } = getSearchAlgo(
			gridState,
			nodeState,
			NUM_COLS
		);
		const timeToExecute = performance.now() - t0;
		let visitedObj = {};
		let shortestPathArr = [];
		// Iterate through all found nodes and the shortest path nodes (if found) and animate them individually
		let count = 0;
		let animInterval = setInterval(() => {
			if (count === visitedNodes.length + shortestPath.length) {
				setGridState({ ...gridState, searching: false });
				if (shortestPath.length > 0) {
					setSearchState({
						shortestPath: shortestPathArr,
						visitedNodes: visitedObj,
						searchTime: timeToExecute,
					});
				}
				clearInterval(animInterval);
			} else {
				if (count < visitedNodes.length) {
					visitedObj[visitedNodes[count]] = true;
				} else {
					shortestPathArr.push(
						shortestPath[count - visitedNodes.length]
					);
				}
				setSearchState({
					...searchState,
					searchTime: null,
					visitedNodes: visitedObj,
					shortestPath: shortestPathArr,
				});
				count++;
			}
		}, gridState.searchSpeed);
	};
	// Function checks where the user clicked and either starts drawing a wall or moving start/end node
	const clickDown = (val) => {
		// Don't allow changing the grid before resetting search data
		if (Object.values(searchState.visitedNodes).length > 0) return;
		let movingStartNode, movingEndNode;
		let wallNodes = [...nodeState.wallNodes];
		if (val === nodeState.startNode) {
			movingStartNode = true;
		} else if (val === nodeState.endNode) {
			movingEndNode = true;
		} else if (wallNodes.indexOf(val) >= 0) {
			wallNodes.splice(wallNodes.indexOf(val), 1);
		} else {
			wallNodes = wallNodes.concat(val);
		}
		setNodeState({
			...nodeState,
			wallNodes,
			movingStartNode,
			movingEndNode,
			mousePressed: true,
		});
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
	// Function to toggle a node to/from being a wall or move the start/end node to current mouse position
	const toggleNodeFunction = (node) => {
		if (
			gridState.searching ||
			!nodeState.mousePressed ||
			node === nodeState.startNode ||
			node === nodeState.endNode ||
			(nodeState.wallNodes.includes(node) &&
				(nodeState.movingStartNode || nodeState.movingEndNode))
		)
			return;
		// Functions to move start/end node
		if (nodeState.movingStartNode)
			return setNodeState({ ...nodeState, startNode: node });
		if (nodeState.movingEndNode)
			return setNodeState({ ...nodeState, endNode: node });
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
	const resetSearch = () => {
		// Prevent resetting search state when in middle of a search
		if (!gridState.searching) {
			setSearchState({
				visitedNodes: {},
				shortestPath: [],
				searchTime: null,
			});
		}
	};
	const reset = () => {
		if (!gridState.searching) {
			resetSearch();
			// Remove any walls and return start/end nodes to initial positions
			setNodeState(START_NODE_STATE);
		}
	};
	const removeWalls = () => {
		if (!gridState.searching) {
			setNodeState({ ...nodeState, wallNodes: [] });
		}
	};
	const changeAlgo = (val) => {
		setGridState({ ...gridState, searchAlgo: val });
	};
	const changeSpeed = (val) => {
		setGridState({ ...gridState, searchSpeed: Number(val) });
	};
	// Function to generate random maze.
	const getMazeData = () => {
		const maze = [];
		// All nodes start as a wall and then the maze gets carved out
		for (let i = 0; i < NUM_ROWS * NUM_COLS; i++) {
			maze.push(String(i));
		}
		// Recursive function that starts at a specific node, skips two nodes in any direction, and creates a path between the nodes if the found node is not already checked.
		const recurMaze = (currNode) => {
			maze.splice(maze.indexOf(String(currNode)), 1);
			let moves = ["LEFT", "DOWN", "UP", "RIGHT"];
			let nextNode, randDirection, elligible, move, betweenNode;
			// Checks all directions in a random order for a posslbe path
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
		// Remove the start and end node locations from the generated walls. (TODO: There is a slight chance that a start/end node will end up at the intersection of walls if set on specific nodes rendering the maze unsolvable)
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
		resetSearch();
		const mazeCells = getMazeData();
		const currMaze = [];
		setGridState({ ...gridState, searching: true });
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
				{gridState.graph && (
					<Grid
						graph={gridState.graph}
						{...searchState}
						{...nodeState}
						clickDown={clickDown}
						clickUp={clickUp}
						toggleNodeFunction={toggleNodeFunction}
					/>
				)}
				{searchState.searchTime && <PathfinderStats {...searchState} />}
			</main>
		</div>
	);
}
