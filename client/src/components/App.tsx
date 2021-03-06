import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import MenuBar from "../MenuBar";
import { AuthProvider } from "./context/auth";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import AuthRoute from "../utils/AuthRoute";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Container>
					<MenuBar />
					<Route exact path="/" component={Home} />
					<AuthRoute exact path="/login" component={Login} />
					<AuthRoute exact path="/register" component={Register} />
				</Container>
			</Router>
		</AuthProvider>
	);
}

export default App;
