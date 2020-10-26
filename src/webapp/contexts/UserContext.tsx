import React, { createContext, Component } from 'react';

import API from '../api';
import { User } from '../../app/models/users';

export type userContextState = {
	isLoggedIn: boolean,
	errMessage: string,
	signInFunc: any,
	signUpFunc: any,
	signOutFunc: any,
	currentUser: User | null
};

export const UserContext = createContext<userContextState>({
	isLoggedIn: false,
	errMessage: '',
	signInFunc: null,
	signUpFunc: null,
	signOutFunc: null,
	currentUser: null
});

class UserContextProvider extends Component<{}, userContextState> {
	state: userContextState = {
		isLoggedIn: false,
		errMessage: '',
		signInFunc: null,
		signUpFunc: null,
		signOutFunc: null,
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

	signOutFunc = () => {
		this.setState({
			currentUser: null,
			isLoggedIn: false
		})
	}

	render() {
		return (
			<UserContext.Provider value={{ ...this.state, signInFunc: this.signInFunc, signUpFunc: this.signUpFunc, signOutFunc: this.signOutFunc }}>
				{ this.props.children }
			</UserContext.Provider>
		);
	}
}

export default UserContextProvider;