import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-date-picker';

import { UserContext } from '../../contexts/UserContext';
import { CreditCard, User } from '../../../app/models/users';

const EMAIL = 'email';
const NAME = 'name';
const PHONE = 'phone';
const PIC_URL = 'picture_url';
const CREDIT_CARD = 'credit card';
const CARD_NUMBER = 'cc_number';
const EXPIRY_DATE = 'expiry_date';

export type UpdateForm = {
	[EMAIL]: string,
	[NAME]: string,
	[PHONE]: number,
	[PIC_URL]: string,
	// [CREDIT_CARD]: CreditCard,
}

type IState = {
	formData: UpdateForm
}

class EditProfileSection extends Component<{}, IState> {
	static contextType = UserContext;
	currentUser: User = this.context.currentUser;

	state = {
		formData: {
			[EMAIL]: this.currentUser.email,
			[NAME]: this.currentUser.name,
			[PHONE]: this.currentUser.phone,
			[PIC_URL]: this.currentUser.picture_url,
			// [CREDIT_CARD]: this.currentUser.credit_card,
		}
	};

	onHandleInputChange = (field: string, value: any) => {
		// if (field === CARD_NUMBER || field === EXPIRY_DATE) {
		// 	this.setState({
		// 		formData: {
		// 			...this.state.formData,
		// 			[CREDIT_CARD]: {
		// 				...this.state.formData[CREDIT_CARD],
		// 				[field]: value
		// 			}
		// 		}
		// 	});
		// } else {
			this.setState({
				formData: {
					...this.state.formData,
					[field]: value
				}
			});
		// }
	};

	// Send api request to update user
	onUpdateUser = () => {
		this.context.updateUserFunc(this.state.formData);
	}

	render() {
		const { formData } = this.state;
		
		return (
			<div className="edit-information">
				<h2>Edit Your Profile</h2>
				<Form>
					<Row>
						<Col>
							<Form.Label>Your name</Form.Label>
							<Form.Control 
								type="text" 
								value={ formData[NAME] } 
								onChange={ (e) => this.onHandleInputChange(NAME, e.target.value) }/>
						</Col>
						<Col>
							<Form.Label>Phone Number</Form.Label>
							<Form.Control 
								type="number" 
								value={ formData[PHONE] } 
								onChange={ (e) => this.onHandleInputChange(PHONE, e.target.value) }/>
						</Col>
					</Row>
					<Form.Group>
						<Form.Label>Picture Url</Form.Label>
						<Form.Control 
								type="text" 
								value={ formData[PIC_URL] } 
								onChange={ (e) => this.onHandleInputChange(PIC_URL, e.target.value) }/>
					</Form.Group>
					{/* <Row>
						<Col>
							<Form.Label>Credit Card Number</Form.Label>
							<Form.Control 
								type="number" 
								value={ formData[CREDIT_CARD][CARD_NUMBER] } 
								onChange={ (e) => this.onHandleInputChange(CARD_NUMBER, e.target.value) }/>
						</Col>
						<Col>
							<Form.Label>Expiry Date</Form.Label>
							<br />
							<DatePicker 
								value={ new Date(formData[CREDIT_CARD][EXPIRY_DATE]) }
								format="MM/dd/y"
								onChange={ date => this.onHandleInputChange(EXPIRY_DATE, date) }/>
						</Col>
					</Row> */}
					<Button variant="primary" onClick={ this.onUpdateUser } className="update-btn">
						Update Basic Information
					</Button>
				</Form>
			</div>
		);
	} 
}

export default EditProfileSection;
