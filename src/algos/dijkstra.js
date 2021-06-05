const swap = (arr, idx1, idx2) => {
	[arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
};

const calcXDist = (node1, node2, numCols) => {
	return Math.abs((Number(node1) % numCols) - (Number(node2) % numCols));
};

const calcYDist = (node1, node2, numCols) => {
	return Math.abs(
		Math.floor(Number(node1) / numCols) -
			Math.floor(Number(node2) / numCols)
	);
};

class Node {
	constructor(val, priority) {
		this.val = val;
		this.priority = priority;
	}
}

class PriorityQueue {
	constructor() {
		this.values = [];
	}
	enqueue(val, priority) {
		let newNode = new Node(val, priority);
		this.values.push(newNode);
		this.bubbleUp();
	}
	bubbleUp() {
		let idx = this.values.length - 1;
		const element = this.values[idx];
		while (idx > 0) {
			let parentIdx = Math.floor((idx - 1) / 2);
			let parent = this.values[parentIdx];
			if (element.priority > parent.priority) break;
			this.values[parentIdx] = element;
			this.values[idx] = parent;
			idx = parentIdx;
		}
	}
	dequeue() {
		const min = this.values[0];
		const end = this.values.pop();
		if (this.values.length > 0) {
			this.values[0] = end;
			this.sinkDown();
		}
		return min;
	}
	sinkDown() {
		let idx = 0;
		const length = this.values.length;
		const element = this.values[0];
		while (true) {
			let leftChildIdx = 2 * idx + 1;
			let rightChildIdx = 2 * idx + 2;
			let leftChild, rightChild;
			let swap = null;

			if (leftChildIdx < length) {
				leftChild = this.values[leftChildIdx];
				if (leftChild.priority < element.priority) {
					swap = leftChildIdx;
				}
			}
			if (rightChildIdx < length) {
				rightChild = this.values[rightChildIdx];
				if (
					(swap === null && rightChild.priority < element.priority) ||
					(swap !== null && rightChild.priority < leftChild.priority)
				) {
					swap = rightChildIdx;
				}
			}
			if (swap === null) break;
			this.values[idx] = this.values[swap];
			this.values[swap] = element;
			idx = swap;
		}
	}
}

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
			let xDist, yDist, heuristicScore;
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
					xDist = calcXDist(vEnd, edge.node, numCols);
					yDist = calcYDist(vEnd, edge.node, numCols);
					heuristicScore = xDist + yDist;
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
		const stack = [vStart];
		const previous = {};
		for (let vertex in this.adjacencyList) {
			previous[vertex] = null;
		}
		while (stack.length && !visitedNodes.includes(vEnd)) {
			let currNode = stack.pop();
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
}
