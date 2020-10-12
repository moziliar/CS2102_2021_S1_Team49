import React, { createContext, Component } from 'react';
import { mockUsers } from '../../app/models/mockUsers.ts';

export const UserContext = createContext();

class UserContextProvider extends Component {
	signinFunc = (formData) => { // Need to change current user to data fetch from API
		let isFound = false;
		for (let i = 0; i < mockUsers.length; i++) {
			if (mockUsers[i].email === formData.email) {
				isFound = true;
				this.setState({
					isLoggedIn: true,
					currentUser: mockUsers[i],
					errMessage: null
				});
			}
		}
		if (!isFound) {
			this.setState({
				errMessage: 'User not found. Please check your email/password'
			});
		}
	}

	signupFunc = (formData) => { // Need to change current user to data fetch from API
		this.setState({
			isLoggedIn: true,
			currentUser: formData
		})
	}

	state = {
		currentUser: mockUsers[0],
		isLoggedIn: true,
		signinFunc: this.signinFunc,
		signupFunc: this.signupFunc,
		errMessage: null
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
