import { useState } from "react";

import Pathfinder from "../Pathfinder/Pathfinder";
import HelpWindow from "../HelpWindow/HelpWindow";

export default function PathfinderApp() {
	const [helpState, setHelpState] = useState({ display: true });
	const toggleHelp = () => {
		setHelpState({ display: !helpState.display });
	};
	return (
		<>
			{helpState.display && <HelpWindow toggleHelp={toggleHelp} />}
			<Pathfinder />
		</>
	);
}
