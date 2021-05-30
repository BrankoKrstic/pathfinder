const swap = (arr, idx1, idx2) => {
	[arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
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
		this.values.push(new Node(val, priority));
		let location = this.values.length - 1;
		let parentLocation = Math.floor((location - 1) / 2);
		while (
			this.values[parentLocation] &&
			this.values[location].priority <
				this.values[parentLocation].priority
		) {
			swap(this.values, location, parentLocation);
			location = parentLocation;
			parentLocation = Math.floor((location - 1) / 2);
		}
	}
	dequeue() {
		swap(this.values, 0, this.values.length - 1);
		let max = this.values.pop();
		let startIndex = 0;
		let firstChild, secondChild;
		let swapping = true;
		while (swapping) {
			firstChild = this.values[startIndex * 2 + 1];
			secondChild = this.values[startIndex * 2 + 2];
			if (
				firstChild &&
				firstChild.priority < this.values[startIndex].priority &&
				firstChild.priority < secondChild.priority
			) {
				swap(this.values, startIndex, startIndex * 2 + 1);
				startIndex = startIndex * 2 + 1;
			} else if (
				secondChild &&
				secondChild.priority < this.values[startIndex].priority &&
				secondChild.priority < firstChild.priority
			) {
				swap(this.values, startIndex, startIndex * 2 + 2);
				startIndex = startIndex * 2 + 2;
			} else {
				swapping = false;
			}
		}
		return max;
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
	dijkstra(vStart, vEnd) {
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
			visitedNodes.push(val);
			if (val === vEnd) {
				while (previous[val]) {
					path.push(val);
					val = previous[val];
				}
				break;
			}
			if (distances[val] !== Infinity) {
				this.adjacencyList[val].forEach((edge) => {
					let newDist = priority + edge.weight;
					if (newDist < distances[edge.node]) {
						distances[edge.node] = newDist;
						previous[edge.node] = val;
						q.enqueue(edge.node, newDist);
					}
				});
			}
		}
		return { visitedNodes, shortestPath: path.concat(vStart).reverse() };
	}
}
