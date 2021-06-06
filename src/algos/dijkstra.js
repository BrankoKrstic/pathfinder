import Stack from "../structures/Stack";
import PriorityQueue from "../structures/PriorityQueue";
import calcHeuristic from "../helpers/calcHeuristic";

const calcXDist = (node1, node2, numCols) => {
	return Math.abs((Number(node1) % numCols) - (Number(node2) % numCols));
};

const calcYDist = (node1, node2, numCols) => {
	return Math.abs(
		Math.floor(Number(node1) / numCols) -
			Math.floor(Number(node2) / numCols)
	);
};

export class WeightedGraph {
	constructor() {
		this.adjacencyList = {};
	}
	addVertex(v) {
		if (this.adjacencyList[v]) return console.log("vertex already exists");
		this.adjacencyList[v] = [];
	}
	addEdge(v1, v2, weight) {
		if (!this.adjacencyList[v1] || !this.adjacencyList[v2])
			return console.log("no such vertex");
		this.adjacencyList[v1].push({ node: v2, weight });
		this.adjacencyList[v2].push({ node: v1, weight });
	}
	dijkstra(vStart, vEnd, wallNodes = []) {
		const distances = {},
			previous = {};
		let q = new PriorityQueue();
		let path = [];
		let visitedNodes = [];
		for (let vertex in this.adjacencyList) {
			distances[vertex] = Infinity;
			if (vertex === vStart) {
				distances[vertex] = 0;
			}
			previous[vertex] = null;
			q.enqueue(vertex, distances[vertex]);
		}
		while (q.values.length > 0) {
			let { val, priority } = q.dequeue();
			if (val === vEnd) {
				while (previous[val]) {
					path.push(val);
					val = previous[val];
				}
				break;
			}
			if (distances[val] !== Infinity) {
				if (!visitedNodes.includes(val)) {
					visitedNodes.push(val);
				}
				this.adjacencyList[val].forEach((edge) => {
					let newDist = priority + edge.weight;
					if (
						newDist < distances[edge.node] &&
						!wallNodes.includes(edge.node)
					) {
						distances[edge.node] = newDist;
						previous[edge.node] = val;
						q.enqueue(edge.node, newDist);
					}
				});
			} else {
				break;
			}
		}
		return { visitedNodes, shortestPath: path.concat(vStart).reverse() };
	}
	aStar(vStart, vEnd, numCols, wallNodes = []) {
		const distances = {},
			previous = {};
		let q = new PriorityQueue();
		let path = [];
		let visitedNodes = [];
		for (let vertex in this.adjacencyList) {
			distances[vertex] = Infinity;
			if (vertex === vStart) {
				distances[vertex] = 0;
			}
			previous[vertex] = null;
			q.enqueue(vertex, distances[vertex]);
		}
		while (q.values.length > 0) {
			let { val } = q.dequeue();
			if (val === vEnd) {
				while (previous[val]) {
					path.push(val);
					val = previous[val];
				}
				break;
			}
			if (distances[val] !== Infinity) {
				if (!visitedNodes.includes(val)) {
					visitedNodes.push(val);
				}
				this.adjacencyList[val].forEach((edge) => {
					let heuristicScore = calcHeuristic(
						vEnd,
						edge.node,
						numCols
					);
					let newDist = distances[val] + edge.weight;
					if (
						newDist < distances[edge.node] &&
						!wallNodes.includes(edge.node)
					) {
						distances[edge.node] = newDist;
						previous[edge.node] = val;
						q.enqueue(edge.node, newDist + heuristicScore);
					}
				});
			} else {
				break;
			}
		}
		return { visitedNodes, shortestPath: path.concat(vStart).reverse() };
	}
	BFS(vStart, vEnd, wallNodes = []) {
		const previous = {};
		let path = [];
		let visitedNodes = [];
		let q = new PriorityQueue();
		let priority = 1;
		q.enqueue(vStart, 1);
		while (q.values.length > 0) {
			let { val } = q.dequeue();
			visitedNodes.push(val);
			if (val === vEnd) {
				console.log("ending");
				while (previous[val]) {
					path.push(val);
					val = previous[val];
				}
				break;
			} else {
				priority++;
				// eslint-disable-next-line no-loop-func
				this.adjacencyList[val].forEach((edge) => {
					if (
						edge.node !== vStart &&
						!previous[edge.node] &&
						!wallNodes.includes(edge.node)
					) {
						previous[edge.node] = val;
						q.enqueue(edge.node, priority);
					}
				});
			}
		}
		return { visitedNodes, shortestPath: path.concat(vStart).reverse() };
	}
	// COMMENT: Left recursive depth-first search for referce
	// DO NOT USE FOR GRIDS WITH 2700+ VERTICES OR IT THE ALGO WITH EXCEED CHROME'S MAXIMUM CALL STACK (works fine on firefox)
	// DFSR(vStart, vEnd, wallNodes = []) {
	// 	let visitedNodes = [];
	// 	const recurrSearch = (currNode) => {
	// 		let newValue = [currNode];
	// 		console.log(currNode);
	// 		visitedNodes.push(currNode);
	// 		if (currNode === vEnd) return [currNode];
	// 		this.adjacencyList[currNode].forEach((edge) => {
	// 			if (
	// 				!visitedNodes.includes(edge.node) &&
	// 				!visitedNodes.includes(vEnd) &&
	// 				!wallNodes.includes(edge.node)
	// 			) {
	// 				newValue = newValue.concat(recurrSearch(edge.node));
	// 			}
	// 		});
	// 		return newValue;
	// 	};
	// 	let path = recurrSearch(vStart).reverse();
	// 	return { visitedNodes, shortestPath: path.reverse() };
	// }
	DFS(vStart, vEnd, wallNodes = []) {
		let visitedNodes = [];
		let shortestPath = [];
		const stack = new Stack();
		stack.push(vStart);
		const previous = {};
		for (let vertex in this.adjacencyList) {
			previous[vertex] = null;
		}
		while (stack.size && !visitedNodes.includes(vEnd)) {
			let currNode = stack.pop().val;
			visitedNodes.push(currNode);
			this.adjacencyList[currNode].forEach((edge) => {
				if (
					!visitedNodes.includes(edge.node) &&
					!visitedNodes.includes(vEnd) &&
					!wallNodes.includes(edge.node)
				) {
					previous[edge.node] = currNode;
					stack.push(edge.node);
				}
			});
		}
		let finishNode = vEnd;
		while (previous[finishNode]) {
			shortestPath.push(finishNode);
			finishNode = previous[finishNode];
		}
		return {
			visitedNodes,
			shortestPath: shortestPath.concat(vStart).reverse(),
		};
	}
	//Greedy Best-first Search
	GBS(vStart, vEnd, numCols, wallNodes = []) {
		const previous = {};
		let q = new PriorityQueue();
		let path = [];
		let visitedNodes = [];
		for (let vertex in this.adjacencyList) {
			previous[vertex] = null;
		}
		q.enqueue(vStart, 1);
		while (q.values.length > 0) {
			let { val } = q.dequeue();
			if (val === vEnd) {
				while (previous[val]) {
					path.push(val);
					val = previous[val];
				}
				break;
			}
			if (visitedNodes.includes(val)) continue;
			visitedNodes.push(val);
			this.adjacencyList[val].forEach((edge) => {
				let heuristicScore = calcHeuristic(vEnd, edge.node, numCols);
				console.log(heuristicScore);
				if (
					!visitedNodes.includes(edge.node) &&
					!wallNodes.includes(edge.node)
				) {
					previous[edge.node] = val;
					q.enqueue(edge.node, heuristicScore);
				}
			});
		}
		return { visitedNodes, shortestPath: path.concat(vStart).reverse() };
	}
}
