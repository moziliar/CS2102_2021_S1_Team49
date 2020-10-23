import React, { createContext, Component } from 'react';

import API from '../api';
import { User } from '../../app/models/users';

type contextState = {
	isLoggedIn: boolean,
	errMessage: string,
	signInFunc: any,
	signUpFunc: any,
	currentUser: User | any
};

export const UserContext = createContext<contextState>({
	isLoggedIn: false,
	errMessage: '',
	signInFunc: null,
	signUpFunc: null,
	currentUser: null
});

class UserContextProvider extends Component<{}, contextState> {
	state: contextState = {
		isLoggedIn: false,
		errMessage: '',
		signInFunc: null,
		signUpFunc: null,
		currentUser: null
	};

	signInFunc = () => {
		API.get('/user/login')
			.then(res => {
				console.log(res);
				this.setState({
					isLoggedIn: true,
					currentUser: res.data
				});
			});
	};

	signUpFunc = () => {
		console.log("Sign Up")
	};

	render() {
		return (
			<UserContext.Provider value={{ ...this.state, signInFunc: this.signInFunc, signUpFunc: this.signUpFunc }}>
				{ this.props.children }
			</UserContext.Provider>
		);
	}
}

export default UserContextProvider;