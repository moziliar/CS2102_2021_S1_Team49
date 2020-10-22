import React, { Component } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';
import '../styles/SignInPage.scss';

const EMAIL = 'email';
const PASSWORD = 'password';

interface Form {
	[EMAIL]: string,
	[PASSWORD]: string
}

type IState = {
	formData: Form
}

class SignInPage extends Component<{}, IState> {
	static contextType = UserContext;

	state: IState = {
		formData: {
			[EMAIL]: '',
			[PASSWORD]: ''
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
		const { email, password } = this.state.formData;

		if (this.context.isLoggedIn) {
			return <Redirect to='/profile'/>;
		}

		const isSignIn: boolean = window.location.pathname === '/signin';
		return(
			<>
				<div className="signin-page">
					<Container>
						<h1>{ isSignIn ? 'Sign In' : 'Sign Up' } to Care Taker</h1>
						<Form>
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Control type="email" value={ email } onChange={ e => this.onHandleInputChange(EMAIL, e.target.value) }/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" value={ password } onChange={ e => this.onHandleInputChange(PASSWORD, e.target.value) }/>
							</Form.Group>
							<small style={{ 'color': 'red' }}>{ this.context.errMessage }</small>
							<Button variant="success" onClick={ isSignIn ? this.onSignIn : this.onSignUp }>
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