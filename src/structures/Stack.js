class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

export default class Stack {
	constructor() {
		this.first = null;
		this.last = null;
		this.size = 0;
	}
	push(val) {
		let newNode = new Node(val);
		if (this.size === 0) {
			this.first = newNode;
			this.last = newNode;
		} else {
			let temp = this.first;
			this.first = newNode;
			this.first.next = temp;
		}
		return ++this.size;
	}
	pop() {
		if (this.size === 0) return null;
		let poppedNode = this.first;
		if (this.first === this.last) {
			this.last = null;
		}
		this.first = poppedNode.next;
		this.size--;
		return poppedNode;
	}
}
