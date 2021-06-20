import { Link } from "react-router-dom";
import Node from "../../Node/Node";
import "./HelpWindowLegend.css";

export default function HelpWindowLegend() {
	const nodeData = [
		{ type: { start: true }, text: "Starting point node" },
		{ type: { end: true }, text: "Target node" },
		{ type: { visited: true }, text: "Visited node" },
		{ type: { final: true }, text: "Found path node" },
		{ type: { wall: true }, text: "Impassable wall node" },
	];
	const blankFunction = () => {
		return;
	};
	return (
		<div className="HelpWindowLegend">
			<h3>Node Type Legend</h3>
			{nodeData.map((el) => (
				<div className="HelpWindowLegend-node">
					<div style={{ padding: "0 1rem" }}>
						<Node
							{...el.type}
							helpNode={true}
							clickUp={blankFunction}
							clickDown={blankFunction}
							toggleNodeFunction={blankFunction}
						/>
					</div>
					<strong>{el.text}</strong>
				</div>
			))}
			<Link to="/">Back</Link>
		</div>
	);
}
