import gql from "graphql-tag";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { ApolloError, FetchResult, useMutation } from "@apollo/react-hooks";
import { Button, Form } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

function Register() {
	let history = useHistory();
	const [errors, setErrors] = useState<any>({});
	const [values, setValues] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: ""
	});
	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, result: FetchResult) {
			console.log(result);
			history.push("/");
		},
		onError(err: ApolloError) {
			setErrors(err.graphQLErrors[0].extensions?.exception.errors);
		},
		variables: values
	});

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		addUser();
	};

	return (
		<div className="form-container">
			<Form className={loading ? "loading" : ""} onSubmit={onSubmit} noValidate>
				<h1>Register</h1>
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
					label="Email"
					placeholder="Email..."
					name="email"
					type="email"
					value={values.email}
					error={errors.email ? true : false}
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
				<Form.Input
					label="Confirm Password"
					placeholder="Confirm Password..."
					name="confirmPassword"
					type="password"
					value={values.confirmPassword}
					error={errors.confirmPassword ? true : false}
					onChange={onChange}
				/>
				<Button type="submit" primary>
					Register
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

export default Register;
