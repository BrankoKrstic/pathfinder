const checkElligibility = (node, direction, NUM_COLS, maze) => {
	if (
		(direction === "LEFT" && node % NUM_COLS === NUM_COLS - 1) ||
		(direction === "RIGHT" && node % NUM_COLS === 0)
	)
		return false;
	return maze.includes(node);
};

const getNextMazeNode = (move, currNode, NUM_COLS, maze) => {
	let nextNode, betweenNode, elligible;
	switch (move) {
		case "LEFT":
			nextNode = currNode - 2;
			betweenNode = currNode - 1;
			elligible = checkElligibility(
				String(nextNode),
				move,
				NUM_COLS,
				maze
			);
			break;
		case "RIGHT":
			nextNode = currNode + 2;
			betweenNode = currNode + 1;
			elligible = checkElligibility(
				String(nextNode),
				move,
				NUM_COLS,
				maze
			);
			break;
		case "UP":
			nextNode = currNode - NUM_COLS * 2;
			betweenNode = currNode - NUM_COLS;
			elligible = checkElligibility(
				String(nextNode),
				move,
				NUM_COLS,
				maze
			);
			break;
		case "DOWN":
			nextNode = currNode + NUM_COLS * 2;
			betweenNode = currNode + NUM_COLS;
			elligible = checkElligibility(
				String(nextNode),
				move,
				NUM_COLS,
				maze
			);
			break;
		default:
			nextNode = null;
			elligible = false;
	}
	return [nextNode, betweenNode, elligible];
};

export default getNextMazeNode;
