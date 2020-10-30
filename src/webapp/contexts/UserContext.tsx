import React, { createContext, Component } from 'react';

import API from '../api';
import { CreditCard, User } from '../../app/models/users';
import { Form } from '../components/SignInPage';
import { UpdateForm } from '../components/subcomponents/EditProfileSection';

export type userContextState = {
	isLoggedIn: boolean,
	errMessage: string,
	succMessage: string,
	signInFunc: any,
	signUpFunc: any,
	signOutFunc: any,
	updateUserFunc: any,
	addCreditCard: any,
	deleteCreditCard: any,
	applyLeave: any,
	currentUser: User | null
};

export const UserContext = createContext<userContextState>({
	isLoggedIn: false,
	errMessage: '',
	succMessage: '',
	signInFunc: null,
	signUpFunc: null,
	signOutFunc: null,
	updateUserFunc: null,
	addCreditCard: null,
	deleteCreditCard: null,
	applyLeave: null,
	currentUser: null
});

class UserContextProvider extends Component<{}, userContextState> {
	state: userContextState = {
		isLoggedIn: false,
		errMessage: '',
		succMessage: '',
		signInFunc: null,
		signUpFunc: null,
		signOutFunc: null,
		updateUserFunc: null,
		addCreditCard: null,
		deleteCreditCard: null,
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
				console.log(res.data)
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
		console.log(req)
		API.put('/user/update', req)
			.then(res => {
				console.log(res.data)
				this.setState({
					currentUser: res.data,
					errMessage: '',
					succMessage: 'User updated Successfully!'
				});
			})
			.catch(err => {
				this.setState({ errMessage: err.response.data.errMessage });
			})
	}

	addCreditCard = (email: string, newCard: CreditCard) => {
		const req = {
			email: email,
			...newCard
		};

		API.post('/card/create', req)
			.then(res => {
				this.setState({
					currentUser: res.data,
					errMessage: '',
					succMessage: ''
				});
			})
			.catch(err => {
				alert(err.response.data.errMessage);
			})
	}

	deleteCreditCard = (email: string, cc_number: number) => {
		const data = {
			email: email,
			cc_number: cc_number
		};

		API.delete('/card/delete', { params: data })
			.then(res => {
				this.setState({
					currentUser: res.data,
					errMessage: '',
					succMessage: ''
				});
			})
			.catch(err => {
				alert('Error deleting card. Please try again');
			})
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
				updateUserFunc: this.updateUserFunc,
				addCreditCard: this.addCreditCard,
				deleteCreditCard: this.deleteCreditCard }}>
				{ this.props.children }
			</UserContext.Provider>
		);
	}
}

export default UserContextProvider;