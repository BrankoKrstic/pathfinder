const swap = (arr, idx1, idx2) => {
	[arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
};

class Node {
	constructor(val, priority) {
		this.val = val;
		this.priority = priority;
	}
}

export default class PriorityQueue {
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
		while (idx > 0) {
			let parentIdx = Math.floor((idx - 1) / 2);
			if (this.values[idx].priority > this.values[parentIdx].priority)
				break;
			swap(this.values, idx, parentIdx);
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
			let swapIdx = null;

			if (leftChildIdx < length) {
				leftChild = this.values[leftChildIdx];
				if (leftChild.priority < element.priority) {
					swapIdx = leftChildIdx;
				}
			}
			if (rightChildIdx < length) {
				rightChild = this.values[rightChildIdx];
				if (
					(swapIdx === null &&
						rightChild.priority < element.priority) ||
					(swapIdx !== null &&
						rightChild.priority < leftChild.priority)
				) {
					swapIdx = rightChildIdx;
				}
			}
			if (swapIdx === null) break;
			swap(this.values, idx, swapIdx);
			idx = swapIdx;
		}
	}
}
