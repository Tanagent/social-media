import gql from "graphql-tag";
import React, { useState } from "react";
import { ApolloError, FetchResult, useMutation } from "@apollo/react-hooks";
import { Button, Form } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

import { useForm } from "../utils/hooks";

const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

function Login() {
	let history = useHistory();
	const [errors, setErrors] = useState<any>({});

	const { onChange, onSubmit, values } = useForm(loginUserCallback, {
		username: "",
		password: ""
	});

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(_, result: FetchResult) {
			console.log(result);
			history.push("/");
		},
		onError(err: ApolloError) {
			setErrors(err.graphQLErrors[0].extensions?.exception.errors);
		},
		variables: values
	});

	function loginUserCallback() {
		loginUser();
	}

	return (
		<div className="form-container">
			<Form className={loading ? "loading" : ""} onSubmit={onSubmit} noValidate>
				<h1>Login</h1>
				<Form.Input
					label="Username"
					placeholder="Username..."
					name="username"
					type="text"
					value={values.username}
					error={errors.username ? true : false}
					onChange={onChange}
				/>
				<Form.Input
					label="Password"
					placeholder="Password..."
					name="password"
					type="password"
					value={values.password}
					error={errors.password ? true : false}
					onChange={onChange}
				/>
				<Button type="submit" primary>
					Login
				</Button>
			</Form>
			{Object.keys(errors).length > 0 && (
				<div className="ui error message">
					<ul className="list">
						{Object.values(errors).map((value: any) => (
							<li key={value}>{value}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default Login;
