import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import MenuBar from "../MenuBar";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function App() {
	return (
		<Router>
			<Container>
				<MenuBar />
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
			</Container>
		</Router>
	);
}

export default App;