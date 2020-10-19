import React, { createContext, Component } from 'react';
import { mockUsers } from '../../app/models/mockUsers.ts';
import { LoginReq } from '../../app/protos/user_pb'
import { UsersClient } from '../../app/protos/user_grpc_web_pb';

export const UserContext = createContext();

const userService = new UsersClient("http://0.0.0.0:9090");

class UserContextProvider extends Component {
	signinFunc = (formData) => { // Need to change current user to data fetch from API
		console.log("loading")
		let req = new LoginReq();
		console.log("new req")
		req.setEmail(formData.email);
		console.log("set email", req.getEmail());
		req.setPassword(formData.password);
		console.log("set pw", req.getPassword());
		console.log(userService.login);
		const call = userService.login(req, {}, (err, res) => {
			console.log("calling");
			if (err) {
				console.log("error", err);

				return
			}

			console.log(res);
		});

		call.on('data', (res) => {
			console.log(res);
		})
		call.on('error', (res) => {
			console.log("error: ", res);
		})
		call.on('end', (res) => {
			console.log("end: ", res);
		})
		call.on('status', (res) => {
			console.log("status: ", res);
		})
		// console.log("call finished")
		// let isFound = false;
		// for (let i = 0; i < mockUsers.length; i++) {
		// 	if (mockUsers[i].email === formData.email) {
		// 		isFound = true;
		// 		this.setState({
		// 			isLoggedIn: true,
		// 			currentUser: mockUsers[i],
		// 			errMessage: null
		// 		});
		// 	}
		// }
		// if (!isFound) {
		// 	this.setState({
		// 		errMessage: 'User not found. Please check your email/password'
		// 	});
		// }
	}

	signupFunc = (formData) => { // Need to change current user to data fetch from API
		this.setState({
			isLoggedIn: true,
			currentUser: formData
		})
	}

	// To sign in use email example@google.com
	state = {
		currentUser: mockUsers[0], // change to null if want to test login/signup flow
		isLoggedIn: false, // change to false if want to test login /signup flow
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
