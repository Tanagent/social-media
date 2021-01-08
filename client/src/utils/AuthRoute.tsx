import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../components/context/auth";

function AuthRoute({ component: Component, ...rest }: any) {
	const { user } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(props) =>
				user ? <Redirect to="/" /> : <Component {...props} />
			}
		/>
	);
}

export default AuthRoute;
