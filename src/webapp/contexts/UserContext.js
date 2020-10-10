import React, { createContext, Component } from 'react';
import { mockUsers } from '../../app/models/mockUsers.ts';

export const UserContext = createContext();

class UserContextProvider extends Component {
	signinFunc = (formData) => { // Need to change current user to data fetch from API
		this.setState({
			isLoggedIn: true,
			currentUser: formData
		})
	}

	signupFunc = (formData) => { // Need to change current user to data fetch from API
		this.setState({
			isLoggedIn: true,
			currentUser: formData
		})
	}

	state = {
		currentUser: null,
		isLoggedIn: false,
		signinFunc: this.signinFunc,
		signupFunc: this.signupFunc
	};

	render() {
		return (
			<UserContext.Provider value={{ ...this.state }}>
				{ this.props.children }
			</UserContext.Provider>
		);
	};
}

export default UserContextProvider;
