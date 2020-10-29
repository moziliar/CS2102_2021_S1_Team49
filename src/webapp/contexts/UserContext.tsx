import React, { createContext, Component } from 'react';

import API from '../api';
import { User } from '../../app/models/users';
import { Form } from '../components/SignInPage';
import { UpdateForm } from '../components/subcomponents/EditProfileSection';

export type userContextState = {
	isLoggedIn: boolean,
	errMessage: string,
	signInFunc: any,
	signUpFunc: any,
	signOutFunc: any,
	updateUserFunc: any,
	applyLeave: any,
	currentUser: User | null
};

export const UserContext = createContext<userContextState>({
	isLoggedIn: false,
	errMessage: '',
	signInFunc: null,
	signUpFunc: null,
	signOutFunc: null,
	updateUserFunc: null,
	applyLeave: null,
	currentUser: null
});

class UserContextProvider extends Component<{}, userContextState> {
	state: userContextState = {
		isLoggedIn: false,
		errMessage: '',
		signInFunc: null,
		signUpFunc: null,
		signOutFunc: null,
		updateUserFunc: null,
		applyLeave: null,
		currentUser: null
	};

	signInFunc = (form: Form) => {
		const req = {
			email: form.email,
			password: form.password
		}

		API.post('/user/login', req)
			.then(res => {
				this.setState({
					isLoggedIn: true,
					currentUser: res.data,
					errMessage: ''
				});
			})
			.catch(err => {
				this.setState({ errMessage: err.response.data.errMessage });
			});
	};

	signUpFunc = (form: Form) => {
		const req = form;

		API.post('/user/create', req)
			.then(res => {
				this.setState({
					isLoggedIn: true,
					currentUser: res.data,
					errMessage: ''
				})
			})
			.catch(err => {
				this.setState({ errMessage: err.response.data.errMessage });
			})
	};

	signOutFunc = () => {
		this.setState({
			currentUser: null,
			isLoggedIn: false,
			errMessage: ''
		})
	}

	updateUserFunc = (updateForm: UpdateForm) => {
		const req = updateForm;
		API.put('user/update', req)
			.then(res => {
				console.log(res)
				this.setState({
					currentUser: res.data,
					errMessage: ''
				});
			})
			.catch(err => {
				console.log(err)
				this.setState({ errMessage: err.response.data.errMessage });
			})
	}

	// For user to apply as other account type.
	applyAccountOtherType = (type: string) => {
		if (type === "pet_onwer") {

		} else if (type === "full_time") {

		} else if (type === "part_time") {

		}
	}

	applyLeave = (startDate: Date, endDate: Date) => {
		console.log("Leave Applied");
	}

	render() {
		return (
			<UserContext.Provider value={{ ...this.state, 
				signInFunc: this.signInFunc, 
				signUpFunc: this.signUpFunc, 
				signOutFunc: this.signOutFunc,
				applyLeave: this.applyLeave,
				updateUserFunc: this.updateUserFunc }}>
				{ this.props.children }
			</UserContext.Provider>
		);
	}
}

export default UserContextProvider;