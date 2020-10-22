import React, { createContext, Component } from 'react';

import { User } from '../../app/models/users';

type contextState = {
	isLoggedIn: boolean,
	errMessage: string,
	signInFunc: any,
	signUpFunc: any
};

export const UserContext = createContext<contextState>({
	isLoggedIn: false,
	errMessage: '',
	signInFunc: null,
	signUpFunc: null
});

class UserContextProvider extends Component<{}, contextState> {
	state: contextState = {
		isLoggedIn: false,
		errMessage: '',
		signInFunc: null,
		signUpFunc: null
	};

	signInFunc = () => {
		console.log("Sign In")
	}

	signUpFunc = () => {
		console.log("Sign Up")
	}

	render() {
		return (
			<UserContext.Provider value={{ ...this.state, signInFunc: this.signInFunc, signUpFunc: this.signUpFunc }}>
				{ this.props.children }
			</UserContext.Provider>
		);
	}
}

export default UserContextProvider;