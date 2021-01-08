import React, { createContext, useReducer } from "react";

const AuthContext = createContext({
	user: null,
	login: (userData: any) => {},
	logout: () => {}
});

function authReducer(state: any, action: any) {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				user: action.payload
			};
		case "LOGOUT":
			return {
				...state,
				user: null
			};
		default:
			return state;
	}
}

function AuthProvider(props: any) {
	const [state, dispatch] = useReducer(authReducer, { user: null });

	const login = (userData: any) => {
		dispatch({
			type: "LOGIN",
			payload: userData
		});
	};

	const logout = () => {
		dispatch({ type: "LOGOUT" });
	};

	return (
		<AuthContext.Provider
			value={{ user: state.user, login, logout }}
			{...props}
		/>
	);
}

export { AuthContext, AuthProvider };
