import Stack from "../structures/Stack";
import PriorityQueue from "../structures/PriorityQueue";
import calcHeuristic from "../helpers/calcHeuristic";

export class WeightedGraph {
	constructor() {
		this.adjacencyList = {};
	}
	addVertex(v) {
		if (this.adjacencyList[v]) return console.log("vertex already exists");
		// Each vertex in the graph is an empty array. The array will contain data on the vertices they are connected to and the weight of the edge
		this.adjacencyList[v] = [];
	}
	addEdge(v1, v2, weight = 1) {
		if (!this.adjacencyList[v1] || !this.adjacencyList[v2])
			return console.log("no such vertex");
		this.adjacencyList[v1].push({ node: v2, weight });
		this.adjacencyList[v2].push({ node: v1, weight });
	}
	getShortestPath(previousList, currVal) {
		const shortestPath = [];
		while (previousList[currVal]) {
			shortestPath.push(currVal);
			currVal = previousList[currVal];
		}
		return shortestPath;
	}
	dijkstra(vStart, vEnd, wallNodes = []) {
		const distances = {},
			previous = {};
		let q = new PriorityQueue();
		let shortestPath = [];
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
				shortestPath = this.getShortestPath(previous, val);
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
		if (shortestPath.length > 0) {
			shortestPath = shortestPath.concat(vStart).reverse();
		}
		return { visitedNodes, shortestPath };
	}
	aStar(vStart, vEnd, numCols, wallNodes = []) {
		const distances = {},
			previous = {};
		let q = new PriorityQueue();
		let shortestPath = [];
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
				shortestPath = this.getShortestPath(previous, val);
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
		if (shortestPath.length > 0) {
			shortestPath = shortestPath.concat(vStart).reverse();
		}
		return { visitedNodes, shortestPath };
	}
	BFS(vStart, vEnd, wallNodes = []) {
		const previous = {};
		let shortestPath = [];
		let visitedNodes = [];
		let q = new PriorityQueue();
		let priority = 1;
		q.enqueue(vStart, 1);
		while (q.values.length > 0) {
			let { val } = q.dequeue();
			visitedNodes.push(val);
			if (val === vEnd) {
				shortestPath = this.getShortestPath(previous, val);
				break;
			}
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
		if (shortestPath.length > 0) {
			shortestPath = shortestPath.concat(vStart).reverse();
		}
		return { visitedNodes, shortestPath };
	}
	// COMMENT: Left recursive depth-first search for referce
	// DO NOT USE FOR GRIDS WITH 2700+ VERTICES OR IT THE ALGO WITH EXCEED CHROME'S MAXIMUM CALL STACK
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
		const stack = new Stack();
		let visitedNodes = [];
		const previous = {};
		let shortestPath = [];
		stack.push(vStart);
		while (stack.size && !visitedNodes.includes(vEnd)) {
			let { val } = stack.pop();
			if (val === vEnd) {
				shortestPath = this.getShortestPath(previous, val);
				break;
			}
			visitedNodes.push(val);
			this.adjacencyList[val].forEach((edge) => {
				if (
					!visitedNodes.includes(edge.node) &&
					!visitedNodes.includes(vEnd) &&
					!wallNodes.includes(edge.node)
				) {
					previous[edge.node] = val;
					stack.push(edge.node);
				}
			});
		}
		if (shortestPath.length > 0) {
			shortestPath = shortestPath.concat(vStart).reverse();
		}
		return {
			visitedNodes,
			shortestPath,
		};
	}
	//Greedy Best-first Search
	GBS(vStart, vEnd, numCols, wallNodes = []) {
		const previous = {};
		let q = new PriorityQueue();
		let shortestPath = [];
		let visitedNodes = [];
		q.enqueue(vStart, 1);
		while (q.values.length > 0) {
			let { val } = q.dequeue();
			if (val === vEnd) {
				while (previous[val]) {
					shortestPath.push(val);
					val = previous[val];
				}
				break;
			}
			if (visitedNodes.includes(val)) continue;
			visitedNodes.push(val);
			this.adjacencyList[val].forEach((edge) => {
				let heuristicScore = calcHeuristic(vEnd, edge.node, numCols);
				if (
					!visitedNodes.includes(edge.node) &&
					!wallNodes.includes(edge.node)
				) {
					previous[edge.node] = val;
					q.enqueue(edge.node, heuristicScore);
				}
			});
		}
		if (shortestPath.length > 0) {
			shortestPath = shortestPath.concat(vStart).reverse();
		}
		return { visitedNodes, shortestPath };
	}
}
