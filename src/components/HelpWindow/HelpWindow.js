import { Switch, Route } from "react-router-dom";

import HelpWindowStart from "./HelpWindowStart/HelpWindowStart";
import HelpWindowAlgos from "./HelpWindowAlgos/HelpWindowAlgos";
import HelpWindowLegend from "./HelpWindowLegend/HelpWindowLegend";
import Modal from "../UI/Modal/Modal";
import "./HelpWindow.css";

export default function HelpWindow(props) {
	const { toggleHelp, helpOpen } = props;
	return (
		<Modal modalOpen={helpOpen} clicked={toggleHelp}>
			<div className="HelpWindow" onClick={(e) => e.stopPropagation()}>
				<div className="HelpWindowInner">
					<Switch>
						<Route exact path="/">
							<HelpWindowStart toggleHelp={toggleHelp} />
						</Route>
						<Route exact path="/legend">
							<HelpWindowLegend />
						</Route>
						<Route exact path="/algos">
							<HelpWindowAlgos />
						</Route>
					</Switch>
				</div>
			</div>
		</Modal>
	);
}
