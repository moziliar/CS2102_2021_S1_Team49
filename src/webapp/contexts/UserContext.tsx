import React, { createContext, Component } from 'react';

import API from '../api';
import { CreditCard, User } from '../../app/models/users';
import { Form } from '../components/SignInPage';
import { UpdateForm } from '../components/subcomponents/EditProfileSection';
import { Pet } from '../../app/models/pets';

export type userContextState = {
	isLoggedIn: boolean,
	errMessage: string,
	succMessage: string,
	signInFunc: any,
	signUpFunc: any,
	signOutFunc: any,
	updateUserFunc: any,
	applyCareTaker: any,
	addCreditCard: any,
	deleteCreditCard: any,
	addNewPet: any,
	deletePet: any,
	updatePet: any,
	applyLeave: any,
	applyAvailability: any,
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
	applyCareTaker: null,
	addCreditCard: null,
	deleteCreditCard: null,
	addNewPet: null,
	deletePet: null,
	updatePet: null,
	applyLeave: null,
	applyAvailability: null,
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
		applyCareTaker: null,
		addCreditCard: null,
		deleteCreditCard: null,
		addNewPet: null,
		deletePet: null,
		updatePet: null,
		applyLeave: null,
		applyAvailability: null,
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

	applyCareTaker = (email: string, is_part_time: boolean) => {
		const req = {
			email: email,
			is_part_time: is_part_time
		};
		
		API.post('/apply/caretaker', req)
			.then(res => {
				this.setState({
					currentUser: res.data,
					errMessage: '',
					succMessage: ''
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

	addNewPet = (email: string, newPet: Pet) => {
		const req = {
			owner: email,
			...newPet
		};
		console.log(req)

		API.post('/pet/create', req)
			.then(res => {
				console.log(res.data);
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
	
	updatePet = (owner: string, pet: Pet) => {
		const req = {
			owner: owner,
			...pet
		};

		API.put('/pet/update', req)
			.then(res => {
				this.setState({
					currentUser: res.data,
					errMessage: '',
					succMessage: ''
				});
			})
			.catch(err => {
				console.log(err)
				alert(err.reponse.message.errMessage);
			})
	}


	deletePet = (name: string, owner: string) => {
		const data = {
			name: name,
			owner: owner
		};

		API.delete('/pet/delete', { params: data })
			.then(res => {
				console.log(res.data);
				this.setState({
					currentUser: res.data,
					errMessage: '',
					succMessage: ''
				});
			})
			.catch(err => {
				console.log(err)
				alert(err.reponse.message.errMessage);
			})
	}

	applyLeave = (email: string, startDate: Date, endDate: Date) => {
		startDate.setDate(startDate.getDate() + 1);
		endDate.setDate(endDate.getDate() + 1);
		API.post('/user/apply_leave', { email: email, start_date: startDate, end_date: endDate })
			.then(res => {
				this.setState({ currentUser: res.data })
				alert('Leave applied successfully')
			})
			.catch(err => console.log(err));
	}

	applyAvailability = (email: string, startDate: Date, endDate: Date) => {
		startDate.setDate(startDate.getDate() + 1);
		endDate.setDate(endDate.getDate() + 1);
		API.post('/user/apply_availability', { email: email, start_date: startDate, end_date: endDate })
			.then(res => {
				this.setState({ currentUser: res.data })
				alert('Availability updated')
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<UserContext.Provider value={{ ...this.state, 
				signInFunc: this.signInFunc, 
				signUpFunc: this.signUpFunc, 
				signOutFunc: this.signOutFunc,
				applyLeave: this.applyLeave,
				applyAvailability: this.applyAvailability,
				updateUserFunc: this.updateUserFunc,
				applyCareTaker: this.applyCareTaker,
				addCreditCard: this.addCreditCard,
				deleteCreditCard: this.deleteCreditCard,
				addNewPet: this.addNewPet,
				deletePet: this.deletePet,
				updatePet: this.updatePet }}>
				{ this.props.children }
			</UserContext.Provider>
		);
	}
}

export default UserContextProvider;