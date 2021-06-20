import { useState } from "react";
import { useHistory } from "react-router-dom";

import Pathfinder from "../Pathfinder/Pathfinder";
import HelpWindow from "../HelpWindow/HelpWindow";

export default function PathfinderApp(props) {
	const [helpState, setHelpState] = useState({ helpOpen: true });
	let history = useHistory();
	const toggleHelp = () => {
		history.push("/");
		setHelpState({ helpOpen: !helpState.helpOpen });
	};

	return (
		<>
			{helpState.helpOpen && (
				<HelpWindow
					toggleHelp={toggleHelp}
					helpOpen={helpState.helpOpen}
				/>
			)}
			<Pathfinder toggleHelp={toggleHelp} />
		</>
	);
}
