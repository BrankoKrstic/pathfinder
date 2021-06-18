import { useState } from "react";
import { useHistory } from "react-router-dom";

import Pathfinder from "../Pathfinder/Pathfinder";
import HelpWindow from "../HelpWindow/HelpWindow";

export default function PathfinderApp(props) {
	const [helpState, setHelpState] = useState({ display: true });
	let history = useHistory();
	const toggleHelp = () => {
		history.push("/");
		setHelpState({ display: !helpState.display });
	};

	return (
		<>
			{helpState.display && <HelpWindow toggleHelp={toggleHelp} />}
			<Pathfinder toggleHelp={toggleHelp} />
		</>
	);
}
