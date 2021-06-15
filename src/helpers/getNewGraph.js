import { WeightedGraph } from "../graph/graph";

const getNewGraph = (rows, cols) => {
	const newGraph = new WeightedGraph();
	for (let i = 0; i < rows * cols; i++) {
		// Graph only accepts strings as vertex name. Using the index of each graph as its name.
		newGraph.addVertex(String(i));
		// Create edges between adjacent vertices
		if (i % cols > 0) {
			// This version of the app does not use weighed edges, so the weight is always 1.
			// Turning the graph into a weighted graph requires adding a third argument with the weight to the addEdge method
			newGraph.addEdge(String(i), String(i - 1));
		}
		if (i >= cols) {
			newGraph.addEdge(String(i), String(i - cols));
		}
	}
	return newGraph;
};

export default getNewGraph;
