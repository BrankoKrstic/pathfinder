import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import HelpWindowStart from "./HelpWindowStart/HelpWindowStart";
import HelpWindowAlgos from "./HelpWindowAlgos/HelpWindowAlgos";
import Modal from "../UI/Modal/Modal";
import "./HelpWindow.css";

export default function HelpWindow(props) {
	const { toggleHelp } = props;
	return (
		<Router>
			<Modal clicked={toggleHelp}>
				<div className="HelpWindow">
					<div className="HelpWindowInner">
						<Switch>
							<Route exact path="/">
								<HelpWindowStart toggleHelp={toggleHelp} />
							</Route>
							<Route exact path="/legend">
								<HelpWindowStart />
							</Route>
							<Route exact path="/algos">
								<HelpWindowAlgos />
							</Route>
						</Switch>
					</div>
				</div>
			</Modal>
		</Router>
	);
}
