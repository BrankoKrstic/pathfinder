import PathfinderApp from "./components/PathfinderApp/PathfinderApp";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
	return (
		<Router>
			<div className="App">
				<PathfinderApp />
			</div>
		</Router>
	);
}

export default App;
