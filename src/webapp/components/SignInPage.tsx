import React, { Component } from 'react';
import { Form, Button, Container, Modal } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';
import '../styles/SignInPage.scss';

const EMAIL = 'email';
const PASSWORD = 'password';
const NAME = 'name';
const PHONE = 'phone';
const PIC_URL = 'pic_url';
const IS_ADMIN = 'is_admin';

export interface Form {
	[EMAIL]: string,
	[PASSWORD]: string,
	[NAME]: string,
	[PHONE]: string,
	[PIC_URL]: string,
	[IS_ADMIN]: boolean
}

type IState = {
	formData: Form
}

class SignInPage extends Component<{}, IState> {
	static contextType = UserContext;

	state: IState = {
		formData: {
			[EMAIL]: '',
			[PASSWORD]: '',
			[NAME]: '',
			[PHONE]: '',
			[PIC_URL]: '',
			[IS_ADMIN]: false
		}
	};

	onHandleInputChange = (field: string, value: string): void => {
		this.setState({
			formData: {
				...this.state.formData,
				[field]: value
			}
		});
	};

	onSignIn = (): void => {
		this.context.signInFunc(this.state.formData);
	}

	onSignUp = (): void => {
		this.context.signUpFunc(this.state.formData);
	}

	render() {
		const { email, password, name, phone, pic_url } = this.state.formData;

		if (this.context.isLoggedIn) {
			if (this.context.currentUser.is_admin) {
				return <Redirect to='/pcs-dashboard'/>;
			} else {
				return <Redirect to='/profile'/>;
			}
		}

		const isSignIn: boolean = window.location.pathname === '/signin';
		return(
			<>
				<div className="signin-page">
					<Container>
						<h1>{ isSignIn ? 'Sign In' : 'Sign Up' } to Care Taker</h1>
						<Form>
							<Form.Group>
								<Form.Label>Email<small style={{ 'color': 'red' }}>{ isSignIn ? '' : '(Required)' }</small></Form.Label>
								<Form.Control type="email" value={ email } onChange={ e => this.onHandleInputChange(EMAIL, e.target.value) }/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Password<small style={{ 'color': 'red' }}>{ isSignIn ? '' : '(Required)' }</small></Form.Label>
								<Form.Control type="password" value={ password } onChange={ e => this.onHandleInputChange(PASSWORD, e.target.value) }/>
							</Form.Group>
							{ isSignIn 
								? null
								: <>
									<Form.Group>
										<Form.Label>Name<small style={{ 'color': 'red' }}>{ isSignIn ? '' : '(Required)' }</small></Form.Label>
										<Form.Control type="name" value={ name } onChange={ e => this.onHandleInputChange(NAME, e.target.value) }/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Phone</Form.Label>
										<Form.Control type="phone" value={ phone } onChange={ e => this.onHandleInputChange(PHONE, e.target.value) }/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Picture URL</Form.Label>
										<Form.Control type="pic_url" value={ pic_url } onChange={ e => this.onHandleInputChange(PIC_URL, e.target.value) }/>
									</Form.Group>
									<Modal>

									</Modal>
									{ name === '' || password === '' || email === '' 
										? <small style={{ 'color': 'red' }}>Name, Email, and Password can't be empty</small>
										: null
									}
								  </>
							}
							<small style={{ 'color': 'red' }}>{ this.context.errMessage }</small>
							<Button 
								variant="success" 
								onClick={ isSignIn ? this.onSignIn : this.onSignUp }
								disabled={ !isSignIn && (name === '' || password === '' || email === '') }>
								{ isSignIn ? 'Sign In' : 'Sign Up' }
							</Button>
							<hr />
							<p>
								{ isSignIn ? 'Need a new' : 'Already have an'} account?  
								<Link to={ isSignIn ? '/signup' : '/signin'}>
									{ isSignIn ? ' Sign up' : ' Sign in' } now.
								</Link>
							</p>
						</Form>
					</Container>	
				</div>
			</>
		);
	};
}

export default SignInPage;